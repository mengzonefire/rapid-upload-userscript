/*
 * @Author: mengzonefire
 * @Date: 2021-08-26 12:01:28
 * @LastEditTime: 2022-08-29 10:21:05
 * @LastEditors: mengzonefire
 * @Description: 各种解析器
 */

import { bdlinkPattern } from "@/common/const";
import { decryptMd5 } from "./utils";

/**
 * @description: 从url中解析秒传链接
 */
export function parseQueryLink(url: string): string {
  let bdlinkB64 = url.match(bdlinkPattern);
  return bdlinkB64 ? bdlinkB64[1].fromBase64() : "";
}

/**
 * @description: 秒传链接解析器
 */
export function DuParser() {}

DuParser.parse = function generalDuCodeParse(szUrl: string) {
  let r: any;
  if (szUrl.indexOf("bdpan") === 0) {
    r = DuParser.parseDu_v1(szUrl);
    r.ver = "PanDL";
  } else if (szUrl.indexOf("BaiduPCS-Go") === 0) {
    r = DuParser.parseDu_v2(szUrl);
    r.ver = "PCS-Go";
  } else if (szUrl.indexOf("BDLINK") === 0) {
    r = DuParser.parseDu_v3(szUrl);
    r.ver = "游侠 v1";
  } else {
    r = DuParser.parseDu_v4(szUrl);
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
        .match(/([\s\S]+)\|([\d]{1,20})\|([\da-f]{32})\|([\da-f]{32})/i);
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
          /-length=([\d]{1,20}) -md5=([\da-f]{32}) -slicemd5=([\da-f]{32})[\s\S]+"([\s\S]+)"/i
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
  var raw = atob(szUrl.slice(6).replace(/\s/g, ""));
  if (raw.slice(0, 5) !== "BDFS\x00") {
    return null;
  }
  var buf = new SimpleBuffer(raw);
  var ptr = 9;
  var arrFiles = [];
  var fileInfo: {
      size?: any;
      md5?: any;
      md5s?: any;
      nameSize?: any;
      path?: any;
    },
    nameSize: number;
  var total = buf.readUInt(5);
  var i: number;

  for (i = 0; i < total; i++) {
    // 大小 (8 bytes)
    // MD5 + MD5S (0x20)
    // nameSize (4 bytes)
    // Name (unicode)
    fileInfo = {};
    fileInfo.size = buf.readULong(ptr + 0);
    fileInfo.md5 = buf.readHex(ptr + 8, 0x10);
    fileInfo.md5s = buf.readHex(ptr + 0x18, 0x10);
    nameSize = buf.readUInt(ptr + 0x28) << 1;
    fileInfo.nameSize = nameSize;
    ptr += 0x2c;
    fileInfo.path = buf.readUnicode(ptr, nameSize);
    arrFiles.push(fileInfo);
    ptr += nameSize;
  }

  return arrFiles;
};

DuParser.parseDu_v4 = function parseDu_v3(szUrl: string) {
  return szUrl
    .split("\n")
    .map(function (z) {
      return z
        .trim()
        .match(
          /^([\da-f]{9}[\da-z][\da-f]{22})#(?:([\da-f]{32})#)?([\d]{1,20})#([\s\S]+)/i
        ); // 22.8.29新增支持第10位为g-z的加密md5, 输入后自动解密转存
    })
    .filter(function (z) {
      return z;
    })
    .map(function (info) {
      return {
        // 标准码 / 短版标准码(无md5s)
        md5: decryptMd5(info[1].toLowerCase()),
        md5s: info[2] || "",
        size: info[3],
        path: info[4],
      };
    });
};

/**
 * 一个简单的类似于 NodeJS Buffer 的实现.
 * 用于解析游侠度娘提取码。
 * @param {SimpleBuffer}
 */

function SimpleBuffer(str: string) {
  this.fromString(str);
}

SimpleBuffer.toStdHex = function toStdHex(n: {
  toString: (arg0: number) => string;
}) {
  return ("0" + n.toString(16)).slice(-2);
};

SimpleBuffer.prototype.fromString = function fromString(str: string) {
  var len = str.length;
  this.buf = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    this.buf[i] = str.charCodeAt(i);
  }
};

SimpleBuffer.prototype.readUnicode = function readUnicode(
  index: any,
  size: number
) {
  if (size & 1) {
    size++;
  }

  var bufText = Array.prototype.slice
    .call(this.buf, index, index + size)
    .map(SimpleBuffer.toStdHex);
  var buf = [""];

  for (var i = 0; i < size; i += 2) {
    buf.push(bufText[i + 1] + bufText[i]);
  }

  return JSON.parse('"' + buf.join("\\u") + '"');
};

SimpleBuffer.prototype.readNumber = function readNumber(
  index: number,
  size: any
) {
  var ret = 0;

  for (var i = index + size; i > index; ) {
    ret = this.buf[--i] + ret * 256;
  }

  return ret;
};

SimpleBuffer.prototype.readUInt = function readUInt(index: any) {
  return this.readNumber(index, 4);
};

SimpleBuffer.prototype.readULong = function readULong(index: any) {
  return this.readNumber(index, 8);
};

SimpleBuffer.prototype.readHex = function readHex(index: any, size: any) {
  return Array.prototype.slice
    .call(this.buf, index, index + size)
    .map(SimpleBuffer.toStdHex)
    .join("");
};
