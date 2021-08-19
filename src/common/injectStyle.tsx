import { extCssUrl, dependAlert, csdAlert } from "./const";

export function injectStyle() {
  // sweetAlert的主题(css), 默认为Minimal
  let swalThemes:string = GM_getValue('swalThemes') || "Minimal";
  let Minimal:string = GM_getResourceText("swalCss");
  if (swalThemes === "Minimal") {
    if (Minimal) {
      GM_addStyle(Minimal);
    } else {
      // 暴力猴直接粘贴脚本代码时可能不会将resource中的数据下载缓存，fallback到下载css代码
      getThemesCss(swalThemes);
    }
    return;
  }
  // 获取非默认主题包的CSS
  let ThemesCss:string = GM_getValue(`1.7.4${swalThemes}`);
  if (ThemesCss) {
    GM_addStyle(ThemesCss);
  } else {
    // 未在缓存中找到, fallback到下载css代码
    getThemesCss(swalThemes);
  }
  return;
}

function getThemesCss(swalThemes: string) {
  $.get({
    url: extCssUrl[swalThemes],
    dataType: "text",
    success: (data: string, textStatus: string) => {
        if (textStatus == "success"){
            let ThemesCss = data;
            if (ThemesCss.length < 100) {
              alert(dependAlert);
            }else{
                GM_setValue(`1.7.4${swalThemes}`, ThemesCss);
                GM_addStyle(ThemesCss);
            }
        }else {
            alert(csdAlert);
        }  
    }});
}

