// ==UserScript==
// @name 秒传链接提取
// @version 2.1.4
// @author mengzonefire
// @description 用于提取和生成百度网盘秒传链接
// @homepage https://greasyfork.org/zh-CN/scripts/424574
// @supportURL https://github.com/mengzonefire/rapid-upload-userscript/issues
// @match *://pan.baidu.com/disk/home*
// @match *://pan.baidu.com/disk/main*
// @match *://yun.baidu.com/disk/home*
// @match *://yun.baidu.com/disk/main*
// @name:en rapidupload-userscript
// @license GPLv3
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBUlEQVR4AZTTJRBUURTH4TtDwXuPdPrgbhHXiksf3CPucRNScHd3d3d3uO9bKeu7b79+fun8Q17CNHyMMUqaiPE4fEyYVjjGNKnNwQ4lpgV8lManEfwfosLHEGPU1N3ZnAv4qlT+NiQ56uPWSjKBrztUSnIaB66sY1vgxgxoMXB5NbsCB9rxcB5fN2M5/16nCFxeS6YTezpzsB1Pu/C2O7/78/99eYBYHXh+gqdHObGIK4GHgevjVIt1AgAnhvE4cGe8euoHbizgYuD2RGgx8O0RpwIPRmsmJDGqcrANd3pLo/qVr03hUlcpfSwf0/vD3JwkPdPK5/zhkOz+/f1FIDv/RcnOAEjywH/DhgADAAAAAElFTkSuQmCC
// @namespace moe.cangku.mengzonefire
// @homepageURL https://greasyfork.org/zh-CN/scripts/424574
// @contributionURL https://afdian.net/@mengzonefire
// @description:en input bdlink to get files or get bdlink for Baidu™ WebDisk.
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
// @grant GM_xmlhttpRequest
// @resource swalCss https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css
// @resource swalCssBak https://unpkg.com/sweetalert2@11/dist/sweetalert2.min.css
// @require https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @require https://cdn.staticfile.org/spark-md5/3.0.0/spark-md5.min.js
// @require https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @require https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js
// @require https://unpkg.com/sweetalert2@11/dist/sweetalert2.min.js
// @require https://unpkg.com/js-base64@3.7.2/base64.js
// @run-at document-start
// @connect baidu.com
// @connect baidupcs.com
// @connect cdn.jsdelivr.net
// @connect *
// ==/UserScript==

(() => {
    var __webpack_modules__ = {
        555: module => {
            module.exports = '/*按钮样式*/\r\n.mzf_btn {\r\n  text-align: center;\r\n  font-size: 0.85em;\r\n  color: #09aaff;\r\n  border: 2px solid #c3eaff;\r\n  border-radius: 4px;\r\n  margin: 0 5px;\r\n  padding: 10px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n/*超链接样式*/\r\n.mzf_link {\r\n  font-family: inherit;\r\n  color: #09aaff;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n}\r\n\r\n/*行样式*/\r\n.mzf_text {\r\n  font-feature-settings: "lnum";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  color: #545454;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 34px;\r\n  display: block;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n\r\n/*新版度盘页面的按钮样式(直接拷贝)*/\r\n.mzf_new_btn {\r\n  -webkit-font-smoothing: antialiased;\r\n  -webkit-tap-highlight-color: transparent;\r\n  vertical-align: middle;\r\n  font: inherit;\r\n  overflow: visible;\r\n  text-transform: none;\r\n  font-family: SFUIText, PingFangSC-Regular, Helvetica Neue, Helvetica, Arial,\r\n    sans-serif;\r\n  display: inline-block;\r\n  line-height: 1;\r\n  white-space: nowrap;\r\n  cursor: pointer;\r\n  background: #fff;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  outline: 0;\r\n  margin: 0;\r\n  transition: 0.1s;\r\n  color: #fff;\r\n  background-color: #06a7ff;\r\n  font-weight: 700;\r\n  padding: 8px 24px;\r\n  height: 32px;\r\n  font-size: 14px;\r\n  border-radius: 16px;\r\n  border: none;\r\n}\r\n';
        },
        197: module => {
            module.exports = 'input[type="checkbox"],\r\ninput[type="radio"] {\r\n  --active: #275efe;\r\n  --active-inner: #fff;\r\n  --focus: 2px rgba(39, 94, 254, 0.3);\r\n  --border: #bbc1e1;\r\n  --border-hover: #275efe;\r\n  --background: #fff;\r\n  --disabled: #f6f8ff;\r\n  --disabled-inner: #e1e6f9;\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  height: 21px;\r\n  outline: none;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  position: relative;\r\n  margin: 0;\r\n  cursor: pointer;\r\n  border: 1px solid var(--bc, var(--border));\r\n  background: var(--b, var(--background));\r\n  -webkit-transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;\r\n  transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;\r\n}\r\ninput[type="checkbox"]:after,\r\ninput[type="radio"]:after {\r\n  content: "";\r\n  display: block;\r\n  left: 0;\r\n  top: 0;\r\n  position: absolute;\r\n  -webkit-transition: opacity var(--d-o, 0.2s),\r\n    -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);\r\n  transition: opacity var(--d-o, 0.2s),\r\n    -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);\r\n  transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),\r\n    opacity var(--d-o, 0.2s);\r\n  transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),\r\n    opacity var(--d-o, 0.2s),\r\n    -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);\r\n}\r\ninput[type="checkbox"]:checked,\r\ninput[type="radio"]:checked {\r\n  --b: var(--active);\r\n  --bc: var(--active);\r\n  --d-o: 0.3s;\r\n  --d-t: 0.6s;\r\n  --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);\r\n}\r\ninput[type="checkbox"]:disabled,\r\ninput[type="radio"]:disabled {\r\n  --b: var(--disabled);\r\n  cursor: not-allowed;\r\n  opacity: 0.9;\r\n}\r\ninput[type="checkbox"]:disabled:checked,\r\ninput[type="radio"]:disabled:checked {\r\n  --b: var(--disabled-inner);\r\n  --bc: var(--border);\r\n}\r\ninput[type="checkbox"]:disabled + label,\r\ninput[type="radio"]:disabled + label {\r\n  cursor: not-allowed;\r\n}\r\ninput[type="checkbox"]:hover:not(:checked):not(:disabled),\r\ninput[type="radio"]:hover:not(:checked):not(:disabled) {\r\n  --bc: var(--border-hover);\r\n}\r\ninput[type="checkbox"]:focus,\r\ninput[type="radio"]:focus {\r\n  box-shadow: 0 0 0 var(--focus);\r\n}\r\ninput[type="checkbox"]:not(.switch),\r\ninput[type="radio"]:not(.switch) {\r\n  width: 21px;\r\n}\r\ninput[type="checkbox"]:not(.switch):after,\r\ninput[type="radio"]:not(.switch):after {\r\n  opacity: var(--o, 0);\r\n}\r\ninput[type="checkbox"]:not(.switch):checked,\r\ninput[type="radio"]:not(.switch):checked {\r\n  --o: 1;\r\n}\r\ninput[type="checkbox"] + label,\r\ninput[type="radio"] + label {\r\n  font-size: 18px;\r\n  line-height: 21px;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  cursor: pointer;\r\n  margin-left: 4px;\r\n}\r\n\r\ninput[type="checkbox"]:not(.switch) {\r\n  border-radius: 7px;\r\n}\r\ninput[type="checkbox"]:not(.switch):after {\r\n  width: 5px;\r\n  height: 9px;\r\n  border: 2px solid var(--active-inner);\r\n  border-top: 0;\r\n  border-left: 0;\r\n  left: 7px;\r\n  top: 4px;\r\n  -webkit-transform: rotate(var(--r, 20deg));\r\n  transform: rotate(var(--r, 20deg));\r\n}\r\ninput[type="checkbox"]:not(.switch):checked {\r\n  --r: 43deg;\r\n}\r\ninput[type="checkbox"].switch {\r\n  width: 38px;\r\n  border-radius: 11px;\r\n}\r\ninput[type="checkbox"].switch:after {\r\n  left: 2px;\r\n  top: 2px;\r\n  border-radius: 50%;\r\n  width: 15px;\r\n  height: 15px;\r\n  background: var(--ab, var(--border));\r\n  -webkit-transform: translateX(var(--x, 0));\r\n  transform: translateX(var(--x, 0));\r\n}\r\ninput[type="checkbox"].switch:checked {\r\n  --ab: var(--active-inner);\r\n  --x: 17px;\r\n}\r\ninput[type="checkbox"].switch:disabled:not(:checked):after {\r\n  opacity: 0.6;\r\n}\r\n';
        },
        184: module => {
            module.exports = '<div class="panel-body" style="height: 250px; overflow-y: scroll">\r\n  <div style="border: 1px #000000; width: 100%; margin: 0 auto">\r\n    <span>\r\n      <p>\r\n        已将完整的秒传转存功能移植到\r\n        <a href="https://rapidacg.gmgard.moe/" class="mzf_link" rel="noopener noreferrer" target="_blank">秒传网页版工具</a>\r\n      </p>\r\n\r\n      <p>\r\n        * 无需安装插件, <span style="color: red">支持所有平台</span>, 强烈推荐\r\n      </p>\r\n\r\n      <p>\r\n        工具源码托管在\r\n        <img src="https://github.githubassets.com/favicons/favicon.png" width="16" /><a\r\n          href="https://github.com/mengzonefire/baidupan-rapidupload" class="mzf_link" rel="noopener noreferrer"\r\n          target="_blank">Github</a>, 欢迎搭建分流\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>\r\n        若喜欢该脚本可前往\r\n        <a href="https://afdian.net/@mengzonefire" class="mzf_link" rel="noopener noreferrer" target="_blank">赞助页</a>\r\n        支持作者\r\n      </p>\r\n\r\n      <p>\r\n        若出现任何问题请前往\r\n        <a href="https://greasyfork.org/zh-CN/scripts/424574" class="mzf_link" rel="noopener noreferrer"\r\n          target="_blank">脚本主页</a>\r\n        反馈\r\n      </p>\r\n\r\n      <p>\r\n        脚本源码托管在\r\n        <img src="https://github.githubassets.com/favicons/favicon.png" width="16" /><a\r\n          href="https://github.com/mengzonefire/rapid-upload-userscript" class="mzf_link" rel="noopener noreferrer"\r\n          target="_blank">Github</a>, 若喜欢可以给个Star\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.1.3 更新内容(22.2.24):</p>\r\n\r\n      <p>1. 修复新版度盘页面下的按钮样式</p>\r\n\r\n      <p>2. 修复新版度盘页面下的 "打开目录" 功能</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.1.0 更新内容(22.1.22):</p>\r\n\r\n      <p>支持 新版度盘页面 下的 "生成秒传" 功能</p>\r\n\r\n      <img src="https://pic.rmb.bdstatic.com/bjh/8c05bf7c7ba44cb6f7e0a68c3e17ab54.png" />\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.0.20 更新内容(22.1.22):</p>\r\n\r\n      <p>\r\n        修复部分生成秒传时提示 "请求失败...(#514)" 的问题, 生成时若弹出跨域提示,\r\n        请选择允许\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.0.12 更新内容(21.11.9):</p>\r\n\r\n      <p>\r\n        修复所有失效的文档链接, 见\r\n        <a href="https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc" class="mzf_link"\r\n          rel="noopener noreferrer" target="_blank">文档目录</a>\r\n      </p>\r\n\r\n      <p>修复在目标目录下点击"打开目录"按钮, 文件列表不刷新的问题</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.0.11 更新内容(21.10.18):</p>\r\n\r\n      <p>移除一处可能导致生成错误秒传的代码</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.0.10 更新内容(21.10.1):</p>\r\n\r\n      <p>修复失效的教程文档地址</p>\r\n\r\n      <p>*部分地区打开显示石墨文档正在升级</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>2.0.5 更新内容(21.9.1):</p>\r\n\r\n      <p>\r\n        转存路径留空现改为默认转存到 <span style="color: red">当前目录</span>\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p><span style="color: red">2.0.0</span> 更新内容(21.8.30):</p>\r\n\r\n      <p>1.移除游侠秒传格式的支持</p>\r\n\r\n      <p>2.重构代码, 全面优化, 提升使用体验</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.8.5 更新内容(21.7.30):</p>\r\n\r\n      <p>\r\n        修复了部分转存提示 "<span style="color: red">转存失败(尝试...)(#2)</span>" 的问题\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.8.4 更新内容(21.7.18):</p>\r\n\r\n      <p>\r\n        修复了部分生成提示 "<span style="color: red">md5获取失败</span>" 的问题\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.8.1 更新内容(21.7.6):</p>\r\n\r\n      <p>支持转存与生成 <span style="color: red">20G以上</span> 文件的秒传</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.7.9 更新内容(21.6.28):</p>\r\n\r\n      <p>1.大幅提升非会员账号生成秒传的速度</p>\r\n\r\n      <p>\r\n        2.修复生成4G以上文件提示"<span style="color: red">服务器错误(#500)</span>"的问题\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.7.8 更新内容(21.6.25):</p>\r\n\r\n      <p>\r\n        修复了绝大部分转存提示 "<span style="color: red">文件不存在(秒传未生效)(#404)</span>" 的问题\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.7.3 更新内容(21.6.23):</p>\r\n\r\n      <p>升级样式&主题, 提升观感, 修复了设置内的主题适配</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.6.8 更新内容(21.6.18)</p>\r\n\r\n      <p>\r\n        移除 <span style="color: red">修复下载</span> 功能(已在21年4月上旬失效),\r\n        后续不会再考虑修复该功能\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.6.7 更新内容(21.3.30)</p>\r\n\r\n      <p>修复部分秒传转存时提示 "文件不存在(秒传无效)"</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.6.1 更新内容(21.3.29)</p>\r\n\r\n      <p>\r\n        新增 <span style="color: red">直接修复下载</span> 的功能,\r\n        选中网盘内文件, 再点击上方\r\n        <span style="color: red">修复下载</span> 按钮即可生成可正常下载的新文件\r\n      </p>\r\n\r\n      <img src="https://pic.rmb.bdstatic.com/bjh/5e05f7c1f772451b8efce938280bcaee.png" />\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.5.7 更新内容(21.3.9)</p>\r\n\r\n      <p>\r\n        修复部分文件转存后 <span style="color: red">无法下载</span> 的问题,\r\n        可尝试 <span style="color: red">重新转存</span> 之前无法下载文件.\r\n        且转存新增了 <span style="color: red">修复下载</span> 功能\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.5.4 更新内容(21.2.11)</p>\r\n\r\n      <p>\r\n        面向分享者的\r\n        <a href="https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc/generate-bdcode/"\r\n          rel="noopener noreferrer" target="_blank">分享教程</a>\r\n        的防和谐方法更新:\r\n      </p>\r\n\r\n      <p>\r\n        经测试, 原教程的 "固实压缩+加密文件名"\r\n        已无法再防和谐(在度盘移动端依旧可以在线解压),\r\n        目前有效的防和谐方法请参考教程内的\r\n        <span style="color: red">"双层压缩"</span>\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.4.3 更新内容(21.2.6):</p>\r\n\r\n      <p>修复了生成秒传时, 秒传有效, 仍提示"md5获取失败(#996)"的问题</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.4.9 更新内容(21.1.28):</p>\r\n\r\n      <p>1. 重新兼容了暴力猴插件, 感谢Trendymen提供的代码</p>\r\n\r\n      <p>\r\n        2. 新增更换主题的功能, 在秒传输入框中输入setting进入设置页,\r\n        更换为其他主题, 即可避免弹窗时的背景变暗\r\n      </p>\r\n\r\n      <p>3. 修改了部分代码逻辑, 秒传按钮不会再出现在最左边了</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.4.6 更新内容(21.1.14):</p>\r\n\r\n      <p>本次更新针对生成功能做了优化:</p>\r\n\r\n      <p>\r\n        1. 使用超会账号进行10个以上的批量秒传生成时, 会弹窗提示设置生成间隔,\r\n        防止生成过快导致接口被限制(#403)\r\n      </p>\r\n\r\n      <p>\r\n        2. 为秒传分享者提供了一份<a href="https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc/generate-bdcode/"\r\n          rel="noopener noreferrer" target="_blank">分享教程</a>用于参考\r\n      </p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.4.5 更新内容(21.1.12):</p>\r\n\r\n      <p>修复了1.4.0后可能出现的秒传按钮无效、显示多个秒传按钮的问题</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.3.7 更新内容(21.1.3):</p>\r\n\r\n      <p>修复了会员账号生成50M以下文件时提示 "md5获取失败" 的问题</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.3.3 更新内容(20.12.1):</p>\r\n\r\n      <p>\r\n        秒传生成完成后点击复制按钮之前都可以继续任务,防止误操作关闭页面导致生成结果丢失\r\n      </p>\r\n\r\n      <p>修改代码执行顺序防止秒传按钮出现在最左端</p>\r\n\r\n      <p>修复了跨域提示中失效的说明图片</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.2.9 更新内容(20.11.11):</p>\r\n\r\n      <p>生成秒传的弹窗添加了关闭按钮</p>\r\n\r\n      <p>删除了全部生成失败时的复制和测试按钮</p>\r\n\r\n      <p>秒传生成后加了一个导出文件路径的选项(默认不导出)</p>\r\n\r\n      <p>在输入保存路径的弹窗添加了校验, 防止输入错误路径</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.2.5 更新内容(20.11.4):</p>\r\n\r\n      <p>优化按钮样式, 添加了md5获取失败的报错</p>\r\n\r\n      <p>修复从pan.baidu.com进入后不显示生成按钮的问题</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>1.2.4 更新内容(20.11.2):</p>\r\n\r\n      <p>新增生成秒传:</p>\r\n\r\n      <p>选择文件或文件夹后点击 "生成秒传" 即可开始生成</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>继续未完成任务:</p>\r\n\r\n      <p>若生成秒传期间关闭了网页, 再次点击 "生成秒传" 即可继续任务</p>\r\n\r\n      <p><br /></p>\r\n\r\n      <p>测试秒传功能:</p>\r\n\r\n      <p>\r\n        生成完成后, 点击"测试"按钮, 会自动转存并覆盖文件(文件内容不变),\r\n        以检测秒传有效性, 以及修复md5错误防止秒传失效\r\n      </p>\r\n    </span>\r\n  </div>\r\n</div>';
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.n = module => {
            var getter = module && module.__esModule ? () => module["default"] : () => module;
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var updateInfoVer = "2.1.3";
        var swalCssVer = "1.7.4";
        var donateVer = "2.1.0";
        var feedbackVer = "2.1.0";
        var locUrl = location.href;
        var baiduNewPage = "baidu.com/disk/main";
        var TAG = "[秒传链接提取 by mengzonefire]";
        var homePage = "https://greasyfork.org/zh-CN/scripts/424574";
        var donatePage = "https://afdian.net/@mengzonefire";
        var ajaxError = 514;
        var extCssUrl = {
            Default: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
            "WordPress Admin": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
            "Material UI": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
            Bulma: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
            "Bootstrap 4": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
        };
        var appError = {
            missDepend: "外部资源加载失败, 请前往脚本页反馈:\n" + homePage,
            SwalCssInvalid: "样式包数据错误, 请前往脚本页反馈:\n" + homePage,
            SwalCssErrReq: "样式包加载失败, 请前往脚本页反馈:\n" + homePage + "\n错误代码: "
        };
        var doc = {
            shareDoc: "https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc/generate-bdcode/",
            linkTypeDoc: "https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc/format-support/"
        };
        var linkStyle = 'class="mzf_link" rel="noopener noreferrer" target="_blank"';
        var btnStyle = 'class="mzf_btn" rel="noopener noreferrer" target="_blank"';
        var bdlinkPattern = /[\?#]bdlink=([\da-zA-Z+/=]+)/;
        var htmlCheckMd5 = '<p class="mzf_text">测试秒传 可防止秒传失效<a id="check_md5_btn" class="mzf_btn"><span class="text" style="width: auto;">测试</span></a></p>';
        var htmlDocument = '<p class="mzf_text">秒传无效/md5获取失败/防和谐等 可参考<a href="' + doc.shareDoc + '" ' + btnStyle + '><span class="text" style="width: auto;">分享教程</span></a></p>';
        var htmlDonate = '<p id="mzf_donate" class="mzf_text">若喜欢该脚本, 可前往 <a href="' + donatePage + '" ' + linkStyle + '>赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>';
        var htmlFeedback = '<p id="mzf_feedback" class="mzf_text">若有任何疑问, 可前往 <a href="' + homePage + '" ' + linkStyle + '>脚本主页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>';
        function initQueryLink() {
            var bdlinkB64 = locUrl.match(bdlinkPattern);
            return bdlinkB64 ? bdlinkB64[1].fromBase64() : "";
        }
        function DuParser() {}
        DuParser.parse = function generalDuCodeParse(szUrl) {
            var r;
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
        DuParser.parseDu_v1 = function parseDu_v1(szUrl) {
            return szUrl.replace(/\s*bdpan:\/\//g, " ").trim().split(" ").map((function(z) {
                return z.trim().fromBase64().match(/([\s\S]+)\|([\d]{1,20})\|([\dA-Fa-f]{32})\|([\dA-Fa-f]{32})/);
            })).filter((function(z) {
                return z;
            })).map((function(info) {
                return {
                    md5: info[3],
                    md5s: info[4],
                    size: info[2],
                    path: info[1]
                };
            }));
        };
        DuParser.parseDu_v2 = function parseDu_v2(szUrl) {
            return szUrl.split("\n").map((function(z) {
                return z.trim().match(/-length=([\d]{1,20}) -md5=([\dA-Fa-f]{32}) -slicemd5=([\dA-Fa-f]{32})[\s\S]+"([\s\S]+)"/);
            })).filter((function(z) {
                return z;
            })).map((function(info) {
                return {
                    md5: info[2],
                    md5s: info[3],
                    size: info[1],
                    path: info[4]
                };
            }));
        };
        DuParser.parseDu_v3 = function parseDu_v3(szUrl) {
            var raw = atob(szUrl.slice(6).replace(/\s/g, ""));
            if (raw.slice(0, 5) !== "BDFS\0") {
                return null;
            }
            var buf = new SimpleBuffer(raw);
            var ptr = 9;
            var arrFiles = [];
            var fileInfo, nameSize;
            var total = buf.readUInt(5);
            var i;
            for (i = 0; i < total; i++) {
                fileInfo = {};
                fileInfo.size = buf.readULong(ptr + 0);
                fileInfo.md5 = buf.readHex(ptr + 8, 16);
                fileInfo.md5s = buf.readHex(ptr + 24, 16);
                nameSize = buf.readUInt(ptr + 40) << 1;
                fileInfo.nameSize = nameSize;
                ptr += 44;
                fileInfo.path = buf.readUnicode(ptr, nameSize);
                arrFiles.push(fileInfo);
                ptr += nameSize;
            }
            return arrFiles;
        };
        DuParser.parseDu_v4 = function parseDu_v3(szUrl) {
            return szUrl.split("\n").map((function(z) {
                return z.trim().match(/^([\dA-Fa-f]{32})#(?:([\dA-Fa-f]{32})#)?([\d]{1,20})#([\s\S]+)/);
            })).filter((function(z) {
                return z;
            })).map((function(info) {
                return {
                    md5: info[1],
                    md5s: info[2] || "",
                    size: info[3],
                    path: info[4]
                };
            }));
        };
        function SimpleBuffer(str) {
            this.fromString(str);
        }
        SimpleBuffer.toStdHex = function toStdHex(n) {
            return ("0" + n.toString(16)).slice(-2);
        };
        SimpleBuffer.prototype.fromString = function fromString(str) {
            var len = str.length;
            this.buf = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                this.buf[i] = str.charCodeAt(i);
            }
        };
        SimpleBuffer.prototype.readUnicode = function readUnicode(index, size) {
            if (size & 1) {
                size++;
            }
            var bufText = Array.prototype.slice.call(this.buf, index, index + size).map(SimpleBuffer.toStdHex);
            var buf = [ "" ];
            for (var i = 0; i < size; i += 2) {
                buf.push(bufText[i + 1] + bufText[i]);
            }
            return JSON.parse('"' + buf.join("\\u") + '"');
        };
        SimpleBuffer.prototype.readNumber = function readNumber(index, size) {
            var ret = 0;
            for (var i = index + size; i > index; ) {
                ret = this.buf[--i] + ret * 256;
            }
            return ret;
        };
        SimpleBuffer.prototype.readUInt = function readUInt(index) {
            return this.readNumber(index, 4);
        };
        SimpleBuffer.prototype.readULong = function readULong(index) {
            return this.readNumber(index, 8);
        };
        SimpleBuffer.prototype.readHex = function readHex(index, size) {
            return Array.prototype.slice.call(this.buf, index, index + size).map(SimpleBuffer.toStdHex).join("");
        };
        var updateInfo = __webpack_require__(184);
        var updateInfo_default = __webpack_require__.n(updateInfo);
        var SwalConfig = {
            inputView: {
                title: "请输入秒传",
                input: "textarea",
                showCancelButton: true,
                inputPlaceholder: "[支持批量(换行分隔)]\n[支持PanDL/游侠/标准码/GO格式]\n[输入set进入设置页][输入gen进入生成页]",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: function(value) {
                    if (!value) {
                        return "链接不能为空";
                    }
                    if (value === "set") {
                        return;
                    }
                    if (value === "gen") {
                        return;
                    }
                    if (!DuParser.parse(value).length) {
                        return '<p>未识别到正确的链接 <a href="' + doc.linkTypeDoc + '" ' + linkStyle + ">查看支持格式</a></p>";
                    }
                }
            },
            inputPathView: {
                title: "请输入保存路径",
                input: "text",
                inputPlaceholder: "格式示例：/GTA5/, 留空保存在当前目录",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: function(value) {
                    if (value.match(illegalPathPattern)) {
                        return '不能含有字符\\":*?<>|, 格式示例：/GTA5/';
                    }
                }
            },
            processView: {
                showCloseButton: true,
                showConfirmButton: false,
                allowOutsideClick: false
            },
            finishView: {
                showCloseButton: true,
                allowOutsideClick: false
            },
            genUnfinish: {
                title: "检测到未完成的秒传任务",
                text: "是否继续进行?",
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: "是",
                cancelButtonText: "否"
            },
            genView: {
                title: "请输入需要生成的文件路径",
                input: "textarea",
                showCancelButton: true,
                showCloseButton: true,
                inputPlaceholder: "[支持批量(换行分隔)]",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: function(value) {
                    if (!value) {
                        return "文件路径不能为空";
                    }
                }
            },
            updateInfo: {
                title: "秒传链接提取 更新内容",
                showCloseButton: true,
                allowOutsideClick: false,
                confirmButtonText: "知道了",
                html: updateInfo_default()
            },
            checkRecursive: {
                icon: "info",
                title: "包含文件夹, 是否递归生成?",
                text: "若选是, 将同时生成各级子文件夹下的文件",
                allowOutsideClick: false,
                focusCancel: true,
                showCancelButton: true,
                reverseButtons: true,
                showCloseButton: true,
                confirmButtonText: "是",
                cancelButtonText: "否"
            },
            checkMd5Warning: {
                title: "使用前请注意",
                text: "测试秒传会转存并覆盖文件,若在生成期间修改过同名文件,为避免修改的文件丢失,请不要使用此功能!",
                input: "checkbox",
                inputPlaceholder: "不再显示",
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: "确定",
                cancelButtonText: "返回"
            },
            settingView: {
                title: "秒传链接提取 设置页",
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                allowOutsideClick: false,
                input: "select",
                inputValue: GM_getValue("swalThemes") || "Default",
                inputOptions: {
                    Default: "Default 白色主题(默认)",
                    Bulma: "Bulma 白色简约",
                    "Bootstrap 4": "Bootstrap4 白色简约",
                    "Material UI": "MaterialUI 白色主题",
                    Dark: "Dark 黑色主题",
                    "WordPress Admin": "WordPressAdmin 灰色主题"
                }
            },
            settingWarning: {
                title: "设置成功 刷新页面生效",
                showCloseButton: true,
                allowOutsideClick: false,
                confirmButtonText: "知道了"
            },
            selectNoFileWarning: {
                title: "请勾选要生成秒传的文件/文件夹",
                icon: "error",
                showCloseButton: true,
                confirmButtonText: "知道了"
            }
        };
        var __assign = undefined && undefined.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function ajax(config, callback, failback) {
            GM_xmlhttpRequest(__assign(__assign({}, config), {
                onload: function(r) {
                    if (Math.floor(r.status / 100) === 2) callback(r); else failback(r.status);
                },
                onerror: function() {
                    failback(ajaxError);
                }
            }));
        }
        function showAlert(text) {
            alert(TAG + ":\n" + text);
        }
        function randomStringTransform(string) {
            var tempString = [];
            for (var _i = 0, string_1 = string; _i < string_1.length; _i++) {
                var i = string_1[_i];
                if (!Math.round(Math.random())) {
                    tempString.push(i.toLowerCase());
                } else {
                    tempString.push(i.toUpperCase());
                }
            }
            return tempString.join("");
        }
        function parsefileInfo(fileInfoList) {
            var bdcode = "";
            var failedInfo = "";
            var failedCount = 0;
            var successList = [];
            fileInfoList.forEach((function(item) {
                if (item.errno) {
                    failedCount++;
                    failedInfo += "<p>文件：" + item.path + "</p><p>失败原因：" + baiduErrno(item.errno) + "(#" + item.errno + ")</p>";
                } else {
                    bdcode += item.md5 + "#" + item.md5s + "#" + item.size + "#" + item.path + "\n";
                    successList.push(item);
                }
            }));
            if (failedInfo) failedInfo = "<p>失败文件列表:</p>" + failedInfo;
            bdcode = bdcode.trim();
            return {
                htmlInfo: failedInfo,
                failedCount,
                bdcode,
                successList
            };
        }
        function getbdstoken() {
            ajax({
                url: bdstoken_url,
                method: "POST",
                responseType: "json",
                data: convertData({
                    fields: JSON.stringify([ "bdstoken" ])
                })
            }, (function(data) {
                data = data.response;
                if (!data.errno && data.result.bdstoken) setBdstoken(data.result.bdstoken); else showAlert("获取bdstoken失败(" + data.errno + "), 可能导致转存失败(#2), 请尝试刷新页面, 或重新登录");
            }), (function(statusCode) {
                showAlert("获取bdstoken失败(" + statusCode + "), 可能导致转存失败(#2), 请尝试刷新页面, 或重新登录");
            }));
        }
        function getSelectedFileListLegacy() {
            return require("system-core:context/context.js").instanceForSystem.list.getSelected();
        }
        function getSelectedFileListNew() {
            return document.querySelector(".nd-main-list").__vue__.selectedList;
        }
        function convertData(data) {
            var query = "";
            for (var key in data) query += "&" + key + "=" + encodeURIComponent(data[key]);
            return query;
        }
        var SwalBase_assign = undefined && undefined.__assign || function() {
            SwalBase_assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return SwalBase_assign.apply(this, arguments);
        };
        var __spreadArray = undefined && undefined.__spreadArray || function(to, from) {
            for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
            return to;
        };
        var Swalbase = function() {
            function Swalbase(rapiduploadTask, generatebdlinkTask) {
                this.rapiduploadTask = rapiduploadTask;
                this.generatebdlinkTask = generatebdlinkTask;
            }
            Swalbase.prototype.mergeArg = function() {
                var inputArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inputArgs[_i] = arguments[_i];
                }
                var output = {};
                $.extend.apply($, __spreadArray([ output, this.swalArgs ], inputArgs));
                return output;
            };
            Swalbase.prototype.inputView = function(swalArg) {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.inputView, swalArg)).then((function(result) {
                    if (result.isConfirmed) {
                        if (result.value === "set") _this.settingView(); else if (result.value === "gen") _this.genView(); else {
                            _this.rapiduploadTask.reset();
                            _this.rapiduploadTask.fileInfoList = DuParser.parse(result.value);
                            _this.inputPathView();
                        }
                    }
                }));
            };
            Swalbase.prototype.inputPathView = function() {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.inputPathView, {
                    inputValue: GM_getValue("last_dir") || ""
                })).then((function(result) {
                    if (result.isConfirmed) {
                        var path = result.value;
                        GM_setValue("last_dir", path);
                        if (!path) {
                            _this.rapiduploadTask.isDefaultPath = true;
                            var nowPath = location.href.match(/path=(.+?)(?:&|$)/);
                            if (nowPath) path = decodeURIComponent(nowPath[1]); else path = "/";
                        }
                        if (path.charAt(path.length - 1) !== "/") path += "/";
                        console.log("秒传文件保存到: " + path);
                        _this.rapiduploadTask.savePath = path;
                        _this.processView(false);
                    }
                }));
            };
            Swalbase.prototype.processView = function(isGen) {
                var _this = this;
                var swalArg = {
                    title: isGen ? "秒传生成中" : "文件" + (this.rapiduploadTask.checkMode ? "测试" : "提取") + "中",
                    html: isGen ? "<p>正在生成第 <file_num>0</file_num> 个</p><p><gen_prog>正在获取文件列表...</gen_prog></p>" : "正在" + (this.rapiduploadTask.checkMode ? "测试" : "转存") + "第 <file_num>0</file_num> 个",
                    willOpen: function() {
                        Swal.showLoading();
                        isGen || _this.saveFileWork();
                    }
                };
                Swal.fire(this.mergeArg(SwalConfig.processView, swalArg));
            };
            Swalbase.prototype.finishView = function(isGen) {
                var _this = this;
                var action = isGen ? "生成" : this.rapiduploadTask.checkMode ? "测试" : "转存";
                var fileInfoList = isGen ? this.generatebdlinkTask.fileInfoList : this.rapiduploadTask.fileInfoList;
                var parseResult = parsefileInfo(fileInfoList);
                if (isGen) this.rapiduploadTask.fileInfoList = parseResult.successList;
                var checkboxArg = parseResult.failedCount === fileInfoList.length ? {} : {
                    input: "checkbox",
                    inputValue: GM_getValue("with_path"),
                    inputPlaceholder: "导出文件夹目录结构"
                };
                var html = (isGen ? (parseResult.failedCount === fileInfoList.length ? "" : htmlCheckMd5) + htmlDocument : "") + (parseResult.htmlInfo && isGen ? "<p><br></p>" : "") + parseResult.htmlInfo;
                var htmlFooter = "";
                if (!GM_getValue(donateVer + "_kill_donate")) htmlFooter += htmlDonate;
                if (!GM_getValue(feedbackVer + "_kill_donate")) htmlFooter += htmlFeedback;
                if (htmlFooter) htmlFooter = "<p><br></p>" + htmlFooter;
                var swalArg = SwalBase_assign(SwalBase_assign({
                    title: action + "完毕 共" + fileInfoList.length + "个, 失败" + parseResult.failedCount + "个!",
                    confirmButtonText: parseResult.failedCount !== fileInfoList.length && (isGen || this.rapiduploadTask.checkMode) ? "复制秒传代码" : "确认",
                    html: html + htmlFooter
                }, (isGen || this.rapiduploadTask.checkMode) && checkboxArg), {
                    willOpen: function() {
                        if (!isGen && !_this.rapiduploadTask.checkMode) _this.addOpenDirBtn();
                    }
                });
                Swal.fire(this.mergeArg(SwalConfig.finishView, swalArg)).then((function(result) {
                    if (result.isConfirmed) {
                        if (isGen || _this.rapiduploadTask.checkMode) {
                            GM_setValue("with_path", result.value);
                            if (!result.value) GM_setClipboard(parseResult.bdcode.replace(/\/.+\//g, "")); else GM_setClipboard(parseResult.bdcode);
                            GM_deleteValue("unfinish");
                        } else {
                            refreshList();
                        }
                    }
                }));
            };
            Swalbase.prototype.checkRecursive = function() {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.checkRecursive)).then((function(result) {
                    if (result.isConfirmed) {
                        _this.generatebdlinkTask.recursive = true;
                    } else if (result.dismiss === Swal.DismissReason.cancel) _this.generatebdlinkTask.recursive = false; else return;
                    _this.processView(true);
                    _this.generatebdlinkTask.scanFile(0);
                }));
            };
            Swalbase.prototype.settingView = function() {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.settingView)).then((function(result) {
                    if (result.isConfirmed) {
                        GM_setValue("swalThemes", result.value);
                        Swal.close();
                        Swal.fire(_this.mergeArg(SwalConfig.settingWarning));
                    }
                }));
            };
            Swalbase.prototype.genView = function() {
                var _this = this;
                Swal.fire(this.mergeArg(SwalConfig.genView)).then((function(result) {
                    if (result.isConfirmed) {
                        _this.generatebdlinkTask.reset();
                        result.value.split("\n").forEach((function(item) {
                            if (item.charAt(0) !== "/") item = "/" + item;
                            _this.generatebdlinkTask.fileInfoList.push({
                                path: item
                            });
                        }));
                        _this.processView(true);
                        _this.genFileWork(false, true);
                        _this.generatebdlinkTask.generateBdlink(0);
                    }
                }));
            };
            Swalbase.prototype.genUnfinishi = function(onConfirm, onCancel) {
                Swal.fire(this.mergeArg(SwalConfig.genUnfinish)).then((function(result) {
                    if (result.isConfirmed) onConfirm(); else if (result.dismiss === Swal.DismissReason.cancel) onCancel();
                }));
            };
            Swalbase.prototype.checkMd5Warning = function(onConfirm, onCancel) {
                Swal.fire(this.mergeArg(SwalConfig.checkMd5Warning)).then((function(result) {
                    if (result.isConfirmed) {
                        GM_setValue("check_md5_warning", result.value);
                        onConfirm();
                    } else if (result.dismiss === Swal.DismissReason.cancel) onCancel();
                }));
            };
            Swalbase.prototype.selectNoFileWarning = function() {
                Swal.fire(this.mergeArg(SwalConfig.selectNoFileWarning));
            };
            Swalbase.prototype.updateInfo = function(onConfirm) {
                Swal.fire(this.mergeArg(SwalConfig.updateInfo)).then((function(result) {
                    if (result.isConfirmed) onConfirm();
                }));
            };
            Swalbase.prototype.saveFileWork = function() {
                var _this = this;
                this.rapiduploadTask.onFinish = function() {
                    _this.finishView(false);
                };
                this.rapiduploadTask.onProcess = function(i, fileInfoList) {
                    Swal.getHtmlContainer().querySelector("file_num").textContent = i + 1 + " / " + fileInfoList.length;
                };
                this.rapiduploadTask.start();
            };
            Swalbase.prototype.genFileWork = function(isUnfinish, isGenView) {
                var _this = this;
                if (!isGenView) this.generatebdlinkTask.selectList = getSelectedFileList();
                if (!this.generatebdlinkTask.selectList.length) {
                    this.selectNoFileWarning();
                    return;
                }
                this.generatebdlinkTask.onProcess = function(i, fileInfoList) {
                    Swal.getHtmlContainer().querySelector("file_num").textContent = i + 1 + " / " + fileInfoList.length;
                    Swal.getHtmlContainer().querySelector("gen_prog").textContent = "0%";
                };
                this.generatebdlinkTask.onProgress = function(e) {
                    if (typeof e.total !== "number") return;
                    Swal.getHtmlContainer().querySelector("gen_prog").textContent = (e.loaded / e.total * 100).toFixed() + "%";
                };
                this.generatebdlinkTask.onHasNoDir = function() {
                    _this.processView(true);
                    _this.generatebdlinkTask.generateBdlink(0);
                };
                this.generatebdlinkTask.onHasDir = function() {
                    _this.checkRecursive();
                };
                this.generatebdlinkTask.onFinish = function() {
                    _this.finishView(true);
                };
                if (!isUnfinish && !isGenView) this.generatebdlinkTask.start();
            };
            Swalbase.prototype.checkUnfinish = function() {
                var _this = this;
                if (GM_getValue("unfinish")) {
                    this.genUnfinishi((function() {
                        _this.processView(true);
                        _this.genFileWork(true, false);
                        var unfinishInfo = GM_getValue("unfinish");
                        _this.generatebdlinkTask.fileInfoList = unfinishInfo.file_info_list;
                        _this.generatebdlinkTask.generateBdlink(unfinishInfo.file_id);
                    }), (function() {
                        GM_deleteValue("unfinish");
                        _this.genFileWork(false, false);
                    }));
                } else {
                    this.genFileWork(false, false);
                }
            };
            Swalbase.prototype.checkMd5 = function() {
                var _this = this;
                this.rapiduploadTask.checkMode = true;
                if (!GM_getValue("check_md5_warning")) {
                    this.checkMd5Warning((function() {
                        _this.processView(false);
                    }), (function() {
                        _this.finishView(true);
                    }));
                } else this.processView(false);
            };
            Swalbase.prototype.addOpenDirBtn = function() {
                if (!this.rapiduploadTask.isDefaultPath) {
                    var _dir_1 = (this.rapiduploadTask.savePath || "").replace(/\/$/, "");
                    if (_dir_1.charAt(0) !== "/") _dir_1 = "/" + _dir_1;
                    var cBtn = Swal.getConfirmButton();
                    var btn = cBtn.cloneNode();
                    btn.textContent = "打开目录";
                    btn.style.backgroundColor = "#ecae3c";
                    btn.onclick = function() {
                        var path = location.href.match(/(path=(.+?))(?:&|$)/);
                        if (path) {
                            if (path[2] !== encodeURIComponent(_dir_1)) location.href = location.href.replace(path[1], "path=" + encodeURIComponent(_dir_1)); else refreshList();
                        } else {
                            var connectChar = location.href.indexOf("?") === -1 ? "?" : "&";
                            location.href += connectChar + "path=" + encodeURIComponent(_dir_1);
                        }
                        Swal.close();
                    };
                    cBtn.before(btn);
                }
            };
            return Swalbase;
        }();
        const SwalBase = Swalbase;
        var GeneratebdlinkTask = function() {
            function GeneratebdlinkTask() {}
            GeneratebdlinkTask.prototype.reset = function() {
                this.recursive = false;
                this.dirList = [];
                this.selectList = [];
                this.fileInfoList = [];
                this.onFinish = function() {};
                this.onProcess = function() {};
                this.onProgress = function() {};
                this.onHasDir = function() {};
                this.onHasNoDir = function() {};
            };
            GeneratebdlinkTask.prototype.start = function() {
                var _this = this;
                this.selectList.forEach((function(item) {
                    if (item.isdir) _this.dirList.push(item.path); else {
                        _this.fileInfoList.push({
                            path: item.path,
                            size: item.size
                        });
                    }
                }));
                if (this.dirList.length) this.onHasDir(); else this.onHasNoDir();
            };
            GeneratebdlinkTask.prototype.scanFile = function(i) {
                var _this = this;
                if (i >= this.dirList.length) {
                    this.generateBdlink(0);
                    return;
                }
                ajax({
                    url: list_url + "&path=" + encodeURIComponent(this.dirList[i]) + "&recursion=" + (this.recursive ? 1 : 0),
                    method: "GET",
                    responseType: "json"
                }, (function(data) {
                    data = data.response;
                    if (!data.errno) {
                        data.list.forEach((function(item) {
                            item.isdir || _this.fileInfoList.push({
                                path: item.path
                            });
                        }));
                    } else _this.fileInfoList.push({
                        path: _this.dirList[i],
                        errno: data.errno
                    });
                    _this.scanFile(i + 1);
                }), (function(statusCode) {
                    _this.fileInfoList.push({
                        path: _this.dirList[i],
                        errno: statusCode === 500 ? 901 : statusCode
                    });
                    _this.scanFile(i + 1);
                }));
            };
            GeneratebdlinkTask.prototype.generateBdlink = function(i) {
                GM_setValue("unfinish", {
                    file_info_list: this.fileInfoList,
                    file_id: i
                });
                if (i >= this.fileInfoList.length) {
                    this.onFinish(this.fileInfoList);
                    return;
                }
                this.onProcess(i, this.fileInfoList);
                var file = this.fileInfoList[i];
                if (file.errno) {
                    this.generateBdlink(i + 1);
                    return;
                }
                this.getFileInfo(i);
            };
            GeneratebdlinkTask.prototype.getFileInfo = function(i) {
                var _this = this;
                var file = this.fileInfoList[i];
                ajax({
                    url: meta_url + encodeURIComponent(file.path),
                    responseType: "json",
                    method: "GET"
                }, (function(data) {
                    data = data.response;
                    if (!data.errno) {
                        console.log(data.list[0]);
                        if (data.list[0].isdir) {
                            file.errno = 900;
                            _this.generateBdlink(i + 1);
                            return;
                        }
                        file.size = data.list[0].size;
                        file.fs_id = data.list[0].fs_id;
                        if (data.list[0].block_list.length === 1) file.md5 = data.list[0].block_list[0].toLowerCase();
                        _this.getDlink(i);
                    } else {
                        file.errno = data.errno;
                        _this.generateBdlink(i + 1);
                    }
                }), (function(statusCode) {
                    file.errno = statusCode === 404 ? 909 : statusCode;
                    _this.generateBdlink(i + 1);
                }));
            };
            GeneratebdlinkTask.prototype.getDlink = function(i) {
                var _this = this;
                var file = this.fileInfoList[i];
                ajax({
                    url: meta_url2 + JSON.stringify([ file.fs_id ]),
                    responseType: "json",
                    method: "GET"
                }, (function(data) {
                    data = data.response;
                    if (!data.errno) {
                        console.log(data.list[0]);
                        _this.downloadFileData(i, data.list[0].dlink);
                    } else {
                        file.errno = data.errno;
                        _this.generateBdlink(i + 1);
                    }
                }), (function(statusCode) {
                    file.errno = statusCode;
                    _this.generateBdlink(i + 1);
                }));
            };
            GeneratebdlinkTask.prototype.downloadFileData = function(i, dlink) {
                var _this = this;
                var file = this.fileInfoList[i];
                var dlSize = file.size < 262144 ? file.size - 1 : 262143;
                ajax({
                    url: dlink,
                    method: "GET",
                    responseType: "arraybuffer",
                    headers: {
                        Range: "bytes=0-" + dlSize,
                        "User-Agent": UA
                    },
                    onprogress: this.onProgress
                }, (function(data) {
                    _this.onProgress({
                        loaded: 100,
                        total: 100
                    });
                    _this.parseDownloadData(i, data);
                }), (function(statusCode) {
                    if (statusCode === 404) file.errno = 909; else file.errno = statusCode;
                    _this.generateBdlink(i + 1);
                }));
            };
            GeneratebdlinkTask.prototype.parseDownloadData = function(i, data) {
                var _this = this;
                console.log("dl_url: " + data.finalUrl);
                var file = this.fileInfoList[i];
                if (data.finalUrl.indexOf("issuecdn.baidupcs.com") !== -1) {
                    file.errno = 1919;
                    this.generateBdlink(i + 1);
                    return;
                } else {
                    var fileMd5 = data.responseHeaders.match(/content-md5: ([\da-f]{32})/i);
                    if (fileMd5) file.md5 = fileMd5[1].toLowerCase(); else if (!file.md5 && file.size <= 39e8 && !file.retry_996) {
                        file.retry_996 = true;
                        this.downloadFileData(i, pcs_url + ("&path=" + encodeURIComponent(file.path)));
                        return;
                    } else if (!file.md5) {
                        file.errno = 996;
                        this.generateBdlink(i + 1);
                        return;
                    }
                    var spark = new SparkMD5.ArrayBuffer;
                    spark.append(data.response);
                    var sliceMd5 = spark.end();
                    file.md5s = sliceMd5;
                    var interval = this.fileInfoList.length > 1 ? 2e3 : 1e3;
                    setTimeout((function() {
                        _this.generateBdlink(i + 1);
                    }), interval);
                }
            };
            return GeneratebdlinkTask;
        }();
        const common_GeneratebdlinkTask = GeneratebdlinkTask;
        var RapiduploadTask = function() {
            function RapiduploadTask() {}
            RapiduploadTask.prototype.reset = function() {
                this.fileInfoList = [];
                this.savePath = "";
                this.checkMode = false;
                this.isDefaultPath = false;
                this.onFinish = function() {};
                this.onProcess = function() {};
            };
            RapiduploadTask.prototype.start = function() {
                if (this.checkMode) this.savePath = "";
                this.saveFile(0, 0);
            };
            RapiduploadTask.prototype.saveFile = function(i, tryFlag) {
                var _this = this;
                if (i >= this.fileInfoList.length) {
                    this.onFinish(this.fileInfoList);
                    return;
                }
                this.onProcess(i, this.fileInfoList);
                var file = this.fileInfoList[i];
                if (file.path.match(/["\\\:*?<>|]/) || file.path === "/") {
                    file.errno = 2333;
                    this.saveFile(i + 1, 0);
                    return;
                }
                if (!file.md5s || file.size > 21474836480) {
                    file.md5 = file.md5.toLowerCase();
                    this.saveFileV2(i);
                    return;
                }
                switch (tryFlag) {
                  case 0:
                    console.log("use UpperCase md5");
                    file.md5 = file.md5.toUpperCase();
                    break;

                  case 1:
                    console.log("use LowerCase md5");
                    file.md5 = file.md5.toLowerCase();
                    break;

                  case 2:
                    console.log("use randomCase md5");
                    file.md5 = randomStringTransform(file.md5);
                    break;

                  case 3:
                    console.log("use saveFile v2");
                    file.md5 = file.md5.toLowerCase();
                    this.saveFileV2(i);
                    return;

                  default:
                    this.saveFile(i + 1, 0);
                    return;
                }
                ajax({
                    url: "" + rapid_url + (bdstoken && "?bdstoken=" + bdstoken),
                    method: "POST",
                    responseType: "json",
                    data: convertData({
                        rtype: this.checkMode ? 3 : 0,
                        path: this.savePath + file.path,
                        "content-md5": file.md5,
                        "slice-md5": file.md5s.toLowerCase(),
                        "content-length": file.size
                    })
                }, (function(data) {
                    data = data.response;
                    if (data.errno === 404) _this.saveFile(i, tryFlag + 1); else {
                        file.errno = data.errno;
                        _this.saveFile(i + 1, 0);
                    }
                }), (function(statusCode) {
                    file.errno = statusCode;
                    _this.saveFile(i + 1, 0);
                }));
            };
            RapiduploadTask.prototype.saveFileV2 = function(i) {
                var _this = this;
                var file = this.fileInfoList[i];
                ajax({
                    url: "" + create_url + (bdstoken && "&bdstoken=" + bdstoken),
                    method: "POST",
                    responseType: "json",
                    data: convertData({
                        block_list: JSON.stringify([ file.md5 ]),
                        path: this.savePath + file.path,
                        size: file.size,
                        isdir: 0,
                        rtype: this.checkMode ? 3 : 0
                    })
                }, (function(data) {
                    data = data.response;
                    file.errno = data.errno === 2 ? 404 : data.errno;
                    _this.saveFile(i + 1, 0);
                }), (function(statusCode) {
                    file.errno = statusCode;
                    _this.saveFile(i + 1, 0);
                }));
            };
            return RapiduploadTask;
        }();
        const common_RapiduploadTask = RapiduploadTask;
        var rapid_url = "/api/rapidupload";
        var bdstoken_url = "/api/gettemplatevariable";
        var create_url = "/rest/2.0/xpan/file?method=create";
        var list_url = "/rest/2.0/xpan/multimedia?method=listall&order=name&limit=10000";
        var meta_url = "/rest/2.0/xpan/file?app_id=778750&method=meta&path=";
        var meta_url2 = "/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=";
        var pcs_url = "https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=download";
        var UA = "netdisk;2.2.51.6;netdisk;10.0.63;PC;android-android;QTP/1.0.32.2";
        var illegalPathPattern = /[\\":*?<>|]/;
        var bdstoken = "";
        function setBdstoken(mybdstoken) {
            bdstoken = mybdstoken;
        }
        var refreshList;
        function setRefreshList(func) {
            refreshList = func;
        }
        var getSelectedFileList;
        function setGetSelectedFileList(func) {
            getSelectedFileList = func;
        }
        var swalInstance = new SwalBase(new common_RapiduploadTask, new common_GeneratebdlinkTask);
        var htmlTagNew = "div.nd-file-list-toolbar__actions";
        var htmlTaglegacy = "div.tcuLAu";
        var htmlTag2legacy = "#h5Input0";
        var htmlBtnRapidNew = '<button id="bdlink_btn" style="margin-left: 8px;" class="mzf_new_btn"></i><span>秒传</span></button>';
        var htmlBtnGenNew = '<button id="gen_bdlink_btn" style="margin-left: 8px;" class="mzf_new_btn"></i><span>生成秒传</span></button>';
        var htmlBtnRapidLegacy = '<a class="g-button g-button-blue" id="bdlink_btn" title="秒传链接" style="display: inline-block;""><span class="g-button-right"><em class="icon icon-disk" title="秒传链接提取"></em><span class="text" style="width: auto;">秒传链接</span></span></a>';
        var htmlBtnGenLegacy = '<a class="g-button" id="gen_bdlink_btn"><span class="g-button-right"><em class="icon icon-share"></em><span class="text" style="width: auto;">生成秒传</span></span></a>';
        function baiduErrno(errno) {
            switch (errno) {
              case -6:
                return "认证失败(尝试刷新页面)";

              case -7:
                return "文件名/转存路径 包含非法字符, 请尝试更改";

              case -8:
                return "路径下存在同名文件";

              case 400:
                return "请求错误(尝试使用最新版Chrome浏览器/更新油猴插件)";

              case 403:
                return '接口限制访问(请参考<a href="' + doc.shareDoc + '" ' + linkStyle + ">分享教程</a>)";

              case 31190:
              case 404:
                return '秒传未生效(请参考<a href="' + doc.shareDoc + '" ' + linkStyle + ">分享教程</a>)";

              case 2:
                return "转存失败(尝试重新登录度盘账号/更换或重装浏览器)";

              case 2333:
                return '文件名错误, 不能含有字符\\":*?<>|, 且不能是"/"(空文件名)';

              case -10:
                return "网盘容量已满";

              case 514:
                return "请求失败(若弹出跨域提示,请选择允许/尝试关闭网络代理/更换浏览器)";

              case 1919:
                return '文件已被和谐(请参考<a href="' + doc.shareDoc + '" ' + linkStyle + ">分享教程</a>)";

              case 996:
                return 'md5获取失败(请参考<a href="' + doc.shareDoc + '" ' + linkStyle + ">分享教程</a>)";

              case 500:
              case 502:
              case 503:
                return '服务器错误(请参考<a href="' + doc.shareDoc + '" ' + linkStyle + ">分享教程</a>)";

              case 909:
                return "路径不存在";

              case 900:
                return "路径为文件夹, 不支持生成秒传";

              case 901:
                return "包含的文件数量超出限制(1w个)";

              default:
                return "未知错误";
            }
        }
        function installNew() {
            jQuery((function() {
                console.info("%s DOM方式安装，若失效请报告。", TAG);
                $(htmlTagNew).append(htmlBtnRapidNew, htmlBtnGenNew);
                $(document).on("click", "#bdlink_btn", (function() {
                    swalInstance.inputView();
                }));
                $(document).on("click", "#gen_bdlink_btn", (function() {
                    swalInstance.generatebdlinkTask.reset();
                    swalInstance.checkUnfinish();
                }));
            }));
        }
        function getSystemContext() {
            return require("system-core:context/context.js").instanceForSystem;
        }
        function addGenBtn() {
            var listTools = getSystemContext().Broker.getButtonBroker("listTools");
            if (listTools && listTools.$box) $(listTools.$box).children("div").after(htmlBtnGenLegacy); else setTimeout(addGenBtn, 300);
        }
        function addBtn() {
            if ($(htmlTaglegacy).length && $(htmlTag2legacy).length) $(htmlTaglegacy).append(htmlBtnRapidLegacy); else setTimeout(addBtn, 100);
        }
        function installlegacy() {
            jQuery((function() {
                console.info("%s DOM方式安装，若失效请报告。", TAG);
                addBtn();
                addGenBtn();
                $(document).on("click", "#bdlink_btn", (function() {
                    swalInstance.inputView();
                }));
                $(document).on("click", "#gen_bdlink_btn", (function() {
                    swalInstance.generatebdlinkTask.reset();
                    swalInstance.checkUnfinish();
                }));
            }));
        }
        function loaderBaidu() {
            getbdstoken();
            if (locUrl.indexOf(baiduNewPage) !== -1) {
                swalInstance.swalArgs = {
                    heightAuto: false,
                    scrollbarPadding: false
                };
                setRefreshList((function() {
                    location.reload();
                }));
                setGetSelectedFileList(getSelectedFileListNew);
                installNew();
            } else {
                setRefreshList((function() {
                    require("system-core:system/baseService/message/message.js").trigger("system-refresh");
                }));
                setGetSelectedFileList(getSelectedFileListLegacy);
                installlegacy();
            }
            var bdlink = initQueryLink();
            if (bdlink) {
                window.addEventListener("DOMContentLoaded", (function() {
                    swalInstance.inputView({
                        inputValue: bdlink
                    });
                }));
            } else if (!GM_getValue(updateInfoVer + "_no_first")) window.addEventListener("DOMContentLoaded", (function() {
                swalInstance.updateInfo((function() {
                    GM_setValue(updateInfoVer + "_no_first", true);
                }));
            }));
            $(document).on("click", "#kill_donate", (function() {
                GM_setValue(feedbackVer + "_kill_donate", true);
                $("#mzf_donate").remove();
            }));
            $(document).on("click", "#kill_feedback", (function() {
                GM_setValue(donateVer + "_kill_feedback", true);
                $("#mzf_feedback").remove();
            }));
            $(document).on("click", "#check_md5_btn", (function() {
                swalInstance.checkMd5();
            }));
        }
        var checkBox = __webpack_require__(197);
        var checkBox_default = __webpack_require__.n(checkBox);
        var app = __webpack_require__(555);
        var app_default = __webpack_require__.n(app);
        function injectStyle() {
            GM_addStyle(app_default());
            GM_addStyle(checkBox_default());
            var swalThemes = GM_getValue("swalThemes") || "Default";
            var defaultThemesCss = GM_getResourceText("swalCss") || GM_getResourceText("swalCssBak");
            if (swalThemes === "Default") {
                if (defaultThemesCss) {
                    GM_addStyle(defaultThemesCss);
                } else {
                    getThemesCss(swalThemes);
                }
                return;
            }
            var ThemesCss = GM_getValue("" + swalCssVer + swalThemes);
            if (ThemesCss) {
                GM_addStyle(ThemesCss);
            } else {
                getThemesCss(swalThemes);
            }
            return;
        }
        function getThemesCss(swalThemes) {
            ajax({
                url: extCssUrl[swalThemes],
                method: "GET"
            }, (function(data) {
                var ThemesCss = data.responseText;
                if (ThemesCss.length < 100) {
                    showAlert(appError.SwalCssInvalid + ("\n错误数据:" + swalThemes + " InvalidCss:\n" + ThemesCss));
                    return;
                }
                GM_setValue("" + swalCssVer + swalThemes, ThemesCss);
                GM_addStyle(ThemesCss);
            }), (function(statusCode) {
                showAlert(appError.SwalCssErrReq + ("#" + statusCode));
            }));
        }
        function app_app() {
            if ([ typeof Base64, typeof $, typeof SparkMD5, typeof Swal ].indexOf("undefined") !== -1) showAlert(appError.missDepend); else {
                Base64.extendString();
                injectStyle();
                loaderBaidu();
            }
        }
        try {
            app_app();
        } catch (error) {
            console.log(error);
        }
    })();
})();