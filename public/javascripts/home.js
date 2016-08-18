 /*global WOW*/
 /*global jQuery*/
 /*global $*/
 /*global BootstrapDialog*/
 /*global validationCompleted*/
 /*global validationErrorMessage*/

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

 $(document).ready(function() {
     if (validationCompleted === 'true') {
         window.history.pushState("", "", window.location.href.split("?")[0]);
         BootstrapDialog.show({
             type: BootstrapDialog.TYPE_SUCCESS,
             title: 'Convalida completata',
             draggable: true,
             message: 'Account convalidato.',
             buttons: [{
                 label: 'Ok',
                 cssClass: 'btn-success',
                 action: function(dialogItself) {
                     dialogItself.close();
                 }
             }]
         });
     }
 });