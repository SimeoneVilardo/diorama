/**
 * @api {all} /api/users/ Test API
 * @apiName /
 * @apiGroup users
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Users API OK"
 *      }
 * 
 */
 
 /**
 * @api {get} /api/users/get-user-by-username Ottiene un utente dato il suo username
 * @apiName get-user-by-username
 * @apiGroup users
 * @apiPermission Utente autenticato
 * @apiDescription Ritorna le informazioni richieste dell'utente con l'username specificato.
 * 
 * @apiParam {String} username Username dell'utente.
 * @apiParam {String} [fields] Campi dell'utente da estrarre dal database.
 * @apiParamExample {json} Request-Example:
 * {
 *     "username": "Simeone",
 *     "fields": "username mail contacts"
 * }
 *
 * @apiSuccess {String} _id Id dell'utente.
 * @apiSuccess {String} username Username dell'utente.
 * @apiSuccess {String} mail Indirizzo email dell'utente.
 * @apiSuccess {String} contacts Lista dei contatti dell'utente.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "56ff0af75f7cfe74ab8518b6",
 *       "username": "Simeone",
 *       "mail": "simeone.vilardo@gmail.com",
 *       "contacts": []
 *     }
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse NotFoundError
 * @apiUse MissingParametersError
 */
 
  /**
 * @api {get} /api/users/get-user-by-id Ottiene un utente dato il suo id
 * @apiName get-user-by-id
 * @apiGroup users
 * @apiPermission Utente autenticato
 * @apiDescription Ritorna le informazioni richieste dell'utente con l'id specificato.
 * 
 * @apiParam {String} userId Id dell'utente.
 * @apiParam {String} [fields] Campi dell'utente da estrarre dal database.
 * @apiParamExample {json} Request-Example:
 * {
 *     "userId": "56ff0af75f7cfe74ab8518b6",
 *     "fields": "username mail contacts"
 * }
 *
 * @apiSuccess {String} _id Id dell'utente.
 * @apiSuccess {String} username Username dell'utente.
 * @apiSuccess {String} mail Indirizzo email dell'utente.
 * @apiSuccess {String} contacts Lista dei contatti dell'utente.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "56ff0af75f7cfe74ab8518b6",
 *       "username": "Simeone",
 *       "mail": "simeone.vilardo@gmail.com",
 *       "contacts": []
 *     }
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse NotFoundError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {get} /api/users/get-users-by-username Ottiene gli utenti dato un username
 * @apiName get-users-by-username
 * @apiGroup users
 * @apiPermission Utente autenticato
 * @apiDescription Ritorna le informazioni richieste di tutti gli utenti il cui username comprende o corrisponde all'username fornito.
 * 
 * @apiParam {String} username Username dell'utente o parte di esso.
 * @apiParam {String} [fields] Campi dell'utente da estrarre dal database.
 * @apiParamExample {json} Request-Example:
 * {
 *     "username": "A",
 *     "fields": "username mail contacts"
 * }
 *
 * @apiSuccess {String} _id Id dell'utente.
 * @apiSuccess {String} username Username dell'utente.
 * @apiSuccess {String} mail Indirizzo email dell'utente.
 * @apiSuccess {String} contacts Lista dei contatti dell'utente.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {  
 *              "_id": "56ff0af75f7cfe74ab8518b6",
 *              "username": "Annie",
 *              "mail": "annie.edison@gmail.com",
 *              "contacts": []
 *          },
 *          {
 *              "_id": "56ff0af75f7cfe74ab8518b7",
 *              "username": "Admin",
 *              "mail": "admin.admin@gmail.com",
 *              "contacts": []
 *          }    
 *      ]
 * 
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {get} /api/users/get-unknown-users-by-username Ottiene gli utenti sconosciuti dato un username
 * @apiName get-users-by-username
 * @apiGroup users
 * @apiPermission Utente autenticato
 * @apiDescription Ritorna le informazioni base di tutti gli utenti che non sono presenti nelle liste dell'utente autenticato ed il cui username comprende o corrisponde all'username fornito.
 * 
 * @apiParam {String} username Username dell'utente o parte di esso.
 * @apiParamExample {json} Request-Example:
 * {
 *     "username": "A"
 * }
 *
 * @apiSuccess {String} _id Id dell'utente.
 * @apiSuccess {String} username Username dell'utente.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {  
 *              "_id": "56ff0af75f7cfe74ab8518b6",
 *              "username": "Annie"
 *          },
 *          {
 *              "_id": "56ff0af75f7cfe74ab8518b7",
 *              "username": "Admin"
 *          }    
 *      ]
 * 
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse MissingParametersError
 */
 
  /**
 * @api {get} /api/users/get-users-and-contacts-and-groups Ottiene utenti contatti e gruppo
 * @apiName get-users-and-contacts-and-groups
 * @apiGroup users
 * @apiPermission Utente autenticato
 * @apiDescription Ritorna le liste dei contatti, degli utenti in attesa, degli utenti bloccati e dei gruppi dell'utente autenticato.
 *
 * @apiSuccess {String} _id Id dell'utente.
 * @apiSuccess {Object} groups Gruppi nella lista dell'utente.
 * @apiSuccess {Object} pendingUsers Utenti in attesa nella lista dell'utente.
 * @apiSuccess {Object} blockedUsers Utenti bloccati nella lista dell'utente.
 * @apiSuccess {Object} contacts Contatti nella lista dell'utente.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_id":"5712bed620949b996096bb38",
 *          "groups":[
 *              {
 *                  "groupId":"57135d09966f501b2e0490f1",
 *                  "groupName":"Classe 5E",
 *                  "admin":true,
 *                  "creationDate":"2016-04-17T09:53:13.567Z"
 *              },
 *              {
 *                  "groupId":"5715431edecc25ba2c0dece9",
 *                  "groupName":"GruppoBello",
 *                  "admin":true,
 *                  "creationDate":"2016-04-18T20:27:10.484Z"
 *              }
 *          ],
 *          "pendingUsers":[
 *              {
 *                  "userId":"5712bed620949b996096bb39",
 *                  "username":"Admin",
 *                  "creationDate":"2016-04-17T09:53:04.588Z"
 *              }
 *          ],
 *          "blockedUsers":[
 *              {
 *                  "userId":"5712bed620949b996096bb3a",
 *                  "username":"Simeone",
 *                  "creationDate":"2016-04-17T09:53:04.588Z"
 *              }
 *          ],
 *          "contacts":[
 *              {
 *                  "userId":"5712bed620949b996096bb3b",
 *                  "username":"TestUser",
 *                  "creationDate":"2016-04-17T09:53:04.588Z"
 *              }
 *          ]
 *      }
 * 
 * @apiUse MustBeAuthenticatedError
 */