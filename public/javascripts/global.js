/* global BootstrapDialog */
/* global $ */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    // $('body').scrollspy({
    //     target: '.navbar-fixed-top',
    //     offset: 51
    // })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
    console.log('event', event);
    console.log('jqxhr', jqxhr);
    console.log('settings', settings);
    console.log('thrownError', thrownError);
    var errorMessage = (jqxhr.responseJSON && jqxhr.responseJSON.message) ? jqxhr.responseJSON.message : (thrownError ? thrownError : 'errore sconosciuto.');
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DANGER,
        title: 'Errore',
        draggable: true,
        closable: false,
        closeByBackdrop: false,
        closeByKeyboard: false,
        message: 'Si è verificato un errore: ' + errorMessage,
        buttons: [{
            label: 'Ok',
            cssClass: 'btn-danger',
            action: function(dialogItself) {
                dialogItself.close();
            }
        }]
    });
});

$(document).ready(function() {
    $('#btnLogout').click(function() {
        $.post('api/auth/logout', function(res) {
            window.location.replace(res.url);
        });
    });
});

/* Chiamata AJAX (differisce dalle altre perchè non eseguita con shorthand method).
   Specificando il campo xhr è possibile effettuare una XML HTTP Request che invia al modulo multer un file all'interno del body della request.
   La callback di progress può calcolare la percentuale di upload per mostrare eventuali barre di progressioni.
   Essendo una chiamata AJAX, è soggetta alle impostazioni dell'AJAXSetup del global.js, quindi prevede già la gestione dell'errore centralizzata
   di Diorama. */
function upload(url, file, fieldName, optionalFieldName, optionalFieldValue, progressCallback, successCallback, completeCallback) {
    var formData = new FormData();
    formData.append(fieldName, file);
    if(optionalFieldName && optionalFieldValue)
        formData.append(optionalFieldName, optionalFieldValue);
    return $.ajax({
        url: url,
        type: 'PUT',
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', progressCallback, false);
            }
            return myXhr;
        },
        success: successCallback,
        complete: completeCallback,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
}

String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};