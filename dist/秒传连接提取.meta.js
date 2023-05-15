// ==UserScript==
// @name            秒传链接提取
// @version         2.7.8
// @author          mengzonefire
// @description     用于提取和生成百度网盘秒传链接
// @homepage        https://greasyfork.org/zh-CN/scripts/424574
// @supportURL      https://github.com/mengzonefire/rapid-upload-userscript/issues
// @match           *://pan.baidu.com/disk/home*
// @match           *://pan.baidu.com/disk/main*
// @match           *://pan.baidu.com/disk/synchronization*
// @match           *://pan.baidu.com/s/*
// @match           *://yun.baidu.com/disk/home*
// @match           *://yun.baidu.com/disk/main*
// @match           *://yun.baidu.com/disk/synchronization*
// @match           *://yun.baidu.com/s/*
// @match           *://wangpan.baidu.com/disk/home*
// @match           *://wangpan.baidu.com/disk/main*
// @match           *://wangpan.baidu.com/disk/synchronization*
// @match           *://wangpan.baidu.com/s/*
// @name:en         rapidupload-userscript
// @license         GPLv3
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBUlEQVR4AZTTJRBUURTH4TtDwXuPdPrgbhHXiksf3CPucRNScHd3d3d3uO9bKeu7b79+fun8Q17CNHyMMUqaiPE4fEyYVjjGNKnNwQ4lpgV8lManEfwfosLHEGPU1N3ZnAv4qlT+NiQ56uPWSjKBrztUSnIaB66sY1vgxgxoMXB5NbsCB9rxcB5fN2M5/16nCFxeS6YTezpzsB1Pu/C2O7/78/99eYBYHXh+gqdHObGIK4GHgevjVIt1AgAnhvE4cGe8euoHbizgYuD2RGgx8O0RpwIPRmsmJDGqcrANd3pLo/qVr03hUlcpfSwf0/vD3JwkPdPK5/zhkOz+/f1FIDv/RcnOAEjywH/DhgADAAAAAElFTkSuQmCC
// @namespace       moe.cangku.mengzonefire
// @homepageURL     https://greasyfork.org/zh-CN/scripts/424574
// @contributionURL https://afdian.net/@mengzonefire
// @description:en  input bdlink to get files or get bdlink for Baidu™ WebDisk.
// @compatible      firefox Violentmonkey
// @compatible      firefox Tampermonkey
// @compatible      chrome Violentmonkey
// @compatible      chrome Tampermonkey
// @compatible      edge Violentmonkey
// @compatible      edge Tampermonkey
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_setClipboard
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_registerMenuCommand
// @grant           unsafeWindow
// @run-at          document-body
// @connect         baidu.com
// @connect         baidupcs.com
// @connect         cdn.jsdelivr.net
// @connect         *
// @downloadURL     https://greasyfork.org/scripts/424574/code/%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96.user.js
// @updateURL       https://greasyfork.org/scripts/424574/code/%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96.user.js
// @antifeature     referral-link 23.4.5: 加了一个百度官方的网盘会员推广 (从那里开通可使作者获得佣金), 觉得碍眼可以点 "不再显示" 永久隐藏
// ==/UserScript==
