import appCss from "@/css/app.scss";
import defaultThemesCss from "@/css/sweetalert2.min.css";
import { showAlert } from "./utils";
import { extCssUrl, appError, swalCssVer } from "./const";
import { loaderBaidu } from "../baidu/loader";
import ajax from "./ajax";

/**
 * @description: 注入脚本样式
 */
export function injectStyle(): void {
  GM_addStyle(appCss); // 注入自定义样式
  let swalThemes: string = GM_getValue("swalThemes") || "Default"; // sweetAlert的主题(css), 默认为Default
  if (swalThemes === "Default") GM_addStyle(defaultThemesCss);
  else {
    let ThemesCss: string = GM_getValue(`${swalCssVer}${swalThemes}`); // 从缓存获取非默认主题的css代码
    if (ThemesCss) GM_addStyle(ThemesCss);
    else {
      getThemesCss(swalThemes); // 未找到缓存, fallback到下载css代码
      return;
    }
  }
  loaderBaidu();
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
      loaderBaidu();
    },

    (statusCode) => {
      showAlert(appError.SwalCssErrReq + `#${statusCode}`);
    }
  );
}
