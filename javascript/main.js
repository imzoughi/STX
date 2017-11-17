/** ==========================================
 * JS DOCUMENT
 *
 * PROJECT NAME: Segetex-eif
 * DATE: 30/12/2016
 * AUTHOR: Issam-MZOUGHI
 ============================================ */
/* ========================================== *\
 *  INIT
 \* ========================================== */
$(function () {
    cartQuantity.init();
    cartMessage.init();
    inputFile.init();
});
/* ========================================== *\
 *  MODULES
 \* ========================================== */

/* =cartQuantity */
var cartQuantity = function () {
    function _init() {

        $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
        $('.quantity').each(function () {
            var spinner = $(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.quantity-up'),
                btnDown = spinner.find('.quantity-down'),
                min = input.attr('min'),
                max = input.attr('max');

            btnUp.click(function () {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.click(function () {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

        });
    }

    return {
        init: _init
    };
}();

/* =cartMessage */
var cartMessage = function () {
    function _init() {

        $("[data-toast]").on("click", function () {
            var b = $(this),
                c = b.data("toast-type"),
                d = b.data("toast-icon"),
                e = b.data("toast-position"),
                f = b.data("toast-title"),
                g = b.data("toast-message"),
                h = "";
            switch (e) {
                case"topRight":
                    h = {
                        class: "iziToast-" + c || "",
                        title: f || "Title",
                        message: g || "toast message",
                        animateInside: !1,
                        position: "topRight",
                        progressBar: !1,
                        overlay: true,
                        icon: d,
                        timeout: 3200,
                        transitionIn: "fadeInLeft",
                        transitionOut: "fadeOut",
                        transitionInMobile: "fadeIn",
                        transitionOutMobile: "fadeOut"
                    };
                    break;
                case"bottomRight":
                    h = {
                        class: "iziToast-" + c || "",
                        title: f || "Title",
                        message: g || "toast message",
                        animateInside: !1,
                        position: "bottomRight",
                        progressBar: !1,
                        overlay: true,
                        icon: d,
                        timeout: 3200,
                        transitionIn: "fadeInLeft",
                        transitionOut: "fadeOut",
                        transitionInMobile: "fadeIn",
                        transitionOutMobile: "fadeOut"
                    };
                    break;
                case"topLeft":
                    h = {
                        class: "iziToast-" + c || "",
                        title: f || "Title",
                        message: g || "toast message",
                        animateInside: !1,
                        position: "topLeft",
                        progressBar: !1,
                        overlay: true,
                        icon: d,
                        timeout: 3200,
                        transitionIn: "fadeInRight",
                        transitionOut: "fadeOut",
                        transitionInMobile: "fadeIn",
                        transitionOutMobile: "fadeOut"
                    };
                    break;
                case"bottomLeft":
                    h = {
                        class: "iziToast-" + c || "",
                        title: f || "Title",
                        message: g || "toast message",
                        animateInside: !1,
                        position: "bottomLeft",
                        progressBar: !1,
                        overlay: true,
                        icon: d,
                        timeout: 3200,
                        transitionIn: "fadeInRight",
                        transitionOut: "fadeOut",
                        transitionInMobile: "fadeIn",
                        transitionOutMobile: "fadeOut"
                    };
                    break;
                case"topCenter":
                    h = {
                        class: "iziToast-" + c || "",
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
                case"bottomCenter":
                    h = {
                        class: "iziToast-" + c || "",
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
                        class: "iziToast-" + c || "",
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
                    }
            }
            iziToast.show(h)
        });

    }

    return {
        init: _init
    };
}();

/* =inputFile */
var inputFile = function () {
    function _init() {

        $('input[type="file"]').fileinput({
            rtl: 'true',
            showCaption: false,
            showPreview: false,
            showUpload: false,
        });

    }

    return {
        init: _init
    };
}();
