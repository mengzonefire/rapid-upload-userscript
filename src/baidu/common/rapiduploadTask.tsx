/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:30:29
 * @LastEditTime: 2021-08-27 16:00:45
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传转存任务实现
 */
import ajax from "@/common/ajax";
import { FileInfo, rapidTryflag } from "@/common/const";
import IRapiduploadTask from "@/common/IRapiduploadTask";
import { randomStringTransform } from "@/common/utils";
import { create_url, rapid_url } from "./const";
export default class RapiduploadTask implements IRapiduploadTask {
  checkMode: boolean;
  savePath: string;
  fileInfoList: Array<FileInfo>;
  onFinish: (fileInfoList: Array<FileInfo>) => void;

  constructor(
    mysavePath: string,
    myfileInfoList: Array<FileInfo>,
    myonFinish: (fileInfoList: Array<FileInfo>) => void,
    mycheckMode?: boolean
  ) {
    this.savePath = mysavePath;
    this.fileInfoList = myfileInfoList;
    this.onFinish = myonFinish;
  }

  saveFile(i: number, tryFlag?: number): void {
    if (i >= this.fileInfoList.length) {
      this.onFinish(this.fileInfoList);
    }
    let file = this.fileInfoList[i];

    // file_num.textContent =
    //   (i + 1).toString() + " / " + codeInfo.length.toString();

    if (!file.md5s) {
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
        url: `${rapid_url}?bdstoken=${bdstoken}${checkMode ? "&rtype=3" : ""}`,
        type: "POST",
        data: {
          path: this.savePath + file.path,
          "content-md5": file.md5,
          "slice-md5": file.md5s.toLowerCase(),
          "content-length": file.size,
        },
      },
      () => {},
      () => {}
    );
    //     .success(function (r) {
    //       if (file.path.match(/["\\\:*?<>|]/)) {
    //         codeInfo[i].errno = 2333;
    //       } else {
    //         codeInfo[i].errno = r.errno;
    //       }
    //     })
    //     .fail(function (r) {
    //       codeInfo[i].errno = 114;
    //     })
    //     .always(function () {
    //       if (codeInfo[i].errno === 404) {
    //         saveFile(i, tryFlag + 1);
    //       } else if (codeInfo[i].errno === 2 && codeInfo[i].size > 21474836480) {
    //         saveFile(i, 3);
    //       } else {
    //         saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
    //       }
    //     });
  }

  saveFileV2(i: number): void {
    let file = this.fileInfoList[i];
    $.ajax({
      url: create_url + `&bdstoken=${bdstoken}`,
      type: "POST",
      dataType: "json",
      data: {
        block_list: JSON.stringify([file.md5]),
        path: this.savePath + file.path,
        size: file.size,
        isdir: 0,
        rtype: checkMode ? 3 : 0,
      },
    })
      .success(function (r) {
        file.errno = r.errno;
      })
      .fail(function (r) {
        file.errno = 114;
      })
      .always(function () {
        if (file.errno === 2) {
          file.errno = 404;
        }
        this.saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
      });
  }
}
