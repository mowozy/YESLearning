// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function noop() {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}
function uncamel(t) {
    return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase()
    })
}
function setUnit(t, e) {
    return "string" != typeof t || t.match(/^[\-0-9\.]+jQuery/) ? "" + t + e : t
}
function setFilter(t, e, i) {
    var n = uncamel(e), o = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    t[o + "filter"] = t[o + "filter"] || "", i = setUnit(i > jQuery.CSS.filters[e].max ? jQuery.CSS.filters[e].max : i, jQuery.CSS.filters[e].unit), t[o + "filter"] += n + "(" + i + ") ", delete t[e]
}
!function (t, e, i, n) {
    function o(e, i) {
        this.settings = null, this.options = t.extend({}, o.Defaults, i), this.$element = t(e), this.drag = t.extend({}, d), this.state = t.extend({}, p), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(o.Plugins, t.proxy(function (t, e) {
            this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(o.Pipe, t.proxy(function (e, i) {
            this._pipe.push({filter: i.filter, run: t.proxy(i.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    function r(t) {
        if (t.touches !== n)return {x: t.touches[0].pageX, y: t.touches[0].pageY};
        if (t.touches === n) {
            if (t.pageX !== n)return {x: t.pageX, y: t.pageY};
            if (t.pageX === n)return {x: t.clientX, y: t.clientY}
        }
    }

    function s(t) {
        var e, n, o = i.createElement("div"), r = t;
        for (e in r)if (n = r[e], void 0 !== o.style[n])return o = null, [n, e];
        return [!1]
    }

    function a() {
        return s(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function l() {
        return s(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function u() {
        return s(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function c() {
        return "ontouchstart" in e || !!navigator.msMaxTouchPoints
    }

    function h() {
        return e.navigator.msPointerEnabled
    }

    var d, p, f;
    d = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, p = {isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1}, f = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, o.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, o.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, o.Plugins = {}, o.Pipe = [{
        filter: ["width", "items", "settings"], run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var t = this._clones;
            (this.$stage.children(".cloned").length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var t, e, i = this._clones, n = this._items,
                o = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0, e = Math.abs(o / 2); e > t; t++)o > 0 ? (this.$stage.children().eq(n.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(n[i[i.length - 1]].clone().addClass("cloned")), i.push(n.length - 1 - (i.length - 1) / 2), this.$stage.prepend(n[i[i.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var t, e, i, n = this.settings.rtl ? 1 : -1, o = (this.width() / this.settings.items).toFixed(3), r = 0;
            for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++)t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, r += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : o * t) * n, this._coordinates.push(r)
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var e, i, n = (this.width() / this.settings.items).toFixed(3), o = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            if (this.$stage.css(o), o = {width: this.settings.autoWidth ? "auto" : n - this.settings.margin}, o[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function (t) {
                    return t > 1
                }).length > 0)for (e = 0, i = this._coordinates.length; i > e; e++)o.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(o); else this.$stage.children().css(o)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            var t, e, i, n, o = this.settings.rtl ? 1 : -1, r = 2 * this.settings.stagePadding,
                s = this.coordinates(this.current()) + r, a = s + this.width() * o, l = [];
            for (i = 0, n = this._coordinates.length; n > i; i++)t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + r * o, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && l.push(i);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], o.prototype.initialize = function () {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && !0 !== this.state.imagesLoaded) {
            var e, i, o;
            if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, o = this.$element.children(i).width(), e.length && 0 >= o)return this.preloadAutoWidthImages(e), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, o.prototype.setup = function () {
        var e = this.viewport(), i = this.options.responsive, n = -1, o = null;
        i ? (t.each(i, function (t) {
            e >= t && t > n && (n = Number(t))
        }), o = t.extend({}, this.options, i[n]), delete o.responsive, o.responsiveClass && this.$element.attr("class", function (t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + n)) : o = t.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
            property: {
                name: "settings",
                value: o
            }
        }), this._breakpoint = n, this.settings = o, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, o.prototype.optionsLogic = function () {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, o.prototype.prepare = function (e) {
        var i = this.trigger("prepare", {content: e});
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {content: i.data}), i.data
    }, o.prototype.update = function () {
        for (var e = 0, i = this._pipe.length, n = t.proxy(function (t) {
            return this[t]
        }, this._invalidated), o = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(o), e++;
        this._invalidated = {}
    }, o.prototype.width = function (t) {
        switch (t = t || o.Width.Default) {
            case o.Width.Inner:
            case o.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, o.prototype.refresh = function () {
        if (0 === this._items.length)return !1;
        (new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, o.prototype.eventsCall = function () {
        this.e._onDragStart = t.proxy(function (t) {
            this.onDragStart(t)
        }, this), this.e._onDragMove = t.proxy(function (t) {
            this.onDragMove(t)
        }, this), this.e._onDragEnd = t.proxy(function (t) {
            this.onDragEnd(t)
        }, this), this.e._onResize = t.proxy(function (t) {
            this.onResize(t)
        }, this), this.e._transitionEnd = t.proxy(function (t) {
            this.transitionEnd(t)
        }, this), this.e._preventClick = t.proxy(function (t) {
            this.preventClick(t)
        }, this)
    }, o.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, o.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!this.trigger("resize").isDefaultPrevented() && (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized"))))
    }, o.prototype.eventsRouter = function (t) {
        var e = t.type;
        "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    }, o.prototype.internalEvents = function () {
        var i = (c(), h());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function (t) {
            this.eventsRouter(t)
        }, this)), this.$stage.on("dragstart", function () {
            return !1
        }), this.$stage.get(0).onselectstart = function () {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function (t) {
            this.eventsRouter(t)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), !1 !== this.settings.responsive && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
    }, o.prototype.onDragStart = function (n) {
        var o, s, a, l;
        if (3 === (o = n.originalEvent || n || e.event).which || this.state.isTouch)return !1;
        if ("mousedown" === o.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, s = r(o).x, a = r(o).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0; else if (this.state.inMotion && !this.support3d)return this.state.inMotion = !1, !1;
        this.drag.startX = s - this.drag.offsetX, this.drag.startY = a - this.drag.offsetY, this.drag.start = s - this.drag.startX, this.drag.targetEl = o.target || o.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function (t) {
            this.eventsRouter(t)
        }, this))
    }, o.prototype.onDragMove = function (t) {
        var i, o, s, a, l, u;
        this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, o = r(i).x, s = r(i).y, this.drag.currentX = o - this.drag.startX, this.drag.currentY = s - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (a = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), u = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, a + u), l + u)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== n ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && !1 === this.state.isSwiping && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, o.prototype.onDragEnd = function (e) {
        var n, o;
        if (this.state.isTouch) {
            if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && !0 !== this.state.inMotion)return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), n = this.drag.endTime - this.drag.startTime, (Math.abs(this.drag.distance) > 3 || n > 300) && this.removeClick(this.drag.targetEl), o = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(o), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(o) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
        }
    }, o.prototype.removeClick = function (i) {
        this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function () {
            t(i).off("click.preventClick")
        }, 300)
    }, o.prototype.preventClick = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
    }, o.prototype.getTransformProperty = function () {
        var t, i;
        return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, !0 !== i ? t[4] : t[12]
    }, o.prototype.closest = function (e) {
        var i = -1, n = this.width(), o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function (t, r) {
            return e > r - 30 && r + 30 > e ? i = t : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - n) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
        }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (i = e = this.maximum())), i
    }, o.prototype.animate = function (e) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({left: e + "px"}) : this.$stage.animate({left: e}, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function () {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, o.prototype.current = function (t) {
        if (t === n)return this._current;
        if (0 === this._items.length)return n;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {property: {name: "position", value: t}});
            e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, o.prototype.invalidate = function (t) {
        this._invalidated[t] = !0
    }, o.prototype.reset = function (t) {
        (t = this.normalize(t)) !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, o.prototype.normalize = function (e, i) {
        var o = i ? this._items.length : this._items.length + this._clones.length;
        return !t.isNumeric(e) || 1 > o ? n : e = this._clones.length ? (e % o + o) % o : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
    }, o.prototype.relative = function (t) {
        return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
    }, o.prototype.maximum = function (t) {
        var e, i, n, o = 0, r = this.settings;
        if (t)return this._items.length - 1;
        if (!r.loop && r.center) e = this._items.length - 1; else if (r.loop || r.center)if (r.loop || r.center) e = this._items.length + r.items; else {
            if (!r.autoWidth && !r.merge)throw"Can not detect maximum absolute position.";
            for (revert = r.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width(); (n = this.coordinates(o)) && !(n * revert >= i);)e = ++o
        } else e = this._items.length - r.items;
        return e
    }, o.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
    }, o.prototype.items = function (t) {
        return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, o.prototype.mergers = function (t) {
        return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, o.prototype.clones = function (e) {
        var i = this._clones.length / 2, o = i + this._items.length, r = function (t) {
            return t % 2 == 0 ? o + t / 2 : i - (t + 1) / 2
        };
        return e === n ? t.map(this._clones, function (t, e) {
            return r(e)
        }) : t.map(this._clones, function (t, i) {
            return t === e ? r(i) : null
        })
    }, o.prototype.speed = function (t) {
        return t !== n && (this._speed = t), this._speed
    }, o.prototype.coordinates = function (e) {
        var i = null;
        return e === n ? t.map(this._coordinates, t.proxy(function (t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
    }, o.prototype.duration = function (t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, o.prototype.to = function (i, n) {
        if (this.settings.loop) {
            var o = i - this.relative(this.current()), r = this.current(), s = this.current(), a = this.current() + o,
                l = 0 > s - a, u = this._clones.length + this._items.length;
            a < this.settings.items && !1 === l ? (r = s + this._items.length, this.reset(r)) : a >= u - this.settings.items && !0 === l && (r = s - this._items.length, this.reset(r)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function () {
                this.speed(this.duration(this.current(), r + o, n)), this.current(r + o), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), i, n)), this.current(i), this.update()
    }, o.prototype.next = function (t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, o.prototype.prev = function (t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, o.prototype.transitionEnd = function (t) {
        return (t === n || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.state.inMotion = !1, void this.trigger("translated"))
    }, o.prototype.viewport = function () {
        var n;
        if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width(); else if (e.innerWidth) n = e.innerWidth; else {
            if (!i.documentElement || !i.documentElement.clientWidth)throw"Can not detect viewport width.";
            n = i.documentElement.clientWidth
        }
        return n
    }, o.prototype.replace = function (e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
            return 1 === this.nodeType
        }).each(t.proxy(function (t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, o.prototype.add = function (t, e) {
        e = e === n ? this._items.length : this.normalize(e, !0), this.trigger("add", {
            content: t,
            position: e
        }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, o.prototype.remove = function (t) {
        (t = this.normalize(t, !0)) !== n && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, o.prototype.addTriggerableEvents = function () {
        var e = t.proxy(function (e, i) {
            return t.proxy(function (t) {
                t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
            }, this)
        }, this);
        t.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, t.proxy(function (t, i) {
            this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
        }, this))
    }, o.prototype.watchVisibility = function () {
        function i(t) {
            return t.offsetWidth > 0 && t.offsetHeight > 0
        }

        function n() {
            i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
        }

        i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(n, this), 500))
    }, o.prototype.preloadAutoWidthImages = function (e) {
        var i, n, o, r;
        i = 0, n = this, e.each(function (s, a) {
            o = t(a), (r = new Image).onload = function () {
                i++, o.attr("src", r.src), o.css("opacity", 1), i >= e.length && (n.state.imagesLoaded = !0, n.initialize())
            }, r.src = o.attr("src") || o.attr("data-src") || o.attr("data-src-retina")
        })
    }, o.prototype.destroy = function () {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), !1 !== this.settings.responsive && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var n in this._plugins)this._plugins[n].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () {
        }, this.$stage.off("dragstart", function () {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, o.prototype.op = function (t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
            case"<":
                return n ? t > i : i > t;
            case">":
                return n ? i > t : t > i;
            case">=":
                return n ? i >= t : t >= i;
            case"<=":
                return n ? t >= i : i >= t
        }
    }, o.prototype.on = function (t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, o.prototype.off = function (t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
    }, o.prototype.trigger = function (e, i, n) {
        var o = {item: {count: this._items.length, index: this.current()}},
            r = t.camelCase(t.grep(["on", e, n], function (t) {
                return t
            }).join("-").toLowerCase()),
            s = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({relatedTarget: this}, o, i));
        return this._supress[e] || (t.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(s)
        }), this.$element.trigger(s), this.settings && "function" == typeof this.settings[r] && this.settings[r].apply(this, s)), s
    }, o.prototype.suppress = function (e) {
        t.each(e, t.proxy(function (t, e) {
            this._supress[e] = !0
        }, this))
    }, o.prototype.release = function (e) {
        t.each(e, t.proxy(function (t, e) {
            delete this._supress[e]
        }, this))
    }, o.prototype.browserSupport = function () {
        if (this.support3d = u(), this.support3d) {
            this.transformVendor = l();
            var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = t[a()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = e.orientation
    }, t.fn.owlCarousel = function (e) {
        return this.each(function () {
            t(this).data("owlCarousel") || t(this).data("owlCarousel", new o(this, e))
        })
    }, t.fn.owlCarousel.Constructor = o
}(window.Zepto || window.jQuery, window, document), function (t, e) {
    var i = function (e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": t.proxy(function (e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, o = i.center && -1 * n || 0, r = (e.property && e.property.value || this._core.current()) + o, s = this._core.clones().length, a = t.proxy(function (t, e) {
                    this.load(e)
                }, this); o++ < n;)this.load(s / 2 + this._core.relative(r)), s && t.each(this._core.clones(this._core.relative(r++)), a)
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    i.Defaults = {lazyLoad: !1}, i.prototype.load = function (i) {
        var n = this._core.$stage.children().eq(i), o = n && n.find(".owl-lazy");
        !o || t.inArray(n.get(0), this._loaded) > -1 || (o.each(t.proxy(function (i, n) {
            var o, r = t(n), s = e.devicePixelRatio > 1 && r.attr("data-src-retina") || r.attr("data-src");
            this._core.trigger("load", {
                element: r,
                url: s
            }, "lazy"), r.is("img") ? r.one("load.owl.lazy", t.proxy(function () {
                r.css("opacity", 1), this._core.trigger("loaded", {element: r, url: s}, "lazy")
            }, this)).attr("src", s) : (o = new Image, o.onload = t.proxy(function () {
                r.css({"background-image": "url(" + s + ")", opacity: "1"}), this._core.trigger("loaded", {
                    element: r,
                    url: s
                }, "lazy")
            }, this), o.src = s)
        }, this)), this._loaded.push(n.get(0)))
    }, i.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers)this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))"function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document), function (t) {
    var e = function (i) {
        this._core = i, this._handlers = {
            "initialized.owl.carousel": t.proxy(function () {
                this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this), "loaded.owl.lazy": t.proxy(function (t) {
                this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, e.prototype.update = function () {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers)this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))"function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document), function (t, e, i) {
    var n = function (e) {
        this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": t.proxy(function (t) {
                this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
            }, this), "refresh.owl.carousel changed.owl.carousel": t.proxy(function () {
                this._playing && this.stop()
            }, this), "prepared.owl.carousel": t.proxy(function (e) {
                var i = t(e.content).find(".owl-video");
                i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, n.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube", n = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
            o = t.attr("data-width") || this._core.settings.videoWidth,
            r = t.attr("data-height") || this._core.settings.videoHeight, s = t.attr("href");
        if (!s)throw new Error("Missing video URL.");
        if ((n = s.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube"; else {
            if (!(n[3].indexOf("vimeo") > -1))throw new Error("Video URL not supported.");
            i = "vimeo"
        }
        n = n[6], this._videos[s] = {
            type: i,
            id: n,
            width: o,
            height: r
        }, e.attr("data-video", s), this.thumbnail(t, this._videos[s])
    }, n.prototype.thumbnail = function (e, i) {
        var n, o, r, s = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            a = e.find("img"), l = "src", u = "", c = this._core.settings, h = function (t) {
                o = '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? '<div class="owl-video-tn ' + u + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(o)
            };
        return e.wrap('<div class="owl-video-wrapper"' + s + "></div>"), this._core.settings.lazyLoad && (l = "data-src", u = "owl-lazy"), a.length ? (h(a.attr(l)), a.remove(), !1) : void("youtube" === i.type ? (r = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", h(r)) : "vimeo" === i.type && t.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                    r = t[0].thumbnail_large, h(r)
                }
            }))
    }, n.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, n.prototype.play = function (e) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var i, n, o = t(e.target || e.srcElement), r = o.closest("." + this._core.settings.itemClass),
            s = this._videos[r.attr("data-video")], a = s.width || "100%", l = s.height || this._core.$stage.height();
        "youtube" === s.type ? i = '<iframe width="' + a + '" height="' + l + '" src="http://www.youtube.com/embed/' + s.id + "?autoplay=1&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type && (i = '<iframe src="http://player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + a + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), r.addClass("owl-video-playing"), this._playing = r, n = t('<div style="height:' + l + "px; width:" + a + 'px" class="owl-video-frame">' + i + "</div>"), o.after(n)
    }, n.prototype.isInFullScreen = function () {
        var n = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return n && t(n).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), !(n && this._fullscreen && this._playing) && (this._fullscreen ? (this._fullscreen = !1, !1) : !this._playing || this._core.state.orientation === e.orientation || (this._core.state.orientation = e.orientation, !1))
    }, n.prototype.destroy = function () {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers)this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))"function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var o = function (e) {
        this.core = e, this.core.options = t.extend({}, o.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
            "change.owl.carousel": t.proxy(function (t) {
                "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                this.swapping = "translated" == t.type
            }, this), "translate.owl.carousel": t.proxy(function () {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    o.Defaults = {animateOut: !1, animateIn: !1}, o.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this), n = this.core.$stage.children().eq(this.previous),
                o = this.core.$stage.children().eq(this.next), r = this.core.settings.animateIn,
                s = this.core.settings.animateOut;
            this.core.current() !== this.previous && (s && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.css({left: e + "px"}).addClass("animated owl-animated-out").addClass(s).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), r && o.addClass("animated owl-animated-in").addClass(r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
        }
    }, o.prototype.clear = function (e) {
        t(e.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, o.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers)this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))"function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = o
}(window.Zepto || window.jQuery, window, document), function (t, e, i) {
    var n = function (e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": t.proxy(function () {
                this.autoplay()
            }, this), "play.owl.autoplay": t.proxy(function (t, e, i) {
                this.play(e, i)
            }, this), "stop.owl.autoplay": t.proxy(function () {
                this.stop()
            }, this), "mouseover.owl.autoplay": t.proxy(function () {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this), "mouseleave.owl.autoplay": t.proxy(function () {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.autoplay = function () {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function () {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
    }, n.prototype.play = function () {
        return !0 === i.hidden || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : !1 === this.core.settings.autoplay ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, n.prototype.stop = function () {
        e.clearInterval(this.interval)
    }, n.prototype.pause = function () {
        e.clearInterval(this.interval)
    }, n.prototype.destroy = function () {
        var t, i;
        e.clearInterval(this.interval);
        for (t in this.handlers)this.core.$element.off(t, this.handlers[t]);
        for (i in Object.getOwnPropertyNames(this))"function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document), function (t) {
    "use strict";
    var e = function (i) {
        this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function (e) {
                this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this), "add.owl.carousel": t.proxy(function (e) {
                this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this), "remove.owl.carousel prepared.owl.carousel": t.proxy(function (t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this), "change.owl.carousel": t.proxy(function (t) {
                if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current(), i = this._core.maximum(), n = this._core.minimum();
                    t.data = t.property.value > i ? e >= i ? n : i : t.property.value < n ? i : t.property.value
                }
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                "position" == t.property.name && this.draw()
            }, this), "refreshed.owl.carousel": t.proxy(function () {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, e.prototype.initialize = function () {
        var e, i, n = this._core.settings;
        n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), n.navContainer && n.dotsContainer || (this._controls.$container = t("<div>").addClass(n.controlsClass).appendTo(this.$element)), this._controls.$indicators = n.dotsContainer ? t(n.dotsContainer) : t("<div>").hide().addClass(n.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function (e) {
            var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(), this.to(i, n.dotsSpeed)
        }, this)), e = n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + n.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(n.navClass[0]).html(n.navText[0]).hide().prependTo(e).on("click", t.proxy(function () {
            this.prev(n.navSpeed)
        }, this)), this._controls.$next.addClass(n.navClass[1]).html(n.navText[1]).hide().appendTo(e).on("click", t.proxy(function () {
            this.next(n.navSpeed)
        }, this));
        for (i in this._overrides)this._core[i] = t.proxy(this[i], this)
    }, e.prototype.destroy = function () {
        var t, e, i, n;
        for (t in this._handlers)this.$element.off(t, this._handlers[t]);
        for (e in this._controls)this._controls[e].remove();
        for (n in this.overides)this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this))"function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function () {
        var t, e, i, n = this._core.settings, o = this._core.clones().length / 2, r = o + this._core.items().length,
            s = n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items;
        if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)for (this._pages = [], t = o, e = 0, i = 0; r > t; t++)(e >= s || 0 === e) && (this._pages.push({
            start: t - o,
            end: t - o + s - 1
        }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
    }, e.prototype.draw = function () {
        var e, i, n = "", o = this._core.settings,
            r = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!o.nav || o.loop || o.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= r), this._controls.$next.toggleClass("disabled", r >= this._core.maximum())), this._controls.$previous.toggle(o.nav), this._controls.$next.toggle(o.nav), o.dots) {
            if (e = this._pages.length - this._controls.$indicators.children().length, o.dotData && 0 !== e) {
                for (i = 0; i < this._controls.$indicators.children().length; i++)n += this._templates[this._core.relative(i)];
                this._controls.$indicators.html(n)
            } else e > 0 ? (n = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(n)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(o.dots)
    }, e.prototype.onTrigger = function (e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
        }
    }, e.prototype.current = function () {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, function (t) {
            return t.start <= e && t.end >= e
        }).pop()
    }, e.prototype.getPosition = function (e) {
        var i, n, o = this._core.settings;
        return "page" == o.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += o.slideBy : i -= o.slideBy), i
    }, e.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, e.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, e.prototype.to = function (e, i, n) {
        var o;
        n ? t.proxy(this._overrides.to, this._core)(e, i) : (o = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % o + o) % o].start, i))
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document), function (t, e) {
    "use strict";
    var i = function (n) {
        this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function () {
                "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": t.proxy(function (e) {
                var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[i] = e.content
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function () {
            var t = e.location.hash.substring(1), i = this._core.$stage.children(),
                n = this._hashes[t] && i.index(this._hashes[t]) || 0;
            return !!t && void this._core.to(n, !1, !0)
        }, this))
    };
    i.Defaults = {URLhashListener: !1}, i.prototype.destroy = function () {
        var i, n;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers)this._core.$element.off(i, this._handlers[i]);
        for (n in Object.getOwnPropertyNames(this))"function" != typeof this[n] && (this[n] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document), function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    "use strict";
    function e(t) {
        if (t instanceof Date)return t;
        if (String(t).match(s))return String(t).match(/^[0-9]*$/) && (t = Number(t)), String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")), new Date(t);
        throw new Error("Couldn't cast `" + t + "` to a date object.")
    }

    function i(t) {
        var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(e)
    }

    function n(t) {
        return function (e) {
            var n = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (n)for (var r = 0, s = n.length; s > r; ++r) {
                var a = n[r].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), u = i(a[0]), c = a[1] || "", h = a[3] || "",
                    d = null;
                a = a[2], l.hasOwnProperty(a) && (d = l[a], d = Number(t[d])), null !== d && ("!" === c && (d = o(h, d)), "" === c && 10 > d && (d = "0" + d.toString()), e = e.replace(u, d.toString()))
            }
            return e = e.replace(/%%/, "%")
        }
    }

    function o(t, e) {
        var i = "s", n = "";
        return t && (t = t.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === t.length ? i = t[0] : (n = t[0], i = t[1])), 1 === Math.abs(e) ? n : i
    }

    var r = [], s = [], a = {precision: 100, elapse: !1};
    s.push(/^[0-9]*$/.source), s.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), s.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), s = new RegExp(s.join("|"));
    var l = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        w: "weeks",
        d: "daysToWeek",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    }, u = function (e, i, n) {
        this.el = e, this.$el = t(e), this.interval = null, this.offset = {}, this.options = t.extend({}, a), this.instanceNumber = r.length, r.push(this), this.$el.data("countdown-instance", this.instanceNumber), n && ("function" == typeof n ? (this.$el.on("update.countdown", n), this.$el.on("stoped.countdown", n), this.$el.on("finish.countdown", n)) : this.options = t.extend({}, a, n)), this.setFinalDate(i), this.start()
    };
    t.extend(u.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(), this.interval = setInterval(function () {
                t.update.call(t)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), r[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (t) {
            this.finalDate = e(t)
        }, update: function () {
            if (0 !== this.$el.closest("html").length) {
                var e, i = void 0 !== t._data(this.el, "events"), n = new Date;
                e = this.finalDate.getTime() - n.getTime(), e = Math.ceil(e / 1e3), e = !this.options.elapse && 0 > e ? 0 : Math.abs(e), this.totalSecsLeft !== e && i && (this.totalSecsLeft = e, this.elapsed = n >= this.finalDate, this.offset = {
                    seconds: this.totalSecsLeft % 60,
                    minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                    hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                    days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                    totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                    weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                    months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                    years: Math.abs(this.finalDate.getFullYear() - n.getFullYear())
                }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))
            } else this.remove()
        }, dispatchEvent: function (e) {
            var i = t.Event(e + ".countdown");
            i.finalDate = this.finalDate, i.elapsed = this.elapsed, i.offset = t.extend({}, this.offset), i.strftime = n(this.offset), this.$el.trigger(i)
        }
    }), t.fn.countdown = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var i = t(this).data("countdown-instance");
            if (void 0 !== i) {
                var n = r[i], o = e[0];
                u.prototype.hasOwnProperty(o) ? n[o].apply(n, e.slice(1)) : null === String(o).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (n.setFinalDate.call(n, o), n.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, o))
            } else new u(this, e[0], e[1])
        })
    }
}), function (t) {
    "use strict";
    t.fn.counterUp = function (e) {
        var i = t.extend({time: 400, delay: 10}, e);
        return this.each(function () {
            var e = t(this), n = i, o = function () {
                var t = [], i = n.time / n.delay, o = e.text(), r = /[0-9]+,[0-9]+/.test(o);
                o = o.replace(/,/g, "");
                /^[0-9]+$/.test(o);
                for (var s = /^[0-9]+\.[0-9]+$/.test(o), a = s ? (o.split(".")[1] || []).length : 0, l = i; l >= 1; l--) {
                    var u = parseInt(o / i * l);
                    if (s && (u = parseFloat(o / i * l).toFixed(a)), r)for (; /(\d+)(\d{3})/.test(u.toString());)u = u.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    t.unshift(u)
                }
                e.data("counterup-nums", t), e.text("0");
                var c = function () {
                    e.text(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), n.delay) : (e.data("counterup-nums"), e.data("counterup-nums", null), e.data("counterup-func", null))
                };
                e.data("counterup-func", c), setTimeout(e.data("counterup-func"), n.delay)
            };
            e.waypoint(o, {offset: "100%", triggerOnce: !0})
        })
    }
}(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (t, e, i, n, o) {
        return jQuery.easing[jQuery.easing.def](t, e, i, n, o)
    },
    easeInQuad: function (t, e, i, n, o) {
        return n * (e /= o) * e + i
    },
    easeOutQuad: function (t, e, i, n, o) {
        return -n * (e /= o) * (e - 2) + i
    },
    easeInOutQuad: function (t, e, i, n, o) {
        return (e /= o / 2) < 1 ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
    },
    easeInCubic: function (t, e, i, n, o) {
        return n * (e /= o) * e * e + i
    },
    easeOutCubic: function (t, e, i, n, o) {
        return n * ((e = e / o - 1) * e * e + 1) + i
    },
    easeInOutCubic: function (t, e, i, n, o) {
        return (e /= o / 2) < 1 ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i
    },
    easeInQuart: function (t, e, i, n, o) {
        return n * (e /= o) * e * e * e + i
    },
    easeOutQuart: function (t, e, i, n, o) {
        return -n * ((e = e / o - 1) * e * e * e - 1) + i
    },
    easeInOutQuart: function (t, e, i, n, o) {
        return (e /= o / 2) < 1 ? n / 2 * e * e * e * e + i : -n / 2 * ((e -= 2) * e * e * e - 2) + i
    },
    easeInQuint: function (t, e, i, n, o) {
        return n * (e /= o) * e * e * e * e + i
    },
    easeOutQuint: function (t, e, i, n, o) {
        return n * ((e = e / o - 1) * e * e * e * e + 1) + i
    },
    easeInOutQuint: function (t, e, i, n, o) {
        return (e /= o / 2) < 1 ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i
    },
    easeInSine: function (t, e, i, n, o) {
        return -n * Math.cos(e / o * (Math.PI / 2)) + n + i
    },
    easeOutSine: function (t, e, i, n, o) {
        return n * Math.sin(e / o * (Math.PI / 2)) + i
    },
    easeInOutSine: function (t, e, i, n, o) {
        return -n / 2 * (Math.cos(Math.PI * e / o) - 1) + i
    },
    easeInExpo: function (t, e, i, n, o) {
        return 0 == e ? i : n * Math.pow(2, 10 * (e / o - 1)) + i
    },
    easeOutExpo: function (t, e, i, n, o) {
        return e == o ? i + n : n * (1 - Math.pow(2, -10 * e / o)) + i
    },
    easeInOutExpo: function (t, e, i, n, o) {
        return 0 == e ? i : e == o ? i + n : (e /= o / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (2 - Math.pow(2, -10 * --e)) + i
    },
    easeInCirc: function (t, e, i, n, o) {
        return -n * (Math.sqrt(1 - (e /= o) * e) - 1) + i
    },
    easeOutCirc: function (t, e, i, n, o) {
        return n * Math.sqrt(1 - (e = e / o - 1) * e) + i
    },
    easeInOutCirc: function (t, e, i, n, o) {
        return (e /= o / 2) < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
    },
    easeInElastic: function (t, e, i, n, o) {
        var r = 1.70158, s = 0, a = n;
        if (0 == e)return i;
        if (1 == (e /= o))return i + n;
        if (s || (s = .3 * o), a < Math.abs(n)) {
            a = n;
            r = s / 4
        } else r = s / (2 * Math.PI) * Math.asin(n / a);
        return -a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - r) * (2 * Math.PI) / s) + i
    },
    easeOutElastic: function (t, e, i, n, o) {
        var r = 1.70158, s = 0, a = n;
        if (0 == e)return i;
        if (1 == (e /= o))return i + n;
        if (s || (s = .3 * o), a < Math.abs(n)) {
            a = n;
            r = s / 4
        } else r = s / (2 * Math.PI) * Math.asin(n / a);
        return a * Math.pow(2, -10 * e) * Math.sin((e * o - r) * (2 * Math.PI) / s) + n + i
    },
    easeInOutElastic: function (t, e, i, n, o) {
        var r = 1.70158, s = 0, a = n;
        if (0 == e)return i;
        if (2 == (e /= o / 2))return i + n;
        if (s || (s = o * (.3 * 1.5)), a < Math.abs(n)) {
            a = n;
            r = s / 4
        } else r = s / (2 * Math.PI) * Math.asin(n / a);
        return 1 > e ? a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - r) * (2 * Math.PI) / s) * -.5 + i : a * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * o - r) * (2 * Math.PI) / s) * .5 + n + i
    },
    easeInBack: function (t, e, i, n, o, r) {
        return void 0 == r && (r = 1.70158), n * (e /= o) * e * ((r + 1) * e - r) + i
    },
    easeOutBack: function (t, e, i, n, o, r) {
        return void 0 == r && (r = 1.70158), n * ((e = e / o - 1) * e * ((r + 1) * e + r) + 1) + i
    },
    easeInOutBack: function (t, e, i, n, o, r) {
        return void 0 == r && (r = 1.70158), (e /= o / 2) < 1 ? n / 2 * (e * e * ((1 + (r *= 1.525)) * e - r)) + i : n / 2 * ((e -= 2) * e * ((1 + (r *= 1.525)) * e + r) + 2) + i
    },
    easeInBounce: function (t, e, i, n, o) {
        return n - jQuery.easing.easeOutBounce(t, o - e, 0, n, o) + i
    },
    easeOutBounce: function (t, e, i, n, o) {
        return (e /= o) < 1 / 2.75 ? n * (7.5625 * e * e) + i : 2 / 2.75 > e ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : 2.5 / 2.75 > e ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
    },
    easeInOutBounce: function (t, e, i, n, o) {
        return o / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, o) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - o, 0, n, o) + .5 * n + i
    }
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (t) {
    var e, i, n, o, r, s, a = "Close", l = "BeforeClose", u = "MarkupParse", c = "Open", h = "Change", d = "mfp",
        p = "." + d, f = "mfp-ready", m = "mfp-removing", y = "mfp-prevent-close", g = function () {
        }, v = !!window.jQuery, b = t(window), w = function (t, i) {
            e.ev.on(d + t + p, i)
        }, T = function (e, i, n, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + e, n && (r.innerHTML = n), o ? i && i.appendChild(r) : (r = t(r), i && r.appendTo(i)), r
        }, P = function (i, n) {
            e.ev.triggerHandler(d + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
        }, _ = function (i) {
            return i === s && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), s = i), e.currTemplate.closeBtn
        }, C = function () {
            t.magnificPopup.instance || ((e = new g).init(), t.magnificPopup.instance = e)
        }, j = function () {
            var t = document.createElement("p").style, e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition)return !0;
            for (; e.length;)if (e.pop() + "Transition" in t)return !0;
            return !1
        };
    g.prototype = {
        constructor: g, init: function () {
            var i = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = j(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {}
        }, open: function (i) {
            var o;
            if (!1 === i.isObj) {
                e.items = i.items.toArray(), e.index = 0;
                var s, a = i.items;
                for (o = 0; o < a.length; o++)if ((s = a[o]).parsed && (s = s.el[0]), s === i.el[0]) {
                    e.index = o;
                    break
                }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
            {
                if (!e.isOpen) {
                    e.types = [], r = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = T("bg").on("click" + p, function () {
                        e.close()
                    }), e.wrap = T("wrap").attr("tabindex", -1).on("click" + p, function (t) {
                        e._checkIfClose(t.target) && e.close()
                    }), e.container = T("container", e.wrap)), e.contentContainer = T("content"), e.st.preloader && (e.preloader = T("preloader", e.container, e.st.tLoading));
                    var l = t.magnificPopup.modules;
                    for (o = 0; o < l.length; o++) {
                        var h = l[o];
                        h = h.charAt(0).toUpperCase() + h.slice(1), e["init" + h].call(e)
                    }
                    P("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (w(u, function (t, e, i, n) {
                        i.close_replaceWith = _(n.type)
                    }), r += " mfp-close-btn-in") : e.wrap.append(_())), e.st.alignTop && (r += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                        overflow: e.st.overflowY,
                        overflowX: "hidden",
                        overflowY: e.st.overflowY
                    }) : e.wrap.css({
                        top: b.scrollTop(),
                        position: "absolute"
                    }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                        height: n.height(),
                        position: "absolute"
                    }), e.st.enableEscapeKey && n.on("keyup" + p, function (t) {
                        27 === t.keyCode && e.close()
                    }), b.on("resize" + p, function () {
                        e.updateSize()
                    }), e.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && e.wrap.addClass(r);
                    var d = e.wH = b.height(), m = {};
                    if (e.fixedContentPos && e._hasScrollBar(d)) {
                        var y = e._getScrollbarSize();
                        y && (m.marginRight = y)
                    }
                    e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : m.overflow = "hidden");
                    var g = e.st.mainClass;
                    return e.isIE7 && (g += " mfp-ie7"), g && e._addClassToMFP(g), e.updateItemHTML(), P("BuildControls"), t("html").css(m), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
                        e.content ? (e._addClassToMFP(f), e._setFocus()) : e.bgOverlay.addClass(f), n.on("focusin" + p, e._onFocusIn)
                    }, 16), e.isOpen = !0, e.updateSize(d), P(c), i
                }
                e.updateItemHTML()
            }
        }, close: function () {
            e.isOpen && (P(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(m), setTimeout(function () {
                e._close()
            }, e.st.removalDelay)) : e._close())
        }, _close: function () {
            P(a);
            var i = m + " " + f + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var o = {marginRight: ""};
                e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
            }
            n.off("keyup.mfp focusin" + p), e.ev.off(p), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, P("AfterClose")
        }, updateSize: function (t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth, n = window.innerHeight * i;
                e.wrap.css("height", n), e.wH = n
            } else e.wH = t || b.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), P("Resize")
        }, updateItemHTML: function () {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var n = i.type;
            if (P("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
                var r = !!e.st[n] && e.st[n].markup;
                P("FirstMarkupParse", r), e.currTemplate[n] = !r || t(r)
            }
            o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
            var s = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
            e.appendContent(s, n), i.preloaded = !0, P(h, i), o = i.type, e.container.prepend(e.contentContainer), P("AfterChange")
        }, appendContent: function (t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(_()) : e.content = t : e.content = "", P("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        }, parseEl: function (i) {
            var n, o = e.items[i];
            if (o.tagName ? o = {el: t(o)} : (n = o.type, o = {data: o, src: o.src}), o.el) {
                for (var r = e.types, s = 0; s < r.length; s++)if (o.el.hasClass("mfp-" + r[s])) {
                    n = r[s];
                    break
                }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = n || e.st.type || "inline", o.index = i, o.parsed = !0, e.items[i] = o, P("ElementParse", o), e.items[i]
        }, addGroup: function (t, i) {
            var n = function (n) {
                n.mfpEl = this, e._openClick(n, t, i)
            };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t, t.off(o).on(o, n)))
        }, _openClick: function (i, n, o) {
            if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var r = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (r)if (t.isFunction(r)) {
                    if (!r.call(e))return !0
                } else if (b.width() < r)return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o)
            }
        }, updateStatus: function (t, n) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                var o = {status: t, text: n};
                P("UpdateStatus", o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find("a").on("click", function (t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        }, _checkIfClose: function (i) {
            if (!t(i).hasClass(y)) {
                var n = e.st.closeOnContentClick, o = e.st.closeOnBgClick;
                if (n && o)return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0])return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n)return !0
                } else if (o && t.contains(document, i))return !0;
                return !1
            }
        }, _addClassToMFP: function (t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        }, _removeClassFromMFP: function (t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        }, _hasScrollBar: function (t) {
            return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || b.height())
        }, _setFocus: function () {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        }, _onFocusIn: function (i) {
            return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
        }, _parseMarkup: function (e, i, n) {
            var o;
            n.data && (i = t.extend(n.data, i)), P(u, [e, i, n]), t.each(i, function (i, n) {
                if (void 0 === n || !1 === n)return !0;
                if ((o = i.split("_")).length > 1) {
                    var r = e.find(p + "-" + o[0]);
                    if (r.length > 0) {
                        var s = o[1];
                        "replaceWith" === s ? r[0] !== n[0] && r.replaceWith(n) : "img" === s ? r.is("img") ? r.attr("src", n) : r.replaceWith(t("<img>").attr("src", n).attr("class", r.attr("class"))) : r.attr(o[1], n)
                    }
                } else e.find(p + "-" + i).html(n)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: g.prototype,
        modules: [],
        open: function (e, i) {
            return C(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function () {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function (e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function (i) {
        C();
        var n = t(this);
        if ("string" == typeof i)if ("open" === i) {
            var o, r = v ? n.data("magnificPopup") : n[0].magnificPopup, s = parseInt(arguments[1], 10) || 0;
            r.items ? o = r.items[s] : (o = n, r.delegate && (o = o.find(r.delegate)), o = o.eq(s)), e._openClick({mfpEl: o}, n, r)
        } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1)); else i = t.extend(!0, {}, i), v ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
        return n
    };
    var x, S, Y, Q = "inline", I = function () {
        Y && (S.after(Y.addClass(x)).detach(), Y = null)
    };
    t.magnificPopup.registerModule(Q, {
        options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
        proto: {
            initInline: function () {
                e.types.push(Q), w(a + "." + Q, function () {
                    I()
                })
            }, getInline: function (i, n) {
                if (I(), i.src) {
                    var o = e.st.inline, r = t(i.src);
                    if (r.length) {
                        var s = r[0].parentNode;
                        s && s.tagName && (S || (x = o.hiddenClass, S = T(x), x = "mfp-" + x), Y = r.after(S).detach().removeClass(x)), e.updateStatus("ready")
                    } else e.updateStatus("error", o.tNotFound), r = t("<div>");
                    return i.inlineElement = r, r
                }
                return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n
            }
        }
    });
    var E, k = "ajax", z = function () {
        E && t(document.body).removeClass(E)
    }, O = function () {
        z(), e.req && e.req.abort()
    };
    t.magnificPopup.registerModule(k, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                e.types.push(k), E = e.st.ajax.cursor, w(a + "." + k, O), w("BeforeChange." + k, O)
            }, getAjax: function (i) {
                E && t(document.body).addClass(E), e.updateStatus("loading");
                var n = t.extend({
                    url: i.src, success: function (n, o, r) {
                        var s = {data: n, xhr: r};
                        P("ParseAjax", s), e.appendContent(t(s.data), k), i.finished = !0, z(), e._setFocus(), setTimeout(function () {
                            e.wrap.addClass(f)
                        }, 16), e.updateStatus("ready"), P("AjaxContentAdded")
                    }, error: function () {
                        z(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(n), ""
            }
        }
    });
    var L, M = function (i) {
        if (i.data && void 0 !== i.data.title)return i.data.title;
        var n = e.st.image.titleSrc;
        if (n) {
            if (t.isFunction(n))return n.call(e, i);
            if (i.el)return i.el.attr(n) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var i = e.st.image, n = ".image";
                e.types.push("image"), w(c + n, function () {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), w(a + n, function () {
                    i.cursor && t(document.body).removeClass(i.cursor), b.off("resize" + p)
                }), w("Resize" + n, e.resizeImage), e.isLowIE && w("AfterChange", e.resizeImage)
            }, resizeImage: function () {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            }, _onImageHasSize: function (t) {
                t.img && (t.hasSize = !0, L && clearInterval(L), t.isCheckingImgSize = !1, P("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            }, findImageSize: function (t) {
                var i = 0, n = t.img[0], o = function (r) {
                    L && clearInterval(L), L = setInterval(function () {
                        return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(L), i++, void(3 === i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                    }, r)
                };
                o(1)
            }, getImage: function (i, n) {
                var o = 0, r = function () {
                    i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, P("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : s()))
                }, s = function () {
                    i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                }, a = e.st.image, l = n.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")), i.img = t(u).on("load.mfploader", r).on("error.mfploader", s), u.src = i.src, l.is("img") && (i.img = i.img.clone()), (u = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                }
                return e._parseMarkup(n, {
                    title: M(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (L && clearInterval(L), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n)
            }
        }
    });
    var D, A = function () {
        return void 0 === D && (D = void 0 !== document.createElement("p").style.MozTransform), D
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (t) {
                return t.is("img") ? t : t.find("img")
            }
        }, proto: {
            initZoom: function () {
                var t, i = e.st.zoom, n = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var o, r, s = i.duration, u = function (t) {
                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            n = "all " + i.duration / 1e3 + "s " + i.easing, o = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, r = "transition";
                        return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n, e.css(o), e
                    }, c = function () {
                        e.content.css("visibility", "visible")
                    };
                    w("BuildControls" + n, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom()))return void c();
                            (r = u(t)).css(e._getOffset()), e.wrap.append(r), o = setTimeout(function () {
                                r.css(e._getOffset(!0)), o = setTimeout(function () {
                                    c(), setTimeout(function () {
                                        r.remove(), t = r = null, P("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }), w(l + n, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.st.removalDelay = s, !t) {
                                if (!(t = e._getItemToZoom()))return;
                                r = u(t)
                            }
                            r.css(e._getOffset(!0)), e.wrap.append(r), e.content.css("visibility", "hidden"), setTimeout(function () {
                                r.css(e._getOffset())
                            }, 16)
                        }
                    }), w(a + n, function () {
                        e._allowZoom() && (c(), r && r.remove(), t = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === e.currItem.type
            }, _getItemToZoom: function () {
                return !!e.currItem.hasSize && e.currItem.img
            }, _getOffset: function (i) {
                var n, o = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                    r = parseInt(n.css("padding-top"), 10), s = parseInt(n.css("padding-bottom"), 10);
                o.top -= t(window).scrollTop() - r;
                var a = {width: n.width(), height: (v ? n.innerHeight() : n[0].offsetHeight) - s - r};
                return A() ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a
            }
        }
    });
    var $ = "iframe", B = function (t) {
        if (e.currTemplate[$]) {
            var i = e.currTemplate[$].find("iframe");
            i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"))
        }
    };
    t.magnificPopup.registerModule($, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                e.types.push($), w("BeforeChange", function (t, e, i) {
                    e !== i && (e === $ ? B() : i === $ && B(!0))
                }), w(a + "." + $, function () {
                    B()
                })
            }, getIframe: function (i, n) {
                var o = i.src, r = e.st.iframe;
                t.each(r.patterns, function () {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                });
                var s = {};
                return r.srcAction && (s[r.srcAction] = o), e._parseMarkup(n, s, i), e.updateStatus("ready"), n
            }
        }
    });
    var F = function (t) {
        var i = e.items.length;
        return t > i - 1 ? t - i : 0 > t ? i + t : t
    }, W = function (t, e, i) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var i = e.st.gallery, o = ".mfp-gallery";
                return e.direction = !0, !(!i || !i.enabled) && (r += " mfp-gallery", w(c + o, function () {
                    i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function () {
                        return e.items.length > 1 ? (e.next(), !1) : void 0
                    }), n.on("keydown" + o, function (t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), w("UpdateStatus" + o, function (t, i) {
                    i.text && (i.text = W(i.text, e.currItem.index, e.items.length))
                }), w(u + o, function (t, n, o, r) {
                    var s = e.items.length;
                    o.counter = s > 1 ? W(i.tCounter, r.index, s) : ""
                }), w("BuildControls" + o, function () {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var n = i.arrowMarkup,
                            o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            r = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y);
                        o.click(function () {
                            e.prev()
                        }), r.click(function () {
                            e.next()
                        }), e.container.append(o.add(r))
                    }
                }), w(h + o, function () {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void w(a + o, function () {
                    n.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                }))
            }, next: function () {
                e.direction = !0, e.index = F(e.index + 1), e.updateItemHTML()
            }, prev: function () {
                e.direction = !1, e.index = F(e.index - 1), e.updateItemHTML()
            }, goTo: function (t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            }, preloadNearbyImages: function () {
                var t, i = e.st.gallery.preload, n = Math.min(i[0], e.items.length), o = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : n); t++)e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : o); t++)e._preloadItem(e.index - t)
            }, _preloadItem: function (i) {
                if (i = F(i), !e.items[i].preloaded) {
                    var n = e.items[i];
                    n.parsed || (n = e.parseEl(i)), P("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
                        n.hasSize = !0
                    }).on("error.mfploader", function () {
                        n.hasSize = !0, n.loadError = !0, P("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var R = "retina";
    t.magnificPopup.registerModule(R, {
        options: {
            replaceSrc: function (t) {
                return t.src.replace(/\.\w+$/, function (t) {
                    return "@2x" + t
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina, i = t.ratio;
                    (i = isNaN(i) ? i() : i) > 1 && (w("ImageHasSize." + R, function (t, e) {
                        e.img.css({"max-width": e.img[0].naturalWidth / i, width: "100%"})
                    }), w("ElementParse." + R, function (e, n) {
                        n.src = t.replaceSrc(n, i)
                    }))
                }
            }
        }
    }), C()
}), function (t, e, i) {
    "use strict";
    t.fn.scrollUp = function (e) {
        t.data(i.body, "scrollUp") || (t.data(i.body, "scrollUp", !0), t.fn.scrollUp.init(e))
    }, t.fn.scrollUp.init = function (n) {
        var o, r, s, a, l, u, c = t.fn.scrollUp.settings = t.extend({}, t.fn.scrollUp.defaults, n), h = !1;
        switch (u = c.scrollTrigger ? t(c.scrollTrigger) : t("<a/>", {
            id: c.scrollName,
            href: "#top"
        }), c.scrollTitle && u.attr("title", c.scrollTitle), u.appendTo("body"), c.scrollImg || c.scrollTrigger || u.html(c.scrollText), u.css({
            display: "none",
            position: "fixed",
            zIndex: c.zIndex
        }), c.activeOverlay && t("<div/>", {id: c.scrollName + "-active"}).css({
            position: "absolute",
            top: c.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + c.activeOverlay,
            zIndex: c.zIndex
        }).appendTo("body"), c.animation) {
            case"fade":
                o = "fadeIn", r = "fadeOut", s = c.animationSpeed;
                break;
            case"slide":
                o = "slideDown", r = "slideUp", s = c.animationSpeed;
                break;
            default:
                o = "show", r = "hide", s = 0
        }
        a = "top" === c.scrollFrom ? c.scrollDistance : t(i).height() - t(e).height() - c.scrollDistance, t(e).scroll(function () {
            t(e).scrollTop() > a ? h || (u[o](s), h = !0) : h && (u[r](s), h = !1)
        }), c.scrollTarget ? "number" == typeof c.scrollTarget ? l = c.scrollTarget : "string" == typeof c.scrollTarget && (l = Math.floor(t(c.scrollTarget).offset().top)) : l = 0, u.click(function (e) {
            e.preventDefault(), t("html, body").animate({scrollTop: l}, c.scrollSpeed, c.easingType)
        })
    }, t.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "easeOutElastic",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, t.fn.scrollUp.destroy = function (n) {
        t.removeData(i.body, "scrollUp"), t("#" + t.fn.scrollUp.settings.scrollName).remove(), t("#" + t.fn.scrollUp.settings.scrollName + "-active").remove(), t.fn.jquery.split(".")[1] >= 7 ? t(e).off("scroll", n) : t(e).unbind("scroll", n)
    }, t.scrollUp = t.fn.scrollUp
}(jQuery, window, document), function (t, e, i, n) {
    function o(e, i) {
        this.element = e, this.options = t.extend({}, s, i), this._defaults = s, this._name = r, this.init()
    }

    var r = "stellar", s = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: !1,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            hideElement: function (t) {
                t.hide()
            },
            showElement: function (t) {
                t.show()
            }
        }, a = {
            scroll: {
                getLeft: function (t) {
                    return t.scrollLeft()
                }, setLeft: function (t, e) {
                    t.scrollLeft(e)
                }, getTop: function (t) {
                    return t.scrollTop()
                }, setTop: function (t, e) {
                    t.scrollTop(e)
                }
            }, position: {
                getLeft: function (t) {
                    return -1 * parseInt(t.css("left"), 10)
                }, getTop: function (t) {
                    return -1 * parseInt(t.css("top"), 10)
                }
            }, margin: {
                getLeft: function (t) {
                    return -1 * parseInt(t.css("margin-left"), 10)
                }, getTop: function (t) {
                    return -1 * parseInt(t.css("margin-top"), 10)
                }
            }, transform: {
                getLeft: function (t) {
                    var e = getComputedStyle(t[0])[u];
                    return "none" !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[4], 10) : 0
                }, getTop: function (t) {
                    var e = getComputedStyle(t[0])[u];
                    return "none" !== e ? -1 * parseInt(e.match(/(-?[0-9]+)/g)[5], 10) : 0
                }
            }
        }, l = {
            position: {
                setLeft: function (t, e) {
                    t.css("left", e)
                }, setTop: function (t, e) {
                    t.css("top", e)
                }
            }, transform: {
                setPosition: function (t, e, i, n, o) {
                    t[0].style[u] = "translate3d(" + (e - i) + "px, " + (n - o) + "px, 0)"
                }
            }
        }, u = function () {
            var e, i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/, n = t("script")[0].style, o = "";
            for (e in n)if (i.test(e)) {
                o = e.match(i)[0];
                break
            }
            return "WebkitOpacity" in n && (o = "Webkit"), "KhtmlOpacity" in n && (o = "Khtml"), function (t) {
                return o + (o.length > 0 ? t.charAt(0).toUpperCase() + t.slice(1) : t)
            }
        }()("transform"), c = t("<div />", {style: "background:#fff"}).css("background-position-x") !== n,
        h = c ? function (t, e, i) {
            t.css({"background-position-x": e, "background-position-y": i})
        } : function (t, e, i) {
            t.css("background-position", e + " " + i)
        }, d = c ? function (t) {
            return [t.css("background-position-x"), t.css("background-position-y")]
        } : function (t) {
            return t.css("background-position").split(" ")
        },
        p = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) {
                setTimeout(t, 1e3 / 60)
            };
    o.prototype = {
        init: function () {
            this.options.name = r + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({firstLoad: !0}), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
        }, _defineElements: function () {
            this.element === i.body && (this.element = e), this.$scrollElement = t(this.element), this.$element = this.element === e ? t("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== n ? t(this.options.viewportElement) : this.$scrollElement[0] === e || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
        }, _defineGetters: function () {
            var t = this, e = a[t.options.scrollProperty];
            this._getScrollLeft = function () {
                return e.getLeft(t.$scrollElement)
            }, this._getScrollTop = function () {
                return e.getTop(t.$scrollElement)
            }
        }, _defineSetters: function () {
            var e = this, i = a[e.options.scrollProperty], n = l[e.options.positionProperty], o = i.setLeft,
                r = i.setTop;
            this._setScrollLeft = "function" == typeof o ? function (t) {
                o(e.$scrollElement, t)
            } : t.noop, this._setScrollTop = "function" == typeof r ? function (t) {
                r(e.$scrollElement, t)
            } : t.noop, this._setPosition = n.setPosition || function (t, i, o, r, s) {
                    e.options.horizontalScrolling && n.setLeft(t, i, o), e.options.verticalScrolling && n.setTop(t, r, s)
                }
        }, _handleWindowLoadAndResize: function () {
            var i = this, n = t(e);
            i.options.responsive && n.bind("load." + this.name, function () {
                i.refresh()
            }), n.bind("resize." + this.name, function () {
                i._detectViewport(), i.options.responsive && i.refresh()
            })
        }, refresh: function (i) {
            var n = this, o = n._getScrollLeft(), r = n._getScrollTop();
            (!i || !i.firstLoad) && this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), i && i.firstLoad && /WebKit/.test(navigator.userAgent) && t(e).load(function () {
                var t = n._getScrollLeft(), e = n._getScrollTop();
                n._setScrollLeft(t + 1), n._setScrollTop(e + 1), n._setScrollLeft(t), n._setScrollTop(e)
            }), this._setScrollLeft(o), this._setScrollTop(r)
        }, _detectViewport: function () {
            var t = this.$viewportElement.offset(), e = null !== t && t !== n;
            this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = e ? t.top : 0, this.viewportOffsetLeft = e ? t.left : 0
        }, _findParticles: function () {
            var e = this;
            this._getScrollLeft(), this._getScrollTop();
            if (this.particles !== n)for (var i = this.particles.length - 1; i >= 0; i--)this.particles[i].$element.data("stellar-elementIsActive", n);
            this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function (i) {
                var o, r, s, a, l, u, c, h, d, p = t(this), f = 0, m = 0, y = 0, g = 0;
                if (p.data("stellar-elementIsActive")) {
                    if (p.data("stellar-elementIsActive") !== this)return
                } else p.data("stellar-elementIsActive", this);
                e.options.showElement(p), p.data("stellar-startingLeft") ? (p.css("left", p.data("stellar-startingLeft")), p.css("top", p.data("stellar-startingTop"))) : (p.data("stellar-startingLeft", p.css("left")), p.data("stellar-startingTop", p.css("top"))), s = p.position().left, a = p.position().top, l = "auto" === p.css("margin-left") ? 0 : parseInt(p.css("margin-left"), 10), u = "auto" === p.css("margin-top") ? 0 : parseInt(p.css("margin-top"), 10), h = p.offset().left - l, d = p.offset().top - u, p.parents().each(function () {
                    var e = t(this);
                    if (!0 === e.data("stellar-offset-parent"))return f = y, m = g, c = e, !1;
                    y += e.position().left, g += e.position().top
                }), o = p.data("stellar-horizontal-offset") !== n ? p.data("stellar-horizontal-offset") : c !== n && c.data("stellar-horizontal-offset") !== n ? c.data("stellar-horizontal-offset") : e.horizontalOffset, r = p.data("stellar-vertical-offset") !== n ? p.data("stellar-vertical-offset") : c !== n && c.data("stellar-vertical-offset") !== n ? c.data("stellar-vertical-offset") : e.verticalOffset, e.particles.push({
                    $element: p,
                    $offsetParent: c,
                    isFixed: "fixed" === p.css("position"),
                    horizontalOffset: o,
                    verticalOffset: r,
                    startingPositionLeft: s,
                    startingPositionTop: a,
                    startingOffsetLeft: h,
                    startingOffsetTop: d,
                    parentOffsetLeft: f,
                    parentOffsetTop: m,
                    stellarRatio: p.data("stellar-ratio") !== n ? p.data("stellar-ratio") : 1,
                    width: p.outerWidth(!0),
                    height: p.outerHeight(!0),
                    isHidden: !1
                })
            })
        }, _findBackgrounds: function () {
            var e, i = this, o = this._getScrollLeft(), r = this._getScrollTop();
            this.backgrounds = [], this.options.parallaxBackgrounds && (e = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (e = e.add(this.$element)), e.each(function () {
                var e, s, a, l, u, c, p, f = t(this), m = d(f), y = 0, g = 0, v = 0, b = 0;
                if (f.data("stellar-backgroundIsActive")) {
                    if (f.data("stellar-backgroundIsActive") !== this)return
                } else f.data("stellar-backgroundIsActive", this);
                f.data("stellar-backgroundStartingLeft") ? h(f, f.data("stellar-backgroundStartingLeft"), f.data("stellar-backgroundStartingTop")) : (f.data("stellar-backgroundStartingLeft", m[0]), f.data("stellar-backgroundStartingTop", m[1])), a = "auto" === f.css("margin-left") ? 0 : parseInt(f.css("margin-left"), 10), l = "auto" === f.css("margin-top") ? 0 : parseInt(f.css("margin-top"), 10), u = f.offset().left - a - o, c = f.offset().top - l - r, f.parents().each(function () {
                    var e = t(this);
                    if (!0 === e.data("stellar-offset-parent"))return y = v, g = b, p = e, !1;
                    v += e.position().left, b += e.position().top
                }), e = f.data("stellar-horizontal-offset") !== n ? f.data("stellar-horizontal-offset") : p !== n && p.data("stellar-horizontal-offset") !== n ? p.data("stellar-horizontal-offset") : i.horizontalOffset, s = f.data("stellar-vertical-offset") !== n ? f.data("stellar-vertical-offset") : p !== n && p.data("stellar-vertical-offset") !== n ? p.data("stellar-vertical-offset") : i.verticalOffset, i.backgrounds.push({
                    $element: f,
                    $offsetParent: p,
                    isFixed: "fixed" === f.css("background-attachment"),
                    horizontalOffset: e,
                    verticalOffset: s,
                    startingValueLeft: m[0],
                    startingValueTop: m[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(m[0], 10)) ? 0 : parseInt(m[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(m[1], 10)) ? 0 : parseInt(m[1], 10),
                    startingPositionLeft: f.position().left,
                    startingPositionTop: f.position().top,
                    startingOffsetLeft: u,
                    startingOffsetTop: c,
                    parentOffsetLeft: y,
                    parentOffsetTop: g,
                    stellarRatio: f.data("stellar-background-ratio") === n ? 1 : f.data("stellar-background-ratio")
                })
            }))
        }, _reset: function () {
            var t, e, i, n, o;
            for (o = this.particles.length - 1; o >= 0; o--)t = this.particles[o], e = t.$element.data("stellar-startingLeft"), i = t.$element.data("stellar-startingTop"), this._setPosition(t.$element, e, e, i, i), this.options.showElement(t.$element), t.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            for (o = this.backgrounds.length - 1; o >= 0; o--)(n = this.backgrounds[o]).$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), h(n.$element, n.startingValueLeft, n.startingValueTop)
        }, destroy: function () {
            this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = t.noop, t(e).unbind("load." + this.name).unbind("resize." + this.name)
        }, _setOffsets: function () {
            var i = this, n = t(e);
            n.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), n.bind("resize.horizontal-" + this.name, function () {
                i.horizontalOffset = i.options.horizontalOffset()
            })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), n.bind("resize.vertical-" + this.name, function () {
                i.verticalOffset = i.options.verticalOffset()
            })) : this.verticalOffset = this.options.verticalOffset
        }, _repositionElements: function () {
            var t, e, i, n, o, r, s, a, l, u, c = this._getScrollLeft(), d = this._getScrollTop(), p = !0, f = !0;
            if (this.currentScrollLeft !== c || this.currentScrollTop !== d || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                for (this.currentScrollLeft = c, this.currentScrollTop = d, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, u = this.particles.length - 1; u >= 0; u--)t = this.particles[u], e = t.isFixed ? 1 : 0, this.options.horizontalScrolling ? (r = (c + t.horizontalOffset + this.viewportOffsetLeft + t.startingPositionLeft - t.startingOffsetLeft + t.parentOffsetLeft) * -(t.stellarRatio + e - 1) + t.startingPositionLeft, a = r - t.startingPositionLeft + t.startingOffsetLeft) : (r = t.startingPositionLeft, a = t.startingOffsetLeft), this.options.verticalScrolling ? (s = (d + t.verticalOffset + this.viewportOffsetTop + t.startingPositionTop - t.startingOffsetTop + t.parentOffsetTop) * -(t.stellarRatio + e - 1) + t.startingPositionTop, l = s - t.startingPositionTop + t.startingOffsetTop) : (s = t.startingPositionTop, l = t.startingOffsetTop), this.options.hideDistantElements && (f = !this.options.horizontalScrolling || a + t.width > (t.isFixed ? 0 : c) && a < (t.isFixed ? 0 : c) + this.viewportWidth + this.viewportOffsetLeft, p = !this.options.verticalScrolling || l + t.height > (t.isFixed ? 0 : d) && l < (t.isFixed ? 0 : d) + this.viewportHeight + this.viewportOffsetTop), f && p ? (t.isHidden && (this.options.showElement(t.$element), t.isHidden = !1), this._setPosition(t.$element, r, t.startingPositionLeft, s, t.startingPositionTop)) : t.isHidden || (this.options.hideElement(t.$element), t.isHidden = !0);
                for (u = this.backgrounds.length - 1; u >= 0; u--)i = this.backgrounds[u], e = i.isFixed ? 0 : 1, n = this.options.horizontalScrolling ? (c + i.horizontalOffset - this.viewportOffsetLeft - i.startingOffsetLeft + i.parentOffsetLeft - i.startingBackgroundPositionLeft) * (e - i.stellarRatio) + "px" : i.startingValueLeft, o = this.options.verticalScrolling ? (d + i.verticalOffset - this.viewportOffsetTop - i.startingOffsetTop + i.parentOffsetTop - i.startingBackgroundPositionTop) * (e - i.stellarRatio) + "px" : i.startingValueTop, h(i.$element, n, o)
            }
        }, _handleScrollEvent: function () {
            var t = this, e = !1, i = function () {
                t._repositionElements(), e = !1
            }, n = function () {
                e || (p(i), e = !0)
            };
            this.$scrollElement.bind("scroll." + this.name, n), n()
        }, _startAnimationLoop: function () {
            var t = this;
            this._animationLoop = function () {
                p(t._animationLoop), t._repositionElements()
            }, this._animationLoop()
        }
    }, t.fn[r] = function (e) {
        var i = arguments;
        return e === n || "object" == typeof e ? this.each(function () {
            t.data(this, "plugin_" + r) || t.data(this, "plugin_" + r, new o(this, e))
        }) : "string" == typeof e && "_" !== e[0] && "init" !== e ? this.each(function () {
            var n = t.data(this, "plugin_" + r);
            n instanceof o && "function" == typeof n[e] && n[e].apply(n, Array.prototype.slice.call(i, 1)), "destroy" === e && t.data(this, "plugin_" + r, null)
        }) : void 0
    }, t[r] = function (i) {
        var n = t(e);
        return n.stellar.apply(n, Array.prototype.slice.call(arguments, 0))
    }, t[r].scrollProperty = a, t[r].positionProperty = l, e.Stellar = o
}(jQuery, this, document), function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    var e = -1, i = -1, n = function (t) {
        return parseFloat(t) || 0
    }, o = function (e) {
        var i = null, o = [];
        return t(e).each(function () {
            var e = t(this), r = e.offset().top - n(e.css("margin-top")), s = o.length > 0 ? o[o.length - 1] : null;
            null === s ? o.push(e) : Math.floor(Math.abs(i - r)) <= 1 ? o[o.length - 1] = s.add(e) : o.push(e), i = r
        }), o
    }, r = function (e) {
        var i = {byRow: !0, property: "height", target: null, remove: !1};
        return "object" == typeof e ? t.extend(i, e) : ("boolean" == typeof e ? i.byRow = e : "remove" === e && (i.remove = !0), i)
    }, s = t.fn.matchHeight = function (e) {
        var i = r(e);
        if (i.remove) {
            var n = this;
            return this.css(i.property, ""), t.each(s._groups, function (t, e) {
                e.elements = e.elements.not(n)
            }), this
        }
        return this.length <= 1 && !i.target ? this : (s._groups.push({
            elements: this,
            options: i
        }), s._apply(this, i), this)
    };
    s.version = "0.7.0", s._groups = [], s._throttle = 80, s._maintainScroll = !1, s._beforeUpdate = null, s._afterUpdate = null, s._rows = o, s._parse = n, s._parseOptions = r, s._apply = function (e, i) {
        var a = r(i), l = t(e), u = [l], c = t(window).scrollTop(), h = t("html").outerHeight(!0),
            d = l.parents().filter(":hidden");
        return d.each(function () {
            var e = t(this);
            e.data("style-cache", e.attr("style"))
        }), d.css("display", "block"), a.byRow && !a.target && (l.each(function () {
            var e = t(this), i = e.css("display");
            "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"), e.data("style-cache", e.attr("style")), e.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), u = o(l), l.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
        })), t.each(u, function (e, i) {
            var o = t(i), r = 0;
            if (a.target) r = a.target.outerHeight(!1); else {
                if (a.byRow && o.length <= 1)return void o.css(a.property, "");
                o.each(function () {
                    var e = t(this), i = e.attr("style"), n = e.css("display");
                    "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                    var o = {display: n};
                    o[a.property] = "", e.css(o), e.outerHeight(!1) > r && (r = e.outerHeight(!1)), i ? e.attr("style", i) : e.css("display", "")
                })
            }
            o.each(function () {
                var e = t(this), i = 0;
                a.target && e.is(a.target) || ("border-box" !== e.css("box-sizing") && (i += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), i += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(a.property, r - i + "px"))
            })
        }), d.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null)
        }), s._maintainScroll && t(window).scrollTop(c / h * t("html").outerHeight(!0)), this
    }, s._applyDataApi = function () {
        var e = {};
        t("[data-match-height], [data-mh]").each(function () {
            var i = t(this), n = i.attr("data-mh") || i.attr("data-match-height");
            e[n] = n in e ? e[n].add(i) : i
        }), t.each(e, function () {
            this.matchHeight(!0)
        })
    };
    var a = function (e) {
        s._beforeUpdate && s._beforeUpdate(e, s._groups), t.each(s._groups, function () {
            s._apply(this.elements, this.options)
        }), s._afterUpdate && s._afterUpdate(e, s._groups)
    };
    s._update = function (n, o) {
        if (o && "resize" === o.type) {
            var r = t(window).width();
            if (r === e)return;
            e = r
        }
        n ? -1 === i && (i = setTimeout(function () {
                a(o), i = -1
            }, s._throttle)) : a(o)
    }, t(s._applyDataApi), t(window).bind("load", function (t) {
        s._update(!1, t)
    }), t(window).bind("resize orientationchange", function (t) {
        s._update(!0, t)
    })
}), function (t) {
    "use strict";
    t.fn.meanmenu = function (e) {
        var i = {
            meanMenuTarget: jQuery(this),
            meanMenuContainer: "body",
            meanMenuClose: "<span /><span />",
            meanMenuCloseSize: "18px",
            meanMenuOpen: "<span /><span /><span />",
            meanRevealPosition: "right",
            meanRevealPositionDistance: "0",
            meanRevealColour: "",
            meanScreenWidth: "767",
            meanNavPush: "",
            meanShowChildren: !0,
            meanExpandableChildren: !0,
            meanExpand: "+",
            meanContract: "-",
            meanRemoveAttrs: !1,
            onePage: !1,
            meanDisplay: "block",
            removeElements: ""
        };
        e = t.extend(i, e);
        var n = window.innerWidth || document.documentElement.clientWidth;
        return this.each(function () {
            var t = e.meanMenuTarget, i = e.meanMenuContainer, o = e.meanMenuClose, r = e.meanMenuCloseSize,
                s = e.meanMenuOpen, a = e.meanRevealPosition, l = e.meanRevealPositionDistance, u = e.meanRevealColour,
                c = e.meanScreenWidth, h = e.meanNavPush, d = e.meanShowChildren, p = e.meanExpandableChildren,
                f = e.meanExpand, m = e.meanContract, y = e.meanRemoveAttrs, g = e.onePage, v = e.meanDisplay,
                b = e.removeElements, w = !1;
            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/Windows Phone/i)) && (w = !0), (navigator.userAgent.match(/MSIE 8/i) || navigator.userAgent.match(/MSIE 7/i)) && jQuery("html").css("overflow-y", "scroll");
            var T = "", P = function () {
                if ("center" === a) {
                    var t = (window.innerWidth || document.documentElement.clientWidth) / 2 - 22 + "px";
                    T = "left:" + t + ";right:auto;", w ? jQuery(".meanmenu-reveal").animate({left: t}) : jQuery(".meanmenu-reveal").css("left", t)
                }
            }, _ = !1, C = !1;
            "right" === a && (T = "right:" + l + ";left:auto;"), "left" === a && (T = "left:" + l + ";right:auto;"), P();
            var j = "", x = function () {
                jQuery(j).is(".meanmenu-reveal.meanclose") ? j.html(o) : j.html(s)
            }, S = function () {
                jQuery(".mean-bar,.mean-push").remove(), jQuery(i).removeClass("mean-container"), jQuery(t).css("display", v), _ = !1, C = !1, jQuery(b).removeClass("mean-remove")
            }, Y = function () {
                var e = "background:" + u + ";color:" + u + ";" + T;
                if (n <= c) {
                    jQuery(b).addClass("mean-remove"), C = !0, jQuery(i).addClass("mean-container"), jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' + e + '">Show Navigation</a><nav class="mean-nav"></nav></div>');
                    var o = jQuery(t).html();
                    jQuery(".mean-nav").html(o), y && jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function () {
                        jQuery(this).is(".mean-remove") ? jQuery(this).attr("class", "mean-remove") : jQuery(this).removeAttr("class"), jQuery(this).removeAttr("id")
                    }), jQuery(t).before('<div class="mean-push" />'), jQuery(".mean-push").css("margin-top", h), jQuery(t).hide(), jQuery(".meanmenu-reveal").show(), jQuery(".meanmenu-reveal").html(s), j = jQuery(".meanmenu-reveal"), jQuery(".mean-nav ul").hide(), d ? p ? (jQuery(".mean-nav ul ul").each(function () {
                        jQuery(this).children().length && jQuery(this, "li:first").parent().append('<a class="mean-expand" href="#" style="font-size: ' + r + '">' + f + "</a>")
                    }), jQuery(".mean-expand").on("click", function (t) {
                        t.preventDefault(), jQuery(this).hasClass("mean-clicked") ? (jQuery(this).text(f), jQuery(this).prev("ul").slideUp(300, function () {
                        })) : (jQuery(this).text(m), jQuery(this).prev("ul").slideDown(300, function () {
                        })), jQuery(this).toggleClass("mean-clicked")
                    })) : jQuery(".mean-nav ul ul").show() : jQuery(".mean-nav ul ul").hide(), jQuery(".mean-nav ul li").last().addClass("mean-last"), j.removeClass("meanclose"), jQuery(j).click(function (t) {
                        t.preventDefault(), !1 === _ ? (j.css("text-align", "center"), j.css("text-indent", "0"), j.css("font-size", r), jQuery(".mean-nav ul:first").slideDown(), _ = !0) : (jQuery(".mean-nav ul:first").slideUp(), _ = !1), j.toggleClass("meanclose"), x(), jQuery(b).addClass("mean-remove")
                    }), g && jQuery(".mean-nav ul > li > a:first-child").on("click", function () {
                        jQuery(".mean-nav ul:first").slideUp(), _ = !1, jQuery(j).toggleClass("meanclose").html(s)
                    })
                } else S()
            };
            w || jQuery(window).resize(function () {
                n = window.innerWidth || document.documentElement.clientWidth, S(), n <= c ? (Y(), P()) : S()
            }), jQuery(window).resize(function () {
                n = window.innerWidth || document.documentElement.clientWidth, w ? (P(), n <= c ? !1 === C && Y() : S()) : (S(), n <= c && (Y(), P()))
            }), Y()
        })
    }
}(jQuery), function () {
    var t = [].indexOf || function (t) {
            for (var e = 0, i = this.length; e < i; e++)if (e in this && this[e] === t)return e;
            return -1
        }, e = [].slice;
    !function (t, e) {
        "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function (i) {
            return e(i, t)
        }) : e(t.jQuery, t)
    }(this, function (i, n) {
        var o, r, s, a, l, u, c, h, d, p, f, m, y, g, v, b;
        return o = i(n), h = t.call(n, "ontouchstart") >= 0, a = {
            horizontal: {},
            vertical: {}
        }, l = 1, c = {}, u = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints", y = 1, g = "waypoints-waypoint-ids", v = "waypoint", b = "waypoints", r = function () {
            function t(t) {
                var e = this;
                this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + l++, this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, t.data(u, this.id), c[this.id] = this, t.bind(m, function () {
                    var t;
                    if (!e.didScroll && !h)return e.didScroll = !0, t = function () {
                        return e.doScroll(), e.didScroll = !1
                    }, n.setTimeout(t, i[b].settings.scrollThrottle)
                }), t.bind(f, function () {
                    var t;
                    if (!e.didResize)return e.didResize = !0, t = function () {
                        return i[b]("refresh"), e.didResize = !1
                    }, n.setTimeout(t, i[b].settings.resizeThrottle)
                })
            }

            return t.prototype.doScroll = function () {
                var t, e = this;
                return t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !h || t.vertical.oldScroll && t.vertical.newScroll || i[b]("refresh"), i.each(t, function (t, n) {
                    var o, r, s;
                    return s = [], r = n.newScroll > n.oldScroll, o = r ? n.forward : n.backward, i.each(e.waypoints[t], function (t, e) {
                        var i, o;
                        return n.oldScroll < (i = e.offset) && i <= n.newScroll ? s.push(e) : n.newScroll < (o = e.offset) && o <= n.oldScroll ? s.push(e) : void 0
                    }), s.sort(function (t, e) {
                        return t.offset - e.offset
                    }), r || s.reverse(), i.each(s, function (t, e) {
                        if (e.options.continuous || t === s.length - 1)return e.trigger([o])
                    })
                }), this.oldScroll = {x: t.horizontal.newScroll, y: t.vertical.newScroll}
            }, t.prototype.refresh = function () {
                var t, e, n, o = this;
                return n = i.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
                    horizontal: {
                        contextOffset: n ? 0 : e.left,
                        contextScroll: n ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: n ? 0 : e.top,
                        contextScroll: n ? 0 : this.oldScroll.y,
                        contextDimension: n ? i[b]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, i.each(t, function (t, e) {
                    return i.each(o.waypoints[t], function (t, n) {
                        var o, r, s, a, l;
                        if (o = n.options.offset, s = n.offset, r = i.isWindow(n.element) ? 0 : n.$element.offset()[e.offsetProp], i.isFunction(o) ? o = o.apply(n.element) : "string" == typeof o && (o = parseFloat(o), n.options.offset.indexOf("%") > -1 && (o = Math.ceil(e.contextDimension * o / 100))), n.offset = r - e.contextOffset + e.contextScroll - o, (!n.options.onlyOnScroll || null == s) && n.enabled)return null !== s && s < (a = e.oldScroll) && a <= n.offset ? n.trigger([e.backward]) : null !== s && s > (l = e.oldScroll) && l >= n.offset ? n.trigger([e.forward]) : null === s && e.oldScroll >= n.offset ? n.trigger([e.forward]) : void 0
                    })
                })
            }, t.prototype.checkEmpty = function () {
                if (i.isEmptyObject(this.waypoints.horizontal) && i.isEmptyObject(this.waypoints.vertical))return this.$element.unbind([f, m].join(" ")), delete c[this.id]
            }, t
        }(), s = function () {
            function t(t, e, n) {
                var o, r;
                "bottom-in-view" === (n = i.extend({}, i.fn[v].defaults, n)).offset && (n.offset = function () {
                    var t;
                    return t = i[b]("viewportHeight"), i.isWindow(e.element) || (t = e.$element.height()), t - i(this).outerHeight()
                }), this.$element = t, this.element = t[0], this.axis = n.horizontal ? "horizontal" : "vertical", this.callback = n.handler, this.context = e, this.enabled = n.enabled, this.id = "waypoints" + y++, this.offset = null, this.options = n, e.waypoints[this.axis][this.id] = this, a[this.axis][this.id] = this, (o = null != (r = t.data(g)) ? r : []).push(this.id), t.data(g, o)
            }

            return t.prototype.trigger = function (t) {
                if (this.enabled)return null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0
            }, t.prototype.disable = function () {
                return this.enabled = !1
            }, t.prototype.enable = function () {
                return this.context.refresh(), this.enabled = !0
            }, t.prototype.destroy = function () {
                return delete a[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
            }, t.getWaypointsByElement = function (t) {
                var e, n;
                return (n = i(t).data(g)) ? (e = i.extend({}, a.horizontal, a.vertical), i.map(n, function (t) {
                    return e[t]
                })) : []
            }, t
        }(), p = {
            init: function (t, e) {
                return null == e && (e = {}), null == e.handler && (e.handler = t), this.each(function () {
                    var t, n, o, a;
                    return t = i(this), o = null != (a = e.context) ? a : i.fn[v].defaults.context, i.isWindow(o) || (o = t.closest(o)), o = i(o), (n = c[o.data(u)]) || (n = new r(o)), new s(t, n, e)
                }), i[b]("refresh"), this
            }, disable: function () {
                return p._invoke(this, "disable")
            }, enable: function () {
                return p._invoke(this, "enable")
            }, destroy: function () {
                return p._invoke(this, "destroy")
            }, prev: function (t, e) {
                return p._traverse.call(this, t, e, function (t, e, i) {
                    if (e > 0)return t.push(i[e - 1])
                })
            }, next: function (t, e) {
                return p._traverse.call(this, t, e, function (t, e, i) {
                    if (e < i.length - 1)return t.push(i[e + 1])
                })
            }, _traverse: function (t, e, o) {
                var r, s;
                return null == t && (t = "vertical"), null == e && (e = n), s = d.aggregate(e), r = [], this.each(function () {
                    var e;
                    return e = i.inArray(this, s[t]), o(r, e, s[t])
                }), this.pushStack(r)
            }, _invoke: function (t, e) {
                return t.each(function () {
                    var t;
                    return t = s.getWaypointsByElement(this), i.each(t, function (t, i) {
                        return i[e](), !0
                    })
                }), this
            }
        }, i.fn[v] = function () {
            var t, n;
            return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], p[n] ? p[n].apply(this, t) : i.isFunction(n) ? p.init.apply(this, arguments) : i.isPlainObject(n) ? p.init.apply(this, [null, n]) : n ? i.error("The " + n + " method does not exist in jQuery Waypoints.") : i.error("jQuery Waypoints needs a callback function or handler option.")
        }, i.fn[v].defaults = {
            context: n,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, d = {
            refresh: function () {
                return i.each(c, function (t, e) {
                    return e.refresh()
                })
            }, viewportHeight: function () {
                var t;
                return null != (t = n.innerHeight) ? t : o.height()
            }, aggregate: function (t) {
                var e, n, o;
                return e = a, t && (e = null != (o = c[i(t).data(u)]) ? o.waypoints : void 0), e ? (n = {
                    horizontal: [],
                    vertical: []
                }, i.each(n, function (t, o) {
                    return i.each(e[t], function (t, e) {
                        return o.push(e)
                    }), o.sort(function (t, e) {
                        return t.offset - e.offset
                    }), n[t] = i.map(o, function (t) {
                        return t.element
                    }), n[t] = i.unique(n[t])
                }), n) : []
            }, above: function (t) {
                return null == t && (t = n), d._filter(t, "vertical", function (t, e) {
                    return e.offset <= t.oldScroll.y
                })
            }, below: function (t) {
                return null == t && (t = n), d._filter(t, "vertical", function (t, e) {
                    return e.offset > t.oldScroll.y
                })
            }, left: function (t) {
                return null == t && (t = n), d._filter(t, "horizontal", function (t, e) {
                    return e.offset <= t.oldScroll.x
                })
            }, right: function (t) {
                return null == t && (t = n), d._filter(t, "horizontal", function (t, e) {
                    return e.offset > t.oldScroll.x
                })
            }, enable: function () {
                return d._invoke("enable")
            }, disable: function () {
                return d._invoke("disable")
            }, destroy: function () {
                return d._invoke("destroy")
            }, extendFn: function (t, e) {
                return p[t] = e
            }, _invoke: function (t) {
                var e;
                return e = i.extend({}, a.vertical, a.horizontal), i.each(e, function (e, i) {
                    return i[t](), !0
                })
            }, _filter: function (t, e, n) {
                var o, r;
                return (o = c[i(t).data(u)]) ? (r = [], i.each(o.waypoints[e], function (t, e) {
                    if (n(o, e))return r.push(e)
                }), r.sort(function (t, e) {
                    return t.offset - e.offset
                }), i.map(r, function (t) {
                    return t.element
                })) : []
            }
        }, i[b] = function () {
            var t, i;
            return i = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], d[i] ? d[i].apply(null, t) : d.aggregate.call(null, i)
        }, i[b].settings = {resizeThrottle: 100, scrollThrottle: 30}, o.load(function () {
            return i[b]("refresh")
        })
    })
}.call(this), jQuery(document).ready(function (t) {
    function e(e) {
        e.each(function () {
            var e = t(this), n = e.text().split(""), o = e.hasClass("is-visible");
            for (i in n)e.parents(".rotate-2").length > 0 && (n[i] = "<em>" + n[i] + "</em>"), n[i] = o ? '<i class="in">' + n[i] + "</i>" : "<i>" + n[i] + "</i>";
            var r = n.join("");
            e.html(r).css("opacity", 1)
        })
    }

    function n(e) {
        var i = c;
        e.each(function () {
            var e = t(this);
            if (e.hasClass("loading-bar")) i = h, setTimeout(function () {
                e.find(".cd-words-wrapper").addClass("is-loading")
            }, d); else if (e.hasClass("clip")) {
                var n = e.find(".cd-words-wrapper"), r = n.width() + 10;
                n.css("width", r)
            } else if (!e.hasClass("type")) {
                var s = 0;
                e.find(".cd-words-wrapper b").each(function () {
                    var e = t(this).width();
                    e > s && (s = e)
                }), e.find(".cd-words-wrapper").css("width", s)
            }
            setTimeout(function () {
                o(e.find(".is-visible").eq(0))
            }, i)
        })
    }

    function o(t) {
        var e = l(t);
        if (t.parents(".cd-headline").hasClass("type")) {
            var i = t.parent(".cd-words-wrapper");
            i.addClass("selected").removeClass("waiting"), setTimeout(function () {
                i.removeClass("selected"), t.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
            }, m), setTimeout(function () {
                r(e, f)
            }, y)
        } else if (t.parents(".cd-headline").hasClass("letters")) {
            var n = t.children("i").length >= e.children("i").length;
            s(t.find("i").eq(0), t, n, p), a(e.find("i").eq(0), e, n, p)
        } else t.parents(".cd-headline").hasClass("clip") ? t.parents(".cd-words-wrapper").animate({width: "2px"}, g, function () {
            u(t, e), r(e)
        }) : t.parents(".cd-headline").hasClass("loading-bar") ? (t.parents(".cd-words-wrapper").removeClass("is-loading"), u(t, e), setTimeout(function () {
            o(e)
        }, h), setTimeout(function () {
            t.parents(".cd-words-wrapper").addClass("is-loading")
        }, d)) : (u(t, e), setTimeout(function () {
            o(e)
        }, c))
    }

    function r(t, e) {
        t.parents(".cd-headline").hasClass("type") ? (a(t.find("i").eq(0), t, !1, e), t.addClass("is-visible").removeClass("is-hidden")) : t.parents(".cd-headline").hasClass("clip") && t.parents(".cd-words-wrapper").animate({width: t.width() + 10}, g, function () {
                setTimeout(function () {
                    o(t)
                }, v)
            })
    }

    function s(e, i, n, r) {
        if (e.removeClass("in").addClass("out"), e.is(":last-child") ? n && setTimeout(function () {
                    o(l(i))
                }, c) : setTimeout(function () {
                s(e.next(), i, n, r)
            }, r), e.is(":last-child") && t("html").hasClass("no-csstransitions")) {
            var a = l(i);
            u(i, a)
        }
    }

    function a(t, e, i, n) {
        t.addClass("in").removeClass("out"), t.is(":last-child") ? (e.parents(".cd-headline").hasClass("type") && setTimeout(function () {
            e.parents(".cd-words-wrapper").addClass("waiting")
        }, 200), i || setTimeout(function () {
            o(e)
        }, c)) : setTimeout(function () {
            a(t.next(), e, i, n)
        }, n)
    }

    function l(t) {
        return t.is(":last-child") ? t.parent().children().eq(0) : t.next()
    }

    function u(t, e) {
        t.removeClass("is-visible").addClass("is-hidden"), e.removeClass("is-hidden").addClass("is-visible")
    }

    var c = 2500, h = 3800, d = h - 3e3, p = 50, f = 150, m = 500, y = m + 800, g = 600, v = 1500;
    !function () {
        e(t(".cd-headline.letters").find("b")), n(t(".cd-headline"))
    }()
}), function (t, e, i, n) {
    var o = function (n, o) {
        this.elem = n, this.$elem = t(n), this.options = o, this.metadata = this.$elem.data("plugin-options"), this.$win = t(e), this.sections = {}, this.didScroll = !1, this.$doc = t(i), this.docHeight = this.$doc.height()
    };
    o.prototype = {
        defaults: {
            navItems: "a",
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        }, init: function () {
            return this.config = t.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", t.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", t.proxy(this.getPositions, this)), this
        }, adjustNav: function (t, e) {
            t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), e.addClass(t.config.currentClass)
        }, bindInterval: function () {
            var t, e = this;
            e.$win.on("scroll.onePageNav", function () {
                e.didScroll = !0
            }), e.t = setInterval(function () {
                t = e.$doc.height(), e.didScroll && (e.didScroll = !1, e.scrollChange()), t !== e.docHeight && (e.docHeight = t, e.getPositions())
            }, 250)
        }, getHash: function (t) {
            return t.attr("href").split("#")[1]
        }, getPositions: function () {
            var e, i, n, o = this;
            o.$nav.each(function () {
                e = o.getHash(t(this)), (n = t("#" + e)).length && (i = n.offset().top, o.sections[e] = Math.round(i))
            })
        }, getSection: function (t) {
            var e = null, i = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var n in this.sections)this.sections[n] - i < t && (e = n);
            return e
        }, handleClick: function (i) {
            var n = this, o = t(i.currentTarget), r = o.parent(), s = "#" + n.getHash(o);
            r.hasClass(n.config.currentClass) || (n.config.begin && n.config.begin(), n.adjustNav(n, r), n.unbindInterval(), n.scrollTo(s, function () {
                n.config.changeHash && (e.location.hash = s), n.bindInterval(), n.config.end && n.config.end()
            })), i.preventDefault()
        }, scrollChange: function () {
            var t, e = this.$win.scrollTop(), i = this.getSection(e);
            null !== i && ((t = this.$elem.find('a[href$="#' + i + '"]').parent()).hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)))
        }, scrollTo: function (e, i) {
            var n = t(e).offset().top - 68;
            t("html, body").animate({scrollTop: n}, this.config.scrollSpeed, this.config.easing, i)
        }, unbindInterval: function () {
            clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
        }
    }, o.defaults = o.prototype.defaults, t.fn.onePageNav = function (t) {
        return this.each(function () {
            new o(this, t).init()
        })
    }
}(jQuery, window, document), function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";
    function i(i, r, a) {
        function l(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function (t, l) {
                var u = a.data(l, i);
                if (u) {
                    var c = u[e];
                    if (c && "_" != e.charAt(0)) {
                        var h = c.apply(u, n);
                        o = void 0 === o ? h : o
                    } else s(r + " is not a valid method")
                } else s(i + " not initialized. Cannot call methods, i.e. " + r)
            }), void 0 !== o ? o : t
        }

        function u(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
            })
        }

        (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            return "string" == typeof t ? l(this, t, o.call(arguments, 1)) : (u(this, t), this)
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }

    var o = Array.prototype.slice, r = t.console, s = void 0 === r ? function () {
    } : function (t) {
        r.error(t)
    };
    return n(e || t.jQuery), i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0, o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), o = i[n += s ? 0 : 1]
            }
            return this
        }
    }, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";
    function t(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }

    function e() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < u; e++)t[l[e]] = 0;
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e)
        }
    }

    function r(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display)return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == r.boxSizing, h = 0; h < u; h++) {
                var d = l[h], p = r[d], f = parseFloat(p);
                a[d] = isNaN(f) ? 0 : f
            }
            var m = a.paddingLeft + a.paddingRight, y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom,
                b = a.borderLeftWidth + a.borderRightWidth, w = a.borderTopWidth + a.borderBottomWidth, T = c && s,
                P = t(r.width);
            !1 !== P && (a.width = P + (T ? 0 : m + b));
            var _ = t(r.height);
            return !1 !== _ && (a.height = _ + (T ? 0 : y + w)), a.innerWidth = a.width - (m + b), a.innerHeight = a.height - (y + w), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }

    var s, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = l.length, c = !1;
    return r
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = Element.prototype;
        if (t.matches)return "matches";
        if (t.matchesSelector)return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n])return n
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e)t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    }, i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length)for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t);
        return e
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t != document.body;)if (t = t.parentNode, e(t, i))return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        var o = [];
        return (t = i.makeArray(t)).forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n)return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)o.push(i[r])
            }
        }), o
    }, i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e], o = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments, r = this;
            this[o] = setTimeout(function () {
                n.apply(r, e), delete r[o]
            }, i || 100)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function (e, o) {
        i.docReady(function () {
            var r = i.toDashed(o), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"),
                l = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(l)),
                c = s + "-options", h = t.jQuery;
            u.forEach(function (t) {
                var i, r = t.getAttribute(s) || t.getAttribute(c);
                try {
                    i = r && JSON.parse(r)
                } catch (e) {
                    return void(n && n.error("Error parsing " + s + " on " + t.className + ": " + e))
                }
                var a = new e(t, i);
                h && h.data(t, o, a)
            })
        })
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";
    function i(t) {
        for (var e in t)return !1;
        return null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
    }

    var o = document.documentElement.style, r = "string" == typeof o.transition ? "transition" : "WebkitTransition",
        s = "string" == typeof o.transform ? "transform" : "WebkitTransform",
        a = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[r], l = {
            transform: s,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        }, u = n.prototype = Object.create(t.prototype);
    u.constructor = n, u._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, u.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, u.getSize = function () {
        this.size = e(this.element)
    }, u.css = function (t) {
        var e = this.element.style;
        for (var i in t)e[l[i] || i] = t[i]
    }, u.getPosition = function () {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"],
            r = this.layout.size, s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10),
            a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
        s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a
    }, u.layoutPosition = function () {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right",
            s = i ? "right" : "left", a = this.position.x + t[o];
        e[r] = this.getXValue(a), e[s] = "";
        var l = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", c = n ? "bottom" : "top",
            h = this.position.y + t[l];
        e[u] = this.getYValue(h), e[c] = "", this.css(e), this.emitEvent("layout", [this])
    }, u.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, u.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, u._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10),
            s = o === this.position.x && r === this.position.y;
        if (this.setPosition(t, e), !s || this.isTransitioning) {
            var a = t - i, l = e - n, u = {};
            u.transform = this.getTranslate(a, l), this.transition({
                to: u,
                onTransitionEnd: {transform: this.layoutPosition},
                isCleaning: !0
            })
        } else this.layoutPosition()
    }, u.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, u.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, u.moveTo = u._transitionTo, u.setPosition = function (t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, u._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
    }, u.transition = function (t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var e = this._transn;
            for (var i in t.onTransitionEnd)e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        } else this._nonTransition(t)
    };
    var c = "opacity," + function (t) {
            return t.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase()
            })
        }(s);
    u.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: c,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(a, this, !1)
        }
    }, u.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, u.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var h = {"-webkit-transform": "transform"};
    u.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn, n = h[t.propertyName] || t.propertyName;
            delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd && (e.onEnd[n].call(this), delete e.onEnd[n]), this.emitEvent("transitionEnd", [this])
        }
    }, u.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
    }, u._removeStyles = function (t) {
        var e = {};
        for (var i in t)e[i] = "";
        this.css(e)
    };
    var d = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
    return u.removeTransitionStyles = function () {
        this.css(d)
    }, u.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, u.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, u.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, u.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var t = this.layout.options, e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, u.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, u.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity)return "opacity";
        for (var i in e)return i
    }, u.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var t = this.layout.options, e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, u.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, u.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, n
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, o) {
    "use strict";
    function r(t, e) {
        var i = n.getQueryElement(t);
        if (i) {
            this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
            var o = ++h;
            this.element.outlayerGUID = o, d[o] = this, this._create(), this._getOption("initLayout") && this.layout()
        } else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
    }

    function s(t) {
        function e() {
            t.apply(this, arguments)
        }

        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t)return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
        return i.length ? (i = parseFloat(i)) * (f[n] || 1) : 0
    }

    var l = t.console, u = t.jQuery, c = function () {
    }, h = 0, d = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"}
    };
    var p = r.prototype;
    n.extend(p, e.prototype), p.option = function (t) {
        n.extend(this.options, t)
    }, p._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, p._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, p.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, p._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = new i(e[o], this);
            n.push(r)
        }
        return n
    }, p._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, p.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, p.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, p._init = p.layout, p._resetLayout = function () {
        this.getSize()
    }, p.getSize = function () {
        this.size = i(this.element)
    }, p._getMeasurement = function (t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, p.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, p._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, p._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, p._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, p._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, p.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, p._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, p._postLayout = function () {
        this.resizeContainer()
    }, p.resizeContainer = function () {
        if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, p._getContainerSize = c, p._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, p._emitCompleteOnItems = function (t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            ++s == r && i()
        }

        var o = this, r = e.length;
        if (e && r) {
            var s = 0;
            e.forEach(function (e) {
                e.once(t, n)
            })
        } else i()
    }, p.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u)if (this.$element = this.$element || u(this.element), e) {
            var o = u.Event(e);
            o.type = t, this.$element.trigger(o, i)
        } else this.$element.trigger(t, i)
    }, p.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, p.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, p.stamp = function (t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, p.unstamp = function (t) {
        (t = this._find(t)) && t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, p._find = function (t) {
        if (t)return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)
    }, p._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, p._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, p._manageStamp = c, p._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t);
        return {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        }
    }, p.handleEvent = n.handleEvent, p.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, p.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, p.onresize = function () {
        this.resize()
    }, n.debounceMethod(r, "onresize", 100), p.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, p.needsResizeLayout = function () {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth
    }, p.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, p.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, p.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, p.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, p.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, p.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, p.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, p.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t)return i
        }
    }, p.getItems = function (t) {
        var e = [];
        return (t = n.makeArray(t)).forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, p.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, p.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete d[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function (t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
        return e && d[e]
    }, r.create = function (t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var f = {ms: 1, s: 1e3};
    return r.Item = o, r
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function (t) {
    "use strict";
    function e() {
        t.Item.apply(this, arguments)
    }

    var i = e.prototype = Object.create(t.Item.prototype), n = i._create;
    i._create = function () {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
    }, i.updateSortData = function () {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData, e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this)
            }
        }
    };
    var o = i.destroy;
    return i.destroy = function () {
        o.apply(this, arguments), this.css({display: ""})
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function (t, e) {
    "use strict";
    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }

    var n = i.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (t) {
        n[t] = function () {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), n.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element);
        return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight
    }, n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
    }, n.getColumnWidth = function () {
        this.getSegmentSize("column", "Width")
    }, n.getRowHeight = function () {
        this.getSegmentSize("row", "Height")
    }, n.getSegmentSize = function (t, e) {
        var i = t + e, n = "outer" + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size["inner" + e]
        }
    }, n.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
    }, n.getSize = function () {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function (t, e) {
        function o() {
            i.apply(this, arguments)
        }

        return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++)this.colYs.push(0);
        this.maxY = 0
    }, i.prototype.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n,
            a = s && s < 1 ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1)
    }, i.prototype.getContainerWidth = function () {
        var t = this._getOption("fitWidth") ? this.element.parentNode : this.element, i = e(t);
        this.containerWidth = i && i.innerWidth
    }, i.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && e < 1 ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this._getColGroup(n), r = Math.min.apply(Math, o), s = o.indexOf(r), a = {
            x: this.columnWidth * s,
            y: r
        }, l = r + t.size.outerHeight, u = this.cols + 1 - o.length, c = 0; c < u; c++)this.colYs[s + c] = l;
        return a
    }, i.prototype._getColGroup = function (t) {
        if (t < 2)return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) {
            var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o)
        }
        return e
    }, i.prototype._manageStamp = function (t) {
        var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft") ? n.left : n.right,
            r = o + i.outerWidth, s = Math.floor(o / this.columnWidth);
        s = Math.max(0, s);
        var a = Math.floor(r / this.columnWidth);
        a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
        for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, u = s; u <= a; u++)this.colYs[u] = Math.max(l, this.colYs[u])
    }, i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {height: this.maxY};
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"), n = i.prototype, o = {_getElementOffset: !0, layout: !0, _getMeasurement: !0};
    for (var r in e.prototype)o[r] || (n[r] = e.prototype[r]);
    var s = n.measureColumns;
    n.measureColumns = function () {
        this.items = this.isotope.filteredItems, s.call(this)
    };
    var a = n._getOption;
    return n._getOption = function (t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("fitRows"), i = e.prototype;
    return i._resetLayout = function () {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var n = {x: this.x, y: this.y};
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
    }, i._getContainerSize = function () {
        return {height: this.maxY}
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("vertical", {horizontalAlignment: 0}), i = e.prototype;
    return i._resetLayout = function () {
        this.y = 0
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
        return this.y += t.size.outerHeight, {x: e, y: i}
    }, i._getContainerSize = function () {
        return {height: this.y}
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, o, r, s, a) {
        return e(t, i, n, o, r, s, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function (t, e, i, n, o, r, s) {
    function a(t, e) {
        return function (i, n) {
            for (var o = 0; o < t.length; o++) {
                var r = t[o], s = i.sortData[r], a = n.sortData[r];
                if (s > a || s < a) {
                    var l = (void 0 !== e[r] ? e[r] : e) ? 1 : -1;
                    return (s > a ? 1 : -1) * l
                }
            }
            return 0
        }
    }

    var l = t.jQuery, u = String.prototype.trim ? function (t) {
        return t.trim()
    } : function (t) {
        return t.replace(/^\s+|\s+$/g, "")
    }, c = e.create("isotope", {layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0});
    c.Item = r, c.LayoutMode = s;
    var h = c.prototype;
    h._create = function () {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in s.modes)this._initLayoutMode(t)
    }, h.reloadItems = function () {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, h._itemize = function () {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++)t[i].id = this.itemGUID++;
        return this._updateItemsSortData(t), t
    }, h._initLayoutMode = function (t) {
        var e = s.modes[t], i = this.options[t] || {};
        this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, h.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, h._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, h.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, h._init = h.arrange, h._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, h._getIsInstant = function () {
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, h._bindArrangeComplete = function () {
        function t() {
            e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
        }

        var e, i, n, o = this;
        this.once("layoutComplete", function () {
            e = !0, t()
        }), this.once("hideComplete", function () {
            i = !0, t()
        }), this.once("revealComplete", function () {
            n = !0, t()
        })
    }, h._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], o = [], r = this._getFilterTest(e), s = 0; s < t.length; s++) {
            var a = t[s];
            if (!a.isIgnored) {
                var l = r(a);
                l && i.push(a), l && a.isHidden ? n.push(a) : l || a.isHidden || o.push(a)
            }
        }
        return {matches: i, needReveal: n, needHide: o}
    }, h._getFilterTest = function (t) {
        return l && this.options.isJQueryFiltering ? function (e) {
            return l(e.element).is(t)
        } : "function" == typeof t ? function (e) {
            return t(e.element)
        } : function (e) {
            return n(e.element, t)
        }
    }, h.updateSortData = function (t) {
        var e;
        t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, h._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = d(i)
        }
    }, h._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++)t[i].updateSortData()
    };
    var d = function () {
        function t(t) {
            if ("string" != typeof t)return t;
            var i = u(t).split(" "), n = i[0], o = n.match(/^\[(.+)\]$/), r = e(o && o[1], n),
                s = c.sortDataParsers[i[1]];
            return t = s ? function (t) {
                return t && s(r(t))
            } : function (t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function (e) {
                return e.getAttribute(t)
            } : function (t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }

        return t
    }();
    c.sortDataParsers = {
        parseInt: function (t) {
            return parseInt(t, 10)
        }, parseFloat: function (t) {
            return parseFloat(t)
        }
    }, h._sort = function () {
        var t = this.options.sortBy;
        if (t) {
            var e = a([].concat.apply(t, this.sortHistory), this.options.sortAscending);
            this.filteredItems.sort(e), t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
    }, h._mode = function () {
        var t = this.options.layoutMode, e = this.modes[t];
        if (!e)throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, h._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, h._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t)
    }, h._manageStamp = function (t) {
        this._mode()._manageStamp(t)
    }, h._getContainerSize = function () {
        return this._mode()._getContainerSize()
    }, h.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
    }, h.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, h.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, h._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, h.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, o = e.length;
            for (i = 0; i < o; i++)n = e[i], this.element.appendChild(n.element);
            var r = this._filter(e).matches;
            for (i = 0; i < o; i++)e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < o; i++)delete e[i].isLayoutInstant;
            this.reveal(r)
        }
    };
    var p = h.remove;
    return h.remove = function (t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        p.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
            var r = e[n];
            o.removeFrom(this.filteredItems, r)
        }
    }, h.shuffle = function () {
        for (var t = 0; t < this.items.length; t++)this.items[t].sortData.random = Math.random();
        this.options.sortBy = "random", this._sort(), this._layout()
    }, h._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i, n
    }, h.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
            return t.element
        })
    }, c
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0, o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), o = i[n += s ? 0 : 1]
            }
            return this
        }
    }, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function (t, e) {
    function i(t, e) {
        for (var i in e)t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if ("number" == typeof t.length)for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t);
        return e
    }

    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function () {
            this.check()
        }.bind(this))) : new o(t, e, r)
    }

    function r(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }

    var a = t.jQuery, l = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && u[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {1: !0, 9: !0, 11: !0};
    return o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
            var o = n && n[2];
            o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
        }
    }, o.prototype.addImage = function (t) {
        var e = new r(t);
        this.images.push(e)
    }, o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i)
    }, o.prototype.check = function () {
        function t(t, i, n) {
            setTimeout(function () {
                e.progress(t, i, n)
            })
        }

        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, o.prototype.progress = function (t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
    }, o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, r.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) && (a = e, a.fn.imagesLoaded = function (t, e) {
            return new o(this, t, e).jqDeferred.promise(a(this))
        })
    }, o.makeJQueryPlugin(), o
});
var ytp = ytp || {}, getYTPVideoID = function (t) {
    var e, i;
    return t.indexOf("youtu.be") > 0 ? (e = t.substr(t.lastIndexOf("/") + 1, t.length), i = e.indexOf("?list=") > 0 ? e.substr(e.lastIndexOf("="), e.length) : null, e = i ? e.substr(0, e.lastIndexOf("?")) : e) : t.indexOf("http") > -1 ? (e = t.match(/[\\?&]v=([^&#]*)/)[1], i = t.indexOf("list=") > 0 ? t.match(/[\\?&]list=([^&#]*)/)[1] : null) : (e = t.length > 15 ? null : t, i = e ? null : t), {
        videoID: e,
        playlistID: i
    }
};
!function (jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "2.9.7",
        build: "5748",
        author: "Matteo Bicocchi",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 50,
            addRaster: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            gaTrack: !0,
            optimizeDisplay: !0,
            onReady: function (t) {
            }
        },
        controls: {play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y"},
        locationProtocol: "https:",
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this, $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filtersEnabled = !0, YTPlayer.filters = {
                    grayscale: {
                        value: 0,
                        unit: "%"
                    },
                    hue_rotate: {value: 0, unit: "deg"},
                    invert: {value: 0, unit: "%"},
                    opacity: {value: 0, unit: "%"},
                    saturate: {value: 0, unit: "%"},
                    sepia: {value: 0, unit: "%"},
                    brightness: {value: 0, unit: "%"},
                    contrast: {value: 0, unit: "%"},
                    blur: {value: 0, unit: "px"}
                }, $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                void 0 !== property && void 0 !== property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options, property)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function () {
                    var t = !1;
                    try {
                        self.location.href != top.location.href && (t = !0)
                    } catch (e) {
                        t = !0
                    }
                    return t
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).videoID,
                    playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).playlistID;
                YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = {
                    autoplay: 0,
                    modestbranding: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: !0,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                document.createElement("video").canPlayType && jQuery.extend(playerVars, {html5: 1}), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1);
                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox"),
                    overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay");
                if (YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = "body" == YTPlayer.opt.containment.get(0).tagName.toLowerCase(), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    if (YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide(), jQuery.browser.mobile && !YTPlayer.canPlayOnMobile)return void $YTPlayer.remove();
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                    if (wrapper.css({
                            position: "absolute",
                            zIndex: 0,
                            minWidth: "100%",
                            minHeight: "100%",
                            left: 0,
                            top: 0,
                            overflow: "hidden",
                            opacity: 0
                        }), playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden"
                        }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
                            "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                        }), YTPlayer.isBackground ? (jQuery("body").css({boxSizing: "border-box"}), wrapper.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 0
                        }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({position: "relative"}), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({opacity: 1}), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.addClass("visible")
                        }).on("mouseleave", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.removeClass("visible")
                        }), ytp.YTAPIReady) setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100); else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script><\/script>").attr({
                            src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                            id: "YTAPI"
                        });
                        jQuery("head").prepend(tag)
                    }
                    jQuery(document).on("YTAPIReady", function () {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = void 0 === YTPlayer.opt.autoPlay ? !!YTPlayer.isBackground : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
                            if (!YTPlayer.isInit) {
                                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                                    if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                        YTPlayer.opt.containment.css({maxWidth: "100%"});
                                        var h = .6 * YTPlayer.opt.containment.outerWidth();
                                        YTPlayer.opt.containment.css({maxHeight: h})
                                    }
                                    return void new YT.Player(playerID, {
                                        videoId: YTPlayer.videoID.toString(),
                                        height: "100%",
                                        width: "100%",
                                        events: {
                                            onReady: function (t) {
                                                YTPlayer.player = t.target, playerBox.css({opacity: 1}), YTPlayer.wrapper.css({opacity: 1})
                                            }
                                        }
                                    })
                                }
                                new YT.Player(playerID, {
                                    videoId: YTPlayer.videoID.toString(),
                                    playerVars: playerVars,
                                    events: {
                                        onReady: function (t) {
                                            YTPlayer.player = t.target, YTPlayer.isReady || (YTPlayer.isReady = !(YTPlayer.isPlayer && !YTPlayer.opt.autoPlay), YTPlayer.playerEl = YTPlayer.player.getIframe(), $(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).on("resize.YTP", function () {
                                                $YTPlayer.optimizeDisplay()
                                            }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                                        }, onStateChange: function (event) {
                                            if ("function" == typeof event.target.getPlayerState) {
                                                var state = event.target.getPlayerState();
                                                if (YTPlayer.state != state) {
                                                    if (YTPlayer.preventTrigger)return void(YTPlayer.preventTrigger = !1);
                                                    YTPlayer.state = state;
                                                    var eventType;
                                                    switch (state) {
                                                        case-1:
                                                            eventType = "YTPUnstarted";
                                                            break;
                                                        case 0:
                                                            eventType = "YTPEnd";
                                                            break;
                                                        case 1:
                                                            eventType = "YTPPlay", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                                            break;
                                                        case 2:
                                                            eventType = "YTPPause", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                            break;
                                                        case 3:
                                                            YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                            break;
                                                        case 5:
                                                            eventType = "YTPCued"
                                                    }
                                                    var YTPEvent = jQuery.Event(eventType);
                                                    YTPEvent.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                                }
                                            }
                                        }, onPlaybackQualityChange: function (t) {
                                            var e = t.target.getPlaybackQuality(), i = jQuery.Event("YTPQualityChange");
                                            i.quality = e, jQuery(YTPlayer).trigger(i)
                                        }, onError: function (t) {
                                            150 == t.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == t.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, t)
                                        }
                                    }
                                })
                            }
                        }))
                    })
                }
            })
        },
        getDataFromAPI: function (t) {
            if (t.videoData = jQuery.mbStorage.get("YTPlayer_data_" + t.videoID), jQuery(t).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
                    if (t.hasData && t.isPlayer && !t.opt.autoPlay) {
                        var e = t.videoData.thumb_max || t.videoData.thumb_high || t.videoData.thumb_medium;
                        t.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + e + ") center center",
                            backgroundSize: "cover"
                        }), t.opt.backgroundUrl = e
                    }
                }), t.videoData) setTimeout(function () {
                t.opt.ratio = "auto" == t.opt.ratio ? "16/9" : t.opt.ratio, t.dataReceived = !0, jQuery(t).trigger("YTPChanged");
                var e = jQuery.Event("YTPData");
                e.prop = {};
                for (var i in t.videoData)e.prop[i] = t.videoData[i];
                jQuery(t).trigger(e)
            }, 500), t.hasData = !0; else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + t.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (e) {
                t.dataReceived = !0, jQuery(t).trigger("YTPChanged"), function (e) {
                    t.videoData = {}, t.videoData.id = t.videoID, t.videoData.channelTitle = e.channelTitle, t.videoData.title = e.title, t.videoData.description = e.description.length < 400 ? e.description : e.description.substring(0, 400) + " ...", t.videoData.aspectratio = "auto" == t.opt.ratio ? "16/9" : t.opt.ratio, t.opt.ratio = t.videoData.aspectratio, t.videoData.thumb_max = e.thumbnails.maxres ? e.thumbnails.maxres.url : null, t.videoData.thumb_high = e.thumbnails.high ? e.thumbnails.high.url : null, t.videoData.thumb_medium = e.thumbnails.medium ? e.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + t.videoID, t.videoData)
                }(e.items[0].snippet), t.hasData = !0;
                var i = jQuery.Event("YTPData");
                i.prop = {};
                for (var n in t.videoData)i.prop[n] = t.videoData[n];
                jQuery(t).trigger(i)
            }); else {
                if (setTimeout(function () {
                        jQuery(t).trigger("YTPChanged")
                    }, 50), t.isPlayer && !t.opt.autoPlay) {
                    var e = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + t.videoID + "/hqdefault.jpg";
                    t.opt.containment.css({
                        background: "rgba(0,0,0,0.5) url(" + e + ") center center",
                        backgroundSize: "cover"
                    }), t.opt.backgroundUrl = e
                }
                t.videoData = null, t.opt.ratio = "auto" == t.opt.ratio ? "16/9" : t.opt.ratio
            }
            t.isPlayer && !t.opt.autoPlay && (t.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(t).append(t.loading), t.loading.fadeIn())
        },
        removeStoredData: function () {
            jQuery.mbStorage.remove()
        },
        getVideoData: function () {
            return this.get(0).videoData
        },
        getVideoID: function () {
            return this.get(0).videoID || !1
        },
        setVideoQuality: function (t) {
            var e = this.get(0);
            jQuery.browser.chrome || e.player.setPlaybackQuality(t)
        },
        playlist: function (t, e, i) {
            var n = this, o = n.get(0);
            return o.isPlayList = !0, e && (t = jQuery.shuffle(t)), o.videoID || (o.videos = t, o.videoCounter = 0, o.videoLength = t.length, jQuery(o).data("property", t[0]), jQuery(o).mb_YTPlayer()), "function" == typeof i && jQuery(o).one("YTPChanged", function () {
                i(o)
            }), jQuery(o).on("YTPEnd", function () {
                jQuery(o).playNext()
            }), n
        },
        playNext: function () {
            var t = this.get(0);
            return ++t.videoCounter >= t.videoLength && (t.videoCounter = 0), jQuery(t).changeMovie(t.videos[t.videoCounter]), this
        },
        playPrev: function () {
            var t = this.get(0);
            return --t.videoCounter < 0 && (t.videoCounter = t.videoLength - 1), jQuery(t).changeMovie(t.videos[t.videoCounter]), this
        },
        changeMovie: function (t) {
            var e = this.get(0);
            e.opt.startAt = 0, e.opt.stopAt = 0, e.opt.mute = !0, e.hasData = !1, e.hasChanged = !0, e.player.LoopTime = void 0, t && jQuery.extend(e.opt, e.defaultOpt, t), e.videoID = getYTPVideoID(e.opt.videoURL).videoID, "true" == e.opt.loop && (e.opt.loop = 9999), jQuery(e.playerEl).CSSAnimate({opacity: 0}, 200, function () {
                var t = jQuery.Event("YTPChangeMovie");
                return t.time = e.player.time, t.videoId = e.videoID, jQuery(e).trigger(t), jQuery(e).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + e.videoID), 1, e.opt.quality), jQuery.mbYTPlayer.checkForState(e), jQuery(e).optimizeDisplay(), jQuery.mbYTPlayer.getDataFromAPI(e), this
            })
        },
        getPlayer: function () {
            return jQuery(this).get(0).player
        },
        playerDestroy: function () {
            var t = this.get(0);
            return ytp.YTAPIReady = !1, ytp.backgroundIsInited = !1, t.isInit = !1, t.videoID = null, t.wrapper.remove(), jQuery("#controlBar_" + t.id).remove(), clearInterval(t.checkForStartAt), clearInterval(t.getState), this
        },
        fullscreen: function (real) {
            function hideMouse() {
                YTPlayer.overlay.css({cursor: "none"})
            }

            function RunPrefixMethod(t, e) {
                for (var i, n, o = ["webkit", "moz", "ms", "o", ""], r = 0; r < o.length && !t[i];) {
                    if (i = e, "" == o[r] && (i = i.substr(0, 1).toLowerCase() + i.substr(1)), i = o[r] + i, "undefined" != (n = typeof t[i]))return o = [o[r]], "function" == n ? t[i]() : t[i];
                    r++
                }
            }

            function launchFullscreen(t) {
                RunPrefixMethod(t, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }

            var YTPlayer = this.get(0);
            void 0 === real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id), fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
                    RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen") ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("fullscreen"), videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500), videoWrapper.css({zIndex: 0}), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), YTPlayer.overlay.css({cursor: "auto"}), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500), videoWrapper.css({zIndex: 0})), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (t) {
                YTPlayer.overlay.css({cursor: "auto"}), clearTimeout(YTPlayer.hideCursor), jQuery(t.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
            }), hideMouse(), real ? (videoWrapper.css({opacity: 0}), videoWrapper.addClass("fullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
                videoWrapper.CSSAnimate({opacity: 1}, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
            }, 500)) : videoWrapper.css({zIndex: 1e4}).CSSAnimate({opacity: 1}, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
        },
        toggleLoops: function () {
            var t = this.get(0), e = t.opt;
            return 1 == e.loop ? e.loop = 0 : (e.startAt ? t.player.seekTo(e.startAt) : t.player.playVideo(), e.loop = 1), this
        },
        play: function () {
            var t = this.get(0);
            if (t.isReady)return t.player.playVideo(), t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, 2e3), jQuery(t.playerEl).CSSAnimate({opacity: 1}, 1e3), jQuery(t).css("background-image", "none"), this
        },
        togglePlay: function (t) {
            var e = this.get(0);
            return 1 == e.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof t && t(e.state), this
        },
        stop: function () {
            var t = this.get(0);
            return jQuery("#controlBar_" + t.id).find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play), t.player.stopVideo(), this
        },
        pause: function () {
            return this.get(0).player.pauseVideo(), this
        },
        seekTo: function (t) {
            return this.get(0).player.seekTo(t, !0), this
        },
        setVolume: function (t) {
            var e = this.get(0);
            return t || e.opt.vol || 0 != e.player.getVolume() ? !t && e.player.getVolume() > 0 || t && e.opt.vol == t ? e.isMute ? jQuery(e).YTPUnmute() : jQuery(e).YTPMute() : (e.opt.vol = t, e.player.setVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(t)) : jQuery(e).YTPUnmute(), this
        },
        mute: function () {
            var t = this.get(0);
            if (!t.isMute) {
                t.player.mute(), t.isMute = !0, t.player.setVolume(0), t.volumeBar && t.volumeBar.length && t.volumeBar.width() > 10 && t.volumeBar.updateSliderVal(0), jQuery("#controlBar_" + t.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.unmute), jQuery(t).addClass("isMuted"), t.volumeBar && t.volumeBar.length && t.volumeBar.addClass("muted");
                var e = jQuery.Event("YTPMuted");
                return e.time = t.player.time, t.canTrigger && jQuery(t).trigger(e), this
            }
        },
        unmute: function () {
            var t = this.get(0);
            if (t.isMute) {
                t.player.unMute(), t.isMute = !1, t.player.setVolume(t.opt.vol), t.volumeBar && t.volumeBar.length && t.volumeBar.updateSliderVal(t.opt.vol > 10 ? t.opt.vol : 10), jQuery("#controlBar_" + t.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.mute), jQuery(t).removeClass("isMuted"), t.volumeBar && t.volumeBar.length && t.volumeBar.removeClass("muted");
                var e = jQuery.Event("YTPUnmuted");
                return e.time = t.player.time, t.canTrigger && jQuery(t).trigger(e), this
            }
        },
        applyFilter: function (t, e) {
            var i = this.get(0);
            return i.filters[t].value = e, i.filtersEnabled && this.YTPEnableFilters(), this
        },
        applyFilters: function (t) {
            var e = this.get(0);
            return this.on("YTPReady", function () {
                for (var i in t)e.filters[i].value = t[i], jQuery(e).YTPApplyFilter(i, t[i]);
                jQuery(e).trigger("YTPFiltersApplied")
            }), this
        },
        toggleFilter: function (t, e) {
            return this.each(function () {
                var i = this;
                i.filters[t].value ? i.filters[t].value = 0 : i.filters[t].value = e, i.filtersEnabled && jQuery(this).YTPEnableFilters()
            })
        },
        toggleFilters: function (t) {
            return this.each(function () {
                var e = this;
                e.filtersEnabled ? (jQuery(e).trigger("YTPDisableFilters"), jQuery(e).YTPDisableFilters()) : (jQuery(e).YTPEnableFilters(), jQuery(e).trigger("YTPEnableFilters")), "function" == typeof t && t(e.filtersEnabled)
            })
        },
        disableFilters: function () {
            return this.each(function () {
                var t = this, e = jQuery(t.playerEl);
                e.css("-webkit-filter", ""), e.css("filter", ""), t.filtersEnabled = !1
            })
        },
        enableFilters: function () {
            return this.each(function () {
                var t = this, e = jQuery(t.playerEl), i = "";
                for (var n in t.filters)t.filters[n].value && (i += n.replace("_", "-") + "(" + t.filters[n].value + t.filters[n].unit + ") ");
                e.css("-webkit-filter", i), e.css("filter", i), t.filtersEnabled = !0
            })
        },
        removeFilter: function (t, e) {
            return this.each(function () {
                "function" == typeof t && (e = t, t = null);
                var i = this;
                if (t) jQuery(this).YTPApplyFilter(t, 0), "function" == typeof e && e(t); else for (var n in i.filters)jQuery(this).YTPApplyFilter(n, 0), "function" == typeof e && e(n)
            })
        },
        manageProgress: function () {
            var t = this.get(0), e = jQuery("#controlBar_" + t.id), i = e.find(".mb_YTPProgress"),
                n = e.find(".mb_YTPLoaded"), o = e.find(".mb_YTPseekbar"), r = i.outerWidth(),
                s = Math.floor(t.player.getCurrentTime()), a = Math.floor(t.player.getDuration()), l = s * r / a,
                u = 100 * t.player.getVideoLoadedFraction();
            return n.css({left: 0, width: u + "%"}), o.css({left: 0, width: l}), {totalTime: a, currentTime: s}
        },
        buildControls: function (YTPlayer) {
            var data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                    whiteSpace: "noWrap",
                    position: YTPlayer.isBackground ? "fixed" : "absolute",
                    zIndex: YTPlayer.isBackground ? 1e4 : 1e3
                }).hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
                        1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
                    }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
                        0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
                    }), volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({display: "inline-block"});
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"), vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                        window.open(vURL, "viewOnYT")
                    }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                        jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
                    }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (t) {
                        timeBar.css({width: t.clientX - timeBar.offset().left}), YTPlayer.timeW = t.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0});
                        var e = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer.goto = timeBar.outerWidth() * e / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0})
                    }), loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                    initialval: YTPlayer.opt.vol,
                    scale: 100,
                    orientation: "h",
                    callback: function (t) {
                        0 == t.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(t.value), YTPlayer.isMute || (YTPlayer.opt.vol = t.value)
                    }
                })
            }
        },
        checkForState: function (YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 400;
            return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
                var prog = jQuery(YTPlayer).YTPManageProgress(), $YTPlayer = jQuery(YTPlayer), data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1,
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.player.time != prog.currentTime) {
                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPEvent)
                }
                if (YTPlayer.player.time = prog.currentTime, 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded)return;
                    if (YTPlayer.isEnded = !0, setTimeout(function () {
                            YTPlayer.isEnded = !1
                        }, 1e3), YTPlayer.isPlayList) {
                        if (!data.loop || data.loop > 0 && YTPlayer.player.LoopTime === data.loop - 1) {
                            YTPlayer.player.LoopTime = void 0, clearInterval(YTPlayer.getState);
                            var YTPEnd = jQuery.Event("YTPEnd");
                            return YTPEnd.time = YTPlayer.player.time, void jQuery(YTPlayer).trigger(YTPEnd)
                        }
                    } else if (!data.loop || data.loop > 0 && YTPlayer.player.LoopTime === data.loop - 1)return YTPlayer.player.LoopTime = void 0, YTPlayer.preventTrigger = !0, $(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({opacity: 0}, 1e3, function () {
                        var t = jQuery.Event("YTPEnd");
                        t.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(t), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
                            backgroundSize: "cover"
                        })
                    });
                    YTPlayer.player.LoopTime = YTPlayer.player.LoopTime ? ++YTPlayer.player.LoopTime : 1, startAt = startAt || 1, YTPlayer.player.pauseVideo(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
                }
            }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
        },
        checkForStart: function (t) {
            var e = jQuery(t);
            if (jQuery.contains(document, t)) {
                if (jQuery.browser.chrome && (t.opt.quality = "default"), jQuery(t).muteYTPVolume(), jQuery("#controlBar_" + t.id).remove(), t.opt.showControls && jQuery.mbYTPlayer.buildControls(t), t.opt.addRaster) {
                    var i = "dot" == t.opt.addRaster ? "raster-dot" : "raster";
                    t.overlay.addClass(t.isRetina ? i + " retina" : i)
                } else t.overlay.removeClass(function (t, e) {
                    var i = e.split(" "), n = [];
                    return jQuery.each(i, function (t, e) {
                        /raster.*/.test(e) && n.push(e)
                    }), n.push("retina"), n.join(" ")
                });
                t.checkForStartAt = setInterval(function () {
                    jQuery(t).YTPMute();
                    var i = t.opt.startAt ? t.opt.startAt : 1,
                        n = t.player.getVideoLoadedFraction() > i / t.player.getDuration();
                    if (t.player.getDuration() > 0 && t.player.getCurrentTime() >= i && n) {
                        clearInterval(t.checkForStartAt), t.isReady = !0, "function" == typeof t.opt.onReady && t.opt.onReady(t);
                        var o = jQuery.Event("YTPReady");
                        if (o.time = t.player.time, jQuery(t).trigger(o), t.opt.mute || jQuery(t).YTPUnmute(), t.canTrigger = !0, t.opt.autoPlay) {
                            e.YTPPlay();
                            var r = jQuery.Event("YTPStart");
                            r.time = t.player.time, jQuery(t).trigger(r), e.css("background-image", "none"), jQuery(t.playerEl).CSSAnimate({opacity: 1}, 1e3), t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, 1e3)
                        } else t.player.pauseVideo(), t.isPlayer || (jQuery(t.playerEl).CSSAnimate({opacity: 1}, 1e3), t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, 1e3));
                        t.isPlayer && !t.opt.autoPlay && (t.loading.html("Ready"), setTimeout(function () {
                            t.loading.fadeOut()
                        }, 100)), t.controlBar && t.controlBar.slideDown(1e3)
                    } else i >= 0 && t.player.seekTo(i, !0)
                }, 1e3)
            } else jQuery(t).YTPPlayerDestroy()
        },
        formatTime: function (t) {
            var e = Math.floor(t / 60), i = Math.floor(t - 60 * e);
            return (9 >= e ? "0" + e : e) + " : " + (9 >= i ? "0" + i : i)
        }
    }, jQuery.fn.toggleVolume = function () {
        var t = this.get(0);
        if (t)return t.player.isMuted() ? (jQuery(t).YTPUnmute(), !0) : (jQuery(t).YTPMute(), !1)
    }, jQuery.fn.optimizeDisplay = function () {
        var t = this.get(0), e = t.opt, i = jQuery(t.playerEl), n = {}, o = t.wrapper;
        n.width = o.outerWidth(), n.height = o.outerHeight();
        var r = 100, s = {};
        e.optimizeDisplay ? (s.width = n.width + 24 * n.width / 100, s.height = "16/9" == e.ratio ? Math.ceil(9 * n.width / 16) : Math.ceil(3 * n.width / 4), s.marginTop = -(s.height - n.height) / 2, s.marginLeft = -12 * n.width / 100, s.height < n.height && (s.height = n.height + 24 * n.height / 100, s.width = "16/9" == e.ratio ? Math.floor(16 * n.height / 9) : Math.floor(4 * n.height / 3), s.marginTop = -12 * n.height / 100, s.marginLeft = -(s.width - n.width) / 2), s.width += r, s.height += r, s.marginTop -= 50, s.marginLeft -= 50) : (s.width = "100%", s.height = "100%", s.marginTop = 0, s.marginLeft = 0), i.css({
            width: s.width,
            height: s.height,
            marginTop: s.marginTop,
            marginLeft: s.marginLeft
        })
    }, jQuery.shuffle = function (t) {
        for (var e = t.slice(), i = e.length, n = i; n--;) {
            var o = parseInt(Math.random() * i), r = e[n];
            e[n] = e[o], e[o] = r
        }
        return e
    }, jQuery.fn.unselectable = function () {
        return this.each(function () {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on")
        })
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
    var t = (document.body || document.documentElement).style;
    return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
        blur: {min: 0, max: 100, unit: "px"},
        brightness: {min: 0, max: 400, unit: "%"},
        contrast: {min: 0, max: 400, unit: "%"},
        grayscale: {min: 0, max: 100, unit: "%"},
        hueRotate: {min: 0, max: 360, unit: "deg"},
        invert: {min: 0, max: 100, unit: "%"},
        saturate: {min: 0, max: 400, unit: "%"},
        sepia: {min: 0, max: 100, unit: "%"}
    },
    normalizeCss: function (t) {
        var e = jQuery.extend(!0, {}, t);
        jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
        for (var i in e) {
            "transform" === i && (e[jQuery.CSS.sfx + "transform"] = e[i], delete e[i]), "transform-origin" === i && (e[jQuery.CSS.sfx + "transform-origin"] = t[i], delete e[i]), "filter" !== i || jQuery.browser.mozilla || (e[jQuery.CSS.sfx + "filter"] = t[i], delete e[i]), "blur" === i && setFilter(e, "blur", t[i]), "brightness" === i && setFilter(e, "brightness", t[i]), "contrast" === i && setFilter(e, "contrast", t[i]), "grayscale" === i && setFilter(e, "grayscale", t[i]), "hueRotate" === i && setFilter(e, "hueRotate", t[i]), "invert" === i && setFilter(e, "invert", t[i]), "saturate" === i && setFilter(e, "saturate", t[i]), "sepia" === i && setFilter(e, "sepia", t[i]);
            var n = "";
            "x" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " translateX(" + setUnit(t[i], "px") + ")", delete e[i]), "y" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " translateY(" + setUnit(t[i], "px") + ")", delete e[i]), "z" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " translateZ(" + setUnit(t[i], "px") + ")", delete e[i]), "rotate" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotate(" + setUnit(t[i], "deg") + ")", delete e[i]), "rotateX" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotateX(" + setUnit(t[i], "deg") + ")", delete e[i]), "rotateY" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotateY(" + setUnit(t[i], "deg") + ")", delete e[i]), "rotateZ" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotateZ(" + setUnit(t[i], "deg") + ")", delete e[i]), "scale" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scale(" + setUnit(t[i], "") + ")", delete e[i]), "scaleX" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scaleX(" + setUnit(t[i], "") + ")", delete e[i]), "scaleY" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scaleY(" + setUnit(t[i], "") + ")", delete e[i]), "scaleZ" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scaleZ(" + setUnit(t[i], "") + ")", delete e[i]), "skew" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " skew(" + setUnit(t[i], "deg") + ")", delete e[i]), "skewX" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " skewX(" + setUnit(t[i], "deg") + ")", delete e[i]), "skewY" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " skewY(" + setUnit(t[i], "deg") + ")", delete e[i]), "perspective" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " perspective(" + setUnit(t[i], "px") + ")", delete e[i])
        }
        return e
    },
    getProp: function (t) {
        var e = [];
        for (var i in t)e.indexOf(i) < 0 && e.push(uncamel(i));
        return e.join(",")
    },
    animate: function (t, e, i, n, o) {
        return this.each(function () {
            function r() {
                s.called = !0, s.CSSAIsRunning = !1, a.off(jQuery.CSS.transitionEnd + "." + s.id), clearTimeout(s.timeout), a.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof o && o.apply(s), "function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)
            }

            var s = this, a = jQuery(this);
            s.id = s.id || "CSSA_" + (new Date).getTime();
            var l = l || {type: "noEvent"};
            if (s.CSSAIsRunning && s.eventType == l.type && !jQuery.browser.msie && jQuery.browser.version <= 9) s.CSSqueue = function () {
                a.CSSAnimate(t, e, i, n, o)
            }; else if (s.CSSqueue = null, s.eventType = l.type, 0 !== a.length && t) {
                if (t = jQuery.normalizeCss(t), s.CSSAIsRunning = !0, "function" == typeof e && (o = e, e = jQuery.fx.speeds._default), "function" == typeof i && (n = i, i = 0), "string" == typeof i && (o = i, i = 0), "function" == typeof n && (o = n, n = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof e)for (var u in jQuery.fx.speeds) {
                    if (e == u) {
                        e = jQuery.fx.speeds[u];
                        break
                    }
                    e = jQuery.fx.speeds._default
                }
                if (e || (e = jQuery.fx.speeds._default), "string" == typeof o && (n = o, o = null), !jQuery.support.CSStransition) {
                    for (var c in t) {
                        if ("transform" === c && delete t[c], "filter" === c && delete t[c], "transform-origin" === c && delete t[c], "auto" === t[c] && delete t[c], "x" === c) {
                            h = t[c];
                            t[d = "left"] = h, delete t[c]
                        }
                        if ("y" === c) {
                            var h = t[c], d = "top";
                            t[d] = h, delete t[c]
                        }
                        ("-ms-transform" === c || "-ms-filter" === c) && delete t[c]
                    }
                    return void a.delay(i).animate(t, e, o)
                }
                var p = {
                    default: "ease",
                    in: "ease-in",
                    out: "ease-out",
                    "in-out": "ease-in-out",
                    snap: "cubic-bezier(0,1,.5,1)",
                    easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                    easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                    easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                    easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                    easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                    easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                    easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                    easeInOutExpo: "cubic-bezier(1,0,0,1)",
                    easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                    easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                    easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                    easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                    easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                    easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                    easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                    easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                    easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                    easeInSine: "cubic-bezier(.47,0,.745,.715)",
                    easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                    easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                    easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                    easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                    easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                };
                p[n] && (n = p[n]), a.off(jQuery.CSS.transitionEnd + "." + s.id);
                var f = jQuery.CSS.getProp(t), m = {};
                jQuery.extend(m, t), m[jQuery.CSS.sfx + "transition-property"] = f, m[jQuery.CSS.sfx + "transition-duration"] = e + "ms", m[jQuery.CSS.sfx + "transition-delay"] = i + "ms", m[jQuery.CSS.sfx + "transition-timing-function"] = n, setTimeout(function () {
                    a.one(jQuery.CSS.transitionEnd + "." + s.id, r), a.css(m)
                }, 1), s.timeout = setTimeout(function () {
                    return s.called || !o ? (s.called = !1, void(s.CSSAIsRunning = !1)) : (a.css(jQuery.CSS.sfx + "transition", ""), o.apply(s), s.CSSAIsRunning = !1, void("function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)))
                }, e + i + 10)
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (t) {
    return this.each(function () {
        var e = jQuery(this), i = jQuery.normalizeCss(t);
        e.css(i)
    })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3, end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else-1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
    -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), function (t) {
    /iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());
    var e = "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1;
    t.simpleSlider = {
        defaults: {initialval: 0, scale: 100, orientation: "h", readonly: !1, callback: !1},
        events: {
            start: e ? "touchstart" : "mousedown",
            end: e ? "touchend" : "mouseup",
            move: e ? "touchmove" : "mousemove"
        },
        init: function (i) {
            return this.each(function () {
                var n = this, o = t(n);
                o.addClass("simpleSlider"), n.opt = {}, t.extend(n.opt, t.simpleSlider.defaults, i), t.extend(n.opt, o.data());
                var r = "h" == n.opt.orientation ? "horizontal" : "vertical",
                    s = t("<div/>").addClass("level").addClass(r);
                o.prepend(s), n.level = s, o.css({cursor: "default"}), "auto" == n.opt.scale && (n.opt.scale = t(n).outerWidth()), o.updateSliderVal(), n.opt.readonly || (o.on(t.simpleSlider.events.start, function (t) {
                    e && (t = t.changedTouches[0]), n.canSlide = !0, o.updateSliderVal(t), o.css({cursor: "col-resize"}), t.preventDefault(), t.stopPropagation()
                }), t(document).on(t.simpleSlider.events.move, function (i) {
                    e && (i = i.changedTouches[0]), n.canSlide && (t(document).css({cursor: "default"}), o.updateSliderVal(i), i.preventDefault(), i.stopPropagation())
                }).on(t.simpleSlider.events.end, function () {
                    t(document).css({cursor: "auto"}), n.canSlide = !1, o.css({cursor: "auto"})
                }))
            })
        },
        updateSliderVal: function (e) {
            function i(t, e) {
                return Math.floor(100 * t / e)
            }

            var n = this, o = n.get(0);
            o.opt.initialval = "number" == typeof o.opt.initialval ? o.opt.initialval : o.opt.initialval(o);
            var r = t(o).outerWidth(), s = t(o).outerHeight();
            o.x = "object" == typeof e ? e.clientX + document.body.scrollLeft - n.offset().left : "number" == typeof e ? e * r / o.opt.scale : o.opt.initialval * r / o.opt.scale, o.y = "object" == typeof e ? e.clientY + document.body.scrollTop - n.offset().top : "number" == typeof e ? (o.opt.scale - o.opt.initialval - e) * s / o.opt.scale : o.opt.initialval * s / o.opt.scale, o.y = n.outerHeight() - o.y, o.scaleX = o.x * o.opt.scale / r, o.scaleY = o.y * o.opt.scale / s, o.outOfRangeX = o.scaleX > o.opt.scale ? o.scaleX - o.opt.scale : o.scaleX < 0 ? o.scaleX : 0, o.outOfRangeY = o.scaleY > o.opt.scale ? o.scaleY - o.opt.scale : o.scaleY < 0 ? o.scaleY : 0, o.outOfRange = "h" == o.opt.orientation ? o.outOfRangeX : o.outOfRangeY, o.value = void 0 !== e ? "h" == o.opt.orientation ? o.x >= n.outerWidth() ? o.opt.scale : o.x <= 0 ? 0 : o.scaleX : o.y >= n.outerHeight() ? o.opt.scale : o.y <= 0 ? 0 : o.scaleY : "h" == o.opt.orientation ? o.scaleX : o.scaleY, "h" == o.opt.orientation ? o.level.width(i(o.x, r) + "%") : o.level.height(i(o.y, s)), "function" == typeof o.opt.callback && o.opt.callback(o)
        }
    }, t.fn.simpleSlider = t.simpleSlider.init, t.fn.updateSliderVal = t.simpleSlider.updateSliderVal
}(jQuery), function (t) {
    t.mbCookie = {
        set: function (t, e, i, n) {
            e = JSON.stringify(e), i || (i = 7), n = n ? "; domain=" + n : "";
            var o, r = new Date;
            r.setTime(r.getTime() + 864e5 * i), o = "; expires=" + r.toGMTString(), document.cookie = t + "=" + e + o + "; path=/" + n
        }, get: function (t) {
            for (var e = t + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                for (var o = i[n]; " " == o.charAt(0);)o = o.substring(1, o.length);
                if (0 == o.indexOf(e))return JSON.parse(o.substring(e.length, o.length))
            }
            return null
        }, remove: function (e) {
            t.mbCookie.set(e, "", -1)
        }
    }, t.mbStorage = {
        set: function (t, e) {
            e = JSON.stringify(e), localStorage.setItem(t, e)
        }, get: function (t) {
            return localStorage[t] ? JSON.parse(localStorage[t]) : null
        }, remove: function (t) {
            t ? localStorage.removeItem(t) : localStorage.clear()
        }
    }
}(jQuery), function () {
    var t, e, i, n, o, r = function (t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }, s = [].indexOf || function (t) {
            for (var e = 0, i = this.length; i > e; e++)if (e in this && this[e] === t)return e;
            return -1
        };
    e = function () {
        function t() {
        }

        return t.prototype.extend = function (t, e) {
            var i, n;
            for (i in e)n = e[i], null == t[i] && (t[i] = n);
            return t
        }, t.prototype.isMobile = function (t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function (t, e, i, n) {
            var o;
            return null == e && (e = !1), null == i && (i = !1), null == n && (n = null), null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, i, n) : null != document.createEventObject ? (o = document.createEventObject(), o.eventType = t) : o.eventName = t, o
        }, t.prototype.emitEvent = function (t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function (t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }, t.prototype.removeEvent = function (t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }, t.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
            function t() {
                this.keys = [], this.values = []
            }

            return t.prototype.get = function (t) {
                var e, i, n, o;
                for (e = i = 0, n = (o = this.keys).length; n > i; e = ++i)if (o[e] === t)return this.values[e]
            }, t.prototype.set = function (t, e) {
                var i, n, o, r;
                for (i = n = 0, o = (r = this.keys).length; o > n; i = ++n)if (r[i] === t)return void(this.values[i] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
            function t() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }

            return t.notSupported = !0, t.prototype.observe = function () {
            }, t
        }()), n = this.getComputedStyle || function (t) {
            return this.getPropertyValue = function (e) {
                var i;
                return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function (t, e) {
                    return e.toUpperCase()
                }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
            }, this
        }, o = /(\-([a-z]){1})/g, this.WOW = function () {
        function o(t) {
            null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }

        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        }, o.prototype.init = function () {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function () {
            var e, i, n, o;
            if (this.stopped = !1, this.boxes = function () {
                    var t, i, n, o;
                    for (o = [], t = 0, i = (n = this.element.querySelectorAll("." + this.config.boxClass)).length; i > t; t++)e = n[t], o.push(e);
                    return o
                }.call(this), this.all = function () {
                    var t, i, n, o;
                    for (o = [], t = 0, i = (n = this.boxes).length; i > t; t++)e = n[t], o.push(e);
                    return o
                }.call(this), this.boxes.length)if (this.disabled()) this.resetStyle(); else for (o = this.boxes, i = 0, n = o.length; n > i; i++)e = o[i], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
                return function (e) {
                    var i, n, o, r, s;
                    for (s = [], i = 0, n = e.length; n > i; i++)r = e[i], s.push(function () {
                        var t, e, i, n;
                        for (n = [], t = 0, e = (i = r.addedNodes || []).length; e > t; t++)o = i[t], n.push(this.doSync(o));
                        return n
                    }.call(t));
                    return s
                }
            }(this)).observe(document.body, {childList: !0, subtree: !0}) : void 0
        }, o.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function () {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function (t) {
            var e, i, n, o, r;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (r = [], i = 0, n = (o = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; n > i; i++)e = o[i], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }, o.prototype.show = function (t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, o.prototype.applyStyle = function (t, e) {
            var i, n, o;
            return n = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function (r) {
                return function () {
                    return r.customStyle(t, e, n, i, o)
                }
            }(this))
        }, o.prototype.animate = function () {
            return "requestAnimationFrame" in window ? function (t) {
                return window.requestAnimationFrame(t)
            } : function (t) {
                return t()
            }
        }(), o.prototype.resetStyle = function () {
            var t, e, i, n, o;
            for (o = [], e = 0, i = (n = this.boxes).length; i > e; e++)t = n[e], o.push(t.style.visibility = "visible");
            return o
        }, o.prototype.resetAnimation = function (t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, o.prototype.customStyle = function (t, e, i, n, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {animationDuration: i}), n && this.vendorSet(t.style, {animationDelay: n}), o && this.vendorSet(t.style, {animationIterationCount: o}), this.vendorSet(t.style, {animationName: e ? "none" : this.cachedAnimationName(t)}), t
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function (t, e) {
            var i, n, o, r;
            n = [];
            for (i in e)o = e[i], t["" + i] = o, n.push(function () {
                var e, n, s, a;
                for (a = [], e = 0, n = (s = this.vendors).length; n > e; e++)r = s[e], a.push(t["" + r + i.charAt(0).toUpperCase() + i.substr(1)] = o);
                return a
            }.call(this));
            return n
        }, o.prototype.vendorCSS = function (t, e) {
            var i, o, r, s, a, l;
            for (s = (a = n(t)).getPropertyCSSValue(e), i = 0, o = (r = this.vendors).length; o > i; i++)l = r[i], s = s || a.getPropertyCSSValue("-" + l + "-" + e);
            return s
        }, o.prototype.animationName = function (t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = n(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, o.prototype.cacheAnimationName = function (t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, o.prototype.cachedAnimationName = function (t) {
            return this.animationNameCache.get(t)
        }, o.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function () {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var e, i, n, o;
                for (o = [], e = 0, i = (n = this.boxes).length; i > e; e++)(t = n[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function (t) {
            for (var e; void 0 === t.offsetTop;)t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;)e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function (t) {
            var e, i, n, o, r;
            return i = t.getAttribute("data-wow-offset") || this.config.offset, r = window.pageYOffset, o = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, n = this.offsetTop(t), e = n + t.clientHeight, o >= n && e >= r
        }, o.prototype.util = function () {
            return null != this._util ? this._util : this._util = new e
        }, o.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}.call(this), function (t) {
    t.fn.barfiller = function (e) {
        var i, n, o = t.extend({barColor: "#16b597", tooltip: !0, duration: 1e3, animateOnResize: !0, symbol: "%"}, e),
            r = t(this), s = t.extend(o, e), a = r.width(), l = r.find(".fill"), u = r.find(".tip"),
            c = l.attr("data-percentage"), h = !1, d = {
                init: function () {
                    return this.each(function () {
                        d.getTransitionSupport() && (h = !0, n = d.getTransitionPrefix()), d.appendHTML(), d.setEventHandlers(), d.initializeItems()
                    })
                }, appendHTML: function () {
                    l.css("background", s.barColor), s.tooltip || u.css("display", "none"), u.text(c + s.symbol)
                }, setEventHandlers: function () {
                    s.animateOnResize && t(window).on("resize", function (t) {
                        clearTimeout(i), i = setTimeout(function () {
                            d.refill()
                        }, 300)
                    })
                }, initializeItems: function () {
                    var t = d.calculateFill(c);
                    r.find(".tipWrap").css({display: "inline"}), h ? d.transitionFill(t) : d.animateFill(t)
                }, getTransitionSupport: function () {
                    var t = (document.body || document.documentElement).style;
                    return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition
                }, getTransitionPrefix: function () {
                    return /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()) ? "-moz-transition" : /webkit/.test(navigator.userAgent.toLowerCase()) ? "-webkit-transition" : /opera/.test(navigator.userAgent.toLowerCase()) ? "-o-transition" : /msie/.test(navigator.userAgent.toLowerCase()) ? "-ms-transition" : "transition"
                }, getTransition: function (t, e, i) {
                    var o;
                    return "width" === i ? o = {width: t} : "left" === i && (o = {left: t}), e /= 1e3, o[n] = i + " " + e + "s ease-in-out", o
                }, refill: function () {
                    l.css("width", 0), u.css("left", 0), a = r.width(), d.initializeItems()
                }, calculateFill: function (t) {
                    return a * (t *= .01)
                }, transitionFill: function (t) {
                    var e = t - u.width();
                    l.css(d.getTransition(t, s.duration, "width")), u.css(d.getTransition(e, s.duration, "left"))
                }, animateFill: function (t) {
                    var e = t - u.width();
                    l.stop().animate({width: "+=" + t}, s.duration), u.stop().animate({left: "+=" + e}, s.duration)
                }
            };
        return d[e] ? d[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error('Method "' + method + '" does not exist in barfiller plugin!') : d.init.apply(this)
    }
}(jQuery), $(function () {
    var t = $("#main_contact_form"), e = $("#success_fail_info");
    $(t).submit(function (i) {
        i.preventDefault();
        var n = $(t).serialize();
        $.ajax({type: "POST", url: $(t).attr("action"), data: n}).done(function (t) {
            $(e).removeClass("error"), $(e).addClass("success"), $(e).text("Thanks! Message has been sent."), $("#name").val(""), $("#email").val(""), $("#message").val("")
        }).fail(function (t) {
            $(e).removeClass("success"), $(e).addClass("error"), "" !== t.responseText ? $(e).text(t.responseText) : $(e).text("Oops! An error occured.")
        })
    })
}), function (t) {
    "use strict";
    var e = {
        initialize: function () {
            this.event(), this.hoverDropdown(), this.navbarSticky(), this.navbarScrollspy()
        }, event: function () {
            var e = t("nav.navbar.bootsnav");
            if (e.hasClass("navbar-sticky") && e.wrap("<div class='wrap-sticky'></div>"), e.hasClass("brand-center")) {
                var i = [], n = t("nav.brand-center"), o = n.find("ul.navbar-nav");
                n.prepend("<span class='storage-name' style='display:none;'></span>"), n.find("ul.navbar-nav > li").each(function () {
                    if (t(this).hasClass("active")) {
                        var e = t("a", this).eq(0).text();
                        t(".storage-name").html(e)
                    }
                    i.push(t(this).html())
                });
                var r = i.splice(0, Math.round(i.length / 2)), s = i, a = "", l = function (t) {
                    a = "";
                    for (var e = 0; e < t.length; e++)a += "<li>" + t[e] + "</li>"
                };
                l(r), o.html(a), n.find("ul.nav").first().addClass("navbar-left"), l(s), o.after('<ul class="nav navbar-nav"></ul>').next().html(a), n.find("ul.nav").last().addClass("navbar-right"), n.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>"), n.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>"), n.find("ul.navbar-nav > li").each(function () {
                    var e = t("ul.dropdown-menu", this), i = t("ul.megamenu-content", this);
                    e.closest("li").addClass("dropdown"), i.closest("li").addClass("megamenu-fw")
                });
                var u = t(".storage-name").html();
                "" == !u && t("ul.navbar-nav > li:contains('" + u + "')").addClass("active")
            }
            e.hasClass("navbar-sidebar") ? (t("body").addClass("wrap-nav-sidebar"), e.wrapInner("<div class='scroller'></div>")) : t(".bootsnav").addClass("on"), e.find("ul.nav").hasClass("navbar-center") && e.addClass("menu-center"), e.hasClass("navbar-full") ? (t("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>"), t(".wrap-full-menu").wrap("<div class='nav-full'></div>"), t("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>")) : e.hasClass("navbar-mobile") ? e.removeClass("no-full") : e.addClass("no-full"), e.hasClass("navbar-mobile") && (t(".navbar-collapse").on("shown.bs.collapse", function () {
                t("body").addClass("side-right")
            }), t(".navbar-collapse").on("hide.bs.collapse", function () {
                t("body").removeClass("side-right")
            }), t(window).on("resize", function () {
                t("body").removeClass("side-right")
            })), e.hasClass("no-background") && t(window).on("scroll", function () {
                t(window).scrollTop() > 34 ? t(".navbar-fixed").removeClass("no-background") : t(".navbar-fixed").addClass("no-background")
            }), e.hasClass("navbar-transparent") && t(window).on("scroll", function () {
                t(window).scrollTop() > 34 ? t(".navbar-fixed").removeClass("navbar-transparent") : t(".navbar-fixed").addClass("navbar-transparent")
            }), t(".btn-cart").on("click", function (t) {
                t.stopPropagation()
            }), t("nav.navbar.bootsnav .attr-nav").each(function () {
                t("li.search > a", this).on("click", function (e) {
                    e.preventDefault(), t(".top-search").slideToggle()
                })
            }), t(".input-group-addon.close-search").on("click", function () {
                t(".top-search").slideUp()
            }), t("nav.navbar.bootsnav .attr-nav").each(function () {
                t("li.side-menu > a", this).on("click", function (e) {
                    e.preventDefault(), t("nav.navbar.bootsnav > .side").toggleClass("on"), t("body").toggleClass("on-side")
                })
            }), t(".side .close-side").on("click", function (e) {
                e.preventDefault(), t("nav.navbar.bootsnav > .side").removeClass("on"), t("body").removeClass("on-side")
            }), t("body").wrapInner("<div class='wrapper'></div>")
        }, hoverDropdown: function () {
            var e = t("nav.navbar.bootsnav"), i = t(window).width(), n = t(window).height(),
                o = e.find("ul.nav").data("in"), r = e.find("ul.nav").data("out");
            if (i < 991) {
                t(".scroller").css("height", "auto"), t("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter"), t("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave"), t("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter"), t("nav.navbar.bootsnav ul.nav").off("mouseleave"), t(".navbar-collapse").removeClass("animated"), t("nav.navbar.bootsnav ul.nav").each(function () {
                    t(".dropdown-menu", this).addClass("animated"), t(".dropdown-menu", this).removeClass(r), t("a.dropdown-toggle", this).off("click"), t("a.dropdown-toggle", this).on("click", function (e) {
                        return e.stopPropagation(), t(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(o), t(this).closest("li.dropdown").first().toggleClass("on"), !1
                    }), t("li.dropdown", this).each(function () {
                        return t(this).find(".dropdown-menu").stop().fadeOut(), t(this).on("hidden.bs.dropdown", function () {
                            t(this).find(".dropdown-menu").stop().fadeOut()
                        }), !1
                    }), t(".megamenu-fw", this).each(function () {
                        t(".col-menu", this).each(function () {
                            t(".content", this).addClass("animated"), t(".content", this).stop().fadeOut(), t(".title", this).off("click"), t(".title", this).on("click", function () {
                                return t(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass(o), t(this).closest(".col-menu").toggleClass("on"), !1
                            }), t(".content", this).on("click", function (t) {
                                t.stopPropagation()
                            })
                        })
                    })
                });
                var s = function () {
                    t("li.dropdown", this).removeClass("on"), t(".dropdown-menu", this).stop().fadeOut(), t(".dropdown-menu", this).removeClass(o), t(".col-menu", this).removeClass("on"), t(".col-menu .content", this).stop().fadeOut(), t(".col-menu .content", this).removeClass(o)
                };
                t("nav.navbar.bootsnav").on("mouseleave", function () {
                    s()
                }), t("nav.navbar.bootsnav .attr-nav").each(function () {
                    t(".dropdown-menu", this).removeClass("animated"), t("li.dropdown", this).off("mouseenter"), t("li.dropdown", this).off("mouseleave"), t("a.dropdown-toggle", this).off("click"), t("a.dropdown-toggle", this).on("click", function (e) {
                        e.stopPropagation(), t(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle(), t(".navbar-toggle").each(function () {
                            t(".fa", this).removeClass("fa-times"), t(".fa", this).addClass("fa-bars"), t(".navbar-collapse").removeClass("in"), t(".navbar-collapse").removeClass("on")
                        })
                    }), t(this).on("mouseleave", function () {
                        return t(".dropdown-menu", this).stop().fadeOut(), t("li.dropdown", this).removeClass("on"), !1
                    })
                }), t(".navbar-toggle").each(function () {
                    t(this).off("click"), t(this).on("click", function () {
                        t(".fa", this).toggleClass("fa-bars"), t(".fa", this).toggleClass("fa-times"), s()
                    })
                })
            } else i > 991 && (t(".scroller").css("height", n + "px"), e.hasClass("navbar-sidebar") ? t("nav.navbar.bootsnav ul.nav").each(function () {
                t("a.dropdown-toggle", this).off("click"), t("a.dropdown-toggle", this).on("click", function (t) {
                    t.stopPropagation()
                }), t(".dropdown-menu", this).addClass("animated"), t("li.dropdown", this).on("mouseenter", function () {
                    return t(".dropdown-menu", this).eq(0).removeClass(r), t(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(o), t(this).addClass("on"), !1
                }), t(".col-menu").each(function () {
                    t(".content", this).addClass("animated"), t(".title", this).on("mouseenter", function () {
                        return t(this).closest(".col-menu").find(".content").stop().fadeIn().addClass(o), t(this).closest(".col-menu").addClass("on"), !1
                    })
                }), t(this).on("mouseleave", function () {
                    return t(".dropdown-menu", this).stop().removeClass(o), t(".dropdown-menu", this).stop().addClass(r).fadeOut(), t(".col-menu", this).find(".content").stop().fadeOut().removeClass(o), t(".col-menu", this).removeClass("on"), t("li.dropdown", this).removeClass("on"), !1
                })
            }) : t("nav.navbar.bootsnav ul.nav").each(function () {
                t("a.dropdown-toggle", this).off("click"), t("a.dropdown-toggle", this).on("click", function (t) {
                    t.stopPropagation()
                }), t(".megamenu-fw", this).each(function () {
                    t(".title", this).off("click"), t("a.dropdown-toggle", this).off("click"), t(".content").removeClass("animated")
                }), t(".dropdown-menu", this).addClass("animated"), t("li.dropdown", this).on("mouseenter", function () {
                    return t(".dropdown-menu", this).eq(0).removeClass(r), t(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(o), t(this).addClass("on"), !1
                }), t("li.dropdown", this).on("mouseleave", function () {
                    t(".dropdown-menu", this).eq(0).removeClass(o), t(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(r), t(this).removeClass("on")
                }), t(this).on("mouseleave", function () {
                    return t(".dropdown-menu", this).removeClass(o), t(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(r), t("li.dropdown", this).removeClass("on"), !1
                })
            }), t("nav.navbar.bootsnav .attr-nav").each(function () {
                t("a.dropdown-toggle", this).off("click"), t("a.dropdown-toggle", this).on("click", function (t) {
                    t.stopPropagation()
                }), t(".dropdown-menu", this).addClass("animated"), t("li.dropdown", this).on("mouseenter", function () {
                    return t(".dropdown-menu", this).eq(0).removeClass(r), t(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(o), t(this).addClass("on"), !1
                }), t("li.dropdown", this).on("mouseleave", function () {
                    t(".dropdown-menu", this).eq(0).removeClass(o), t(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(r), t(this).removeClass("on")
                }), t(this).on("mouseleave", function () {
                    return t(".dropdown-menu", this).removeClass(o), t(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(r), t("li.dropdown", this).removeClass("on"), !1
                })
            }));
            if (e.hasClass("navbar-full")) {
                var a = t(window).height(), l = t(window).width();
                t(".nav-full").css("height", a + "px"), t(".wrap-full-menu").css("height", a + "px"), t(".wrap-full-menu").css("width", l + "px"), t(".navbar-collapse").addClass("animated"), t(".navbar-toggle").each(function () {
                    var e = t(this).data("target");
                    t(this).off("click"), t(this).on("click", function (i) {
                        return i.preventDefault(), t(e).removeClass(r), t(e).addClass("in"), t(e).addClass(o), !1
                    }), t("li.close-full-menu").on("click", function (i) {
                        return i.preventDefault(), t(e).addClass(r), setTimeout(function () {
                            t(e).removeClass("in"), t(e).removeClass(o)
                        }, 500), !1
                    })
                })
            }
        }, navbarSticky: function () {
            var e = t("nav.navbar.bootsnav");
            if (e.hasClass("navbar-sticky")) {
                var i = e.height();
                t(".wrap-sticky").height(i);
                var n = t(".wrap-sticky").offset().top;
                t(window).on("scroll", function () {
                    t(window).scrollTop() > n ? e.addClass("sticked") : e.removeClass("sticked")
                })
            }
        }, navbarScrollspy: function () {
            var e = t(".navbar-scrollspy"), i = t("body"), n = t("nav.navbar.bootsnav"), o = n.outerHeight();
            if (e.length) {
                i.scrollspy({target: ".navbar", offset: o}), t(".scroll").on("click", function (e) {
                    e.preventDefault(), t(".scroll").removeClass("active"), t(this).addClass("active"), t(".navbar-collapse").removeClass("in"), t(".navbar-toggle").each(function () {
                        t(".fa", this).removeClass("fa-times"), t(".fa", this).addClass("fa-bars")
                    });
                    t(window).scrollTop();
                    var i = t(this).find("a"), o = t(i.attr("href")).offset().top, r = t(window).width(),
                        s = n.data("minus-value-desktop"), a = n.data("minus-value-mobile"), l = n.data("speed");
                    if (r > 992) u = o - s; else var u = o - a;
                    t("html, body").stop().animate({scrollTop: u}, l)
                });
                var r = function () {
                    var t = i.data("bs.scrollspy");
                    t && (o = n.outerHeight(), t.options.offset = o, i.data("bs.scrollspy", t), i.scrollspy("refresh"))
                };
                t(window).on("resize", function () {
                    clearTimeout(t);
                    var t = setTimeout(r, 200)
                })
            }
        }
    };
    t(document).ready(function () {
        e.initialize()
    }), t(window).on("resize", function () {
        e.hoverDropdown(), setTimeout(function () {
            e.navbarSticky()
        }, 500), t(".navbar-toggle").each(function () {
            t(".fa", this).removeClass("fa-times"), t(".fa", this).addClass("fa-bars"), t(this).removeClass("fixed")
        }), t(".navbar-collapse").removeClass("in"), t(".navbar-collapse").removeClass("on"), t(".navbar-collapse").removeClass("bounceIn")
    })
}(jQuery);