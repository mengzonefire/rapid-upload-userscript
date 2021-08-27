/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:46
 * @LastEditTime: 2021-08-27 12:49:06
 * @LastEditors: mengzonefire
 * @Description: 秒传生成任务接口声明
 */

export default interface IGeneratebdlinkTask {
  fileInfoList: Array<any>;
  generateFile: (i: number, tryFlag?: number) => void;
  onFinish: (fileInfoList: Array<any>) => void;
}
