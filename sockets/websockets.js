var config = require('../config.js');
var socketioJwt = require("socketio-jwt");
var usersHelper = require('../helpers/users-helper.js');
var socketHelper = require('../helpers/socket-helper.js');
var socketUsersHelper = require('../helpers/socket-users-helper.js');

module.exports = function(io) {
    io.use(socketioJwt.authorize({
        secret: config.security.jwt_secret,
        handshake: true
    }));

    io.on('connection', function(socket) {
        socketHelper.addSocket(socket);
        socket.on('chat_message', function(msg) {
            // Ottiene il mittende dall'id della socket che ha inviato il messaggio
            var sender = socketHelper.getUserBySocketId(socket.id);
            // Ottiene il destinatario, che può essere un utente o un gruppo, tramite il suo id
            // Specifica nel campo "type" il tipo di destinatario, e nel campo "recipient" l'oggetto destinatario
            usersHelper.getRecipientById(sender.id, msg.recipientId).then(function(recipient) {
                if (recipient) {
                    var message = {
                        senderId: sender.id,
                        senderName: sender.username,
                        recipientId: recipient.recipient._id,
                        recipientName: (recipient.recipient.username) ? (recipient.recipient.username) : (recipient.recipient.groupName),
                        body: msg.body,
                        attachments: msg.attachments
                    };
                    if (recipient.type === 'user')
                        return socketUsersHelper.sendMessageToUser(sender, recipient.recipient, message);
                    else
                        return socketUsersHelper.sendMessageToGroup(sender, recipient.recipient, message);
                }
            });
        });

        socket.on('error', function(err) {
            // Wrappo l'errore in un oggetto con la stessa proprietà "message" perchè per motivi a me sconosciuti (forse la proprietà è privata?) se invio l'oggetto "err" su client
            // questo arriva vuoto
            socket.emit('socket_error', {
                message: err.message
            });
        });
    });
};