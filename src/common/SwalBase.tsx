/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:34:46
 * @LastEditTime: 2021-08-29 18:26:15
 * @LastEditors: mengzonefire
 * @Description: 定义全套的前台弹窗逻辑, 在Swal的回调函数内调用***Task类内定义的任务代码
 */
import GeneratebdlinkTask from "@/baidu/common/GeneratebdlinkTask";
import RapiduploadTask from "@/baidu/common/RapiduploadTask";
import {
  donateVer,
  feedbackVer,
  htmlCheckMd5,
  htmlDocument,
  htmlDonate,
  htmlFeedback,
  Swal,
} from "./const";
import DuParser from "./DuParser";
import { SwalConfig } from "./SwalConfig";
import { getSelectedFileList, parsefileInfo } from "./utils";

export default class Swalbase {
  swalArgs: any;
  constructor(
    readonly rapiduploadTask: RapiduploadTask,
    readonly generatebdlinkTask: GeneratebdlinkTask
  ) {}

  // 合并swal参数
  mergeArg(...inputArgs: any) {
    let output = {};
    $.extend(output, this.swalArgs, ...inputArgs);
    return output;
  }

  // 点击 "秒传链接" 后显示的弹窗
  inputView(swalArg?: any) {
    Swal.fire(this.mergeArg(SwalConfig.inputView, swalArg)).then(
      (result: any) => {
        if (result.isConfirmed) {
          if (result.value == "set") this.settingView();
          else if (result.value == "gen") this.genView();
          else {
            this.rapiduploadTask.reset();
            this.rapiduploadTask.fileInfoList = DuParser.parse(result.value);
            this.inputPathView();
          }
        }
      }
    );
  }

  // 输入转存路径的弹窗
  inputPathView() {
    Swal.fire(this.mergeArg(SwalConfig.inputPathView)).then((result: any) => {
      if (result.isConfirmed) {
        this.rapiduploadTask.savePath = result.value;
        this.processView(false);
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
        isGen || this.saveFileWork();
      },
    };
    Swal.fire(this.mergeArg(SwalConfig.inputPathView, swalArg));
  }

  // 转存/生成/测试秒传完成的弹窗
  finishView(isGen: boolean) {
    let checkboxArg = {
      input: "checkbox",
      inputValue: GM_getValue("with_path"),
      inputPlaceholder: "导出文件夹目录结构",
    };
    let action = isGen
      ? "生成"
      : this.rapiduploadTask.checkMode
      ? "测试"
      : "转存";
    let fileInfoList = isGen
      ? this.generatebdlinkTask.fileInfoList
      : this.rapiduploadTask.fileInfoList;
    let parseResult = parsefileInfo(fileInfoList);
    if (isGen) this.rapiduploadTask.fileInfoList = parseResult.successList;
    let html = isGen
      ? htmlCheckMd5 + // 添加测试秒传入口
        htmlDocument + // 默认添加文档入口
        (parseResult.htmlInfo && "<p><br></p>" + parseResult.htmlInfo) // 如果有失败列表则添加空行间隔
      : htmlDocument + "<p><br></p>" + parseResult.htmlInfo;
    let htmlFooter = "";
    if (!GM_getValue(`${donateVer}_kill_donate`)) htmlFooter += htmlDonate; // 添加赞助入口提示
    if (!GM_getValue(`${feedbackVer}_kill_donate`)) htmlFooter += htmlFeedback; // 添加反馈入口提示
    if (htmlFooter) htmlFooter = "<p><br></p>" + htmlFooter; // 添加空行分隔
    let swalArg = {
      title: `${action}完毕 共${fileInfoList.length}个, 失败${parseResult.failedCount}个!`,
      confirmButtonText:
        isGen || this.rapiduploadTask.checkMode ? "复制秒传代码" : "确认",
      html: html + htmlFooter,
      ...((isGen || this.rapiduploadTask.checkMode) && checkboxArg),
    };
    Swal.fire(this.mergeArg(SwalConfig.finishView, swalArg)).then(
      (result: any) => {
        if (result.isConfirmed && (isGen || this.rapiduploadTask.checkMode)) {
          GM_setValue("with_path", result.value);
          if (!result.value)
            GM_setClipboard(parseResult.bdcode.replace(/\/.+\//g, ""));
          // 去除秒传链接中的目录结构(仅保留文件名)
          else GM_setClipboard(parseResult.bdcode); // 保留完整的文件路径
          GM_deleteValue("unfinish"); // 清除任务进度数据
        }
      }
    );
  }

  // 生成文件夹秒传, 是否递归生成提示
  checkRecursive() {
    Swal.fire(this.mergeArg(SwalConfig.checkRecursive)).then((result: any) => {
      if (result.isConfirmed) {
        this.generatebdlinkTask.recursive = true;
      } else if (result.dismiss == Swal.DismissReason.cancel)
        this.generatebdlinkTask.recursive = false;
      else return;
      this.processView(true);
      this.generatebdlinkTask.scanFile(0);
    });
  }

  // 设置页
  settingView() {}

  // 生成页 (输入路径列表进行秒传生成)
  genView() {}

  // 跨域提示
  csdWarning(onConfirm: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.csdWarning)).then((result: any) => {
      if (result.isConfirmed) {
        GM_setValue("show_csd_warning", result.value);
        onConfirm();
      }
    });
  }

  // 生成秒传未完成任务提示
  genUnfinishi(onConfirm: () => void, onCancel: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.genUnfinish)).then((result: any) => {
      if (result.isConfirmed) onConfirm();
      else if (result.dismiss == Swal.DismissReason.cancel) onCancel();
    });
  }

  // 测试秒传覆盖文件提示
  checkMd5Warning(onConfirm: () => void, onCancel: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.checkMd5Warning)).then((result: any) => {
      if (result.isConfirmed) {
        GM_setValue("check_md5_warning", result.value);
        onConfirm();
      } else if (result.dismiss == Swal.DismissReason.cancel) onCancel();
    });
  }

  // 更新信息页
  updateInfo(onConfirm: () => void) {
    Swal.fire(this.mergeArg(SwalConfig.updateInfo)).then((result: any) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  // 以下的方法都是任务操作逻辑, 不是弹窗逻辑
  saveFileWork() {
    this.rapiduploadTask.onFinish = () => {
      this.finishView(false);
    };
    this.rapiduploadTask.onProcess = (i, fileInfoList) => {
      Swal.getHtmlContainer().querySelector("file_num").textContent = `${
        i + 1
      } / ${fileInfoList.length}`;
    };
    this.rapiduploadTask.start(); // 开始转存任务
  }

  genFileWork(isUnfinish: boolean) {
    this.generatebdlinkTask.selectList = getSelectedFileList();
    this.generatebdlinkTask.onProcess = (i, fileInfoList) => {
      Swal.getHtmlContainer().querySelector("file_num").textContent = `${
        i + 1
      } / ${fileInfoList.length}`;
      Swal.getHtmlContainer().querySelector("gen_prog").textContent = "0%";
    };
    this.generatebdlinkTask.onProgress = (e: any) => {
      if (typeof e.total != "number") return; // 参数数据不正确 跳过
      Swal.getHtmlContainer().querySelector("gen_prog").textContent = `${(
        (e.loaded / e.total) *
        100
      ).toFixed()}%`;
    };
    this.generatebdlinkTask.onHasNoDir = () => {
      this.processView(true);
      this.generatebdlinkTask.generateBdlink(0);
    };
    this.generatebdlinkTask.onHasDir = () => {
      this.checkRecursive();
    };
    this.generatebdlinkTask.onFinish = () => {
      this.finishView(true);
    };
    if (!isUnfinish) this.generatebdlinkTask.start();
  }

  checkUnfinish() {
    if (GM_getValue("unfinish")) {
      this.genUnfinishi(
        () => {
          this.genFileWork(true);
          let unfinishInfo: any = GM_getValue("unfinish");
          this.generatebdlinkTask.fileInfoList = unfinishInfo.file_info_list;
          this.generatebdlinkTask.generateBdlink(unfinishInfo.file_id);
        }, // 确认继续未完成任务
        () => {
          GM_deleteValue("unfinish");
          this.genFileWork(false);
        } // 不继续未完成任务, 清楚数据, 开启新任务
      );
    } else {
      this.genFileWork(false);
    } // 没有未完成任务, 开启新任务
  }

  checkMd5() {
    this.rapiduploadTask.checkMode = true;
    if (!GM_getValue("check_md5_warning")) {
      this.checkMd5Warning(
        () => {
          this.processView(false);
        }, // 点击确定按钮, 开始测试转存秒传
        () => {
          this.finishView(true);
        } // 点击返回按钮, 回到生成完成的界面
      );
    } else this.processView(false); // 直接开始测试转存秒传
  }
}
