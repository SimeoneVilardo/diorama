/* global cookie */
/* global $ */

$(document).ready(function() {
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('#btnLogin').click(function() {
        var abort = false;

        var txtUsername = $('#form-username');
        var txtPassword = $('#form-password');

        if (txtUsername.val() === '') {
            txtUsername.addClass('input-error');
            abort = true;
        }

        if (txtPassword.val() === '') {
            txtPassword.addClass('input-error');
            abort = true;
        }

        if (!abort) {
            var loginData = {
                username: $('#form-username').val(),
                password: $('#form-password').val()
            };

            $.post('api/auth/login', loginData, function(res) {
                window.location.replace(res.url);
            });
        }
    });

    $('#form-username, #form-password').bind("enterKey", function(e) {
        $('#btnLogin').click();
    });

    $('#form-username, #form-password').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
