/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:30:29
 * @LastEditTime: 2021-08-27 13:22:34
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传转存任务实现
 */
import { FileInfo, rapidTryflag } from "@/common/const";
import IRapiduploadTask from "@/common/IRapiduploadTask";
import { randomStringTransform } from "@/common/utils";
export default class RapiduploadTask implements IRapiduploadTask {
  savePath: string;
  fileInfoList: Array<FileInfo>;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  constructor(
    mysavePath: string,
    myfileInfoList: Array<FileInfo>,
    myonFinish: (fileInfoList: Array<FileInfo>) => void
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

    $.ajax({
      url: `${rapid_url}?bdstoken=${bdstoken}${check_mode ? "&rtype=3" : ""}`,
      type: "POST",
      data: {
        path: dir + file.path,
        "content-md5": file.md5,
        "slice-md5": file.md5s.toLowerCase(),
        "content-length": file.size,
      },
    })
      .success(function (r) {
        if (file.path.match(/["\\\:*?<>|]/)) {
          codeInfo[i].errno = 2333;
        } else {
          codeInfo[i].errno = r.errno;
        }
      })
      .fail(function (r) {
        codeInfo[i].errno = 114;
      })
      .always(function () {
        if (codeInfo[i].errno === 404) {
          saveFile(i, tryFlag + 1);
        } else if (codeInfo[i].errno === 2 && codeInfo[i].size > 21474836480) {
          saveFile(i, 3);
        } else {
          saveFile(i + 1, rapidTryflag.useUpperCaseMd5);
        }
      });
  }

  saveFileV2(i: number): void {
    let file_info = codeInfo[i];
    $.ajax({
      url: create_url + `&bdstoken=${bdstoken}`,
      type: "POST",
      dataType: "json",
      data: {
        block_list: JSON.stringify([file_info.md5]),
        path: dir + file_info.path,
        size: file_info.size,
        isdir: 0,
        rtype: check_mode ? 3 : 0,
      },
    })
      .success(function (r) {
        file_info.errno = r.errno;
      })
      .fail(function (r) {
        file_info.errno = 114;
      })
      .always(function () {
        if (file_info.errno === 2) {
          file_info.errno = 404;
        }
        saveFile(i + 1, 0);
      });
  }
}
