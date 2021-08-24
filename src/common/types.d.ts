export {};

declare global {
  interface Window {
    define: any;
    manifest: any;
    require: any;
  }
  interface IfakeRequire {
    (module: string): any;
    async: any;
  }
  interface String {
    fromBase64: any;
  }
}
