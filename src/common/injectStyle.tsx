import "@/components/CheckBox.css";
import { showAlert } from "./utils";
import { extCssUrl, appError, ajaxError, swalCssVer } from "./const";
import ajax from "./ajax";

/**
 * @description: 注入Swal样式
 */
export function injectStyle(): void {
  let swalThemes: string = GM_getValue("swalThemes") || "default"; // sweetAlert的主题(css), 默认为default
  let defaultThemes: string = GM_getResourceText("swalCss");
  if (swalThemes == "default") {
    if (defaultThemes) {
      GM_addStyle(defaultThemes);
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
      dataType: "text",
    },
    (data: string) => {
      let ThemesCss = data;
      if (ThemesCss.length < 100) {
        console.log(`${swalThemes} InvalidCss:\n${ThemesCss}`);
        showAlert(appError.SwalCssInvalid);
        return;
      } // 返回data数据长度过小, 判定为无效样式代码
      GM_setValue(`${swalCssVer}${swalThemes}`, ThemesCss); // 缓存css代码
      GM_addStyle(ThemesCss); // 注入css
    },

    (statusCode: number) => {
      if (statusCode == ajaxError) showAlert(appError.SwalCssErrReq);
      else showAlert(appError.SwalCssBadReq + `(http#${statusCode})`);
    }
  );
}
