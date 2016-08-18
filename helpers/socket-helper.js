var socketHelper = {};

var onlineUsers = {};

socketHelper.addSocket = function(socket) {
    // Ottiene l'utente dalla socket che ha decodifcato il jwt
    var user = socket.decoded_token;
    // Dopo averlo estratto, lo elimina perchè mantenere i suoi dati (che sono sempre uguali) in ogni socket sarebbe uno spreco di memoria
    delete socket.decoded_token;
    // Se l'utente non esiste nell'array degli utenti online
    if (!onlineUsers[user.id]) {
        // La socket viene inserita in un array di socket all'interno dell'oggetto user
        user.sockets = [socket];
        // L'oggetto user viene inserito all'interno dell'Array associativo usando per index il suo id
        onlineUsers[user.id] = user;
    }
    else {
        // Se l'utente era nell'array, la nuova socket viene semplicemente aggiunta all'array di socket dell'utente
        onlineUsers[user.id].sockets.push(socket);
    }
};

socketHelper.sendSocketMessage = function(userId, message, eventName) {
    // Se non viene specificato nessun evento specifico viene impostato quello di default
    if (!eventName)
        eventName = 'chat_message';
    // L'invio del messaggio avviene solo se l'utente è online, cioè se esiste con almeno una socket nell'array degli utenti online
    if (socketHelper.isOnline(userId)) {
        // Cicla tutte le socket dell'utente, perchè potrebbe essere collegato con più client
        for (var i = 0; i < onlineUsers[userId].sockets.length; i++) {
            onlineUsers[userId].sockets[i].emit(eventName, message);
        }
    }
};

socketHelper.getUserBySocketId = function(socketId) {
    var userId = socketHelper.getUserIdBySocketId(socketId);
    return socketHelper.getUserById(userId);
};

socketHelper.getUserIdBySocketId = function(socketId) {
    for (var userId in onlineUsers) {
        for (var i = 0; i < onlineUsers[userId].sockets.length; i++) {
            if (onlineUsers[userId].sockets[i].id === socketId) {
                return userId;
            }
        }
    }
};

socketHelper.isOnline = function(userId) {
    return onlineUsers[userId] && onlineUsers[userId].sockets && onlineUsers[userId].sockets.length > 0;
};

socketHelper.getUserById = function(userId) {
    return onlineUsers[userId];
};

socketHelper.findUserIdBySocketId = function(socketId) {
    for (var userId in onlineUsers) {
        for (var i = 0; i < onlineUsers[userId].sockets.length; i++) {
            if (onlineUsers[userId].sockets[i].id === socketId) {
                return userId;
            }
        }
    }
};

module.exports = socketHelper;