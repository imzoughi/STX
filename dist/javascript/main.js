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
        $("[data-toast='succes']").on("click", function() {
            iziToast.success({
                type: "success",
                position: "topCenter",
                icon: "icon-like",
                title: "Le produit",
                message: "a été ajouté à votre panier avec succès!",
                progressBar: !1
            });
        }), $("[data-toast='error']").on("click", function() {
            iziToast.error({
                type: "danger",
                position: "topCenter",
                icon: "icon-dislike",
                title: "Le produit",
                message: "n'a pas été ajouté à votre panier!",
                progressBar: !1
            });
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
            showUpload: !1,
            allowedFileExtensions: [ "jpg", "gif", "png", "txt" ]
        });
    }
    return {
        init: _init
    };
}();