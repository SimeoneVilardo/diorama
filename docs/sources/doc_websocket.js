/**
 * @api {websocket in} 'chat_message' Invia un messaggio
 * @apiName chat_message_in
 * @apiGroup websocket
 * @apiPermission Utente convalidato
 * 
 * @apiParam {String} recipientId Id del destinatario.
 * @apiParam {String} body Testo del messaggio.
 * @apiParam {String} [attachments] Allegati al messaggio.
 * 
 * @apiParamExample {json} Request-Example:
 *      {
 *          "recipientId":"570e8cc9704741d81675aaa1",
 *          "recipientName":"Simeone",
 *          "body":"Ciao!",
 *          "attachments":[
 *              {
 *                  "fileName":"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c",
 *                  "originalFileName":"documento.pdf",
 *                  "mime":"application/pdf"
 *              }
 *          ]
 *      }
 */

/**
 * @api {websocket out} 'chat_message' Riceve un messaggio
 * @apiName chat_message_out
 * @apiGroup websocket
 * @apiPermission Utente convalidato
 * 
 * @apiSuccess {String} _id Id del messaggio.
 * @apiSuccess {String} senderId Id del mittente.
 * @apiSuccess {String} senderName Username del mittente.
 * @apiSuccess {String} recipientId Id del destinatario.
 * @apiSuccess {String} recipientName Username del destinatario.
 * @apiSuccess {Date} date Data dell'arrivo del messaggio su server.
 * @apiSuccess {Boolean} seen Flag che identifica se il messaggio è stato scaricato dal destinatario.
 * @apiSuccess {String} body Testo del messaggio.
 * @apiSuccess {Array} attachments Allegati al messaggio.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "_id":"56f95f5e2db9d554089b0947",
 *          "senderId":"570e8cc9704766e65675aff6",
 *          "senderName":"Admin",
 *          "recipientId":"570e8cc9704741d81675aaa1",
 *          "recipientName":"Simeone",
 *          "date":"2016-04-12T22:18:23.147Z",
 *          "seen":"false",
 *          "body":"Ciao!",
 *          "attachments":[
 *              {
 *                  "fileName":"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c",
 *                  "originalFileName":"documento.pdf",
 *                  "mime":"application/pdf"
 *              }
 *          ]
 *      }
 */
 
 /**
 * @api {websocket out} 'socket_error' Errore nella socket
 * @apiName socket_error
 * @apiDescription Un errore si è verificato sul server mentre stava operando in un evento che gestisce la socket corrente
 * @apiGroup websocket
 * @apiSuccessExample Response:
 * {
 *    "message": "errore"
 * }
 */
 
 /**
 * @api {websocket out} 'new_contact' Nuovo contatto
 * @apiName new_contact
 * @apiDescription Un nuovo contatto è stato appena aggiunto alla lista dei contatti dell'utente autenticato.
 * @apiGroup websocket
 * 
 * @apiSuccess {String} userId Id del contatto che è stato aggiunto.
 * @apiSuccess {String} username Username del contatto che è stato aggiunto.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato aggiunto.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "userId": "56f95f5e2db9d554089b0947",
 *          "username":"Admin",
 *          "creationDate":"2016-04-12T22:18:23.147Z",
 *      }
 */
 
  /**
 * @api {websocket out} 'removed_contact' Contatto rimosso
 * @apiName removed_contact
 * @apiDescription Un contatto è stato appena rimosso alla lista dei contatti dell'utente autenticato.
 * @apiGroup websocket
 * 
 * @apiSuccess {String} userId Id del contatto che è stato rimosso.
 * @apiSuccess {String} username Username del contatto che è stato rimosso.
 * @apiSuccess {Date} creationDate Data in cui il contatto è stato aggiunto.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "userId": "56f95f5e2db9d554089b0947",
 *          "username":"Admin",
 *          "creationDate":"2016-04-12T22:18:23.147Z",
 *      }
 */
 
 /**
 * @api {websocket out} 'new_pending_user' Nuovo utente in attesa
 * @apiName new_pending_user
 * @apiDescription Un nuovo utente in attesa è stato appena aggiunto alla lista degli utenti in attesa dell'utente autenticato.
 * @apiGroup websocket
 * 
 * @apiSuccess {String} userId Id dell'utente in attesa che è stato aggiunto.
 * @apiSuccess {String} username Username dell'utente in attesa che è stato aggiunto.
 * @apiSuccess {Date} creationDate Data in cui l'utente in attesa è stato aggiunto.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "userId": "56f95f5e2db9d554089b0947",
 *          "username":"Admin",
 *          "creationDate":"2016-04-12T22:18:23.147Z",
 *      }
 */
 
  /**
 * @api {websocket out} 'removed_pending_user' Utente in attesa rimosso
 * @apiName removed_pending_user
 * @apiDescription Un utente in attesa è stato appena rimosso alla lista degli utenti in attesa dell'utente autenticato.
 * @apiGroup websocket
 * 
 * @apiSuccess {String} userId Id dell'utente in attesa che è stato rimosso.
 * @apiSuccess {String} username Username dell'utente in attesa che è stato rimosso.
 * @apiSuccess {Date} creationDate Data in cui l'utente in attesa è stato aggiunto.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "userId": "56f95f5e2db9d554089b0947",
 *          "username":"Admin",
 *          "creationDate":"2016-04-12T22:18:23.147Z",
 *      }
 */
 
 /**
 * @api {websocket out} 'new_blocked_user' Nuovo utente bloccato
 * @apiName new_blocked_user
 * @apiDescription Un nuovo utente bloccato è stato appena aggiunto alla lista degli utenti bloccato dell'utente autenticato.
 * @apiGroup websocket
 * 
 * @apiSuccess {String} userId Id dell'utente bloccato che è stato aggiunto.
 * @apiSuccess {String} username Username dell'utente bloccato che è stato aggiunto.
 * @apiSuccess {Date} creationDate Data in cui l'utente bloccato è stato aggiunto.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "userId": "56f95f5e2db9d554089b0947",
 *          "username":"Admin",
 *          "creationDate":"2016-04-12T22:18:23.147Z",
 *      }
 */
 
  /**
 * @api {websocket out} 'removed_blocked_user' Utente bloccato rimosso
 * @apiName removed_blocked_user
 * @apiDescription Un utente bloccato è stato appena rimosso alla lista degli utenti bloccato dell'utente autenticato.
 * @apiGroup websocket
 * 
 * @apiSuccess {String} userId Id dell'utente bloccato che è stato rimosso.
 * @apiSuccess {String} username Username dell'utente bloccato che è stato rimosso.
 * @apiSuccess {Date} creationDate Data in cui l'utente bloccato è stato aggiunto.
 * 
 * @apiSuccessExample Response:
 *      {
 *          "userId": "56f95f5e2db9d554089b0947",
 *          "username":"Admin",
 *          "creationDate":"2016-04-12T22:18:23.147Z",
 *      }
 */