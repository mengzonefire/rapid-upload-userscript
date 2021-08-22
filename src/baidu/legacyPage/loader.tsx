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
      console.error(`${TAG}: 执行 ${module} hook 时发生错误: ${e.message}`);
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

console.info("%s 钩子方式安装，若失效请前往脚本页反馈", TAG);
Object.defineProperty(window, "require", {
  set(require) {
    oRequire = require;
  },
  get() {
    return fakeRequire;
  },
});
