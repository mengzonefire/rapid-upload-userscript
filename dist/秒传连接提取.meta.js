// ==UserScript==
// @name 秒传链接提取
// @version 2.0.0
// @author mengzonefire
// @description 用于提取和生成百度网盘秒传链接
// @homepage https://greasyfork.org/zh-CN/scripts/424574
// @supportURL https://github.com/mengzonefire/rapid-upload-userscript/issues
// @match *://pan.baidu.com/disk/home*
// @match *://pan.baidu.com/disk/main*
// @match *://yun.baidu.com/disk/home*
// @name:en rapidupload-userscript
// @license MIT
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVR4AWL4//8/RRjO8Iucx+noO0O2qmlbUEnt5r3Juas+hsQD6KaG7dqCKPgx72Pe9GIY27btZBrbtm3btm0nO12D7tVXe63jqtqqU/iDw9K58sEruKkngH0DBljOE+T/qqx/Ln718RZOFasxyd3XRbWzlFMxRbgOTx9QWFzHtZlD+aqLb108sOAIAai6+NbHW7lUHaZkDFJt+wp1DG7R1d0b7Z88EOL08oXwjokcOvvUxYMjBFCamWP5KjKBjKOpZx2HEPj+Ieod26U+dpg6lK2CIwTQH0oECGT5eHj+IgSueJ5fPaPg6PZrz6DGHiGAISE7QPrIvIKVrSvCe2DNHSsehIDatOBna/+OEOgTQE6WAy1AAFiVcf6PhgCGxEvlA9QngLlAQCkLsNWhBZIDz/zg4ggmjHfYxoPGEMPZECW+zjwmFk6Ih194y7VHYGOPvEYlTAJlQwI4MEhgTOzZGiNalRpGgsOYFw5lEfTKybgfBtmuTNdI3MrOTAQmYf/DNcAwDeycVjROgZFt18gMso6V5Z8JpcEk2LPKpOAH0/4bKMCAYnuqm7cHOGHJTBRhAEJN9d/t5zCxAAAAAElFTkSuQmCC
// @namespace moe.cangku.mengzonefire
// @homepageURL https://greasyfork.org/zh-CN/scripts/424574
// @contributionURL https://afdian.net/@mengzonefire
// @compatible firefox Violentmonkey
// @compatible firefox Tampermonkey
// @compatible chrome Violentmonkey
// @compatible chrome Tampermonkey
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @grant GM_setClipboard
// @grant GM_getResourceText
// @grant GM_addStyle
// @resource swalCss https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css
// @require https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @require https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @require https://cdn.staticfile.org/spark-md5/3.0.0/spark-md5.min.js
// @require https://cdn.jsdelivr.net/npm/js-base64
// @run-at document-start
// @connect *
// ==/UserScript==
