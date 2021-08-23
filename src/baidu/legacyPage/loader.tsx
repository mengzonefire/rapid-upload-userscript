import { TAG } from "@/common/const";

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
fakeRequire.async = null;

export function load(module: any) {
  return oRequire.call(unsafeWindow, module);
}

export function loadAsync(module: any) {
  return new Promise((resolve) => {
    fakeRequire.async(module, resolve);
  });
}

export function hook(module: string, fn: any) {
  hooks.set(module, fn);
}

export function install() {
  // 注意, 若userscript header内添加了GM_api, 则脚本运行在隔离环境, window对象由插件环境提供
  // 此时unsafeWindow才是真正的页面window对象
  if (unsafeWindow.require) {
    console.warn("%s 覆盖方式安装，若无效请强制刷新。", TAG);
    oRequire = unsafeWindow.require;
    unsafeWindow.require = fakeRequire;
    Object.assign(fakeRequire, oRequire);
  } else {
    console.info("%s 钩子方式安装，若失效请报告。", TAG);
    Object.defineProperty(unsafeWindow, "require", {
      set(require) {
        oRequire = require;
      },
      get() {
        return fakeRequire;
      },
    });
  }
}
