/*global $ */
/*global upload */
/*global socket*/
/*global BootstrapDialog*/

socket.on('removed_contact', function(contact) {
    removeRow(contact.userId);
});

socket.on('removed_pending_user', function(pendingUser) {
    removeRow(pendingUser.userId);
});

socket.on('removed_blocked_user', function(blockedUser) {
    removeRow(blockedUser.userId);
});

socket.on('new_contact', function(contact) {
    removeRow(contact.userId);
    var getContactRowData = {
        contactId: contact.userId
    };
    $.get('api/web/get-contact-management-row-by-id', getContactRowData, function(partialView) {
        $('#tbodyContacts').append(partialView);
    });
});

socket.on('new_blocked_user', function(blockedUser) {
    removeRow(blockedUser.userId);
    var getBlockedUserRowData = {
        contactId: blockedUser.userId
    };
    $.get('api/web/get-blocked-user-management-row-by-id', getBlockedUserRowData, function(partialView) {
        $('#tbodyBlockedUsers').append(partialView);
    });
});

function removeRow(userId) {
    $('#tr-' + userId).remove();
}

$(document).ready(function(argument) {

    $('#form-convalida').change(function() {
        var setComunicationData = {
            comunication: $(this).prop('checked') === true ? 'phone' : 'mail'
        };
        $.put('api/users/set-comunication', setComunicationData, function(resSetComunication) {
            if (resSetComunication.status && resSetComunication.status === 'mail_missing') {
                BootstrapDialog.show({
                    title: 'Indirizzo email mancante',
                    type: BootstrapDialog.TYPE_WARNING,
                    message: 'Inserisci il tuo indirizzo email: <input type="email" class="form-control">',
                    onhide: function(dialogRef) {

                    },
                    buttons: [{
                        label: 'Conferma',
                        cssClass: 'btn-warning',
                        action: function(dialogRef) {
                            var mail = dialogRef.getModalBody().find('input').val();
                            if (mail && mail !== '') {
                                $.put('api/users/set-first-mail', {mail:mail}, function (resSetFirstMail) {
                                    // body...
                                });
                                dialogRef.close();
                            }

                        }
                    }, {
                        label: 'Annullla',
                        action: function(dialogRef) {
                            dialogRef.close();


                        }
                    }]
                });

            }
        });
    });

    $('#tab-content').on('click', '.btn-remove-contact', function() {
        $.delete('api/contacts/remove-contact', {
            contactId: $(this).attr('value')
        });
    });

    $('#tab-content').on('click', '.btn-block-contact, .btn-block-pending-user', function() {
        $.put('api/blockedusers/add-blocked-user', {
            contactId: $(this).attr('value'),
            override: true
        });
    });

    $('#tab-content').on('click', '.btn-remove-pending-user', function() {
        $.delete('api/pendingusers/remove-pending-user', {
            contactId: $(this).attr('value')
        });
    });

    $('#tab-content').on('click', '.btn-unblock-blocked-user, .btn-accept-pending-user', function() {
        $.put('api/contacts/add-contact', {
            contactId: $(this).attr('value'),
            override: true
        });
    });

    $('#tab-content').on('click', '.btn-remove-blocked-user', function() {
        $.delete('api/blockedusers/remove-blocked-user', {
            contactId: $(this).attr('value')
        });
    });

    $('#tab-content').on('click', '.btn-info-group', function() {
        var groupId = $(this).attr('value');
        $.get('api/web/get-info-group-modal', {
            groupId: groupId
        }, function(partialView) {
            var $usersList = $('<div class="create-group-users-list"></div>').append(partialView);
            BootstrapDialog.show({
                title: 'Informazioni',
                message: $usersList,
                closable: false,
                type: BootstrapDialog.TYPE_INFO,
                buttons: [{
                    label: 'Ok',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        });
    });

    $('#tab-content').on('click', '.btn-edit-group', function() {
        var groupId = $(this).attr('value');
        $.get('api/web/get-edit-group-modal', {
            groupId: groupId
        }, function(partialView) {
            var $usersList = $('<div class="create-group-users-list"></div>').append(partialView);
            BootstrapDialog.show({
                title: 'Modifica il gruppo',
                message: $usersList,
                closable: false,
                type: BootstrapDialog.TYPE_INFO,
                buttons: [{
                    label: 'Conferma',
                    cssClass: 'btn-info',
                    action: function(dialogRef) {
                        $('[type="checkbox"].remove-user-from-group').each(function(index) {
                            if ($(this).is(":checked")) {
                                var userId = $(this).attr('value');
                                var removeUserData = {
                                    groupId: groupId,
                                    userId: userId
                                };
                                $.delete('api/groups/remove-user', removeUserData);
                            }
                        });
                        $('[type="checkbox"].add-user-to-group').each(function(index) {
                            if ($(this).is(":checked")) {
                                var userId = $(this).attr('value');
                                var username = $(this).attr('name');
                                var admin = $('#set-admin-' + userId).is(":checked");
                                var user = {
                                    userId: userId,
                                    username: username,
                                    admin: admin
                                };
                                var removeUserData = {
                                    groupId: groupId,
                                    userId: userId
                                };
                                $.delete('api/groups/remove-user', removeUserData, function(data) {
                                    var addUserData = {
                                        groupId: groupId,
                                        user: user
                                    };
                                    $.put('api/groups/add-user', addUserData);
                                });
                            }
                        });
                        dialogRef.close();
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

    //-------------UPLOAD-----------------------------------

    $(document).on('click', '#btnUploadGroupImage', function() {
        $('#groupPictureInput').click();
    });

    $(document).on('change', '#groupPictureInput', function() {
        var groupId = $('#btnUploadGroupImage').attr('value');
        var file = document.getElementById('groupPictureInput').files[0];
        upload('api/uploads/group-image', file, 'picture', 'groupId', groupId, null, function(res) {
            console.log(res);
            $('#imgGroupPicture').attr('src', res.url + "?_=" + $.now());
        });
    });

    $(document).on('click', '#btnUploadUserImage', function() {
        $('#userPictureInput').click();
    });

    $(document).on('change', '#userPictureInput', function() {
        var file = document.getElementById('userPictureInput').files[0];
        upload('api/uploads/user-image', file, 'picture', null, null, null, function(res) {
            console.log(res);
            $('#imgUserPicture').attr('src', res.url + "?_=" + $.now());
        });
    });
});