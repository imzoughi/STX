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

        $("[data-toast='succes']").on("click", function () {
            iziToast.success({
                type:"success",
                position:"topCenter",
                icon:"icon-like",
                title:"Le produit",
                message:"a été ajouté à votre panier avec succès!",
                progressBar: false,
            });
        });

        $("[data-toast='error']").on("click", function () {
            iziToast.error({
                type:"danger",
                position:"topCenter",
                icon:"icon-dislike",
                title:"Le produit",
                message:"n'a pas été ajouté à votre panier!",
                progressBar: false,
            });
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
            allowedFileExtensions: ['jpg', 'gif', 'png', 'txt']
        });

    }

    return {
        init: _init
    };
}();
