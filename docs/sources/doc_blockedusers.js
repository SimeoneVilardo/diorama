/**
 * @api {all} /api/blockedusers/ Test API
 * @apiName /
 * @apiGroup blockedusers
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Blocked Users API OK"
 *      }
 * 
 */
 
 /**
 * @api {get} /api/blockedusers/get-blocked-users Ottiene gli utenti bloccati
 * @apiName get-blocked-users
 * @apiGroup blockedusers
 * @apiPermission Utente convalidato
 * @apiDescription Ottiene la lista di tutti gli utenti bloccati dell'utente autenticato.
 *
 * @apiSuccess {String} userId Id dell'utente bloccato.
 * @apiSuccess {String} username Username dell'utente bloccato.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato bloccato.
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
 * @api {put} /api/blockedusers/add-blocked-user Blocca un utente
 * @apiName add-blocked-user
 * @apiGroup blockedusers
 * @apiPermission Utente convalidato
 * @apiDescription Blocca un utente aggiungendolo alla lista degli utenti bloccati. 
 * 
 * @apiParam {String} contactId Id dell'utente che si vuole bloccare.
 * @apiParam {Boolean} [override] Flag di override. Se true allora rimuove l'utente da altre liste se presente e lo sposta in quella degli utenti bloccati. Se false e l'utente si trova in altre liste non effettua alcuna modifica.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "contactId":"570e8cc9704741d81675aaa1",
 *          "override":false
 *      } 
 *
 * @apiSuccess {String} userId Id dell'utente che è stato bloccato.
 * @apiSuccess {String} username Username dell'utente che è stato bloccato.
 * @apiSuccess {Date} creationDate Data in cui l'utente è stato bloccato.
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
 * @api {delete} /api/blockedusers/remove-blocked-user Rimuove un utente bloccato
 * @apiName remove-blocked-user
 * @apiGroup blockedusers
 * @apiPermission Utente convalidato
 * @apiDescription Rimuove un utente dalla lista degli utenti bloccati dell'utente autenticato.
 * 
 * @apiParam {String} contactId Id dell'utente bloccato che si vuole rimuovere.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "contactId":"570e8cc9704741d81675aaa1"
 *      } 
 *
 * @apiSuccess {String} userId Id dell'utente bloccato che è stato rimosso.
 * @apiSuccess {String} username Username dell'utente bloccato che è stato rimosso.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato bloccato.
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