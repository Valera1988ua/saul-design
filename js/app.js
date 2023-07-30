(() => {
    var __webpack_modules__ = {
        732: function(module) {
            !function(n, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                function n() {
                    return n = Object.assign || function(n) {
                        for (var t = 1; t < arguments.length; t++) {
                            var e = arguments[t];
                            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
                        }
                        return n;
                    }, n.apply(this, arguments);
                }
                var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = t && "IntersectionObserver" in window, o = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = {
                    elements_selector: ".lazy",
                    container: e || t ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, c = function(t) {
                    return n({}, r, t);
                }, l = function(n, t) {
                    var e, i = "LazyLoad::Initialized", o = new n(t);
                    try {
                        e = new CustomEvent(i, {
                            detail: {
                                instance: o
                            }
                        });
                    } catch (n) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                            instance: o
                        });
                    }
                    window.dispatchEvent(e);
                }, u = "src", s = "srcset", d = "sizes", f = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", m = "applied", p = "error", h = "native", E = "data-", I = "ll-status", y = function(n, t) {
                    return n.getAttribute(E + t);
                }, k = function(n) {
                    return y(n, I);
                }, w = function(n, t) {
                    return function(n, t, e) {
                        var i = "data-ll-status";
                        null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
                    }(n, 0, t);
                }, A = function(n) {
                    return w(n, null);
                }, L = function(n) {
                    return null === k(n);
                }, O = function(n) {
                    return k(n) === h;
                }, x = [ v, b, m, p ], C = function(n, t, e, i) {
                    n && (void 0 === i ? void 0 === e ? n(t) : n(t, e) : n(t, e, i));
                }, N = function(n, t) {
                    o ? n.classList.add(t) : n.className += (n.className ? " " : "") + t;
                }, M = function(n, t) {
                    o ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
                }, z = function(n) {
                    return n.llTempImage;
                }, T = function(n, t) {
                    if (t) {
                        var e = t._observer;
                        e && e.unobserve(n);
                    }
                }, R = function(n, t) {
                    n && (n.loadingCount += t);
                }, G = function(n, t) {
                    n && (n.toLoadCount = t);
                }, j = function(n) {
                    for (var t, e = [], i = 0; t = n.children[i]; i += 1) "SOURCE" === t.tagName && e.push(t);
                    return e;
                }, D = function(n, t) {
                    var e = n.parentNode;
                    e && "PICTURE" === e.tagName && j(e).forEach(t);
                }, H = function(n, t) {
                    j(n).forEach(t);
                }, V = [ u ], F = [ u, f ], B = [ u, s, d ], J = [ g ], P = function(n) {
                    return !!n[_];
                }, S = function(n) {
                    return n[_];
                }, U = function(n) {
                    return delete n[_];
                }, $ = function(n, t) {
                    if (!P(n)) {
                        var e = {};
                        t.forEach((function(t) {
                            e[t] = n.getAttribute(t);
                        })), n[_] = e;
                    }
                }, q = function(n, t) {
                    if (P(n)) {
                        var e = S(n);
                        t.forEach((function(t) {
                            !function(n, t, e) {
                                e ? n.setAttribute(t, e) : n.removeAttribute(t);
                            }(n, t, e[t]);
                        }));
                    }
                }, K = function(n, t, e) {
                    N(n, t.class_applied), w(n, m), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
                }, Q = function(n, t, e) {
                    N(n, t.class_loading), w(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
                }, W = function(n, t, e) {
                    e && n.setAttribute(t, e);
                }, X = function(n, t) {
                    W(n, d, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, u, y(n, t.data_src));
                }, Y = {
                    IMG: function(n, t) {
                        D(n, (function(n) {
                            $(n, B), X(n, t);
                        })), $(n, B), X(n, t);
                    },
                    IFRAME: function(n, t) {
                        $(n, V), W(n, u, y(n, t.data_src));
                    },
                    VIDEO: function(n, t) {
                        H(n, (function(n) {
                            $(n, V), W(n, u, y(n, t.data_src));
                        })), $(n, F), W(n, f, y(n, t.data_poster)), W(n, u, y(n, t.data_src)), n.load();
                    },
                    OBJECT: function(n, t) {
                        $(n, J), W(n, g, y(n, t.data_src));
                    }
                }, Z = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], nn = function(n, t) {
                    !t || function(n) {
                        return n.loadingCount > 0;
                    }(t) || function(n) {
                        return n.toLoadCount > 0;
                    }(t) || C(n.callback_finish, t);
                }, tn = function(n, t, e) {
                    n.addEventListener(t, e), n.llEvLisnrs[t] = e;
                }, en = function(n, t, e) {
                    n.removeEventListener(t, e);
                }, on = function(n) {
                    return !!n.llEvLisnrs;
                }, an = function(n) {
                    if (on(n)) {
                        var t = n.llEvLisnrs;
                        for (var e in t) {
                            var i = t[e];
                            en(n, e, i);
                        }
                        delete n.llEvLisnrs;
                    }
                }, rn = function(n, t, e) {
                    !function(n) {
                        delete n.llTempImage;
                    }(n), R(e, -1), function(n) {
                        n && (n.toLoadCount -= 1);
                    }(e), M(n, t.class_loading), t.unobserve_completed && T(n, e);
                }, cn = function(n, t, e) {
                    var i = z(n) || n;
                    on(i) || function(n, t, e) {
                        on(n) || (n.llEvLisnrs = {});
                        var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
                        tn(n, i, t), tn(n, "error", e);
                    }(i, (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_loaded), w(t, b), C(e.callback_loaded, t, i), o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }), (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_error), w(t, p), C(e.callback_error, t, i), e.restore_on_error && q(t, B), 
                            o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }));
                }, ln = function(n, t, e) {
                    !function(n) {
                        return Z.indexOf(n.tagName) > -1;
                    }(n) ? function(n, t, e) {
                        !function(n) {
                            n.llTempImage = document.createElement("IMG");
                        }(n), cn(n, t, e), function(n) {
                            P(n) || (n[_] = {
                                backgroundImage: n.style.backgroundImage
                            });
                        }(n), function(n, t, e) {
                            var i = y(n, t.data_bg), o = y(n, t.data_bg_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(u, r), 
                            Q(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_multi), o = y(n, t.data_bg_multi_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = r, K(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_set);
                            if (i) {
                                var o = i.split("|"), a = o.map((function(n) {
                                    return "image-set(".concat(n, ")");
                                }));
                                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = o.map((function(n) {
                                    return "-webkit-image-set(".concat(n, ")");
                                })), n.style.backgroundImage = a.join()), K(n, t, e);
                            }
                        }(n, t, e);
                    }(n, t, e) : function(n, t, e) {
                        cn(n, t, e), function(n, t, e) {
                            var i = Y[n.tagName];
                            i && (i(n, t), Q(n, t, e));
                        }(n, t, e);
                    }(n, t, e);
                }, un = function(n) {
                    n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
                }, sn = function(n) {
                    D(n, (function(n) {
                        q(n, B);
                    })), q(n, B);
                }, dn = {
                    IMG: sn,
                    IFRAME: function(n) {
                        q(n, V);
                    },
                    VIDEO: function(n) {
                        H(n, (function(n) {
                            q(n, V);
                        })), q(n, F), n.load();
                    },
                    OBJECT: function(n) {
                        q(n, J);
                    }
                }, fn = function(n, t) {
                    (function(n) {
                        var t = dn[n.tagName];
                        t ? t(n) : function(n) {
                            if (P(n)) {
                                var t = S(n);
                                n.style.backgroundImage = t.backgroundImage;
                            }
                        }(n);
                    })(n), function(n, t) {
                        L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), 
                        M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
                    }(n, t), A(n), U(n);
                }, _n = [ "IMG", "IFRAME", "VIDEO" ], gn = function(n) {
                    return n.use_native && "loading" in HTMLImageElement.prototype;
                }, vn = function(n, t, e) {
                    n.forEach((function(n) {
                        return function(n) {
                            return n.isIntersecting || n.intersectionRatio > 0;
                        }(n) ? function(n, t, e, i) {
                            var o = function(n) {
                                return x.indexOf(k(n)) >= 0;
                            }(n);
                            w(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function(n, t, e) {
                                t.unobserve_entered && T(n, e);
                            }(n, e, i), C(e.callback_enter, n, t, i), o || ln(n, e, i);
                        }(n.target, n, t, e) : function(n, t, e, i) {
                            L(n) || (N(n, e.class_exited), function(n, t, e, i) {
                                e.cancel_on_exit && function(n) {
                                    return k(n) === v;
                                }(n) && "IMG" === n.tagName && (an(n), function(n) {
                                    D(n, (function(n) {
                                        un(n);
                                    })), un(n);
                                }(n), sn(n), M(n, e.class_loading), R(i, -1), A(n), C(e.callback_cancel, n, t, i));
                            }(n, t, e, i), C(e.callback_exit, n, t, i));
                        }(n.target, n, t, e);
                    }));
                }, bn = function(n) {
                    return Array.prototype.slice.call(n);
                }, mn = function(n) {
                    return n.container.querySelectorAll(n.elements_selector);
                }, pn = function(n) {
                    return function(n) {
                        return k(n) === p;
                    }(n);
                }, hn = function(n, t) {
                    return function(n) {
                        return bn(n).filter(L);
                    }(n || mn(t));
                }, En = function(n, e) {
                    var o = c(n);
                    this._settings = o, this.loadingCount = 0, function(n, t) {
                        i && !gn(n) && (t._observer = new IntersectionObserver((function(e) {
                            vn(e, n, t);
                        }), function(n) {
                            return {
                                root: n.container === document ? null : n.container,
                                rootMargin: n.thresholds || n.threshold + "px"
                            };
                        }(n)));
                    }(o, this), function(n, e) {
                        t && (e._onlineHandler = function() {
                            !function(n, t) {
                                var e;
                                (e = mn(n), bn(e).filter(pn)).forEach((function(t) {
                                    M(t, n.class_error), A(t);
                                })), t.update();
                            }(n, e);
                        }, window.addEventListener("online", e._onlineHandler));
                    }(o, this), this.update(e);
                };
                return En.prototype = {
                    update: function(n) {
                        var t, o, a = this._settings, r = hn(n, a);
                        G(this, r.length), !e && i ? gn(a) ? function(n, t, e) {
                            n.forEach((function(n) {
                                -1 !== _n.indexOf(n.tagName) && function(n, t, e) {
                                    n.setAttribute("loading", "lazy"), cn(n, t, e), function(n, t) {
                                        var e = Y[n.tagName];
                                        e && e(n, t);
                                    }(n, t), w(n, h);
                                }(n, t, e);
                            })), G(e, 0);
                        }(r, a, this) : (o = r, function(n) {
                            n.disconnect();
                        }(t = this._observer), function(n, t) {
                            t.forEach((function(t) {
                                n.observe(t);
                            }));
                        }(t, o)) : this.loadAll(r);
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), 
                        mn(this._settings).forEach((function(n) {
                            U(n);
                        })), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, 
                        delete this.toLoadCount;
                    },
                    loadAll: function(n) {
                        var t = this, e = this._settings;
                        hn(n, e).forEach((function(n) {
                            T(n, t), ln(n, e, t);
                        }));
                    },
                    restoreAll: function() {
                        var n = this._settings;
                        mn(n).forEach((function(t) {
                            fn(t, n);
                        }));
                    }
                }, En.load = function(n, t) {
                    var e = c(t);
                    ln(n, e);
                }, En.resetStatus = function(n) {
                    A(n);
                }, t && function(n, t) {
                    if (t) if (t.length) for (var e, i = 0; e = t[i]; i += 1) l(n, e); else l(n, t);
                }(En, window.lazyLoadOptions), En;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const popup = function() {
            let popupId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            const popupLinks = document.querySelectorAll("[data-popup-open]");
            const popupCloseIcon = document.querySelectorAll("[data-popup-close]");
            let logging = true;
            let isOpen = false;
            let hash;
            let popup;
            let lastFocusEl;
            const focusElements = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            const focusElCurrentPopup = popup => popup.querySelectorAll(focusElements);
            const popupLogging = message => logging ? FLS(`[Попап]: ${message}`) : null;
            const getHash = popupSelector => window.location.hash ? window.location.hash : `#${popupSelector.getAttribute("id")}`;
            const setHash = hash => hash && history.pushState("", "", hash);
            const removeHash = () => history.pushState("", "", window.location.href.split("#")[0]);
            if (popupLinks.length) popupLinks.forEach((link => {
                link.addEventListener("click", popupOpenAction);
            }));
            if (popupId !== null) popupOpen(popupId);
            function popupOpenAction(e) {
                const {target: targetElement} = e;
                if (e.target.closest([ "[data-popup-open]" ])) {
                    const popupName = targetElement.getAttribute("data-popup-open").replace("#", "");
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup);
                    lastFocusEl = targetElement.closest([ "[data-popup-open]" ]);
                    e.preventDefault();
                }
            }
            function popupOpen(currentPopup) {
                if (currentPopup && bodyLockStatus) {
                    const popupActive = document.querySelector(".popup.open");
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: currentPopup
                        }
                    }));
                    popupActive ? popupClose(popupActive) : bodyLock();
                    currentPopup.classList.add("open");
                    currentPopup.setAttribute("aria-hidden", "false");
                    popup = currentPopup;
                    isOpen = true;
                    hash = getHash(currentPopup);
                    setHash(hash);
                    popupLogging(`Відкрив попап`);
                    setTimeout((() => {
                        focusTrap();
                    }), 50);
                    currentPopup.addEventListener("click", closePopupOutside);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: currentPopup
                        }
                    }));
                }
            }
            if (popupCloseIcon.length) popupCloseIcon.forEach((item => {
                item.addEventListener("click", popupCloseAction);
            }));
            function popupCloseAction(e) {
                if (e.target.closest("[data-popup-close]")) {
                    popupClose(e.target.closest(".popup"));
                    e.preventDefault();
                }
            }
            function closePopupOutside(e) {
                if (!e.target.closest(".popup__content")) popupClose(e.target.closest(".popup"));
            }
            function popupClose(popupActive) {
                if (!isOpen || !bodyLockStatus) return;
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: popupActive
                    }
                }));
                popupActive.classList.remove("open");
                popupActive.setAttribute("aria-hidden", "true");
                bodyUnlock();
                isOpen = false;
                removeHash();
                popupLogging(`Закрив попап`);
                setTimeout((() => {
                    focusTrap();
                }), 50);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: popupActive
                    }
                }));
            }
            document.addEventListener("keydown", (e => {
                const {code: keyEvent} = e;
                if (keyEvent === "Escape") {
                    e.preventDefault();
                    const popupActive = document.querySelector(".popup.open");
                    if (popupActive) popupClose(popupActive);
                    return;
                }
                if (keyEvent == "Tab" && isOpen) {
                    focusCatch(e);
                    return;
                }
            }));
            function focusTrap() {
                if (!isOpen && lastFocusEl) lastFocusEl.focus(); else {
                    const focusable = focusElCurrentPopup(popup);
                    focusable[0].focus();
                }
            }
            function focusCatch(e) {
                const focusable = focusElCurrentPopup(popup);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && focusedIndex === 0) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            function openToHash() {
                if (!hash) return;
                const popup = document.getElementById(hash);
                if (popup) popupOpen(popup);
            }
            window.addEventListener("load", (() => {
                setTimeout((() => {
                    if (window.location.hash) openToHash();
                }), 2e3);
            }));
            window.addEventListener("hashchange", (() => {
                if (window.location.hash) openToHash();
            }));
        };
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function addLoadedClass() {
            window.addEventListener("load", (() => {
                setTimeout((() => {
                    document.documentElement.classList.add("loaded");
                }), 0);
            }));
        }
        function menuInit() {
            const menu = document.querySelector(".icon-menu");
            if (menu) document.addEventListener("click", (e => {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        let bodyLockStatus = true;
        let bodyLockToggle = function() {
            let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
            return document.documentElement.classList.contains("lock") ? bodyUnlock(delay) : bodyLock(delay);
        };
        let bodyUnlock = function() {
            let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lockPaddings = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (const lockPadding of lockPaddings) lockPadding.style.paddingRight = "0px";
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((() => {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = function() {
            let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lockPaddings = document.querySelectorAll("[data-lp]");
                for (const lockPadding of lockPaddings) lockPadding.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((() => {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function windowLoad() {
            document.addEventListener("click", documentActons);
            intersectingSections();
        }
        function documentActons(e) {
            const {target: targetElement} = e;
            if (targetElement.closest(".form")) return;
            e.preventDefault();
            if (targetElement.hasAttribute("data-goto")) {
                const gotoElement = document.querySelector(`${targetElement.dataset.goto}`);
                const headerHeight = document.querySelector("header.header").offsetHeight;
                if (gotoElement) {
                    document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                    let targetBlockElementPosition = gotoElement.getBoundingClientRect().top + scrollY;
                    window.scrollTo({
                        top: targetBlockElementPosition - headerHeight,
                        behavior: "smooth"
                    });
                }
            }
            if (targetElement.classList.contains("item-works__type") && !targetElement.classList.contains("_active")) {
                const activeButton = document.querySelector(".item-works__type._active");
                const filterElements = document.querySelectorAll(".item-works__item");
                const {filter: workType} = targetElement.dataset;
                targetElement.classList.add("_active");
                activeButton.classList.remove("_active");
                filterElements.forEach((element => {
                    const {filter: filterValueEl} = element.dataset;
                    workType === "*" || filterValueEl === workType ? element.hidden = false : element.hidden = true;
                }));
            }
        }
        const delay = time => new Promise((resolve => setTimeout(resolve, time * 1e3)));
        function formSubmit() {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (e => {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (e => {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                e.preventDefault();
                if (error !== 0) return;
                form.classList.add("_sending");
                await delay(3);
                form.classList.remove("_sending");
                formSend(form);
            }
            async function formSend(form) {
                const name = form.querySelector("#yourName").value;
                await formValidate.formClean(form);
                const formDonePopup = document.getElementById("popup");
                const popupText = formDonePopup.querySelector(".popup__text");
                popupText.textContent = name;
                popup(formDonePopup);
                FLS("Форму відправлено");
            }
        }
        document.body.addEventListener("focusin", (e => {
            const {target: targetElement} = e;
            if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.add("_form-focus");
                    targetElement.parentElement.classList.add("_form-focus");
                }
                formValidate.removeError(targetElement);
                targetElement.hasAttribute("data-validate") ? formValidate.removeError(targetElement) : null;
            }
        }));
        document.body.addEventListener("focusout", (e => {
            const {target: targetElement} = e;
            if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.remove("_form-focus");
                    targetElement.parentElement.classList.remove("_form-focus");
                }
                targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
            }
        }));
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if (formRequiredItem.offsetParent !== null) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if (formRequiredItem.dataset.required === "email") {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if (formRequiredItem.dataset.required === "name" && formRequiredItem.value.length < 3) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                formRequiredItem.classList.remove("_form-done");
                formRequiredItem.parentElement.classList.remove("_form-done");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                formRequiredItem.classList.add("_form-done");
                formRequiredItem.parentElement.classList.add("_form-done");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                const inputs = form.querySelectorAll("input,textarea");
                for (const input of inputs) {
                    input.parentElement.classList.remove("_form-focus");
                    input.classList.remove("_form-focus");
                    formValidate.removeError(input);
                    input.parentElement.classList.remove("_form-done");
                    input.classList.remove("_form-done");
                }
                return new Promise((resolve => {
                    requestAnimationFrame((() => {
                        resolve();
                    }));
                }));
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function intersectingSections() {
            const sections = document.querySelectorAll("section");
            const linksNav = document.querySelectorAll(".menu__link");
            function callback(entries, observer) {
                entries.forEach((entrie => {
                    const {target: targetElement, isIntersecting} = entrie;
                    if (isIntersecting) linksNav.forEach((link => {
                        const {goto: linkGoto} = link.dataset;
                        targetElement.classList.contains(`${linkGoto.replace(".", "")}`) ? link.classList.add("_active-link") : link.classList.remove("_active-link");
                    }));
                }));
            }
            const options = {
                root: null,
                margin: 0,
                threshold: .5
            };
            const observer = new IntersectionObserver(callback, options);
            sections.forEach((section => {
                observer.observe(section);
            }));
        }
        const FLS = message => {
            setTimeout((() => window.FLS ? console.log(message) : null), 0);
        };
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        window["FLS"] = true;
        //!Функціонал
                isWebp();
        menuInit();
        formSubmit();
        addLoadedClass();
        window.addEventListener("load", (() => {
            windowLoad();
        }));
    })();
})();