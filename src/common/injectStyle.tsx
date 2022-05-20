import checkBoxCss from "@/components/checkBox.css";
import appCss from "@/app.scss";
import { showAlert } from "./utils";
import { extCssUrl, appError, swalCssVer } from "./const";
import ajax from "./ajax";

/**
 * @description: 注入脚本样式
 */
export function injectStyle(): void {
  GM_addStyle(appCss); // 注入自定义样式
  GM_addStyle(checkBoxCss); // 注入checkBox选框样式
  let swalThemes: string = GM_getValue("swalThemes") || "Default"; // sweetAlert的主题(css), 默认为Default
  let defaultThemesCss: string = GM_getResourceText("swalCssBak");
  if (swalThemes === "Default") {
    if (defaultThemesCss) {
      GM_addStyle(defaultThemesCss);
    } else {
      getThemesCss(swalThemes); // 暴力猴直接粘贴脚本代码可能不会将resource中的数据下载缓存，fallback到下载css代码
    }
    return;
  }
  let ThemesCss: string = GM_getValue(`${swalCssVer}${swalThemes}`); // 下载非默认主题的css代码
  if (ThemesCss) {
    GM_addStyle(ThemesCss);
  } else {
    getThemesCss(swalThemes); // 未找到缓存, fallback到下载css代码
  }
  return;
}

/**
 * @description: 下载并注入对应主题的css样式代码, 会将css代码缓存本地
 * @param {string} swalThemes 主题包名
 */
function getThemesCss(swalThemes: string): void {
  ajax(
    {
      url: extCssUrl[swalThemes],
      method: "GET",
    },
    (data) => {
      let ThemesCss = data.responseText;
      if (ThemesCss.length < 100) {
        showAlert(
          appError.SwalCssInvalid +
            `\n错误数据:${swalThemes} InvalidCss:\n${ThemesCss}`
        );
        return;
      } // 返回data数据长度过小, 判定为无效样式代码
      GM_setValue(`${swalCssVer}${swalThemes}`, ThemesCss); // 缓存css代码
      GM_addStyle(ThemesCss); // 注入css
    },

    (statusCode) => {
      showAlert(appError.SwalCssErrReq + `#${statusCode}`);
    }
  );
}
