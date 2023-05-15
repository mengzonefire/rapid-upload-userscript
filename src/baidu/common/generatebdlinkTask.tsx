/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:31:01
 * @LastEditTime: 2023-05-15 16:50:55
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传生成任务实现
 */

import ajax from "@/common/ajax";
import { homePage } from "@/common/const";
import {
  convertData,
  decryptMd5,
  getExtra,
  getLogid,
  getSurl,
  showAlert,
} from "@/common/utils";
import { UA } from "@/common/const";
import {
  list_url,
  meta_url,
  meta_url2,
  pcs_url,
  tpl_url,
  sharedownload_url,
  sharelist_url,
  getBdstoken,
  listLimit,
} from "./const";
// import { createFileV2 } from "./rapiduploadTask";
import SparkMD5 from "spark-md5";
import { createFileV2 } from "./rapiduploadTask";

// 普通生成:
export default class GeneratebdlinkTask {
  isSharePage: boolean; // 分享页标记
  isGenView: boolean; // 生成页(秒传框输入gen)标记
  isFast: boolean; // 极速生成功能开关标记
  recursive: boolean; // 递归生成标记
  savePath: string;
  dirList: Array<string>;
  selectList: Array<any>;
  fileInfoList: Array<FileInfo>;
  logid: string;
  surl: string;
  bdstoken: string;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;
  onProgress: (e: any, text?: string) => void;
  onHasDir: () => void;
  onHasNoDir: () => void;

  reset(): void {
    this.isGenView = false;
    this.isSharePage = false;
    this.isFast =
      GM_getValue("fast-generate") === undefined
        ? true
        : GM_getValue("fast-generate");
    this.recursive = false;
    this.savePath = "";
    this.bdstoken = getBdstoken(); // 此处bdstoken不可删除, 会在下方createFileV2方法调用
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
    if (this.isSharePage) {
      this.logid = getLogid();
      this.surl = getSurl();
      if (!this.surl) {
        showAlert(
          `surl获取失败: ${location.href}, 请前往脚本页反馈:\n${homePage}`
        );
        return;
      }
      this.parseShareFileList();
      this.onHasNoDir();
    } else {
      this.parseMainFileList();
      if (this.dirList.length) this.onHasDir();
      else this.onHasNoDir();
    }
  }

  scanShareFile(i: number, page: number = 1): void {
    if (i >= this.dirList.length) {
      this.generateBdlink(0);
      return;
    }
    this.onProgress(false, `正在获取文件列表, 第${i + 1}个`);
    ajax(
      {
        url: `${sharelist_url}&dir=${encodeURIComponent(
          this.dirList[i]
        )}&logid=${this.logid}&shareid=${unsafeWindow.yunData.shareid}&uk=${
          unsafeWindow.yunData.share_uk
        }&page=${page}`,
        method: "GET",
        responseType: "json",
      },
      (data) => {
        data = data.response;
        if (!data.errno) {
          if (!data.list.length) this.scanShareFile(i + 1);
          // 返回列表为空, 即此文件夹文件全部扫描完成
          else {
            this.parseShareFileList(data.list);
            this.scanShareFile(i, page + 1); // 下一页
          }
        } else {
          this.fileInfoList.push({
            path: this.dirList[i],
            isdir: 1,
            errno: data.errno,
          }); // list接口访问失败, 添加失败信息
          this.scanShareFile(i + 1);
        }
      },
      (statusCode) => {
        this.fileInfoList.push({
          path: this.dirList[i],
          isdir: 1,
          errno: statusCode,
        });
        this.scanShareFile(i + 1);
      }
    );
  }

  /**
   * @description: 选择的列表包含文件夹, 获取文件夹下的子文件
   * @param {number} i 条目index
   * @param {number} start 列表接口检索起点(即翻页参数)
   */
  scanFile(i: number, start: number = 0): void {
    if (i >= this.dirList.length) {
      this.generateBdlink(0);
      return;
    }
    ajax(
      {
        url: `${list_url}${encodeURIComponent(this.dirList[i])}&recursion=${
          this.recursive ? 1 : 0
        }&start=${start}`,
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
            isdir: 1,
            errno: data.errno,
          }); // list接口访问失败, 添加失败信息
          this.scanFile(i + 1);
        }
      },
      (statusCode) => {
        this.fileInfoList.push({
          path: this.dirList[i],
          isdir: 1,
          errno: statusCode,
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
    // 保存任务进度数据, 分享页生成不保存
    if (!this.isSharePage)
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
    // 未开启 "极速生成", 刷新弹窗内的任务进度
    if (!this.isFast) this.onProcess(i, this.fileInfoList);
    let file = this.fileInfoList[i];
    // 跳过扫描失败的目录路径
    if (file.errno && file.isdir) {
      this.generateBdlink(i + 1);
      return;
    }
    // 已开启 "极速生成" 且已获取到md5, 跳过普通生成步骤
    if (this.isFast && file.md5) this.generateBdlink(i + 1);
    // 普通生成步骤
    else this.isSharePage ? this.getShareDlink(i) : this.getDlink(i);
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
        if (!data.error_code) {
          if (data.list[0].isdir) {
            console.log(1111);
            file.isdir = 1;
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
          file.errno = data.error_code;
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
   * @description: 获取分享页的文件dlink(下载直链)
   * @param {number} i
   */
  getShareDlink(i: number): void {
    let sign: string,
      timestamp: number,
      file = this.fileInfoList[i],
      onFailed = (errno: number) => {
        file.errno = errno;
        this.checkMd5(i + 1);
        // md5为空只在分享单个文件时出现, 故无需考虑获取多文件md5(跳转generateBdlink), 直接跳转checkMd5即可
      };
    function getTplconfig(file: FileInfo): void {
      ajax(
        {
          url: `${tpl_url}&surl=${this.surl}&logid=${this.logid}`,
          responseType: "json",
          method: "GET",
        },
        (data) => {
          data = data.response;
          // 请求正常
          if (!data.errno) {
            sign = data.data.sign;
            timestamp = data.data.timestamp;
            getDlink.call(this, file);
            return;
          }
          // 请求报错
          onFailed(data.errno);
        },
        onFailed
      );
    }
    function getDlink(file: FileInfo): void {
      ajax(
        {
          url: `${sharedownload_url}&sign=${sign}&timestamp=${timestamp}`,
          responseType: "json",
          method: "POST",
          data: convertData({
            extra: getExtra(),
            logid: this.logid,
            fid_list: JSON.stringify([file.fs_id]),
            primaryid: unsafeWindow.yunData.shareid,
            uk: unsafeWindow.yunData.share_uk,
            product: "share",
            encrypt: 0,
          }),
        },
        (data) => {
          data = data.response;
          // 请求正常
          if (!data.errno) {
            this.downloadFileData(i, data.list[0].dlink);
            return;
          }
          // 请求报错
          onFailed(data.errno);
        },
        onFailed
      );
    }
    getTplconfig.call(this, file);
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
        url: meta_url2 + JSON.stringify([String(file.fs_id)]),
        responseType: "json",
        method: "GET",
        headers: { "User-Agent": UA },
      },
      (data) => {
        data = data.response;
        // 请求正常
        if (!data.errno) {
          this.downloadFileData(i, data.info[0].dlink);
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
    let fileMd5 = data.responseHeaders.match(/content-md5: ([\da-f]{32})/i);
    if (fileMd5) file.md5 = fileMd5[1].toLowerCase();
    else if (file.size <= 3900000000 && !file.retry_996 && !this.isSharePage) {
      // 默认下载接口未拿到md5, 尝试使用旧下载接口, 旧接口请求文件size大于3.9G会返回403
      // 分享页的生成任务不要调用旧接口
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
    let file = this.fileInfoList[i];
    // 跳过扫描失败的目录路径
    if (file.errno && file.isdir) {
      this.checkMd5(i + 1);
      return;
    }
    this.onProcess(i, this.fileInfoList);
    this.onProgress(false, "极速生成中...");
    // this.isSharePage ? this.getShareDlink(i) : this.getDlink(i);
    // 23.4.27: 错误md5在文件上传者账号使用此接口正常转存, 在其他账号则报错#404(#31190), 导致生成秒传完全无法验证, 故弃用meta内的md5
    // 23.5.4: 发现错误md5只要改成大写, 在上传者账号就能正常返回#31190, 而正确md5则大小写都能正常转存, 故重新启用此验证过程
    // 主要是因为频繁请求直链接口获取正确md5会导致#9019错误(即账号被限制), 对大批量生成秒传有很大影响, 极速生成功能使用此验证则可以节约请求以避免此问题
    // 23.5.15: 错误md5问题的原理: 通过网页端上传大文件(分片上传)发现, list接口的错误md5仅在上传完成后24h内有效, 且多次上传相同的文件时, 得到的错误md5也相同
    // 故猜测此错误md5实际对应block_list(分片md5列表), 用于在服务端计算出文件完整md5前临时代替使用
    createFileV2.call(
      this,
      file,
      (data: any) => {
        data = data.response;
        // errno=-10即网盘容量已满, 由于31190(秒传无效)的优先级高于-10, 所以验证md5时此错误可视为验证成功
        if ([0, -10].includes(data.errno)) this.checkMd5(i + 1); // md5验证成功
        else if (31190 === data.errno) {
          // md5验证失败, 执行普通生成, 仅在此处保存任务进度, 生成页不保存进度
          if (!this.isSharePage)
            GM_setValue("unfinish", {
              file_info_list: this.fileInfoList,
              file_id: i,
              isCheckMd5: true,
            });
          this.isSharePage ? this.getShareDlink(i) : this.getDlink(i);
        } else {
          // 接口访问失败
          file.errno = data.errno;
          this.checkMd5(i + 1);
        }
      },
      (statusCode: number) => {
        file.errno = statusCode;
        this.checkMd5(i + 1);
      },
      0,
      true
    );
  }

  /**
   * @description: 用于解析度盘主页的文件列表数据
   */
  parseMainFileList() {
    for (let item of this.selectList) {
      if (item.isdir) this.dirList.push(item.path);
      else
        this.fileInfoList.push({
          path: item.path,
          size: item.size,
          fs_id: item.fs_id,
          // 已开启极速生成, 直接取meta内的md5
          md5: this.isFast ? decryptMd5(item.md5.toLowerCase()) : "",
          md5s: "",
        });
    }
  }

  /**
   * @description: 用于解析分享页的文件列表数据
   */
  parseShareFileList(list = this.selectList) {
    for (let item of list) {
      let path: string;
      if ("app_id" in item)
        path = item.isdir ? item.path : item.server_filename;
      else path = item.path;
      if ("/" !== path.charAt(0)) path = "/" + path; // 补齐路径开头的斜杠
      if (item.isdir) this.dirList.push(path);
      else
        this.fileInfoList.push({
          path: path,
          size: item.size,
          fs_id: item.fs_id,
          md5: item.md5 && decryptMd5(item.md5.toLowerCase()),
          md5s: "",
        });
    }
  }
}
