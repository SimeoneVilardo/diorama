/* global BootstrapDialog */
/* global $ */
/* global resetPasswordToken */

$(document).on({
    ajaxStart: function() {
        $("body").addClass("loading");
    },
    ajaxStop: function() {
        $("body").removeClass("loading");
    }
});

$(document).ready(function() {
    $('.reset-password-form input[type="password"]').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('#btnReset').click(function() {
        var abort = false;

        var txtPassword = $('#form-password');
        var txtConfirmPassword = $('#form-confirm-password');

        if (txtPassword.val() === '') {
            txtPassword.addClass('input-error');
            abort = true;
        }

        if (txtConfirmPassword.val() === '') {
            txtConfirmPassword.addClass('input-error');
            abort = true;
        }

        if (txtPassword.val() !== txtConfirmPassword.val()) {
            txtPassword.addClass('input-error');
            txtConfirmPassword.addClass('input-error');
            abort = true;
        }

        if (!abort) {
            var resetPasswordData = {
                password: txtPassword.val(),
                token: resetPasswordToken
            };
            $.put('api/auth/reset-password', resetPasswordData, function(res) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Password modificata',
                    draggable: true,
                    closable: true,
                    message: 'La password è stata modificata correttamente.',
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

    $('#form-password, #form-confirm-password').bind("enterKey", function(e) {
        $('#btnReset').click();
    });

    $('#form-password, #form-confirm-password').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});