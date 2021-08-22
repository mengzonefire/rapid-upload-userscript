define("disk-system:widget/system/uiService/fileTreeDialog/fileTreeDialog.js", function (e, i, t) {
    function o() {
        this.config = {}, this.dialog = null, this.zipPath = "/", this.showShareDir = !1;
        var e = this;
        a.on("selectfolder", function (i) {
            e.setButtonDisable(i === h)
        })
    }
    var s = e("base:widget/libs/jquerypacket.js"),
        n = e("base:widget/libs/underscore.js"),
        a = e("disk-system:widget/system/uiService/fileTree/fileTree.js"),
        l = e("system-core:system/uiService/dialog/dialog.js"),
        r = e("system-core:context/context.js").instanceForSystem,
        c = e("disk-system:widget/system/fileService/mkdirInTree/createFolder.js"),
        h = "shareHolder";
    o.singleton = null, o.obtain = function () {
        return null === o.singleton && (o.singleton = new o), o.singleton
    }, o.DIALOG_ID = "fileTreeDialog", o.prototype.getFileTree = function (e, i) {
        var t = this,
            o = {
                host: this.dialog.$dialog.find(".file-tree-container")[0],
                path: e || "/",
                showShareDir: t.showShareDir,
                isZip: !!i
            };
        i && e && "/" !== e && s.extend(!0, o, {
            selectedCallback: t.selectedCallback
        }), a.build(o)
    }, o.prototype.setOptions = function (e) {
        if (!e) throw new Error("[fileTreeDialog] must set options for FileTreeDialog");
        if (!e.title) throw new Error('[fileTreeDialog] title "' + e.title + '" should be set');
        if (this.config.title = e.title, !n.isFunction(e.confirm)) throw new Error("[fileTreeDialog] confirm should be set");
        this.confirm = e.confirm, e.zipPath && (this.zipPath = e.zipPath), n.isFunction(e.afterHide) && (this.afterHide = e.afterHide), this.showShareDir = e.showShareDir, this.cancel = e.cancel
    }, o.prototype.buildDialog = function () {
        var e = this;
        this.dialog = new l({
            id: o.DIALOG_ID,
            title: this.config.title,
            body: '<div class="file-tree-container"></div>',
            draggable: !0,
            position: {
                xy: "center"
            },
            buttons: [{
                name: "cancel",
                title: "取消",
                type: "big",
                padding: ["50px", "50px"],
                position: "right",
                click: function () {
                    e.dialog.hide(), "function" == typeof e.cancel && e.cancel()
                }
            }, {
                name: "confirm",
                title: "确定",
                type: "big",
                color: "blue",
                padding: ["50px", "50px"],
                position: "right",
                click: function () {
                    var i = s(".save-zip-path"),
                        t = a.getSelectPath() || {};
                    return i.hasClass("check") && (t = e.getSavePath()), t === h ? void r.ui.tip({
                        mode: "caution",
                        msg: "不能复制文件至“共享给我的文件夹”"
                    }) : void e.confirm(t)
                }
            }, {
                title: "新建文件夹",
                icon: "icon-newfolder",
                type: "big",
                position: "left",
                click: function () {
                    var i = e.dialog.$dialog,
                        t = e.dialog.$dialog.find(".treeview-node-on");
                    c.reBuild({
                        icon: t.attr("data-icon"),
                        insertDom: t.next(".treeview-content"),
                        container: i.find(".file-tree-container")
                    })
                }
            }],
            afterHide: function () {
                "function" == typeof e.afterHide && e.afterHide()
            }
        }), this.bindSavePathEvent()
    }, o.prototype.setButtonDisable = function (e) {
        this.dialog.setButtonDisable(e, 2)
    }, o.prototype.changeTitle = function () {
        this.config.title && this.dialog.title(this.config.title)
    }, o.prototype.show = function (e) {
        var i = n.now();
        return this.setOptions(e), this.dialog || this.buildDialog(), this.changeTitle(), this.dialog.show(), e.zipPath ? this.showZipPath(e.zipPath) : s(".save-zip-path").remove(), this.getFileTree(e.path), r.log.send({
            name: "dialogShow-file",
            value: n.now() - i
        }), this
    }, o.prototype.hide = function () {
        return this.dialog.hide(), this
    }, o.prototype.showZipPath = function (e) {
        var i = s(".save-zip-path");
        i.length ? (i.html('<span class="save-chk-io"></span>解压到压缩包所在目录：' + e), i.attr("title", e), i.removeClass("check")) : this.dialog.$dialog.find(".dialog-body").after('<div class="save-zip-path" title="' + e + '"><span class="save-chk-io"></span>解压到压缩包所在目录：' + e + "</div>")
    }, o.prototype.getSavePath = function () {
        var e = null;
        return s(".save-zip-path").hasClass("check") && (e = this.zipPath), e
    }, o.prototype.bindSavePathEvent = function () {
        var e = this,
            i = e.dialog.$dialog;
        i.on("click", ".save-zip-path", function () {
            var i = s(this),
                t = i.attr("class");
            t.indexOf("check") >= 0 ? (i.removeClass("check"), e.getFileTree("/", !0)) : (i.addClass("check"), e.getFileTree(e.zipPath, !0))
        })
    }, o.prototype.selectedCallback = function () {
        s(".save-zip-path").removeClass("check")
    }, t.exports = o.obtain()
});