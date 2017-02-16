!function (e, t) {
    function n(e) {
        for (var t, n = e.split(/\s+/), a = [], o = 0; t = n[o]; o++)t = t[0].toUpperCase(), a.push(t);
        return a
    }

    function a(t) {
        return t.id && e('label[for="' + t.id + '"]').val() || t.name
    }

    function o(n, i, s) {
        return s || (s = 0), i.each(function () {
            var i, c, r = e(this), l = this, u = this.nodeName.toLowerCase();
            switch ("label" == u && r.find("input, textarea, select").length && (i = r.text(), r = r.children().first(), l = r.get(0), u = l.nodeName.toLowerCase()), u) {
                case"menu":
                    c = {name: r.attr("label"), items: {}}, s = o(c.items, r.children(), s);
                    break;
                case"a":
                case"button":
                    c = {
                        name: r.text(), disabled: !!r.attr("disabled"), callback: function () {
                            return function () {
                                r.click()
                            }
                        }()
                    };
                    break;
                case"menuitem":
                case"command":
                    switch (r.attr("type")) {
                        case t:
                        case"command":
                        case"menuitem":
                            c = {
                                name: r.attr("label"), disabled: !!r.attr("disabled"), callback: function () {
                                    return function () {
                                        r.click()
                                    }
                                }()
                            };
                            break;
                        case"checkbox":
                            c = {
                                type: "checkbox",
                                disabled: !!r.attr("disabled"),
                                name: r.attr("label"),
                                selected: !!r.attr("checked")
                            };
                            break;
                        case"radio":
                            c = {
                                type: "radio",
                                disabled: !!r.attr("disabled"),
                                name: r.attr("label"),
                                radio: r.attr("radiogroup"),
                                value: r.attr("id"),
                                selected: !!r.attr("checked")
                            };
                            break;
                        default:
                            c = t
                    }
                    break;
                case"hr":
                    c = "-------";
                    break;
                case"input":
                    switch (r.attr("type")) {
                        case"text":
                            c = {type: "text", name: i || a(l), disabled: !!r.attr("disabled"), value: r.val()};
                            break;
                        case"checkbox":
                            c = {
                                type: "checkbox",
                                name: i || a(l),
                                disabled: !!r.attr("disabled"),
                                selected: !!r.attr("checked")
                            };
                            break;
                        case"radio":
                            c = {
                                type: "radio",
                                name: i || a(l),
                                disabled: !!r.attr("disabled"),
                                radio: !!r.attr("name"),
                                value: r.val(),
                                selected: !!r.attr("checked")
                            };
                            break;
                        default:
                            c = t
                    }
                    break;
                case"select":
                    c = {
                        type: "select",
                        name: i || a(l),
                        disabled: !!r.attr("disabled"),
                        selected: r.val(),
                        options: {}
                    }, r.children().each(function () {
                        c.options[this.value] = e(this).text()
                    });
                    break;
                case"textarea":
                    c = {type: "textarea", name: i || a(l), disabled: !!r.attr("disabled"), value: r.val()};
                    break;
                case"label":
                    break;
                default:
                    c = {type: "html", html: r.clone(!0)}
            }
            c && (s++, n["key" + s] = c)
        }), s
    }

    if (e.support.htmlMenuitem = "HTMLMenuItemElement" in window, e.support.htmlCommand = "HTMLCommandElement" in window, e.support.eventSelectstart = "onselectstart" in document.documentElement, !e.ui || !e.ui.widget) {
        var i = e.cleanData;
        e.cleanData = function (t) {
            for (var n, a = 0; null != (n = t[a]); a++)try {
                e(n).triggerHandler("remove")
            } catch (o) {
            }
            i(t)
        }
    }
    var s = null, c = !1, r = e(window), l = 0, u = {}, d = {}, m = {}, p = {
        selector: null,
        appendTo: null,
        trigger: "right",
        autoHide: !1,
        delay: 200,
        reposition: !0,
        determinePosition: function (t) {
            if (e.ui && e.ui.position)t.css("display", "block").position({
                my: "center top",
                at: "center bottom",
                of: this,
                offset: "0 5",
                collision: "fit"
            }).css("display", "none"); else {
                var n = this.offset();
                n.top += this.outerHeight(), n.left += this.outerWidth() / 2 - t.outerWidth() / 2, t.css(n)
            }
        },
        position: function (t, n, a) {
            var o;
            if (!n && !a)return void t.determinePosition.call(this, t.$menu);
            if ("maintain" === n && "maintain" === a)o = t.$menu.position(); else {
                var i = e(document), s = i.find("body"), c = e(document.body).add(s), a = a - i.scrollTop();
                o = {top: a, left: n}
            }
            var d = r.scrollTop() + r.height(), m = r.scrollLeft() + r.width(), p = t.$menu.height(), f = t.$menu.width();
            o.top + p > d && (o.top -= p), o.left + f > m && (o.left -= f), t.$menu.css(o)
        },
        positionSubmenu: function (t) {
            if (e.ui && e.ui.position)t.css("display", "block").position({
                my: "left top",
                at: "right top",
                of: this,
                collision: "flipfit fit"
            }).css("display", ""); else {
                var n = {top: 0, left: this.outerWidth()};
                t.css(n)
            }
        },
        zIndex: 1,
        animation: {duration: 50, show: "slideDown", hide: "slideUp"},
        events: {show: e.noop, hide: e.noop},
        callback: null,
        items: {}
    }, f = {timer: null, pageX: null, pageY: null}, h = function (e) {
        for (var t = 0, n = e; ;)if (t = Math.max(t, parseInt(n.css("z-index"), 10) || 0), n = n.parent(), !n || !n.length || "html body".indexOf(n.prop("nodeName").toLowerCase()) > -1)break;
        return t
    }, x = {
        abortevent: function (e) {
            e.preventDefault(), e.stopImmediatePropagation()
        }, contextmenu: function (t) {
            var n = e(this);
            if (t.preventDefault(), t.stopImmediatePropagation(), !("right" != t.data.trigger && t.originalEvent || n.hasClass("context-menu-active") || n.hasClass("context-menu-disabled"))) {
                if (s = n, t.data.build) {
                    var a = t.data.build(s, t);
                    if (a === !1)return;
                    if (t.data = e.extend(!0, {}, p, t.data, a || {}), !t.data.items || e.isEmptyObject(t.data.items))throw window.console && (console.error || console.log)("No items specified to show in contextMenu"), new Error("No Items specified");
                    t.data.$trigger = s, g.create(t.data)
                }
                g.show.call(n, t.data, t.pageX, t.pageY)
            }
        }, click: function (t) {
            t.preventDefault(), t.stopImmediatePropagation(), e(this).trigger(e.Event("contextmenu", {
                data: t.data,
                pageX: t.pageX,
                pageY: t.pageY
            }))
        }, mousedown: function (t) {
            var n = e(this);
            s && s.length && !s.is(n) && s.data("contextMenu").$menu.trigger("contextmenu:hide"), 2 == t.button && (s = n.data("contextMenuActive", !0))
        }, mouseup: function (t) {
            var n = e(this);
            n.data("contextMenuActive") && s && s.length && s.is(n) && !n.hasClass("context-menu-disabled") && (t.preventDefault(), t.stopImmediatePropagation(), s = n, n.trigger(e.Event("contextmenu", {
                data: t.data,
                pageX: t.pageX,
                pageY: t.pageY
            }))), n.removeData("contextMenuActive")
        }, mouseenter: function (t) {
            var n = e(this), a = e(t.relatedTarget), o = e(document);
            a.is(".context-menu-list") || a.closest(".context-menu-list").length || s && s.length || (f.pageX = t.pageX, f.pageY = t.pageY, f.data = t.data, o.on("mousemove.contextMenuShow", x.mousemove), f.timer = setTimeout(function () {
                f.timer = null, o.off("mousemove.contextMenuShow"), s = n, n.trigger(e.Event("contextmenu", {
                    data: f.data,
                    pageX: f.pageX,
                    pageY: f.pageY
                }))
            }, t.data.delay))
        }, mousemove: function (e) {
            f.pageX = e.pageX, f.pageY = e.pageY
        }, mouseleave: function (t) {
            var n = e(t.relatedTarget);
            if (!n.is(".context-menu-list") && !n.closest(".context-menu-list").length) {
                try {
                    clearTimeout(f.timer)
                } catch (t) {
                }
                f.timer = null
            }
        }, layerClick: function (t) {
            var n, a, o = e(this), i = o.data("contextMenuRoot"), s = t.button, c = t.pageX, l = t.pageY;
            t.preventDefault(), t.stopImmediatePropagation(), setTimeout(function () {
                var o, u = "left" == i.trigger && 0 === s || "right" == i.trigger && 2 === s;
                if (document.elementFromPoint && (i.$layer.hide(), n = document.elementFromPoint(c - r.scrollLeft(), l - r.scrollTop()), i.$layer.show()), i.reposition && u)if (document.elementFromPoint) {
                    if (i.$trigger.is(n) || i.$trigger.has(n).length)return void i.position.call(i.$trigger, i, c, l)
                } else if (a = i.$trigger.offset(), o = e(window), a.top += o.scrollTop(), a.top <= t.pageY && (a.left += o.scrollLeft(), a.left <= t.pageX && (a.bottom = a.top + i.$trigger.outerHeight(), a.bottom >= t.pageY && (a.right = a.left + i.$trigger.outerWidth(), a.right >= t.pageX))))return void i.position.call(i.$trigger, i, c, l);
                n && u && i.$trigger.one("contextmenu:hidden", function () {
                    e(n).contextMenu({x: c, y: l})
                }), i.$menu.trigger("contextmenu:hide")
            }, 50)
        }, keyStop: function (e, t) {
            t.isInput || e.preventDefault(), e.stopPropagation()
        }, key: function (e) {
            var t = s.data("contextMenu") || {};
            switch (e.keyCode) {
                case 9:
                case 38:
                    if (x.keyStop(e, t), t.isInput) {
                        if (9 == e.keyCode && e.shiftKey)return e.preventDefault(), t.$selected && t.$selected.find("input, textarea, select").blur(), void t.$menu.trigger("prevcommand");
                        if (38 == e.keyCode && "checkbox" == t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault()
                    } else if (9 != e.keyCode || e.shiftKey)return void t.$menu.trigger("prevcommand");
                case 40:
                    if (x.keyStop(e, t), !t.isInput)return void t.$menu.trigger("nextcommand");
                    if (9 == e.keyCode)return e.preventDefault(), t.$selected && t.$selected.find("input, textarea, select").blur(), void t.$menu.trigger("nextcommand");
                    if (40 == e.keyCode && "checkbox" == t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault();
                    break;
                case 37:
                    if (x.keyStop(e, t), t.isInput || !t.$selected || !t.$selected.length)break;
                    if (!t.$selected.parent().hasClass("context-menu-root")) {
                        var n = t.$selected.parent().parent();
                        return t.$selected.trigger("contextmenu:blur"), void(t.$selected = n)
                    }
                    break;
                case 39:
                    if (x.keyStop(e, t), t.isInput || !t.$selected || !t.$selected.length)break;
                    var a = t.$selected.data("contextMenu") || {};
                    if (a.$menu && t.$selected.hasClass("context-menu-submenu"))return t.$selected = null, a.$selected = null, void a.$menu.trigger("nextcommand");
                    break;
                case 35:
                case 36:
                    return t.$selected && t.$selected.find("input, textarea, select").length ? void 0 : ((t.$selected && t.$selected.parent() || t.$menu).children(":not(.disabled, .not-selectable)")[36 == e.keyCode ? "first" : "last"]().trigger("contextmenu:focus"), void e.preventDefault());
                case 13:
                    if (x.keyStop(e, t), t.isInput) {
                        if (t.$selected && !t.$selected.is("textarea, select"))return void e.preventDefault();
                        break
                    }
                    return void(t.$selected && t.$selected.trigger("mouseup"));
                case 32:
                case 33:
                case 34:
                    return void x.keyStop(e, t);
                case 27:
                    return x.keyStop(e, t), void t.$menu.trigger("contextmenu:hide");
                default:
                    var o = String.fromCharCode(e.keyCode).toUpperCase();
                    if (t.accesskeys[o])return void t.accesskeys[o].$node.trigger(t.accesskeys[o].$menu ? "contextmenu:focus" : "mouseup")
            }
            e.stopPropagation(), t.$selected && t.$selected.trigger(e)
        }, prevItem: function (t) {
            t.stopPropagation();
            var n = e(this).data("contextMenu") || {};
            if (n.$selected) {
                var a = n.$selected;
                n = n.$selected.parent().data("contextMenu") || {}, n.$selected = a
            }
            for (var o = n.$menu.children(), i = n.$selected && n.$selected.prev().length ? n.$selected.prev() : o.last(), s = i; i.hasClass("disabled") || i.hasClass("not-selectable");)if (i = i.prev().length ? i.prev() : o.last(), i.is(s))return;
            n.$selected && x.itemMouseleave.call(n.$selected.get(0), t), x.itemMouseenter.call(i.get(0), t);
            var c = i.find("input, textarea, select");
            c.length && c.focus()
        }, nextItem: function (t) {
            t.stopPropagation();
            var n = e(this).data("contextMenu") || {};
            if (n.$selected) {
                var a = n.$selected;
                n = n.$selected.parent().data("contextMenu") || {}, n.$selected = a
            }
            for (var o = n.$menu.children(), i = n.$selected && n.$selected.next().length ? n.$selected.next() : o.first(), s = i; i.hasClass("disabled") || i.hasClass("not-selectable");)if (i = i.next().length ? i.next() : o.first(), i.is(s))return;
            n.$selected && x.itemMouseleave.call(n.$selected.get(0), t), x.itemMouseenter.call(i.get(0), t);
            var c = i.find("input, textarea, select");
            c.length && c.focus()
        }, focusInput: function () {
            var t = e(this).closest(".context-menu-item"), n = t.data(), a = n.contextMenu, o = n.contextMenuRoot;
            o.$selected = a.$selected = t, o.isInput = a.isInput = !0
        }, blurInput: function () {
            var t = e(this).closest(".context-menu-item"), n = t.data(), a = n.contextMenu, o = n.contextMenuRoot;
            o.isInput = a.isInput = !1
        }, menuMouseenter: function () {
            var t = e(this).data().contextMenuRoot;
            t.hovering = !0
        }, menuMouseleave: function (t) {
            var n = e(this).data().contextMenuRoot;
            n.$layer && n.$layer.is(t.relatedTarget) && (n.hovering = !1)
        }, itemMouseenter: function (t) {
            var n = e(this), a = n.data(), o = a.contextMenu, i = a.contextMenuRoot;
            return i.hovering = !0, t && i.$layer && i.$layer.is(t.relatedTarget) && (t.preventDefault(), t.stopImmediatePropagation()), (o.$menu ? o : i).$menu.children(".hover").trigger("contextmenu:blur"), n.hasClass("disabled") || n.hasClass("not-selectable") ? void(o.$selected = null) : void n.trigger("contextmenu:focus")
        }, itemMouseleave: function (t) {
            var n = e(this), a = n.data(), o = a.contextMenu, i = a.contextMenuRoot;
            return i !== o && i.$layer && i.$layer.is(t.relatedTarget) ? (i.$selected && i.$selected.trigger("contextmenu:blur"), t.preventDefault(), t.stopImmediatePropagation(), void(i.$selected = o.$selected = o.$node)) : void n.trigger("contextmenu:blur")
        }, itemClick: function (t) {
            var n, a = e(this), o = a.data(), i = o.contextMenu, s = o.contextMenuRoot, c = o.contextMenuKey;
            if (i.items[c] && !a.is(".disabled, .context-menu-submenu, .context-menu-separator, .not-selectable")) {
                if (t.preventDefault(), t.stopImmediatePropagation(), e.isFunction(s.callbacks[c]) && Object.prototype.hasOwnProperty.call(s.callbacks, c))n = s.callbacks[c]; else {
                    if (!e.isFunction(s.callback))return;
                    n = s.callback
                }
                n.call(s.$trigger, c, s) !== !1 ? s.$menu.trigger("contextmenu:hide") : s.$menu.parent().length && g.update.call(s.$trigger, s)
            }
        }, inputClick: function (e) {
            e.stopImmediatePropagation()
        }, hideMenu: function (t, n) {
            var a = e(this).data("contextMenuRoot");
            g.hide.call(a.$trigger, a, n && n.force)
        }, focusItem: function (t) {
            t.stopPropagation();
            var n = e(this), a = n.data(), o = a.contextMenu, i = a.contextMenuRoot;
            n.addClass("hover").siblings(".hover").trigger("contextmenu:blur"), o.$selected = i.$selected = n, o.$node && i.positionSubmenu.call(o.$node, o.$menu)
        }, blurItem: function (t) {
            t.stopPropagation();
            {
                var n = e(this), a = n.data(), o = a.contextMenu;
                a.contextMenuRoot
            }
            n.removeClass("hover"), o.$selected = null
        }
    }, g = {
        show: function (t, n, a) {
            var o = e(this), i = {};
            return e("#context-menu-layer").trigger("mousedown"), t.$trigger = o, t.events.show.call(o, t) === !1 ? void(s = null) : (g.update.call(o, t), t.position.call(o, t, n, a), t.zIndex && (i.zIndex = h(o) + t.zIndex), g.layer.call(t.$menu, t, i.zIndex), t.$menu.find("ul").css("zIndex", i.zIndex + 1), t.$menu.css(i)[t.animation.show](t.animation.duration, function () {
                o.trigger("contextmenu:visible")
            }), o.data("contextMenu", t).addClass("context-menu-active"), e(document).off("keydown.contextMenu").on("keydown.contextMenu", x.key), void(t.autoHide && e(document).on("mousemove.contextMenuAutoHide", function (e) {
                var n = o.offset();
                n.right = n.left + o.outerWidth(), n.bottom = n.top + o.outerHeight(), !t.$layer || t.hovering || e.pageX >= n.left && e.pageX <= n.right && e.pageY >= n.top && e.pageY <= n.bottom || t.$menu.trigger("contextmenu:hide")
            })))
        }, hide: function (n, a) {
            var o = e(this);
            if (n || (n = o.data("contextMenu") || {}), a || !n.events || n.events.hide.call(o, n) !== !1) {
                if (o.removeData("contextMenu").removeClass("context-menu-active"), n.$layer) {
                    setTimeout(function (e) {
                        return function () {
                            e.remove()
                        }
                    }(n.$layer), 10);
                    try {
                        delete n.$layer
                    } catch (i) {
                        n.$layer = null
                    }
                }
                s = null, n.$menu.find(".hover").trigger("contextmenu:blur"), n.$selected = null, e(document).off(".contextMenuAutoHide").off("keydown.contextMenu"), n.$menu && n.$menu[n.animation.hide](n.animation.duration, function () {
                    n.build && (n.$menu.remove(), e.each(n, function (e) {
                        switch (e) {
                            case"ns":
                            case"selector":
                            case"build":
                            case"trigger":
                                return !0;
                            default:
                                n[e] = t;
                                try {
                                    delete n[e]
                                } catch (a) {
                                }
                                return !0
                        }
                    })), setTimeout(function () {
                        o.trigger("contextmenu:hidden")
                    }, 10)
                })
            }
        }, create: function (a, o) {
            o === t && (o = a), a.$menu = e('<ul class="context-menu-list"></ul>').addClass(a.className || "").data({
                contextMenu: a,
                contextMenuRoot: o
            }), e.each(["callbacks", "commands", "inputs"], function (e, t) {
                a[t] = {}, o[t] || (o[t] = {})
            }), o.accesskeys || (o.accesskeys = {}), e.each(a.items, function (t, i) {
                var s = e('<li class="context-menu-item"></li>').addClass(i.className || ""), c = null, r = null;
                if (s.on("click", e.noop), i.$node = s.data({
                        contextMenu: a,
                        contextMenuRoot: o,
                        contextMenuKey: t
                    }), i.accesskey)for (var l, u = n(i.accesskey), d = 0; l = u[d]; d++)if (!o.accesskeys[l]) {
                    o.accesskeys[l] = i, i._name = i.name.replace(new RegExp("(" + l + ")", "i"), '<span class="context-menu-accesskey">$1</span>');
                    break
                }
                if ("string" == typeof i)s.addClass("context-menu-separator not-selectable"); else if (i.type && m[i.type])m[i.type].call(s, i, a, o), e.each([a, o], function (n, a) {
                    a.commands[t] = i, e.isFunction(i.callback) && (a.callbacks[t] = i.callback)
                }); else {
                    switch ("html" == i.type ? s.addClass("context-menu-html not-selectable") : i.type ? (c = e("<label></label>").appendTo(s), e("<span></span>").html(i._name || i.name).appendTo(c), s.addClass("context-menu-input"), a.hasTypes = !0, e.each([a, o], function (e, n) {
                        n.commands[t] = i, n.inputs[t] = i
                    })) : i.items && (i.type = "sub"), i.type) {
                        case"text":
                            r = e('<input type="text" value="1" name="" value="">').attr("name", "context-menu-input-" + t).val(i.value || "").appendTo(c);
                            break;
                        case"textarea":
                            r = e('<textarea name=""></textarea>').attr("name", "context-menu-input-" + t).val(i.value || "").appendTo(c), i.height && r.height(i.height);
                            break;
                        case"checkbox":
                            r = e('<input type="checkbox" value="1" name="" value="">').attr("name", "context-menu-input-" + t).val(i.value || "").prop("checked", !!i.selected).prependTo(c);
                            break;
                        case"radio":
                            r = e('<input type="radio" value="1" name="" value="">').attr("name", "context-menu-input-" + i.radio).val(i.value || "").prop("checked", !!i.selected).prependTo(c);
                            break;
                        case"select":
                            r = e('<select name="">').attr("name", "context-menu-input-" + t).appendTo(c), i.options && (e.each(i.options, function (t, n) {
                                e("<option></option>").val(t).text(n).appendTo(r)
                            }), r.val(i.selected));
                            break;
                        case"sub":
                            e("<span></span>").html(i._name || i.name).appendTo(s), i.appendTo = i.$node, g.create(i, o), s.data("contextMenu", i).addClass("context-menu-submenu"), i.callback = null;
                            break;
                        case"html":
                            e(i.html).appendTo(s);
                            break;
                        default:
                            e.each([a, o], function (n, a) {
                                a.commands[t] = i, e.isFunction(i.callback) && (a.callbacks[t] = i.callback)
                            }), e("<span></span>").html(i._name || i.name || "").appendTo(s)
                    }
                    i.type && "sub" != i.type && "html" != i.type && (r.on("focus", x.focusInput).on("blur", x.blurInput), i.events && r.on(i.events, a)), i.icon && s.addClass("icon icon-" + i.icon)
                }
                i.$input = r, i.$label = c, s.appendTo(a.$menu), !a.hasTypes && e.support.eventSelectstart && s.on("selectstart.disableTextSelect", x.abortevent)
            }), a.$node || a.$menu.css("display", "none").addClass("context-menu-root"), a.$menu.appendTo(a.appendTo || document.body)
        }, resize: function (t, n) {
            t.css({
                position: "absolute",
                display: "block"
            }), t.data("width", Math.ceil(t.width()) + 1), t.css({
                position: "static",
                minWidth: "0px",
                maxWidth: "100000px"
            }), t.find("> li > ul").each(function () {
                g.resize(e(this), !0)
            }), n || t.find("ul").andSelf().css({
                position: "",
                display: "",
                minWidth: "",
                maxWidth: ""
            }).width(function () {
                return e(this).data("width")
            })
        }, update: function (n, a) {
            var o = this;
            a === t && (a = n, g.resize(n.$menu)), n.$menu.children().each(function () {
                var t = e(this), i = t.data("contextMenuKey"), s = n.items[i], c = e.isFunction(s.disabled) && s.disabled.call(o, i, a) || s.disabled === !0;
                if (t[c ? "addClass" : "removeClass"]("disabled"), s.type)switch (t.find("input, select, textarea").prop("disabled", c), s.type) {
                    case"text":
                    case"textarea":
                        s.$input.val(s.value || "");
                        break;
                    case"checkbox":
                    case"radio":
                        s.$input.val(s.value || "").prop("checked", !!s.selected);
                        break;
                    case"select":
                        s.$input.val(s.selected || "")
                }
                s.$menu && g.update.call(o, s, a)
            })
        }, layer: function (t, n) {
            var a = t.$layer = e('<div id="context-menu-layer" style="position:fixed; z-index:' + n + '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>').css({
                height: r.height(),
                width: r.width(),
                display: "block"
            }).data("contextMenuRoot", t).insertBefore(this).on("contextmenu", x.abortevent).on("mousedown", x.layerClick);
            return e.support.fixedPosition || a.css({position: "absolute", height: e(document).height()}), a
        }
    };
    e.fn.contextMenu = function (n) {
        if (n === t)this.first().trigger("contextmenu"); else if (n.x && n.y)this.first().trigger(e.Event("contextmenu", {
            pageX: n.x,
            pageY: n.y
        })); else if ("hide" === n) {
            var a = this.data("contextMenu").$menu;
            a && a.trigger("contextmenu:hide")
        } else"destroy" === n ? e.contextMenu("destroy", {context: this}) : e.isPlainObject(n) ? (n.context = this, e.contextMenu("create", n)) : n ? this.removeClass("context-menu-disabled") : n || this.addClass("context-menu-disabled");
        return this
    }, e.contextMenu = function (n, a) {
        "string" != typeof n && (a = n, n = "create"), "string" == typeof a ? a = {selector: a} : a === t && (a = {});
        var o = e.extend(!0, {}, p, a || {}), i = e(document), s = e(document).contents(), r = !1;
        switch (o.context && o.context.length ? (s = e(o.context).first(), o.context = s.get(0), r = o.context !== document) : o.context = document, n) {
            case"create":
                if (!o.selector)throw new Error("No selector specified");
                if (o.selector.match(/.context-menu-(list|item|input)($|\s)/))throw new Error('Cannot bind to selector "' + o.selector + '" as it contains a reserved className');
                if (!o.build && (!o.items || e.isEmptyObject(o.items)))throw new Error("No Items specified");
                switch (l++, o.ns = ".contextMenu" + l, r || (u[o.selector] = o.ns), d[o.ns] = o, o.trigger || (o.trigger = "right"), c || (i.on({
                    "contextmenu:hide.contextMenu": x.hideMenu,
                    "prevcommand.contextMenu": x.prevItem,
                    "nextcommand.contextMenu": x.nextItem,
                    "contextmenu.contextMenu": x.abortevent,
                    "mouseenter.contextMenu": x.menuMouseenter,
                    "mouseleave.contextMenu": x.menuMouseleave
                }, ".context-menu-list").on("mouseup.contextMenu", ".context-menu-input", x.inputClick).on({
                    "mouseup.contextMenu": x.itemClick,
                    "contextmenu:focus.contextMenu": x.focusItem,
                    "contextmenu:blur.contextMenu": x.blurItem,
                    "contextmenu.contextMenu": x.abortevent,
                    "mouseenter.contextMenu": x.itemMouseenter,
                    "mouseleave.contextMenu": x.itemMouseleave
                }, ".context-menu-item"), c = !0), s.on("contextmenu" + o.ns, o.selector, o, x.contextmenu), r && s.on("remove" + o.ns, function () {
                    e(this).contextMenu("destroy")
                }), o.trigger) {
                    case"hover":
                        s.on("mouseenter" + o.ns, o.selector, o, x.mouseenter).on("mouseleave" + o.ns, o.selector, o, x.mouseleave);
                        break;
                    case"left":
                        s.on("click" + o.ns, o.selector, o, x.click)
                }
                o.build || g.create(o);
                break;
            case"destroy":
                var m;
                if (r) {
                    var f = o.context;
                    e.each(d, function (t, n) {
                        if (n.context !== f)return !0;
                        m = e(".context-menu-list").filter(":visible"), m.length && m.data().contextMenuRoot.$trigger.is(e(n.context).find(n.selector)) && m.trigger("contextmenu:hide", {force: !0});
                        try {
                            d[n.ns].$menu && d[n.ns].$menu.remove(), delete d[n.ns]
                        } catch (a) {
                            d[n.ns] = null
                        }
                        return e(n.context).off(n.ns), !0
                    })
                } else if (o.selector) {
                    if (u[o.selector]) {
                        m = e(".context-menu-list").filter(":visible"), m.length && m.data().contextMenuRoot.$trigger.is(o.selector) && m.trigger("contextmenu:hide", {force: !0});
                        try {
                            d[u[o.selector]].$menu && d[u[o.selector]].$menu.remove(), delete d[u[o.selector]]
                        } catch (h) {
                            d[u[o.selector]] = null
                        }
                        i.off(u[o.selector])
                    }
                } else i.off(".contextMenu .contextMenuAutoHide"), e.each(d, function (t, n) {
                    e(n.context).off(n.ns)
                }), u = {}, d = {}, l = 0, c = !1, e("#context-menu-layer, .context-menu-list").remove();
                break;
            case"html5":
                (!e.support.htmlCommand && !e.support.htmlMenuitem || "boolean" == typeof a && a) && e('menu[type="context"]').each(function () {
                    this.id && e.contextMenu({
                        selector: "[contextmenu=" + this.id + "]",
                        items: e.contextMenu.fromMenu(this)
                    })
                }).css("display", "none");
                break;
            default:
                throw new Error('Unknown operation "' + n + '"')
        }
        return this
    }, e.contextMenu.setInputValues = function (n, a) {
        a === t && (a = {}), e.each(n.inputs, function (e, t) {
            switch (t.type) {
                case"text":
                case"textarea":
                    t.value = a[e] || "";
                    break;
                case"checkbox":
                    t.selected = a[e] ? !0 : !1;
                    break;
                case"radio":
                    t.selected = (a[t.radio] || "") == t.value ? !0 : !1;
                    break;
                case"select":
                    t.selected = a[e] || ""
            }
        })
    }, e.contextMenu.getInputValues = function (n, a) {
        return a === t && (a = {}), e.each(n.inputs, function (e, t) {
            switch (t.type) {
                case"text":
                case"textarea":
                case"select":
                    a[e] = t.$input.val();
                    break;
                case"checkbox":
                    a[e] = t.$input.prop("checked");
                    break;
                case"radio":
                    t.$input.prop("checked") && (a[t.radio] = t.value)
            }
        }), a
    }, e.contextMenu.fromMenu = function (t) {
        var n = e(t), a = {};
        return o(a, n.children()), a
    }, e.contextMenu.defaults = p, e.contextMenu.types = m, e.contextMenu.handle = x, e.contextMenu.op = g, e.contextMenu.menus = d
}(jQuery);