import { TAG } from "./const";

/**
 * @description: 弹出一个文本对话框
 * @param {*}
 * @return {*}
 */
export function showAlert(text: string): void {
  alert(`${TAG}:\n${text}`);
}

/**
 * @description: 弹出一个swal对话框
 * @param {*}
 * @return {*}
 */
export function showSwal(): void {}
