import { TAG } from "../../common/const";

let oRequire: any;

const hooks = new Map();

function fakeRequire(module: string) {
  const result = oRequire.apply(this, arguments);
  const moduleHook = hooks.get(module);
  if (moduleHook) {
    try {
      moduleHook();
    } catch (e) {
      console.error("%s: 执行 %s hook 时发生错误: %s", TAG, e.message);
      console.trace(e);
    }
    hooks.delete(module);
  }
  return result;
}

export function load(module: any) {
  return oRequire.call(window, module);
}

export function hook(module: any, fn: any) {
  hooks.set(module, fn);
}

if (window.require) {
  console.warn("%s 覆盖方式安装，若无效请强制刷新。", TAG);
  oRequire = window.require;
  window.require = fakeRequire;
  Object.assign(fakeRequire, oRequire);
} else {
  console.info("%s 钩子方式安装，若失效请报告。", TAG);
  Object.defineProperty(window, "require", {
    set(require) {
      oRequire = require;
    },
    get() {
      return fakeRequire;
    },
  });
}

export default null;
