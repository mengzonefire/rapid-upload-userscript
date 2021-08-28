/*
 * @Author: mengzonefire
 * @Date: 2021-08-27 14:48:24
 * @LastEditTime: 2021-08-28 16:40:08
 * @LastEditors: mengzonefire
 * @Description: 自封装JQ ajax方法
 */

import { ajaxError } from "./const";

export default function ajax(
  config: any,
  callback: (data: any, xhr: JQuery.jqXHR) => void,
  failback: (statusCode: number) => void
) {
  $.ajax({
    ...config,
    success: (data: any, _statusTxt: string, jqXHR: JQuery.jqXHR) => {
      if (jqXHR.status == 200) callback(data, jqXHR);
      else failback(jqXHR.status);
    },
    error: () => {
      failback(ajaxError);
    },
  });
}
