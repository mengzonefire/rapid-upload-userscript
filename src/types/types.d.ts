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
  var Swal: any;
  var Base64: any;
  var SparkMD5: any;
}
