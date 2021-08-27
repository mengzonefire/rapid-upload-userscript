/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 08:58:46
 * @LastEditTime: 2021-08-27 12:46:03
 * @LastEditors: mengzonefire
 * @Description: 秒传转存任务接口声明
 */
export default interface IRapiduploadTask {
  fileInfoList: Array<any>;
  saveFile: (i: number, tryFlag?: number) => void;
  onFinish: (fileInfoList: Array<any>) => void;
}
