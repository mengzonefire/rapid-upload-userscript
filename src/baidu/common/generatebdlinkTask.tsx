/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2021-08-26 16:02:10
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */
import { FileInfo } from "@/common/const";
import IGeneratebdlinkTask from "@/common/IGeneratebdlinkTask";
export default class GeneratebdlinkTask implements IGeneratebdlinkTask {
  fileInfoList: Array<FileInfo> = [];
}
