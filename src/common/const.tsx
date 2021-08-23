export const domain: string = document.domain;
export const locUrl: string = location.href;
export const aliyunMatchList: Array<string> = ["www.aliyundrive.com"];
export const baiduMatchList: Array<string> = ["pan.baidu.com", "yun.baidu.com"];
export const baiduNewPage = "pan.baidu.com/disk/main#/"; // 新版度盘界面
export const TAG = "[秒传链接提取 by mengzonefire]";
export const extCssUrl = {
  Minimal:
    "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
  Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
  "WordPress Admin":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
  "Material UI":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
  Bulma:
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
  "Bootstrap 4":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css",
}; // 各主题包对应的url

export const enum appError {
  missDepend = "外部资源加载失败, 脚本无法运行, 请检查网络或更换DNS",
  errorSwalCss = "样式包加载错误, 请前往脚本页反馈",
  missSwalCss = "样式包加载失败, 弹出跨域访问窗口请选择允许",
}

export const htmlDonate = `<p id="bdcode_donate" class="mzf_text">若喜欢该脚本, 可前往 <a class="mzf_link" href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>`;
export const htmlFeedback = `<p id="bdcode_feedback" class="mzf_text">若有任何疑问, 可前往 <a class="mzf_link" href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank">脚本页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>`;
