// ==UserScript==
// @name 秒传链接提取
// @version 2.0.0
// @author mengzonefire
// @description 用于提取和生成百度网盘秒传链接
// @homepage https://github.com/mengzonefire/du_rapid_upload#readme
// @supportURL https://github.com/mengzonefire/du_rapid_upload/issues
// @match *://pan.baidu.com/disk/home*
// @match *://pan.baidu.com/disk/main*
// @match *://yun.baidu.com/disk/home*
// @license [license]
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
            ___CSS_LOADER_EXPORT___.push([ module.id, '/*"不再显示"的样式*/\r\n.mzf_btn {\r\n  font-feature-settings: "lnum";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  outline: 0;\r\n  font-size: 15px;\r\n  color: #09aaff;\r\n  border: 2px solid #c3eaff;\r\n  border-radius: 4px;\r\n  padding: 10px;\r\n  margin: 0 5px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n/*"查看支持格式"的样式*/\r\n.mzf_link {\r\n  font-feature-settings: "lnum";\r\n  -webkit-font-smoothing: antialiased;\r\n  line-height: 1.5;\r\n  font-family: inherit;\r\n  font-size: 1em;\r\n  font-weight: 300;\r\n  -webkit-tap-highlight-color: transparent;\r\n  color: #09aaff;\r\n  text-decoration: none;\r\n  outline: 0;\r\n}\r\n\r\n/*"赞助页" "脚本页"的样式*/\r\n.mzf_link2 {\r\n  font-feature-settings: "lnum";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  font-size: 1.125em;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  outline: 0;\r\n  color: #09aaff;\r\n}\r\n\r\n/*若喜欢该脚本...的样式*/\r\n.mzf_text {\r\n  font-feature-settings: "lnum";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  color: #545454;\r\n  font-size: 1.125em;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 34px;\r\n  display: block;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n', "" ]);
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
        function loaderBaidu() {}
        function loader(appName) {
            var myLoader = null;
            if (appName === "baidu") {
                myLoader = loaderBaidu;
            } else if (appName === "aliyun") {
                myLoader = loaderAliyun;
            }
            window.addEventListener("DOMContentLoaded", myLoader);
        }
        var domain = document.domain;
        var locUrl = location.href;
        var aliyunMatchList = [ "www.aliyundrive.com" ];
        var baiduMatchList = [ "pan.baidu.com", "yun.baidu.com" ];
        var baiduNewPage = "pan.baidu.com/disk/main#/";
        var baiduWapPage = "pan.baidu.com/wap/";
        var TAG = "[秒传链接提取 By mengzonefire]";
        var extCssUrl = {
            Minimal: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
            "WordPress Admin": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
            "Material UI": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
            Bulma: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
            "Bootstrap 4": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css"
        };
        var dependAlert = "秒传链接提取:\n外部依赖加载失败, 脚本无法运行, 请检查网络或更换DNS";
        var csdAlert = "秒传链接提取:\n外部依赖加载失败, 弹出跨域访问窗口请选择允许";
        var styleText = "style='width: 100%;height: 34px;display: block;line-height: 34px;text-align: center;'";
        var styleLink = "style='color: #09AAFF;'";
        var styleBtn = "style='font-size: 15px;color: #09AAFF;border: 2px solid #C3EAFF;border-radius: 4px;padding: 10px;margin: 0 5px;padding-top: 5px;padding-bottom: 5px; cursor: pointer'";
        var htmlDonate = '<p id="bdcode_donate" ' + styleText + ">若喜欢该脚本, 可前往 <a " + styleLink + ' href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者<a id="kill_donate" ' + styleBtn + '><span style="width: auto;">不再显示</span></a></p>';
        var htmlFeedback = '<p id="bdcode_feedback" ' + styleText + ">若有任何疑问, 可前往 <a " + styleLink + ' href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank">脚本页</a> 反馈<a id="kill_feedback" ' + styleBtn + '><span class="text" style="width: auto;">不再显示</span></a></p>';
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
            $.get({
                url: extCssUrl[swalThemes],
                dataType: "text",
                success: function(data, textStatus) {
                    if (textStatus == "success") {
                        var ThemesCss = data;
                        if (ThemesCss.length < 100) {
                            alert(dependAlert);
                        } else {
                            GM_setValue("1.7.4" + swalThemes, ThemesCss);
                            GM_addStyle(ThemesCss);
                        }
                    } else {
                        alert(csdAlert);
                    }
                }
            });
        }
        function checkDepend() {
            var Base64 = __webpack_require__(158);
            var SparkMD5 = __webpack_require__(938);
            var Swal = __webpack_require__(262);
            if (Base64 && $ && SparkMD5 && Swal) {
                return true;
            }
            return false;
        }
        function checkDomain(domain) {
            if (baiduMatchList.includes(domain)) {
                return "baidu";
            } else if (aliyunMatchList.includes(domain)) {
                return "aliyun";
            } else {
                return "";
            }
        }
        if (checkDepend()) {
            console.log("秒传连接提取: 外部依赖加载成功");
            injectStyle();
            loader(checkDomain(domain));
        } else {
            alert(dependAlert);
        }
    })();
})();