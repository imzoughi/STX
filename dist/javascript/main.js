$(function() {
    cartQuantity.init(), cartMessage.init(), inputFile.init();
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
}(), inputFile = function() {
    function _init() {
        $('input[type="file"]').fileinput({
            rtl: "true",
            showCaption: !1,
            showPreview: !1,
            showUpload: !1
        });
    }
    return {
        init: _init
    };
}();

!function($) {
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
}(window.jQuery), !function(e) {
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
}), window.Modernizr = function(a, b, c) {
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