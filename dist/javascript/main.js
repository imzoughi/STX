$(function() {
    cartQuantity.init(), cartMessage.init();
});

var cartQuantity = function() {
    function _init() {
        $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter(".quantity input"), 
        $(".quantity").each(function() {
            var spinner = $(this), input = spinner.find('input[type="number"]'), btnUp = spinner.find(".quantity-up"), btnDown = spinner.find(".quantity-down"), min = input.attr("min"), max = input.attr("max");
            btnUp.click(function() {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) var newVal = oldValue; else var newVal = oldValue + 1;
                spinner.find("input").val(newVal), spinner.find("input").trigger("change");
            }), btnDown.click(function() {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) var newVal = oldValue; else var newVal = oldValue - 1;
                spinner.find("input").val(newVal), spinner.find("input").trigger("change");
            });
        });
    }
    return {
        init: _init
    };
}(), cartMessage = function() {
    function _init() {
        $("[data-toast]").on("click", function() {
            var b = $(this), c = b.data("toast-type"), d = b.data("toast-icon"), e = b.data("toast-position"), f = b.data("toast-title"), g = b.data("toast-message"), h = "";
            switch (e) {
              case "topRight":
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "topRight",
                    progressBar: !1,
                    overlay: !0,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInLeft",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
                break;

              case "bottomRight":
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "bottomRight",
                    progressBar: !1,
                    overlay: !0,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInLeft",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
                break;

              case "topLeft":
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "topLeft",
                    progressBar: !1,
                    overlay: !0,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInRight",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
                break;

              case "bottomLeft":
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "bottomLeft",
                    progressBar: !1,
                    overlay: !0,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInRight",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
                break;

              case "topCenter":
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "topCenter",
                    progressBar: !1,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInDown",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
                break;

              case "bottomCenter":
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "bottomCenter",
                    progressBar: !1,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInUp",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
                break;

              default:
                h = {
                    "class": "iziToast-" + c || "",
                    title: f || "Title",
                    message: g || "toast message",
                    animateInside: !1,
                    position: "topRight",
                    progressBar: !1,
                    icon: d,
                    timeout: 3200,
                    transitionIn: "fadeInLeft",
                    transitionOut: "fadeOut",
                    transitionInMobile: "fadeIn",
                    transitionOutMobile: "fadeOut"
                };
            }
            iziToast.show(h);
        });
    }
    return {
        init: _init
    };
}();

window.Modernizr = function(a, b, c) {
    function A(a) {
        j.cssText = a;
    }
    function C(a, b) {
        return typeof a === b;
    }
    function D(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function E(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!D(e, "-") && j[e] !== c) return "pfx" != b || e;
        }
        return !1;
    }
    function F(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : C(f, "function") ? f.bind(d || b) : f;
        }
        return !1;
    }
    function G(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + o.join(d + " ") + d).split(" ");
        return C(b, "string") || C(b, "undefined") ? E(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), 
        F(e, b, c));
    }
    var k, v, z, d = "2.8.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, m = ({}.toString, 
    " -webkit- -moz- -o- -ms- ".split(" ")), n = "Webkit Moz O ms", o = n.split(" "), p = n.toLowerCase().split(" "), q = {}, t = [], u = t.slice, w = function(a, c, d, e) {
        var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
        if (parseInt(d, 10)) for (;d--; ) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), 
        l.appendChild(j);
        return f = [ "&#173;", '<style id="s', h, '">', a, "</style>" ].join(""), l.id = h, 
        (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", 
        k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), 
        m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), 
        !!i;
    }, x = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c) return c(b) && c(b).matches || !1;
        var d;
        return w("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
            d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position;
        }), d;
    }, y = {}.hasOwnProperty;
    z = C(y, "undefined") || C(y.call, "undefined") ? function(a, b) {
        return b in a && C(a.constructor.prototype[b], "undefined");
    } : function(a, b) {
        return y.call(a, b);
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if ("function" != typeof c) throw new TypeError();
        var d = u.call(arguments, 1), e = function() {
            if (this instanceof e) {
                var a = function() {};
                a.prototype = c.prototype;
                var f = new a(), g = c.apply(f, d.concat(u.call(arguments)));
                return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(u.call(arguments)));
        };
        return e;
    }), q.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : w([ "@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(a) {
            c = 9 === a.offsetTop;
        }), c;
    }, q.csstransitions = function() {
        return G("transition");
    };
    for (var H in q) z(q, H) && (v = H.toLowerCase(), e[v] = q[H](), t.push((e[v] ? "" : "no-") + v));
    return e.addTest = function(a, b) {
        if ("object" == typeof a) for (var d in a) z(a, d) && e.addTest(d, a[d]); else {
            if (a = a.toLowerCase(), e[a] !== c) return e;
            b = "function" == typeof b ? b() : b, "undefined" != typeof f && f && (g.className += " " + (b ? "" : "no-") + a), 
            e[a] = b;
        }
        return e;
    }, A(""), i = k = null, function(a, b) {
        function l(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
        }
        function m() {
            var a = s.elements;
            return "string" == typeof a ? a.split(" ") : a;
        }
        function n(a) {
            var b = j[a[h]];
            return b || (b = {}, i++, a[h] = i, j[i] = b), b;
        }
        function o(a, c, d) {
            if (c || (c = b), k) return c.createElement(a);
            d || (d = n(c));
            var g;
            return g = d.cache[a] ? d.cache[a].cloneNode() : f.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), 
            !g.canHaveChildren || e.test(a) || g.tagUrn ? g : d.frag.appendChild(g);
        }
        function p(a, c) {
            if (a || (a = b), k) return a.createDocumentFragment();
            c = c || n(a);
            for (var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; e < g; e++) d.createElement(f[e]);
            return d;
        }
        function q(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, 
            b.frag = b.createFrag()), a.createElement = function(c) {
                return s.shivMethods ? o(c, a, b) : b.createElem(c);
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
            }) + ");return n}")(s, b.frag);
        }
        function r(a) {
            a || (a = b);
            var c = n(a);
            return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
            k || q(a, c), a;
        }
        var g, k, c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, h = "_html5shiv", i = 0, j = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement;
                }();
            } catch (c) {
                g = !0, k = !0;
            }
        }();
        var s = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: c,
            shivCSS: d.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: d.shivMethods !== !1,
            type: "default",
            shivDocument: r,
            createElement: o,
            createDocumentFragment: p
        };
        a.html5 = s, r(b);
    }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, 
    e.mq = x, e.testProp = function(a) {
        return E([ a ]);
    }, e.testAllProps = G, e.testStyles = w, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), 
    e;
}(this, this.document), function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a);
    }
    function e(a) {
        return "string" == typeof a;
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(), h()) : q = 0;
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, 
            b)) {
                "img" != a && m(function() {
                    t.removeChild(l);
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
            }
        }
        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), 
        l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r);
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), 
        m(k, j)) : y[c].push(l));
    }
    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 
        1 == p.length && h()), this;
    }
    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        }, a;
    }
    var A, B, l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function(a) {
        return "[object Array]" == o.call(a);
    }, x = [], y = {}, z = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a;
        }
    };
    B = function(a) {
        function b(a) {
            var e, f, g, a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {
                url: c,
                origUrl: c,
                prefixes: a
            };
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c;
        }
        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), 
            i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, 
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), 
            (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
            })));
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l();
                    }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function() {
                        var c, b = 0;
                        for (c in a) a.hasOwnProperty(c) && b++;
                        return b;
                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l();
                    } : j[n] = function(a) {
                        return function() {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l();
                        };
                    }(k[n])), g(a[n], j, b, n, h));
                } else !c && l();
            }
            var m, n, h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f;
            c(h ? a.yep : a.nope, !!i), i && c(i);
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], 
        e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l);
    }, B.addPrefix = function(a, b) {
        z[a] = b;
    }, B.addFilter = function(a) {
        x.push(a);
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", 
    b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete";
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var l, o, k = b.createElement("script"), e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
        }, m(function() {
            l || (l = 1, c(1));
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0));
    };
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
};