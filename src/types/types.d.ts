export {};
declare global {
  interface Window {
    require: any;
  }
  interface String {
    fromBase64: any;
  }
  var Swal: any;
  var Base64: any;
  var SparkMD5: any;
}
