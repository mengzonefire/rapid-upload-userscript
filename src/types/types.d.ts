export {};
declare global {
  interface FileInfo {
    path: string; // 文件路径
    isdir?: number; // 是否为目录
    errno?: number; // =0成功, !=0为失败
    size?: number; // 文件大小, 若为目录则=0
    md5?: string; // md5
    md5s?: string; // 前256KiB md5
    fs_id?: string; // 云端文件id
    retry_996?: boolean; // 用于判断是否使用备用生成接口
  }
  interface String {
    fromBase64: any;
    toBase64: any;
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
    yunData: any;
  }
  // var __non_webpack_require__: any;
}
