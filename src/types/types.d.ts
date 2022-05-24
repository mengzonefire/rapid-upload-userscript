export {};
declare global {
  interface String {
    fromBase64: any;
  }
  interface Element {
    __vue__: any;
  }
  interface HTMLElement {
    value: string;
    checked: boolean;
  }
  interface Window {
    require: any;
    locals: any;
  }
  // var __non_webpack_require__: any;
}
