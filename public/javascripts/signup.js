/* global $ */
/* global navigator */
/* global BootstrapDialog */

var isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)));
var mailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$(document).on({
    ajaxStart: function() {
        $("body").addClass("loading");
    },
    ajaxStop: function() {
        $("body").removeClass("loading");
    }
});

$(document).ready(function() {
    if (isMobile)
        $('#imgLogo').hide();

    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form input[type="email"]').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('#btnSignup').click(function() {
        var abort = false;

        var txtEmail = $('#form-email');
        var txtPhone = $('#form-phone');
        var txtUsername = $('#form-username');
        var txtPassword = $('#form-password');
        var txtConfirmPassword = $('#form-confirm-password');
        var cbxConvalidaVal = $('#form-convalida').prop('checked');

        if (!cbxConvalidaVal && txtEmail.val() === '') {
            txtEmail.addClass('input-error');
            abort = true;
        }

        if (cbxConvalidaVal && txtPhone.val() === '') {
            txtPhone.addClass('input-error');
            abort = true;
        }

        if (txtUsername.val() === '') {
            txtUsername.addClass('input-error');
            abort = true;
        }

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
            var signupData = {
                mail: txtEmail.val(),
                username: txtUsername.val(),
                password: txtPassword.val(),
                phone: txtPhone.val(),
                comunication: cbxConvalidaVal === false ? 'mail' : 'phone'
            };
            $.post('api/auth/signup', signupData, function(signupRes) {
                var loginData = {
                    username: txtUsername.val(),
                    password: txtPassword.val()
                };
                console.log('signupRes', signupRes);
                //if (cbxConvalidaVal === true && signupRes.validationInfo.phone_status !== 'success') {
                if (signupData.comunication === 'phone' && signupRes.validationInfo.status_sms !== 'success') {
                    var errorMessageSms = 'Si è verificato un errore: non è stato possibile inviare l\'SMS di convalida.';
                    if (signupRes.validationInfo.error)
                        errorMessageSms = errorMessageSms + ' ' + signupRes.validationInfo.error + '.';
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Errore',
                        closable: false,
                        message: errorMessageSms,
                        buttons: [{
                            label: 'Ok',
                            cssClass: 'btn-danger',
                            action: function(dialogItself) {
                                window.location.href = signupRes.url;
                            }
                        }]
                    });
                }
                else if (signupData.comunication === 'mail' && signupRes.validationInfo.status_mail !== 'success') {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Errore',
                        closable: false,
                        message: 'Si è verificato un errore: non è stato possibile inviare la mail di convalida.',
                        buttons: [{
                            label: 'Ok',
                            cssClass: 'btn-danger',
                            action: function(dialogItself) {
                                window.location.href = signupRes.url;
                            }
                        }]
                    });
                }
                else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Registrazione riuscita',
                        message: signupRes.message,
                        closable: false,
                        buttons: [{
                            label: 'Ok',
                            cssClass: 'btn-success',
                            action: function(dialogItself) {
                                window.location.href = signupRes.url;
                            }
                        }]
                    });
                }
            });
        }
    });

    $('#form-email, #form-phone, #form-username, #form-password, #form-confirm-password').bind("enterKey", function(e) {
        $('#btnSignup').click();
    });

    $('#form-email, #form-phone, #form-username, #form-password, #form-confirm-password').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });

    $('#form-convalida').change(function() {
        if ($(this).prop('checked')) {
            $('#form-phone').attr('placeholder', 'Cellulare');
            $('#form-email').attr('placeholder', 'Email (opzionale)');
        }
        else {
            $('#form-phone').attr('placeholder', 'Cellulare (opzionale)');
            $('#form-email').attr('placeholder', 'Email');
        }
    });
});