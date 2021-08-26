import DuParser from "./DuParser";

// 各弹窗的Swal固定参数配置:
export const swalConfig = {
  inputView: {
    title: "请输入秒传",
    input: "textarea",
    showCancelButton: true,
    inputPlaceholder:
      "[支持PD/标准码/游侠/GO][支持批量(换行分隔)]\n[输入set进入设置页][输入gen进入生成页]",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (value: string) => {
      if (!value) {
        return "链接不能为空";
      }
      if (value === "set") {
        return;
      }
      if (value === "gen") {
        return;
      }
      let codeInfo = DuParser.parse(value);
      if (!codeInfo.length) {
        return '<p>未识别到正确的链接 <a href="https://shimo.im/docs/hTCKJHPJRkp8PDR8/">查看支持格式</a></p>';
      }
    },
  },

  inputPathView: {
    title: "请输入保存路径",
    input: "text",
    inputPlaceholder: "格式示例：/GTA5/, 留空保存在根目录",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (value) => {
      if (value.match(/["\\\:*?<>|]/)) {
        return '路径中不能含有以下字符"\\:*?<>|, 格式示例：/GTA5/';
      }
    },
  },
};
