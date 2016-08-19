var config = {};

config.security = {};
config.mongodb = {};
config.smtp = {};
config.sms = {};
config.path = {};
config.mail_templates = {};
config.messages = {};
config.comunication = {};

config.comunication.phone = 'phone';
config.comunication.mail = 'mail';

config.messages.phone_validation = 'Per convalidare il tuo account devi inserire il codice che ti sarà inviato sul telefono. L\'SMS arriverà entro i prossimi 30 minuti.';
config.messages.mail_validation = 'Per convalidare il tuo account devi cliccare sul link di verifica che ti è stato inviato via mail.';

config.security.jwt_secret = '***';
config.security.auth_cookie = 'bearerToken';

config.mongodb.connection_string = 'mongodb://admin:***'@ds025180.mlab.com:25180/diorama';

config.path.global_site_root = 'https://diorama-simeonevilardo.c9users.io';
config.path.relative_validation = 'validate-phone';
config.path.relative_login = 'login';
config.path.api_doc = 'docs/generated/';
config.path.users_pictures = 'images/uploads/users_pictures/';
config.path.unknown_user = 'images/defaults/unknown_user.png';
config.path.unknown_group = 'images/defaults/unknown_group.png';
config.path.attachments = 'protected/uploads/attachments/';

config.smtp.host = 'smtp.sendgrid.net';
config.smtp.port = 587;
config.smtp.sender_name = 'Diorama';
config.smtp.username = '***'';
config.smtp.password = '***'';

config.sms.host = 'api.comilio.it';
config.sms.http_port = 80;
config.sms.https_port = 443;
config.sms.message_type = 'SmartPro';
config.sms.sender = 'Diorama';
config.sms.send_api = '/rest/v1/message';
config.sms.method = 'POST';
config.sms.username = '***'';
config.sms.password = '***'';
config.sms.content_type = 'application/json;charset=utf-8';
config.sms.debug = false;
config.sms.debug_response = {
    "message_id": "123xyz",
    "status": "success"
};
config.sms.signup_text = 'Benvenuto in Diorama! Le tue credenziali sono username: @username, password: @password. Il tuo codice di convalida è: @code.';
config.sms.validation_text = 'Ciao @username, il tuo codice di convalida è: @code.';
config.sms.request_reset_password_text = 'Richiesta reset password ricevuta. Il tuo codice di sicurezza è: @code.';
config.sms.mail_changed_text = 'Ciao @username, il tuo indirizzo email di riferimento è stato modificato in: @mail.';
config.sms.phone_changed_text = 'Ciao @username, il tuo cellulare di riferimento è stato modificato in: @phone.';
config.sms.recover_username_text = 'Richiesta recupero username ricevuta. Il tuo username è: @username.';

config.mail_templates.signup = '../mail_templates/mail_sign_up.html';
config.mail_templates.phone_signup = '../mail_templates/phone_sign_up.html';
config.mail_templates.validation = '../mail_templates/validation.html';
config.mail_templates.change_mail_request = '../mail_templates/change_mail_request.html';
config.mail_templates.mail_changed = '../mail_templates/mail_changed.html';
config.mail_templates.request_reset_password = '../mail_templates/request_reset_password.html';
config.mail_templates.recover_username = '../mail_templates/recover_username.html';

module.exports = config;
