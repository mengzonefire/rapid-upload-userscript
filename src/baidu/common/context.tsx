export var gen_prog: any, gen_num: any;

// 生成秒传进度刷新
export const show_prog = function (r: any) {
  let rate: number = (r.loaded / r.total) * 100;
  gen_prog.textContent = `${rate.toFixed()}%`;
};

// 生成秒传完成后, "导出文件夹目录结构" 的checkbox
export var checkbox_par = {
  input: "checkbox",
  inputValue: GM_getValue("with_path_baidu"),
  inputPlaceholder: "导出文件夹目录结构",
};