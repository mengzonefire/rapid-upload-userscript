/*
 * @Author: mengzonefire
 * @Date: 2021-08-26 12:01:28
 * @LastEditTime: 2021-08-29 17:55:49
 * @LastEditors: mengzonefire
 * @Description: 秒传链接解析器
 */

export default function DuParser() {}

DuParser.parse = function generalDuCodeParse(szUrl:string) {
  let r: any;
  if (szUrl.indexOf("bdpan") == 0) {
    r = DuParser.parseDu_v1(szUrl);
    r.ver = "PanDL";
  } else if (szUrl.indexOf("BaiduPCS-Go") == 0) {
    r = DuParser.parseDu_v2(szUrl);
    r.ver = "PCS-Go";
  } else {
    r = DuParser.parseDu_v3(szUrl);
    r.ver = "梦姬标准";
  }
  return r;
};

DuParser.parseDu_v1 = function parseDu_v1(szUrl: string) {
  return szUrl
    .replace(/\s*bdpan:\/\//g, " ")
    .trim()
    .split(" ")
    .map(function (z) {
      return z
        .trim()
        .fromBase64()
        .match(/([\s\S]+)\|([\d]{1,20})\|([\dA-Fa-f]{32})\|([\dA-Fa-f]{32})/);
    })
    .filter(function (z) {
      return z;
    })
    .map(function (info: Array<any>) {
      return {
        md5: info[3],
        md5s: info[4],
        size: info[2],
        path: info[1],
      };
    });
};

DuParser.parseDu_v2 = function parseDu_v2(szUrl: string) {
  return szUrl
    .split("\n")
    .map(function (z) {
      // unsigned long long: 0~18446744073709551615
      return z
        .trim()
        .match(
          /-length=([\d]{1,20}) -md5=([\dA-Fa-f]{32}) -slicemd5=([\dA-Fa-f]{32})[\s\S]+"([\s\S]+)"/
        );
    })
    .filter(function (z) {
      return z;
    })
    .map(function (info) {
      return {
        md5: info[2],
        md5s: info[3],
        size: info[1],
        path: info[4],
      };
    });
};

DuParser.parseDu_v3 = function parseDu_v3(szUrl: string) {
  return szUrl
    .split("\n")
    .map(function (z) {
      return z
        .trim()
        .match(
          /^([\dA-Fa-f]{32})#(?:([\dA-Fa-f]{32})#)?([\d]{1,20})#([\s\S]+)/
        );
    })
    .filter(function (z) {
      return z;
    })
    .map(function (info) {
      return {
        // 标准码 / 短版标准码(无md5s)
        md5: info[1],
        md5s: info[2] || "",
        size: info[3],
        path: info[4],
      };
    });
};