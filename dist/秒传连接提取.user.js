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
            ___CSS_LOADER_EXPORT___.push([ module.id, "/*按钮样式*/\r\n.mzf_btn {\r\n  text-align: center;\r\n  font-size: 0.85em;\r\n  color: #09aaff;\r\n  border: 2px solid #c3eaff;\r\n  border-radius: 4px;\r\n  margin: 0 5px;\r\n  padding: 10px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n}\r\n\r\n/*超链接样式*/\r\n.mzf_link {\r\n  font-family: inherit;\r\n  color: #09aaff;\r\n  text-decoration: none;\r\n}\r\n\r\n/*文本样式*/\r\n.mzf_text {\r\n  color: #545454;\r\n  font-size: 1.125em;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  margin: 0;\r\n  padding: 0;\r\n  height: 34px;\r\n  display: block;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n", "" ]);
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
        function loaderAliyun() {}
        var domain = document.domain;
        var locUrl = location.href;
        var aliyunMatchList = [ "www.aliyundrive.com" ];
        var baiduMatchList = [ "pan.baidu.com", "yun.baidu.com" ];
        var baiduNewPage = "pan.baidu.com/disk/main#/";
        var TAG = "[秒传链接提取 by mengzonefire]";
        var extCssUrl = {
            Minimal: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
            "WordPress Admin": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
            "Material UI": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
            Bulma: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
            "Bootstrap 4": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
        };
        var htmlDonate = '<p id="bdcode_donate" class="mzf_text">若喜欢该脚本, 可前往 <a class="mzf_link" href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>';
        var htmlFeedback = '<p id="bdcode_feedback" class="mzf_text">若有任何疑问, 可前往 <a class="mzf_link" href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank">脚本页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>';
        function injectMenuLegacy() {}
        function registerPlugin() {
            window.define("function-widget:mengzonefire/rapidupload-userscript.js", (function(_require, _exports) {}));
            window.manifest.push({
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
                    enable: true,
                    color: "blue blue-upload",
                    icon: "icon-disk",
                    title: "秒传链接",
                    name: "rapidupload"
                }, {
                    conditions: {
                        excludeDirType: "sourceHolder,cardHolder,shareHolder"
                    },
                    index: 1,
                    title: "生成秒传",
                    icon: "icon-share",
                    name: "generateBdlink"
                } ],
                contextMenu: [ {
                    conditions: {
                        excludeDirType: "sourceHolder,cardHolder,shareHolder",
                        pageModule: "list,share,search,category,searchGlobal"
                    },
                    index: 7,
                    title: "生成秒传",
                    keyboard: "G",
                    disabled: "disable",
                    name: "generateBdlink"
                } ],
                preload: false,
                entranceFile: "function-widget:mengzonefire/rapidupload-userscript.js",
                pluginId: "moe.cangku.mengzonefire"
            });
        }
        function initQueryLink() {}
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
            return oRequire.call(window, module);
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
            console.log(window);
            if (window.require) {
                console.warn("%s 覆盖方式安装，若无效请强制刷新。", TAG);
                oRequire = window.require;
                window.require = fakeRequire;
                Object.assign(fakeRequire, oRequire);
            } else {
                console.info("%s 钩子方式安装，若失效请报告。", TAG);
                Object.defineProperty(window, "require", {
                    set: function(require) {
                        oRequire = require;
                    },
                    get: function() {
                        return fakeRequire;
                    }
                });
            }
        }
        function loaderBaidu() {
            if (locUrl.indexOf(baiduNewPage) !== -1) {} else {
                install();
                hook("disk-system:widget/system/uiRender/menu/listMenu.js", injectMenuLegacy);
                hook("system-core:pluginHub/register/register.js", registerPlugin);
                hook("system-core:system/uiService/list/list.js", initQueryLink);
            }
        }
        function showAlert(text) {
            alert(TAG + ":\n" + text);
        }
        function showSwal() {}
        function injectStyle() {
            var swalThemes = GM_getValue("swalThemes") || "Minimal";
            var Minimal = GM_getResourceText("swalCss");
            if (swalThemes === "Minimal") {
                if (Minimal) {
                    GM_addStyle(Minimal);
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
        function checkDepend() {
            var Base64 = __webpack_require__(158);
            var SparkMD5 = __webpack_require__(938);
            var Swal = __webpack_require__(262);
            return Base64 && $ && SparkMD5 && Swal;
        }
        function checkDomain(domain) {
            var moduleName = "";
            if (baiduMatchList.includes(domain)) {
                moduleName = "baidu";
            } else if (aliyunMatchList.includes(domain)) {
                moduleName = "aliyun";
            }
            return moduleName;
        }
        function loader(moduleName) {
            var myLoader = function() {};
            if (moduleName === "baidu") {
                myLoader = loaderBaidu;
            } else if (moduleName === "aliyun") {
                myLoader = loaderAliyun;
            }
            myLoader();
        }
        function app_app() {
            if (checkDepend()) {
                injectStyle();
                loader(checkDomain(domain));
            } else {
                showAlert("外部资源加载失败, 脚本无法运行, 请检查网络或更换DNS");
            }
        }
        app_app();
    })();
})();