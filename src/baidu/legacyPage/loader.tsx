import { TAG } from "src/common/const";

let oRequire: any;

const hooks = new Map();

interface IfakeRequire {
  (module: string): any;
  async: any;
}

const fakeRequire: IfakeRequire = function (module: string) {
  const result = oRequire.apply(this, arguments);
  const moduleHook = hooks.get(module);
  if (moduleHook) {
    try {
      moduleHook();
    } catch (e) {
      console.error(`${TAG}: 执行 ${module} hook 时发生错误: ${e.message}`);
      console.trace(e);
    }
    hooks.delete(module);
  }
  return result;
};
fakeRequire.async = null;

export function load(module: any) {
  return oRequire.call(window, module);
}

export function loadAsync(module: any) {
  return new Promise((resolve) => {
    fakeRequire.async(module, resolve);
  });
}

export function hook(module: string, fn: { (): void; (): void; (): void }) {
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
