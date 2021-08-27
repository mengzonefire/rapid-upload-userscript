/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2021-08-27 15:20:09
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */
import { FileInfo } from "@/common/const";
import IGeneratebdlinkTask from "@/common/IGeneratebdlinkTask";
export default class GeneratebdlinkTask implements IGeneratebdlinkTask {
  generateFile: (i: number, tryFlag?: number) => void;
  onFinish: (fileInfoList: any[]) => void;
  fileInfoList: Array<FileInfo> = [];
}
