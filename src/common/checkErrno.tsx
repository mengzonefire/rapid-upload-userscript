export default function checkErrno(errno: any) {
  switch (errno) {
    case -7:
      return "保存路径/文件名存在非法字符";
    case -8:
      return "路径下存在同名文件";
    case 400:
      return "请求错误(尝试使用最新版Chrome浏览器/更新油猴插件)";
    case 403:
      return "接口被限制(请等待24h再试)";
    case 404:
      return "文件不存在(秒传未生效)";
    case 2:
      return "转存失败(尝试修改文件名或转存路径/重登网盘账号)";
    case 2333:
      return '链接内的文件路径错误(不能含有以下字符"\\:*?<>|)';
    case -10:
      return "网盘容量已满";
    case 114:
      return "接口调用失败(请重试)";
    case 514:
      return '接口调用失败(弹出跨域访问窗口时,请选择"总是允许"或"总是允许全部域名")';
    case 1919:
      return "文件已被和谐";
    case 810:
      return "文件列表获取失败(请重试)";
    case 996:
      return "md5获取失败(请参考分享教程)";
    case 500:
      return "服务器错误(请参考分享教程)";
    case 909:
      return "路径不存在";
    case 901:
      return "文件数量超出限制";
    default:
      return "未知错误";
  }
}
