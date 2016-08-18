/**
 * @api {all} /api/authentication/ Test API
 * @apiName /
 * @apiGroup authentication
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Authentication API OK"
 *      }
 */
 
 /**
 * @api {post} /api/authentication/signup Registra un utente
 * @apiName signup
 * @apiGroup authentication
 * @apiPermission Utente non autenticato
 * @apiDescription Registra un nuovo utente nel database.
 *
 * @apiParam {String} username Nome dell'utente.
 * @apiParam {String} password Password dell'utente.
 * @apiParam {String} comunication Tipo di comunicazione scelta dall'utente. Può essere "phone" o "mail".
 * @apiParam {String} [mail] Indirizzo email dell'utente.
 * @apiParam {Number} [phone] Numero di cellulare dell'utente.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "username":"Simeone",
 *          "password":"xxx123##",
 *          "comunication":"mail",
 *          "mail":"simeone.vilardo@gmail.com"
 *      } 
 *
 * @apiSuccess {String} username Username dell'utente creato.
 * @apiSuccess {String} url Indirizzo di redirect.
 * @apiSuccess {String} message Messaggio che è possibile mostrare in caso di esito positivo. Può variare a seconda del tipo di comunicazione scelto.
 * @apiSuccess {Object} validationInfo Esito dell'invio del messaggio registrazione.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "username":"Simeone",
 *          "url":"https://diorama-simeonevilardo.c9users.io",
 *          "message":"Per convalidare il tuo account devi cliccare sul link di verifica che ti è stato inviato via mail.",
 *          "validationInfo":{"status":"success"}
 *      }
 * 
 * @apiError BadRequest Richiesta non valida. Questo errore può essere causato nel caso in cui non vi siano tutti i parametri obbligatori nella richiesta oppure nel caso in cui l'indirizzo email o il numero di telefono non siano validi.
 * @apiError Unauthorized L'utente non dispone dei permessi per effettuare l'operazione richiesta.
 * @apiError Forbidden Non è stato possibile eseguire l'operazione a causa di vincoli sul database. Questo errore può essere causato dall'utente nel caso in cui esso inserisca un username, un numero di telefono o un indirizzo email già registrato.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "message":"Indirizzo email non valido",
 *          "statusCode":400
 *      }
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "message":"Numero di telefono non valido",
 *          "statusCode":400
 *      }
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden
 *      {
 *          "message":"Si è verificato un errore: Un utente con lo stesso campo mail è già registrato nel database.",
 *          "statusCode":403
 *      }
 * 
 * @apiUse MissingParametersError
 * @apiUse MustNotBeAuthenticatedError
 */
 
 /**
 * @api {post} /api/authentication/login Autentica un utente
 * @apiName login
 * @apiGroup authentication
 * @apiPermission Utente non autenticato
 * @apiDescription Autentica un utente verificando la corrispondenza di username e password.
 *
 * @apiParam {String} username Nome dell'utente.
 * @apiParam {String} password Password dell'utente.
 * @apiParamExample {json} Request-Example:
 *      {
 *          "username": "Simeone",
 *          "password": "xxx123##"
 *      }
 *
 * @apiSuccess {String} token Token di autenticazione.
 * @apiSuccess {String} url Indirizzo di redirect.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Zjk1ZTM0MmRiOWQ1NTQwODliMDkzYyIsImV4cCI6MTQ1OTYxNTAxMCwiaXNzIjoiaHR0cHM6Ly9kaW9yYW1hLWRldi1zaW1lb25ldmlsYXJkby0xLmM5dXNlcnMuaW8iLCJ1c2VybmFtZSI6ImEiLCJtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTQ1OTUyODYxMH0.n_nvXxuKgANw0Yz22cGvWG7sVm4R-izc9r6buz3SRKU",
 *          "url": "https://diorama-simeonevilardo.c9users.io"
 *      }
 *
 * @apiUse MissingParametersError
 * @apiUse MustNotBeAuthenticatedError
 * 
 * @apiError Forbidden L'username e/o la password non corrispondono a nessun account registrato su database. Questo errore può essere causato dall'utente nel caso in cui esso inserisca una password o un username errato.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden
 *      {
 *          "message": "Username o password errati",
 *          "statusCode": 403
 *      }
 */
 
 /**
 * @api {post} /api/authentication/logout Disconnette un utente
 * @apiName logout
 * @apiGroup authentication
 * @apiPermission Utente autenticato
 * @apiDescription Disconnette un utente disabilitando il suo token di autenticazione.
 *
 * @apiSuccess {String} url Indirizzo di redirect.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "url": "https://diorama-simeonevilardo.c9users.io"
 *      }
 *
 * @apiUse MustBeAuthenticatedError
 */
 
 /**
 * @api {get} /api/authentication/send-validation Invia messaggio di convalida
 * @apiName send-validation
 * @apiGroup authentication
 * @apiPermission Utente autenticato ma non convalidato
 * @apiDescription Aggiorna il token di convalida di un utente. Imposta la scadenza del nuovo token a 24 ore dal momento della chiamata. Invia un messaggio di convalida all'utente. Il messaggio può essere una mail o un sms a seconda del tipo di comunicazione specificato dall'utente.
 *
 * @apiSuccess {Object} validationInfo Informazioni sull'esito dell'invio del messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "validationInfo":{"status":"success"}
 *      }
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustNotBeValidatedError
 */
 
 /**
 * @api {get} /api/authentication/recover-username Recupera username
 * @apiName recover-username
 * @apiGroup authentication
 * @apiPermission Utente non autenticato
 * @apiDescription Invia un messaggio contenente l'username dell'utente. Il messaggio può essere una mail o un sms a seconda del tipo di comunicazione specificato dall'utente.
 * 
 * @apiParam {String} login Indirizzo email o numero di telefono dell'utente.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "login":"simeone.vilardo@gmail.com"
 *      } 
 *
 * @apiSuccess {Object} validationInfo Informazioni sull'esito dell'invio del messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "validationInfo":{"status":"success"}
 *      }
 * 
 * @apiUse MustNotBeAuthenticatedError
 * @apiUse MissingParametersError
 * @apiUse NotFoundError
 */
 
 /**
 * @api {put} /api/authentication/change-mail Cambia email
 * @apiName change-mail
 * @apiGroup authentication
 * @apiPermission Utente autenticato
 * @apiDescription Modifica l'indirizzo email relativo all'account dell'utente autenticato.
 * 
 * @apiParam {String} mail Nuovo indirizzo email.
 * @apiParam {String} password Password dell'utente.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "mail":"simeone.vilardo@gmail.com",
 *          "password":"xxx123##"
 *      } 
 *
 * @apiSuccess {Number} ok Esito dell'operazione (0/1).
 * @apiSuccess {Number} nModified Numero di righe modificate.
 * @apiSuccess {Number} n Numero di righe sulle quali si è tentano di effettuare l'update.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "ok":1,
 *          "nModified":1,
 *          "n":1
 *      }
 * 
 * @apiUse MissingParametersError
 * @apiUse WrongPasswordError
 * @apiUse NotFoundError
 */
 
  /**
 * @api {put} /api/authentication/change-phone Cambia numero di telefono
 * @apiName change-phone
 * @apiGroup authentication
 * @apiPermission Utente autenticato
 * @apiDescription Modifica il numero di telefono relativo all'account dell'utente autenticato.
 * 
 * @apiParam {Number} phone Nuovo numero di telefono.
 * @apiParam {String} password Password dell'utente.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "phone":"3401234567",
 *          "password":"xxx123##"
 *      } 
 *
 * @apiSuccess {Number} ok Esito dell'operazione (0/1).
 * @apiSuccess {Number} nModified Numero di righe modificate.
 * @apiSuccess {Number} n Numero di righe sulle quali si è tentano di effettuare l'update.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "ok":1,
 *          "nModified":1,
 *          "n":1
 *      }
 * 
 * @apiUse MissingParametersError
 * @apiUse WrongPasswordError
 * @apiUse NotFoundError
 */
 
 /**
 * @api {get} /api/authentication/request-reset-password Richiesta reset password
 * @apiName request-reset-password
 * @apiGroup authentication
 * @apiPermission Nessuno
 * @apiDescription Richiede il reset della password. Invia un messaggio all'utente che ha richiesto il reset. Il messaggio può essere una mail o un sms a seconda del tipo di comunicazione specificato dall'utente.
 * 
 * @apiParam {String} login Indirizzo email, numero di telefono o username dell'utente.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "login":"Simeone"
 *      } 
 *
 * @apiSuccess {Object} validationInfo Informazioni sull'esito del messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "validationInfo":{"status":"success"}
 *      }
 * 
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {put} /api/authentication/reset-password Reset password
 * @apiName reset-password
 * @apiGroup authentication
 * @apiPermission Nessuno
 * @apiDescription Resetta la password dell'utente che ha cliccato sul pulsante di reset nella mail che ha ricevuto dopo aver fatto richiesta di reset password.
 * 
 * @apiParam {String} token Token di reset password.
 * @apiParam {String} password Nuova password dell'utente.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "token":"d4ddc53f3ce34a198203eb605c7199c3184f0f7a44464b97a21fb8a1c439f113",
 *          "password":"xxx123##"
 *      } 
 *
 * @apiSuccess {Number} ok Esito dell'operazione (0/1).
 * @apiSuccess {Number} nModified Numero di righe modificate.
 * @apiSuccess {Number} n Numero di righe sulle quali si è tentano di effettuare l'update.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "ok":1,
 *          "nModified":1,
 *          "n":1
 *      }
 * 
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {put} /api/authentication/change-password Cambia password
 * @apiName change-password
 * @apiGroup authentication
 * @apiPermission Utente autenticato
 * @apiDescription Modifica la password dell'utente autenticato.
 * 
 * @apiParam {String} olfPassword Password attuale che si vuole modificare.
 * @apiParam {String} newPassword Nuova password.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "token":"d4ddc53f3ce34a198203eb605c7199c3184f0f7a44464b97a21fb8a1c439f113",
 *          "password":"xxx123##"
 *      } 
 *
 * @apiSuccess {Number} ok Esito dell'operazione (0/1).
 * @apiSuccess {Number} nModified Numero di righe modificate.
 * @apiSuccess {Number} n Numero di righe sulle quali si è tentano di effettuare l'update.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "ok":1,
 *          "nModified":1,
 *          "n":1
 *      }
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MissingParametersError
 * @apiUse WrongPasswordError
 */