/**
 * @api {all} /api/uploads/ Test API
 * @apiName /
 * @apiGroup uploads
 * @apiPermission Nessuno
 * @apiDescription API di test. Verifica che il servizio sia in ascolto.
 *
 * @apiSuccess {String} message Messaggio.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "message": "Diorama Uploads API OK"
 *      }
 */
 
 /**
 * @api {put} /api/uploads/user-image Carica immagine utente
 * @apiName user-image
 * @apiGroup uploads
 * @apiPermission Utente autenticato
 * @apiDescription Effettua l'upload di un immagine che sarà utilizzata come foto di profilo per l'utente autenticato.
 *
 * @apiParam {File} picture Immagine che si vuole caricare.
 * 
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "picture":{File}
 *      } 
 * 
 * @apiSuccess {String} url Indirizzo pubblico dell'immagine caricata.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "url": "images/uploads/users_pictures/5712bed620949b996096bb39"
 *      }
 * 
 * @apiUse MustBeAuthenticatedError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {put} /api/uploads/group-image Carica immagine gruppo
 * @apiName group-image
 * @apiGroup uploads
 * @apiPermission Utente convalidato admin del gruppo
 * @apiDescription Effettua l'upload di un immagine che sarà utilizzata come foto di profilo per il gruppo.
 *
 * @apiParam {File} picture Immagine che si vuole caricare.
 * @apiParam {String} groupId Id del gruppo che si vuole modificare.
 * 
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "picture":{File},
 *          "groupId":"570e8cc9704741d81675aaa1"
 *      } 
 * 
 * @apiSuccess {String} url Indirizzo pubblico dell'immagine caricata.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "url": "images/uploads/users_pictures/570e8cc9704741d81675aaa1"
 *      }
 * 
 * @apiUse MustBeGroupAdminError
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */
 
 /**
 * @api {put} /api/uploads/attachment Carica allegato
 * @apiName attachment
 * @apiGroup uploads
 * @apiPermission Utente convalidato
 * @apiDescription Carica un allegato legato ad un messaggio.
 *
 * @apiParam {File} picture Immagine che si vuole caricare.
 * @apiParam {String} fileId Id client del file.
 * 
 * @apiParamExample {json} Request-Example:
 *      { 
 *          "picture":{File},
 *          "fileId":"60dcc1e6dc8c4f8cb3669dca9cf27f45"
 *      } 
 * 
 * @apiSuccess {String} fileName Nome assegnato dal server ed usato per la sua memorizzazione. E' una concatenazione di userId e UUID.
 * @apiSuccess {String} originalFileName Nome originale del file con cui esso è stato inviato dal client.
 * @apiSuccess {String} fileId Id client del file.
 * @apiSuccess {String} mime Definizione del formato del file secondo lo standard Multipurpose Internet Mail Extensions.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "fileName": "5712bed620949b996096bb380a4216bbb92047b8b90942b3c669df90",
 *          "originalFileName": "Documento.txt",
 *          "fileId":"60dcc1e6dc8c4f8cb3669dca9cf27f45",
 *          "mime":"text/plain"
 *      }
 * 
 * @apiUse MustBeGroupAdminError
 * @apiUse MustBeAuthenticatedError
 * @apiUse MustBeValidatedError
 * @apiUse MissingParametersError
 */