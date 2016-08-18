/* global BootstrapDialog */
/* global $ */

$(document).ready(function() {
    $('.login-form input[type="text"]').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('#btnSendMail').click(function() {
        var abort = false;

        var btnLogin = $('#form-login');

        if (btnLogin.val() === '') {
            btnLogin.addClass('input-error');
            abort = true;
        }

        if (!abort) {
            var resetPasswordData = {
                login: btnLogin.val(),
            };

            $.get('api/auth/request-reset-password', resetPasswordData, function(res) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Mail inviata',
                    draggable: true,
                    closable: true,
                    message: 'Le istruzioni per il reset della password sono state inviata al tuo indirizzo mail.',
                    buttons: [{
                        label: 'Ok',
                        cssClass: 'btn-success',
                        action: function(dialogItself) {
                            dialogItself.close();
                        }
                    }]
                });
            });
        }
    });

    $('#form-login').bind("enterKey", function(e) {
        $('#btnSendMail').click();
    });

    $('#form-login').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
