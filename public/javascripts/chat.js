/*global $*/
/*global socket*/
/*global BootstrapDialog*/
/*global toastr*/
/*global upload*/
/*global uuid*/

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
};

var currentRecipientId = null;
var currentRecipientName = null;
var attachmentsDialogInstance = null;
var currentAttachments = [];
var currentUploads = {};
var uploadsCounter = 0;

$(document).ready(function() {
    //---------------------Inizio aggancio eventi componenti statici---------------------
    $('#txtMsg').keyup(function(e) {
        if (e.keyCode == 13) {
            $('#btnSend').click();
        }
    });

    $('#btnSend').click(function() {
        console.log('uploadsCounter', uploadsCounter);
        console.log('currentAttachments', currentAttachments);
        if (uploadsCounter !== 0) {
            BootstrapDialog.alert({
                title: 'Attendere',
                message: 'Impossibile inviare il messaggio adesso. Uno o più caricamenti di allegati in corso.',
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        var msgToSend = {
            body: $("#txtMsg").val(),
            recipientId: currentRecipientId,
            attachments: currentAttachments
        };
        socket.emit('chat_message', msgToSend);
        $("#txtMsg").val('');
        attachmentsDialogInstance = null;
        currentAttachments = [];
        currentUploads = {};
        uploadsCounter = 0;
    });

    $('#btnAttachments').click(function() {
        if (!attachmentsDialogInstance) {
            $.get('api/web/get-upload-attachments-modal', function(partialView) {
                var $modalBody = $('<div></div>');
                $modalBody.append(partialView);
                attachmentsDialogInstance = BootstrapDialog.show({
                    title: 'Carica Allegati',
                    message: $modalBody,
                    autodestroy: false,
                    size: BootstrapDialog.SIZE_WIDE,
                    buttons: [{
                        label: 'Chiudi',
                        action: function(dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            });
        }
        else {
            attachmentsDialogInstance.open();
        }
    });

    // Effettua lo switch tra il pannello con tutti i contatti e quello di ricerca utenti
    $('#btnCollapseUsersPanel').click(function() {
        var panelUsersParent = $('#panelUsersParent');
        if (panelUsersParent.hasClass('chat')) {
            // Timeout di mezzo secondo per evitare glitch grafici
            setTimeout(function() {
                panelUsersParent.removeClass('chat');
            }, 500);
        }
        else {
            panelUsersParent.addClass('chat');
        }
    });

    $('#txtSearchUsers').keyup(function() {
        if ($(this).val() !== '') {
            var searchData = {
                username: $(this).val()
            };
            $.get('api/web/get-unknown-users-by-username', searchData, function(partialView) {
                console.log(partialView);
                $('#search-list').empty().append(partialView);
            });
        }
        else {
            $('#search-list').empty();
        }
    });

    $('#btnCreateGroup').click(function() {
        $.get('api/web/get-create-group-modal', function(partialView) {
            var $contactsList = $('<div class="create-group-contacts-list"></div>').append(partialView);
            BootstrapDialog.show({
                title: 'Crea un nuovo gruppo',
                message: $contactsList,
                closable: false,
                type: BootstrapDialog.TYPE_INFO,
                buttons: [{
                    label: 'Crea',
                    cssClass: 'btn-info',
                    action: function(dialogRef) {
                        //Controllare sta merda perchè ho aggiunto l'username e non ottengo i contatti da db ma verifico solo l'integrità dei dati facendo la count su id e username
                        var contacts = [];
                        $('[type="checkbox"].add-contact-to-group').each(function(index) {
                            if ($(this).is(":checked")) {
                                var id = $(this).attr('value');
                                var username = $(this).attr('name');
                                var admin = $('#set-admin-' + id).is(":checked");
                                contacts.push({
                                    userId: id,
                                    username: username,
                                    admin: admin
                                });
                            }
                        });
                        var createGroupData = {
                            groupName: $('#txtGroupName').val(),
                            contacts: contacts
                        };
                        $.post('api/groups/create-group', createGroupData, function(res) {
                            console.log(res);
                            dialogRef.close();
                        });
                    }
                }, {
                    label: 'Annulla',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        });
    });
});
//---------------------Fine aggancio eventi componenti statici---------------------

//---------------------Inizio aggancio eventi componenti dinamici---------------------
$(document).on('click', '.user', function() {
    setCurrentContact($(this).attr('value'), $(this).attr('name'));
});

// $(document).on('click', '.pending-user', function() {
//     alert($(this).attr('name'));
// });

$(document).on('click', '.btn-block-pending-user', function() {
    var blockedUserId = $(this).attr('value');
    BootstrapDialog.show({
        title: 'Blocca utente',
        message: 'Sei sicuro di voler bloccare l\'utente ' + $(this).attr('name') + '?',
        type: BootstrapDialog.TYPE_WARNING,
        buttons: [{
            label: 'Blocca',
            cssClass: 'btn-warning',
            action: function(dialogItself) {
                var addBlockedUserData = {
                    contactId: blockedUserId,
                    override: true
                };
                $.put('api/blockedusers/add-blocked-user', addBlockedUserData, function(group) {
                    dialogItself.close();
                    BootstrapDialog.show({
                        title: 'Gruppo creato',
                        message: 'Il gruppo ' + group.groupName + ' è stato correttamente creato',
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'Ok',
                            cssClass: 'btn-success',
                            action: function(dialogItself) {
                                dialogItself.close();
                            }
                        }]
                    });
                });
            }
        }, {
            label: 'Annulla',
            action: function(dialogItself) {
                dialogItself.close();
            }
        }]
    });
});

$(document).on('click', '.btn-accept-pending-user', function() {
    var contactId = $(this).attr('value');
    BootstrapDialog.show({
        title: 'Aggiungi utente',
        message: 'Sei sicuro di voler aggiungere ai tuoi contatti l\'utente ' + $(this).attr('name') + '?',
        type: BootstrapDialog.TYPE_SUCCESS,
        buttons: [{
            label: 'Aggiungi',
            cssClass: 'btn-success',
            action: function(dialogItself) {
                var addContactData = {
                    contactId: contactId,
                    override: true
                };
                $.put('api/contacts/add-contact', addContactData, function(res) {
                    dialogItself.close();
                });
            }
        }, {
            label: 'Annulla',
            action: function(dialogItself) {
                dialogItself.close();
            }
        }]
    });
});

$(document).on('change', '#attachmentInput', function() {
    var files = $(this).prop('files');
    var filenames = [];
    for (var i = 0; i < files.length; i++) {
        filenames.push({
            fileId: uuid.v4().replaceAll('-', ''),
            fileName: files[i].name
        });
    }
    var getAttachmentsRowsData = {
        files: filenames
    };
    console.log(getAttachmentsRowsData);
    $.post('api/web/get-attachments-rows', getAttachmentsRowsData, function(partialView) {
        $('#attachmentsList').append(partialView);
        for (var i = 0; i < files.length; i++) {
            uploadsCounter++;
            (function() {
                const index = i;
                currentUploads[filenames[i].fileId] = upload('api/uploads/attachment', files[i], 'attachment', 'fileId', filenames[i].fileId, function(progress) {
                    console.log('xhr...?', this);
                    if (progress.lengthComputable) {
                        var percentage = Math.round((progress.loaded / progress.total) * 100) + '%';
                        var progressBar = $('#progress-bar-' + filenames[index].fileId);
                        progressBar.css('width', percentage);
                        progressBar.text(percentage);
                        console.log(percentage);
                    }
                }, function(attachment) {
                    /* Questa callback viene chiamata SOLO in caso di successo.
                       La risposta del server è costituita dal nome originale del file
                       e dal suo nuovo nome con cui è stato memorizzato sul server. 
                       Il suo nuovo nome è univoco, perchè formato dall'ID dell'utente
                       unito ad un UUIDV4 */
                    var progressBar = $('#progress-bar-' + filenames[index].fileId);
                    progressBar.removeClass('active');
                    progressBar.addClass('progress-bar-success');
                    currentAttachments.push(attachment);
                }, function(data) {
                    /* Questa callback viene chiamata SEMPRE, dopo le eventuali
                       callback di successo o di errore. Si decrementa il contatore per segnalare
                       che l'upload è terminato*/
                    uploadsCounter--;
                });
            })();

        }
    });
});

$(document).on("click", ".btn-remove-attachment", function() {
    var attachId = $(this).attr('value');
    $('#file-row-' + attachId).remove();
    if (currentUploads[attachId])
        currentUploads[attachId].abort();
    var index = currentAttachments.getIndexByProp('fileId', attachId);
    if (index > 0)
        currentAttachments.splice(index, 1);
});

$(document).on("click", ".btn-attachment", function() {
    var attachId = $(this).attr('value');
    var downloadAttachmentData = {
        attachId: attachId
    };
    var win = window.open(url, '_blank');
    win.focus();
});

//---------------------Fine aggancio eventi componenti dinamici---------------------

function setCurrentContact(contactId, contactName) {
    currentRecipientId = contactId;
    currentRecipientName = contactName;
    var getConversationData = {
        contactId: currentRecipientId
    };
    var divConversation = $('#conversation');
    divConversation.empty();
    $.get('api/web/get-conversation', getConversationData, function(partialView) {
        divConversation.append(partialView);
    });
    $("#txtMsg").prop('disabled', false);
    $("#txtMsg").prop('placeholder', 'Scrivi un messaggio a ' + currentRecipientName);
}

Array.prototype.findByProp = function(propName, propValue) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][propName] === propValue)
            return this[i]; // Return as soon as the object is found
    }
    return null; // The object was not found
};

Array.prototype.getIndexByProp = function(propName, propValue) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][propName] === propValue)
            return i; // Return as soon as the object is found
    }
    return -1; // The object was not found
};