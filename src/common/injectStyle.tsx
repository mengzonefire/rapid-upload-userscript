import "@/components/CheckBox.css"
import { showAlert } from "./utils";
import { extCssUrl, appError } from "./const";

/**
 * @description: 注入Swal样式
 */
export function injectStyle(): void {
  let swalThemes: string = GM_getValue("swalThemes") || "Minimal"; // sweetAlert的主题(css), 默认为Minimal
  let Minimal: string = GM_getResourceText("swalCss");
  if (swalThemes === "Minimal") {
    if (Minimal) {
      GM_addStyle(Minimal);
    } else {
      getThemesCss(swalThemes); // 暴力猴直接粘贴脚本代码可能不会将resource中的数据下载缓存，fallback到下载css代码
    }
    return;
  }
  let ThemesCss: string = GM_getValue(`1.7.4${swalThemes}`); // 下载非默认主题的css代码
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
  let ThemesCssKey = `1.7.4${swalThemes}`;
  $.get({
    url: extCssUrl[swalThemes],
    dataType: "text",
    success: (data: string, statusTxt: string, _xhr: JQuery.jqXHR) => {
      if (statusTxt == "success") {
        let ThemesCss = data;
        if (ThemesCss.length < 100) {
          showAlert(appError.errorSwalCss); // 返回data数据长度过小, 判定为无效代码
          return;
        }
        GM_setValue(ThemesCssKey, ThemesCss); // 缓存css代码
        GM_addStyle(ThemesCss); // 注入css
      } else if (statusTxt == "error") {
        showAlert(appError.missSwalCss);
      }
    },
  });
}
