// ==UserScript==
// @name            秒传链接提取
// @namespace       moe.cangku.mengzonefire
// @version         1.9.0
// @description     用于提取和生成百度网盘秒传链接
// @author          mengzonefire
// @license         MIT
// @compatible      firefox Tampermonkey
// @compatible      firefox Violentmonkey
// @compatible      chrome Tampermonkey
// @compatible      chrome Violentmonkey
// @contributionURL https://afdian.net/@mengzonefire
// @match           *://pan.baidu.com/disk/main*
// @match           *://pan.baidu.com/disk/home*
// @match           *://yun.baidu.com/disk/home*
// @resource swalCss https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css
// @require         https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @require         https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @require         https://cdn.staticfile.org/spark-md5/3.0.0/spark-md5.min.js
// @require         https://cdn.jsdelivr.net/npm/js-base64
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_setClipboard
// @grant           GM_xmlhttpRequest
// @grant           GM_getResourceText
// @grant           GM_addStyle
// @run-at          document-start
// @connect         *
// ==/UserScript==