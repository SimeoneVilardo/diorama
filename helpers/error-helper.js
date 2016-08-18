var errorHelper = {};

errorHelper.unauthorizedException = function(message) {
    if(!message)
        message = 'Permesso negato';
    var err = new Error(message);
    err.status = 401;
    return err;
};

errorHelper.forbiddenException = function(message) {
    if(!message)
        message = 'L\'operazione è stata rifiutata dal server';
    var err = new Error(message);
    err.status = 403;
    return err;
};

errorHelper.badRequestException = function(message) {
    if(!message)
        message = 'La richiesta non ha fornito tutti i parametri obbligatori';
    var err = new Error(message);
    err.status = 400;
    return err;
};

errorHelper.resourceNotFoundException = function(message) {
    if(!message)
        message = 'La risorsa richiesta non è stata trovata';
    var err = new Error(message);
    err.status = 404;
    return err;
};

errorHelper.unknownException = function(message) {
    if(!message)
        message = 'Errore sconosciuto';
    var err = new Error(message);
    err.status = 500;
    return err;
};

errorHelper.comunicationNotFoundException = function() {
    return errorHelper.unknownException('Non è stato trovato nessun tipo di comunicazione (cellulare o mail). Questo potrebbe essere un grave problema!');
};

module.exports = errorHelper;