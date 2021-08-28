import { illegalPathPattern } from "@/baidu/common/const";
import { doc, htmlCsdWarning, linkStyle } from "./const";
import DuParser from "./DuParser";

// 各弹窗的Swal固定参数配置:
export const swalConfig = {
  inputView: {
    title: "请输入秒传",
    input: "textarea",
    showCancelButton: true,
    inputPlaceholder:
      "[支持PanDL/标准码/GO格式][支持批量(换行分隔)]\n[输入set进入设置页][输入gen进入生成页]",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (value: string) => {
      if (!value) {
        return "链接不能为空";
      }
      if (value == "set") {
        return;
      }
      if (value == "gen") {
        return;
      }
      if (!DuParser.parse(value).length) {
        return `<p>未识别到正确的链接 <a href="${doc.shareDoc}" ${linkStyle}>查看支持格式</a></p>`;
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
    inputValidator: (value: string) => {
      if (value.match(illegalPathPattern)) {
        return '不能含有字符\\":*?<>|, 格式示例：/GTA5/';
      }
    },
  },

  processView: {
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
  },

  csdWarning: {
    title: "请允许跨域访问",
    showCloseButton: true,
    allowOutsideClick: false,
    input: "checkbox",
    inputPlaceholder: "不再显示",
    html: htmlCsdWarning,
  },

  finishView: {
    showCloseButton: true,
    allowOutsideClick: false,
  },

  genUnfinishi: {
    title: "检测到未完成的秒传任务",
    text: "是否继续进行？",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  },

  genView: {
    title: "请输入需要生成的文件路径",
    input: "textarea",
    showCancelButton: true,
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
    confirmButtonText: "确定",
  },
};
