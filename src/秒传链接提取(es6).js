// ==UserScript==
// @name            秒传链接提取
// @namespace       moe.cangku.mengzonefire
// @version         1.8.5
// @description     用于提取和生成百度网盘秒传链接
// @author          mengzonefire
// @license         MIT
// @compatible      firefox Tampermonkey
// @compatible      firefox Violentmonkey
// @compatible      chrome Violentmonkey
// @compatible      chrome Tampermonkey
// @contributionURL https://afdian.net/@mengzonefire
// @match           *://pan.baidu.com/disk/main*
// @match           *://pan.baidu.com/disk/home*
// @match           *://yun.baidu.com/disk/home*
// @resource jquery         https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// @resource sweetalert2Css https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css
// @require         https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @require         https://cdn.jsdelivr.net/npm/js-base64
// @require         https://cdn.staticfile.org/spark-md5/3.0.0/spark-md5.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_setClipboard
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getResourceText
// @grant           GM_addStyle
// @run-at          document-start
// @connect         *
// ==/UserScript==
! function () {
    'use strict';
    const rapid_url = '/api/rapidupload';
    const bdstoken_url = '/api/gettemplatevariable';
    const precreate_url = '/rest/2.0/xpan/file?method=precreate';
    const create_url = '/rest/2.0/xpan/file?method=create';
    const api_url = '/rest/2.0/xpan/multimedia?method=listall&order=name&limit=10000';
    const meta_url2 = '/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=';
    const meta_url = 'http://d.pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=meta&path=';
    const pcs_url = 'https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=download';
    const css_url = {
        'Minimal': 'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
        'Dark': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css',
        'WordPress Admin': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css',
        'Material UI': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css',
        'Bulma': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css',
        'Bootstrap 4': 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css'
    };
    const css_checkbox = ``;
    var check_mode = false,
        new_flag = false,
        file_info_list = [],
        gen_success_list = [],
        dir, file_num, gen_num, gen_prog, codeInfo, recursive, bdcode, xmlhttpRequest, select_list, bdstoken, interval;
    const myStyle = `style='width: 100%;height: 34px;display: block;line-height: 34px;text-align: center;'`;
    const myStyle2 = `style='color: #09AAFF;'`;
    const myBtnStyle = `style='font-size: 15px;color: #09AAFF;border: 2px solid #C3EAFF;border-radius: 4px;padding: 10px;margin: 0 5px;padding-top: 5px;padding-bottom: 5px; cursor: pointer'`;
    const html_btn = `<a class="g-button g-button-blue" id="bdlink_btn" title="秒传链接" style="display: inline-block;"">
    <span class="g-button-right"><em class="icon icon-disk" title="秒传链接提取"></em><span class="text" style="width: auto;">秒传链接</span></span></a>`;
    const html_btn_gen = `<a class="g-button" id="gen-bdlink-button"><span class="g-button-right"><em class="icon icon-share"></em><span class="text" style="width: auto;">生成秒传</span></span></a>`;
    const html_check_md5 = `<p ${myStyle}>测试秒传, 可防止秒传失效<a id="check_md5_btn" ${myBtnStyle}><span class="text" style="width: auto;">测试</span></a></p>`;
    const html_document = `<p ${myStyle}>秒传无效/md5获取失败/防和谐 可参考<a ${myBtnStyle} href="https://shimo.im/docs/TZ1JJuEjOM0wnFDH" rel="noopener noreferrer" target="_blank"><span class="text" style="width: auto;">分享教程</span></a></p>`;
    const html_donate = `<p id="bdcode_donate" ${myStyle}>若喜欢该脚本, 可前往 <a ${myStyle2} href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者<a id="kill_donate" ${myBtnStyle}><span style="width: auto;">不再显示</span></a></p>`;
    const html_feedback = `<p id="bdcode_feedback" ${myStyle}>若有任何疑问, 可前往 <a ${myStyle2} href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank">脚本页</a> 反馈<a id="kill_feedback" ${myBtnStyle}><span class="text" style="width: auto;">不再显示</span></a></p>`;
    const csd_hint_html = '<p>弹出跨域访问窗口时,请选择"<span style="color: red;">总是允许</span>"或"<span style="color: red;">总是允许全部</span>"</p><img style="max-width: 100%; height: auto" src="https://pic.rmb.bdstatic.com/bjh/763ff5014cca49237cb3ede92b5b7ac5.png">';
    const html_btn_new = '<a id="bdlink_btn" style="margin-left: 8px;" class="nd-upload-button upload-wrapper"><span class="nd-common-btn nd-file-list-toolbar-action-item u-btn u-btn--primary u-btn--medium u-btn--default is-has-icon"><i class="iconfont inline-block-v-middle icon-copy"></i><span class="inline-block-v-middle nd-file-list-toolbar-action-item-text">秒传</span></span> </a>';
    const html_btn_gen_new = '<button id="gen-bdlink-button" class="u-btn nd-common-btn nd-file-list-toolbar-action-item is-need-left-sep u-btn--normal u-btn--medium u-btn--default is-has-icon"> <span><i class="iconfont inline-block-v-middle nd-file-list-toolbar__action-item-icon icon-share"></i><span class="inline-block-v-middle nd-file-list-toolbar-action-item-text">生成秒传</span></span> </button>';
    var checkbox_par = {
        input: 'checkbox',
        inputValue: GM_getValue('with_path'),
        inputPlaceholder: '导出文件夹目录结构',
    };
    const show_prog = function (r) {
        gen_prog.textContent = `${parseInt((r.loaded / r.total) * 100)}%`;
    };

    // 判断 Base64库加载是否成功
    if (!window.Base64) {
        alert('秒传链接提取:\n外部资源加载失败, 脚本无法运行, 请检查网络或尝试更换DNS');
        return;
    }
    if (Base64.extendString) {
        Base64.extendString();
    } else {
        alert('秒传链接提取:\n外部资源加载错误, 脚本无法运行, 请尝试刷新页面');
    }

    function randomStringTransform(string) {
        if (typeof string !== 'string') return false
        const tempString = []
        for (let i of string) {
            if (!Math.round(Math.random())) {
                tempString.push(i.toLowerCase())
            } else {
                tempString.push(i.toUpperCase())
            }
        }
        return tempString.join('')
    }

    function add_file_list(file_list) {
        var dir_list = [];
        file_list.forEach(function (item) {
            if (item.isdir) {
                dir_list.push(item.path);
            } else {
                file_info_list.push({
                    'path': item.path,
                    'size': item.size,
                });
            }
        });
        if (dir_list.length) {
            Swal.fire({
                type: 'info',
                title: '选择中包含文件夹, 是否递归生成?',
                text: '若选是, 将同时生成各级子文件夹下的文件',
                allowOutsideClick: false,
                focusCancel: true,
                showCancelButton: true,
                reverseButtons: true,
                showCloseButton: true,
                confirmButtonText: '是',
                cancelButtonText: '否',

            }).then((result) => {
                if (result.value) {
                    recursive = true;
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    recursive = false;
                } else {
                    return;
                }
                add_dir_list(dir_list);
            });
        } else {
            Gen_bdlink();
        }
    }

    function add_dir_list(dir_list, dir_id = 0) {
        if (dir_id >= dir_list.length) {
            Gen_bdlink();
            return;
        }
        var path = dir_list[dir_id];
        var list_dir_par = {
            url: api_url + `&path=${encodeURIComponent(path)}&recursion=${recursive ? 1 : 0}`,
            type: 'GET',
            responseType: 'json',
            onload: function (r) {
                if (parseInt(r.status / 100) === 2) {
                    if (!r.response.errno) {
                        r.response.list.forEach(function (item) {
                            item.isdir || file_info_list.push({
                                'path': item.path,
                                'size': item.size,
                            });
                        });
                    } else {
                        file_info_list.push({
                            'path': path,
                            'errno': 810
                        });
                    }
                } else {
                    file_info_list.push({
                        'path': path,
                        'errno': r.status
                    });
                }
                add_dir_list(dir_list, dir_id + 1);
            },
            onerror: function (r) {
                file_info_list.push({
                    'path': path,
                    'errno': 514
                });
                add_dir_list(dir_list, dir_id + 1);
            }
        };
        GM_xmlhttpRequest(list_dir_par);
    }


    function gen_bd_link_event() {
        if (!GM_getValue('show_csd_warning')) {
            Swal.fire({
                title: '请允许跨域访问',
                showCloseButton: true,
                allowOutsideClick: false,
                input: 'checkbox',
                inputPlaceholder: '不再显示',
                html: csd_hint_html
            }).then((result) => {
                GM_setValue('show_csd_warning', result.value)
                if (!result.dismiss) {
                    select_list = getSelectedFileList();
                    add_file_list(select_list);
                }
            });
            return;
        }
        if (GM_getValue('unfinish')) {
            Swal.fire({
                title: '检测到未完成的秒传任务',
                text: '是否继续进行？',
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then((result) => {
                if (result.value) {
                    var unfinish_info = GM_getValue('unfinish');
                    file_info_list = unfinish_info.file_info_list;
                    Gen_bdlink(unfinish_info.file_id);
                } else {
                    GM_deleteValue('unfinish');
                    select_list = getSelectedFileList();
                    add_file_list(select_list);
                }
            });
        } else {
            select_list = getSelectedFileList();
            add_file_list(select_list);
        }
    }


    function initButtonEvent() {
        $(document).on('click', '#gen-bdlink-button', gen_bd_link_event);
    }

    function getSelectedFileList() {
        return unsafeWindow.require('system-core:context/context.js').instanceForSystem.list.getSelected();
    };

    function initButtonHome() {
        let tag1, tag2, my_html_btn;
        if (new_flag) {
            tag1 = 'div.nd-file-list-toolbar__actions';
            tag2 = 'a.nd-upload-button';
            my_html_btn = html_btn_new;
        } else {
            tag1 = 'div.tcuLAu';
            tag2 = '#h5Input0';
            my_html_btn = html_btn;
        }
        let loop_count = 0;
        let loop = setInterval(() => {
            let html_tag = $(tag1);
            if (!html_tag.length) return false;
            loop_count++;
            if (loop_count > 40) {
                html_tag.append(my_html_btn);
            } else if (!$(tag2).length) return false;
            else html_tag.append(my_html_btn);
            let loop2 = setInterval(() => {
                let btn_tag = $('#bdlink_btn');
                if (!btn_tag.length) return false;
                btn_tag.click(function () {
                    GetInfo();
                });
                clearInterval(loop2);
            }, 50);
            clearInterval(loop);
        }, 50);
    }

    function initButtonGen_new() {

    }

    function initButtonGen() {
        if (new_flag) {

        } else {
            var listTools = getSystemContext().Broker.getButtonBroker('listTools');
            if (listTools && listTools.$box) {
                $(listTools.$box).children('div').after(html_btn_gen);
                initButtonEvent();
            } else {
                setTimeout(initButtonGen, 500);
            }
        }
    };

    function getSystemContext() {
        return unsafeWindow.require('system-core:context/context.js').instanceForSystem;
    };

    function Gen_bdlink(file_id = 0) {
        interval = file_info_list.length > 1 ? 3000 : 1000;
        Swal.fire({
            title: '秒传生成中',
            showCloseButton: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            html: '<p>正在生成第 <gen_num></gen_num> 个</p><p><gen_prog></gen_prog></p>',
            willOpen: () => {
                Swal.showLoading()
                var content = Swal.getHtmlContainer();
                if (content) {
                    gen_num = content.querySelector('gen_num');
                    gen_prog = content.querySelector('gen_prog');
                    myGenerater(file_id);
                }
            }
        }).then((result) => {
            if (result.dismiss && xmlhttpRequest) {
                xmlhttpRequest.abort();
                GM_deleteValue('unfinish');
                file_info_list = [];
            }
        });
    }

    function test_bdlink() {
        if (!GM_getValue('show_test_warning')) {
            Swal.fire({
                title: '注意',
                text: '测试秒传会转存并覆盖文件,若在生成期间修改过同名文件,为避免修改的文件丢失,请不要使用此功能!',
                input: 'checkbox',
                inputPlaceholder: '不再显示',
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: '确定',
                cancelButtonText: '返回'
            }).then((result) => {
                GM_setValue('show_test_warning', result.value)
                if (!result.dismiss) {
                    codeInfo = gen_success_list;
                    check_mode = true;
                    Process();
                } else {
                    gen_success_list = [];
                    myGenerater(file_info_list.length);
                }
            });
        } else {
            codeInfo = gen_success_list;
            check_mode = true;
            Process();
        }
    }

    function myGenerater(file_id) {
        GM_setValue('unfinish', {
            'file_info_list': file_info_list,
            'file_id': file_id
        });
        if (file_id >= file_info_list.length) {
            bdcode = '';
            let failed_info = '';
            let gen_failed_count = 0;
            file_info_list.forEach(function (item) {
                if (item.hasOwnProperty('errno')) {
                    gen_failed_count++;
                    failed_info += `<p>文件：${item.path}</p><p>失败原因：${checkErrno(item.errno)}(#${item.errno})</p>`
                } else {
                    gen_success_list.push(item);
                    bdcode += `${item.md5}#${item.md5s}#${item.size}#${item.path}\n`;
                }
            });
            bdcode = bdcode.trim();
            if (failed_info) {
                failed_info = '<p>失败文件列表:</p>' + failed_info;
            }
            Swal.fire({
                title: `生成完毕 共${file_info_list.length}个, 失败${gen_failed_count}个!`,
                confirmButtonText: '复制秒传代码',
                cancelButtonText: '取消',
                showCloseButton: true,
                showCancelButton: !bdcode,
                showConfirmButton: bdcode,
                allowOutsideClick: false,
                html: bdcode ? (html_check_md5 + html_document + (failed_info && ('<p><br></p>' + failed_info))) : html_document + '<p><br></p>' + failed_info,
                ...(bdcode && checkbox_par),
                willOpen: () => {
                    let loop = setInterval(() => {
                        var html_tag = $('#check_md5_btn');
                        if (!html_tag.length) return false;
                        $('#check_md5_btn').click(function () {
                            test_bdlink();
                        });
                        clearInterval(loop);
                    }, 50);
                    Add_content();
                }
            }).then((result) => {
                if (!result.dismiss) {
                    if (!result.value) {
                        bdcode = bdcode.replace(/(\/.+\/)|(\/)/g, '');
                    }
                    checkbox_par.inputValue = result.value;
                    GM_setValue('with_path', result.value);
                    GM_setClipboard(bdcode);
                }
                file_info_list = [];
                gen_success_list = [];
                GM_deleteValue('unfinish');
            });
            return;
        }

        let file_info = file_info_list[file_id];
        if (file_info.hasOwnProperty('errno')) {
            myGenerater(file_id + 1);
            return;
        }
        gen_num.textContent = (file_id + 1).toString() + ' / ' + file_info_list.length.toString();
        gen_prog.textContent = '0%';

        let get_dl_par = {
            url: meta_url + encodeURIComponent(file_info.path),
            type: 'GET',
            onerror: function (r) {
                file_info.errno = 514;
                myGenerater(file_id + 1);
            },
            onload: function (r) {
                if (parseInt(r.status / 100) !== 2) {
                    if (r.status === 404) {
                        file_info.errno = 909;
                    } else {
                        file_info.errno = r.status;
                    }
                    myGenerater(file_id + 1);
                    return;
                }
                let r_json = JSON.parse(r.response);
                console.log(r_json.list[0]);
                if (!file_info.size) {
                    file_info.size = r_json.list[0].size;
                }
                file_info.fs_id = r_json.list[0].fs_id;
                let md5 = r_json.list[0].md5.match(/[\dA-Fa-f]{32}/);
                if (md5) {
                    file_info.md5 = md5[0].toLowerCase();
                } else if (r_json.list[0].block_list.length === 1) {
                    file_info.md5 = r_json.list[0].block_list[0].toLowerCase();
                }
                get_file_md5(file_id)
            }
        };
        GM_xmlhttpRequest(get_dl_par);
    }

    function get_file_md5(file_id) {
        let file_info = file_info_list[file_id];
        let get_dl_par = {
            url: meta_url2 + JSON.stringify([file_info.fs_id]),
            dataType: 'json',
            type: 'GET',
            onerror: function (r) {
                file_info.errno = 514;
                myGenerater(file_id + 1);
            },
            onload: function (r) {
                let r_json = JSON.parse(r.response);
                if (r_json.errno) {
                    file_info.errno = r_json.errno;
                    myGenerater(file_id + 1);
                    return;
                }
                download_file_data(file_id, r_json.list[0].dlink);
            }
        };
        GM_xmlhttpRequest(get_dl_par);
    }

    function download_file_data(file_id, dlink) {
        let file_info = file_info_list[file_id];
        let dl_size = file_info.size < 262144 ? file_info.size - 1 : 262143;
        let get_dl_par = {
            url: dlink,
            type: 'GET',
            headers: {
                'Range': `bytes=0-${dl_size}`,
                "User-Agent": 'netdisk;2.2.51.6;netdisk;10.0.63;PC;android-android;QTP/1.0.32.2'
            },
            responseType: 'arraybuffer',
            onprogress: show_prog,
            onerror: function (r) {
                file_info.errno = 514;
                myGenerater(file_id + 1);
            },
            onload: function (r) {
                parse_download_data(r, file_id);
            }
        };
        xmlhttpRequest = GM_xmlhttpRequest(get_dl_par);
    }

    function parse_download_data(r, file_id) {
        console.log(`dl_url: ${r.finalUrl}`);
        let file_info = file_info_list[file_id];
        gen_prog.textContent = '100%';
        if (parseInt(r.status / 100) === 2) {
            let responseHeaders = r.responseHeaders;
            if (!file_info.md5) {
                console.log(responseHeaders);
                let file_md5 = responseHeaders.match(/content-md5: ([\da-f]{32})/i);
                if (file_md5) {
                    file_info.md5 = file_md5[1].toLowerCase();
                } else if (file_info.size <= 3900000000 && !file_info.retry_996) {
                    file_info.retry_996 = true;
                    download_file_data(file_id, pcs_url + `&path=${encodeURIComponent(file_info.path)}`);
                    return;
                } else {
                    file_info.errno = 996;
                    myGenerater(file_id + 1);
                    return;
                }
            }
            if (r.finalUrl.indexOf('issuecdn.baidupcs.com') !== -1) {
                file_info.errno = 1919;
            } else {
                let spark = new SparkMD5.ArrayBuffer();
                spark.append(r.response);
                let slice_md5 = spark.end();
                file_info.md5s = slice_md5;
            }
            setTimeout(function () {
                myGenerater(file_id + 1);
            }, interval);
        } else {
            file_info.errno = r.status;
            myGenerater(file_id + 1);
        }
    }

    /**
     * 一个简单的类似于 NodeJS Buffer 的实现.
     * 用于解析游侠度娘提取码。
     * @param {SimpleBuffer}
     */
    function SimpleBuffer(str) {
        this.fromString(str);
    }

    SimpleBuffer.toStdHex = function toStdHex(n) {
        return ('0' + n.toString(16)).slice(-2);
    };
    SimpleBuffer.prototype.fromString = function fromString(str) {
        var len = str.length;
        this.buf = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            this.buf[i] = str.charCodeAt(i);
        }
    };
    SimpleBuffer.prototype.readUnicode = function readUnicode(index, size) {
        if (size & 1) {
            size++;
        }
        var bufText = Array.prototype.slice.call(this.buf, index, index + size).map(SimpleBuffer.toStdHex);
        var buf = [''];
        for (var i = 0; i < size; i += 2) {
            buf.push(bufText[i + 1] + bufText[i]);
        }
        return JSON.parse('"' + buf.join('\\u') + '"');
    };
    SimpleBuffer.prototype.readNumber = function readNumber(index, size) {
        var ret = 0;
        for (var i = index + size; i > index;) {
            ret = this.buf[--i] + (ret * 256);
        }
        return ret;
    };
    SimpleBuffer.prototype.readUInt = function readUInt(index) {
        return this.readNumber(index, 4);
    };
    SimpleBuffer.prototype.readULong = function readULong(index) {
        return this.readNumber(index, 8);
    };
    SimpleBuffer.prototype.readHex = function readHex(index, size) {
        return Array.prototype.slice.call(this.buf, index, index + size).map(SimpleBuffer.toStdHex).join('');
    };

    function DuParser() {}

    DuParser.parse = function generalDuCodeParse(szUrl) {
        let r;
        if (szUrl.indexOf('bdpan') === 0) {
            r = DuParser.parseDu_v1(szUrl);
            r.ver = 'PanDL';
        } else if (szUrl.indexOf('BDLINK') === 0) {
            r = DuParser.parseDu_v2(szUrl);
            r.ver = '游侠 v1';
        } else if (szUrl.indexOf('BaiduPCS-Go') === 0) {
            r = DuParser.parseDu_v3(szUrl);
            r.ver = 'PCS-Go';
        } else {
            r = DuParser.parseDu_v4(szUrl);
            r.ver = '梦姬标准';
        }
        return r;
    };

    DuParser.parseDu_v1 = function parseDu_v1(szUrl) {
        return szUrl.replace(/\s*bdpan:\/\//g, ' ').trim().split(' ').map(function (z) {
            return z.trim().fromBase64().match(/([\s\S]+)\|([\d]{1,20})\|([\dA-Fa-f]{32})\|([\dA-Fa-f]{32})/);
        }).filter(function (z) {
            return z;
        }).map(function (info) {
            return {
                md5: info[3],
                md5s: info[4],
                size: info[2],
                path: info[1]
            };
        });
    };

    DuParser.parseDu_v2 = function parseDu_v2(szUrl) {
        var raw = atob(szUrl.slice(6).replace(/\s/g, ''));
        if (raw.slice(0, 5) !== 'BDFS\x00') {
            return null;
        }
        var buf = new SimpleBuffer(raw);
        var ptr = 9;
        var arrFiles = [];
        var fileInfo, nameSize;
        var total = buf.readUInt(5);
        var i;
        for (i = 0; i < total; i++) {
            // 大小 (8 bytes)
            // MD5 + MD5S (0x20)
            // nameSize (4 bytes)
            // Name (unicode)
            fileInfo = {};
            fileInfo.size = buf.readULong(ptr + 0);
            fileInfo.md5 = buf.readHex(ptr + 8, 0x10);
            fileInfo.md5s = buf.readHex(ptr + 0x18, 0x10);
            nameSize = buf.readUInt(ptr + 0x28) << 1;
            fileInfo.nameSize = nameSize;
            ptr += 0x2C;
            fileInfo.path = buf.readUnicode(ptr, nameSize);
            arrFiles.push(fileInfo);
            ptr += nameSize;
        }
        return arrFiles;
    };

    DuParser.parseDu_v3 = function parseDu_v3(szUrl) {
        return szUrl.split('\n').map(function (z) {
            // unsigned long long: 0~18446744073709551615
            return z.trim().match(/-length=([\d]{1,20}) -md5=([\dA-Fa-f]{32}) -slicemd5=([\dA-Fa-f]{32})[\s\S]+"([\s\S]+)"/)
        }).filter(function (z) {
            return z;
        }).map(function (info) {
            return {
                md5: info[2],
                md5s: info[3],
                size: info[1],
                path: info[4]
            };
        });
    };

    DuParser.parseDu_v4 = function parseDu_v4(szUrl) {
        return szUrl.split('\n').map(function (z) {
            // unsigned long long: 0~18446744073709551615
            return z.trim().match(/([\dA-Fa-f]{32})#(?:([\dA-Fa-f]{32})#)?([\d]{1,20})#([\s\S]+)/);
        }).filter(function (z) {
            return z;
        }).map(function (info) {
            if (!info[2]) {
                return {
                    md5: info[1],
                    size: info[3],
                    path: info[4]
                };
            }
            return {
                md5: info[1],
                md5s: info[2],
                size: info[3],
                path: info[4]
            };
        });
    };

    function saveFile(i, try_flag) {
        if (i >= codeInfo.length) {
            let failed_info = ' ';
            let failed_count = 0;
            codeInfo.forEach(function (item) {
                if (item.errno) {
                    failed_count++;
                    failed_info += `<p>文件：${item.path}</p><p>失败原因：${checkErrno(item.errno)}(#${item.errno})</p>`
                }
            });
            Swal.fire({
                title: `${check_mode ? '测试' : '转存'}完毕 共${codeInfo.length}个 失败${failed_count}个!`,
                confirmButtonText: check_mode ? '复制秒传代码' : '确定',
                showCloseButton: true,
                html: failed_info,
                ...(check_mode && checkbox_par),
                willOpen: () => {
                    Add_content();
                    var _dir = (dir || '').replace(/\/$/, '');
                    if (_dir) {
                        if (_dir.charAt(0) !== '/') {
                            _dir = '/' + _dir;
                        }
                        const cBtn = Swal.getConfirmButton();
                        const btn = cBtn.cloneNode();
                        btn.textContent = '打开目录';
                        btn.style.backgroundColor = '#ecae3c';
                        btn.onclick = () => {
                            location.href = `${location.origin}/disk/home?#/all?vmode=list&path=${encodeURIComponent(_dir)}`;
                            Swal.close();
                        }
                        cBtn.before(btn);
                    }
                }
            }).then((result) => {
                if (check_mode) {
                    if (!result.dismiss) {
                        if (!result.value) {
                            bdcode = bdcode.replace(/\/.+\//g, '');
                        }
                        checkbox_par.inputValue = result.value;
                        GM_setValue('with_path', result.value);
                        GM_setClipboard(bdcode);
                    }
                    file_info_list = [];
                    gen_success_list = [];
                    GM_deleteValue('unfinish');
                    check_mode = false;
                }
                if (new_flag) {
                    location.reload();
                } else {
                    require('system-core:system/baseService/message/message.js').trigger('system-refresh');
                }
            });
            return;
        }
        let file = codeInfo[i];
        file_num.textContent = (i + 1).toString() + ' / ' + codeInfo.length.toString();
        if (!file.md5s) {
            file.md5 = file.md5.toLowerCase();
            saveFile_v2(i);
            return;
        }
        switch (try_flag) {
            case 0:
                file.md5 = file.md5.toUpperCase();
                break;
            case 1:
                file.md5 = file.md5.toLowerCase();
                break;
            case 2:
                file.md5 = randomStringTransform(file.md5);
                break;
            case 3:
                file.md5 = file.md5.toLowerCase();
                saveFile_v2(i);
                return;
            default:
                saveFile(i + 1, 0);
                return;
        }
        $.ajax({
            url: `${rapid_url}?bdstoken=${bdstoken}${check_mode ? '&rtype=3' : ''}`,
            type: 'POST',
            data: {
                path: dir + file.path,
                'content-md5': file.md5,
                'slice-md5': file.md5s.toLowerCase(),
                'content-length': file.size
            }
        }).success(function (r) {
            if (file.path.match(/["\\\:*?<>|]/)) {
                codeInfo[i].errno = 2333;
            } else {
                codeInfo[i].errno = r.errno;
            }
        }).fail(function (r) {
            codeInfo[i].errno = 114;
        }).always(function () {
            if (codeInfo[i].errno === 404) {
                saveFile(i, try_flag + 1);
            } else if (codeInfo[i].errno === 2 && codeInfo[i].size > 21474836480) {
                saveFile(i, 3);
            } else {
                saveFile(i + 1, 0);
            };
        });
    }

    function checkErrno(errno) {
        switch (errno) {
            case -7:
                return '保存路径存在非法字符';
            case -6:
            case -8:
                return '路径下存在同名文件';
            case 400:
                return '请求错误(请尝试使用最新版Chrome浏览器)';
            case 403:
                return '接口被限制(请等待24h再试)';
            case 404:
                return '文件不存在(秒传未生效)';
            case 2:
                return '转存失败(尝试重新登录网盘账号)';
            case 2333:
                return '链接内的文件路径错误(不能含有以下字符"\\:*?<>|)';
            case -10:
                return '网盘容量已满';
            case 114:
                return '接口调用失败(请重试)';
            case 514:
                return '接口调用失败(请重试/弹出跨域访问窗口时,请选择"总是允许"或"总是允许全部域名")';
            case 1919:
                return '文件已被和谐';
            case 810:
                return '文件列表获取失败(请重试)';
            case 996:
                return 'md5获取失败(请参考分享教程)';
            case 500:
                return '服务器错误(请等待24h再试)';
            case 909:
                return '路径不存在';
            default:
                return '未知错误';
        }
    }

    function GetInfo(str = '') {
        Swal.fire({
            title: '请输入秒传',
            input: 'textarea',
            inputValue: str,
            showCancelButton: true,
            inputPlaceholder: '[支持PD/标准码/游侠/GO][支持批量(换行分隔)]\n[输入set进入设置页][输入gen进入生成页]',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator: (value) => {
                if (!value) {
                    return '链接不能为空';
                }
                if (value === 'set') {
                    return;
                }
                if (value === 'gen') {
                    return;
                }
                codeInfo = DuParser.parse(value);
                if (!codeInfo.length) {
                    return '未识别到正确的链接';
                }
            }
        }).then((result) => {
            if (!result.dismiss) {
                if (result.value === 'set') {
                    setting();
                } else if (result.value === 'gen') {
                    Gen_bdlink_byPath();
                } else {
                    Process();
                }
            }
        });
    }

    function Process() {
        if (check_mode) {
            dir = '';
            save_alert();
        } else {
            dir = GM_getValue('last_dir');
            if (!dir) {
                dir = '';
            }
            Swal.fire({
                title: '请输入保存路径',
                input: 'text',
                inputPlaceholder: '格式示例：/GTA5/, 留空保存在根目录',
                inputValue: dir,
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator: (value) => {
                    if (value.match(/["\\\:*?<>|]/)) {
                        return '路径中不能含有以下字符"\\:*?<>|, 格式示例：/GTA5/';
                    }
                }
            }).then((result) => {
                if (!result.dismiss) {
                    dir = result.value;
                    GM_setValue('last_dir', dir);
                    if (dir.charAt(dir.length - 1) !== '/') {
                        dir = dir + '/';
                    }
                    save_alert();
                }
            });
        }
    }

    function save_alert() {
        Swal.fire({
            title: `文件${check_mode ? '测试' : '提取'}中`,
            html: `正在${check_mode ? '测试' : '转存'}第 <file_num></file_num> 个`,
            showCloseButton: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading()
                var content = Swal.getHtmlContainer();
                if (content) {
                    file_num = content.querySelector('file_num');
                    saveFile(0, 0);
                }
            }
        });
    }

    function GetInfo_url() {
        let bdlink = location.href.match(/[\?#]bdlink=([\da-zA-Z/\+]+)&?/);
        if (bdlink) {
            bdlink = bdlink[1].fromBase64();
        }
        return bdlink;
    }

    function Add_content() {
        let content = document.createElement('div')
        let hasAdd = false;
        if (!GM_getValue('kill_feedback_1.8.4')) {
            hasAdd = true;
            content.innerHTML += `<p><br></p>`;
            content.innerHTML += html_feedback;
            let loop = setInterval(() => {
                let html_tag = $('#kill_feedback');
                if (!html_tag.length) return false;
                $('#kill_feedback').click(function () {
                    GM_setValue('kill_feedback_1.8.4', true);
                    $('#bdcode_feedback').remove();
                });
                clearInterval(loop);
            }, 50);
        }
        if (!GM_getValue('kill_donate_1.8.4')) {
            if (!hasAdd) {
                content.innerHTML += `<p><br></p>`;
            }
            content.innerHTML += html_donate;
            let loop = setInterval(() => {
                var html_tag = $('#kill_donate');
                if (!html_tag.length) return false;
                $('#kill_donate').click(function () {
                    GM_setValue('kill_donate_1.8.4', true);
                    $('#bdcode_donate').remove();
                });
                clearInterval(loop);
            }, 50);
        }
        Swal.getHtmlContainer().appendChild(content);
    }

    function saveFile_v2_create(i) {
        let file_info = codeInfo[i];
        $.ajax({
            url: create_url,
            type: 'POST',
            dataType: 'json',
            data: {
                block_list: JSON.stringify([file_info.md5]),
                uploadid: file_info.uploadid,
                path: dir + file_info.path,
                size: file_info.size,
                mode: 1,
                isdir: 0,
                rtype: check_mode ? 3 : 0,
                a: 'commit',
                sequence: 1,
                autoinit: 1
            }
        }).success(function (r) {
            file_info.errno = r.errno;
        }).fail(function (r) {
            file_info.errno = 114;
        }).always(function () {
            if (file_info.errno === 2) {
                file_info.errno = 404;
            }
            saveFile(i + 1, 0);
        });
    }

    function saveFile_v2(i) {
        let file_info = codeInfo[i];
        $.ajax({
            url: precreate_url,
            type: 'POST',
            dataType: 'json',
            data: {
                block_list: JSON.stringify([file_info.md5]),
                path: dir + file_info.path,
                size: file_info.size,
                mode: 1,
                isdir: 0,
                autoinit: 1
            }
        }).success(function (r) {
            if (!r.errno) {
                // 若返回的block_list非空则表示不识别该md5(#404)
                if (r.block_list.length) {
                    file_info.errno = 404;
                } else if (r.uploadid) {
                    file_info.uploadid = r.uploadid;
                    saveFile_v2_create(i);
                    return;
                }
            } else {
                file_info.errno = r.errno;
            }
            saveFile(i + 1, 0);
        }).fail(function (r) {
            file_info.errno = 114;
            saveFile(i + 1, 0);
        });
    }

    function get_bdstoken() {
        $.ajax({
            url: bdstoken_url,
            type: 'POST',
            dataType: 'json',
            data: {
                fields: JSON.stringify(["bdstoken"])
            }
        }).success(function (r) {
            if (!r.errno) {
                bdstoken = r.result.bdstoken;
                initButtonHome();
                initButtonGen();
            } else {
                alert('获取bdstoken失败, 请尝试重新登录');
            }
        }).fail(function (r) {
            alert('获取bdstoken失败, 请尝试刷新页面');
        });
    }

    const injectStyle = () => {
        GM_addStyle(css_checkbox);
        let style = GM_getResourceText('sweetalert2Css');
        // 暴力猴直接粘贴脚本代码时可能不会将resource中的数据下载缓存，fallback到下载css代码
        let themes = GM_getValue('Themes') || 'Minimal';
        let css_code = GM_getValue(`1.7.4${themes}`);
        if (css_code) {
            GM_addStyle(css_code);
            return;
        }
        if (style && themes === 'Minimal') {
            GM_setValue(`1.7.4${themes}`, style);
            GM_addStyle(style);
            return;
        }
        GM_xmlhttpRequest({
            url: css_url[themes],
            type: 'GET',
            responseType: 'text',
            onload: function (r) {
                style = r.response;
                if (style.length < 100) {
                    alert('秒传链接提取:\n外部资源加载错误, 脚本无法运行, 请尝试刷新页面');
                    return;
                }
                GM_setValue(`1.7.4${themes}`, style);
                GM_addStyle(style);
            },
            onerror: function (r) {
                alert('秒传链接提取:\n外部资源加载失败, 脚本无法运行, 请检查网络或尝试更换DNS');
            }
        });
    };

    const showUpdateInfo = () => {
        if (!GM_getValue('1.8.4_no_first')) {
            Swal.fire({
                title: `秒传链接提取 更新内容`,
                html: update_info,
                heightAuto: false,
                scrollbarPadding: false,
                showCloseButton: true,
                allowOutsideClick: false,
                confirmButtonText: '确定'
            }).then(() => {
                GM_setValue('1.8.4_no_first', true);
            });
        }
    };

    function myInit() {
        injectStyle();
        const bdlink = GetInfo_url();
        window.addEventListener('DOMContentLoaded', () => {
            bdlink ? GetInfo(bdlink) : showUpdateInfo();
            // 判断是否是新版页面
            if (document.getElementsByClassName('nd-main-layout').length) {
                // 新版页面不自带jquery, 需要手动注入
                let jq_script = document.createElement("script");
                jq_script.type = "text/javascript";
                jq_script.text = GM_getResourceText('jquery');
                document.getElementsByTagName('head')[0].appendChild(jq_script);
                new_flag = true;
            }
            get_bdstoken();
        });
    }

    function setting() {
        Swal.fire({
            title: '秒传链接提取 设置页',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            allowOutsideClick: false,
            input: 'select',
            inputValue: GM_getValue('Themes') || 'Minimal',
            inputOptions: {
                'Minimal': 'Minimal 白色主题(默认)',
                'Bulma': 'Bulma 白色简约',
                'Bootstrap 4': 'Bootstrap4 白色简约',
                'Material UI': 'MaterialUI 白色主题',
                'Dark': 'Dark 黑色主题',
                'WordPress Admin': 'WordPressAdmin 灰色主题'
            }
        }).then((result) => {
            if (!result.dismiss) {
                GM_setValue('Themes', result.value);
                Swal.fire({
                    title: '设置成功 刷新页面生效',
                    showCloseButton: true,
                    allowOutsideClick: false,
                    html: csd_hint_html
                });
            }
        });
    }

    function Gen_bdlink_byPath() {
        Swal.fire({
            title: '请输入需要生成的文件路径',
            input: 'textarea',
            showCancelButton: true,
            inputPlaceholder: '[支持批量(换行分隔)]',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator: (value) => {
                if (!value) {
                    return '文件路径不能为空';
                }
            }
        }).then((result) => {
            if (!result.dismiss) {
                result.value.split('\n').map(function (z) {
                    file_info_list.push({
                        'path': z
                    })
                })
                Gen_bdlink();
            }
        });
    }

    const update_info =
        `<div class="panel-body" style="height: 250px; overflow-y:scroll">
        <div style="border: 1px  #000000; width: 100%; margin: 0 auto;"><span>

        <p>若喜欢该脚本可前往 <a href="https://afdian.net/@mengzonefire" rel="noopener noreferrer" target="_blank">赞助页</a> 支持作者</p>

        <p>若出现任何问题请前往<a href="https://greasyfork.org/zh-CN/scripts/424574" rel="noopener noreferrer" target="_blank"> greasyfork页 </a>反馈</p>

        <p><br></p>
        
        <p>1.8.4 更新内容(21.7.18):</p>

        <p>修复了部分生成提示 "<span style="color: red;">md5获取失败</span>" 的问题</p>

        <p><br></p>

        <p>1.8.1 更新内容(21.7.6):</p>

        <p>支持转存与生成 <span style="color: red;">20G以上</span> 文件的秒传</p>
        
        <p><br></p>
        
        <p>1.7.9 更新内容(21.6.28):</p>

        <p>1.大幅提升非会员账号生成秒传的速度</p>

        <p>2.修复生成4G以上文件提示"<span style="color: red;">服务器错误(#500)</span>"的问题</p>

        <p><br></p>

        <p>1.7.8 更新内容(21.6.25):</p>

        <p>修复了绝大部分转存提示 "<span style="color: red;">文件不存在(秒传未生效)(#404)</span>" 的问题</p>

        <p><br></p>

        <p>1.7.3 更新内容(21.6.23):</p>

        <p>升级样式&主题, 提升观感, 修复了设置内的主题适配</p>

        <p><br></p>

        <p>1.6.8 更新内容(21.6.18)</p>

        <p>移除 <span style="color: red;">修复下载</span> 功能(已在21年4月上旬失效), 后续不会再考虑修复该功能</p>

        <p><br></p>

        <p>1.6.7 更新内容(21.3.30)</p>

        <p>修复部分秒传转存时提示 "文件不存在(秒传无效)"</p>

        <p><br></p>

        <p>1.6.1 更新内容(21.3.29)</p>

        <p>新增 <span style="color: red;">直接修复下载</span> 的功能, 选中网盘内文件, 再点击上方 <span style="color: red;">修复下载</span> 按钮即可生成可正常下载的新文件</p>

        <img src="https://pic.rmb.bdstatic.com/bjh/5e05f7c1f772451b8efce938280bcaee.png"/>

        <p><br></p>

        <p>1.5.7 更新内容(21.3.9)</p>

        <p>修复部分文件转存后 <span style="color: red;">无法下载</span> 的问题, 可尝试 <span style="color: red;">重新转存</span> 之前无法下载文件. 且转存新增了 <span style="color: red;">修复下载</span> 功能</p>

        <p><br></p>

        <p>1.5.4 更新内容(21.2.11)</p>

        <p>面向分享者的 <a href="https://shimo.im/docs/TZ1JJuEjOM0wnFDH" rel="noopener noreferrer" target="_blank">分享教程</a> 的防和谐方法更新:</p>

        <p>经测试, 原教程的 "固实压缩+加密文件名" 已无法再防和谐(在度盘移动端依旧可以在线解压), 目前有效的防和谐方法请参考教程内的 <span style="color: red;">"双层压缩"</span></p>

        <p><br></p>

        <p>1.4.3 更新内容(21.2.6):</p>

        <p>修复了生成秒传时, 秒传有效, 仍提示"md5获取失败(#996)"的问题</p>

        <p><br></p>

        <p>1.4.9 更新内容(21.1.28):</p>

        <p>1. 重新兼容了暴力猴插件, 感谢Trendymen提供的代码</p>

        <p>2. 新增更换主题的功能, 在秒传输入框中输入setting进入设置页, 更换为其他主题, 即可避免弹窗时的背景变暗</p>

        <p>3. 修改了部分代码逻辑, 秒传按钮不会再出现在最左边了</p>

        <p><br></p>

        <p>1.4.6 更新内容(21.1.14):</p>

        <p>本次更新针对生成功能做了优化:</p>

        <p>1. 使用超会账号进行10个以上的批量秒传生成时, 会弹窗提示设置生成间隔, 防止生成过快导致接口被限制(#403)</p>

        <p>2. 为秒传分享者提供了一份<a href="https://shimo.im/docs/TZ1JJuEjOM0wnFDH" rel="noopener noreferrer" target="_blank">分享教程</a>用于参考</p>

        <p><br></p>

        <p>1.4.5 更新内容(21.1.12):</p>

        <p>修复了1.4.0后可能出现的秒传按钮无效、显示多个秒传按钮的问题</p>

        <p><br></p>

        <p>1.3.7 更新内容(21.1.3):</p>

        <p>修复了会员账号生成50M以下文件时提示 "md5获取失败" 的问题</p>

        <p><br></p>

        <p>1.3.3 更新内容(20.12.1):</p>

        <p>秒传生成完成后点击复制按钮之前都可以继续任务,防止误操作关闭页面导致生成结果丢失</p>

        <p>修改代码执行顺序防止秒传按钮出现在最左端</p>

        <p>修复了跨域提示中失效的说明图片</p>

        <p><br></p>

        <p>1.2.9 更新内容(20.11.11):</p>

        <p>生成秒传的弹窗添加了关闭按钮</p>

        <p>删除了全部生成失败时的复制和测试按钮</p>

        <p>秒传生成后加了一个导出文件路径的选项(默认不导出)</p>

        <p>在输入保存路径的弹窗添加了校验, 防止输入错误路径</p>

        <p><br></p>

        <p>1.2.5 更新内容(20.11.4):</p>

        <p>优化按钮样式, 添加了md5获取失败的报错</p>

        <p>修复从pan.baidu.com进入后不显示生成按钮的问题</p>

        <p><br></p>

        <p>1.2.4 更新内容(20.11.2):</p>

        <p>新增生成秒传:</p>

        <p>选择文件或文件夹后点击 "生成秒传" 即可开始生成</p>

        <p><br></p>

        <p>继续未完成任务:</p>

        <p>若生成秒传期间关闭了网页, 再次点击 "生成秒传" 即可继续任务</p>

        <p><br></p>

        <p>测试秒传功能:</p>

        <p>生成完成后, 点击"测试"按钮, 会自动转存并覆盖文件(文件内容不变), 以检测秒传有效性, 以及修复md5错误防止秒传失效</p>

        </span></div></div>`;

    myInit();
}();