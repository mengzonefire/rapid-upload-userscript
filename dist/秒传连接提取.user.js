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

(() => {
    "use strict";
    var __webpack_modules__ = {
        780: (module, __unused_webpack___webpack_exports__, __webpack_require__) => {
            var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
            var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
            var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, "/*按钮样式*/\r\n.mzf_btn {\r\n  text-align: center;\r\n  font-size: 0.85em;\r\n  color: #09aaff;\r\n  border: 2px solid #c3eaff;\r\n  border-radius: 4px;\r\n  margin: 0 5px;\r\n  padding: 10px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n}\r\n\r\n/*超链接样式*/\r\n.mzf_link {\r\n  font-family: inherit;\r\n  color: #09aaff;\r\n  text-decoration: none;\r\n}\r\n\r\n/*文本样式*/\r\n.mzf_text {\r\n  color: #545454;\r\n  font-size: 1.125em;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  margin: 0;\r\n  padding: 0;\r\n  height: 34px;\r\n  display: block;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}", "" ]);
            var __WEBPACK_DEFAULT_EXPORT__ = null && ___CSS_LOADER_EXPORT___;
        },
        420: (module, __unused_webpack___webpack_exports__, __webpack_require__) => {
            var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
            var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
            var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()((function(i) {
                return i[1];
            }));
            ___CSS_LOADER_EXPORT___.push([ module.id, 'input[type="checkbox"],\r\ninput[type="radio"] {\r\n  --active: #275efe;\r\n  --active-inner: #fff;\r\n  --focus: 2px rgba(39, 94, 254, 0.3);\r\n  --border: #bbc1e1;\r\n  --border-hover: #275efe;\r\n  --background: #fff;\r\n  --disabled: #f6f8ff;\r\n  --disabled-inner: #e1e6f9;\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  height: 21px;\r\n  outline: none;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  position: relative;\r\n  margin: 0;\r\n  cursor: pointer;\r\n  border: 1px solid var(--bc, var(--border));\r\n  background: var(--b, var(--background));\r\n  -webkit-transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;\r\n  transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;\r\n}\r\ninput[type="checkbox"]:after,\r\ninput[type="radio"]:after {\r\n  content: "";\r\n  display: block;\r\n  left: 0;\r\n  top: 0;\r\n  position: absolute;\r\n  -webkit-transition: opacity var(--d-o, 0.2s),\r\n    -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);\r\n  transition: opacity var(--d-o, 0.2s),\r\n    -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);\r\n  transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),\r\n    opacity var(--d-o, 0.2s);\r\n  transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),\r\n    opacity var(--d-o, 0.2s),\r\n    -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);\r\n}\r\ninput[type="checkbox"]:checked,\r\ninput[type="radio"]:checked {\r\n  --b: var(--active);\r\n  --bc: var(--active);\r\n  --d-o: 0.3s;\r\n  --d-t: 0.6s;\r\n  --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);\r\n}\r\ninput[type="checkbox"]:disabled,\r\ninput[type="radio"]:disabled {\r\n  --b: var(--disabled);\r\n  cursor: not-allowed;\r\n  opacity: 0.9;\r\n}\r\ninput[type="checkbox"]:disabled:checked,\r\ninput[type="radio"]:disabled:checked {\r\n  --b: var(--disabled-inner);\r\n  --bc: var(--border);\r\n}\r\ninput[type="checkbox"]:disabled + label,\r\ninput[type="radio"]:disabled + label {\r\n  cursor: not-allowed;\r\n}\r\ninput[type="checkbox"]:hover:not(:checked):not(:disabled),\r\ninput[type="radio"]:hover:not(:checked):not(:disabled) {\r\n  --bc: var(--border-hover);\r\n}\r\ninput[type="checkbox"]:focus,\r\ninput[type="radio"]:focus {\r\n  box-shadow: 0 0 0 var(--focus);\r\n}\r\ninput[type="checkbox"]:not(.switch),\r\ninput[type="radio"]:not(.switch) {\r\n  width: 21px;\r\n}\r\ninput[type="checkbox"]:not(.switch):after,\r\ninput[type="radio"]:not(.switch):after {\r\n  opacity: var(--o, 0);\r\n}\r\ninput[type="checkbox"]:not(.switch):checked,\r\ninput[type="radio"]:not(.switch):checked {\r\n  --o: 1;\r\n}\r\ninput[type="checkbox"] + label,\r\ninput[type="radio"] + label {\r\n  font-size: 18px;\r\n  line-height: 21px;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  cursor: pointer;\r\n  margin-left: 4px;\r\n}\r\n\r\ninput[type="checkbox"]:not(.switch) {\r\n  border-radius: 7px;\r\n}\r\ninput[type="checkbox"]:not(.switch):after {\r\n  width: 5px;\r\n  height: 9px;\r\n  border: 2px solid var(--active-inner);\r\n  border-top: 0;\r\n  border-left: 0;\r\n  left: 7px;\r\n  top: 4px;\r\n  -webkit-transform: rotate(var(--r, 20deg));\r\n  transform: rotate(var(--r, 20deg));\r\n}\r\ninput[type="checkbox"]:not(.switch):checked {\r\n  --r: 43deg;\r\n}\r\ninput[type="checkbox"].switch {\r\n  width: 38px;\r\n  border-radius: 11px;\r\n}\r\ninput[type="checkbox"].switch:after {\r\n  left: 2px;\r\n  top: 2px;\r\n  border-radius: 50%;\r\n  width: 15px;\r\n  height: 15px;\r\n  background: var(--ab, var(--border));\r\n  -webkit-transform: translateX(var(--x, 0));\r\n  transform: translateX(var(--x, 0));\r\n}\r\ninput[type="checkbox"].switch:checked {\r\n  --ab: var(--active-inner);\r\n  --x: 17px;\r\n}\r\ninput[type="checkbox"].switch:disabled:not(:checked):after {\r\n  opacity: 0.6;\r\n}\r\n', "" ]);
            var __WEBPACK_DEFAULT_EXPORT__ = null && ___CSS_LOADER_EXPORT___;
        },
        645: module => {
            module.exports = function(cssWithMappingToString) {
                var list = [];
                list.toString = function toString() {
                    return this.map((function(item) {
                        var content = cssWithMappingToString(item);
                        if (item[2]) {
                            return "@media ".concat(item[2], " {").concat(content, "}");
                        }
                        return content;
                    })).join("");
                };
                list.i = function(modules, mediaQuery, dedupe) {
                    if (typeof modules === "string") {
                        modules = [ [ null, modules, "" ] ];
                    }
                    var alreadyImportedModules = {};
                    if (dedupe) {
                        for (var i = 0; i < this.length; i++) {
                            var id = this[i][0];
                            if (id != null) {
                                alreadyImportedModules[id] = true;
                            }
                        }
                    }
                    for (var _i = 0; _i < modules.length; _i++) {
                        var item = [].concat(modules[_i]);
                        if (dedupe && alreadyImportedModules[item[0]]) {
                            continue;
                        }
                        if (mediaQuery) {
                            if (!item[2]) {
                                item[2] = mediaQuery;
                            } else {
                                item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                            }
                        }
                        list.push(item);
                    }
                };
                return list;
            };
        },
        158: module => {
            module.exports = Base64;
        },
        938: module => {
            module.exports = SparkMD5;
        },
        262: module => {
            module.exports = Swal;
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
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
        var app = __webpack_require__(780);
        var updateInfoVer = "2.0.0";
        var locUrl = location.href;
        var baiduNewPage = "pan.baidu.com/disk/main#/";
        var TAG = "[秒传链接提取 by mengzonefire]";
        var Base64 = __webpack_require__(158);
        var SparkMD5 = __webpack_require__(938);
        var Swal = __webpack_require__(262);
        var extCssUrl = {
            Minimal: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
            "WordPress Admin": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
            "Material UI": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
            Bulma: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
            "Bootstrap 4": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
        };
        var bdlinkPattern = /[\?#]bdlink=([\da-zA-Z+/=]+)/;
        var htmlCsdWarning = '<p>弹出跨域访问窗口时,请选择"<span style="color: red;">总是允许</span>"或"<span style="color: red;">总是允许全部</span>"</p><img style="max-width: 100%; height: auto" src="https://pic.rmb.bdstatic.com/bjh/763ff5014cca49237cb3ede92b5b7ac5.png">';
        var htmlCheckMd5 = '<p class="mzf_text">测试秒传, 可防止秒传失效<a id="check_md5_btn" class="mzf_btn"><span class="text" style="width: auto;">测试</span></a></p>';
        var htmlDocument = '<p class="mzf_text">秒传无效/md5获取失败/防和谐 可参考<a class="mzf_btn" href="https://shimo.im/docs/TZ1JJuEjOM0wnFDH" rel="noopener noreferrer" target="_blank"><span class="text" style="width: auto;">分享教程</span></a></p>';
        var htmlDonate = '<p id="bdcode_donate" class="mzf_text">若喜欢该脚本, 可前往 <a class="mzf_link" href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>';
        var htmlFeedback = '<p id="bdcode_feedback" class="mzf_text">若有任何疑问, 可前往 <a class="mzf_link" href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank">脚本页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>';
        function initQueryLink() {
            var bdlink = "";
            var bdlinkB64 = locUrl.match(bdlinkPattern);
            if (bdlinkB64) {
                console.log(bdlinkB64);
                bdlink = bdlinkB64[1].fromBase64();
            }
            return bdlink;
        }
        var oRequire;
        var hooks = new Map;
        function fakeRequire(module) {
            var result = oRequire.apply(this, arguments);
            var moduleHook = hooks.get(module);
            if (moduleHook) {
                try {
                    moduleHook();
                } catch (e) {
                    console.error(TAG + ": 执行 " + module + " hook 时发生错误: " + e.message);
                    console.trace(e);
                }
                hooks.delete(module);
            }
            return result;
        }
        fakeRequire.async = null;
        function load(module) {
            return oRequire.call(unsafeWindow, module);
        }
        function loadAsync(module) {
            return new Promise((function(resolve) {
                fakeRequire.async(module, resolve);
            }));
        }
        function hook(module, fn) {
            hooks.set(module, fn);
        }
        function install() {
            if (unsafeWindow.require) {
                console.warn("%s 覆盖方式安装，若无效请强制刷新。", TAG);
                oRequire = unsafeWindow.require;
                unsafeWindow.require = fakeRequire;
                Object.assign(fakeRequire, oRequire);
            } else {
                console.info("%s 钩子方式安装，若失效请报告。", TAG);
                Object.defineProperty(unsafeWindow, "require", {
                    set: function(require) {
                        oRequire = require;
                    },
                    get: function() {
                        return fakeRequire;
                    }
                });
            }
        }
        function installNew() {}
        function DuParser() {}
        DuParser.parse = function generalDuCodeParse(szUrl) {
            var r;
            if (szUrl.indexOf("bdpan") === 0) {
                r = DuParser.parseDu_v1(szUrl);
                r.ver = "PanDL";
            } else if (szUrl.indexOf("BDLINK") === 0) {
                r = DuParser.parseDu_v2(szUrl);
                r.ver = "游侠 v1";
            } else if (szUrl.indexOf("BaiduPCS-Go") === 0) {
                r = DuParser.parseDu_v3(szUrl);
                r.ver = "PCS-Go";
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
        DuParser.parseDu_v3 = function parseDu_v3(szUrl) {
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
        DuParser.parseDu_v4 = function parseDu_v4(szUrl) {
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
        var swalConfig = {
            inputView: {
                title: "请输入秒传",
                input: "textarea",
                showCancelButton: true,
                inputPlaceholder: "[支持PD/标准码/游侠/GO][支持批量(换行分隔)]\n[输入set进入设置页][输入gen进入生成页]",
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
                    var codeInfo = DuParser.parse(value);
                    if (!codeInfo.length) {
                        return '<p>未识别到正确的链接 <a href="https://shimo.im/docs/hTCKJHPJRkp8PDR8/">查看支持格式</a></p>';
                    }
                }
            },
            inputPathView: {
                title: "请输入保存路径",
                input: "text",
                inputPlaceholder: "格式示例：/GTA5/, 留空保存在根目录",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValidator: function(value) {
                    if (value.match(/["\\\:*?<>|]/)) {
                        return '路径中不能含有以下字符"\\:*?<>|, 格式示例：/GTA5/';
                    }
                }
            },
            csdWarning: {
                title: "请允许跨域访问",
                showCloseButton: true,
                allowOutsideClick: false,
                input: "checkbox",
                inputPlaceholder: "不再显示",
                html: htmlCsdWarning
            },
            genUnfinishi: {
                title: "检测到未完成的秒传任务",
                text: "是否继续进行？",
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            },
            genView: {
                title: "请输入需要生成的文件路径",
                input: "textarea",
                showCancelButton: true,
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
                confirmButtonText: "确定"
            }
        };
        var __spreadArray = undefined && undefined.__spreadArray || function(to, from) {
            for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
            return to;
        };
        var Swalbase = function() {
            function Swalbase(myrapiduploadTask, mygeneratebdlinkTask) {
                this.rapiduploadTask = myrapiduploadTask;
                this.generatebdlinkTask = mygeneratebdlinkTask;
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
            Swalbase.prototype.inputView = function(swalArgs) {
                var _this = this;
                Swal.fire(this.mergeArg(swalConfig.inputView, swalArgs)).then((function(result) {
                    if (result.isConfirmed) {
                        _this.inputPathView();
                    }
                }));
            };
            Swalbase.prototype.inputPathView = function(swalArg) {
                Swal.update(this.mergeArg(swalConfig.inputPathView, swalArg));
            };
            return Swalbase;
        }();
        const SwalBase = Swalbase;
        var GeneratebdlinkTask = function() {
            function GeneratebdlinkTask() {
                this.fileInfoList = [];
            }
            return GeneratebdlinkTask;
        }();
        const common_GeneratebdlinkTask = GeneratebdlinkTask;
        var RapiduploadTask = function() {
            function RapiduploadTask() {
                this.fileInfoList = [];
            }
            return RapiduploadTask;
        }();
        const common_RapiduploadTask = RapiduploadTask;
        var swalInstance = new SwalBase(new common_RapiduploadTask, new common_GeneratebdlinkTask);
        var gen_prog, gen_num;
        var show_prog = function(r) {
            var rate = r.loaded / r.total * 100;
            gen_prog.textContent = rate.toFixed() + "%";
        };
        var checkbox_par = {
            input: "checkbox",
            inputValue: GM_getValue("with_path_baidu"),
            inputPlaceholder: "导出文件夹目录结构"
        };
        function registerPlugin() {
            unsafeWindow.define("function-widget:mengzonefire/rapidupload-userscript.js", (function(_require, exports, _module) {
                exports.start = function(_context, module) {
                    if (!module || module.config.name === "generateBdlink") {} else if (module.config.name === "rapidupload") {
                        swalInstance.inputView();
                    }
                };
            }));
            unsafeWindow.manifest.push({
                name: "秒传链接提取",
                group: "moe.cangku.mengzonefire",
                version: "1.0",
                type: "1",
                description: "用于转存百度网盘秒传链接",
                buttons: [ {
                    conditions: {
                        pageModule: "list"
                    },
                    index: 5,
                    disabled: "none",
                    color: "blue blue-upload",
                    icon: "icon-disk",
                    title: "秒传链接",
                    name: "rapidupload",
                    position: "tools"
                }, {
                    conditions: {
                        excludeDirType: "sourceHolder,cardHolder,shareHolder"
                    },
                    index: 0,
                    title: "生成秒传",
                    icon: "icon-share",
                    name: "generateBdlink",
                    position: "listTools"
                } ],
                contextMenu: [ {
                    conditions: {
                        excludeDirType: "sourceHolder,cardHolder,shareHolder",
                        pageModule: "list,share,search,category,searchGlobal"
                    },
                    index: 6,
                    type: "file",
                    title: "生成秒传",
                    keyboard: "g",
                    disabled: "disable",
                    name: "generateBdlink"
                } ],
                preload: false,
                depsFiles: [],
                entranceFile: "function-widget:mengzonefire/rapidupload-userscript.js",
                pluginId: "rapiduploadUserscript"
            });
        }
        function loaderBaidu() {
            if (locUrl.indexOf(baiduNewPage) !== -1) {
                swalInstance.swalArgs = {
                    heightAuto: false,
                    scrollbarPadding: false
                };
                installNew();
            } else {
                install();
                hook("system-core:pluginHub/register/register.js", registerPlugin);
            }
            var bdlink = initQueryLink();
            if (bdlink) {
                window.addEventListener("DOMContentLoaded", (function() {
                    swalInstance.inputView({
                        inputValue: bdlink
                    });
                }));
            } else {}
        }
        var CheckBox = __webpack_require__(420);
        function showAlert(text) {
            alert(TAG + ":\n" + text);
        }
        function showSwal() {}
        function showSwalRapidupload() {}
        function showSwalGenerateBdlink() {}
        function injectStyle() {
            var swalThemes = GM_getValue("swalThemes") || "default";
            var defaultThemes = GM_getResourceText("swalCss");
            if (swalThemes === "default") {
                if (defaultThemes) {
                    GM_addStyle(defaultThemes);
                } else {
                    getThemesCss(swalThemes);
                }
                return;
            }
            var ThemesCss = GM_getValue("1.7.4" + swalThemes);
            if (ThemesCss) {
                GM_addStyle(ThemesCss);
            } else {
                getThemesCss(swalThemes);
            }
            return;
        }
        function getThemesCss(swalThemes) {
            var ThemesCssKey = "1.7.4" + swalThemes;
            $.get({
                url: extCssUrl[swalThemes],
                dataType: "text",
                success: function(data, statusTxt, _xhr) {
                    if (statusTxt == "success") {
                        var ThemesCss = data;
                        if (ThemesCss.length < 100) {
                            showAlert("样式包加载错误, 请前往脚本页反馈");
                            return;
                        }
                        GM_setValue(ThemesCssKey, ThemesCss);
                        GM_addStyle(ThemesCss);
                    } else if (statusTxt == "error") {
                        showAlert("样式包加载失败, 弹出跨域访问窗口请选择允许");
                    }
                }
            });
        }
        function app_app() {
            if (Base64 && $ && SparkMD5 && Swal) {
                Base64.extendString();
                injectStyle();
                loaderBaidu();
            } else {
                showAlert("外部资源加载失败, 脚本无法运行, 请检查网络或更换DNS");
            }
        }
        app_app();
    })();
})();