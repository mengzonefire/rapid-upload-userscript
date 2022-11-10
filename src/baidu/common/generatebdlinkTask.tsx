/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2022-11-11 02:02:38
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */
import ajax from "@/common/ajax";
import { FileInfo } from "@/common/const";
import { decryptMd5 } from "@/common/utils";
import { UA } from "@/common/const";
import {
  listLimit,
  list_url,
  meta_url,
  meta_url2,
  pcs_url,
  getBdstoken,
} from "./const";
import { precreateFileV2 } from "./rapiduploadTask";
import SparkMD5 from "spark-md5";

// 普通生成:
export default class GeneratebdlinkTask {
  isGenView: boolean;
  isFast: boolean;
  bdstoken: string;
  savePath: string;
  recursive: boolean;
  dirList: Array<string>;
  selectList: Array<FileInfo>;
  fileInfoList: Array<FileInfo>;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;
  onProgress: (e: any, text?: string) => void;
  onHasDir: () => void;
  onHasNoDir: () => void;

  reset(): void {
    this.isGenView = false; // 标记是否使用生成页生成
    this.isFast = GM_getValue("fast-generate");
    this.savePath = "";
    this.recursive = false;
    this.bdstoken = getBdstoken();
    this.dirList = [];
    this.selectList = [];
    this.fileInfoList = [];
    this.onFinish = () => {};
    this.onProcess = () => {};
    this.onProgress = () => {};
    this.onHasDir = () => {};
    this.onHasNoDir = () => {};
  }

  /**
   * @description: 执行新任务的初始化步骤 扫描选择的文件列表
   */
  start(): void {
    this.selectList.forEach((item) => {
      if (item.isdir) this.dirList.push(item.path);
      else {
        this.fileInfoList.push({
          path: item.path,
          size: item.size,
          fs_id: item.fs_id,
          // 已开启极速生成, 直接取meta内的md5
          md5: this.isFast ? decryptMd5(item.md5.toLowerCase()) : "",
          md5s: "",
        });
      }
    });
    if (this.dirList.length) this.onHasDir();
    else this.onHasNoDir();
  }

  /**
   * @description: 选择的列表包含文件夹, 获取文件夹下的子文件
   * @param {number} i 条目index
   * @param {number} start 列表接口检索起点
   */
  scanFile(i: number, start: number = 0): void {
    if (i >= this.dirList.length) {
      this.generateBdlink(0);
      return;
    }
    ajax(
      {
        url: `${list_url}&path=${encodeURIComponent(
          this.dirList[i]
        )}&recursion=${this.recursive ? 1 : 0}&start=${start}`,
        method: "GET",
        responseType: "json",
      }, // list接口自带递归参数recursion
      (data) => {
        data = data.response;
        if (!data.errno) {
          if (!data.list.length)
            this.scanFile(i + 1); // 返回列表为空, 即此文件夹文件全部扫描完成
          else {
            data.list.forEach((item: any) => {
              item.isdir ||
                this.fileInfoList.push({
                  path: item.path,
                  size: item.size,
                  fs_id: item.fs_id,
                  md5: this.isFast ? decryptMd5(item.md5.toLowerCase()) : "",
                  md5s: "",
                }); // 筛选文件(isdir=0)
            });
            this.scanFile(i, start + listLimit); // 从下一个起点继续检索列表
          }
        } else {
          this.fileInfoList.push({
            path: this.dirList[i],
            errno: data.errno,
          }); // list接口访问失败, 添加失败信息
          this.scanFile(i + 1);
        }
      },
      (statusCode) => {
        this.fileInfoList.push({
          path: this.dirList[i],
          errno: statusCode === 500 ? 901 : statusCode,
        });
        this.scanFile(i + 1);
      }
    );
  }

  /**
   * @description: 顺序执行生成任务
   * @param {number} i
   */
  generateBdlink(i: number): void {
    // 保存任务进度数据
    GM_setValue("unfinish", {
      file_info_list: this.fileInfoList,
      file_id: i,
    });
    // 生成完成
    if (i >= this.fileInfoList.length) {
      if (this.isFast) this.checkMd5(0); // 已开启 "极速生成", 执行md5检查
      else this.onFinish(this.fileInfoList);
      return;
    }
    // 生成逻辑
    if (!this.isFast) this.onProcess(i, this.fileInfoList); // 未开启 "极速生成", 刷新弹窗内的任务进度
    let file = this.fileInfoList[i];
    // 跳过扫描失败的目录路径
    if (file.errno) {
      this.generateBdlink(i + 1);
      return;
    }
    // 已开启 "极速生成" 且已获取到md5, 跳过普通生成步骤
    if (this.isFast && file.md5) this.generateBdlink(i + 1);
    // 普通生成步骤
    else this.getDlink(i);
  }

  /**
   * @description: 获取文件信息: size, md5(可能错误), fs_id
   * @param {number} i
   */
  getFileInfo(i: number): void {
    let file = this.fileInfoList[i];
    ajax(
      {
        url: meta_url + encodeURIComponent(file.path),
        responseType: "json",
        method: "GET",
      },
      (data) => {
        data = data.response;
        if (!data.errno) {
          // console.log(data.list[0]); // debug
          if (data.list[0].isdir) {
            file.errno = 900;
            this.generateBdlink(i + 1);
            return;
          }
          file.size = data.list[0].size;
          file.fs_id = data.list[0].fs_id;
          // 已开启极速生成, 直接取meta内的md5
          file.md5 = this.isFast
            ? decryptMd5(data.list[0].md5.toLowerCase())
            : "";
          file.md5s = "";
          this.getDlink(i);
        } else {
          file.errno = data.errno;
          this.generateBdlink(i + 1);
        }
      },
      (statusCode) => {
        file.errno = statusCode === 404 ? 909 : statusCode;
        this.generateBdlink(i + 1);
      }
    );
  }

  /**
   * @description: 获取文件dlink(下载直链)
   * @param {number} i
   */
  getDlink(i: number): void {
    let file = this.fileInfoList[i];
    // 使用生成页时仅有path没有fs_id, 跳转到获取fs_id
    if (!file.fs_id) {
      this.getFileInfo(i);
      return;
    }
    ajax(
      {
        url: meta_url2 + JSON.stringify([file.fs_id]),
        responseType: "json",
        method: "GET",
      },
      (data) => {
        data = data.response;
        // 请求正常
        if (!data.errno) {
          // console.log(data.list[0]); // debug
          this.downloadFileData(i, data.list[0].dlink);
          return;
        }
        // 请求报错
        file.errno = data.errno;
        this.isFast ? this.checkMd5(i + 1) : this.generateBdlink(i + 1);
      },
      (statusCode) => {
        file.errno = statusCode;
        this.isFast ? this.checkMd5(i + 1) : this.generateBdlink(i + 1);
      }
    );
  }

  /**
   * @description: 调用下载直链
   * @param {number} i
   * @param {string} dlink
   */
  downloadFileData(i: number, dlink: string): void {
    let dlSize: number,
      file = this.fileInfoList[i];
    if (this.isFast)
      dlSize = 1; // "极速下载" 不需要生成slice-md5, 故无需下载文件数据
    else dlSize = file.size < 262144 ? 1 : 262143; //slice-md5: 文件前256KiB的md5, size<256KiB则直接取md5即可, 无需下载文件数据
    ajax(
      {
        url: dlink,
        method: "GET",
        responseType: "arraybuffer",
        headers: {
          Range: `bytes=0-${dlSize}`,
          "User-Agent": UA,
        },
        onprogress: this.isFast ? () => {} : this.onProgress,
      },
      (data) => {
        if (!this.isFast) this.onProgress({ loaded: 100, total: 100 }); // 100%
        this.parseDownloadData(i, data);
      },
      (statusCode) => {
        if (statusCode === 404) file.errno = 909;
        else file.errno = statusCode;
        this.isFast ? this.checkMd5(i + 1) : this.generateBdlink(i + 1);
      }
    );
  }

  /**
   * @description: 解析直链请求返回的数据
   * @param {number} i
   * @param {any} data
   */
  parseDownloadData(i: number, data: any): void {
    let file = this.fileInfoList[i];
    console.log(`dl_url: ${data.finalUrl}`); // debug

    // 下载直链重定向到此域名, 判定为文件和谐
    if (data.finalUrl.includes("issuecdn.baidupcs.com")) {
      file.errno = 1919;
      this.isFast ? this.checkMd5(i + 1) : this.generateBdlink(i + 1);
      return;
    }

    // 从下载接口获取md5, 此步骤可确保获取到正确md5
    // console.log(data.responseHeaders); // debug
    let fileMd5 = data.responseHeaders.match(/content-md5: ([\da-f]{32})/i);
    if (fileMd5) file.md5 = fileMd5[1].toLowerCase();
    else if (file.size <= 3900000000 && !file.retry_996) {
      // 默认下载接口未拿到md5, 尝试使用旧下载接口, 旧接口请求文件size大于3.9G会返回403
      file.retry_996 = true;
      this.downloadFileData(
        i,
        pcs_url + `&path=${encodeURIComponent(file.path)}`
      );
      return;
    } else {
      // 两个下载接口均未拿到md5, 失败跳出
      file.errno = 996;
      this.isFast ? this.checkMd5(i + 1) : this.generateBdlink(i + 1);
      return;
    }

    // 获取md5s, "极速生成" 跳过此步
    if (!this.isFast) {
      if (file.size < 262144) file.md5s = file.md5; // 此时md5s=md5
      else {
        // 计算md5s
        let spark = new SparkMD5.ArrayBuffer();
        spark.append(data.response);
        let sliceMd5 = spark.end();
        file.md5s = sliceMd5;
      }
      let interval = this.fileInfoList.length > 1 ? 2000 : 1000;
      setTimeout(() => {
        this.generateBdlink(i + 1);
      }, interval);
    } else this.checkMd5(i + 1);
  }

  /**
   * @description: "极速生成" 可能得到错误md5, 故执行验证步骤, 若验证不通过则执行普通生成
   * @param {number} i
   */
  checkMd5(i: number): void {
    if (i >= this.fileInfoList.length) {
      this.onFinish(this.fileInfoList);
      return;
    }
    this.onProcess(i, this.fileInfoList);
    this.onProgress(false, "极速生成中...");
    let file = this.fileInfoList[i];
    precreateFileV2.call(
      this,
      file,
      (data: any) => {
        data = data.response;
        if (0 === data.errno) {
          if (0 === data.block_list.length) this.checkMd5(i + 1); // md5验证成功
          else {
            // md5验证失败, 执行普通生成, 仅在此处保存任务进度
            GM_setValue("unfinish", {
              file_info_list: this.fileInfoList,
              file_id: i,
              isCheckMd5: true,
            });
            this.getDlink(i);
          }
        } else {
          // 接口访问失败
          file.errno = data.errno;
          this.checkMd5(i + 1);
        }
      },
      (statusCode: number) => {
        file.errno = statusCode;
        this.checkMd5(i + 1);
      }
    );
  }
}
