if (function(global, factory) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    "use strict";
    function DOMEval(code, doc) {
        doc = doc || document;
        var script = doc.createElement("script");
        script.text = code, doc.head.appendChild(script).parentNode.removeChild(script);
    }
    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" !== type && !jQuery.isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
    }
    function winnow(elements, qualifier, not) {
        return jQuery.isFunction(qualifier) ? jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        }) : qualifier.nodeType ? jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        }) : "string" != typeof qualifier ? jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
        }) : risSimple.test(qualifier) ? jQuery.filter(qualifier, elements, not) : (qualifier = jQuery.filter(qualifier, elements), 
        jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not && 1 === elem.nodeType;
        }));
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = {};
        return jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function Identity(v) {
        return v;
    }
    function Thrower(ex) {
        throw ex;
    }
    function adoptValue(value, resolve, reject) {
        var method;
        try {
            value && jQuery.isFunction(method = value.promise) ? method.call(value).done(resolve).fail(reject) : value && jQuery.isFunction(method = value.then) ? method.call(value, resolve, reject) : resolve.call(void 0, value);
        } catch (value) {
            reject.call(void 0, value);
        }
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed), window.removeEventListener("load", completed), 
        jQuery.ready();
    }
    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }
    function getData(data) {
        return "true" === data || "false" !== data && ("null" === data ? null : data === +data + "" ? +data : rbrace.test(data) ? JSON.parse(data) : data);
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase(), 
        data = elem.getAttribute(name), "string" == typeof data) {
            try {
                data = getData(data);
            } catch (e) {}
            dataUser.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
        } : function() {
            return jQuery.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3], valueParts = valueParts || [], initialInUnit = +initial || 1;
            do scale = scale || ".5", initialInUnit /= scale, jQuery.style(elem, prop, initialInUnit + unit); while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations);
        }
        return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], 
        tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), 
        adjusted;
    }
    function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
        return display ? display : (temp = doc.body.appendChild(doc.createElement(nodeName)), 
        display = jQuery.css(temp, "display"), temp.parentNode.removeChild(temp), "none" === display && (display = "block"), 
        defaultDisplayMap[nodeName] = display, display);
    }
    function showHide(elements, show) {
        for (var display, elem, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], 
        elem.style && (display = elem.style.display, show ? ("none" === display && (values[index] = dataPriv.get(elem, "display") || null, 
        values[index] || (elem.style.display = "")), "" === elem.style.display && isHiddenWithinTree(elem) && (values[index] = getDefaultDisplay(elem))) : "none" !== display && (values[index] = "none", 
        dataPriv.set(elem, "display", display)));
        for (index = 0; index < length; index++) null != values[index] && (elements[index].style.display = values[index]);
        return elements;
    }
    function getAll(context, tag) {
        var ret;
        return ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : [], 
        void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; i < l; i++) dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
    function buildFragment(elems, context, scripts, selection, ignored) {
        for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; i < l; i++) if (elem = elems[i], 
        elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
            for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
            wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], 
            j = wrap[0]; j--; ) tmp = tmp.lastChild;
            jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
        } else nodes.push(context.createTextNode(elem));
        for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem); else if (contains = jQuery.contains(elem.ownerDocument, elem), 
        tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
        scripts) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
        return fragment;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if ("object" == typeof types) {
            "string" != typeof selector && (data = data || selector, selector = void 0);
            for (type in types) on(elem, type, selector, data, types[type], one);
            return elem;
        }
        if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
        data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return elem;
        return 1 === one && (origFn = fn, fn = function(event) {
            return jQuery().off(event), origFn.apply(this, arguments);
        }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (dataPriv.hasData(src) && (pdataOld = dataPriv.access(src), pdataCur = dataPriv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            dataUser.hasData(src) && (udataOld = dataUser.access(src), udataCur = jQuery.extend({}, udataOld), 
            dataUser.set(dest, udataCur));
        }
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue);
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
        if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function(index) {
            var self = collection.eq(index);
            isFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored);
        });
        if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), 
        first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
        first || ignored)) {
            for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, 
            i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
            callback.call(collection[i], node, i);
            if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
            i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : DOMEval(node.textContent.replace(rcleanScript, ""), doc));
        }
        return collection;
    }
    function remove(elem, selector, keepData) {
        for (var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = nodes[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), 
        node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), 
        node.parentNode.removeChild(node));
        return elem;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name], 
        "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, 
        minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(name) {
        if (name in emptyStyle) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in emptyStyle) return name;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i, val = 0;
        for (i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var val, valueIsBorderBox = !0, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (elem.getClientRects().length && (val = elem.getBoundingClientRect()[name]), 
        val <= 0 || null == val) {
            if (val = curCSS(elem, name, styles), (val < 0 || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function raf() {
        timerId && (window.requestAnimationFrame(raf), jQuery.fx.tick());
    }
    function createFxNow() {
        return window.setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; index < length; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        }));
        for (prop in props) if (value = props[prop], rfxtypes.test(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
        if (propTween = !jQuery.isEmptyObject(props), propTween || !jQuery.isEmptyObject(orig)) {
            isBox && 1 === elem.nodeType && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
            restoreDisplay = dataShow && dataShow.display, null == restoreDisplay && (restoreDisplay = dataPriv.get(elem, "display")), 
            display = jQuery.css(elem, "display"), "none" === display && (restoreDisplay ? display = restoreDisplay : (showHide([ elem ], !0), 
            restoreDisplay = elem.style.display || restoreDisplay, display = jQuery.css(elem, "display"), 
            showHide([ elem ]))), ("inline" === display || "inline-block" === display && null != restoreDisplay) && "none" === jQuery.css(elem, "float") && (propTween || (anim.done(function() {
                style.display = restoreDisplay;
            }), null == restoreDisplay && (display = style.display, restoreDisplay = "none" === display ? "" : display)), 
            style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
                style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
            })), propTween = !1;
            for (prop in orig) propTween || (dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = dataPriv.access(elem, "fxshow", {
                display: restoreDisplay
            }), toggle && (dataShow.hidden = !hidden), hidden && showHide([ elem ], !0), anim.done(function() {
                hidden || showHide([ elem ]), dataPriv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            })), propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = propTween.start, 
            hidden && (propTween.end = propTween.start, propTween.start = 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {},
                easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                return gotoEnd ? (deferred.notifyWith(elem, [ animation, 1, 0 ]), deferred.resolveWith(elem, [ animation, gotoEnd ])) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); index < length; index++) if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)), 
        result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }
    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType];
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    var arr = [], document = window.document, getProto = Object.getPrototypeOf, slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, fnToString = hasOwn.toString, ObjectFunctionString = fnToString.call(Object), support = {}, version = "3.1.1", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null == num ? slice.call(this) : num < 0 ? this[num + this.length] : this[num];
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret;
        },
        each: function(callback) {
            return jQuery.each(this, callback);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            var type = jQuery.type(obj);
            return ("number" === type || "string" === type) && !isNaN(obj - parseFloat(obj));
        },
        isPlainObject: function(obj) {
            var proto, Ctor;
            return !(!obj || "[object Object]" !== toString.call(obj)) && (!(proto = getProto(obj)) || (Ctor = hasOwn.call(proto, "constructor") && proto.constructor, 
            "function" == typeof Ctor && fnToString.call(Ctor) === ObjectFunctionString));
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            DOMEval(code);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) for (length = obj.length; i < length && callback.call(obj[i], i, obj[i]) !== !1; i++) ; else for (i in obj) if (callback.call(obj[i], i, obj[i]) === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; j < len; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) for (length = elems.length; i < length; i++) value = callback(elems[i], i, arg), 
            null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = slice.call(arguments, 2), 
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy;
        },
        now: Date.now,
        support: support
    }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]), 
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, documentIsHTML)) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (!(elem = context.getElementById(m))) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (1 !== nodeType) newContext = context, newSelector = selector; else if ("object" !== context.nodeName.toLowerCase()) {
                        for ((nid = context.getAttribute("id")) ? nid = nid.replace(rcssescape, fcssescape) : context.setAttribute("id", nid = expando), 
                        groups = tokenize(selector), i = groups.length; i--; ) groups[i] = "#" + nid + " " + toSelector(groups[i]);
                        newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        nid === expando && context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var el = document.createElement("fieldset");
            try {
                return !!fn(el);
            } catch (e) {
                return !1;
            } finally {
                el.parentNode && el.parentNode.removeChild(el), el = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = arr.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createDisabledPseudo(disabled) {
            return function(elem) {
                return "form" in elem ? elem.parentNode && elem.disabled === !1 ? "label" in elem ? "label" in elem.parentNode ? elem.parentNode.disabled === disabled : elem.disabled === disabled : elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled : elem.disabled === disabled : "label" in elem && elem.disabled === disabled;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && "parentNode" === key, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
                return !1;
            } : function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) if (outerCache = elem[expando] || (elem[expando] = {}), 
                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), skip && skip === elem.nodeName.toLowerCase()) elem = elem[dir] || elem; else {
                    if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (uniqueCache[key] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
                return !1;
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++) (elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), 
            mapped && map.push(i)));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++]; ) if (matcher(elem, context || document, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
            return asCodePoint ? "\0" === ch ? "�" : ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " " : "\\" + ch;
        }, unloadHandler = function() {
            setDocument();
        }, disabledAncestor = addCombinator(function(elem) {
            return elem.disabled === !0 && ("form" in elem || "label" in elem);
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return !!documentElement && "HTML" !== documentElement.nodeName;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = document.documentElement, documentIsHTML = !isXML(document), preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow && (subWindow.addEventListener ? subWindow.addEventListener("unload", unloadHandler, !1) : subWindow.attachEvent && subWindow.attachEvent("onunload", unloadHandler)), 
            support.attributes = assert(function(el) {
                return el.className = "i", !el.getAttribute("className");
            }), support.getElementsByTagName = assert(function(el) {
                return el.appendChild(document.createComment("")), !el.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), 
            support.getById = assert(function(el) {
                return docElem.appendChild(el).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length;
            }), support.getById ? (Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }, Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var elem = context.getElementById(id);
                    return elem ? [ elem ] : [];
                }
            }) : (Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }, Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var node, i, elems, elem = context.getElementById(id);
                    if (elem) {
                        if (node = elem.getAttributeNode("id"), node && node.value === id) return [ elem ];
                        for (elems = context.getElementsByName(id), i = 0; elem = elems[i++]; ) if (node = elem.getAttributeNode("id"), 
                        node && node.value === id) return [ elem ];
                    }
                    return [];
                }
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                if ("undefined" != typeof context.getElementsByClassName && documentIsHTML) return context.getElementsByClassName(className);
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(el) {
                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                el.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                el.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                el.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), el.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                el.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(el) {
                el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var input = document.createElement("input");
                input.setAttribute("type", "hidden"), el.appendChild(input).setAttribute("name", "D"), 
                el.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                2 !== el.querySelectorAll(":enabled").length && rbuggyQSA.push(":enabled", ":disabled"), 
                docElem.appendChild(el).disabled = !0, 2 !== el.querySelectorAll(":disabled").length && rbuggyQSA.push(":enabled", ":disabled"), 
                el.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
                support.disconnectedMatch = matches.call(el, "*"), matches.call(el, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, document) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"));
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = !1;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), 
                                cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    uniqueCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), 
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], 
                            nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), diff === !1) for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}), 
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: createDisabledPseudo(!1),
                disabled: createDisabledPseudo(!0),
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(el) {
            return 1 & el.compareDocumentPosition(document.createElement("fieldset"));
        }), assert(function(el) {
            return el.innerHTML = "<a href='#'></a>", "#" === el.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(el) {
            return el.innerHTML = "<input/>", el.firstChild.setAttribute("value", ""), "" === el.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue;
        }), assert(function(el) {
            return null == el.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, 
    jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains, jQuery.escapeSelector = Sizzle.escape;
    var dir = function(elem, dir, until) {
        for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
            if (truncate && jQuery(elem).is(until)) break;
            matched.push(elem);
        }
        return matched;
    }, siblings = function(n, elem) {
        for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
        return matched;
    }, rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret, len = this.length, self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (ret = this.pushStack([]), i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) return this;
        if (root = root || rootjQuery, "string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && (this[0] = elem, this.length = 1), 
            this;
        }
        return selector.nodeType ? (this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; i < l; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = "string" != typeof selectors && jQuery(selectors);
            if (!rneedsContext.test(selectors)) for (;i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return siblings(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            for (locked = options.once, fired = firing = !0; queue.length; firingIndex = -1) for (memory = queue.shift(); ++firingIndex < list.length; ) list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length, 
            memory = !1);
            options.memory || (memory = !1), firing = !1, locked && (list = memory ? [] : "");
        }, self = {
            add: function() {
                return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), 
                function add(args) {
                    jQuery.each(args, function(_, arg) {
                        jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg);
                    });
                }(arguments), memory && !firing && fire()), this;
            },
            remove: function() {
                return jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    index <= firingIndex && firingIndex--;
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function() {
                return list && (list = []), this;
            },
            disable: function() {
                return locked = queue = [], list = memory = "", this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return locked = queue = [], memory || firing || (list = memory = ""), this;
            },
            locked: function() {
                return !!locked;
            },
            fireWith: function(context, args) {
                return locked || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                queue.push(args), firing || fire()), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2 ], [ "resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected" ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                "catch": function(fn) {
                    return promise.then(null, fn);
                },
                pipe: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                then: function(onFulfilled, onRejected, onProgress) {
                    function resolve(depth, deferred, handler, special) {
                        return function() {
                            var that = this, args = arguments, mightThrow = function() {
                                var returned, then;
                                if (!(depth < maxDepth)) {
                                    if (returned = handler.apply(that, args), returned === deferred.promise()) throw new TypeError("Thenable self-resolution");
                                    then = returned && ("object" == typeof returned || "function" == typeof returned) && returned.then, 
                                    jQuery.isFunction(then) ? special ? then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)) : (maxDepth++, 
                                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith))) : (handler !== Identity && (that = void 0, 
                                    args = [ returned ]), (special || deferred.resolveWith)(that, args));
                                }
                            }, process = special ? mightThrow : function() {
                                try {
                                    mightThrow();
                                } catch (e) {
                                    jQuery.Deferred.exceptionHook && jQuery.Deferred.exceptionHook(e, process.stackTrace), 
                                    depth + 1 >= maxDepth && (handler !== Thrower && (that = void 0, args = [ e ]), 
                                    deferred.rejectWith(that, args));
                                }
                            };
                            depth ? process() : (jQuery.Deferred.getStackHook && (process.stackTrace = jQuery.Deferred.getStackHook()), 
                            window.setTimeout(process));
                        };
                    }
                    var maxDepth = 0;
                    return jQuery.Deferred(function(newDefer) {
                        tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)), 
                        tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity)), 
                        tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[5];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[3 - i][2].disable, tuples[0][2].lock), list.add(tuple[3].fire), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), master = jQuery.Deferred(), updateFunc = function(i) {
                return function(value) {
                    resolveContexts[i] = this, resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    --remaining || master.resolveWith(resolveContexts, resolveValues);
                };
            };
            if (remaining <= 1 && (adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject), 
            "pending" === master.state() || jQuery.isFunction(resolveValues[i] && resolveValues[i].then))) return master.then();
            for (;i--; ) adoptValue(resolveValues[i], updateFunc(i), master.reject);
            return master.promise();
        }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function(error, stack) {
        window.console && window.console.warn && error && rerrorNames.test(error.name) && window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }, jQuery.readyException = function(error) {
        window.setTimeout(function() {
            throw error;
        });
    };
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function(fn) {
        return readyList.then(fn)["catch"](function(error) {
            jQuery.readyException(error);
        }), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || readyList.resolveWith(document, [ jQuery ]));
        }
    }), jQuery.ready.then = readyList.then, "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed), 
    window.addEventListener("load", completed));
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;i < len; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    }, acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    };
    Data.uid = 1, Data.prototype = {
        cache: function(owner) {
            var value = owner[this.expando];
            return value || (value = {}, acceptData(owner) && (owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, {
                value: value,
                configurable: !0
            }))), value;
        },
        set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if ("string" == typeof data) cache[jQuery.camelCase(data)] = value; else for (prop in data) cache[jQuery.camelCase(prop)] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            return void 0 === key ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
        },
        access: function(owner, key, value) {
            return void 0 === key || key && "string" == typeof key && void 0 === value ? this.get(owner, key) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, cache = owner[this.expando];
            if (void 0 !== cache) {
                if (void 0 !== key) {
                    jQuery.isArray(key) ? key = key.map(jQuery.camelCase) : (key = jQuery.camelCase(key), 
                    key = key in cache ? [ key ] : key.match(rnothtmlwhite) || []), i = key.length;
                    for (;i--; ) delete cache[key[i]];
                }
                (void 0 === key || jQuery.isEmptyObject(cache)) && (owner.nodeType ? owner[this.expando] = void 0 : delete owner[this.expando]);
            }
        },
        hasData: function(owner) {
            var cache = owner[this.expando];
            return void 0 !== cache && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data(), dataUser = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
    jQuery.extend({
        hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function(elem, name, data) {
            return dataUser.access(elem, name, data);
        },
        removeData: function(elem, name) {
            dataUser.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return dataPriv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            dataPriv.remove(elem, name);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = dataUser.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    dataPriv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                dataUser.set(this, key);
            }) : access(this, function(value) {
                var data;
                if (elem && void 0 === value) {
                    if (data = dataUser.get(elem, key), void 0 !== data) return data;
                    if (data = dataAttr(elem, key), void 0 !== data) return data;
                } else this.each(function() {
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                dataUser.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) return type = (type || "fx") + "queue", queue = dataPriv.get(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = dataPriv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || [];
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    dataPriv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = dataPriv.get(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHiddenWithinTree = function(elem, el) {
        return elem = el || elem, "none" === elem.style.display || "" === elem.style.display && jQuery.contains(elem.ownerDocument, elem) && "none" === jQuery.css(elem, "display");
    }, swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    }, defaultDisplayMap = {};
    jQuery.fn.extend({
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHiddenWithinTree(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    });
    var rcheckableType = /^(?:checkbox|radio)$/i, rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, rscriptType = /^$|\/(?:java|ecma)script/i, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td;
    var rhtml = /<|&#?\w+;/;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
        div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var documentElement = document.documentElement, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), selector && jQuery.find.matchesSelector(documentElement, selector), 
            handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
            (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return "undefined" != typeof jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnothtmlwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnothtmlwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && dataPriv.remove(elem, "handle events");
            }
        },
        dispatch: function(nativeEvent) {
            var i, j, ret, matched, handleObj, handlerQueue, event = jQuery.event.fix(nativeEvent), args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            for (args[0] = event, i = 1; i < arguments.length; i++) args[i] = arguments[i];
            if (event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && !("click" === event.type && event.button >= 1)) for (;cur !== this; cur = cur.parentNode || this) if (1 === cur.nodeType && ("click" !== event.type || cur.disabled !== !0)) {
                for (matchedHandlers = [], matchedSelectors = {}, i = 0; i < delegateCount; i++) handleObj = handlers[i], 
                sel = handleObj.selector + " ", void 0 === matchedSelectors[sel] && (matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [ cur ]).length), 
                matchedSelectors[sel] && matchedHandlers.push(handleObj);
                matchedHandlers.length && handlerQueue.push({
                    elem: cur,
                    handlers: matchedHandlers
                });
            }
            return cur = this, delegateCount < handlers.length && handlerQueue.push({
                elem: cur,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        addProp: function(name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: !0,
                configurable: !0,
                get: jQuery.isFunction(hook) ? function() {
                    if (this.originalEvent) return hook(this.originalEvent);
                } : function() {
                    if (this.originalEvent) return this.originalEvent[name];
                },
                set: function(value) {
                    Object.defineProperty(this, name, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: value
                    });
                }
            });
        },
        fix: function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && jQuery.nodeName(this, "input")) return this.click(), 
                    !1;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle);
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse, 
        this.target = src.target && 3 === src.target.nodeType ? src.target.parentNode : src.target, 
        this.currentTarget = src.currentTarget, this.relatedTarget = src.relatedTarget) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && !this.isSimulated && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(event) {
            var button = event.button;
            return null == event.which && rkeyEvent.test(event.type) ? null != event.charCode ? event.charCode : event.keyCode : !event.which && void 0 !== button && rmouseEvent.test(event.type) ? 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0 : event.which;
        }
    }, jQuery.event.addProp), jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return selector !== !1 && "function" != typeof selector || (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        cleanData: function(elems) {
            for (var data, elem, type, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) if (acceptData(elem)) {
                if (data = elem[dataPriv.expando]) {
                    if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    elem[dataPriv.expando] = void 0;
                }
                elem[dataUser.expando] && (elem[dataUser.expando] = void 0);
            }
        }
    }), jQuery.fn.extend({
        detach: function(selector) {
            return remove(this, selector, !0);
        },
        remove: function(selector) {
            return remove(this, selector);
        },
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (;i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;
                jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this));
            }, ignored);
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; i <= last; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        return view && view.opener || (view = window), view.getComputedStyle(elem);
    };
    !function() {
        function computeStyleTests() {
            if (div) {
                div.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
                div.innerHTML = "", documentElement.appendChild(container);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = "1%" !== divStyle.top, reliableMarginLeftVal = "2px" === divStyle.marginLeft, 
                boxSizingReliableVal = "4px" === divStyle.width, div.style.marginRight = "50%", 
                pixelMarginRightVal = "4px" === divStyle.marginRight, documentElement.removeChild(container), 
                div = null;
            }
        }
        var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
        container.appendChild(div), jQuery.extend(support, {
            pixelPosition: function() {
                return computeStyleTests(), pixelPositionVal;
            },
            boxSizingReliable: function() {
                return computeStyleTests(), boxSizingReliableVal;
            },
            pixelMarginRight: function() {
                return computeStyleTests(), pixelMarginRightVal;
            },
            reliableMarginLeft: function() {
                return computeStyleTests(), reliableMarginLeftVal;
            }
        }));
    }();
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "Moz", "ms" ], emptyStyle = document.createElement("div").style;
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), 
                type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), 
                void 0);
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) return !rdisplayswap.test(jQuery.css(elem, "display")) || elem.getClientRects().length && elem.getBoundingClientRect().width ? getWidthOrHeight(elem, name, extra) : swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                });
            },
            set: function(elem, value, extra) {
                var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles);
                return subtract && (matches = rcssNum.exec(value)) && "px" !== (matches[3] || "px") && (elem.style[name] = value, 
                value = jQuery.css(elem, name)), setPositiveNumber(elem, value, subtract);
            }
        };
    }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
        if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
            marginLeft: 0
        }, function() {
            return elem.getBoundingClientRect().left;
        })) + "px";
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, 
            this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0);
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [ function(prop, value) {
                var tween = this.createTween(prop, value);
                return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween;
            } ]
        },
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.match(rnothtmlwhite);
            for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], 
            Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback);
        },
        prefilters: [ defaultPrefilter ],
        prefilter: function(callback, prepend) {
            prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return jQuery.fx.off || document.hidden ? opt.duration = 0 : "number" != typeof opt.duration && (opt.duration in jQuery.fx.speeds ? opt.duration = jQuery.fx.speeds[opt.duration] : opt.duration = jQuery.fx.speeds._default), 
        null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || dataPriv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                !dequeue && gotoEnd || jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(timerId) : window.clearInterval(timerId), 
        timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        input = document.createElement("input"), input.value = "t", input.type = "radio", 
        support.radioValue = "t" === input.value;
    }();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType) return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), 
            void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret));
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) elem.removeAttribute(name);
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle, lowercaseName = name.toLowerCase();
            return isXML || (handle = attrHandle[lowercaseName], attrHandle[lowercaseName] = ret, 
            ret = null != getter(elem, name, isXML) ? lowercaseName : null, attrHandle[lowercaseName] = handle), 
            ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, 
            hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        },
        set: function(elem) {
            var parent = elem.parentNode;
            parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex);
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
            if ("string" == typeof value && value) for (classes = value.match(rnothtmlwhite) || []; elem = this[i++]; ) if (curValue = getClass(elem), 
            cur = 1 === elem.nodeType && " " + stripAndCollapse(curValue) + " ") {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = stripAndCollapse(cur), curValue !== finalValue && elem.setAttribute("class", finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof value && value) for (classes = value.match(rnothtmlwhite) || []; elem = this[i++]; ) if (curValue = getClass(elem), 
            cur = 1 === elem.nodeType && " " + stripAndCollapse(curValue) + " ") {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") > -1; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = stripAndCollapse(cur), curValue !== finalValue && elem.setAttribute("class", finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
            }) : this.each(function() {
                var className, i, self, classNames;
                if ("string" === type) for (i = 0, self = jQuery(this), classNames = value.match(rnothtmlwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else void 0 !== value && "boolean" !== type || (className = getClass(this), 
                className && dataPriv.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || value === !1 ? "" : dataPriv.get(this, "__className__") || ""));
            });
        },
        hasClass: function(selector) {
            var className, elem, i = 0;
            for (className = " " + selector + " "; elem = this[i++]; ) if (1 === elem.nodeType && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, i, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type, values = one ? null : [], max = one ? index + 1 : options.length;
                    for (i = index < 0 ? max : one ? index : 0; i < max; i++) if (option = options[i], 
                    (option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    });
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
    jQuery.extend(jQuery.event, {
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        simulate: function(type, elem, event) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0
            });
            jQuery.event.trigger(e, null, elem);
        }
    }), jQuery.fn.extend({
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) return jQuery.event.trigger(type, data, elem, !0);
        }
    }), jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    }), support.focusin = "onfocusin" in window, support.focusin || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), dataPriv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                attaches ? dataPriv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                dataPriv.remove(doc, fix));
            }
        };
    });
    var location = window.location, nonce = jQuery.now(), rquery = /\?/;
    jQuery.parseXML = function(data) {
        var xml;
        if (!data || "string" != typeof data) return null;
        try {
            xml = new window.DOMParser().parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return xml && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, valueOrFunction) {
            var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(null == value ? "" : value);
        };
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document.createElement("a");
    originAnchor.href = location.href, jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                completed || (completed = !0, timeoutTimer && window.clearTimeout(timeoutTimer), 
                transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, 
                isSuccess = status >= 200 && status < 300 || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), 
                response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, 
                jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (completed) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return completed ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    return null == completed && (name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return null == completed && (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (completed) jqXHR.always(map[jqXHR.status]); else for (code in map) statusCode[code] = [ statusCode[code], map[code] ];
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR), s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [ "" ], 
            null == s.crossDomain) {
                urlAnchor = document.createElement("a");
                try {
                    urlAnchor.href = s.url, urlAnchor.href = urlAnchor.href, s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {
                    s.crossDomain = !0;
                }
            }
            if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), completed) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url.replace(rhash, ""), 
            s.hasContent ? s.data && s.processData && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && (s.data = s.data.replace(r20, "+")) : (uncached = s.url.slice(cacheURL.length), 
            s.data && (cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), 
            s.cache === !1 && (cacheURL = cacheURL.replace(rantiCache, "$1"), uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached), 
            s.url = cacheURL + uncached), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || completed)) return jqXHR.abort();
            if (strAbort = "abort", completeDeferred.add(s.complete), jqXHR.done(s.success), 
            jqXHR.fail(s.error), transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                completed) return jqXHR;
                s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    completed = !1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (completed) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return this[0] && (jQuery.isFunction(html) && (html = html.call(this[0])), wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), 
            this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function(selector) {
            return this.parent(selector).not("body").each(function() {
                jQuery(this).replaceWith(this.childNodes);
            }), this;
        }
    }), jQuery.expr.pseudos.hidden = function(elem) {
        return !jQuery.expr.pseudos.visible(elem);
    }, jQuery.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }, jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    };
    var xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) return {
            send: function(headers, complete) {
                var i, xhr = options.xhr();
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                            binary: xhr.response
                        } : {
                            text: xhr.responseText
                        }, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), errorCallback = xhr.onerror = callback("error"), void 0 !== xhr.onabort ? xhr.onabort = errorCallback : xhr.onreadystatechange = function() {
                    4 === xhr.readyState && window.setTimeout(function() {
                        callback && errorCallback();
                    });
                }, callback = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                    if (callback) throw e;
                }
            },
            abort: function() {
                callback && callback();
            }
        };
    }), jQuery.ajaxPrefilter(function(s) {
        s.crossDomain && (s.contents.script = !1);
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, 
            s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), 
            responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script";
    }), support.createHTMLDocument = function() {
        var body = document.implementation.createHTMLDocument("").body;
        return body.innerHTML = "<form></form><form></form>", 2 === body.childNodes.length;
    }(), jQuery.parseHTML = function(data, context, keepScripts) {
        if ("string" != typeof data) return [];
        "boolean" == typeof context && (keepScripts = context, context = !1);
        var base, parsed, scripts;
        return context || (support.createHTMLDocument ? (context = document.implementation.createHTMLDocument(""), 
        base = context.createElement("base"), base.href = document.location.href, context.head.appendChild(base)) : context = document), 
        parsed = rsingleTag.exec(data), scripts = !keepScripts && [], parsed ? [ context.createElement(parsed[1]) ] : (parsed = buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    }, jQuery.fn.load = function(url, params, callback) {
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off > -1 && (selector = stripAndCollapse(url.slice(off)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).always(callback && function(jqXHR, status) {
            self.each(function() {
                callback.apply(this, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.pseudos.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    }, jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), 
            null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, rect, doc, elem = this[0];
            if (elem) return elem.getClientRects().length ? (rect = elem.getBoundingClientRect(), 
            rect.width || rect.height ? (doc = elem.ownerDocument, win = getWindow(doc), docElem = doc.documentElement, 
            {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft
            }) : rect) : {
                top: 0,
                left: 0
            };
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset = {
                    top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", !0),
                    left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", !0)
                }), {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent; offsetParent && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || documentElement;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val);
            }, method, val, arguments.length);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? 0 === funcName.indexOf("outer") ? elem["inner" + name] : elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable);
            };
        });
    }), jQuery.fn.extend({
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    }), jQuery.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery;
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function($) {
    "use strict";
    var version = $.fn.jquery.split(" ")[0].split(".");
    if (version[0] < 2 && version[1] < 9 || 1 == version[0] && 9 == version[1] && version[2] < 1 || version[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap"), transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
        };
        return !1;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1, $el = this;
        $(this).one("bsTransitionEnd", function() {
            called = !0;
        });
        var callback = function() {
            called || $($el).trigger($.support.transition.end);
        };
        return setTimeout(callback, duration), this;
    }, $(function() {
        $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
        $(el).on("click", dismiss, this.close);
    };
    Alert.VERSION = "3.3.7", Alert.TRANSITION_DURATION = 150, Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove();
        }
        var $this = $(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = $("#" === selector ? [] : selector);
        e && e.preventDefault(), $parent.length || ($parent = $this.closest(".alert")), 
        $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
        $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement());
    };
    var old = $.fn.alert;
    $.fn.alert = Plugin, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this;
    }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.button"), options = "object" == typeof option && option;
            data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option);
        });
    }
    var Button = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), 
        this.isLoading = !1;
    };
    Button.VERSION = "3.3.7", Button.DEFAULTS = {
        loadingText: "loading..."
    }, Button.prototype.setState = function(state) {
        var d = "disabled", $el = this.$element, val = $el.is("input") ? "val" : "html", data = $el.data();
        state += "Text", null == data.resetText && $el.data("resetText", $el[val]()), setTimeout($.proxy(function() {
            $el[val](null == data[state] ? this.options[state] : data[state]), "loadingText" == state ? (this.isLoading = !0, 
            $el.addClass(d).attr(d, d).prop(d, !0)) : this.isLoading && (this.isLoading = !1, 
            $el.removeClass(d).removeAttr(d).prop(d, !1));
        }, this), 0);
    }, Button.prototype.toggle = function() {
        var changed = !0, $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            "radio" == $input.prop("type") ? ($input.prop("checked") && (changed = !1), $parent.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == $input.prop("type") && ($input.prop("checked") !== this.$element.hasClass("active") && (changed = !1), 
            this.$element.toggleClass("active")), $input.prop("checked", this.$element.hasClass("active")), 
            changed && $input.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var old = $.fn.button;
    $.fn.button = Plugin, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
        return $.fn.button = old, this;
    }, $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target).closest(".btn");
        Plugin.call($btn, "toggle"), $(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(), 
        $btn.is("input,button") ? $btn.trigger("focus") : $btn.find("input:visible,button:visible").first().trigger("focus"));
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.carousel"), options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option), action = "string" == typeof option ? option : options.slide;
            data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle();
        });
    }
    var Carousel = function(element, options) {
        this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = options, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
    };
    Carousel.VERSION = "3.3.7", Carousel.TRANSITION_DURATION = 600, Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, Carousel.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            e.preventDefault();
        }
    }, Carousel.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), 
        this;
    }, Carousel.prototype.getItemIndex = function(item) {
        return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
    }, Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active), willWrap = "prev" == direction && 0 === activeIndex || "next" == direction && activeIndex == this.$items.length - 1;
        if (willWrap && !this.options.wrap) return active;
        var delta = "prev" == direction ? -1 : 1, itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
    }, Carousel.prototype.to = function(pos) {
        var that = this, activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(pos > this.$items.length - 1 || pos < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            that.to(pos);
        }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
    }, Carousel.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, Carousel.prototype.next = function() {
        if (!this.sliding) return this.slide("next");
    }, Carousel.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev");
    }, Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active"), $next = next || this.getItemForDirection(type, $active), isCycling = this.interval, direction = "next" == type ? "left" : "right", that = this;
        if ($next.hasClass("active")) return this.sliding = !1;
        var relatedTarget = $next[0], slideEvent = $.Event("slide.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        if (this.$element.trigger(slideEvent), !slideEvent.isDefaultPrevented()) {
            if (this.sliding = !0, isCycling && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active");
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            return $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type), 
            $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one("bsTransitionEnd", function() {
                $next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), 
                that.sliding = !1, setTimeout(function() {
                    that.$element.trigger(slidEvent);
                }, 0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"), 
            $next.addClass("active"), this.sliding = !1, this.$element.trigger(slidEvent)), 
            isCycling && this.cycle(), this;
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = Plugin, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old, this;
    };
    var clickHandler = function(e) {
        var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        if ($target.hasClass("carousel")) {
            var options = $.extend({}, $target.data(), $this.data()), slideIndex = $this.attr("data-slide-to");
            slideIndex && (options.interval = !1), Plugin.call($target, options), slideIndex && $target.data("bs.carousel").to(slideIndex), 
            e.preventDefault();
        }
    };
    $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler), 
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            Plugin.call($carousel, $carousel.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function getTargetFromTrigger($trigger) {
        var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return $(target);
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), 
            "string" == typeof option && data[option]();
        });
    }
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), 
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    Collapse.VERSION = "3.3.7", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
        toggle: !0
    }, Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    }, Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                var startEvent = $.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), 
                        this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };
                    if (!$.support.transition) return complete.call(this);
                    var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
                }
            }
        }
    }, Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
            }
        }
    }, Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
    }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
    };
    var old = $.fn.collapse;
    $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this;
    }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        $this.attr("data-target") || e.preventDefault();
        var $target = getTargetFromTrigger($this), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data();
        Plugin.call($target, option);
    });
}(jQuery), +function($) {
    "use strict";
    function getParent($this) {
        var selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    function clearMenus(e) {
        e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
            var $this = $(this), $parent = getParent($this), relatedTarget = {
                relatedTarget: this
            };
            $parent.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target) || ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), 
            e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget)))));
        }));
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.dropdown");
            data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var backdrop = ".dropdown-backdrop", toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
        $(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.VERSION = "3.3.7", Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this), isActive = $parent.hasClass("open");
            if (clearMenus(), !isActive) {
                "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
                var relatedTarget = {
                    relatedTarget: this
                };
                if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget));
            }
            return !1;
        }
    }, Dropdown.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var $this = $(this);
            if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                var $parent = getParent($this), isActive = $parent.hasClass("open");
                if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), 
                $this.trigger("click");
                var desc = " li:not(.disabled):visible a", $items = $parent.find(".dropdown-menu" + desc);
                if ($items.length) {
                    var index = $items.index(e.target);
                    38 == e.which && index > 0 && index--, 40 == e.which && index < $items.length - 1 && index++, 
                    ~index || (index = 0), $items.eq(index).trigger("focus");
                }
            }
        }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = old, this;
    }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.modal"), options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget);
        });
    }
    var Modal = function(element, options) {
        this.options = options, this.$body = $(document.body), this.$element = $(element), 
        this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, 
        this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, 
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    Modal.VERSION = "3.3.7", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150, 
    Modal.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    }, Modal.prototype.show = function(_relatedTarget) {
        var that = this, e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                $(e.target).is(that.$element) && (that.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), 
            that.adjustDialog(), transition && that.$element[0].offsetWidth, that.$element.addClass("in"), 
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$dialog.one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
        }));
    }, Modal.prototype.hide = function(e) {
        e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        $(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal());
    }, Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
        }, this));
    }, Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
            27 == e.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, Modal.prototype.resize = function() {
        this.isShown ? $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this)) : $(window).off("resize.bs.modal");
    }, Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide(), this.backdrop(function() {
            that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(), 
            that.$element.trigger("hidden.bs.modal");
        });
    }, Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, Modal.prototype.backdrop = function(callback) {
        var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), 
            !callback) return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop(), callback && callback();
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else callback && callback();
    }, Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
        });
    }, Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth, this.scrollbarWidth = this.measureScrollbar();
    }, Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
    }, Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        return this.$body[0].removeChild(scrollDiv), scrollbarWidth;
    };
    var old = $.fn.modal;
    $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
        return $.fn.modal = old, this;
    }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
            showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus");
            });
        }), Plugin.call($target, option, this);
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tooltip"), options = "object" == typeof option && option;
            !data && /destroy|hide/.test(option) || (data || $this.data("bs.tooltip", data = new Tooltip(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Tooltip = function(element, options) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", element, options);
    };
    Tooltip.VERSION = "3.3.7", Tooltip.TRANSITION_DURATION = 150, Tooltip.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, Tooltip.prototype.init = function(type, element, options) {
        if (this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if ("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)); else if ("manual" != trigger) {
                var eventIn = "hover" == trigger ? "mouseenter" : "focusin", eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), 
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }, Tooltip.prototype.getOptions = function(options) {
        return options = $.extend({}, this.getDefaults(), this.$element.data(), options), 
        options.delay && "number" == typeof options.delay && (options.delay = {
            show: options.delay,
            hide: options.delay
        }), options;
    }, Tooltip.prototype.getDelegateOptions = function() {
        var options = {}, defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
            defaults[key] != value && (options[key] = value);
        }), options;
    }, Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = !0), 
        self.tip().hasClass("in") || "in" == self.hoverState ? void (self.hoverState = "in") : (clearTimeout(self.timeout), 
        self.hoverState = "in", self.options.delay && self.options.delay.show ? void (self.timeout = setTimeout(function() {
            "in" == self.hoverState && self.show();
        }, self.options.delay.show)) : self.show());
    }, Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) if (this.inState[key]) return !0;
        return !1;
    }, Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = !1), 
        !self.isInStateTrue()) return clearTimeout(self.timeout), self.hoverState = "out", 
        self.options.delay && self.options.delay.hide ? void (self.timeout = setTimeout(function() {
            "out" == self.hoverState && self.hide();
        }, self.options.delay.hide)) : self.hide();
    }, Tooltip.prototype.show = function() {
        var e = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !inDom) return;
            var that = this, $tip = this.tip(), tipId = this.getUID(this.type);
            this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId), 
            this.options.animation && $tip.addClass("fade");
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement, viewportDim = this.getPosition(this.$viewport);
                placement = "bottom" == placement && pos.bottom + actualHeight > viewportDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < viewportDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > viewportDim.width ? "left" : "left" == placement && pos.left - actualWidth < viewportDim.left ? "right" : placement, 
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
                var prevHoverState = that.hoverState;
                that.$element.trigger("shown.bs." + that.type), that.hoverState = null, "out" == prevHoverState && that.leave(that);
            };
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
    }, Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, marginTop = parseInt($tip.css("margin-top"), 10), marginLeft = parseInt($tip.css("margin-left"), 10);
        isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top += marginTop, 
        offset.left += marginLeft, $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0), $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
        "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        delta.left ? offset.left += delta.left : offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement), arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight, arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
    }, Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
    }, Tooltip.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
    }, Tooltip.prototype.hide = function(callback) {
        function complete() {
            "in" != that.hoverState && $tip.detach(), that.$element && that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type), 
            callback && callback();
        }
        var that = this, $tip = $(this.$tip), e = $.Event("hide.bs." + this.type);
        if (this.$element.trigger(e), !e.isDefaultPrevented()) return $tip.removeClass("in"), 
        $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), 
        this.hoverState = null, this;
    }, Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }, Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }, Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0], isBody = "BODY" == el.tagName, elRect = el.getBoundingClientRect();
        null == elRect.width && (elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
        }));
        var isSvg = window.SVGElement && el instanceof window.SVGElement, elOffset = isBody ? {
            top: 0,
            left: 0
        } : isSvg ? null : $element.offset(), scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }, outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
    }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" == placement ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "top" == placement ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "left" == placement ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0, viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll, bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset);
        } else {
            var leftEdgeOffset = pos.left - viewportPadding, rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.right && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset);
        }
        return delta;
    }, Tooltip.prototype.getTitle = function() {
        var title, $e = this.$element, o = this.options;
        return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
    }, Tooltip.prototype.getUID = function(prefix) {
        do prefix += ~~(1e6 * Math.random()); while (document.getElementById(prefix));
        return prefix;
    }, Tooltip.prototype.tip = function() {
        if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, Tooltip.prototype.enable = function() {
        this.enabled = !0;
    }, Tooltip.prototype.disable = function() {
        this.enabled = !1;
    }, Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && (self = $(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        $(e.currentTarget).data("bs." + this.type, self))), e ? (self.inState.click = !self.inState.click, 
        self.isInStateTrue() ? self.enter(self) : self.leave(self)) : self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    }, Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout), this.hide(function() {
            that.$element.off("." + that.type).removeData("bs." + that.type), that.$tip && that.$tip.detach(), 
            that.$tip = null, that.$arrow = null, that.$viewport = null, that.$element = null;
        });
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = Plugin, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.popover"), options = "object" == typeof option && option;
            !data && /destroy|hide/.test(option) || (data || $this.data("bs.popover", data = new Popover(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
    Popover.VERSION = "3.3.7", Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, 
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }, Popover.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), 
        $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide();
    }, Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, Popover.prototype.getContent = function() {
        var $e = this.$element, o = this.options;
        return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
    }, Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var old = $.fn.popover;
    $.fn.popover = Plugin, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
        return $.fn.popover = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function ScrollSpy(element, options) {
        this.$body = $(document.body), this.$scrollElement = $($(element).is(document.body) ? window : element), 
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.scrollspy"), options = "object" == typeof option && option;
            data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]();
        });
    }
    ScrollSpy.VERSION = "3.3.7", ScrollSpy.DEFAULTS = {
        offset: 10
    }, ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, ScrollSpy.prototype.refresh = function() {
        var that = this, offsetMethod = "offset", offsetBase = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        $.isWindow(this.$scrollElement[0]) || (offsetMethod = "position", offsetBase = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#./.test(href) && $(href);
            return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + offsetBase, href ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            that.offsets.push(this[0]), that.targets.push(this[1]);
        });
    }, ScrollSpy.prototype.process = function() {
        var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.getScrollHeight(), maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
        if (this.scrollHeight != scrollHeight && this.refresh(), scrollTop >= maxScroll) return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        if (activeTarget && scrollTop < offsets[0]) return this.activeTarget = null, this.clear();
        for (i = offsets.length; i--; ) activeTarget != targets[i] && scrollTop >= offsets[i] && (void 0 === offsets[i + 1] || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }, ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target, this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = $(selector).parents("li").addClass("active");
        active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), 
        active.trigger("activate.bs.scrollspy");
    }, ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = Plugin, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = old, this;
    }, $(window).on("load.bs.scrollspy.data-api", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]();
        });
    }
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.VERSION = "3.3.7", Tab.TRANSITION_DURATION = 150, Tab.prototype.show = function() {
        var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.data("target");
        if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        !$this.parent("li").hasClass("active")) {
            var $previous = $ul.find(".active:last a"), hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            }), showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            if ($previous.trigger(hideEvent), $this.trigger(showEvent), !showEvent.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                    $previous.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: $this[0]
                    }), $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: $previous[0]
                    });
                });
            }
        }
    }, Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
            element.parent(".dropdown-menu").length && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            callback && callback();
        }
        var $active = container.find("> .active"), transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(), 
        $active.removeClass("in");
    };
    var old = $.fn.tab;
    $.fn.tab = Plugin, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
        return $.fn.tab = old, this;
    };
    var clickHandler = function(e) {
        e.preventDefault(), Plugin.call($(this), "show");
    };
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.affix"), options = "object" == typeof option && option;
            data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]();
        });
    }
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options), this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = $(element), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    Affix.VERSION = "3.3.7", Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
        offset: 0,
        target: window
    }, Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset(), targetHeight = this.$target.height();
        if (null != offsetTop && "top" == this.affixed) return scrollTop < offsetTop && "top";
        if ("bottom" == this.affixed) return null != offsetTop ? !(scrollTop + this.unpin <= position.top) && "bottom" : !(scrollTop + targetHeight <= scrollHeight - offsetBottom) && "bottom";
        var initializing = null == this.affixed, colliderTop = initializing ? scrollTop : position.top, colliderHeight = initializing ? targetHeight : height;
        return null != offsetTop && scrollTop <= offsetTop ? "top" : null != offsetBottom && colliderTop + colliderHeight >= scrollHeight - offsetBottom && "bottom";
    }, Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop;
    }, Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    }, Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var height = this.$element.height(), offset = this.options.offset, offsetTop = offset.top, offsetBottom = offset.bottom, scrollHeight = Math.max($(document).height(), $(document.body).height());
            "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)), 
            "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                null != this.unpin && this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : ""), e = $.Event(affixType + ".bs.affix");
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null, 
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == affix && this.$element.offset({
                top: scrollHeight - height - offsetBottom
            });
        }
    };
    var old = $.fn.affix;
    $.fn.affix = Plugin, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
        return $.fn.affix = old, this;
    }, $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this), data = $spy.data();
            data.offset = data.offset || {}, null != data.offsetBottom && (data.offset.bottom = data.offsetBottom), 
            null != data.offsetTop && (data.offset.top = data.offsetTop), Plugin.call($spy, data);
        });
    });
}(jQuery), function(root, factory) {
    "function" == typeof define && define.amd ? define([], factory(root)) : "object" == typeof exports ? module.exports = factory(root) : root.iziToast = factory(root);
}("undefined" != typeof global ? global : window || this.window || this.global, function(root) {
    "use strict";
    var $iziToast = {}, PLUGIN_NAME = "iziToast", ISMOBILE = (document.querySelector("body"), 
    !!/Mobi/.test(navigator.userAgent)), ISCHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor), ISFIREFOX = "undefined" != typeof InstallTrigger, ACCEPTSTOUCH = "ontouchstart" in document.documentElement, POSITIONS = [ "bottomRight", "bottomLeft", "bottomCenter", "topRight", "topLeft", "topCenter", "center" ], THEMES = {
        info: {
            color: "blue",
            icon: "ico-info"
        },
        success: {
            color: "green",
            icon: "ico-success"
        },
        warning: {
            color: "orange",
            icon: "ico-warning"
        },
        error: {
            color: "red",
            icon: "ico-error"
        },
        question: {
            color: "yellow",
            icon: "ico-question"
        }
    }, MOBILEWIDTH = 568, CONFIG = {}, defaults = {
        id: null,
        "class": "",
        title: "",
        titleColor: "",
        titleSize: "",
        titleLineHeight: "",
        message: "",
        messageColor: "",
        messageSize: "",
        messageLineHeight: "",
        backgroundColor: "",
        theme: "light",
        color: "",
        icon: "",
        iconText: "",
        iconColor: "",
        image: "",
        imageWidth: 50,
        maxWidth: null,
        zindex: null,
        layout: 1,
        balloon: !1,
        close: !0,
        closeOnEscape: !1,
        rtl: !1,
        position: "bottomRight",
        target: "",
        targetFirst: !0,
        toastOnce: !1,
        timeout: 5e3,
        animateInside: !0,
        drag: !0,
        pauseOnHover: !0,
        resetOnHover: !1,
        progressBar: !0,
        progressBarColor: "",
        progressBarEasing: "linear",
        overlay: !1,
        overlayClose: !1,
        overlayColor: "rgba(0, 0, 0, 0.6)",
        transitionIn: "fadeInUp",
        transitionOut: "fadeOut",
        transitionInMobile: "fadeInUp",
        transitionOutMobile: "fadeOutDown",
        buttons: {},
        onOpening: function() {},
        onOpened: function() {},
        onClosing: function() {},
        onClosed: function() {}
    };
    if ("remove" in Element.prototype || (Element.prototype.remove = function() {
        this.parentNode && this.parentNode.removeChild(this);
    }), "function" != typeof window.CustomEvent) {
        var CustomEventPolyfill = function(event, params) {
            params = params || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var evt = document.createEvent("CustomEvent");
            return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), 
            evt;
        };
        CustomEventPolyfill.prototype = window.Event.prototype, window.CustomEvent = CustomEventPolyfill;
    }
    var forEach = function(collection, callback, scope) {
        if ("[object Object]" === Object.prototype.toString.call(collection)) for (var prop in collection) Object.prototype.hasOwnProperty.call(collection, prop) && callback.call(scope, collection[prop], prop, collection); else if (collection) for (var i = 0, len = collection.length; i < len; i++) callback.call(scope, collection[i], i, collection);
    }, extend = function(defaults, options) {
        var extended = {};
        return forEach(defaults, function(value, prop) {
            extended[prop] = defaults[prop];
        }), forEach(options, function(value, prop) {
            extended[prop] = options[prop];
        }), extended;
    }, createFragElem = function(htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        for (temp.innerHTML = htmlStr; temp.firstChild; ) frag.appendChild(temp.firstChild);
        return frag;
    }, isColor = function(color) {
        return "#" == color.substring(0, 1) || "rgb" == color.substring(0, 3) || "hsl" == color.substring(0, 3);
    }, isBase64 = function(str) {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return !1;
        }
    }, drag = function() {
        return {
            move: function(toast, instance, settings, xpos) {
                var opacity, opacityRange = .3, distance = 180;
                0 !== xpos && (toast.classList.add(PLUGIN_NAME + "-dragged"), toast.style.transform = "translateX(" + xpos + "px)", 
                xpos > 0 ? (opacity = (distance - xpos) / distance, opacity < opacityRange && instance.hide(toast, extend(settings, {
                    transitionOut: "fadeOutRight",
                    transitionOutMobile: "fadeOutRight"
                }), "drag")) : (opacity = (distance + xpos) / distance, opacity < opacityRange && instance.hide(toast, extend(settings, {
                    transitionOut: "fadeOutLeft",
                    transitionOutMobile: "fadeOutLeft"
                }), "drag")), toast.style.opacity = opacity, opacity < opacityRange && ((ISCHROME || ISFIREFOX) && (toast.style.left = xpos + "px"), 
                toast.parentNode.style.opacity = opacityRange, this.stopMoving(toast, null)));
            },
            startMoving: function(toast, instance, settings, e) {
                e = e || window.event;
                var posX = ACCEPTSTOUCH ? e.touches[0].clientX : e.clientX, toastLeft = toast.style.transform.replace("px)", "");
                toastLeft = toastLeft.replace("translateX(", "");
                var offsetX = posX - toastLeft;
                toast.classList.remove(settings.transitionIn), toast.classList.remove(settings.transitionInMobile), 
                toast.style.transition = "", ACCEPTSTOUCH ? document.ontouchmove = function(e) {
                    e.preventDefault(), e = e || window.event;
                    var posX = e.touches[0].clientX, finalX = posX - offsetX;
                    drag.move(toast, instance, settings, finalX);
                } : document.onmousemove = function(e) {
                    e.preventDefault(), e = e || window.event;
                    var posX = e.clientX, finalX = posX - offsetX;
                    drag.move(toast, instance, settings, finalX);
                };
            },
            stopMoving: function(toast, e) {
                ACCEPTSTOUCH ? document.ontouchmove = function() {} : document.onmousemove = function() {}, 
                toast.style.opacity = "", toast.style.transform = "", toast.classList.contains(PLUGIN_NAME + "-dragged") && (toast.classList.remove(PLUGIN_NAME + "-dragged"), 
                toast.style.transition = "transform 0.4s ease, opacity 0.4s ease", setTimeout(function() {
                    toast.style.transition = "";
                }, 400));
            }
        };
    }();
    return $iziToast.destroy = function() {
        forEach(document.querySelectorAll("." + PLUGIN_NAME + "-wrapper"), function(element, index) {
            element.remove();
        }), forEach(document.querySelectorAll("." + PLUGIN_NAME), function(element, index) {
            element.remove();
        }), document.removeEventListener(PLUGIN_NAME + "-opened", {}, !1), document.removeEventListener(PLUGIN_NAME + "-opening", {}, !1), 
        document.removeEventListener(PLUGIN_NAME + "-closing", {}, !1), document.removeEventListener(PLUGIN_NAME + "-closed", {}, !1), 
        document.removeEventListener("keyup", {}, !1), CONFIG = {};
    }, $iziToast.settings = function(options) {
        $iziToast.destroy(), CONFIG = options, defaults = extend(defaults, options || {});
    }, forEach(THEMES, function(theme, name) {
        $iziToast[name] = function(options) {
            var settings = extend(CONFIG, options || {});
            settings = extend(theme, settings || {}), this.show(settings);
        };
    }), $iziToast.progress = function($toast, options, callback) {
        var that = this, settings = extend(that.settings, options || {}), $elem = $toast.querySelector("." + PLUGIN_NAME + "-progressbar div");
        return {
            start: function() {
                null !== $elem && ($elem.style.transition = "width " + settings.timeout + "ms " + settings.progressBarEasing, 
                $elem.style.width = "0%"), settings.TIME.START = new Date().getTime(), settings.TIME.END = settings.TIME.START + settings.timeout, 
                settings.TIME.TIMER = setTimeout(function() {
                    clearTimeout(settings.TIME.TIMER), $toast.classList.contains(PLUGIN_NAME + "-closing") || (that.hide($toast, settings, "timeout"), 
                    "function" == typeof callback && callback.apply(that));
                }, settings.timeout);
            },
            pause: function() {
                if (settings.TIME.REMAINING = settings.TIME.END - new Date().getTime(), clearTimeout(settings.TIME.TIMER), 
                null !== $elem) {
                    var computedStyle = window.getComputedStyle($elem), propertyWidth = computedStyle.getPropertyValue("width");
                    $elem.style.transition = "none", $elem.style.width = propertyWidth;
                }
                "function" == typeof callback && setTimeout(function() {
                    callback.apply(that);
                }, 10);
            },
            resume: function() {
                null !== $elem && ($elem.style.transition = "width " + settings.TIME.REMAINING + "ms " + settings.progressBarEasing, 
                $elem.style.width = "0%"), settings.TIME.END = new Date().getTime() + settings.TIME.REMAINING, 
                settings.TIME.TIMER = setTimeout(function() {
                    clearTimeout(settings.TIME.TIMER), $toast.classList.contains(PLUGIN_NAME + "-closing") || (that.hide($toast, settings, "timeout"), 
                    "function" == typeof callback && callback.apply(that));
                }, settings.TIME.REMAINING);
            },
            reset: function() {
                clearTimeout(settings.TIME.TIMER), null !== $elem && ($elem.style.transition = "none", 
                $elem.style.width = "100%"), "function" == typeof callback && setTimeout(function() {
                    callback.apply(that);
                }, 10);
            }
        };
    }, $iziToast.hide = function($toast, options, closedBy) {
        var settings = extend(this.settings, options || {});
        closedBy = closedBy || null, "object" != typeof $toast && ($toast = document.querySelector($toast)), 
        $toast.classList.add(PLUGIN_NAME + "-closing"), settings.closedBy = closedBy, settings.REF = $toast.getAttribute("data-iziToast-ref"), 
        function() {
            var $overlay = document.querySelector("." + PLUGIN_NAME + "-overlay");
            if (null !== $overlay) {
                var refs = $overlay.getAttribute("data-iziToast-ref");
                refs = refs.split(",");
                var index = refs.indexOf(settings.REF);
                index !== -1 && refs.splice(index, 1), $overlay.setAttribute("data-iziToast-ref", refs.join()), 
                0 === refs.length && ($overlay.classList.remove("fadeIn"), $overlay.classList.add("fadeOut"), 
                setTimeout(function() {
                    $overlay.remove();
                }, 700));
            }
        }(), (settings.transitionIn || settings.transitionInMobile) && ($toast.classList.remove(settings.transitionIn), 
        $toast.classList.remove(settings.transitionInMobile)), ISMOBILE || window.innerWidth <= MOBILEWIDTH ? settings.transitionOutMobile && $toast.classList.add(settings.transitionOutMobile) : settings.transitionOut && $toast.classList.add(settings.transitionOut);
        var H = $toast.parentNode.offsetHeight;
        $toast.parentNode.style.height = H + "px", $toast.style.pointerEvents = "none", 
        (!ISMOBILE || window.innerWidth > MOBILEWIDTH) && ($toast.parentNode.style.transitionDelay = "0.2s");
        try {
            settings.closedBy = closedBy;
            var event = new CustomEvent(PLUGIN_NAME + "-closing", {
                detail: settings,
                bubbles: !0,
                cancelable: !0
            });
            document.dispatchEvent(event);
        } catch (ex) {
            console.warn(ex);
        }
        setTimeout(function() {
            $toast.parentNode.style.height = "0px", $toast.parentNode.style.overflow = "", setTimeout(function() {
                $toast.parentNode.remove();
                try {
                    settings.closedBy = closedBy;
                    var event = new CustomEvent(PLUGIN_NAME + "-closed", {
                        detail: settings,
                        bubbles: !0,
                        cancelable: !0
                    });
                    document.dispatchEvent(event);
                } catch (ex) {
                    console.warn(ex);
                }
                "undefined" != typeof settings.onClosed && settings.onClosed.apply(null, [ settings, $toast, closedBy ]);
            }, 1e3);
        }, 200), "undefined" != typeof settings.onClosing && settings.onClosing.apply(null, [ settings, $toast, closedBy ]);
    }, $iziToast.show = function(options) {
        var that = this, settings = extend(CONFIG, options || {});
        if (settings = extend(defaults, settings), settings.TIME = {}, settings.toastOnce && settings.id && document.querySelectorAll("." + PLUGIN_NAME + "#" + settings.id).length > 0) return !1;
        settings.REF = new Date().getTime() + Math.floor(1e7 * Math.random() + 1);
        var $DOM = {
            body: document.querySelector("body"),
            overlay: document.createElement("div"),
            toast: document.createElement("div"),
            toastBody: document.createElement("div"),
            toastTexts: document.createElement("div"),
            toastCapsule: document.createElement("div"),
            icon: document.createElement("i"),
            cover: document.createElement("div"),
            buttons: document.createElement("div"),
            wrapper: null
        };
        $DOM.toast.setAttribute("data-iziToast-ref", settings.REF), $DOM.toast.appendChild($DOM.toastBody), 
        $DOM.toastCapsule.appendChild($DOM.toast), function() {
            if ($DOM.toast.classList.add(PLUGIN_NAME), $DOM.toast.classList.add(PLUGIN_NAME + "-opening"), 
            $DOM.toastCapsule.classList.add(PLUGIN_NAME + "-capsule"), $DOM.toastBody.classList.add(PLUGIN_NAME + "-body"), 
            $DOM.toastTexts.classList.add(PLUGIN_NAME + "-texts"), ISMOBILE || window.innerWidth <= MOBILEWIDTH ? settings.transitionInMobile && $DOM.toast.classList.add(settings.transitionInMobile) : settings.transitionIn && $DOM.toast.classList.add(settings.transitionIn), 
            settings["class"]) {
                var classes = settings["class"].split(" ");
                forEach(classes, function(value, index) {
                    $DOM.toast.classList.add(value);
                });
            }
            settings.id && ($DOM.toast.id = settings.id), settings.rtl && $DOM.toast.classList.add(PLUGIN_NAME + "-rtl"), 
            settings.layout > 1 && $DOM.toast.classList.add(PLUGIN_NAME + "-layout" + settings.layout), 
            settings.balloon && $DOM.toast.classList.add(PLUGIN_NAME + "-balloon"), settings.maxWidth && (isNaN(settings.maxWidth) ? $DOM.toast.style.maxWidth = settings.maxWidth : $DOM.toast.style.maxWidth = settings.maxWidth + "px"), 
            "" === settings.theme && "light" === settings.theme || $DOM.toast.classList.add(PLUGIN_NAME + "-theme-" + settings.theme), 
            settings.color && (isColor(settings.color) ? $DOM.toast.style.background = settings.color : $DOM.toast.classList.add(PLUGIN_NAME + "-color-" + settings.color)), 
            settings.backgroundColor && ($DOM.toast.style.background = settings.backgroundColor, 
            settings.balloon && ($DOM.toast.style.borderColor = settings.backgroundColor));
        }(), function() {
            settings.image && ($DOM.cover.classList.add(PLUGIN_NAME + "-cover"), $DOM.cover.style.width = settings.imageWidth + "px", 
            isBase64(settings.image.replace(/ /g, "")) ? $DOM.cover.style.backgroundImage = "url(data:image/png;base64," + settings.image.replace(/ /g, "") + ")" : $DOM.cover.style.backgroundImage = "url(" + settings.image + ")", 
            settings.rtl ? $DOM.toastBody.style.marginRight = settings.imageWidth + 10 + "px" : $DOM.toastBody.style.marginLeft = settings.imageWidth + 10 + "px", 
            $DOM.toast.appendChild($DOM.cover));
        }(), function() {
            settings.close ? ($DOM.buttonClose = document.createElement("button"), $DOM.buttonClose.classList.add(PLUGIN_NAME + "-close"), 
            $DOM.buttonClose.addEventListener("click", function(e) {
                e.target;
                that.hide($DOM.toast, settings, "button");
            }), $DOM.toast.appendChild($DOM.buttonClose)) : settings.rtl ? $DOM.toast.style.paddingLeft = "20px" : $DOM.toast.style.paddingRight = "20px";
        }(), function() {
            settings.timeout && (settings.progressBar && ($DOM.progressBar = document.createElement("div"), 
            $DOM.progressBarDiv = document.createElement("div"), $DOM.progressBar.classList.add(PLUGIN_NAME + "-progressbar"), 
            $DOM.progressBarDiv.style.background = settings.progressBarColor, $DOM.progressBar.appendChild($DOM.progressBarDiv), 
            $DOM.toast.appendChild($DOM.progressBar)), settings.pauseOnHover && !settings.resetOnHover && ($DOM.toast.addEventListener("mouseenter", function(e) {
                this.classList.add(PLUGIN_NAME + "-paused"), that.progress($DOM.toast, settings).pause();
            }), $DOM.toast.addEventListener("mouseleave", function(e) {
                this.classList.remove(PLUGIN_NAME + "-paused"), that.progress($DOM.toast, settings).resume();
            })), settings.resetOnHover && ($DOM.toast.addEventListener("mouseenter", function(e) {
                this.classList.add(PLUGIN_NAME + "-reseted"), that.progress($DOM.toast, settings).reset();
            }), $DOM.toast.addEventListener("mouseleave", function(e) {
                this.classList.remove(PLUGIN_NAME + "-reseted"), that.progress($DOM.toast, settings).start();
            })));
        }(), function() {
            settings.icon && ($DOM.icon.setAttribute("class", PLUGIN_NAME + "-icon " + settings.icon), 
            settings.iconText && $DOM.icon.appendChild(document.createTextNode(settings.iconText)), 
            settings.rtl ? $DOM.toastBody.style.paddingRight = "33px" : $DOM.toastBody.style.paddingLeft = "33px", 
            settings.iconColor && ($DOM.icon.style.color = settings.iconColor), $DOM.toastBody.appendChild($DOM.icon));
        }(), function() {
            settings.title.length > 0 && ($DOM.strong = document.createElement("strong"), $DOM.strong.classList.add(PLUGIN_NAME + "-title"), 
            $DOM.strong.appendChild(createFragElem(settings.title)), $DOM.toastTexts.appendChild($DOM.strong), 
            settings.titleColor && ($DOM.strong.style.color = settings.titleColor), settings.titleSize && (isNaN(settings.titleSize) ? $DOM.strong.style.fontSize = settings.titleSize : $DOM.strong.style.fontSize = settings.titleSize + "px"), 
            settings.titleLineHeight && (isNaN(settings.titleSize) ? $DOM.strong.style.lineHeight = settings.titleLineHeight : $DOM.strong.style.lineHeight = settings.titleLineHeight + "px"));
        }(), function() {
            settings.message.length > 0 && ($DOM.p = document.createElement("p"), $DOM.p.classList.add(PLUGIN_NAME + "-message"), 
            $DOM.p.appendChild(createFragElem(settings.message)), $DOM.toastTexts.appendChild($DOM.p), 
            settings.messageColor && ($DOM.p.style.color = settings.messageColor), settings.messageSize && (isNaN(settings.titleSize) ? $DOM.p.style.fontSize = settings.messageSize : $DOM.p.style.fontSize = settings.messageSize + "px"), 
            settings.messageLineHeight && (isNaN(settings.titleSize) ? $DOM.p.style.lineHeight = settings.messageLineHeight : $DOM.p.style.lineHeight = settings.messageLineHeight + "px"));
        }(), settings.title.length > 0 && settings.message.length > 0 && (settings.rtl ? $DOM.strong.style.marginLeft = "10px" : 2 === settings.layout || settings.rtl || ($DOM.strong.style.marginRight = "10px")), 
        $DOM.toastBody.appendChild($DOM.toastTexts), function() {
            settings.buttons.length > 0 && ($DOM.buttons.classList.add(PLUGIN_NAME + "-buttons"), 
            settings.title.length > 0 && 0 === settings.message.length && (settings.rtl ? $DOM.strong.style.marginLeft = "15px" : $DOM.strong.style.marginRight = "15px"), 
            settings.message.length > 0 && (settings.rtl ? $DOM.p.style.marginLeft = "15px" : $DOM.p.style.marginRight = "15px", 
            $DOM.p.style.marginBottom = "0"), forEach(settings.buttons, function(value, index) {
                $DOM.buttons.appendChild(createFragElem(value[0]));
                var $btns = $DOM.buttons.childNodes;
                $btns[index].classList.add(PLUGIN_NAME + "-buttons-child"), value[2] && setTimeout(function() {
                    $btns[index].focus();
                }, 300), $btns[index].addEventListener("click", function(e) {
                    e.preventDefault();
                    var ts = value[1];
                    return ts(that, $DOM.toast);
                });
            })), $DOM.toastBody.appendChild($DOM.buttons);
        }(), function() {
            $DOM.toastCapsule.style.visibility = "hidden", setTimeout(function() {
                var H = $DOM.toast.offsetHeight, style = $DOM.toast.currentStyle || window.getComputedStyle($DOM.toast), marginTop = style.marginTop;
                marginTop = marginTop.split("px"), marginTop = parseInt(marginTop[0]);
                var marginBottom = style.marginBottom;
                marginBottom = marginBottom.split("px"), marginBottom = parseInt(marginBottom[0]), 
                $DOM.toastCapsule.style.visibility = "", $DOM.toastCapsule.style.height = H + marginBottom + marginTop + "px", 
                setTimeout(function() {
                    $DOM.toastCapsule.style.height = "auto", settings.target && ($DOM.toastCapsule.style.overflow = "visible");
                }, 500), settings.timeout && that.progress($DOM.toast, settings).start();
            }, 100);
        }(), function() {
            var position = settings.position;
            if (settings.target) $DOM.wrapper = document.querySelector(settings.target), $DOM.wrapper.classList.add(PLUGIN_NAME + "-target"), 
            settings.targetFirst ? $DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild) : $DOM.wrapper.appendChild($DOM.toastCapsule); else {
                if (POSITIONS.indexOf(settings.position) == -1) return void console.warn("[" + PLUGIN_NAME + "] Incorrect position.\nIt can be › " + POSITIONS);
                position = ISMOBILE || window.innerWidth <= MOBILEWIDTH ? "bottomLeft" == settings.position || "bottomRight" == settings.position || "bottomCenter" == settings.position ? PLUGIN_NAME + "-wrapper-bottomCenter" : "topLeft" == settings.position || "topRight" == settings.position || "topCenter" == settings.position ? PLUGIN_NAME + "-wrapper-topCenter" : PLUGIN_NAME + "-wrapper-center" : PLUGIN_NAME + "-wrapper-" + position, 
                $DOM.wrapper = document.querySelector("." + PLUGIN_NAME + "-wrapper." + position), 
                $DOM.wrapper || ($DOM.wrapper = document.createElement("div"), $DOM.wrapper.classList.add(PLUGIN_NAME + "-wrapper"), 
                $DOM.wrapper.classList.add(position), document.body.appendChild($DOM.wrapper)), 
                "topLeft" == settings.position || "topCenter" == settings.position || "topRight" == settings.position ? $DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild) : $DOM.wrapper.appendChild($DOM.toastCapsule);
            }
            isNaN(settings.zindex) ? console.warn("[" + PLUGIN_NAME + "] Invalid zIndex.") : $DOM.wrapper.style.zIndex = settings.zindex;
        }(), function() {
            settings.overlay && (null !== document.querySelector("." + PLUGIN_NAME + "-overlay.fadeIn") ? ($DOM.overlay = document.querySelector("." + PLUGIN_NAME + "-overlay"), 
            $DOM.overlay.setAttribute("data-iziToast-ref", $DOM.overlay.getAttribute("data-iziToast-ref") + "," + settings.REF), 
            isNaN(settings.zindex) || null === settings.zindex || ($DOM.overlay.style.zIndex = settings.zindex - 1)) : ($DOM.overlay.classList.add(PLUGIN_NAME + "-overlay"), 
            $DOM.overlay.classList.add("fadeIn"), $DOM.overlay.style.background = settings.overlayColor, 
            $DOM.overlay.setAttribute("data-iziToast-ref", settings.REF), isNaN(settings.zindex) || null === settings.zindex || ($DOM.overlay.style.zIndex = settings.zindex - 1), 
            document.querySelector("body").appendChild($DOM.overlay)), settings.overlayClose ? ($DOM.overlay.removeEventListener("click", {}), 
            $DOM.overlay.addEventListener("click", function(e) {
                that.hide($DOM.toast, settings, "overlay");
            })) : $DOM.overlay.removeEventListener("click", {}));
        }(), function() {
            if (settings.animateInside) {
                $DOM.toast.classList.add(PLUGIN_NAME + "-animateInside");
                var animationTimes = [ 200, 100, 300 ];
                if ("bounceInLeft" == settings.transitionIn && (animationTimes = [ 400, 200, 400 ]), 
                settings.title.length > 0 && setTimeout(function() {
                    $DOM.strong.classList.add("slideIn");
                }, animationTimes[0]), settings.message.length > 0 && setTimeout(function() {
                    $DOM.p.classList.add("slideIn");
                }, animationTimes[1]), settings.icon && setTimeout(function() {
                    $DOM.icon.classList.add("revealIn");
                }, animationTimes[2]), settings.buttons.length > 0 && $DOM.buttons) {
                    var counter = 150;
                    forEach($DOM.buttons.childNodes, function(element, index) {
                        setTimeout(function() {
                            element.classList.add("revealIn");
                        }, counter), counter += 150;
                    });
                }
            }
        }(), settings.onOpening.apply(null, [ settings, $DOM.toast ]);
        try {
            var event = new CustomEvent(PLUGIN_NAME + "-opening", {
                detail: settings,
                bubbles: !0,
                cancelable: !0
            });
            document.dispatchEvent(event);
        } catch (ex) {
            console.warn(ex);
        }
        setTimeout(function() {
            $DOM.toast.classList.remove(PLUGIN_NAME + "-opening"), $DOM.toast.classList.add(PLUGIN_NAME + "-opened");
            try {
                var event = new CustomEvent(PLUGIN_NAME + "-opened", {
                    detail: settings,
                    bubbles: !0,
                    cancelable: !0
                });
                document.dispatchEvent(event);
            } catch (ex) {
                console.warn(ex);
            }
            settings.onOpened.apply(null, [ settings, $DOM.toast ]);
        }, 1e3), settings.drag && (ACCEPTSTOUCH ? ($DOM.toast.addEventListener("touchstart", function(e) {
            drag.startMoving(this, that, settings, e);
        }, !1), $DOM.toast.addEventListener("touchend", function(e) {
            drag.stopMoving(this, e);
        }, !1)) : ($DOM.toast.addEventListener("mousedown", function(e) {
            e.preventDefault(), drag.startMoving(this, that, settings, e);
        }, !1), $DOM.toast.addEventListener("mouseup", function(e) {
            e.preventDefault(), drag.stopMoving(this, e);
        }, !1))), settings.closeOnEscape && document.addEventListener("keyup", function(evt) {
            evt = evt || window.event, 27 == evt.keyCode && that.hide($DOM.toast, settings, "esc");
        }), that.toast = $DOM.toast;
    }, $iziToast;
}), !function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(window.jQuery);
}(function(e) {
    "use strict";
    e.fn.fileinputLocales = {}, e.fn.fileinputThemes = {};
    var i, t;
    i = {
        FRAMES: ".kv-preview-thumb",
        SORT_CSS: "file-sortable",
        STYLE_SETTING: 'style="width:{width};height:{height};"',
        OBJECT_PARAMS: '<param name="controller" value="true" />\n<param name="allowFullScreen" value="true" />\n<param name="allowScriptAccess" value="always" />\n<param name="autoPlay" value="false" />\n<param name="autoStart" value="false" />\n<param name="quality" value="high" />\n',
        DEFAULT_PREVIEW: '<div class="file-preview-other">\n<span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>',
        MODAL_ID: "kvFileinputModal",
        MODAL_EVENTS: [ "show", "shown", "hide", "hidden", "loaded" ],
        objUrl: window.URL || window.webkitURL,
        compare: function(e, i, t) {
            return void 0 !== e && (t ? e === i : e.match(i));
        },
        isIE: function(e) {
            if ("Microsoft Internet Explorer" !== navigator.appName) return !1;
            if (10 === e) return new RegExp("msie\\s" + e, "i").test(navigator.userAgent);
            var i, t = document.createElement("div");
            return t.innerHTML = "<!--[if IE " + e + "]> <i></i> <![endif]-->", i = t.getElementsByTagName("i").length, 
            document.body.appendChild(t), t.parentNode.removeChild(t), i;
        },
        initModal: function(i) {
            var t = e("body");
            t.length && i.appendTo(t);
        },
        isEmpty: function(i, t) {
            return void 0 === i || null === i || 0 === i.length || t && "" === e.trim(i);
        },
        isArray: function(e) {
            return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e);
        },
        ifSet: function(e, i, t) {
            return t = t || "", i && "object" == typeof i && e in i ? i[e] : t;
        },
        cleanArray: function(e) {
            return e instanceof Array || (e = []), e.filter(function(e) {
                return void 0 !== e && null !== e;
            });
        },
        spliceArray: function(e, i) {
            var t, a = 0, r = [];
            if (!(e instanceof Array)) return [];
            for (t = 0; t < e.length; t++) t !== i && (r[a] = e[t], a++);
            return r;
        },
        getNum: function(e, i) {
            return i = i || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), 
            isNaN(e) ? i : e);
        },
        hasFileAPISupport: function() {
            return !(!window.File || !window.FileReader);
        },
        hasDragDropSupport: function() {
            var e = document.createElement("div");
            return !i.isIE(9) && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop);
        },
        hasFileUploadSupport: function() {
            return i.hasFileAPISupport() && window.FormData;
        },
        addCss: function(e, i) {
            e.removeClass(i).addClass(i);
        },
        getElement: function(t, a, r) {
            return i.isEmpty(t) || i.isEmpty(t[a]) ? r : e(t[a]);
        },
        uniqId: function() {
            return Math.round(new Date().getTime() + 100 * Math.random());
        },
        htmlEncode: function(e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        },
        replaceTags: function(i, t) {
            var a = i;
            return t ? (e.each(t, function(e, i) {
                "function" == typeof i && (i = i()), a = a.split(e).join(i);
            }), a) : a;
        },
        cleanMemory: function(e) {
            var t = e.is("img") ? e.attr("src") : e.find("source").attr("src");
            i.objUrl.revokeObjectURL(t);
        },
        findFileName: function(e) {
            var i = e.lastIndexOf("/");
            return -1 === i && (i = e.lastIndexOf("\\")), e.split(e.substring(i, i + 1)).pop();
        },
        checkFullScreen: function() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        },
        toggleFullScreen: function(e) {
            var t = document, a = t.documentElement;
            a && e && !i.checkFullScreen() ? a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : t.exitFullscreen ? t.exitFullscreen() : t.msExitFullscreen ? t.msExitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen && t.webkitExitFullscreen();
        },
        moveArray: function(e, i, t) {
            if (t >= e.length) for (var a = t - e.length; a-- + 1; ) e.push(void 0);
            return e.splice(t, 0, e.splice(i, 1)[0]), e;
        },
        cleanZoomCache: function(e) {
            var i = e.closest(".kv-zoom-cache-theme");
            i.length || (i = e.closest(".kv-zoom-cache")), i.remove();
        }
    }, t = function(t, a) {
        var r = this;
        r.$element = e(t), r._validate() && (r.isPreviewable = i.hasFileAPISupport(), r.isIE9 = i.isIE(9), 
        r.isIE10 = i.isIE(10), r.isPreviewable || r.isIE9 ? (r._init(a), r._listen()) : r.$element.removeClass("file-loading"));
    }, t.prototype = {
        constructor: t,
        _init: function(t) {
            var a, r, n = this, o = n.$element;
            n.options = t, e.each(t, function(e, t) {
                switch (e) {
                  case "minFileCount":
                  case "maxFileCount":
                  case "maxFileSize":
                    n[e] = i.getNum(t);
                    break;

                  default:
                    n[e] = t;
                }
            }), n.$form = o.closest("form"), n._initTemplateDefaults(), n.fileInputCleared = !1, 
            n.fileBatchCompleted = !0, n.isPreviewable || (n.showPreview = !1), n.uploadFileAttr = i.isEmpty(o.attr("name")) ? "file_data" : o.attr("name"), 
            n.reader = null, n.formdata = {}, n.clearStack(), n.uploadCount = 0, n.uploadStatus = {}, 
            n.uploadLog = [], n.uploadAsyncCount = 0, n.loadedImages = [], n.totalImagesCount = 0, 
            n.ajaxRequests = [], n.isError = !1, n.ajaxAborted = !1, n.cancelling = !1, r = n._getLayoutTemplate("progress"), 
            n.progressTemplate = r.replace("{class}", n.progressClass), n.progressCompleteTemplate = r.replace("{class}", n.progressCompleteClass), 
            n.progressErrorTemplate = r.replace("{class}", n.progressErrorClass), n.dropZoneEnabled = i.hasDragDropSupport() && n.dropZoneEnabled, 
            n.isDisabled = o.attr("disabled") || o.attr("readonly"), n.isDisabled && o.attr("disabled", !0), 
            n.isUploadable = i.hasFileUploadSupport() && !i.isEmpty(n.uploadUrl), n.isClickable = n.browseOnZoneClick && n.showPreview && (n.isUploadable && n.dropZoneEnabled || !i.isEmpty(n.defaultPreviewContent)), 
            n.slug = "function" == typeof t.slugCallback ? t.slugCallback : n._slugDefault, 
            n.mainTemplate = n.showCaption ? n._getLayoutTemplate("main1") : n._getLayoutTemplate("main2"), 
            n.captionTemplate = n._getLayoutTemplate("caption"), n.previewGenericTemplate = n._getPreviewTemplate("generic"), 
            n.resizeImage && (n.maxImageWidth || n.maxImageHeight) && (n.imageCanvas = document.createElement("canvas"), 
            n.imageCanvasContext = n.imageCanvas.getContext("2d")), i.isEmpty(o.attr("id")) && o.attr("id", i.uniqId()), 
            n.namespace = ".fileinput_" + o.attr("id").replace(/-/g, "_"), void 0 === n.$container ? n.$container = n._createContainer() : n._refreshContainer(), 
            a = n.$container, n.$dropZone = a.find(".file-drop-zone"), n.$progress = a.find(".kv-upload-progress"), 
            n.$btnUpload = a.find(".fileinput-upload"), n.$captionContainer = i.getElement(t, "elCaptionContainer", a.find(".file-caption")), 
            n.$caption = i.getElement(t, "elCaptionText", a.find(".file-caption-name")), n.$previewContainer = i.getElement(t, "elPreviewContainer", a.find(".file-preview")), 
            n.$preview = i.getElement(t, "elPreviewImage", a.find(".file-preview-thumbnails")), 
            n.$previewStatus = i.getElement(t, "elPreviewStatus", a.find(".file-preview-status")), 
            n.$errorContainer = i.getElement(t, "elErrorContainer", n.$previewContainer.find(".kv-fileinput-error")), 
            i.isEmpty(n.msgErrorClass) || i.addCss(n.$errorContainer, n.msgErrorClass), n.$errorContainer.hide(), 
            n.previewInitId = "preview-" + i.uniqId(), n._initPreviewCache(), n._initPreview(!0), 
            n._initPreviewActions(), n._setFileDropZoneTitle(), o.removeClass("file-loading"), 
            o.attr("disabled") && n.disable(), n._initZoom();
        },
        _initTemplateDefaults: function() {
            var t, a, r, n, o, l, s, d, c, p, u, f, m, g, v, h, w, _, b, C, y, E, x, T, S, F, P, I, k, A, $, z, D, U, j = this;
            t = '{preview}\n<div class="kv-upload-progress hide"></div>\n<div class="input-group {class}">\n   {caption}\n   <div class="input-group-btn">\n       {remove}\n       {cancel}\n       {upload}\n       {browse}\n   </div>\n</div>', 
            a = '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n', 
            r = '<div class="file-preview {class}">\n    {close}    <div class="{dropClass}">\n    <div class="file-preview-thumbnails">\n    </div>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>', 
            o = '<div class="close fileinput-remove">&times;</div>\n', n = '<i class="icon-file kv-caption-icon"></i>', 
            l = '<div tabindex="500" class="form-control file-caption {class}">\n   <div class="file-caption-name"></div>\n</div>\n', 
            s = '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</button>', 
            d = '<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</a>', 
            c = '<div tabindex="500" class="{css}" {status}>{icon} {label}</div>', p = '<div id="' + i.MODAL_ID + '" class="file-zoom-dialog modal fade" tabindex="-1" aria-labelledby="' + i.MODAL_ID + 'Label"></div>', 
            u = '<div class="modal-dialog modal-lg" role="document">\n  <div class="modal-content">\n    <div class="modal-header">\n      <div class="kv-zoom-actions pull-right">{toggleheader}{fullscreen}{borderless}{close}</div>\n      <h3 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h3>\n    </div>\n    <div class="modal-body">\n      <div class="floating-buttons"></div>\n      <div class="kv-zoom-body file-zoom-content {zoomFrameClass}"></div>\n{prev} {next}\n    </div>\n  </div>\n</div>\n', 
            f = '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {status}\n     </div>\n</div>', 
            m = " <samp>({sizeText})</samp>", g = '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">{caption}<br>{size}</div>\n    {progress} {actions}\n</div>', 
            v = '<div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n{drag}\n<div class="file-actions">\n    <div class="file-footer-buttons">\n        {upload} {delete} {zoom} {other}    </div>\n    <div class="clearfix"></div>\n</div>', 
            h = '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n', 
            w = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>', 
            _ = '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>', 
            b = '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>', 
            C = '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}"', 
            y = C + '><div class="kv-file-content">\n', E = C + ' title="{caption}"><div class="kv-file-content">\n', 
            x = "</div>{footer}\n</div>\n", T = "{content}\n", S = '<div class="kv-preview-data file-preview-html" title="{caption}" ' + i.STYLE_SETTING + ">{data}</div>\n", 
            F = '<img src="{data}" class="file-preview-image kv-preview-data" title="{caption}" alt="{caption}" ' + i.STYLE_SETTING + ">\n", 
            P = '<textarea class="kv-preview-data file-preview-text" title="{caption}" readonly ' + i.STYLE_SETTING + ">{data}</textarea>\n", 
            I = '<video class="kv-preview-data file-preview-video" width="{width}" height="{height}" controls>\n<source src="{data}" type="{type}">\n' + i.DEFAULT_PREVIEW + "\n</video>\n", 
            k = '<div class="file-preview-audio"><audio class="kv-preview-data" controls>\n<source src="{data}" type="{type}">\n' + i.DEFAULT_PREVIEW + "\n</audio></div>\n", 
            A = '<object class="kv-preview-data file-object" type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' + i.OBJECT_PARAMS + " " + i.DEFAULT_PREVIEW + "\n</object>\n", 
            $ = '<object class="kv-preview-data file-object" data="{data}" type="{type}" width="{width}" height="{height}">\n<param name="movie" value="{caption}" />\n' + i.OBJECT_PARAMS + " " + i.DEFAULT_PREVIEW + "\n</object>\n", 
            z = '<embed class="kv-preview-data" src="{data}" width="{width}" height="{height}" type="application/pdf">\n', 
            D = '<div class="kv-preview-data file-preview-other-frame">\n' + i.DEFAULT_PREVIEW + "\n</div>\n", 
            U = '<div class="kv-zoom-cache" style="display:none">{zoomContent}</div>', j.defaults = {
                layoutTemplates: {
                    main1: t,
                    main2: a,
                    preview: r,
                    close: o,
                    fileIcon: n,
                    caption: l,
                    modalMain: p,
                    modal: u,
                    progress: f,
                    size: m,
                    footer: g,
                    actions: v,
                    actionDelete: h,
                    actionUpload: w,
                    actionZoom: _,
                    actionDrag: b,
                    btnDefault: s,
                    btnLink: d,
                    btnBrowse: c,
                    zoomCache: U
                },
                previewMarkupTags: {
                    tagBefore1: y,
                    tagBefore2: E,
                    tagAfter: x
                },
                previewContentTemplates: {
                    generic: T,
                    html: S,
                    image: F,
                    text: P,
                    video: I,
                    audio: k,
                    flash: A,
                    object: $,
                    pdf: z,
                    other: D
                },
                allowedPreviewTypes: [ "image", "html", "text", "video", "audio", "flash", "pdf", "object" ],
                previewTemplates: {},
                previewSettings: {
                    image: {
                        width: "auto",
                        height: "160px"
                    },
                    html: {
                        width: "213px",
                        height: "160px"
                    },
                    text: {
                        width: "213px",
                        height: "160px"
                    },
                    video: {
                        width: "213px",
                        height: "160px"
                    },
                    audio: {
                        width: "213px",
                        height: "80px"
                    },
                    flash: {
                        width: "213px",
                        height: "160px"
                    },
                    object: {
                        width: "160px",
                        height: "auto"
                    },
                    pdf: {
                        width: "160px",
                        height: "160px"
                    },
                    other: {
                        width: "160px",
                        height: "160px"
                    }
                },
                previewZoomSettings: {
                    image: {
                        width: "auto",
                        height: "auto",
                        "max-width": "100%",
                        "max-height": "100%"
                    },
                    html: {
                        width: "100%",
                        height: "100%",
                        "min-height": "480px"
                    },
                    text: {
                        width: "100%",
                        height: "100%",
                        "min-height": "480px"
                    },
                    video: {
                        width: "auto",
                        height: "100%",
                        "max-width": "100%"
                    },
                    audio: {
                        width: "100%",
                        height: "30px"
                    },
                    flash: {
                        width: "auto",
                        height: "480px"
                    },
                    object: {
                        width: "auto",
                        height: "100%",
                        "min-height": "480px"
                    },
                    pdf: {
                        width: "100%",
                        height: "100%",
                        "min-height": "480px"
                    },
                    other: {
                        width: "auto",
                        height: "100%",
                        "min-height": "480px"
                    }
                },
                fileTypeSettings: {
                    image: function(e, t) {
                        return i.compare(e, "image.*") || i.compare(t, /\.(gif|png|jpe?g)$/i);
                    },
                    html: function(e, t) {
                        return i.compare(e, "text/html") || i.compare(t, /\.(htm|html)$/i);
                    },
                    text: function(e, t) {
                        return i.compare(e, "text.*") || i.compare(t, /\.(xml|javascript)$/i) || i.compare(t, /\.(txt|md|csv|nfo|ini|json|php|js|css)$/i);
                    },
                    video: function(e, t) {
                        return i.compare(e, "video.*") && (i.compare(e, /(ogg|mp4|mp?g|mov|webm|3gp)$/i) || i.compare(t, /\.(og?|mp4|webm|mp?g|mov|3gp)$/i));
                    },
                    audio: function(e, t) {
                        return i.compare(e, "audio.*") && (i.compare(t, /(ogg|mp3|mp?g|wav)$/i) || i.compare(t, /\.(og?|mp3|mp?g|wav)$/i));
                    },
                    flash: function(e, t) {
                        return i.compare(e, "application/x-shockwave-flash", !0) || i.compare(t, /\.(swf)$/i);
                    },
                    pdf: function(e, t) {
                        return i.compare(e, "application/pdf", !0) || i.compare(t, /\.(pdf)$/i);
                    },
                    object: function() {
                        return !0;
                    },
                    other: function() {
                        return !0;
                    }
                },
                fileActionSettings: {
                    showRemove: !0,
                    showUpload: !0,
                    showZoom: !0,
                    showDrag: !0,
                    removeIcon: '<i class="icon-trash text-danger"></i>',
                    removeClass: "btn btn-xs btn-default",
                    removeTitle: "Supprimer le fichier",
                    uploadIcon: '<i class="icon-cloud-upload text-info"></i>',
                    uploadClass: "btn btn-xs btn-default",
                    uploadTitle: "Télécharger un fichier",
                    zoomIcon: '<i class="icon-search-plus"></i>',
                    zoomClass: "btn btn-xs btn-default",
                    zoomTitle: "Voir les détails",
                    dragIcon: '<i class="icon-bars"></i>',
                    dragClass: "text-info",
                    dragTitle: "Déplacer / Réorganiser",
                    dragSettings: {},
                    indicatorNew: '<i class="icon-thumbs-down text-warning"></i>',
                    indicatorSuccess: '<i class="icon-check text-success"></i>',
                    indicatorError: '<i class="icon-exclamation-triangle text-danger"></i>',
                    indicatorLoading: '<i class="icon-thumbs-up text-muted"></i>',
                    indicatorNewTitle: "Pas encore téléchargé",
                    indicatorSuccessTitle: "Posté",
                    indicatorErrorTitle: "Ajouter erreur",
                    indicatorLoadingTitle: "ajout ..."
                }
            }, e.each(j.defaults, function(i, t) {
                return "allowedPreviewTypes" === i ? void (void 0 === j.allowedPreviewTypes && (j.allowedPreviewTypes = t)) : void (j[i] = e.extend(!0, {}, t, j[i]));
            }), j._initPreviewTemplates();
        },
        _initPreviewTemplates: function() {
            var t, a = this, r = a.defaults, n = a.previewMarkupTags, o = n.tagAfter;
            e.each(r.previewContentTemplates, function(e, r) {
                i.isEmpty(a.previewTemplates[e]) && (t = n.tagBefore2, "generic" !== e && "image" !== e && "html" !== e && "text" !== e || (t = n.tagBefore1), 
                a.previewTemplates[e] = t + r + o);
            });
        },
        _initPreviewCache: function() {
            var t = this;
            t.previewCache = {
                data: {},
                init: function() {
                    var e = t.initialPreview;
                    e.length > 0 && !i.isArray(e) && (e = e.split(t.initialPreviewDelimiter)), t.previewCache.data = {
                        content: e,
                        config: t.initialPreviewConfig,
                        tags: t.initialPreviewThumbTags
                    };
                },
                fetch: function() {
                    return t.previewCache.data.content.filter(function(e) {
                        return null !== e;
                    });
                },
                count: function(e) {
                    return t.previewCache.data && t.previewCache.data.content ? e ? t.previewCache.data.content.length : t.previewCache.fetch().length : 0;
                },
                get: function(a, r) {
                    var n, o, l, s, d, c, p, u = "init_" + a, f = t.previewCache.data, m = f.config[a], g = f.content[a], v = t.previewInitId + "-" + u, h = i.ifSet("previewAsData", m, t.initialPreviewAsData), w = function(e, a, r, n, o, l, s, d, c) {
                        return d = " file-preview-initial " + i.SORT_CSS + (d ? " " + d : ""), t._generatePreviewTemplate(e, a, r, n, o, !1, null, d, l, s, c);
                    };
                    return g ? (r = void 0 === r || r, l = i.ifSet("type", m, t.initialPreviewFileType || "generic"), 
                    d = i.ifSet("filename", m, i.ifSet("caption", m)), c = i.ifSet("filetype", m, l), 
                    s = t.previewCache.footer(a, r, m && m.size || null), p = i.ifSet("frameClass", m), 
                    n = h ? w(l, g, d, c, v, s, u, p) : w("generic", g, d, c, v, s, u, p, l).replace(/\{content}/g, f.content[a]), 
                    f.tags.length && f.tags[a] && (n = i.replaceTags(n, f.tags[a])), i.isEmpty(m) || i.isEmpty(m.frameAttr) || (o = e(document.createElement("div")).html(n), 
                    o.find(".file-preview-initial").attr(m.frameAttr), n = o.html(), o.remove()), n) : "";
                },
                add: function(e, a, r, n) {
                    var o, l = t.previewCache.data;
                    return i.isArray(e) || (e = e.split(t.initialPreviewDelimiter)), n ? (o = l.content.push(e) - 1, 
                    l.config[o] = a, l.tags[o] = r) : (o = e.length - 1, l.content = e, l.config = a, 
                    l.tags = r), t.previewCache.data = l, o;
                },
                set: function(e, a, r, n) {
                    var o, l, s = t.previewCache.data;
                    if (e && e.length && (i.isArray(e) || (e = e.split(t.initialPreviewDelimiter)), 
                    l = e.filter(function(e) {
                        return null !== e;
                    }), l.length)) {
                        if (void 0 === s.content && (s.content = []), void 0 === s.config && (s.config = []), 
                        void 0 === s.tags && (s.tags = []), n) {
                            for (o = 0; o < e.length; o++) e[o] && s.content.push(e[o]);
                            for (o = 0; o < a.length; o++) a[o] && s.config.push(a[o]);
                            for (o = 0; o < r.length; o++) r[o] && s.tags.push(r[o]);
                        } else s.content = e, s.config = a, s.tags = r;
                        t.previewCache.data = s;
                    }
                },
                unset: function(e) {
                    var i = t.previewCache.count();
                    if (i) {
                        if (1 === i) return t.previewCache.data.content = [], t.previewCache.data.config = [], 
                        t.previewCache.data.tags = [], t.initialPreview = [], t.initialPreviewConfig = [], 
                        void (t.initialPreviewThumbTags = []);
                        t.previewCache.data.content[e] = null, t.previewCache.data.config[e] = null, t.previewCache.data.tags[e] = null;
                    }
                },
                out: function() {
                    var e, i, a = "", r = t.previewCache.count(!0);
                    if (0 === r) return {
                        content: "",
                        caption: ""
                    };
                    for (i = 0; r > i; i++) a += t.previewCache.get(i);
                    return e = t._getMsgSelected(t.previewCache.count()), {
                        content: a,
                        caption: e
                    };
                },
                footer: function(e, a, r) {
                    var n = t.previewCache.data;
                    if (!n || !n.config || 0 === n.config.length || i.isEmpty(n.config[e])) return "";
                    a = void 0 === a || a;
                    var o = n.config[e], l = i.ifSet("caption", o), s = "", d = i.ifSet("width", o, "auto"), c = i.ifSet("url", o, !1), p = i.ifSet("key", o, null), u = t.fileActionSettings, f = i.ifSet("showDelete", o, !0), m = i.ifSet("showZoom", o, u.showZoom), g = i.ifSet("showDrag", o, u.showDrag), v = c === !1 && a;
                    return t.initialPreviewShowDelete && (s = t._renderFileActions(!1, f, m, g, v, c, p, !0)), 
                    t._getLayoutTemplate("footer").replace(/\{progress}/g, t._renderThumbProgress()).replace(/\{actions}/g, s).replace(/\{caption}/g, l).replace(/\{size}/g, t._getSize(r)).replace(/\{width}/g, d).replace(/\{indicator}/g, "").replace(/\{indicatorTitle}/g, "");
                }
            }, t.previewCache.init();
        },
        _handler: function(e, i, t) {
            var a = this, r = a.namespace, n = i.split(" ").join(r + " ") + r;
            e && e.length && e.off(n).on(n, t);
        },
        _log: function(e) {
            var i = this, t = i.$element.attr("id");
            t && (e = '"' + t + '": ' + e), "undefined" != typeof window.console.log ? window.console.log(e) : window.alert(e);
        },
        _validate: function() {
            var e = this, i = "file" === e.$element.attr("type");
            return i || e._log('The input "type" must be set to "file" for initializing the "bootstrap-fileinput" plugin.'), 
            i;
        },
        _errorsExist: function() {
            var i, t = this;
            return !!t.$errorContainer.find("li").length || (i = e(document.createElement("div")).html(t.$errorContainer.html()), 
            i.find("span.kv-error-close").remove(), i.find("ul").remove(), !!e.trim(i.text()).length);
        },
        _errorHandler: function(e, i) {
            var t = this, a = e.target.error;
            a.code === a.NOT_FOUND_ERR ? t._showError(t.msgFileNotFound.replace("{name}", i)) : a.code === a.SECURITY_ERR ? t._showError(t.msgFileSecured.replace("{name}", i)) : a.code === a.NOT_READABLE_ERR ? t._showError(t.msgFileNotReadable.replace("{name}", i)) : a.code === a.ABORT_ERR ? t._showError(t.msgFilePreviewAborted.replace("{name}", i)) : t._showError(t.msgFilePreviewError.replace("{name}", i));
        },
        _addError: function(e) {
            var i = this, t = i.$errorContainer;
            e && t.length && (t.html(i.errorCloseButton + e), i._handler(t.find(".kv-error-close"), "click", function() {
                t.fadeOut("slow");
            }));
        },
        _resetErrors: function(e) {
            var i = this, t = i.$errorContainer;
            i.isError = !1, i.$container.removeClass("has-error"), t.html(""), e ? t.fadeOut("slow") : t.hide();
        },
        _showFolderError: function(e) {
            var t, a = this, r = a.$errorContainer;
            e && (t = a.msgFoldersNotAllowed.replace(/\{n}/g, e), a._addError(t), i.addCss(a.$container, "has-error"), 
            r.fadeIn(800), a._raise("filefoldererror", [ e, t ]));
        },
        _showUploadError: function(e, t, a) {
            var r = this, n = r.$errorContainer, o = a || "fileuploaderror", l = t && t.id ? '<li data-file-id="' + t.id + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === n.find("ul").length ? r._addError("<ul>" + l + "</ul>") : n.find("ul").append(l), 
            n.fadeIn(800), r._raise(o, [ t, e ]), r.$container.removeClass("file-input-new"), 
            i.addCss(r.$container, "has-error"), !0;
        },
        _showError: function(e, t, a) {
            var r = this, n = r.$errorContainer, o = a || "fileerror";
            return t = t || {}, t.reader = r.reader, r._addError(e), n.fadeIn(800), r._raise(o, [ t, e ]), 
            r.isUploadable || r._clearFileInput(), r.$container.removeClass("file-input-new"), 
            i.addCss(r.$container, "has-error"), r.$btnUpload.attr("disabled", !0), !0;
        },
        _noFilesError: function(e) {
            var t = this, a = t.minFileCount > 1 ? t.filePlural : t.fileSingle, r = t.msgFilesTooLess.replace("{n}", t.minFileCount).replace("{files}", a), n = t.$errorContainer;
            t._addError(r), t.isError = !0, t._updateFileDetails(0), n.fadeIn(800), t._raise("fileerror", [ e, r ]), 
            t._clearFileInput(), i.addCss(t.$container, "has-error");
        },
        _parseError: function(i, t, a, r) {
            var n = this, o = e.trim(a + ""), l = "." === o.slice(-1) ? "" : ".", s = void 0 !== t.responseJSON && void 0 !== t.responseJSON.error ? t.responseJSON.error : t.responseText;
            return n.cancelling && n.msgUploadAborted && (o = n.msgUploadAborted), n.showAjaxErrorDetails && s ? (s = e.trim(s.replace(/\n\s*\n/g, "\n")), 
            s = s.length > 0 ? "<pre>" + s + "</pre>" : "", o += l + s) : o += l, o === l && (o = n.msgAjaxError.replace("{operation}", i)), 
            n.cancelling = !1, r ? "<b>" + r + ": </b>" + o : o;
        },
        _parseFileType: function(e) {
            var t, a, r, n, o = this, l = o.allowedPreviewTypes || [];
            for (n = 0; n < l.length; n++) if (r = l[n], t = o.fileTypeSettings[r], a = t(e.type, e.name) ? r : "", 
            !i.isEmpty(a)) return a;
            return "other";
        },
        _getPreviewIcon: function(i) {
            var t, a = this, r = null;
            return i && i.indexOf(".") > -1 && (t = i.split(".").pop(), a.previewFileIconSettings && a.previewFileIconSettings[t] && (r = a.previewFileIconSettings[t]), 
            a.previewFileExtSettings && e.each(a.previewFileExtSettings, function(e, i) {
                return a.previewFileIconSettings[e] && i(t) ? void (r = a.previewFileIconSettings[e]) : void 0;
            })), r;
        },
        _parseFilePreviewIcon: function(e, i) {
            var t = this, a = t._getPreviewIcon(i) || t.previewFileIcon;
            return e.indexOf("{previewFileIcon}") > -1 && (e = e.replace(/\{previewFileIconClass}/g, t.previewFileIconClass).replace(/\{previewFileIcon}/g, a)), 
            e;
        },
        _raise: function(i, t) {
            var a = this, r = e.Event(i);
            if (void 0 !== t ? a.$element.trigger(r, t) : a.$element.trigger(r), r.isDefaultPrevented() || r.result === !1) return !1;
            switch (i) {
              case "filebatchuploadcomplete":
              case "filebatchuploadsuccess":
              case "fileuploaded":
              case "fileclear":
              case "filecleared":
              case "filereset":
              case "fileerror":
              case "filefoldererror":
              case "fileuploaderror":
              case "filebatchuploaderror":
              case "filedeleteerror":
              case "filecustomerror":
              case "filesuccessremove":
                break;

              default:
                a.ajaxAborted = r.result;
            }
            return !0;
        },
        _listenFullScreen: function(e) {
            var i, t, a = this, r = a.$modal;
            r && r.length && (i = r && r.find(".btn-fullscreen"), t = r && r.find(".btn-borderless"), 
            i.length && t.length && (i.removeClass("active").attr("aria-pressed", "false"), 
            t.removeClass("active").attr("aria-pressed", "false"), e ? i.addClass("active").attr("aria-pressed", "true") : t.addClass("active").attr("aria-pressed", "true"), 
            r.hasClass("file-zoom-fullscreen") ? a._maximizeZoomDialog() : e ? a._maximizeZoomDialog() : t.removeClass("active").attr("aria-pressed", "false")));
        },
        _listen: function() {
            var t, a = this, r = a.$element, n = a.$form, o = a.$container;
            a._handler(r, "change", e.proxy(a._change, a)), a.showBrowse && a._handler(a.$btnFile, "click", e.proxy(a._browse, a)), 
            a._handler(o.find(".fileinput-remove:not([disabled])"), "click", e.proxy(a.clear, a)), 
            a._handler(o.find(".fileinput-cancel"), "click", e.proxy(a.cancel, a)), a._initDragDrop(), 
            a._handler(n, "reset", e.proxy(a.reset, a)), a.isUploadable || a._handler(n, "submit", e.proxy(a._submitForm, a)), 
            a._handler(a.$container.find(".fileinput-upload"), "click", e.proxy(a._uploadClick, a)), 
            a._handler(e(window), "resize", function() {
                a._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight);
            }), t = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", 
            a._handler(e(document), t, function() {
                a._listenFullScreen(i.checkFullScreen());
            }), a._initClickable();
        },
        _initClickable: function() {
            var t, a = this;
            a.isClickable && (t = a.isUploadable ? a.$dropZone : a.$preview.find(".file-default-preview"), 
            i.addCss(t, "clickable"), t.attr("tabindex", -1), a._handler(t, "click", function(i) {
                var r = e(i.target);
                r.parents(".file-preview-thumbnails").length && !r.parents(".file-default-preview").length || (a.$element.trigger("click"), 
                t.blur());
            }));
        },
        _initDragDrop: function() {
            var i = this, t = i.$dropZone;
            i.isUploadable && i.dropZoneEnabled && i.showPreview && (i._handler(t, "dragenter dragover", e.proxy(i._zoneDragEnter, i)), 
            i._handler(t, "dragleave", e.proxy(i._zoneDragLeave, i)), i._handler(t, "drop", e.proxy(i._zoneDrop, i)), 
            i._handler(e(document), "dragenter dragover drop", i._zoneDragDropInit));
        },
        _zoneDragDropInit: function(e) {
            e.stopPropagation(), e.preventDefault();
        },
        _zoneDragEnter: function(t) {
            var a = this, r = e.inArray("Files", t.originalEvent.dataTransfer.types) > -1;
            return a._zoneDragDropInit(t), a.isDisabled || !r ? (t.originalEvent.dataTransfer.effectAllowed = "none", 
            void (t.originalEvent.dataTransfer.dropEffect = "none")) : void i.addCss(a.$dropZone, "file-highlighted");
        },
        _zoneDragLeave: function(e) {
            var i = this;
            i._zoneDragDropInit(e), i.isDisabled || i.$dropZone.removeClass("file-highlighted");
        },
        _zoneDrop: function(e) {
            var t = this;
            e.preventDefault(), t.isDisabled || i.isEmpty(e.originalEvent.dataTransfer.files) || (t._change(e, "dragdrop"), 
            t.$dropZone.removeClass("file-highlighted"));
        },
        _uploadClick: function(e) {
            var t, a = this, r = a.$container.find(".fileinput-upload"), n = !r.hasClass("disabled") && i.isEmpty(r.attr("disabled"));
            if (!e || !e.isDefaultPrevented()) {
                if (!a.isUploadable) return void (n && "submit" !== r.attr("type") && (t = r.closest("form"), 
                t.length && t.trigger("submit"), e.preventDefault()));
                e.preventDefault(), n && a.upload();
            }
        },
        _submitForm: function() {
            var e = this, i = e.$element, t = i.get(0).files;
            return t && e.minFileCount > 0 && e._getFileCount(t.length) < e.minFileCount ? (e._noFilesError({}), 
            !1) : !e._abort({});
        },
        _clearPreview: function() {
            var t = this, a = t.$preview, r = t.showUploadedThumbs ? a.find(i.FRAMES + ":not(.file-preview-success)") : a.find(i.FRAMES);
            r.each(function() {
                var t = e(this);
                t.remove(), i.cleanZoomCache(a.find("#zoom-" + t.attr("id")));
            }), t.$preview.find(i.FRAMES).length && t.showPreview || t._resetUpload(), t._validateDefaultPreview();
        },
        _initSortable: function() {
            var t, a = this, r = a.$preview, n = "." + i.SORT_CSS;
            window.KvSortable && 0 !== r.find(n).length && (t = {
                handle: ".drag-handle-init",
                dataIdAttr: "data-preview-id",
                draggable: n,
                onSort: function(t) {
                    var r, n, o = t.oldIndex, l = t.newIndex;
                    a.initialPreview = i.moveArray(a.initialPreview, o, l), a.initialPreviewConfig = i.moveArray(a.initialPreviewConfig, o, l), 
                    a.previewCache.init();
                    for (var s = 0; s < a.initialPreviewConfig.length; s++) null !== a.initialPreviewConfig[s] && (r = a.initialPreviewConfig[s].key, 
                    n = e(".kv-file-remove[data-key='" + r + "']").closest(i.FRAMES), n.attr("data-fileindex", "init_" + s).data("fileindex", "init_" + s));
                    a._raise("filesorted", {
                        previewId: e(t.item).attr("id"),
                        oldIndex: o,
                        newIndex: l,
                        stack: a.initialPreviewConfig
                    });
                }
            }, r.data("kvsortable") && r.kvsortable("destroy"), e.extend(!0, t, a.fileActionSettings.dragSettings), 
            r.kvsortable(t));
        },
        _initPreview: function(e) {
            var t, a = this, r = a.initialCaption || "";
            return a.previewCache.count() ? (t = a.previewCache.out(), r = e && a.initialCaption ? a.initialCaption : t.caption, 
            a.$preview.html(t.content), a._setInitThumbAttr(), a._setCaption(r), a._initSortable(), 
            void (i.isEmpty(t.content) || a.$container.removeClass("file-input-new"))) : (a._clearPreview(), 
            void (e ? a._setCaption(r) : a._initCaption()));
        },
        _getZoomButton: function(e) {
            var i = this, t = i.previewZoomButtonIcons[e], a = i.previewZoomButtonClasses[e], r = ' title="' + (i.previewZoomButtonTitles[e] || "") + '" ', n = r + ("close" === e ? ' data-dismiss="modal" aria-hidden="true"' : "");
            return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (n += ' data-toggle="button" aria-pressed="false" autocomplete="off"'), 
            '<button type="button" class="' + a + " btn-" + e + '"' + n + ">" + t + "</button>";
        },
        _getModalContent: function() {
            var e = this;
            return e._getLayoutTemplate("modal").replace(/\{zoomFrameClass}/g, e.frameClass).replace(/\{heading}/g, e.msgZoomModalHeading).replace(/\{prev}/g, e._getZoomButton("prev")).replace(/\{next}/g, e._getZoomButton("next")).replace(/\{toggleheader}/g, e._getZoomButton("toggleheader")).replace(/\{fullscreen}/g, e._getZoomButton("fullscreen")).replace(/\{borderless}/g, e._getZoomButton("borderless")).replace(/\{close}/g, e._getZoomButton("close"));
        },
        _listenModalEvent: function(e) {
            var t = this, a = t.$modal, r = function(e) {
                return {
                    sourceEvent: e,
                    previewId: a.data("previewId"),
                    modal: a
                };
            };
            a.on(e + ".bs.modal", function(n) {
                var o = a.find(".btn-fullscreen"), l = a.find(".btn-borderless");
                t._raise("filezoom" + e, r(n)), "shown" === e && (l.removeClass("active").attr("aria-pressed", "false"), 
                o.removeClass("active").attr("aria-pressed", "false"), a.hasClass("file-zoom-fullscreen") && (t._maximizeZoomDialog(), 
                i.checkFullScreen() ? o.addClass("active").attr("aria-pressed", "true") : l.addClass("active").attr("aria-pressed", "true")));
            });
        },
        _initZoom: function() {
            var t, a = this, r = a._getLayoutTemplate("modalMain"), n = "#" + i.MODAL_ID;
            a.showPreview && (a.$modal = e(n), a.$modal && a.$modal.length || (t = e(document.createElement("div")).html(r).insertAfter(a.$container), 
            a.$modal = e(n).insertBefore(t), t.remove()), i.initModal(a.$modal), a.$modal.html(a._getModalContent()), 
            e.each(i.MODAL_EVENTS, function(e, i) {
                a._listenModalEvent(i);
            }));
        },
        _initZoomButtons: function() {
            var t, a, r = this, n = r.$modal.data("previewId") || "", o = r.$preview, l = o.find(i.FRAMES).toArray(), s = l.length, d = r.$modal.find(".btn-prev"), c = r.$modal.find(".btn-next");
            return l.length < 2 ? (d.hide(), void c.hide()) : (d.show(), c.show(), void (s && (t = e(l[0]), 
            a = e(l[s - 1]), d.removeAttr("disabled"), c.removeAttr("disabled"), t.length && t.attr("id") === n && d.attr("disabled", !0), 
            a.length && a.attr("id") === n && c.attr("disabled", !0))));
        },
        _maximizeZoomDialog: function() {
            var i = this, t = i.$modal, a = t.find(".modal-header:visible"), r = t.find(".modal-footer:visible"), n = t.find(".modal-body"), o = e(window).height(), l = 0;
            t.addClass("file-zoom-fullscreen"), a && a.length && (o -= a.outerHeight(!0)), r && r.length && (o -= r.outerHeight(!0)), 
            n && n.length && (l = n.outerHeight(!0) - n.height(), o -= l), t.find(".kv-zoom-body").height(o);
        },
        _resizeZoomDialog: function(e) {
            var t = this, a = t.$modal, r = a.find(".btn-fullscreen"), n = a.find(".btn-borderless");
            if (a.hasClass("file-zoom-fullscreen")) i.toggleFullScreen(!1), e ? r.hasClass("active") || (a.removeClass("file-zoom-fullscreen"), 
            t._resizeZoomDialog(!0), n.hasClass("active") && n.removeClass("active").attr("aria-pressed", "false")) : r.hasClass("active") ? r.removeClass("active").attr("aria-pressed", "false") : (a.removeClass("file-zoom-fullscreen"), 
            t.$modal.find(".kv-zoom-body").css("height", t.zoomModalHeight)); else {
                if (!e) return void t._maximizeZoomDialog();
                i.toggleFullScreen(!0);
            }
            a.focus();
        },
        _setZoomContent: function(t, a) {
            var r, n, o, l, s, d, c, p, u, f, m = this, g = t.attr("id"), v = m.$modal, h = v.find(".btn-prev"), w = v.find(".btn-next"), _ = v.find(".btn-fullscreen"), b = v.find(".btn-borderless"), C = v.find(".btn-toggleheader"), y = m.$preview.find("#zoom-" + g);
            n = y.attr("data-template") || "generic", r = y.find(".kv-file-content"), o = r.length ? r.html() : "", 
            u = t.data("caption") || "", f = t.data("size") || "", l = u + " " + f, v.find(".kv-zoom-title").html(l), 
            s = v.find(".kv-zoom-body"), v.removeClass("kv-single-content"), a ? (p = s.clone().insertAfter(s), 
            s.html(o).hide(), p.fadeOut("fast", function() {
                s.fadeIn("fast"), p.remove();
            })) : s.html(o), c = m.previewZoomSettings[n], c && (d = s.find(".kv-preview-data"), 
            i.addCss(d, "file-zoom-detail"), e.each(c, function(e, i) {
                d.css(e, i), (d.attr("width") && "width" === e || d.attr("height") && "height" === e) && d.removeAttr(e);
            })), v.data("previewId", g), m._handler(h, "click", function() {
                m._zoomSlideShow("prev", g);
            }), m._handler(w, "click", function() {
                m._zoomSlideShow("next", g);
            }), m._handler(_, "click", function() {
                m._resizeZoomDialog(!0);
            }), m._handler(b, "click", function() {
                m._resizeZoomDialog(!1);
            }), m._handler(C, "click", function() {
                var e, i = v.find(".modal-header"), t = v.find(".modal-body .floating-buttons"), a = i.find(".kv-zoom-actions"), r = function(e) {
                    var t = m.$modal.find(".kv-zoom-body"), a = m.zoomModalHeight;
                    v.hasClass("file-zoom-fullscreen") && (a = t.outerHeight(!0), e || (a -= i.outerHeight(!0))), 
                    t.css("height", e ? a + e : a);
                };
                i.is(":visible") ? (e = i.outerHeight(!0), i.slideUp("slow", function() {
                    a.find(".btn").appendTo(t), r(e);
                })) : (t.find(".btn").appendTo(a), i.slideDown("slow", function() {
                    r();
                })), v.focus();
            }), m._handler(v, "keydown", function(e) {
                var i = e.which || e.keyCode;
                37 !== i || h.attr("disabled") || m._zoomSlideShow("prev", g), 39 !== i || w.attr("disabled") || m._zoomSlideShow("next", g);
            });
        },
        _zoomPreview: function(e) {
            var t, a = this, r = a.$modal;
            if (!e.length) throw "Cannot zoom to detailed preview!";
            i.initModal(r), r.html(a._getModalContent()), t = e.closest(i.FRAMES), a._setZoomContent(t), 
            r.modal("show"), a._initZoomButtons();
        },
        _zoomSlideShow: function(t, a) {
            var r, n, o, l = this, s = l.$modal.find(".kv-zoom-actions .btn-" + t), d = l.$preview.find(i.FRAMES).toArray(), c = d.length;
            if (!s.attr("disabled")) {
                for (n = 0; c > n; n++) if (e(d[n]).attr("id") === a) {
                    o = "prev" === t ? n - 1 : n + 1;
                    break;
                }
                0 > o || o >= c || !d[o] || (r = e(d[o]), r.length && l._setZoomContent(r, !0), 
                l._initZoomButtons(), l._raise("filezoom" + t, {
                    previewId: a,
                    modal: l.$modal
                }));
            }
        },
        _initZoomButton: function() {
            var i = this;
            i.$preview.find(".kv-file-zoom").each(function() {
                var t = e(this);
                i._handler(t, "click", function() {
                    i._zoomPreview(t);
                });
            });
        },
        _clearObjects: function(i) {
            i.find("video audio").each(function() {
                this.pause(), e(this).remove();
            }), i.find("img object div").each(function() {
                e(this).remove();
            });
        },
        _clearFileInput: function() {
            var t, a, r, n = this, o = n.$element;
            n.fileInputCleared = !0, i.isEmpty(o.val()) || (n.isIE9 || n.isIE10 ? (t = o.closest("form"), 
            a = e(document.createElement("form")), r = e(document.createElement("div")), o.before(r), 
            t.length ? t.after(a) : r.after(a), a.append(o).trigger("reset"), r.before(o).remove(), 
            a.remove()) : o.val(""));
        },
        _resetUpload: function() {
            var e = this;
            e.uploadCache = {
                content: [],
                config: [],
                tags: [],
                append: !0
            }, e.uploadCount = 0, e.uploadStatus = {}, e.uploadLog = [], e.uploadAsyncCount = 0, 
            e.loadedImages = [], e.totalImagesCount = 0, e.$btnUpload.removeAttr("disabled"), 
            e._setProgress(0), i.addCss(e.$progress, "hide"), e._resetErrors(!1), e.ajaxAborted = !1, 
            e.ajaxRequests = [], e._resetCanvas(), e.cacheInitialPreview = {}, e.overwriteInitial && (e.initialPreview = [], 
            e.initialPreviewConfig = [], e.initialPreviewThumbTags = [], e.previewCache.data = {
                content: [],
                config: [],
                tags: []
            });
        },
        _resetCanvas: function() {
            var e = this;
            e.canvas && e.imageCanvasContext && e.imageCanvasContext.clearRect(0, 0, e.canvas.width, e.canvas.height);
        },
        _hasInitialPreview: function() {
            var e = this;
            return !e.overwriteInitial && e.previewCache.count();
        },
        _resetPreview: function() {
            var e, i, t = this;
            t.previewCache.count() ? (e = t.previewCache.out(), t.$preview.html(e.content), 
            t._setInitThumbAttr(), i = t.initialCaption ? t.initialCaption : e.caption, t._setCaption(i)) : (t._clearPreview(), 
            t._initCaption()), t.showPreview && (t._initZoom(), t._initSortable());
        },
        _clearDefaultPreview: function() {
            var e = this;
            e.$preview.find(".file-default-preview").remove();
        },
        _validateDefaultPreview: function() {
            var e = this;
            e.showPreview && !i.isEmpty(e.defaultPreviewContent) && (e.$preview.html('<div class="file-default-preview">' + e.defaultPreviewContent + "</div>"), 
            e.$container.removeClass("file-input-new"), e._initClickable());
        },
        _resetPreviewThumbs: function(e) {
            var i, t = this;
            return e ? (t._clearPreview(), void t.clearStack()) : void (t._hasInitialPreview() ? (i = t.previewCache.out(), 
            t.$preview.html(i.content), t._setInitThumbAttr(), t._setCaption(i.caption), t._initPreviewActions()) : t._clearPreview());
        },
        _getLayoutTemplate: function(e) {
            var t = this, a = t.layoutTemplates[e];
            return i.isEmpty(t.customLayoutTags) ? a : i.replaceTags(a, t.customLayoutTags);
        },
        _getPreviewTemplate: function(e) {
            var t = this, a = t.previewTemplates[e];
            return i.isEmpty(t.customPreviewTags) ? a : i.replaceTags(a, t.customPreviewTags);
        },
        _getOutData: function(e, i, t) {
            var a = this;
            return e = e || {}, i = i || {}, t = t || a.filestack.slice(0) || {}, {
                form: a.formdata,
                files: t,
                filenames: a.filenames,
                filescount: a.getFilesCount(),
                extra: a._getExtraData(),
                response: i,
                reader: a.reader,
                jqXHR: e
            };
        },
        _getMsgSelected: function(e) {
            var i = this, t = 1 === e ? i.fileSingle : i.filePlural;
            return e > 0 ? i.msgSelected.replace("{n}", e).replace("{files}", t) : i.msgNoFilesSelected;
        },
        _getThumbs: function(e) {
            return e = e || "", this.$preview.find(i.FRAMES + ":not(.file-preview-initial)" + e);
        },
        _getExtraData: function(e, i) {
            var t = this, a = t.uploadExtraData;
            return "function" == typeof t.uploadExtraData && (a = t.uploadExtraData(e, i)), 
            a;
        },
        _initXhr: function(e, i, t) {
            var a = this;
            return e.upload && e.upload.addEventListener("progress", function(e) {
                var r = 0, n = e.total, o = e.loaded || e.position;
                e.lengthComputable && (r = Math.floor(o / n * 100)), i ? a._setAsyncUploadStatus(i, r, t) : a._setProgress(r);
            }, !1), e;
        },
        _ajaxSubmit: function(i, t, a, r, n, o) {
            var l, s = this;
            s._raise("filepreajax", [ n, o ]) && (s._uploadExtra(n, o), l = e.extend(!0, {}, {
                xhr: function() {
                    var i = e.ajaxSettings.xhr();
                    return s._initXhr(i, n, s.getFileStack().length);
                },
                url: s.uploadUrl,
                type: "POST",
                dataType: "json",
                data: s.formdata,
                cache: !1,
                processData: !1,
                contentType: !1,
                beforeSend: i,
                success: t,
                complete: a,
                error: r
            }, s.ajaxSettings), s.ajaxRequests.push(e.ajax(l)));
        },
        _mergeArray: function(e, t) {
            var a = this, r = i.cleanArray(a[e]), n = i.cleanArray(t);
            a[e] = r.concat(n);
        },
        _initUploadSuccess: function(t, a, r) {
            var n, o, l, s, d, c, p, u, f, m = this;
            m.showPreview && "object" == typeof t && !e.isEmptyObject(t) && void 0 !== t.initialPreview && t.initialPreview.length > 0 && (m.hasInitData = !0, 
            c = t.initialPreview || [], p = t.initialPreviewConfig || [], u = t.initialPreviewThumbTags || [], 
            n = !(void 0 !== t.append && !t.append), c.length > 0 && !i.isArray(c) && (c = c.split(m.initialPreviewDelimiter)), 
            m._mergeArray("initialPreview", c), m._mergeArray("initialPreviewConfig", p), m._mergeArray("initialPreviewThumbTags", u), 
            void 0 !== a ? r ? (f = a.attr("data-fileindex"), m.uploadCache.content[f] = c[0], 
            m.uploadCache.config[f] = p[0] || [], m.uploadCache.tags[f] = u[0] || [], m.uploadCache.append = n) : (l = m.previewCache.add(c, p[0], u[0], n), 
            o = m.previewCache.get(l, !1), s = e(document.createElement("div")).html(o).hide().insertAfter(a), 
            d = s.find(".kv-zoom-cache"), d && d.length && d.insertAfter(a), a.fadeOut("slow", function() {
                var e = s.find(".file-preview-frame");
                e && e.length && e.insertBefore(a).fadeIn("slow").css("display:inline-block"), m._initPreviewActions(), 
                m._clearFileInput(), i.cleanZoomCache(m.$preview.find("#zoom-" + a.attr("id"))), 
                a.remove(), s.remove(), m._initSortable();
            })) : (m.previewCache.set(c, p, u, n), m._initPreview(), m._initPreviewActions()));
        },
        _initSuccessThumbs: function() {
            var t = this;
            t.showPreview && t._getThumbs(i.FRAMES + ".file-preview-success").each(function() {
                var a = e(this), r = t.$preview, n = a.find(".kv-file-remove");
                n.removeAttr("disabled"), t._handler(n, "click", function() {
                    var e = a.attr("id"), n = t._raise("filesuccessremove", [ e, a.data("fileindex") ]);
                    i.cleanMemory(a), n !== !1 && a.fadeOut("slow", function() {
                        i.cleanZoomCache(r.find("#zoom-" + e)), a.remove(), r.find(i.FRAMES).length || t.reset();
                    });
                });
            });
        },
        _checkAsyncComplete: function() {
            var i, t, a = this;
            for (t = 0; t < a.filestack.length; t++) if (a.filestack[t] && (i = a.previewInitId + "-" + t, 
            -1 === e.inArray(i, a.uploadLog))) return !1;
            return a.uploadAsyncCount === a.uploadLog.length;
        },
        _uploadExtra: function(i, t) {
            var a = this, r = a._getExtraData(i, t);
            0 !== r.length && e.each(r, function(e, i) {
                a.formdata.append(e, i);
            });
        },
        _uploadSingle: function(t, a, r) {
            var n, o, l, s, d, c, p, u, f, m, g = this, v = g.getFileStack().length, h = new FormData(), w = g.previewInitId + "-" + t, _ = g.filestack.length > 0 || !e.isEmptyObject(g.uploadExtraData), b = e("#" + w).find(".file-thumb-progress"), C = {
                id: w,
                index: t
            };
            g.formdata = h, g.showPreview && (o = e("#" + w + ":not(.file-preview-initial)"), 
            s = o.find(".kv-file-upload"), d = o.find(".kv-file-remove"), b.removeClass("hide")), 
            0 === v || !_ || s && s.hasClass("disabled") || g._abort(C) || (m = function(e, i) {
                g.updateStack(e, void 0), g.uploadLog.push(i), g._checkAsyncComplete() && (g.fileBatchCompleted = !0);
            }, l = function() {
                var e, t, a, r = g.uploadCache, n = 0, o = g.cacheInitialPreview;
                g.fileBatchCompleted && (o && o.content && (n = o.content.length), setTimeout(function() {
                    if (g.showPreview) {
                        if (g.previewCache.set(r.content, r.config, r.tags, r.append), n) {
                            for (t = 0; t < r.content.length; t++) a = t + n, o.content[a] = r.content[t], o.config.length && (o.config[a] = r.config[t]), 
                            o.tags.length && (o.tags[a] = r.tags[t]);
                            g.initialPreview = i.cleanArray(o.content), g.initialPreviewConfig = i.cleanArray(o.config), 
                            g.initialPreviewThumbTags = i.cleanArray(o.tags);
                        } else g.initialPreview = r.content, g.initialPreviewConfig = r.config, g.initialPreviewThumbTags = r.tags;
                        g.cacheInitialPreview = {}, g.hasInitData && (g._initPreview(), g._initPreviewActions());
                    }
                    g.unlock(), g._clearFileInput(), e = g.$preview.find(".file-preview-initial"), g.uploadAsync && e.length && (i.addCss(e, i.SORT_CSS), 
                    g._initSortable()), g._raise("filebatchuploadcomplete", [ g.filestack, g._getExtraData() ]), 
                    g.uploadCount = 0, g.uploadStatus = {}, g.uploadLog = [], g._setProgress(101);
                }, 100));
            }, c = function(a) {
                n = g._getOutData(a), g.fileBatchCompleted = !1, g.showPreview && (o.hasClass("file-preview-success") || (g._setThumbStatus(o, "Loading"), 
                i.addCss(o, "file-uploading")), s.attr("disabled", !0), d.attr("disabled", !0)), 
                r || g.lock(), g._raise("filepreupload", [ n, w, t ]), e.extend(!0, C, n), g._abort(C) && (a.abort(), 
                g._setProgressCancelled());
            }, p = function(a, l, d) {
                var c = g.showPreview && o.attr("id") ? o.attr("id") : w;
                n = g._getOutData(d, a), e.extend(!0, C, n), setTimeout(function() {
                    i.isEmpty(a) || i.isEmpty(a.error) ? (g.showPreview && (g._setThumbStatus(o, "Success"), 
                    s.hide(), g._initUploadSuccess(a, o, r), g._setProgress(101, b)), g._raise("fileuploaded", [ n, c, t ]), 
                    r ? m(t, c) : g.updateStack(t, void 0)) : (g._showUploadError(a.error, C), g._setPreviewError(o, t), 
                    r && m(t, c));
                }, 100);
            }, u = function() {
                setTimeout(function() {
                    g.showPreview && (s.removeAttr("disabled"), d.removeAttr("disabled"), o.removeClass("file-uploading")), 
                    r ? l() : (g.unlock(!1), g._clearFileInput()), g._initSuccessThumbs();
                }, 100);
            }, f = function(i, n, l) {
                var s = g.ajaxOperations.uploadThumb, d = g._parseError(s, i, l, r ? a[t].name : null);
                setTimeout(function() {
                    r && m(t, w), g.uploadStatus[w] = 100, g._setPreviewError(o, t), e.extend(!0, C, g._getOutData(i)), 
                    g._setProgress(101, b, g.msgAjaxProgressError.replace("{operation}", s)), g._showUploadError(d, C);
                }, 100);
            }, h.append(g.uploadFileAttr, a[t], g.filenames[t]), h.append("file_id", t), g._ajaxSubmit(c, p, u, f, w, t));
        },
        _uploadBatch: function() {
            var t, a, r, n, o, l = this, s = l.filestack, d = s.length, c = {}, p = l.filestack.length > 0 || !e.isEmptyObject(l.uploadExtraData);
            l.formdata = new FormData(), 0 !== d && p && !l._abort(c) && (o = function() {
                e.each(s, function(e) {
                    l.updateStack(e, void 0);
                }), l._clearFileInput();
            }, t = function(t) {
                l.lock();
                var a = l._getOutData(t);
                l.showPreview && l._getThumbs().each(function() {
                    var t = e(this), a = t.find(".kv-file-upload"), r = t.find(".kv-file-remove");
                    t.hasClass("file-preview-success") || (l._setThumbStatus(t, "Loading"), i.addCss(t, "file-uploading")), 
                    a.attr("disabled", !0), r.attr("disabled", !0);
                }), l._raise("filebatchpreupload", [ a ]), l._abort(a) && (t.abort(), l._setProgressCancelled());
            }, a = function(t, a, r) {
                var n = l._getOutData(r, t), s = l._getThumbs(":not(.file-preview-error)"), d = 0, c = i.isEmpty(t) || i.isEmpty(t.errorkeys) ? [] : t.errorkeys;
                i.isEmpty(t) || i.isEmpty(t.error) ? (l._raise("filebatchuploadsuccess", [ n ]), 
                o(), l.showPreview ? (s.each(function() {
                    var i = e(this), t = i.find(".kv-file-upload");
                    i.find(".kv-file-upload").hide(), l._setThumbStatus(i, "Success"), i.removeClass("file-uploading"), 
                    t.removeAttr("disabled");
                }), l._initUploadSuccess(t)) : l.reset(), l._setProgress(101)) : (l.showPreview && (s.each(function() {
                    var i = e(this), t = i.find(".kv-file-remove"), a = i.find(".kv-file-upload");
                    return i.removeClass("file-uploading"), a.removeAttr("disabled"), t.removeAttr("disabled"), 
                    0 === c.length ? void l._setPreviewError(i) : (-1 !== e.inArray(d, c) ? l._setPreviewError(i) : (i.find(".kv-file-upload").hide(), 
                    l._setThumbStatus(i, "Success"), l.updateStack(d, void 0)), void d++);
                }), l._initUploadSuccess(t)), l._showUploadError(t.error, n, "filebatchuploaderror"));
            }, n = function() {
                l.unlock(), l._initSuccessThumbs(), l._clearFileInput(), l._raise("filebatchuploadcomplete", [ l.filestack, l._getExtraData() ]);
            }, r = function(i, t, a) {
                var r = l._getOutData(i), n = l.ajaxOperations.uploadBatch, o = l._parseError(n, i, a);
                l._showUploadError(o, r, "filebatchuploaderror"), l.uploadFileCount = d - 1, l.showPreview && (l._getThumbs().each(function() {
                    var i = e(this), t = i.attr("data-fileindex");
                    i.removeClass("file-uploading"), void 0 !== l.filestack[t] && l._setPreviewError(i);
                }), l._getThumbs().removeClass("file-uploading"), l._getThumbs(" .kv-file-upload").removeAttr("disabled"), 
                l._getThumbs(" .kv-file-delete").removeAttr("disabled"), l._setProgress(101, l.$progress, l.msgAjaxProgressError.replace("{operation}", n)));
            }, e.each(s, function(e, t) {
                i.isEmpty(s[e]) || l.formdata.append(l.uploadFileAttr, t, l.filenames[e]);
            }), l._ajaxSubmit(t, a, n, r));
        },
        _uploadExtraOnly: function() {
            var e, t, a, r, n = this, o = {};
            n.formdata = new FormData(), n._abort(o) || (e = function(e) {
                n.lock();
                var i = n._getOutData(e);
                n._raise("filebatchpreupload", [ i ]), n._setProgress(50), o.data = i, o.xhr = e, 
                n._abort(o) && (e.abort(), n._setProgressCancelled());
            }, t = function(e, t, a) {
                var r = n._getOutData(a, e);
                i.isEmpty(e) || i.isEmpty(e.error) ? (n._raise("filebatchuploadsuccess", [ r ]), 
                n._clearFileInput(), n._initUploadSuccess(e), n._setProgress(101)) : n._showUploadError(e.error, r, "filebatchuploaderror");
            }, a = function() {
                n.unlock(), n._clearFileInput(), n._raise("filebatchuploadcomplete", [ n.filestack, n._getExtraData() ]);
            }, r = function(e, i, t) {
                var a = n._getOutData(e), r = n.ajaxOperations.uploadExtra, l = n._parseError(r, e, t);
                o.data = a, n._showUploadError(l, a, "filebatchuploaderror"), n._setProgress(101, n.$progress, n.msgAjaxProgressError.replace("{operation}", r));
            }, n._ajaxSubmit(e, t, a, r));
        },
        _deleteFileIndex: function(t) {
            var a = this, r = t.attr("data-fileindex");
            "init_" === r.substring(0, 5) && (r = parseInt(r.replace("init_", "")), a.initialPreview = i.spliceArray(a.initialPreview, r), 
            a.initialPreviewConfig = i.spliceArray(a.initialPreviewConfig, r), a.initialPreviewThumbTags = i.spliceArray(a.initialPreviewThumbTags, r), 
            a.$preview.find(i.FRAMES).each(function() {
                var i = e(this), t = i.attr("data-fileindex");
                "init_" === t.substring(0, 5) && (t = parseInt(t.replace("init_", "")), t > r && (t--, 
                i.attr("data-fileindex", "init_" + t)));
            }), a.uploadAsync && (a.cacheInitialPreview = a.getPreview()));
        },
        _initFileActions: function() {
            var t = this, a = t.$preview;
            t.showPreview && (t._initZoomButton(), a.find(i.FRAMES + " .kv-file-remove").each(function() {
                var r, n, o, l, s = e(this), d = s.closest(i.FRAMES), c = d.attr("id"), p = d.attr("data-fileindex");
                t._handler(s, "click", function() {
                    return l = t._raise("filepreremove", [ c, p ]), !(l === !1 || !t._validateMinCount()) && (r = d.hasClass("file-preview-error"), 
                    i.cleanMemory(d), void d.fadeOut("slow", function() {
                        i.cleanZoomCache(a.find("#zoom-" + c)), t.updateStack(p, void 0), t._clearObjects(d), 
                        d.remove(), c && r && t.$errorContainer.find('li[data-file-id="' + c + '"]').fadeOut("fast", function() {
                            e(this).remove(), t._errorsExist() || t._resetErrors();
                        }), t._clearFileInput();
                        var l = t.getFileStack(!0), s = t.previewCache.count(), u = l.length, f = t.showPreview && a.find(i.FRAMES).length;
                        0 !== u || 0 !== s || f ? (n = s + u, o = n > 1 ? t._getMsgSelected(n) : l[0] ? t._getFileNames()[0] : "", 
                        t._setCaption(o)) : t.reset(), t._raise("fileremoved", [ c, p ]);
                    }));
                });
            }), t.$preview.find(i.FRAMES + " .kv-file-upload").each(function() {
                var a = e(this);
                t._handler(a, "click", function() {
                    var e = a.closest(i.FRAMES), r = e.attr("data-fileindex");
                    e.hasClass("file-preview-error") || t._uploadSingle(r, t.filestack, !1);
                });
            }));
        },
        _initPreviewActions: function() {
            var t = this, a = t.$preview, r = t.deleteExtraData || {}, n = i.FRAMES + " .kv-file-remove", o = function() {
                var e = t.isUploadable ? t.previewCache.count() : t.$element.get(0).files.length;
                0 !== a.find(n).length || e || (t.reset(), t.initialCaption = "");
            };
            t._initZoomButton(), a.find(n).each(function() {
                var n = e(this), l = n.data("url") || t.deleteUrl, s = n.data("key");
                if (!i.isEmpty(l) && void 0 !== s) {
                    var d, c, p, u, f = n.closest(i.FRAMES), m = t.previewCache.data, g = f.data("fileindex");
                    g = parseInt(g.replace("init_", "")), p = i.isEmpty(m.config) && i.isEmpty(m.config[g]) ? null : m.config[g], 
                    u = i.isEmpty(p) || i.isEmpty(p.extra) ? r : p.extra, "function" == typeof u && (u = u()), 
                    c = {
                        id: n.attr("id"),
                        key: s,
                        extra: u
                    }, d = e.extend(!0, {}, {
                        url: l,
                        type: "POST",
                        dataType: "json",
                        data: e.extend(!0, {}, {
                            key: s
                        }, u),
                        beforeSend: function(e) {
                            t.ajaxAborted = !1, t._raise("filepredelete", [ s, e, u ]), t.ajaxAborted ? e.abort() : (i.addCss(f, "file-uploading"), 
                            i.addCss(n, "disabled"));
                        },
                        success: function(e, r, l) {
                            var d, p;
                            return i.isEmpty(e) || i.isEmpty(e.error) ? (t.previewCache.init(), g = parseInt(f.data("fileindex").replace("init_", "")), 
                            t.previewCache.unset(g), d = t.previewCache.count(), p = d > 0 ? t._getMsgSelected(d) : "", 
                            t._deleteFileIndex(f), t._setCaption(p), t._raise("filedeleted", [ s, l, u ]), f.removeClass("file-uploading").addClass("file-deleted"), 
                            void f.fadeOut("slow", function() {
                                i.cleanZoomCache(a.find("#zoom-" + f.attr("id"))), t._clearObjects(f), f.remove(), 
                                o(), d || 0 !== t.getFileStack().length || (t._setCaption(""), t.reset());
                            })) : (c.jqXHR = l, c.response = e, t._showError(e.error, c, "filedeleteerror"), 
                            f.removeClass("file-uploading"), n.removeClass("disabled"), void o());
                        },
                        error: function(e, i, a) {
                            var r = t.ajaxOperations.deleteThumb, n = t._parseError(r, e, a);
                            c.jqXHR = e, c.response = {}, t._showError(n, c, "filedeleteerror"), f.removeClass("file-uploading"), 
                            o();
                        }
                    }, t.ajaxDeleteSettings), t._handler(n, "click", function() {
                        return !!t._validateMinCount() && void e.ajax(d);
                    });
                }
            });
        },
        _hideFileIcon: function() {
            this.overwriteInitial && this.$captionContainer.find(".kv-caption-icon").hide();
        },
        _showFileIcon: function() {
            this.$captionContainer.find(".kv-caption-icon").show();
        },
        _getSize: function(i) {
            var t, a, r, n = this, o = parseFloat(i), l = n.fileSizeGetter;
            return e.isNumeric(i) && e.isNumeric(o) ? ("function" == typeof l ? r = l(o) : 0 === o ? r = "0.00 B" : (t = Math.floor(Math.log(o) / Math.log(1024)), 
            a = [ "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], r = 1 * (o / Math.pow(1024, t)).toFixed(2) + " " + a[t]), 
            n._getLayoutTemplate("size").replace("{sizeText}", r)) : "";
        },
        _generatePreviewTemplate: function(e, t, a, r, n, o, l, s, d, c, p) {
            var u, f = this, m = f.slug(a), g = "", v = f.previewSettings[e] || f.defaults.previewSettings[e], h = v && v.width ? v.width : "", w = v && v.height ? v.height : "", _ = d || f._renderFileFooter(m, l, i.isEmpty(h) ? "auto" : h, o), b = f._getPreviewIcon(a), C = b && f.preferIconicPreview, y = b && f.preferIconicZoomPreview, E = function(t, o, l, d) {
                var u = l ? "zoom-" + n : n, g = f._getPreviewTemplate(t), v = (s || "") + " " + d;
                return f.frameClass && (v = f.frameClass + " " + v), l && (v = v.replace(" " + i.SORT_CSS, "")), 
                g = f._parseFilePreviewIcon(g, a), "text" === t && (o = i.htmlEncode(o)), g.replace(/\{previewId}/g, u).replace(/\{caption}/g, m).replace(/\{frameClass}/g, v).replace(/\{type}/g, r).replace(/\{fileindex}/g, c).replace(/\{width}/g, h).replace(/\{height}/g, w).replace(/\{footer}/g, _).replace(/\{data}/g, o).replace(/\{template}/g, p || e);
            };
            return c = c || n.slice(n.lastIndexOf("-") + 1), f.fileActionSettings.showZoom && (g = E(y ? "other" : e, t, !0, "kv-zoom-thumb")), 
            g = "\n" + f._getLayoutTemplate("zoomCache").replace("{zoomContent}", g), u = E(C ? "other" : e, t, !1, "kv-preview-thumb"), 
            u + g;
        },
        _previewDefault: function(t, a, r) {
            var n = this, o = n.$preview;
            if (n.showPreview) {
                var l, s = t ? t.name : "", d = t ? t.type : "", c = t.size || 0, p = n.slug(s), u = r === !0 && !n.isUploadable, f = i.objUrl.createObjectURL(t);
                n._clearDefaultPreview(), l = n._generatePreviewTemplate("other", f, s, d, a, u, c), 
                o.append("\n" + l), n._setThumbAttr(a, p, c), r === !0 && n.isUploadable && n._setThumbStatus(e("#" + a), "Error");
            }
        },
        _previewFile: function(e, i, t, a, r) {
            if (this.showPreview) {
                var n, o = this, l = o._parseFileType(i), s = i ? i.name : "", d = o.slug(s), c = o.allowedPreviewTypes, p = o.allowedPreviewMimeTypes, u = o.$preview, f = c && c.indexOf(l) >= 0, m = i.size || 0, g = "text" === l || "html" === l || "image" === l ? t.target.result : r, v = p && -1 !== p.indexOf(i.type);
                "html" === l && o.purifyHtml && window.DOMPurify && (g = window.DOMPurify.sanitize(g)), 
                f || v ? (n = o._generatePreviewTemplate(l, g, s, i.type, a, !1, m), o._clearDefaultPreview(), 
                u.append("\n" + n), o._validateImage(a, d, i.type)) : o._previewDefault(i, a), o._setThumbAttr(a, d, m), 
                o._initSortable();
            }
        },
        _setThumbAttr: function(i, t, a) {
            var r = this, n = e("#" + i);
            n.length && (a = a && a > 0 ? r._getSize(a) : "", n.data({
                caption: t,
                size: a
            }));
        },
        _setInitThumbAttr: function() {
            var e, t, a, r, n = this, o = n.previewCache.data, l = n.previewCache.count(!0);
            if (0 !== l) for (var s = 0; l > s; s++) e = o.config[s], r = n.previewInitId + "-init_" + s, 
            t = i.ifSet("caption", e, i.ifSet("filename", e)), a = i.ifSet("size", e), n._setThumbAttr(r, t, a);
        },
        _slugDefault: function(e) {
            return i.isEmpty(e) ? "" : String(e).replace(/[\-\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_");
        },
        _readFiles: function(t) {
            this.reader = new FileReader();
            var a, r = this, n = r.$element, o = r.$preview, l = r.reader, s = r.$previewContainer, d = r.$previewStatus, c = r.msgLoading, p = r.msgProgress, u = r.previewInitId, f = t.length, m = r.fileTypeSettings, g = r.filestack.length, v = r.allowedFileTypes, h = v ? v.length : 0, w = r.allowedFileExtensions, _ = i.isEmpty(w) ? "" : w.join(", "), b = r.maxFilePreviewSize && parseFloat(r.maxFilePreviewSize), C = o.length && (!b || isNaN(b)), y = function(i, n, o, l) {
                var s = e.extend(!0, {}, r._getOutData({}, {}, t), {
                    id: o,
                    index: l
                }), d = {
                    id: o,
                    index: l,
                    file: n,
                    files: t
                };
                return r._previewDefault(n, o, !0), r.isUploadable && (r.addToStack(void 0), setTimeout(function() {
                    a(l + 1);
                }, 100)), r._initFileActions(), r.removeFromPreviewOnError && e("#" + o).remove(), 
                r.isUploadable ? r._showUploadError(i, s) : r._showError(i, d);
            };
            r.loadedImages = [], r.totalImagesCount = 0, e.each(t, function(e, i) {
                var t = r.fileTypeSettings.image;
                t && t(i.type) && r.totalImagesCount++;
            }), a = function(e) {
                if (i.isEmpty(n.attr("multiple")) && (f = 1), e >= f) return r.isUploadable && r.filestack.length > 0 ? r._raise("filebatchselected", [ r.getFileStack() ]) : r._raise("filebatchselected", [ t ]), 
                s.removeClass("file-thumb-loading"), void d.html("");
                var E, x, T, S, F, P, I, k, A, $, z = g + e, D = u + "-" + z, U = t[e], j = U.name ? r.slug(U.name) : "", R = (U.size || 0) / 1e3, L = "", M = i.objUrl.createObjectURL(U), Z = 0, O = "";
                if (h > 0) for (S = 0; h > S; S++) k = v[S], A = r.msgFileTypes[k] || k, O += 0 === S ? A : ", " + A;
                if (j === !1) return void a(e + 1);
                if (0 === j.length) return F = r.msgInvalidFileName.replace("{name}", i.htmlEncode(U.name)), 
                void (r.isError = y(F, U, D, e));
                if (i.isEmpty(w) || (L = new RegExp("\\.(" + w.join("|") + ")$", "i")), T = R.toFixed(2), 
                r.maxFileSize > 0 && R > r.maxFileSize) return F = r.msgSizeTooLarge.replace("{name}", j).replace("{size}", T).replace("{maxSize}", r.maxFileSize), 
                void (r.isError = y(F, U, D, e));
                if (null !== r.minFileSize && R <= i.getNum(r.minFileSize)) return F = r.msgSizeTooSmall.replace("{name}", j).replace("{size}", T).replace("{minSize}", r.minFileSize), 
                void (r.isError = y(F, U, D, e));
                if (!i.isEmpty(v) && i.isArray(v)) {
                    for (S = 0; S < v.length; S += 1) P = v[S], $ = m[P], Z += $ && "function" == typeof $ && $(U.type, U.name) ? 1 : 0;
                    if (0 === Z) return F = r.msgInvalidFileType.replace("{name}", j).replace("{types}", O), 
                    void (r.isError = y(F, U, D, e));
                }
                return 0 !== Z || i.isEmpty(w) || !i.isArray(w) || i.isEmpty(L) || (I = i.compare(j, L), 
                Z += i.isEmpty(I) ? 0 : I.length, 0 !== Z) ? r.showPreview ? !C && R > b ? (r.addToStack(U), 
                s.addClass("file-thumb-loading"), r._previewDefault(U, D), r._initFileActions(), 
                r._updateFileDetails(f), void a(e + 1)) : (o.length && void 0 !== FileReader ? (d.html(c.replace("{index}", e + 1).replace("{files}", f)), 
                s.addClass("file-thumb-loading"), l.onerror = function(e) {
                    r._errorHandler(e, j);
                }, l.onload = function(i) {
                    r._previewFile(e, U, i, D, M), r._initFileActions();
                }, l.onloadend = function() {
                    F = p.replace("{index}", e + 1).replace("{files}", f).replace("{percent}", 50).replace("{name}", j), 
                    setTimeout(function() {
                        d.html(F), r._updateFileDetails(f), a(e + 1);
                    }, 100), r._raise("fileloaded", [ U, D, e, l ]);
                }, l.onprogress = function(i) {
                    if (i.lengthComputable) {
                        var t = i.loaded / i.total * 100, a = Math.ceil(t);
                        F = p.replace("{index}", e + 1).replace("{files}", f).replace("{percent}", a).replace("{name}", j), 
                        setTimeout(function() {
                            d.html(F);
                        }, 100);
                    }
                }, E = m.text, x = m.image, E(U.type, j) ? l.readAsText(U, r.textEncoding) : x(U.type, j) ? l.readAsDataURL(U) : l.readAsArrayBuffer(U)) : (r._previewDefault(U, D), 
                setTimeout(function() {
                    a(e + 1), r._updateFileDetails(f);
                }, 100), r._raise("fileloaded", [ U, D, e, l ])), void r.addToStack(U)) : (r.addToStack(U), 
                setTimeout(function() {
                    a(e + 1);
                }, 100), void r._raise("fileloaded", [ U, D, e, l ])) : (F = r.msgInvalidFileExtension.replace("{name}", j).replace("{extensions}", _), 
                void (r.isError = y(F, U, D, e)));
            }, a(0), r._updateFileDetails(f, !1);
        },
        _updateFileDetails: function(e) {
            var t = this, a = t.$element, r = t.getFileStack(), n = i.isIE(9) && i.findFileName(a.val()) || a[0].files[0] && a[0].files[0].name || r.length && r[0].name || "", o = t.slug(n), l = t.isUploadable ? r.length : e, s = t.previewCache.count() + l, d = l > 1 ? t._getMsgSelected(s) : o;
            t.isError ? (t.$previewContainer.removeClass("file-thumb-loading"), t.$previewStatus.html(""), 
            t.$captionContainer.find(".kv-caption-icon").hide()) : t._showFileIcon(), t._setCaption(d, t.isError), 
            t.$container.removeClass("file-input-new file-input-ajax-new"), 1 === arguments.length && t._raise("fileselect", [ e, o ]), 
            t.previewCache.count() && t._initPreviewActions();
        },
        _setThumbStatus: function(e, i) {
            var t = this;
            if (t.showPreview) {
                var a = "indicator" + i, r = a + "Title", n = "file-preview-" + i.toLowerCase(), o = e.find(".file-upload-indicator"), l = t.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-loading"), "Error" === i && e.find(".kv-file-upload").attr("disabled", !0), 
                "Success" === i && (e.find(".file-drag-handle").remove(), o.css("margin-left", 0)), 
                o.html(l[a]), o.attr("title", l[r]), e.addClass(n);
            }
        },
        _setProgressCancelled: function() {
            var e = this;
            e._setProgress(101, e.$progress, e.msgCancelled);
        },
        _setProgress: function(e, t, a) {
            var r, n, o = this, l = Math.min(e, 100), s = o.progressUploadThreshold, d = 100 >= e ? o.progressTemplate : o.progressCompleteTemplate, c = 100 > l ? o.progressTemplate : a ? o.progressErrorTemplate : d;
            t = t || o.$progress, i.isEmpty(c) || (s && l > s && 100 >= e ? r = c.replace(/\{percent}/g, s).replace(/\{status}/g, o.msgUploadThreshold) : (n = e > 100 ? o.msgUploadEnd : l + "%", 
            r = c.replace(/\{percent}/g, l).replace(/\{status}/g, n)), t.html(r), a && t.find('[role="progressbar"]').html(a));
        },
        _setFileDropZoneTitle: function() {
            var e, t = this, a = t.$container.find(".file-drop-zone"), r = t.dropZoneTitle;
            t.isClickable && (e = i.isEmpty(t.$element.attr("multiple")) ? t.fileSingle : t.filePlural, 
            r += t.dropZoneClickTitle.replace("{files}", e)), a.find("." + t.dropZoneTitleClass).remove(), 
            t.isUploadable && t.showPreview && 0 !== a.length && !(t.getFileStack().length > 0) && t.dropZoneEnabled && (0 === a.find(i.FRAMES).length && i.isEmpty(t.defaultPreviewContent) && a.prepend('<div class="' + t.dropZoneTitleClass + '">' + r + "</div>"), 
            t.$container.removeClass("file-input-new"), i.addCss(t.$container, "file-input-ajax-new"));
        },
        _setAsyncUploadStatus: function(i, t, a) {
            var r = this, n = 0;
            r._setProgress(t, e("#" + i).find(".file-thumb-progress")), r.uploadStatus[i] = t, 
            e.each(r.uploadStatus, function(e, i) {
                n += i;
            }), r._setProgress(Math.floor(n / a));
        },
        _validateMinCount: function() {
            var e = this, i = e.isUploadable ? e.getFileStack().length : e.$element.get(0).files.length;
            return !(e.validateInitialCount && e.minFileCount > 0 && e._getFileCount(i - 1) < e.minFileCount) || (e._noFilesError({}), 
            !1);
        },
        _getFileCount: function(e) {
            var i = this, t = 0;
            return i.validateInitialCount && !i.overwriteInitial && (t = i.previewCache.count(), 
            e += t), e;
        },
        _getFileId: function(e) {
            var i, t = this, a = t.generateFileId;
            return "function" == typeof a ? a(e, event) : e ? (i = e.webkitRelativePath || e.fileName || e.name || null, 
            i ? e.size + "-" + i.replace(/[^0-9a-zA-Z_-]/gim, "") : null) : null;
        },
        _getFileName: function(e) {
            return e && e.name ? this.slug(e.name) : void 0;
        },
        _getFileIds: function(e) {
            var i = this;
            return i.fileids.filter(function(i) {
                return e ? void 0 !== i : void 0 !== i && null !== i;
            });
        },
        _getFileNames: function(e) {
            var i = this;
            return i.filenames.filter(function(i) {
                return e ? void 0 !== i : void 0 !== i && null !== i;
            });
        },
        _setPreviewError: function(e, i, t) {
            var a = this;
            void 0 !== i && a.updateStack(i, t), a.removeFromPreviewOnError ? e.remove() : a._setThumbStatus(e, "Error");
        },
        _checkDimensions: function(e, t, a, r, n, o, l) {
            var s, d, c, p, u = this, f = "Small" === t ? "min" : "max", m = u[f + "Image" + o];
            !i.isEmpty(m) && a.length && (c = a[0], d = "Width" === o ? c.naturalWidth || c.width : c.naturalHeight || c.height, 
            p = "Small" === t ? d >= m : m >= d, p || (s = u["msgImage" + o + t].replace("{name}", n).replace("{size}", m), 
            u._showUploadError(s, l), u._setPreviewError(r, e, null)));
        },
        _validateImage: function(e, i, t) {
            var a, r, n, o = this, l = o.$preview, s = l.find("#" + e), d = s.attr("data-fileindex"), c = s.find("img");
            i = i || "Untitled", c.length && o._handler(c, "load", function() {
                r = s.width(), n = l.width(), r > n && (c.css("width", "100%"), s.css("width", "97%")), 
                a = {
                    ind: d,
                    id: e
                }, o._checkDimensions(d, "Small", c, s, i, "Width", a), o._checkDimensions(d, "Small", c, s, i, "Height", a), 
                o.resizeImage || (o._checkDimensions(d, "Large", c, s, i, "Width", a), o._checkDimensions(d, "Large", c, s, i, "Height", a)), 
                o._raise("fileimageloaded", [ e ]), o.loadedImages.push({
                    ind: d,
                    img: c,
                    thumb: s,
                    pid: e,
                    typ: t
                }), o._validateAllImages();
            });
        },
        _validateAllImages: function() {
            var e, i = this, t = {
                val: 0
            }, a = i.loadedImages.length;
            if (a === i.totalImagesCount && (i._raise("fileimagesloaded"), i.resizeImage)) for (e = 0; e < i.loadedImages.length; e++) i._getResizedImage(i.loadedImages[e], t, a);
        },
        _getResizedImage: function(i, t, a) {
            var r, n, o, l, s = this, d = e(i.img)[0], c = d.naturalWidth, p = d.naturalHeight, u = 1, f = s.maxImageWidth || c, m = s.maxImageHeight || p, g = !(!c || !p), v = s.imageCanvas, h = s.imageCanvasContext, w = i.typ, _ = i.pid, b = i.ind, C = i.thumb;
            if (o = function(e, i, t) {
                s.isUploadable ? s._showUploadError(e, i, t) : s._showError(e, i, t), s._setPreviewError(C, b);
            }, (!s.filestack[b] || !g || f >= c && m >= p) && (g && s.filestack[b] && s._raise("fileimageresized", [ _, b ]), 
            t.val++, t.val === a && s._raise("fileimagesresized"), !g)) return void o(s.msgImageResizeError, {
                id: _,
                index: b
            }, "fileimageresizeerror");
            w = w || s.resizeDefaultImageType, r = c > f, n = p > m, u = "width" === s.resizePreference ? r ? f / c : n ? m / p : 1 : n ? m / p : r ? f / c : 1, 
            s._resetCanvas(), c *= u, p *= u, v.width = c, v.height = p;
            try {
                h.drawImage(d, 0, 0, c, p), v.toBlob(function(e) {
                    s.filestack[b] = e, s._raise("fileimageresized", [ _, b ]), t.val++, t.val === a && s._raise("fileimagesresized", [ void 0, void 0 ]), 
                    e instanceof Blob || o(s.msgImageResizeError, {
                        id: _,
                        index: b
                    }, "fileimageresizeerror");
                }, w, s.resizeQuality);
            } catch (y) {
                t.val++, t.val === a && s._raise("fileimagesresized", [ void 0, void 0 ]), l = s.msgImageResizeException.replace("{errors}", y.message), 
                o(l, {
                    id: _,
                    index: b
                }, "fileimageresizeexception");
            }
        },
        _initBrowse: function(e) {
            var i = this;
            i.showBrowse ? (i.$btnFile = e.find(".btn-file"), i.$btnFile.append(i.$element)) : i.$element.hide();
        },
        _initCaption: function() {
            var e = this, t = e.initialCaption || "";
            return e.overwriteInitial || i.isEmpty(t) ? (e.$caption.html(""), !1) : (e._setCaption(t), 
            !0);
        },
        _setCaption: function(t, a) {
            var r, n, o, l, s = this, d = s.getFileStack();
            if (s.$caption.length) {
                if (a) r = e("<div>" + s.msgValidationError + "</div>").text(), o = d.length, l = o ? 1 === o && d[0] ? s._getFileNames()[0] : s._getMsgSelected(o) : s._getMsgSelected(s.msgNo), 
                n = '<span class="' + s.msgValidationErrorClass + '">' + s.msgValidationErrorIcon + (i.isEmpty(t) ? l : t) + "</span>"; else {
                    if (i.isEmpty(t)) return;
                    r = e("<div>" + t + "</div>").text(), n = s._getLayoutTemplate("fileIcon") + r;
                }
                s.$caption.html(n), s.$caption.attr("title", r), s.$captionContainer.find(".file-caption-ellipsis").attr("title", r);
            }
        },
        _createContainer: function() {
            var i = this, t = e(document.createElement("div")).attr({
                "class": "file-input file-input-new"
            }).html(i._renderMain());
            return i.$element.before(t), i._initBrowse(t), i.theme && t.addClass("theme-" + i.theme), 
            t;
        },
        _refreshContainer: function() {
            var e = this, i = e.$container;
            i.before(e.$element), i.html(e._renderMain()), e._initBrowse(i);
        },
        _renderMain: function() {
            var e = this, i = e.isUploadable && e.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled", t = e.showClose ? e._getLayoutTemplate("close") : "", a = e.showPreview ? e._getLayoutTemplate("preview").replace(/\{class}/g, e.previewClass).replace(/\{dropClass}/g, i) : "", r = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass, n = e.captionTemplate.replace(/\{class}/g, r + " kv-fileinput-caption");
            return e.mainTemplate.replace(/\{class}/g, e.mainClass + (!e.showBrowse && e.showCaption ? " no-browse" : "")).replace(/\{preview}/g, a).replace(/\{close}/g, t).replace(/\{caption}/g, n).replace(/\{upload}/g, e._renderButton("upload")).replace(/\{remove}/g, e._renderButton("remove")).replace(/\{cancel}/g, e._renderButton("cancel")).replace(/\{browse}/g, e._renderButton("browse"));
        },
        _renderButton: function(e) {
            var t = this, a = t._getLayoutTemplate("btnDefault"), r = t[e + "Class"], n = t[e + "Title"], o = t[e + "Icon"], l = t[e + "Label"], s = t.isDisabled ? " disabled" : "", d = "button";
            switch (e) {
              case "remove":
                if (!t.showRemove) return "";
                break;

              case "cancel":
                if (!t.showCancel) return "";
                r += " hide";
                break;

              case "upload":
                if (!t.showUpload) return "";
                t.isUploadable && !t.isDisabled ? a = t._getLayoutTemplate("btnLink").replace("{href}", t.uploadUrl) : d = "submit";
                break;

              case "browse":
                if (!t.showBrowse) return "";
                a = t._getLayoutTemplate("btnBrowse");
                break;

              default:
                return "";
            }
            return r += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", 
            i.isEmpty(l) || (l = ' <span class="' + t.buttonLabelClass + '">' + l + "</span>"), 
            a.replace("{type}", d).replace("{css}", r).replace("{title}", n).replace("{status}", s).replace("{icon}", o).replace("{label}", l);
        },
        _renderThumbProgress: function() {
            var e = this;
            return '<div class="file-thumb-progress hide">' + e.progressTemplate.replace(/\{percent}/g, "0").replace(/\{status}/g, e.msgUploadBegin) + "</div>";
        },
        _renderFileFooter: function(e, t, a, r) {
            var n, o = this, l = o.fileActionSettings, s = l.showRemove, d = l.showDrag, c = l.showUpload, p = l.showZoom, u = o._getLayoutTemplate("footer"), f = r ? l.indicatorError : l.indicatorNew, m = r ? l.indicatorErrorTitle : l.indicatorNewTitle;
            return t = o._getSize(t), n = o.isUploadable ? u.replace(/\{actions}/g, o._renderFileActions(c, s, p, d, !1, !1, !1)).replace(/\{caption}/g, e).replace(/\{size}/g, t).replace(/\{width}/g, a).replace(/\{progress}/g, o._renderThumbProgress()).replace(/\{indicator}/g, f).replace(/\{indicatorTitle}/g, m) : u.replace(/\{actions}/g, o._renderFileActions(!1, !1, p, d, !1, !1, !1)).replace(/\{caption}/g, e).replace(/\{size}/g, t).replace(/\{width}/g, a).replace(/\{progress}/g, "").replace(/\{indicator}/g, f).replace(/\{indicatorTitle}/g, m), 
            n = i.replaceTags(n, o.previewThumbTags);
        },
        _renderFileActions: function(e, i, t, a, r, n, o, l) {
            if (!(e || i || t || a)) return "";
            var s, d = this, c = n === !1 ? "" : ' data-url="' + n + '"', p = o === !1 ? "" : ' data-key="' + o + '"', u = "", f = "", m = "", g = "", v = d._getLayoutTemplate("actions"), h = d.fileActionSettings, w = d.otherActionButtons.replace(/\{dataKey}/g, p), _ = r ? h.removeClass + " disabled" : h.removeClass;
            return i && (u = d._getLayoutTemplate("actionDelete").replace(/\{removeClass}/g, _).replace(/\{removeIcon}/g, h.removeIcon).replace(/\{removeTitle}/g, h.removeTitle).replace(/\{dataUrl}/g, c).replace(/\{dataKey}/g, p)), 
            e && (f = d._getLayoutTemplate("actionUpload").replace(/\{uploadClass}/g, h.uploadClass).replace(/\{uploadIcon}/g, h.uploadIcon).replace(/\{uploadTitle}/g, h.uploadTitle)), 
            t && (m = d._getLayoutTemplate("actionZoom").replace(/\{zoomClass}/g, h.zoomClass).replace(/\{zoomIcon}/g, h.zoomIcon).replace(/\{zoomTitle}/g, h.zoomTitle)), 
            a && l && (s = "drag-handle-init " + h.dragClass, g = d._getLayoutTemplate("actionDrag").replace(/\{dragClass}/g, s).replace(/\{dragTitle}/g, h.dragTitle).replace(/\{dragIcon}/g, h.dragIcon)), 
            v.replace(/\{delete}/g, u).replace(/\{upload}/g, f).replace(/\{zoom}/g, m).replace(/\{drag}/g, g).replace(/\{other}/g, w);
        },
        _browse: function(e) {
            var i = this;
            i._raise("filebrowse"), e && e.isDefaultPrevented() || (i.isError && !i.isUploadable && i.clear(), 
            i.$captionContainer.focus());
        },
        _filterDuplicate: function(e, i, t) {
            var a = this, r = a._getFileId(e);
            r && t && t.indexOf(r) > -1 || (t || (t = []), i.push(e), t.push(r));
        },
        _change: function(t) {
            var a = this, r = a.$element;
            if (!a.isUploadable && i.isEmpty(r.val()) && a.fileInputCleared) return void (a.fileInputCleared = !1);
            a.fileInputCleared = !1;
            var n, o, l, s, d = [], c = arguments.length > 1, p = a.isUploadable, u = c ? t.originalEvent.dataTransfer.files : r.get(0).files, f = a.filestack.length, m = i.isEmpty(r.attr("multiple")), g = m && f > 0, v = 0, h = a._getFileIds(), w = function(i, t, r, n) {
                var o = e.extend(!0, {}, a._getOutData({}, {}, u), {
                    id: r,
                    index: n
                }), l = {
                    id: r,
                    index: n,
                    file: t,
                    files: u
                };
                return a.isUploadable ? a._showUploadError(i, o) : a._showError(i, l);
            };
            if (a.reader = null, a._resetUpload(), a._hideFileIcon(), a.isUploadable && a.$container.find(".file-drop-zone ." + a.dropZoneTitleClass).remove(), 
            c ? e.each(u, function(e, i) {
                i && !i.type && void 0 !== i.size && i.size % 4096 === 0 ? v++ : a._filterDuplicate(i, d, h);
            }) : (u = t.target && void 0 === t.target.files ? t.target.value ? [ {
                name: t.target.value.replace(/^.+\\/, "")
            } ] : [] : t.target.files || {}, e.each(u, function(e, i) {
                a._filterDuplicate(i, d, h);
            })), i.isEmpty(d) || 0 === d.length) return p || a.clear(), a._showFolderError(v), 
            void a._raise("fileselectnone");
            if (a._resetErrors(), s = d.length, o = a._getFileCount(a.isUploadable ? a.getFileStack().length + s : s), 
            a.maxFileCount > 0 && o > a.maxFileCount) {
                if (!a.autoReplace || s > a.maxFileCount) return l = a.autoReplace && s > a.maxFileCount ? s : o, 
                n = a.msgFilesTooMany.replace("{m}", a.maxFileCount).replace("{n}", l), a.isError = w(n, null, null, null), 
                a.$captionContainer.find(".kv-caption-icon").hide(), a._setCaption("", !0), void a.$container.removeClass("file-input-new file-input-ajax-new");
                o > a.maxFileCount && a._resetPreviewThumbs(p);
            } else !p || g ? (a._resetPreviewThumbs(!1), g && a.clearStack()) : !p || 0 !== f || a.previewCache.count() && !a.overwriteInitial || a._resetPreviewThumbs(!0);
            a.isPreviewable ? a._readFiles(d) : a._updateFileDetails(1), a._showFolderError(v);
        },
        _abort: function(i) {
            var t, a = this;
            return !(!a.ajaxAborted || "object" != typeof a.ajaxAborted || void 0 === a.ajaxAborted.message) && (t = e.extend(!0, {}, a._getOutData(), i), 
            t.abortData = a.ajaxAborted.data || {}, t.abortMessage = a.ajaxAborted.message, 
            a.cancel(), a._setProgress(101, a.$progress, a.msgCancelled), a._showUploadError(a.ajaxAborted.message, t, "filecustomerror"), 
            !0);
        },
        _resetFileStack: function() {
            var i = this, t = 0, a = [], r = [], n = [];
            i._getThumbs().each(function() {
                var o = e(this), l = o.attr("data-fileindex"), s = i.filestack[l];
                -1 !== l && (void 0 !== s ? (a[t] = s, r[t] = i._getFileName(s), n[t] = i._getFileId(s), 
                o.attr({
                    id: i.previewInitId + "-" + t,
                    "data-fileindex": t
                }), t++) : o.attr({
                    "data-fileindex": "-1"
                }));
            }), i.filestack = a, i.filenames = r, i.fileids = n;
        },
        clearStack: function() {
            var e = this;
            return e.filestack = [], e.filenames = [], e.fileids = [], e.$element;
        },
        updateStack: function(e, i) {
            var t = this;
            return t.filestack[e] = i, t.filenames[e] = t._getFileName(i), t.fileids[e] = i && t._getFileId(i) || null, 
            t.$element;
        },
        addToStack: function(e) {
            var i = this;
            return i.filestack.push(e), i.filenames.push(i._getFileName(e)), i.fileids.push(i._getFileId(e)), 
            i.$element;
        },
        getFileStack: function(e) {
            var i = this;
            return i.filestack.filter(function(i) {
                return e ? void 0 !== i : void 0 !== i && null !== i;
            });
        },
        getFilesCount: function() {
            var e = this, i = e.isUploadable ? e.getFileStack().length : e.$element.get(0).files.length;
            return e._getFileCount(i);
        },
        lock: function() {
            var e = this;
            return e._resetErrors(), e.disable(), e.showRemove && i.addCss(e.$container.find(".fileinput-remove"), "hide"), 
            e.showCancel && e.$container.find(".fileinput-cancel").removeClass("hide"), e._raise("filelock", [ e.filestack, e._getExtraData() ]), 
            e.$element;
        },
        unlock: function(e) {
            var t = this;
            return void 0 === e && (e = !0), t.enable(), t.showCancel && i.addCss(t.$container.find(".fileinput-cancel"), "hide"), 
            t.showRemove && t.$container.find(".fileinput-remove").removeClass("hide"), e && t._resetFileStack(), 
            t._raise("fileunlock", [ t.filestack, t._getExtraData() ]), t.$element;
        },
        cancel: function() {
            var i, t = this, a = t.ajaxRequests, r = a.length;
            if (r > 0) for (i = 0; r > i; i += 1) t.cancelling = !0, a[i].abort();
            return t._setProgressCancelled(), t._getThumbs().each(function() {
                var i = e(this), a = i.attr("data-fileindex");
                i.removeClass("file-uploading"), void 0 !== t.filestack[a] && (i.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), 
                i.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), t.unlock();
            }), t.$element;
        },
        clear: function() {
            var t, a = this;
            if (a._raise("fileclear")) return a.$btnUpload.removeAttr("disabled"), a._getThumbs().find("video,audio,img").each(function() {
                i.cleanMemory(e(this));
            }), a._resetUpload(), a.clearStack(), a._clearFileInput(), a._resetErrors(!0), a._hasInitialPreview() ? (a._showFileIcon(), 
            a._resetPreview(), a._initPreviewActions(), a.$container.removeClass("file-input-new")) : (a._getThumbs().each(function() {
                a._clearObjects(e(this));
            }), a.isUploadable && (a.previewCache.data = {}), a.$preview.html(""), t = !a.overwriteInitial && a.initialCaption.length > 0 ? a.initialCaption : "", 
            a.$caption.html(t), a.$caption.attr("title", ""), i.addCss(a.$container, "file-input-new"), 
            a._validateDefaultPreview()), 0 === a.$container.find(i.FRAMES).length && (a._initCaption() || a.$captionContainer.find(".kv-caption-icon").hide()), 
            a._hideFileIcon(), a._raise("filecleared"), a.$captionContainer.focus(), a._setFileDropZoneTitle(), 
            a.$element;
        },
        reset: function() {
            var e = this;
            if (e._raise("filereset")) return e._resetPreview(), e.$container.find(".fileinput-filename").text(""), 
            i.addCss(e.$container, "file-input-new"), (e.$preview.find(i.FRAMES).length || e.isUploadable && e.dropZoneEnabled) && e.$container.removeClass("file-input-new"), 
            e._setFileDropZoneTitle(), e.clearStack(), e.formdata = {}, e.$element;
        },
        disable: function() {
            var e = this;
            return e.isDisabled = !0, e._raise("filedisabled"), e.$element.attr("disabled", "disabled"), 
            e.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled"), e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), 
            e._initDragDrop(), e.$element;
        },
        enable: function() {
            var e = this;
            return e.isDisabled = !1, e._raise("fileenabled"), e.$element.removeAttr("disabled"), 
            e.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), 
            e.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), 
            e._initDragDrop(), e.$element;
        },
        upload: function() {
            var t, a, r, n = this, o = n.getFileStack().length, l = {}, s = !e.isEmptyObject(n._getExtraData());
            if (n.isUploadable && !n.isDisabled) {
                if (n.minFileCount > 0 && n._getFileCount(o) < n.minFileCount) return void n._noFilesError(l);
                if (n._resetUpload(), 0 === o && !s) return void n._showUploadError(n.msgUploadEmpty);
                if (n.$progress.removeClass("hide"), n.uploadCount = 0, n.uploadStatus = {}, n.uploadLog = [], 
                n.lock(), n._setProgress(2), 0 === o && s) return void n._uploadExtraOnly();
                if (r = n.filestack.length, n.hasInitData = !1, !n.uploadAsync) return n._uploadBatch(), 
                n.$element;
                for (a = n._getOutData(), n._raise("filebatchpreupload", [ a ]), n.fileBatchCompleted = !1, 
                n.uploadCache = {
                    content: [],
                    config: [],
                    tags: [],
                    append: !0
                }, n.uploadAsyncCount = n.getFileStack().length, t = 0; r > t; t++) n.uploadCache.content[t] = null, 
                n.uploadCache.config[t] = null, n.uploadCache.tags[t] = null;
                for (n.$preview.find(".file-preview-initial").removeClass(i.SORT_CSS), n._initSortable(), 
                n.cacheInitialPreview = n.getPreview(), t = 0; r > t; t++) void 0 !== n.filestack[t] && n._uploadSingle(t, n.filestack, !0);
            }
        },
        destroy: function() {
            var i = this, t = i.$form, a = i.$container, r = i.$element, n = i.namespace;
            return e(document).off(n), e(window).off(n), t && t.length && t.off(n), r.insertBefore(a).off(n).removeData(), 
            a.off().remove(), r;
        },
        refresh: function(i) {
            var t = this, a = t.$element;
            return i = i ? e.extend(!0, {}, t.options, i) : t.options, t.destroy(), a.fileinput(i), 
            a.val() && a.trigger("change.fileinput"), a;
        },
        zoom: function(t) {
            var a = this, r = e("#" + t), n = a.$modal;
            return r.length ? (i.initModal(n), n.html(a._getModalContent()), a._setZoomContent(r), 
            n.modal("show"), void a._initZoomButtons()) : void a._log('Cannot zoom to detailed preview! Invalid frame with id: "' + t + '".');
        },
        getPreview: function() {
            var e = this;
            return {
                content: e.initialPreview,
                config: e.initialPreviewConfig,
                tags: e.initialPreviewThumbTags
            };
        }
    }, e.fn.fileinput = function(a) {
        if (i.hasFileAPISupport() || i.isIE(9)) {
            var r = Array.apply(null, arguments), n = [];
            switch (r.shift(), this.each(function() {
                var o, l = e(this), s = l.data("fileinput"), d = "object" == typeof a && a, c = d.theme || l.data("theme"), p = {}, u = {}, f = d.language || l.data("language") || e.fn.fileinput.defaults.language || "en";
                s || (c && (u = e.fn.fileinputThemes[c] || {}), "en" === f || i.isEmpty(e.fn.fileinputLocales[f]) || (p = e.fn.fileinputLocales[f] || {}), 
                o = e.extend(!0, {}, e.fn.fileinput.defaults, u, e.fn.fileinputLocales.en, p, d, l.data()), 
                s = new t(this, o), l.data("fileinput", s)), "string" == typeof a && n.push(s[a].apply(s, r));
            }), n.length) {
              case 0:
                return this;

              case 1:
                return n[0];

              default:
                return n;
            }
        }
    }, e.fn.fileinput.defaults = {
        language: "en",
        showCaption: !0,
        showBrowse: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showCancel: !0,
        showClose: !0,
        showUploadedThumbs: !0,
        browseOnZoneClick: !1,
        autoReplace: !1,
        generateFileId: null,
        previewClass: "",
        captionClass: "",
        frameClass: "krajee-default",
        mainClass: "file-caption-main",
        mainTemplate: null,
        purifyHtml: !0,
        fileSizeGetter: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewAsData: !1,
        initialPreviewFileType: "image",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        removeFromPreviewOnError: !1,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        previewZoomButtonIcons: {
            prev: '<i class="icon-caret-left"></i>',
            next: '<i class="icon-caret-right"></i>',
            toggleheader: '<i class="icon-arrows-v"></i>',
            fullscreen: '<i class="icon-expand"></i>',
            borderless: '<i class="icon-arrows-alt"></i>',
            close: '<i class="icon-trash"></i>'
        },
        previewZoomButtonClasses: {
            prev: "btn btn-navigate",
            next: "btn btn-navigate",
            toggleheader: "btn btn-default btn-header-toggle",
            fullscreen: "btn btn-default",
            borderless: "btn btn-default",
            close: "btn btn-default"
        },
        preferIconicPreview: !1,
        preferIconicZoomPreview: !1,
        allowedPreviewTypes: void 0,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="icon-file"></i>',
        previewFileIconClass: "file-other-icon",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "",
        browseIcon: '<i class="icon-folder-alt"></i>&nbsp;',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="icon-trash"></i>',
        removeClass: "btn btn-default",
        cancelIcon: '<i class="icon-ban"></i>',
        cancelClass: "btn btn-default",
        uploadIcon: '<i class="icon-cloud-upload"></i>',
        uploadClass: "btn btn-default",
        uploadUrl: null,
        uploadAsync: !0,
        uploadExtraData: {},
        zoomModalHeight: 480,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        minFileSize: 0,
        maxFileSize: 0,
        maxFilePreviewSize: 25600,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="icon-exclamation-triangle"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        progressErrorClass: "progress-bar progress-bar-danger",
        progressUploadThreshold: 99,
        previewFileType: "image",
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0
    }, e.fn.fileinputLocales.en = {
        fileSingle: "fichier",
        filePlural: "fichiers",
        browseLabel: "Parcourir&hellip;",
        removeLabel: "Retirer",
        removeTitle: "Retirer les fichiers sélectionnés",
        cancelLabel: "Annuler",
        cancelTitle: "Annuler l'envoi en cours",
        uploadLabel: "Transférer",
        uploadTitle: "Transférer les fichiers sélectionnés",
        msgNo: "Non",
        msgNoFilesSelected: "Aucun fichier sélectionné",
        msgCancelled: "Annulé",
        msgZoomModalHeading: "Aperçu détaillé",
        msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Le fichier "{name}" (<b>{size} Ko</b>) dépasse la taille maximale autorisée qui est de <b>{maxSize} Ko</b>.',
        msgFilesTooLess: "Vous devez sélectionner au moins <b>{n}</b> {files} à transmettre.",
        msgFilesTooMany: "Le nombre de fichier sélectionné <b>({n})</b> dépasse la quantité maximale autorisée qui est de <b>{m}</b>.",
        msgFileNotFound: 'Le fichier "{name}" est introuvable !',
        msgFileSecured: 'Des restrictions de sécurité vous empêchent d&#39;accéder au fichier "{name}".',
        msgFileNotReadable: 'Le fichier "{name}" est illisble.',
        msgFilePreviewAborted: 'Prévisualisation du fichier "{name}" annulée.',
        msgFilePreviewError: 'Une erreur est survenue lors de la lecture du fichier "{name}".',
        msgInvalidFileName: 'Caractères non valides ou non pris en charge dans le nom de fichier "{name}".',
        msgInvalidFileType: 'Type de document invalide pour "{name}". Seulement les documents de type "{types}" sont autorisés.',
        msgInvalidFileExtension: 'Extension invalide pour le fichier "{name}". Seules les extensions "{extensions}" sont autorisées.',
        msgFileTypes: {
            image: "image",
            html: "HTML",
            text: "text",
            video: "video",
            audio: "audio",
            flash: "flash",
            pdf: "PDF",
            object: "object"
        },
        msgUploadAborted: "Le téléchargement du fichier a été interrompu",
        msgUploadThreshold: "Processing...",
        msgUploadBegin: "Initializing...",
        msgUploadEnd: "Done",
        msgUploadEmpty: "No valid data available for upload.",
        msgValidationError: "Validation Error",
        msgLoading: "Loading file {index} of {files} &hellip;",
        msgProgress: "Loading file {index} of {files} - {name} - {percent}% completed.",
        msgSelected: "{n} {files} selected",
        msgFoldersNotAllowed: "Drag & drop files only! {n} folder(s) dropped were skipped.",
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: "Could not get the image dimensions to resize.",
        msgImageResizeException: "Error while resizing the image.<pre>{errors}</pre>",
        msgAjaxError: "Something went wrong with the {operation} operation. Please try again later!",
        msgAjaxProgressError: "{operation} failed",
        ajaxOperations: {
            deleteThumb: "file delete",
            uploadThumb: "file upload",
            uploadBatch: "batch file upload",
            uploadExtra: "form data upload"
        },
        dropZoneTitle: "Glissez et déposez les fichiers ici&hellip;",
        dropZoneClickTitle: "Ou cliquez pour sélectionner {files}",
        previewZoomButtonTitles: {
            prev: "View previous file",
            next: "View next file",
            toggleheader: "Toggle header",
            fullscreen: "Toggle full screen",
            borderless: "Toggle borderless mode",
            close: "Close detailed preview"
        }
    }, e.fn.fileinput.Constructor = t, e(document).ready(function() {
        var i = e("input.file[type=file]");
        i.length && i.fileinput();
    });
}), function($) {
    "use strict";
    $.fn.fileinputLocales.fr = {
        fileSingle: "fichier",
        filePlural: "fichiers",
        browseLabel: "Parcourir&hellip;",
        removeLabel: "Retirer",
        removeTitle: "Retirer les fichiers sélectionnés",
        cancelLabel: "Annuler",
        cancelTitle: "Annuler l'envoi en cours",
        uploadLabel: "Transférer",
        uploadTitle: "Transférer les fichiers sélectionnés",
        msgNo: "Non",
        msgNoFilesSelected: "",
        msgCancelled: "Annulé",
        msgZoomModalHeading: "Aperçu détaillé",
        msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Le fichier "{name}" (<b>{size} Ko</b>) dépasse la taille maximale autorisée qui est de <b>{maxSize} Ko</b>.',
        msgFilesTooLess: "Vous devez sélectionner au moins <b>{n}</b> {files} à transmettre.",
        msgFilesTooMany: "Le nombre de fichier sélectionné <b>({n})</b> dépasse la quantité maximale autorisée qui est de <b>{m}</b>.",
        msgFileNotFound: 'Le fichier "{name}" est introuvable !',
        msgFileSecured: 'Des restrictions de sécurité vous empêchent d\'accéder au fichier "{name}".',
        msgFileNotReadable: 'Le fichier "{name}" est illisble.',
        msgFilePreviewAborted: 'Prévisualisation du fichier "{name}" annulée.',
        msgFilePreviewError: 'Une erreur est survenue lors de la lecture du fichier "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Type de document invalide pour "{name}". Seulement les documents de type "{types}" sont autorisés.',
        msgInvalidFileExtension: 'Extension invalide pour le fichier "{name}". Seules les extensions "{extensions}" sont autorisées.',
        msgFileTypes: {
            image: "image",
            html: "HTML",
            text: "text",
            video: "video",
            audio: "audio",
            flash: "flash",
            pdf: "PDF",
            object: "object"
        },
        msgUploadAborted: "Le téléchargement du fichier a été interrompu",
        msgUploadThreshold: "Processing...",
        msgUploadBegin: "Initializing...",
        msgUploadEnd: "Done",
        msgUploadEmpty: "No valid data available for upload.",
        msgValidationError: "Erreur de validation",
        msgLoading: "Transmission du fichier {index} sur {files}&hellip;",
        msgProgress: "Transmission du fichier {index} sur {files} - {name} - {percent}% faits.",
        msgSelected: "{n} {files} sélectionné(s)",
        msgFoldersNotAllowed: "Glissez et déposez uniquement des fichiers ! {n} répertoire(s) exclu(s).",
        msgImageWidthSmall: 'Largeur de fichier image "{name}" doit être d\'au moins {size} px.',
        msgImageHeightSmall: 'Hauteur de fichier image "{name}" doit être d\'au moins {size} px.',
        msgImageWidthLarge: 'Largeur de fichier image "{name}" ne peut pas dépasser {size} px.',
        msgImageHeightLarge: 'Hauteur de fichier image "{name}" ne peut pas dépasser {size} px.',
        msgImageResizeError: "Impossible d'obtenir les dimensions de l'image à redimensionner.",
        msgImageResizeException: "Erreur lors du redimensionnement de l'image.<pre>{errors}</pre>",
        msgAjaxError: "Something went wrong with the {operation} operation. Please try again later!",
        msgAjaxProgressError: "{operation} failed",
        ajaxOperations: {
            deleteThumb: "file delete",
            uploadThumb: "file upload",
            uploadBatch: "batch file upload",
            uploadExtra: "form data upload"
        },
        dropZoneTitle: "Glissez et déposez les fichiers ici&hellip;",
        dropZoneClickTitle: "<br>(or click to select {files})",
        fileActionSettings: {
            removeTitle: "Supprimer le fichier",
            uploadTitle: "Télécharger un fichier",
            zoomTitle: "Voir les détails",
            dragTitle: "Move / Rearrange",
            indicatorNewTitle: "Pas encore téléchargé",
            indicatorSuccessTitle: "Posté",
            indicatorErrorTitle: "Ajouter erreur",
            indicatorLoadingTitle: "ajout ..."
        },
        previewZoomButtonTitles: {
            prev: "View previous file",
            next: "View next file",
            toggleheader: "Toggle header",
            fullscreen: "Toggle full screen",
            borderless: "Toggle borderless mode",
            close: "Close detailed preview"
        }
    };
}(window.jQuery);