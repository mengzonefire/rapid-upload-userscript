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

/**
 * @description: 弹出转存秒传的对话框
 * @param {*}
 * @return {*}
 */
export function showSwalRapidupload(): void {}

/**
 * @description: 弹出生成秒传的对话框
 * @param {*}
 * @return {*}
 */
export function showSwalGenerateBdlink(): void {}