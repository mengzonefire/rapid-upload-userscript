/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:34:46
 * @LastEditTime: 2021-08-29 13:51:19
 * @LastEditors: mengzonefire
 * @Description: 定义全套的前台弹窗逻辑, 在Swal的回调函数内调用***Task类内定义的任务代码
 */
import GeneratebdlinkTask from "@/baidu/common/GeneratebdlinkTask";
import RapiduploadTask from "@/baidu/common/RapiduploadTask";
import { Swal } from "./const";
import DuParser from "./DuParser";
import { swalConfig } from "./swalConfig";
import { getSelectedFileList, parsefileInfo } from "./utils";

export default class Swalbase {
  swalArgs: any;
  rapiduploadTask: RapiduploadTask;
  generatebdlinkTask: GeneratebdlinkTask;
  constructor(
    myrapiduploadTask: RapiduploadTask,
    mygeneratebdlinkTask: GeneratebdlinkTask
  ) {
    this.rapiduploadTask = myrapiduploadTask;
    this.generatebdlinkTask = mygeneratebdlinkTask;
  }
  mergeArg(...inputArgs: any) {
    let output = {};
    $.extend(output, this.swalArgs, ...inputArgs);
    return output;
  }
  // 点击 "秒传链接" 后显示的弹窗
  inputView(swalArg?: any) {
    Swal.fire(this.mergeArg(swalConfig.inputView, swalArg)).then(
      (result: any) => {
        if (result.isConfirmed) {
          this.rapiduploadTask.reset();
          this.rapiduploadTask.fileInfoList = DuParser.parse(result.value);
          this.inputPathView();
        }
      }
    );
  }

  // 输入转存路径的弹窗
  inputPathView() {
    Swal.fire(this.mergeArg(swalConfig.inputPathView)).then((result: any) => {
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
        ? "<p>正在生成第 <file_num></file_num> 个</p><p><gen_prog></gen_prog></p>"
        : `正在${
            this.rapiduploadTask.checkMode ? "测试" : "转存"
          }第 <file_num></file_num> 个`,
      willOpen: this.saveFileWork,
    };
    Swal.fire(this.mergeArg(swalConfig.inputPathView, swalArg));
  }

  // 转存秒传完成的弹窗
  FinishView(isGen: boolean) {
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
    let swalArg = {
      title: `${action}完毕 共${fileInfoList.length}个, 失败${parseResult.failedCount}个!`,
      confirmButtonText:
        isGen || this.rapiduploadTask.checkMode ? "复制秒传代码" : "确认",
      html: parseResult.htmlInfo,
      ...((isGen || this.rapiduploadTask.checkMode) && checkboxArg),
    };
    Swal.fire(this.mergeArg(swalConfig.finishView, swalArg)).then(
      (result: any) => {
        if (result.isConfirmed && (isGen || this.rapiduploadTask.checkMode)) {
          GM_setValue("with_path", result.value);
          if (!result.value)
            GM_setClipboard(parseResult.bdcode.replace(/\/.+\//g, ""));
          // 去除秒传链接中的目录结构(仅保留文件名)
          else GM_setClipboard(parseResult.bdcode); // 保留完整的文件路径
        }
      }
    );
  }

  saveFileWork() {
    this.rapiduploadTask.onFinish = () => {
      this.FinishView(false);
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
    this.generatebdlinkTask.onFinish = () => {};
    if (!isUnfinish) this.generatebdlinkTask.start();
  }

  // 生成文件夹秒传, 是否递归生成提示
  checkRecursive(swalArg?: any) {
    this.processView(true);
  }

  // // 设置页
  // settingView(swalArg?: any) {}

  // // 生成页 (输入路径列表进行秒传生成)
  // genView(swalArg?: any) {}

  // 跨域提示
  csdWarning(onConfirm: () => void) {
    Swal.fire(this.mergeArg(swalConfig.csdWarning)).then((result: any) => {
      if (result.isConfirmed) {
        GM_setValue("show_csd_warning", result.value);
        onConfirm();
      }
    });
  }

  // 生成秒传未完成任务提示
  genUnfinishi(onConfirm: () => void, onCancel: () => void) {
    Swal.fire(this.mergeArg(swalConfig.genUnfinish)).then((result: any) => {
      this.processView(true);
      // this.generatebdlinkTask.onFinish;
      // this.generatebdlinkTask.onProcess;
      // this.generatebdlinkTask.onProgress;
      if (result.value) onConfirm();
      else onCancel();
    });
  }

  // 测试秒传覆盖文件提示
  // checkMd5Warning(swalArg?: any) {}

  // 更新信息页
  updateInfo(onConfirm: () => void) {
    Swal.fire(this.mergeArg(swalConfig.updateInfo)).then((result: any) => {
      if (result.isConfirmed) onConfirm();
    });
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
          this.genFileWork(false);
        } // 不继续未完成任务, 开启新任务
      );
    } else {
      this.genFileWork(false);
    } // 没有未完成任务, 开启新任务
  }
}
