/* global BootstrapDialog */
/* global $ */

$(document).ready(function() {
    $('.mail-form input[type="mail"]').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('#btnSendMail').click(function() {
        var abort = false;

        var txtMail = $('#form-mail');

        if (txtMail.val() === '') {
            txtMail.addClass('input-error');
            abort = true;
        }

        if (!abort) {
            var recoverUsernameData = {
                pattern: txtMail.val(),
            };

            $.get('api/auth/recover-username', recoverUsernameData, function(res) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Username inviato',
                    draggable: true,
                    closable: true,
                    message: 'Il tuo username è stato inviato al recapito specificato.',
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

    $('#form-mail').bind("enterKey", function(e) {
        $('#btnSendMail').click();
    });

    $('#form-mail').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
