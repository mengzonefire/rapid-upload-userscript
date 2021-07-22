若喜欢该脚本可前往 [![](https://static.afdiancdn.com/favicon.ico) 爱发电](https://afdian.net/@mengzonefire) 支持作者

## 近期通知

* 21.7.17: 

    - 管理员已完成对昨日举报的审核[(图1)](https://pic.rmb.bdstatic.com/bjh/a6abf0daa40362c10385432fb5150ae7.png), 脚本页现可正常访问了

    - 鉴于 [阿里云盘](https://www.aliyundrive.com/drive/) 有更稳定的服务端(不存在"秒传无效", "md5获取失败"等问题), 即将着手阿里云盘对应的秒传提取&生成功能, 预计下个月更新.

* 21.7.16: 估计是因为脚本头几行留有babel工具生成的语法转换代码[(图1)](https://pic.rmb.bdstatic.com/bjh/9cd999f1d1a35b350e83f93fc685dee7.png), 被人误解为压缩代码举报了[(图2)](https://pic.rmb.bdstatic.com/bjh/eb18b94af7dacd00b11e8cbac3b1e1e4.png), 故将源码重新格式化了一遍[(图3)](https://pic.rmb.bdstatic.com/bjh/ecc36a94f8632b8fba81594d37646b31.png)以避免误解.

<details>
<summary>历史通知</summary>

<ul><li><p>21.7.12: 经测试, 度盘服务器已恢复正常, 可以正常上传文件并生成秒传.</p></li><li><p>21.7.10: (<span style="color: red;"> 重要 </span>) 从7.9开始, 新上传网盘的文件<span style="color: red;"> 很可能 </span>出现 &quot;秒传未生效&quot;, &quot;md5获取失败&quot;的问题, 疑似百度服务器异常, 正在尝试修复.</p><p>*<a href="https://shimo.im/docs/TZ1JJuEjOM0wnFDH/">分享教程</a> 内提供了临时的解决方法</p></li><li><p>21.7.9: (<span style="color: red;"> 重要 </span>) 1.8.1版本更换了秒传接口, 解决了绝大部分 &quot;<span style="color: red;"> 文件不存在(秒传未生效) </span>&quot; 和 &quot;<span style="color: red;"> md5获取失败 </span>&quot; 的问题, 为保证使用体验, 强烈建议更新到最新版</p></li></ul>

</details>


## 相关教程

* 脚本<span style="color: red;"> 不能正常使用 </span>或<span style="color: red;"> 不会安装 </span>, 请先阅读安装教程 [安装教程](https://shimo.im/docs/Jqf8y260KuofSb4K/)

* 生成&分享过程中遇到问题, 例如 秒传无效 / md5获取失败 / 文件和谐, 可参考 [分享教程](https://shimo.im/docs/TZ1JJuEjOM0wnFDH/)

* 详细的关于 <span style="color: red;">文件和谐</span> 的说明可参考 [防和谐教程](https://shimo.im/docs/DGdDwPwTDhvyq6KX/)

* 脚本的完整使用教程(包含安装、提取、生成), 可参考 [秒传教程[视频版]](https://www.bilibili.com/video/BV1E5411H76K)

## 脚本说明

* 使用了[仓库用度盘投稿助手](https://greasyfork.org/zh-CN/scripts/3285)中的秒传提取代码，代码通过babel工具转换为es5，若需要es6版本的源码，请前往 [![](https://github.githubassets.com/favicons/favicon.png) GitHub](https://github.com/mengzonefire/my_web_script/blob/main/%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96/%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96(es6).js)

* 支持批量提取(回车分隔符), 支持url传参(一键秒传), 格式：`https://pan.baidu.com/#bdlink=[参数]`，[参数]为base64加密过的任意格式链接 (支持批量)

* 支持生成秒传, 选择文件/文件夹后即可看到秒传生成按钮

![](https://pic.rmb.bdstatic.com/bjh/1cb5384f4b7cd3fc5a07b42ef45bfe93.png)


## 常见秒传格式

<details>
<summary>点击展开</summary>

<ul><li><p>梦姬标准/标准码: D5AABEFC3290F7A3C09912228B136D0C#821A9F0D27FCD19C80474D2140ED2D85#6467659#test.exe</p></li><li><p>PanDL格式: bdpan://dGVzdC5leGV8NjQ2NzY1OXxENUFBQkVGQzMyOTBGN0EzQzA5OTEyMjI4QjEzNkQwQ3w4MjFBOUYwRDI3RkNEMTlDODA0NzREMjE0MEVEMkQ4NQ==</p></li><li><p>PCS-GO格式: BaiduPCS-Go rapidupload -length=6467659 -md5=D5AABEFC3290F7A3C09912228B136D0C -slicemd5=821A9F0D27FCD19C80474D2140ED2D85 &quot;/test.exe&quot;</p></li></ul>

</details>

## 常见问题

（若秒传按钮不显示、无反应或弹窗卡死, 请按F12打开控制台查看&截图反馈报错）

1. 安装脚本显示 <span style="color: red;">编译错误</span> 请先安装油猴Tampermonkey或暴力猴Violentmonkey, 注意脚本<span style="color: red;">不兼容</span>油猴子Greasemonkey

2. 若持续报错 <span style="color: red;">接口调用失败(请重试/...)(#514)</span> 请尝试使用chrome浏览器 或 关闭杀软

## 待更新
1. 支持 新版度盘页面 下的 "生成秒传" 功能
2. 支持 [阿里云盘](https://www.aliyundrive.com/drive/) 的秒传提取&生成
3. ~~支持 [新版度盘页面](https://pan.baidu.com/disk/main?from=oldversion#/index)~~ (完成)
4. ~~修复设置为非默认主题时, 窗口内会出现警告标识的问题~~ (完成, 实际为主题包不适配旧版sweetalert2)

## 更新说明

21.7.18更新: 修复了部分生成提示 "<span style="color: red;">md5获取失败</span>" 的问题

21.7.6更新: 支持转存与生成 <span style="color: red;">20G以上</span> 文件的秒传

21.6.28更新: 

1. 大幅提升非会员账号生成秒传的速度

2. 修复生成4G以上文件提示"<span style="color: red;">服务器错误(#500)</span>"的问题

21.6.25更新：修复了绝大部分转存提示 "<span style="color: red;">文件不存在(秒传未生效)(#404)</span>" 的问题

<details>
<summary>历史更新 [点击展开]</summary>

<p>21.6.24更新：修复从yun.baidu.com进入时, 弹窗提示 &quot;bdskoten获取失败&quot; 的问题</p>

<p>21.6.23更新：将sweetalert2和设置内的主题包升级到最新版(适配主题后修复了 待更新#3)</p>

<p>21.6.18更新：转存秒传添加bdstoken参数, 防止报错&quot;转存失败(#2)&quot;, 并支持了新版度盘页面下的转存功能:</p>

<p><img alt="" src="https://pic.rmb.bdstatic.com/bjh/ed9647f2c8d16a8a6fb74d42e51626cf.png"/></p>

<p>21.6.18更新：移除<span style="color: red;"> 修复下载 </span>功能(已在21年4月上旬失效), 后续不会再考虑修复该功能</p>

<p>21.3.30更新：修复部分秒传转存提示 &quot;文件不存在&quot; 或 &quot;md5不匹配&quot;, 有该情况的请务必更新到1.6.7版本</p>

<p>21.3.29更新：新增<span style="color: red;"> 直接修复下载 </span>功能，无需秒传即可修复下载，感谢TkzcM的帮助</p>

<p><span style="color: red;">注意:</span> 后续测试发现1.6.1和1.6.2版本该功能有可能使原文件丢失, 若需要使用该功能请务必更新到1.6.3以上版本</p>

<p><span style="color: red;">注意2:</span> 由于实现机制不同, &quot;直接修复&quot; 的成功率相对 &quot;转存的修复&quot; 较低, 至少一半以上的文件无法修复(弹窗提示 &quot;不支持修复&quot;), 目前暂时未找到解决方法</p>

<p><img alt="" src="https://pic.rmb.bdstatic.com/bjh/5e05f7c1f772451b8efce938280bcaee.png"/></p>

<p>21.3.16更新：秒传转存新增<span style="color: red;"> 修复下载 </span>功能，可修复绝大部分无法下载的文件 (需有秒传链接并在转存时勾选修复选项)</p>

<p><img alt="" src="https://pic.rmb.bdstatic.com/bjh/822bf85e8b663f352c65f04a50a305e1.png"/></p>

<p>21.2.26更新：若在更新1.5.0版本后出现秒传按钮不显示的问题, 请尝试更新到1.5.5版本</p>

<p>21.2.11更新：<a href="https://shimo.im/docs/TZ1JJuEjOM0wnFDH/">分享教程</a> 更新, 原教程的 &quot;固实压缩+加密文件名&quot; 已无法再防和谐(在度盘移动端依旧可以在线解压), 目前有效的防和谐方法请参考教程内的 &quot;<span style="color: red;">双层压缩</span>&quot;</p>

<p>21.1.28更新：兼容了暴力猴插件, 添加更换主题功能, 优化部分代码逻辑</p>

<p>21.1.11更新：若1.4.0版本出现 &quot;转存失败&quot; 的情况, 请更新1.4.4版本</p>

<p>20.12.18更新：不再支持暴力猴violentmonkey2.12.8以上插件, 使用该插件的用户请降级插件或改用油猴插件Tampermonkey</p>

<p>若使用1.3.5版本时出现一键秒传(解base64)不可用的情况, 请将脚本更新至1.3.6以上</p>

<p>20.11.12更新：若1.2.9版本出现秒传按钮不显示的情况, 请更新1.3.0版本</p>

<p>20.11.5更新：若出现转存时路径留空转存无反应的情况, 请更新1.2.7版本</p>

<p>20.11.2更新：</p>

<ol><li><p>加入了生成秒传的功能, 选择文件/文件夹后即可看到秒传生成按钮</p></li><li><p>增加了跳转目录的功能, 若在秒传转存时有输入保存路径, 转存完成后可以看到跳转按钮</p></li></ol>

</details>

## 秒传链接的获取方式

1. 使用脚本自带的生成功能, 选中文件/文件夹, 再点击 "生成秒传"

2. 本地秒传生成工具 [蓝奏云 密码:ab2f](https://wwe.lanzoui.com/b01u0yqvi)

*需要任意账号的网盘中存有至少一份文件才能保证秒传链接的有效性