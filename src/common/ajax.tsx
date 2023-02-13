/*
 * @Author: mengzonefire
 * @Date: 2021-08-27 14:48:24
 * @LastEditTime: 2023-02-14 04:10:09
 * @LastEditors: mengzonefire
 * @Description: 自封装JQ ajax方法
 */

import { ajaxError, TAG, version } from "./const";

export default function ajax(
  config: any,
  callback: (response: any) => void,
  failback: (statusCode: number) => void
) {
  GM_xmlhttpRequest({
    ...config,
    onload: (r: any) => {
      // console.log(r); // debug
      if (Math.floor(r.status / 100) === 2) {
        console.info(
          "%s version: %s 接口返回: %s",
          TAG,
          version,
          JSON.stringify(r.response)
        ); // user debug
        callback(r);
      } else failback(r.status);
    },
    onerror: () => {
      failback(ajaxError);
    },
  });
}
