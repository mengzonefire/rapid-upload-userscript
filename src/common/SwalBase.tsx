/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:34:46
 * @LastEditTime: 2021-08-25 11:17:49
 * @LastEditors: mengzonefire
 * @Description: 定义全套的前台弹窗样式和逻辑, 在Swal的回调函数内调用***Task类内定义的任务代码
 */
import { Swal } from "./const";
import IGeneratebdlinkTask from "./IGeneratebdlinkTask";
import IRapiduploadTask from "./IRapiduploadTask";

export class Swalbase {
  swalConfig: any;
  rapiduploadTask: IRapiduploadTask;
  generatebdlinkTask: IGeneratebdlinkTask;
  constructor(
    myswalConfig: any,
    myrapiduploadTask: IRapiduploadTask,
    mygeneratebdlinkTask: IGeneratebdlinkTask
  ) {
    this.swalConfig = myswalConfig;
    this.rapiduploadTask = myrapiduploadTask;
    this.generatebdlinkTask = mygeneratebdlinkTask;
  }

  // 点击 "秒传链接" 后显示的弹窗
  inputView() {}
  // 转存/生成过程中的弹窗
  processView() {}
  // 转存秒传完成的弹窗
  saveFinishView() {}
  // 生成秒传完成的弹窗
  genFinishiView() {}
  // 设置页
  settingView() {}
  // 生成页 (输入路径列表进行秒传生成)
  genView() {}
}
