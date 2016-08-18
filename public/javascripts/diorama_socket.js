/*global io*/
/*global cookie*/
/*global BootstrapDialog*/

// Connessione Socket.IO
// Per l'autenticazione estrae il jwt dal cookie e lo mette nella querystring della request
var socket = io.connect('https://diorama-simeonevilardo.c9users.io/', {
    'query': 'token=' + cookie.readCookie('bearerToken')
});

// Eventi Socket.IO
socket.on('socket_error', function(err) {
    console.log(err);
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DANGER,
        title: 'Errore',
        draggable: true,
        message: 'Si è verificato un errore: ' + err.message,
        buttons: [{
            label: 'Ok',
            cssClass: 'btn-danger',
            action: function(dialogItself) {
                dialogItself.close();
            }
        }]
    });
});