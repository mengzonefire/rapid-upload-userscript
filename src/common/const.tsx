export const domain: string = document.domain;
export const loc_url = location.href;
export const domain_baidu_list: Array<string> = [
    "pan.baidu.com",
    "yun.baidu.com",
];
export const loc_baidu_blacklist: Array<string> = [
    "baidu.com/wap/"
]
export const domain_aliyun_list: Array<string> = ["www.aliyundrive.com"];
export const TAG = "[秒传链接提取 By mengzonefire]";
export const css_url = {
    'Minimal': 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
    'Dark': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css',
    'WordPress Admin': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css',
    'Material UI': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css',
    'Bulma': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css',
    'Bootstrap 4': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css'
};
export const style_text = `style='width: 100%;height: 34px;display: block;line-height: 34px;text-align: center;'`;
export const style_link = `style='color: #09AAFF;'`;
export const style_btn = `style='font-size: 15px;color: #09AAFF;border: 2px solid #C3EAFF;border-radius: 4px;padding: 10px;margin: 0 5px;padding-top: 5px;padding-bottom: 5px; cursor: pointer'`;
export const html_donate = `<p id="bdcode_donate" ${style_text}>若喜欢该脚本, 可前往 <a ${style_link} href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者<a id="kill_donate" ${style_btn}><span style="width: auto;">不再显示</span></a></p>`;
export const html_feedback = `<p id="bdcode_feedback" ${style_text}>若有任何疑问, 可前往 <a ${style_link} href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank">脚本页</a> 反馈<a id="kill_feedback" ${style_btn}><span class="text" style="width: auto;">不再显示</span></a></p>`;
