/*
 * @Author: mengzonefire
 * @Date: 2021-08-27 14:48:24
 * @LastEditTime: 2022-11-14 05:50:35
 * @LastEditors: mengzonefire
 * @Description: 自封装JQ ajax方法
 */

import { ajaxError } from "./const";

export default function ajax(
  config: any,
  callback: (response: any) => void,
  failback: (statusCode: number) => void
) {
  GM_xmlhttpRequest({
    ...config,
    onload: (r: any) => {
      // console.log(r); // debug
      if (Math.floor(r.status / 100) === 2) callback(r);
      else failback(r.status);
    },
    onerror: () => {
      failback(ajaxError);
    },
  });
}
