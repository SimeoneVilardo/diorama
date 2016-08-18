/**
 * @apiDefine MissingParametersError
 *
 * @apiError BadRequest La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "message":"La richiesta non ha fornito tutti i parametri obbligatori",
 *          "statusCode":400
 *      }
 */

/**
 * @apiDefine MustBeAuthenticatedError
 *
 * @apiError Unauthorized L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message":"Utente non autenticato",
 *          "statusCode":401
 *      }
 */
 
 /**
 * @apiDefine MustBeValidatedError
 *
 * @apiError Unauthorized L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente deve aver convalidato il suo account.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message":"Utente non convalidato",
 *          "statusCode":401
 *      }
 */
 
 /**
 * @apiDefine WrongPasswordError
 *
 * @apiError Unauthorized Password errata. Questo errore può essere causato dall'utente nel caso in cui esso inserisca una password errata.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message":"Password errata",
 *          "statusCode":401
 *      }
 */
 
 /**
 * @apiDefine MustBeGroupAdminError
 *
 * @apiError Unauthorized L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente deve essere un admin del gruppo per poterlo modificare.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message":"L'utente non dispone dei permessi per modificare il gruppo",
 *          "statusCode":401
 *      }
 */
 
 /**
 * @apiDefine MustNotBeValidatedError
 *
 * @apiError Unauthorized L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente non deve essere convalidato.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message":"L'utente non deve essere convalidato",
 *          "statusCode":401
 *      }
 */
 
 /**
 * @apiDefine MustNotBeAuthenticatedError
 *
 * @apiError Unauthorized L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente non deve essere autenticato.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *          "message":"L'utente non deve essere autenticato",
 *          "statusCode":401
 *      }
 */
 
/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFound La risorsa richiesta non è stata trovata.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 NotFound
 *      {
 *          "message":"La risorsa richiesta non è stata trovata",
 *          "statusCode":404
 *      }
 */