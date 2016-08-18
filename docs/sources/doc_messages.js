/**
 * @api {all} /api/messages/ Test API
 * @apiName /
 * @apiGroup messages
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Messages API OK"
 *      }
 */
 
 /**
 * @api {get} /api/messages/get-messages Ottiene tutti i messaggi
 * @apiName get-messages
 * @apiGroup messages
 * @apiPermission Utente convalidato
 * @apiDescription Ottiene la lista di tutti i messaggi inviati o ricevuti dell'utente autenticato.
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
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "_id":"56f95f5e2db9d554089b0945",
 *              "senderId":"570e8cc9704741d81675aaa1",
 *              "senderName":"Simeone",
 *              "recipientId":"570e8cc9704766e65675aff6",
 *              "recipientName":"Admin",
 *              "date":"2016-04-12T22:15:31.147Z",
 *              "seen":"true",
 *              "body":"Ciao, come stai?",
 *              "attachments":[
 *                  {
 *                      "fileName":"570acd621edcda09165a71439ab7de37fe69476698dced94c18cf35d",
 *                      "originalFileName":"documento.txt",
 *                      "mime":"text/plain"
 *                  },
 *                  {
 *                      "fileName":"570acd621edcda09165a714387f65ae054814d43a3db43614aa2d8cd",
 *                      "originalFileName":"mare.jpg",
 *                      "mime":"image/jpeg"
 *                  }
 *              ]
 *          },
 *          {
 *              "_id":"56f95f5e2db9d554089b0946",
 *              "senderId":"570e8ab1253783f81675acd3",
 *              "senderName":"TestUser",
 *              "recipientId":"570e8cc9704766e65675aff6",
 *              "recipientName":"Admin",
 *              "date":"2016-04-12T22:16:11.147Z",
 *              "seen":"false",
 *              "body":"Prova di Diorama",
 *              "attachments":[]
 *          },
 *          {
 *              "_id":"56f95f5e2db9d554089b0947",
 *              "senderId":"570e8cc9704766e65675aff6",
 *              "senderName":"Admin",
 *              "recipientId":"570e8cc9704741d81675aaa1",
 *              "recipientName":"Simeone",
 *              "date":"2016-04-12T22:18:23.147Z",
 *              "seen":"false",
 *              "body":"Ciao!",
 *              "attachments":[
 *                  {
 *                      "fileName":"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c",
 *                      "originalFileName":"documento.pdf",
 *                      "mime":"application/pdf"
 *                  }
 *              ]
 *          }
 *      ]
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 */
 
 /**
 * @api {get} /api/messages/get-conversation Ottiene una conversazione
 * @apiName get-conversation
 * @apiGroup messages
 * @apiPermission Utente convalidato
 * @apiDescription Ottiene la lista di messaggi inviati e ricevuti tra l'utente autenticato ed un altro utente o gruppo.
 * 
 * @apiParam {String} contactId Id dell'utente del quale si vuole ottenere la conversazione.
 * @apiParamExample {json} Request-Example:
 *      {
 *          "contactId":"570e8cc9704766e65675aff6"
 *      }
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
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *          {
 *              "_id":"56f95f5e2db9d554089b0945",
 *              "senderId":"570e8cc9704741d81675aaa1",
 *              "senderName":"Simeone",
 *              "recipientId":"570e8cc9704766e65675aff6",
 *              "recipientName":"Admin",
 *              "date":"2016-04-12T22:15:31.147Z",
 *              "seen":"true",
 *              "body":"Ciao, come stai?",
 *              "attachments":[
 *                  {
 *                      "fileName":"570acd621edcda09165a71439ab7de37fe69476698dced94c18cf35d",
 *                      "originalFileName":"documento.txt",
 *                      "mime":"text/plain"
 *                  },
 *                  {
 *                      "fileName":"570acd621edcda09165a714387f65ae054814d43a3db43614aa2d8cd",
 *                      "originalFileName":"mare.jpg",
 *                      "mime":"image/jpeg"
 *                  }
 *              ]
 *          },
 *          {
 *              "_id":"56f95f5e2db9d554089b0946",
 *              "senderId":"570e8cc9704741d81675aaa1",
 *              "senderName":"Simeone",
 *              "recipientId":"570e8cc9704766e65675aff6",
 *              "recipientName":"Admin",
 *              "date":"2016-04-12T22:16:11.147Z",
 *              "seen":"false",
 *              "body":"Prova di Diorama",
 *              "attachments":[]
 *          },
 *          {
 *              "_id":"56f95f5e2db9d554089b0947",
 *              "senderId":"570e8cc9704766e65675aff6",
 *              "senderName":"Admin",
 *              "recipientId":"570e8cc9704741d81675aaa1",
 *              "recipientName":"Simeone",
 *              "date":"2016-04-12T22:18:23.147Z",
 *              "seen":"false",
 *              "body":"Ciao!",
 *              "attachments":[
 *                  {
 *                      "fileName":"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c",
 *                      "originalFileName":"documento.pdf",
 *                      "mime":"application/pdf"
 *                  }
 *              ]
 *          }
 *      ]
 *
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */