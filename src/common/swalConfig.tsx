import updateInfo from "@/components/updateInfo.html";

// 各Swal弹窗的固定参数配置:
export const SwalConfig = {
  inputView: {
    title: "请输入秒传&保存路径",
    showCancelButton: true,
    html: `<textarea id="mzf-rapid-input" class="swal2-textarea" placeholder="[支持批量(换行分隔)]\n[支持PanDL/游侠/标准码/GO格式]\n[默认监听粘贴板,可在设置中关闭]\n[输入set进入设置页][输入gen进入生成页]" style="display: flex;"></textarea>
    <input id="mzf-path-input" class="swal2-input" placeholder="保存路径, 示例: /GTA5/, 留空保存在当前目录" style="display: flex;margin-top: 10px;">`,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    customClass: { htmlContainer: "mzf_html_container" },
  },

  processView: {
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
  },

  finishView: {
    showCloseButton: true,
    allowOutsideClick: false,
  },

  genUnfinish: {
    title: "检测到未完成的秒传任务",
    text: "是否继续进行?",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: "是",
    cancelButtonText: "否",
  },

  genView: {
    title: "请输入需要生成的文件路径",
    input: "textarea",
    showCancelButton: true,
    showCloseButton: true,
    inputPlaceholder: "[支持批量(换行分隔)]",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (value: string) => {
      if (!value) {
        return "文件路径不能为空";
      }
    },
  },

  updateInfo: {
    title: `秒传链接提取 更新内容`,
    showCloseButton: true,
    allowOutsideClick: false,
    confirmButtonText: "知道了",
    html: updateInfo,
  },

  checkRecursive: {
    icon: "info",
    title: "包含文件夹, 是否递归生成?",
    text: "若选是, 将同时生成各级子文件夹下的文件",
    allowOutsideClick: false,
    focusCancel: true,
    showCancelButton: true,
    reverseButtons: true,
    showCloseButton: true,
    confirmButtonText: "是",
    cancelButtonText: "否",
  },

  checkMd5Warning: {
    title: "使用前请注意",
    text: "测试秒传会转存并覆盖文件,若在生成期间修改过同名文件,为避免修改的文件丢失,请不要使用此功能!",
    input: "checkbox",
    inputPlaceholder: "不再显示",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: "确定",
    cancelButtonText: "返回",
  },

  settingView: {
    title: "秒传链接提取 设置页",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    allowOutsideClick: false,
    input: "select",
    inputValue: GM_getValue("swalThemes") || "Default",
    inputOptions: {
      Default: "Default 白色主题(默认)",
      Bulma: "Bulma 白色简约",
      "Bootstrap 4": "Bootstrap4 白色简约",
      "Material UI": "MaterialUI 白色主题",
      Dark: "Dark 黑色主题",
      "WordPress Admin": "WordPressAdmin 灰色主题",
    },
  },

  settingWarning: {
    title: "设置成功 刷新页面生效",
    showCloseButton: true,
    allowOutsideClick: false,
    confirmButtonText: "知道了",
  },

  selectNoFileWarning: {
    title: "请勾选要生成秒传的文件/文件夹",
    icon: "error",
    showCloseButton: true,
    confirmButtonText: "知道了",
  },
};
