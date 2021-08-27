import { TAG } from "./const";

/**
 * @description: 弹出一个文本对话框
 * @param {string} text
 */
export function showAlert(text: string): void {
  alert(`${TAG}:\n${text}`);
}

/**
 * @description: md5随机大小写
 * @param {string} string
 * @return {string}
 */
export function randomStringTransform(string: string): string {
  const tempString = [];
  for (let i of string) {
    if (!Math.round(Math.random())) {
      tempString.push(i.toLowerCase());
    } else {
      tempString.push(i.toUpperCase());
    }
  }
  return tempString.join("");
}
