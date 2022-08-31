/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:30:29
 * @LastEditTime: 2022-09-01 02:15:30
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传转存任务实现
 */
import ajax from "@/common/ajax";
import { FileInfo, rapidTryflag } from "@/common/const";
import { convertData, randomStringTransform } from "@/common/utils";
import {
  retryMax_apiV2,
  precreate_url,
  create_url,
  rapid_url,
  getBdstoken,
} from "./const";
export default class RapiduploadTask {
  savePath: string;
  isDefaultPath: boolean;
  checkMode: boolean;
  fileInfoList: Array<FileInfo>;
  bdstoken: string;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;

  reset(): void {
    this.bdstoken = getBdstoken();
    // console.log("bdstoken: ", this.bdstoken); // debug
    this.fileInfoList = [];
    this.savePath = "";
    this.checkMode = false;
    this.isDefaultPath = false;
    this.onFinish = () => {};
    this.onProcess = () => {};
  }

  start(): void {
    if (this.checkMode) this.savePath = "";
    this.saveFile(0, rapidTryflag.useUpperCaseMd5);
  }

  /**
   * @description: 转存秒传 接口1
   * @param {number} i
   * @param {number} tryFlag 标识参数
   */
  saveFile(i: number, tryFlag?: number): void {
    if (i >= this.fileInfoList.length) {
      this.onFinish(this.fileInfoList);
      return;
    }
    this.onProcess(i, this.fileInfoList);
    let file = this.fileInfoList[i];
    // 文件名含有非法字符 / 文件名为空
    if (file.path.match(/["\\\:*?<>|]/) || file.path === "/") {
      file.errno = 810;
      this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      return;
    }
    // 短版标准码(无slice-md5) 或 20GB以上的文件, 使用秒传v2接口转存
    if (!file.md5s || file.size > 21474836480) {
      file.md5 = file.md5.toLowerCase();
      console.log("use saveFile v2");
      this.saveFileV2(i);
      return;
    }
    switch (tryFlag) {
      case rapidTryflag.useUpperCaseMd5:
        console.log("use UpperCase md5");
        file.md5 = file.md5.toUpperCase();
        break;
      case rapidTryflag.useLowerCaseMd5:
        console.log("use LowerCase md5");
        file.md5 = file.md5.toLowerCase();
        break;
      case rapidTryflag.useRandomCaseMd5:
        console.log("use randomCase md5");
        file.md5 = randomStringTransform(file.md5);
        break;
      case rapidTryflag.useSaveFileV2:
        console.log("use saveFile v2");
        file.md5 = file.md5.toLowerCase();
        this.saveFileV2(i);
        return;
      default:
        this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
        return;
    }
    ajax(
      {
        url: `${rapid_url}${this.bdstoken && "?bdstoken=" + this.bdstoken}`,
        method: "POST",
        responseType: "json",
        data: convertData({
          rtype: this.checkMode ? 3 : 0, // rtype=3覆盖文件, rtype=0则返回报错, 不覆盖文件, 默认为0
          path: this.savePath + file.path,
          "content-md5": file.md5,
          "slice-md5": file.md5s.toLowerCase(),
          "content-length": file.size,
        }),
      },
      (data) => {
        data = data.response;
        if (data.errno === 404) this.saveFile(i, tryFlag + 1);
        else {
          file.errno = data.errno;
          this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
        }
      },
      (statusCode) => {
        file.errno = statusCode;
        this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      }
    );
  }

  /**
   * @description: 转存秒传 接口2
   * @param {number} i
   */
  saveFileV2(i: number, _retry: number = 0): void {
    let file = this.fileInfoList[i];
    let onFailed = (statusCode: number) => {
      file.errno = statusCode;
      this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
    };
    precreateFileV2.call(
      this,
      file,
      (data) => {
        data = data.response;
        if (0 === data.errno) {
          if (0 === data.block_list.length) {
            this.createFileV2(
              file,
              (data) => {
                data = data.response;
                file.errno = 2 === data.errno ? 114 : data.errno;
                this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
              },
              onFailed
            );
          } else {
            file.errno = 31190;
            this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
          }
        } else {
          file.errno = data.errno;
          this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
        }
      },
      onFailed
    );
  }

  // 此接口测试结果如下: 错误md5->返回"errno": 31190, 正确md5+错误size->返回"errno": 2
  // 此外, 即使md5和size均正确, 依旧有小概率返回"errno": 2, 故建议加入retry策略
  createFileV2(
    file: FileInfo,
    onResponsed: (data: any) => void,
    onFailed: (statusCode: number) => void,
    retry: number = 0
  ): void {
    ajax(
      {
        url: `${create_url}${this.bdstoken && "&bdstoken=" + this.bdstoken}`, // bdstoken参数不能放在data里, 否则无效
        method: "POST",
        responseType: "json",
        data: convertData({
          block_list: JSON.stringify([file.md5]),
          path: this.savePath + file.path,
          size: file.size,
          isdir: 0,
          rtype: this.checkMode ? 3 : 0, // rtype=3覆盖文件, rtype=0则返回报错, 不覆盖文件, 默认为rtype=1(自动重命名)
        }),
      },
      (data) => {
        if (2 === data.response.errno && retry < retryMax_apiV2)
          this.createFileV2(file, onResponsed, onFailed, retry++);
        else onResponsed(data);
      },
      onFailed
    );
  }
}

// 此接口测试结果如下: 错误md5->返回block_list: [0], 正确md5+正确/错误size->返回block_list: []
export function precreateFileV2(
  file: FileInfo,
  onResponsed: (data: any) => void,
  onFailed: (statusCode: number) => void
): void {
  ajax(
    {
      url: `${precreate_url}${this.bdstoken && "&bdstoken=" + this.bdstoken}`, // bdstoken参数不能放在data里, 否则无效
      method: "POST",
      responseType: "json",
      data: convertData({
        block_list: JSON.stringify([file.md5]),
        path: this.savePath + file.path,
        size: file.size,
        isdir: 0,
        autoinit: 1,
      }),
    },
    onResponsed,
    onFailed
  );
}
