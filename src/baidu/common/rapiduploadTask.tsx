/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:30:29
 * @LastEditTime: 2021-08-29 18:13:58
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传转存任务实现
 */
import ajax from "@/common/ajax";
import { FileInfo, rapidTryflag } from "@/common/const";
import { randomStringTransform } from "@/common/utils";
import { create_url, rapid_url, bdstoken } from "./const";
export default class RapiduploadTask {
  savePath: string;
  checkMode: boolean = false;
  fileInfoList: Array<FileInfo>;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;

  reset(): void {
    this.fileInfoList = [];
    this.savePath = "";
    this.checkMode = false;
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
    if (file.path.match(/["\\\:*?<>|]/) || file.path == "/") {
      file.errno = 2333;
      this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      return;
    }
    // 短版标准码(无slice-md5) 或 20GB以上的文件, 使用秒传v2接口转存
    if (!file.md5s || file.size > 21474836480) {
      file.md5 = file.md5.toLowerCase();
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
        url: `${rapid_url}?bdstoken=${bdstoken}${
          this.checkMode ? "&rtype=3" : "" // rtype=3覆盖文件, rtype=0则返回报错, 不覆盖文件, 默认为0
        }`,
        type: "POST",
        dataType: "json",
        data: {
          path: this.savePath + file.path,
          "content-md5": file.md5,
          "slice-md5": file.md5s.toLowerCase(),
          "content-length": file.size,
        },
      },
      (data) => {
        if (data.errno == 404) this.saveFile(i, tryFlag + 1);
        else {
          file.errno = data.errno;
          this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
        }
      },
      (statusCode: number) => {
        file.errno = statusCode;
        this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      }
    );
  }

  /**
   * @description: 转存秒传 接口2
   * @param {number} i
   */
  saveFileV2(i: number): void {
    let file = this.fileInfoList[i];
    ajax(
      {
        url: create_url + `&bdstoken=${bdstoken}`,
        type: "POST",
        dataType: "json",
        data: {
          block_list: JSON.stringify([file.md5]),
          path: this.savePath + file.path,
          size: file.size,
          isdir: 0,
          rtype: this.checkMode ? 3 : 0, // rtype=3覆盖文件, rtype=0则返回报错, 不覆盖文件
        },
      },
      (data) => {
        file.errno = data.errno == 2 ? 404 : data.errno;
        this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      },
      (statusCode: number) => {
        file.errno = statusCode;
        this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      }
    );
  }
}
