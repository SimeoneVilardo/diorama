/**
 * @api {all} /api/groups/ Test API
 * @apiName /
 * @apiGroup groups
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Groups API OK"
 *      }
 */
 
 /**
 * @api {post} /api/groups/create-group Crea un nuovo gruppo
 * @apiName create-group
 * @apiGroup groups
 * @apiPermission Utente convalidato
 * @apiDescription Crea un nuovo gruppo nel database. Registra nel gruppo la lista di tutti gli utenti che ne fanno parte ed i loro permessi. Aggiunge alla lista dei gruppi di ogni utente il nuovo gruppo.
 * 
 * @apiParam {String} groupName Nome del gruppo.
 * @apiParam {Array} contacts Lista degli utenti che si vogliono aggiungere al gruppo. Non si deve inserire l'utente autenticato che sta creando il gruppo.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "groupName":"Classe 5E",
 *          "contacts":[
 *              {
 *                  "userId":"570e8cc9704741d81675aaa1",
 *                  "username":"Admin",
 *                  "admin":"true"
 *              },
 *              {
 *                  "userId":"570e8ab1253783f81675acd3",
 *                  "username":"TestUser",
 *                  "admin":"false"
 *              }
 *          ]
 *      } 
 *
 * @apiSuccess {String} groupName Nome del gruppo.
 * @apiSuccess {Object} creator Dati dell'utente che ha creato il gruppo.
 * @apiSuccess {Array} users Lista degli utenti che fanno parte del gruppo.
 * @apiSuccess {Date} creationDate Data nella quale è stato creato il gruppo.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "_id:":"570e8cc9704741d81513bdf2",
 *          "groupName":"Classe 5E",
 *          "creator":{
 *              "userId":"570e8cc9704741d81675aaa1",
 *              "username":"Simeone"
 *          },
 *          "users":[
 *              {
 *                  "userId":"570e8cc9704741d81675aaa1",
 *                  "username":"Admin",
 *                  "admin":"true"
 *              },
 *              {
 *                  "userId":"570e8ab1253783f81675acd3",
 *                  "username":"TestUser",
 *                  "admin":"false"
 *              }
 *          ],
 *          "creationDate":"2016-04-12T22:15:31.147Z"
 *      }
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {get} /api/groups/get-groups Ottiene i gruppi
 * @apiName get-groups
 * @apiGroup groups
 * @apiPermission Utente convalidato
 * @apiDescription Ottiene la lista di tutti i gruppi dell'utente autenticato.
 *
 * @apiSuccess {String} groupId Id del gruppo.
 * @apiSuccess {String} groupName Nome del gruppo.
 * @apiSuccess {Date} creationDate Data in cui il gruppo è stato aggiunto.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {  
 *              "groupId":"570e8cc9704741d81513bdf2",
 *              "groupName":"Classe 5E",
 *              "creationDate":"2016-04-13T23:14:42.256Z"
 *          },
 *          {
 *              "groupId":"570e8cc9704741d81513bdf2",
 *              "groupName":"GruppoBello",
 *              "creationDate":"2016-04-12T22:15:31.147Z"
 *          }    
 *      ]
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 */
 
 /**
 * @api {put} /api/groups/add-user Aggiungi utente
 * @apiName add-user
 * @apiGroup groups
 * @apiPermission Utente convalidato admin del gruppo
 * @apiDescription Aggiunge un nuovo utente ad un gruppo esistente.
 * 
 * @apiParam {String} groupId Id del gruppo che si vuole modificare.
 * @apiParam {Object} user Utente che si vuole aggiungere.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "groupId":"570e8cc9704741d81675aaa1",
 *          "user":{
 *                 "userId":"570e8cc9704741d81513bdf2",
 *                 "username":"Simeone",
 *                 "admin":false
 *          }
 *      } 
 *
 * @apiSuccess {String} userId Id dell'utente che è stato aggiunto al gruppo.
 * @apiSuccess {String} username Username dell'utente che è stato aggiunto al gruppo.
 * @apiSuccess {Boolean} admin Flag che indica se l'utente che è stato aggiunto al gruppo ha i permessi di modificarlo.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      { 
 *          "userId":"570e8cc9704741d81513bdf2",
 *          "username":"Simeone",
 *          "admin":false
 *      } 
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MustBeGroupAdminError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {delete} /api/groups/remove-user Rimuovi utente
 * @apiName remove-user
 * @apiGroup groups
 * @apiPermission Utente convalidato admin del gruppo
 * @apiDescription Rimuove un nuovo utente da un gruppo esistente.
 * 
 * @apiParam {String} groupId Id del gruppo che si vuole modificare.
 * @apiParam {String} userId Utente che si vuole modificare.
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "groupId":"570e8cc9704741d81675aaa1",
 *          "userId":"570e8cc9704741d81513bdf2"
 *      } 
 *
 * @apiSuccess {String} userId Id dell'utente che è stato rimosso dal gruppo.
 * @apiSuccess {String} username Username dell'utente che è stato rimosso dal gruppo.
 * @apiSuccess {Boolean} admin Flag che indica se l'utente che è stato rimosso dal gruppo aveva i permessi di modificarlo.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      { 
 *          "userId":"570e8cc9704741d81513bdf2",
 *          "username":"Simeone",
 *          "admin":false
 *      } 
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MustBeGroupAdminError
 * @apiUse MissingParametersError
 */