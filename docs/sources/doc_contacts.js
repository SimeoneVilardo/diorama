/**
 * @api {all} /api/contacts/ Test API
 * @apiName /
 * @apiGroup contacts
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message":"Diorama Contacts API OK"
 *      }
 */
 
 /**
 * @api {get} /api/contacts/get-contacts Ottiene i contatti
 * @apiName get-contacts
 * @apiGroup contacts
 * @apiPermission Utente convalidato
 * @apiDescription Ottiene la lista di tutti i contatti dell'utente autenticato.
 *
 * @apiSuccess {String} userId Id del contatto.
 * @apiSuccess {String} username Username del contatto.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato aggiunto.
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
 * @api {put} /api/contacts/add-contact Aggiunge un contatto
 * @apiName add-contact
 * @apiGroup contacts
 * @apiPermission Utente convalidato
 * @apiDescription Aggiunge un utente alla lista dei contatti dell'utente autenticato.
 * 
 * @apiParam {String} contactId Id dell'utente che si vuole aggiungere.
 * @apiParam {Boolean} [override] Flag di override. Se true allora rimuove l'utente da altre liste se presente e lo sposta in quella dei contatti. Se false ed l'utente si trova in altre liste non effettua alcuna modifica.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "contactId":"570e8cc9704741d81675aaa1",
 *          "override":false
 *      } 
 *
 * @apiSuccess {String} userId Id del contatto che è stato aggiunto.
 * @apiSuccess {String} username Username del contatto che è stato aggiunto.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato aggiunto.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "userId":"570e8cc9704741d81675aaa1",
 *          "username":"Simeone",
 *          "creationDate":"2016-04-12T22:15:31.147Z"
 *      }
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {delete} /api/contacts/remove-contact Rimuove un contatto
 * @apiName remove-contact
 * @apiGroup contacts
 * @apiPermission Utente convalidato
 * @apiDescription Rimuove un contatto dalla lista dei contatti dell'utente autenticato.
 * 
 * @apiParam {String} contactId Id dell'utente che si vuole rimuovere.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "contactId":"570e8cc9704741d81675aaa1"
 *      } 
 *
 * @apiSuccess {String} userId Id del contatto che è stato rimosso.
 * @apiSuccess {String} username Username del contatto che è stato rimosso.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato rimosso.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "userId":"570e8cc9704741d81675aaa1",
 *          "username":"Simeone",
 *          "creationDate":"2016-04-12T22:15:31.147Z"
 *      }    
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */