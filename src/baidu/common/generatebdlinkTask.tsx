/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2021-08-28 09:35:50
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */
import { FileInfo } from "@/common/const";
export default class GeneratebdlinkTask {
  fileInfoList: Array<FileInfo> = [];
  generateFile: (i: number, tryFlag?: number) => void;
  onFinish: (fileInfoList: any[]) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;
}
