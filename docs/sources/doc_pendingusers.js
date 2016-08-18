/**
 * @api {all} /api/pendingusers/ Test API
 * @apiName /
 * @apiGroup pendingusers
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Pending Users API OK"
 *      }
 * 
 */
 
 /**
 * @api {get} /api/pendingusers/get-pending-users Ottiene gli utenti in attesa
 * @apiName get-pending-users
 * @apiGroup pendingusers
 * @apiPermission Utente convalidato
 * @apiDescription Ottiene la lista di tutti gli utenti in attesa di accettazione dell'utente autenticato.
 *
 * @apiSuccess {String} userId Id dell'utente in attesa.
 * @apiSuccess {String} username Username dell'utente in attesa.
 * @apiSuccess {Date} creationDate Data in cui l'utente in attesa è stato aggiunto.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {  
 *              "userId":"570e8cc9704766e65675aff6",
 *              "username":"Admin",
 *              "creationDate":"2016-04-13T23:14:42.256Z"
 *          },
 *          {
 *              "userId":"570e8cc9704741d81675aaa1",
 *              "username":"Simeone",
 *              "creationDate":"2016-04-12T22:15:31.147Z"
 *          }    
 *      ]
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 */
 
 /**
 * @api {put} /api/pendingusers/add-pending-user Aggiunge un utente in attesa
 * @apiName add-pending-user
 * @apiGroup pendingusers
 * @apiPermission Utente convalidato
 * @apiDescription Aggiunge un utente alla lista degli utenti in attesa di accettazione. 
 * 
 * @apiParam {String} contactId Id dell'utente che si vuole aggiungere agli utenti in attesa.
 * @apiParam {Boolean} [override] Flag di override. Se true allora rimuove l'utente da altre liste se presente e lo sposta in quella degli utenti bloccati. Se false e l'utente si trova in altre liste non effettua alcuna modifica.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "contactId":"570e8cc9704741d81675aaa1",
 *          "override":false
 *      } 
 *
 * @apiSuccess {String} userId Id dell'utente che è stato aggiunto alla lista degli utenti in attesa.
 * @apiSuccess {String} username Username dell'utente che è stato aggiunto alla lista degli utenti in attesa.
 * @apiSuccess {Date} creationDate Data in cui l'utente è stato aggiunto alla lista degli utenti in attesa.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      { 
 *          "userId":"570e8cc9704741d81675aaa1",
 *          "username":"Simeone",
 *          "creationDate":"2016-04-13T23:14:42.256Z"
 *      }    
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {delete} /api/pendingusers/delete-pending-user Rimuove un utente in attesa
 * @apiName delete-pending-user
 * @apiGroup pendingusers
 * @apiPermission Utente convalidato
 * @apiDescription Rimuove un utente alla lista degli utenti in attesa di accettazione.
 * 
 * @apiParam {String} contactId Id dell'utente in attesa che si vuole rimuovere.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "contactId":"570e8cc9704741d81675aaa1"
 *      } 
 *
 * @apiSuccess {String} userId Id dell'utente in attesa che è stato rimosso.
 * @apiSuccess {String} username Username dell'utente in attesa che è stato rimosso.
 * @apiSuccess {Date} creationDate Data in cui l'utente è stato aggiunto alla lista degli utenti in attesa.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      { 
 *          "userId":"570e8cc9704741d81675aaa1",
 *          "username":"Simeone",
 *          "creationDate":"2016-04-13T23:14:42.256Z"
 *      }    
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */