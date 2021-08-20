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

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 96:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _node_modules_css_loader_6_2_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(711);
/* harmony import */ var _node_modules_css_loader_6_2_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_6_2_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_6_2_0_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\"不再显示\"的样式*/\r\n.mzf_btn {\r\n  font-feature-settings: \"lnum\";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  outline: 0;\r\n  font-size: 15px;\r\n  color: #09aaff;\r\n  border: 2px solid #c3eaff;\r\n  border-radius: 4px;\r\n  padding: 10px;\r\n  margin: 0 5px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n/*\"查看支持格式\"的样式*/\r\n.mzf_link {\r\n  font-feature-settings: \"lnum\";\r\n  -webkit-font-smoothing: antialiased;\r\n  line-height: 1.5;\r\n  font-family: inherit;\r\n  font-size: 1em;\r\n  font-weight: 300;\r\n  -webkit-tap-highlight-color: transparent;\r\n  color: #09aaff;\r\n  text-decoration: none;\r\n  outline: 0;\r\n}\r\n\r\n/*\"赞助页\" \"脚本页\"的样式*/\r\n.mzf_link2 {\r\n  font-feature-settings: \"lnum\";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  font-size: 1.125em;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  outline: 0;\r\n  color: #09aaff;\r\n}\r\n\r\n/*若喜欢该脚本...的样式*/\r\n.mzf_text {\r\n  font-feature-settings: \"lnum\";\r\n  -webkit-font-smoothing: antialiased;\r\n  font-family: inherit;\r\n  color: #545454;\r\n  font-size: 1.125em;\r\n  font-weight: 400;\r\n  word-break: break-word;\r\n  -webkit-tap-highlight-color: transparent;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 34px;\r\n  display: block;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n", ""]);
// Exports
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (___CSS_LOADER_EXPORT___)));


/***/ }),

/***/ 711:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
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

/***/ }),

/***/ 158:
/***/ ((module) => {

module.exports = Base64;

/***/ }),

/***/ 938:
/***/ ((module) => {

module.exports = SparkMD5;

/***/ }),

/***/ 262:
/***/ ((module) => {

module.exports = Swal;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./src/app.css
var app = __webpack_require__(96);
;// CONCATENATED MODULE: ./src/aliyun/loader.tsx
function loaderAliyun() {
    // 加载阿里秒传脚本
}

;// CONCATENATED MODULE: ./src/baidu/loader.tsx
function loaderBaidu() {
    // 加载百度秒传脚本
}

;// CONCATENATED MODULE: ./src/loader.tsx


function loader(appName) {
    var myLoader = null;
    if (appName === "baidu") {
        myLoader = loaderBaidu;
    }
    else if (appName === "aliyun") {
        myLoader = loaderAliyun;
    }
    window.addEventListener("DOMContentLoaded", myLoader);
}

;// CONCATENATED MODULE: ./src/common/const.tsx
var domain = document.domain;
var locUrl = location.href;
var aliyunMatchList = ["www.aliyundrive.com"];
var baiduMatchList = ["pan.baidu.com", "yun.baidu.com"];
// 新版度盘界面
var baiduNewPage = 'pan.baidu.com/disk/main#/';
// 屏蔽wap移动版界面
var baiduWapPage = "pan.baidu.com/wap/";
var TAG = "[秒传链接提取 By mengzonefire]";
// 各主题包对应的url
var extCssUrl = {
    Minimal: "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
    Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
    "WordPress Admin": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
    "Material UI": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
    Bulma: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
    "Bootstrap 4": "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css",
};
var dependAlert = "秒传链接提取:\n外部依赖加载失败, 脚本无法运行, 请检查网络或更换DNS";
var csdAlert = "秒传链接提取:\n外部依赖加载失败, 弹出跨域访问窗口请选择允许";
var styleText = "style='width: 100%;height: 34px;display: block;line-height: 34px;text-align: center;'";
var styleLink = "style='color: #09AAFF;'";
var styleBtn = "style='font-size: 15px;color: #09AAFF;border: 2px solid #C3EAFF;border-radius: 4px;padding: 10px;margin: 0 5px;padding-top: 5px;padding-bottom: 5px; cursor: pointer'";
var htmlDonate = "<p id=\"bdcode_donate\" " + styleText + ">\u82E5\u559C\u6B22\u8BE5\u811A\u672C, \u53EF\u524D\u5F80 <a " + styleLink + " href=\"https://afdian.net/@mengzonefire\" rel=\"noopener noreferrer\" target=\"_blank\">\u8D5E\u52A9\u9875</a> \u652F\u6301\u4F5C\u8005<a id=\"kill_donate\" " + styleBtn + "><span style=\"width: auto;\">\u4E0D\u518D\u663E\u793A</span></a></p>";
var htmlFeedback = "<p id=\"bdcode_feedback\" " + styleText + ">\u82E5\u6709\u4EFB\u4F55\u7591\u95EE, \u53EF\u524D\u5F80 <a " + styleLink + " href=\"https://greasyfork.org/zh-CN/scripts/424574\" rel=\"noopener noreferrer\" target=\"_blank\">\u811A\u672C\u9875</a> \u53CD\u9988<a id=\"kill_feedback\" " + styleBtn + "><span class=\"text\" style=\"width: auto;\">\u4E0D\u518D\u663E\u793A</span></a></p>";

;// CONCATENATED MODULE: ./src/common/injectStyle.tsx

function injectStyle() {
    // sweetAlert的主题(css), 默认为Minimal
    var swalThemes = GM_getValue('swalThemes') || "Minimal";
    var Minimal = GM_getResourceText("swalCss");
    if (swalThemes === "Minimal") {
        if (Minimal) {
            GM_addStyle(Minimal);
        }
        else {
            // 暴力猴直接粘贴脚本代码时可能不会将resource中的数据下载缓存，fallback到下载css代码
            getThemesCss(swalThemes);
        }
        return;
    }
    // 获取非默认主题包的CSSet
    var ThemesCss = GM_getValue("1.7.4" + swalThemes);
    if (ThemesCss) {
        GM_addStyle(ThemesCss);
    }
    else {
        // 未在缓存中找到, fallback到下载css代码
        getThemesCss(swalThemes);
    }
    return;
}
function getThemesCss(swalThemes) {
    $.get({
        url: extCssUrl[swalThemes],
        dataType: "text",
        success: function (data, textStatus) {
            if (textStatus == "success") {
                var ThemesCss = data;
                if (ThemesCss.length < 100) {
                    alert(dependAlert);
                }
                else {
                    GM_setValue("1.7.4" + swalThemes, ThemesCss);
                    GM_addStyle(ThemesCss);
                }
            }
            else {
                alert(csdAlert);
            }
        }
    });
}

;// CONCATENATED MODULE: ./src/app.tsx




// function check_backlist(loc: string, blacklist: Array<string>) {
//     for (let match_str of blacklist) {
//         if (loc.match(new RegExp(match_str))) {
//             // in black list
//             return true;
//         }
//         // not in black list
//         return false;
//     }
// }
// 检查外部依赖
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
    }
    else if (aliyunMatchList.includes(domain)) {
        return "aliyun";
    }
    else {
        return "";
    }
}
if (checkDepend()) {
    console.log('秒传连接提取: 外部依赖加载成功');
    injectStyle();
    loader(checkDomain(domain));
}
else {
    alert(dependAlert);
}

})();

/******/ })()
;