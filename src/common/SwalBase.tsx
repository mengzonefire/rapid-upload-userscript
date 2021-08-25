/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:34:46
 * @LastEditTime: 2021-08-26 01:22:47
 * @LastEditors: mengzonefire
 * @Description: 定义全套的前台弹窗样式和逻辑, 在Swal的回调函数内调用***Task类内定义的任务代码
 */
import { Swal } from "./const";
import IGeneratebdlinkTask from "./IGeneratebdlinkTask";
import IRapiduploadTask from "./IRapiduploadTask";

export default class Swalbase {
  swalConfig: any;
  rapiduploadTask: IRapiduploadTask;
  generatebdlinkTask: IGeneratebdlinkTask;
  constructor(
    myrapiduploadTask: IRapiduploadTask,
    mygeneratebdlinkTask: IGeneratebdlinkTask
  ) {
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
  // 生成文件夹秒传, 是否递归生成提示
  checkRecursive() {}
  // 设置页
  settingView() {}
  // 生成页 (输入路径列表进行秒传生成)
  genView() {}
  // 跨域提示
  csdWarning() {}
  // 生成秒传未完成任务提示
  genUnfinishi() {}
  // 测试秒传覆盖文件提示
  checkMd5Warning() {}
}
