/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:34:46
 * @LastEditTime: 2022-09-15 20:14:12
 * @LastEditors: mengzonefire
 * @Description: 定义全套的前台弹窗逻辑, 在Swal的回调函数内调用***Task类内定义的任务代码
 */

import {
  appError,
  appWarning,
  bdlinkPrefix,
  commandList,
  doc,
  htmlAboutBdlink,
  linkStyle,
} from "./const";
import {
  refreshList,
  getSelectedFileList,
  illegalPathPattern,
} from "@/baidu/common/const";
import GeneratebdlinkTask from "@/baidu/common/GeneratebdlinkTask";
import RapiduploadTask from "@/baidu/common/RapiduploadTask";
import {
  donateVer,
  feedbackVer,
  htmlCheckMd5,
  htmlDocument,
  htmlDonate,
  htmlFeedback,
} from "./const";
import { DuParser, parseQueryLink } from "./duParser";
import { SwalConfig } from "./SwalConfig";
import { parsefileInfo, parseClipboard, showAlert } from "./utils";
import Swal from "sweetalert2";

export default class Swalbase {
  swalGlobalArgs: any; // 全局swal参数配置对象
  constructor(
    readonly rapiduploadTask: RapiduploadTask,
    readonly generatebdlinkTask: GeneratebdlinkTask
  ) {}

  // 合并swal参数
  mergeArg(...inputArgs: any) {
    let output = {};
    let swalCfgArgs: any = {
      // 禁用backdrop动画, 阻止多次弹窗时的屏闪
      showClass: { backdrop: "swal2-noanimation" },
      hideClass: { backdrop: "swal2-noanimation" },
    };
    $.extend(output, this.swalGlobalArgs, swalCfgArgs, ...inputArgs);
    return output;
  }

  // 点击 "秒传链接" 后显示的弹窗
  async inputView(inputValue: string = "") {
    if (GM_getValue("listen-clipboard") && !inputValue)
      // 标志位true 且 inputValue为空(非一键秒传进入时) 从剪贴板读取有效的秒传链接
      inputValue = await parseClipboard();
    let pathValue: string = GM_getValue("last_dir") || ""; // 从GM存储读取上次输入的转存路径
    let preConfirm = () => {
      // 手动读取Multiple inputs内的数据, 由于未设置input参数, 原生Validator不生效, 自行添加Validator逻辑
      inputValue = $("#mzf-rapid-input")[0].value;
      pathValue = $("#mzf-path-input")[0].value;
      if (!inputValue) {
        Swal.showValidationMessage("秒传不能为空");
        return false;
      }
      if (commandList.includes(inputValue.trim())) {
        // 输入支持的命令, 跳出检查
        inputValue = inputValue.trim();
        return;
      }
      if (!DuParser.parse(inputValue).length) {
        Swal.showValidationMessage(
          `<p>未识别到正确的链接 <a href="${doc.linkTypeDoc}" ${linkStyle}>查看支持格式</a></p>`
        );
        return false;
      }
      if (pathValue.match(illegalPathPattern)) {
        Swal.showValidationMessage(
          '保存路径不能含有字符\\":*?<>|, 示例：/GTA5/'
        );
        return false;
      }
    };
    let willOpen = () => {
      $("#swal2-html-container")
        .css("font-size", "1rem")
        .css("display", "grid")
        .css("margin", "0");
      $("#mzf-rapid-input")[0].value = inputValue;
      $("#mzf-path-input")[0].value = pathValue;
      $("#mzf-rapid-input").on("input", function (event) {
        let result = parseQueryLink(event.target.value);
        if (DuParser.parse(result).length) event.target.value = result;
      }); // 绑定输入框事件, 输入一键秒传后尝试转换为普通秒传
    };
    Swal.fire(
      this.mergeArg(SwalConfig.inputView, {
        preConfirm: preConfirm,
        willOpen: willOpen,
      })
    ).then((result: any) => {
      if (result.isConfirmed) {
        if (inputValue === "set") this.settingView();
        else if (inputValue === "gen") this.genView();
        else if (inputValue === "info") this.updateInfo(() => {});
        else {
          this.rapiduploadTask.reset();
          this.rapiduploadTask.fileInfoList = DuParser.parse(inputValue);
          GM_setValue("last_dir", pathValue);
          if (!pathValue) {
            // 路径留空
            this.rapiduploadTask.isDefaultPath = true;
            let nowPath = location.href.match(/path=(.+?)(?:&|$)/);
            if (nowPath) pathValue = decodeURIComponent(nowPath[1]);
            else pathValue = "/";
          }
          if (pathValue.charAt(pathValue.length - 1) !== "/") pathValue += "/"; // 补全路径结尾的 "/"
          console.log(`秒传文件保存到: ${pathValue}`); // debug
          this.rapiduploadTask.savePath = pathValue;
          this.processView(false);
        }
      }
    });
  }

  // 转存/生成过程中的弹窗
  processView(isGen: boolean) {
    let swalArg = {
      title: isGen
        ? "秒传生成中"
        : `文件${this.rapiduploadTask.checkMode ? "测试" : "提取"}中`,
      html: isGen
        ? "<p>正在生成第 <file_num>0</file_num> 个</p><p><gen_prog>正在获取文件列表...</gen_prog></p>"
        : `正在${
            this.rapiduploadTask.checkMode ? "测试" : "转存"
          }第 <file_num>0</file_num> 个`,
      willOpen: () => {
        Swal.showLoading();
        isGen || this.saveFileWork();
      },
    };
    Swal.fire(this.mergeArg(SwalConfig.processView, swalArg));
  }

  // 转存/生成/测试秒传完成的弹窗
  finishView(isGen: boolean) {
    let action = isGen
      ? "生成"
      : this.rapiduploadTask.checkMode
      ? "测试"
      : "转存";
    let fileInfoList = isGen
      ? this.generatebdlinkTask.fileInfoList
      : this.rapiduploadTask.fileInfoList;
    let parseResult = parsefileInfo(
      fileInfoList,
      this.rapiduploadTask.checkMode
    );
    if (isGen) {
      this.rapiduploadTask.reset();
      this.rapiduploadTask.fileInfoList = parseResult.successList;
    }
    let checkboxArg = {
      input: "checkbox",
      inputValue: GM_getValue("with_path"),
      inputPlaceholder: "导出文件夹目录结构",
    }; // 全部失败不显示此checkbox, 22.5.22: 全部失败也显示
    let html =
      (isGen
        ? (parseResult.failedCount != fileInfoList.length ? htmlCheckMd5 : "") + // 添加测试秒传入口, 若全部失败则不添加
          htmlDocument // 添加文档入口
        : "") +
      (parseResult.htmlInfo && isGen ? "<p><br></p>" : "") +
      parseResult.htmlInfo; // 添加失败列表, 生成模式下添加顶部空行分隔
    let htmlFooter = "";
    if (!GM_getValue(`${donateVer}_kill_donate`)) htmlFooter += htmlDonate; // 添加赞助入口提示
    if (!GM_getValue(`${feedbackVer}_kill_donate`)) htmlFooter += htmlFeedback; // 添加反馈入口提示
    if (htmlFooter) htmlFooter = "<p><br></p>" + htmlFooter; // 添加底部空行分隔
    let swalArg = {
      title: `${action}完毕 共${fileInfoList.length}个, 失败${parseResult.failedCount}个!`,
      confirmButtonText:
        isGen || this.rapiduploadTask.checkMode ? "复制秒传代码" : "确认",
      showDenyButton: isGen || this.rapiduploadTask.checkMode,
      denyButtonText: "复制一键秒传",
      denyButtonColor: "#ecae3c",
      reverseButtons: true,
      html: html + htmlFooter,
      ...((isGen || this.rapiduploadTask.checkMode) && checkboxArg),
      willOpen: () => {
        if (!isGen && !this.rapiduploadTask.checkMode) this.addOpenDirBtn(); // 转存模式时添加 "打开目录" 按钮
        if (isGen || this.rapiduploadTask.checkMode)
          GM_setValue("unClose", true); // 生成模式设置结果窗口未关闭的标记
      },
      preDeny: () => {
        let with_path = $("#swal2-checkbox")[0].checked;
        GM_setValue("with_path", with_path);
        if (!with_path)
          GM_setClipboard(
            bdlinkPrefix + parseResult.bdcode.replace(/\/.+\//g, "").toBase64()
          );
        // 去除目录结构, 并转换为一键秒传
        else GM_setClipboard(bdlinkPrefix + parseResult.bdcode.toBase64()); // 转换为一键秒传
        Swal.getDenyButton().innerText = "复制成功,点击右上关闭";
        let footer = Swal.getFooter();
        footer.innerHTML = htmlAboutBdlink;
        footer.style.display = "flex";
        return false;
      },
      preConfirm: () => {
        if (isGen || this.rapiduploadTask.checkMode) {
          // 生成/测试模式, "复制秒传代码"按钮
          let with_path = $("#swal2-checkbox")[0].checked;
          GM_setValue("with_path", with_path);
          if (!with_path)
            GM_setClipboard(parseResult.bdcode.replace(/\/.+\//g, ""));
          // 去除秒传链接中的目录结构(仅保留文件名)
          else GM_setClipboard(parseResult.bdcode); // 保留完整的文件路径
          Swal.getConfirmButton().innerText = "复制成功,点击右上关闭";
          return false;
        } else {
          // 转存模式, "确定" 按钮
          refreshList(); // 调用刷新文件列表的方法
          return undefined;
        }
      },
    };
    Swal.fire(this.mergeArg(SwalConfig.finishView, swalArg)).then(
      (result: any) => {
        if (result.isDismissed || result.dismiss === Swal.DismissReason.close) {
          GM_deleteValue("unfinish"); // 点击了右上角的关闭按钮, 清除任务进度数据
          GM_setValue("unClose", false);
        }
      }
    );
  }

  // 生成文件夹秒传, 是否递归生成提示
  checkRecursive() {
    Swal.fire(this.mergeArg(SwalConfig.checkRecursive)).then((result: any) => {
      if (result.isConfirmed) {
        this.generatebdlinkTask.recursive = true;
      } else if (result.dismiss === Swal.DismissReason.cancel)
        this.generatebdlinkTask.recursive = false;
      else return;
      this.processView(true);
      this.generatebdlinkTask.scanFile(0);
    });
  }

  // 设置页
  settingView() {
    let willOpen = () => {
      $("#swal2-html-container")
        .css("font-size", "1rem")
        .css("display", "grid")
        .css("margin", "0");
      $("#mzf-theme")[0].value = GM_getValue("swalThemes") || "Default";
      $("#mzf-listen-clipboard")[0].checked = Boolean(
        GM_getValue("listen-clipboard")
      );
      $("#mzf-fast-generate")[0].checked = Boolean(
        GM_getValue("fast-generate")
      );
    };
    let preConfirm = async () => {
      // 设置主题
      GM_setValue("swalThemes", $("#mzf-theme")[0].value);

      // 设置监听剪贴板
      if ($("#mzf-listen-clipboard")[0].checked) {
        try {
          await navigator.clipboard.readText();
          GM_setValue(
            "listen-clipboard",
            $("#mzf-listen-clipboard")[0].checked
          );
        } catch (error) {
          showAlert(appError.ClipboardPremissionErr);
          return;
        } // 验证剪贴板权限, 若报错则跳出不设置该项
      }

      // 设置极速生成, 若开启则弹出文本提醒
      if ($("#mzf-fast-generate")[0].checked)
        showAlert(appWarning.fastGenerateWarn);
      GM_setValue("fast-generate", $("#mzf-fast-generate")[0].checked);
    };
    Swal.fire(
      this.mergeArg(SwalConfig.settingView, {
        willOpen: willOpen,
        preConfirm: preConfirm,
      })
    ).then((result: any) => {
      if (result.isConfirmed)
        Swal.fire(this.mergeArg(SwalConfig.settingWarning));
    });
  }

  // 生成页 (输入路径列表进行秒传生成)
  genView() {
    Swal.fire(this.mergeArg(SwalConfig.genView)).then((result: any) => {
      if (result.isConfirmed) {
        this.generatebdlinkTask.reset();
        result.value.split("\n").forEach((item: string) => {
          if (item.charAt(0) !== "/") item = "/" + item;
          this.generatebdlinkTask.fileInfoList.push({
            path: item,
          });
        });
        this.processView(true); // 显示进度弹窗
        this.genFileWork(false, true); // 跳过获取选择文件列表和扫描文件夹的步骤
        this.generatebdlinkTask.generateBdlink(0); // 开始生成任务
      }
    });
  }

  // 生成秒传未完成任务提示
  genUnfinish(onConfirm: () => void, onCancel: () => void) {
    Swal.fire(
      this.mergeArg(
        GM_getValue("unClose")
          ? SwalConfig.genUnfinish2
          : SwalConfig.genUnfinish
      )
    ).then((result: any) => {
      if (result.isConfirmed) onConfirm();
      else if (result.dismiss === Swal.DismissReason.cancel) onCancel();
    });
  }

  // 测试秒传覆盖文件提示
  checkMd5Warning(onConfirm: () => void, onCancel: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.checkMd5Warning)).then((result: any) => {
      if (result.isConfirmed) {
        GM_setValue("check_md5_warning", result.value);
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) onCancel();
    });
  }

  // 生成秒传, 未选择任何文件的提示
  selectNoFileWarning() {
    Swal.fire(this.mergeArg(SwalConfig.selectNoFileWarning));
  }

  // 更新信息页
  updateInfo(onConfirm: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.updateInfo)).then((result: any) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  // 以下的方法都是任务操作逻辑, 不是弹窗逻辑
  saveFileWork() {
    this.rapiduploadTask.onFinish = () => this.finishView(false);
    this.rapiduploadTask.onProcess = (i, fileInfoList) => {
      Swal.getHtmlContainer().querySelector("file_num").textContent = `${
        i + 1
      } / ${fileInfoList.length}`;
    };
    this.rapiduploadTask.start(); // 开始转存任务
  }

  genFileWork(isUnfinish: boolean, isGenView: boolean) {
    if (!isGenView) this.generatebdlinkTask.selectList = getSelectedFileList();
    if (!this.generatebdlinkTask.selectList.length && !isUnfinish) {
      this.selectNoFileWarning();
      return;
    }
    this.generatebdlinkTask.onProcess = (i, fileInfoList) => {
      Swal.getHtmlContainer().querySelector("file_num").textContent = `${
        i + 1
      } / ${fileInfoList.length}`;
      Swal.getHtmlContainer().querySelector("gen_prog").textContent = "0%";
    };
    this.generatebdlinkTask.onProgress = (e: any, text: string = "") => {
      if (text) {
        // 显示自定义文本
        Swal.getHtmlContainer().querySelector("gen_prog").textContent = text;
        return;
      }
      if (!e || typeof e.total !== "number") return; // 参数数据不正确 跳过
      Swal.getHtmlContainer().querySelector("gen_prog").textContent = `${(
        (e.loaded / e.total) *
        100
      ).toFixed()}%`;
    };
    this.generatebdlinkTask.onHasNoDir = () => {
      this.processView(true);
      this.generatebdlinkTask.generateBdlink(0);
    };
    this.generatebdlinkTask.onHasDir = () => this.checkRecursive();
    this.generatebdlinkTask.onFinish = () => this.finishView(true);
    if (!isUnfinish && !isGenView) this.generatebdlinkTask.start(); // 执行新任务初始化
  }

  checkUnfinish() {
    if (GM_getValue("unfinish")) {
      this.genUnfinish(
        () => {
          this.processView(true);
          this.genFileWork(true, false);
          let unfinishInfo: any = GM_getValue("unfinish");
          this.generatebdlinkTask.fileInfoList = unfinishInfo.file_info_list;
          unfinishInfo.isCheckMd5
            ? this.generatebdlinkTask.checkMd5(unfinishInfo.file_id)
            : this.generatebdlinkTask.generateBdlink(unfinishInfo.file_id);
        }, // 确认继续未完成任务
        () => {
          GM_deleteValue("unfinish");
          this.genFileWork(false, false);
        } // 不继续未完成任务, 清除数据, 开启新任务
      );
    } else {
      this.genFileWork(false, false);
    } // 没有未完成任务, 直接开启新任务
  }

  checkMd5() {
    this.rapiduploadTask.checkMode = true;
    if (!GM_getValue("check_md5_warning")) {
      this.checkMd5Warning(
        () => {
          this.processView(false);
        }, // 点击确定按钮, 开始测试转存
        () => {
          this.finishView(true);
        } // 点击返回按钮, 回到生成完成的界面
      );
    } else this.processView(false); // 已勾选"不再提示", 直接开始测试转存
  }

  // 添加 "打开目录" 按钮
  addOpenDirBtn() {
    if (!this.rapiduploadTask.isDefaultPath) {
      let _dir = (this.rapiduploadTask.savePath || "").replace(/\/$/, ""); // 去除路径结尾的"/"
      if (_dir.charAt(0) !== "/") _dir = "/" + _dir; // 补齐路径开头的"/"
      let cBtn = Swal.getConfirmButton();
      let btn: HTMLElement = cBtn.cloneNode() as HTMLElement;
      btn.textContent = "打开目录";
      btn.style.backgroundColor = "#ecae3c";
      btn.onclick = () => {
        let path = location.href.match(/(path=(.+?))(?:&|$)/);
        if (path) {
          if (path[2] !== encodeURIComponent(_dir))
            location.href = location.href.replace(
              // 仅替换path参数, 不修改其他参数
              path[1],
              `path=${encodeURIComponent(_dir)}`
            );
          else refreshList(); // path参数相同, 已在目标目录下, 调用刷新函数
        } else {
          let connectChar = location.href.includes("?") ? "&" : "?"; // 确定参数的连接符
          location.href += `${connectChar}path=${encodeURIComponent(_dir)}`;
        } // 没有找到path参数, 直接添加
        Swal.close();
      };
      cBtn.before(btn);
    }
  }
}
