/*global $*/
/*global toastr*/
/*global myId*/
/*global currentRecipientId*/
/*global socket*/

socket.on('chat_message', function(msg) {
    console.log('msg', msg);
    console.log('senderId', msg.senderId);
    console.log('myId', myId);
    if (msg.senderId === currentRecipientId || msg.senderId === myId) {
        var getMessageData = {
            msgId: msg._id
        };
        $.get('api/web/get-message-by-id', getMessageData, function(partialView) {
            $('#conversation').append(partialView);
        });
    }
    else {
        toastr.info(msg.body, msg.senderName, {
            onclick: function() {
                $('#user-' + msg.senderId).click();
            }
        });
    }
});

socket.on('new_contact', function(contact) {
    removeUser(contact.userId);
    var getContactData = {
        contactId: contact.userId
    };
    $.get('api/web/get-contact-by-id', getContactData, function(partialView) {
        $('.contacts').append(partialView);
    });
});

socket.on('new_group', function(group) {
    var getGroupData = {
        groupId: group.groupId
    };
    $.get('api/web/get-group-by-id', getGroupData, function(partialView) {
        $('.groups').append(partialView);
    });
});

socket.on('new_pending_user', function(pendingUser) {
   removeUser(pendingUser.userId);
    var getPendingUserData = {
        contactId: pendingUser.userId
    };
    $.get('api/web/get-pending-user-by-id', getPendingUserData, function(partialView) {
        $('.contacts').append(partialView);
    });
});

socket.on('new_blocked_user', function(blockedUser) {
    removeUser(blockedUser.userId);
    var getBlockedUserData = {
        contactId: blockedUser.userId
    };
    $.get('api/web/get-blocked-user-by-id', getBlockedUserData, function(partialView) {
        $('.contacts').append(partialView);
    });
});

function removeUser(userId) {
    if (('#user-' + userId).length)
        $('#user-' + userId).remove();
    if (('#pending-user-' + userId).length)
        $('#pending-user-' + userId).remove();    
}