/*
 * @Author: mengzonefire
 * @Date: 2021-08-26 12:16:57
 * @LastEditTime: 2023-02-18 21:27:36
 * @LastEditors: mengzonefire
 * @Description: 存放各Swal弹窗的固定参数配置
 */

import updateInfo from "@/components/updateInfo.html";
import { doc, doc2, linkStyle, updateDate, version } from "@/common/const";

export const SwalConfig = {
  inputView: {
    title: "请输入秒传&保存路径",
    showCancelButton: true,
    html: `<textarea id="mzf-rapid-input" class="swal2-textarea" placeholder="· 支持批量转存多条秒传(换行分隔)\n· 支持PanDL/游侠/标准码/PCS-GO格式\n· 支持输入一键秒传(自动转换为普通秒传)\n· 可在设置页开启监听剪贴板,自动粘贴秒传\n· 输入set进入设置页,gen进入生成页,info进入版本信息页" style="display: flex;padding: 0.4em;"></textarea>
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
    title: "检测到上次未完成的秒传任务",
    text: "是否继续该任务?",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: "是",
    cancelButtonText: "否",
  },

  genUnfinish2: {
    title: "检测到上次未正常退出的秒传任务",
    text: "是否恢复该任务?",
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
    title: `秒传链接提取 v${version} (${updateDate})`,
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

  settingView: {
    title: "秒传链接提取 设置页",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    allowOutsideClick: false,
    html: `<label for="mzf-theme" class="swal2-input-label" style="margin-top: 0px" >主题设置</label > <select class="swal2-select" id="mzf-theme" style=" display: flex; border-width: 1px; border-style: solid; text-align-last: center; " > <option value="Default">Default 白色主题(默认)</option> <option value="Bulma">Bulma 白色简约</option> <option value="Bootstrap 4">Bootstrap4 白色简约</option> <option value="Material UI">MaterialUI 白色主题</option> <option value="Dark">Dark 黑色主题</option> <option value="WordPress Admin">WordPressAdmin 灰色主题</option> </select> <label for="mzf-pathType" class="swal2-input-label" >生成秒传导出路径设置</label > <select class="swal2-select" id="mzf-pathType" style=" display: flex; border-width: 1px; border-style: solid; text-align-last: center; " > <option value="relative">导出相对路径</option> <option value="absolute">导出绝对路径</option> </select> <label for="mzf-fast-generate" class="swal2-checkbox" style="display: flex" ><span class="swal2-label" >极速生成 说明文档: <a href="${doc.fastGenDoc}" ${linkStyle}>载点1</a> <a href="${doc2.fastGenDoc}" ${linkStyle}>载点2</a></span ><input class="mzf_check_ori" type="checkbox" value="1" id="mzf-fast-generate" /><span class="mzf_check"></span ></label> <label for="mzf-listen-clipboard" class="swal2-checkbox" style="display: flex" ><span class="swal2-label">监听剪贴板 (需要允许剪贴板权限)</span ><input class="mzf_check_ori" type="checkbox" value="1" id="mzf-listen-clipboard" /><span class="mzf_check"></span ></label>`,
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
