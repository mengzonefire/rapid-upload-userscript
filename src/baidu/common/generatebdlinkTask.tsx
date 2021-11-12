/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2021-11-12 11:23:42
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */
import ajax from "@/common/ajax";
import { FileInfo } from "@/common/const";
import { list_url, meta_url, meta_url2, pcs_url, UA } from "./const";
export default class GeneratebdlinkTask {
  recursive: boolean;
  dirList: Array<string>;
  selectList: Array<FileInfo>;
  fileInfoList: Array<FileInfo>;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;
  onProgress: (e: any) => void;
  onHasDir: () => void;
  onHasNoDir: () => void;

  reset(): void {
    this.recursive = false;
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
        });
      }
    });
    if (this.dirList.length) this.onHasDir();
    else this.onHasNoDir();
  }

  /**
   * @description: 选择的列表包含文件夹, 获取文件夹下的子文件
   * @param {number} i
   */
  scanFile(i: number): void {
    if (i >= this.dirList.length) {
      this.generateBdlink(0);
      return;
    }
    ajax(
      {
        url: `${list_url}&path=${encodeURIComponent(
          this.dirList[i]
        )}&recursion=${this.recursive ? 1 : 0}`,
        method: "GET",
        responseType: "json",
      },
      (data) => {
        data = data.response;
        if (!data.errno) {
          data.list.forEach((item: any) => {
            item.isdir || this.fileInfoList.push({ path: item.path }); // 筛选并添加文件 (isdir===0)
          });
        } else
          this.fileInfoList.push({
            path: this.dirList[i],
            errno: data.errno,
          });
        this.scanFile(i + 1);
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
   * @description: 获取秒传链接需要的信息
   * @param {number} i
   * @param {number} tryFlag
   * @return {*}
   */
  generateBdlink(i: number): void {
    GM_setValue("unfinish", {
      file_info_list: this.fileInfoList,
      file_id: i,
    }); // 保存任务进度数据
    if (i >= this.fileInfoList.length) {
      this.onFinish(this.fileInfoList);
      return;
    }
    this.onProcess(i, this.fileInfoList);
    let file = this.fileInfoList[i];
    if (file.errno) {
      this.generateBdlink(i + 1);
      return;
    } // 跳过扫描失败的文件夹
    this.getFileInfo(i);
  }

  /**
   * @description: 获取文件信息: size, md5(可能错误), fs_id
   * @param {number} i
   */
  getFileInfo(i: number) {
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
          console.log(data.list[0]); // debug
          if (data.list[0].isdir) {
            file.errno = 900;
            this.generateBdlink(i + 1);
            return;
          }
          file.size = data.list[0].size;
          file.fs_id = data.list[0].fs_id;
          // meta接口获取的md5可能错误, 故不再使用
          // let md5 = data.list[0].md5.match(/[\dA-Fa-f]{32}/);
          // if (md5) file.md5 = md5[0].toLowerCase(); // 获取到正确的md5
          if (data.list[0].block_list.length === 1)
            // block_list内获取到正确的md5
            file.md5 = data.list[0].block_list[0].toLowerCase();

          // 测试旧下载接口_start
          // file.retry_996 = true;
          // this.downloadFileData(
          //   i,
          //   pcs_url + `&path=${encodeURIComponent(file.path)}`
          // );
          // return;
          // 测试旧下载接口_end

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
   * @description: 获取文件的下载链接
   * @param {number} i
   */
  getDlink(i: number) {
    let file = this.fileInfoList[i];
    ajax(
      {
        url: meta_url2 + JSON.stringify([file.fs_id]),
        responseType: "json",
        method: "GET",
      },
      (data) => {
        data = data.response;
        if (!data.errno) {
          console.log(data.list[0]); // debug
          this.downloadFileData(i, data.list[0].dlink);
        } else {
          file.errno = data.errno;
          this.generateBdlink(i + 1);
        }
      },
      (statusCode) => {
        file.errno = statusCode;
        this.generateBdlink(i + 1);
      }
    );
  }

  /**
   * @description: 调用下载直链
   * @param {number} i
   * @param {string} dlink
   */
  downloadFileData(i: number, dlink: string) {
    let file = this.fileInfoList[i];
    let dlSize = file.size < 262144 ? file.size - 1 : 262143; //slice-md5: 文件前256KiB的md5
    ajax(
      {
        url: dlink,
        method: "GET",
        responseType: "arraybuffer",
        headers: {
          Range: `bytes=0-${dlSize}`,
          "User-Agent": UA,
        },
        onprogress: this.onProgress,
      },
      (data) => {
        this.onProgress({ loaded: 100, total: 100 }); // 100%
        this.parseDownloadData(i, data);
      },
      (statusCode) => {
        if (statusCode === 404) file.errno = 909;
        else file.errno = statusCode;
        this.generateBdlink(i + 1);
      }
    );
  }

  /**
   * @description: 解析服务器返回的数据
   * @param {number} i
   * @param {JQuery.jqXHR} xhr
   * @return {*}
   */
  parseDownloadData(i: number, data: any): void {
    console.log(`dl_url: ${data.finalUrl}`); // debug
    let file = this.fileInfoList[i];
    if (data.finalUrl.indexOf("issuecdn.baidupcs.com") !== -1) {
      file.errno = 1919;
      this.generateBdlink(i + 1);
      return;
    } else {
      // console.log(data.responseHeaders); // debug
      let fileMd5 = data.responseHeaders.match(/content-md5: ([\da-f]{32})/i);
      if (fileMd5) file.md5 = fileMd5[1].toLowerCase();
      // 从下载接口拿到了md5, 会覆盖meta接口的md5
      else if (!file.md5 && file.size <= 3900000000 && !file.retry_996) {
        // 下载接口和meta接口均未拿到md5, 尝试使用旧下载接口
        file.retry_996 = true;
        this.downloadFileData(
          i,
          pcs_url + `&path=${encodeURIComponent(file.path)}`
        );
        return;
      } else if (!file.md5) {
        // 两个下载接口和meta接口均未拿到md5
        file.errno = 996;
        this.generateBdlink(i + 1);
        return;
      }
      let spark = new SparkMD5.ArrayBuffer();
      spark.append(data.response);
      let sliceMd5 = spark.end();
      file.md5s = sliceMd5;
      let interval = this.fileInfoList.length > 1 ? 2000 : 1000;
      setTimeout(() => {
        this.generateBdlink(i + 1);
      }, interval);
    }
  }
}
