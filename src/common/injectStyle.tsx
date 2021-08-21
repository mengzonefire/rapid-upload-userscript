import { extCssUrl, dependAlert, csdAlert } from "./const";

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
 * @description: 下载并注入对应主题的css样式代码
 * @param {string} swalThemes 主题名
 */
function getThemesCss(swalThemes: string): void {
  $.get({
    url: extCssUrl[swalThemes],
    dataType: "text",
    success: (data: string, textStatus: string) => {
      if (textStatus == "success") {
        let ThemesCss = data;
        if (ThemesCss.length < 100) {
          alert(dependAlert);
        } else {
          GM_setValue(`1.7.4${swalThemes}`, ThemesCss);
          GM_addStyle(ThemesCss);
        }
      } else {
        alert(csdAlert);
      }
    },
  });
}
