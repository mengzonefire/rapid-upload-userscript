/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2021-08-29 18:14:12
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */
import ajax from "@/common/ajax";
import { FileInfo, SparkMD5 } from "@/common/const";
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
    // 
    this.selectList.forEach(function (item) {
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
        type: "GET",
        dataType: "json",
      },
      (data) => {
        if (!data.errno) {
          data.list.forEach(function (item: any) {
            item.isdir || this.fileInfoList.push({ path: item.path }); // 筛选并添加文件 (isdir==0)
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
          errno: statusCode == 500 ? 901 : statusCode,
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
        dataType: "json",
      },
      (data) => {
        if (!data.errno) {
          console.log(data.list[0]); // debug
          if (data.isdir) {
            file.errno = 900;
            this.generateBdlink(i + 1);
            return;
          }
          file.size = data.list[0].size;
          file.fs_id = data.list[0].fs_id;
          let md5 = data.list[0].md5.match(/[\dA-Fa-f]{32}/);
          if (md5) file.md5 = md5[0].toLowerCase();
          else if (data.list[0].block_list.length == 1)
            file.md5 = data.list[0].block_list[0].toLowerCase();
          this.getDlink(i);
        } else {
          file.errno = data.errno;
          this.generateBdlink(i + 1);
        }
      },
      (statusCode) => {
        file.errno = statusCode == 404 ? 909 : statusCode;
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
      { url: meta_url2 + JSON.stringify([file.fs_id]), dataType: "json" },
      (data) => {
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
        type: "GET",
        headers: {
          Range: `bytes=0-${dlSize}`,
          "User-Agent": UA,
        },
        beforeSend: (xhr: any) => {
          xhr.responseType = "arraybuffer";
          xhr.onprogress = this.onProgress;
        },
      },
      (data, xhr) => {
        this.onProgress({ loaded: 100, total: 100 }); // 100%
        this.parseDownloadData(i, data, xhr);
      },
      (statusCode) => {
        file.errno = statusCode;
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
  parseDownloadData(i: number, data: any, xhr: JQuery.jqXHR): void {
    // console.log(`dl_url: ${xhr.responseURL}`);
    // JQ暂时(目前3.6)没加responseURL这个属性, 没办法获取到重定向之后的url, 暂时先通过responseHeader判断是否为和谐文件
    // 等JQ加上这个属性之后再改回去
    let file = this.fileInfoList[i];
    // if (xhr.responseURL.indexOf("issuecdn.baidupcs.com") != -1)
    if (xhr.getResponseHeader("access-control-allow-methods")) {
      file.errno = 1919;
      this.generateBdlink(i + 1);
      return;
    } else {
      let fileMd5 = xhr.getResponseHeader("content-md5");
      if (fileMd5) file.md5 = fileMd5[1].toLowerCase();
      else if (file.size <= 3900000000 && !file.retry_996) {
        file.retry_996 = true;
        this.downloadFileData(
          i,
          pcs_url + `&path=${encodeURIComponent(file.path)}`
        );
        return;
      } else {
        if (!file.md5) file.errno = 996;
        this.generateBdlink(i + 1);
        return;
      }
      let spark = new SparkMD5.ArrayBuffer();
      spark.append(data);
      let sliceMd5 = spark.end();
      file.md5s = sliceMd5;
      let interval = this.fileInfoList.length > 1 ? 2500 : 1000;
      setTimeout(function () {
        this.generateBdlink(i + 1);
      }, interval);
    }
  }
}
