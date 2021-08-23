export default function registerPlugin() {
  window.define('function-widget:jixun/standard-code.js', (require, exports) => {
    // 添加秒传按钮的代码入口
  });


  window.manifest.push({
    name: '秒传链接支持',
    group: 'moe.jixun.code',
    version: '1.0',
    type: '1',
    description: '类似于 115 的标准提取码',
    filesType: '*',
    buttons: [{
      index: 2,
      disabled: 'none',
      color: 'violet',
      icon: 'icon-upload',
      title: '秒传链接',
      buttonStyle: 'normal',
      pluginId: 'JIXUNSTDCODE',
      position: 'tools',
    }],
    preload: false,
    depsFiles: [],
    entranceFile: 'function-widget:jixun/standard-code.js',
    pluginId: 'JIXUNSTDCODE',
  });
}
