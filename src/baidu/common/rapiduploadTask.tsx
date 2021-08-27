/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:30:29
 * @LastEditTime: 2021-08-26 16:02:15
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传转存任务实现
 */
import { FileInfo } from "@/common/const";
import IRapiduploadTask from "@/common/IRapiduploadTask";
export default class RapiduploadTask implements IRapiduploadTask {
    fileInfoList: Array<FileInfo> = [];
}
