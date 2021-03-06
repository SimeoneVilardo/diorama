define({ "api": [
  {
    "type": "all",
    "url": "/api/authentication/",
    "title": "Test API",
    "name": "_",
    "group": "authentication",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Authentication API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication"
  },
  {
    "type": "put",
    "url": "/api/authentication/change-mail",
    "title": "Cambia email",
    "name": "change_mail",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Modifica l'indirizzo email relativo all'account dell'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Nuovo indirizzo email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"mail\":\"simeone.vilardo@gmail.com\",\n    \"password\":\"xxx123##\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>Esito dell'operazione (0/1).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nModified",
            "description": "<p>Numero di righe modificate.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "n",
            "description": "<p>Numero di righe sulle quali si è tentano di effettuare l'update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"ok\":1,\n    \"nModified\":1,\n    \"n\":1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Password errata. Questo errore può essere causato dall'utente nel caso in cui esso inserisca una password errata.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>La risorsa richiesta non è stata trovata.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Password errata\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"message\":\"La risorsa richiesta non è stata trovata\",\n    \"statusCode\":404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/authentication/change-password",
    "title": "Cambia password",
    "name": "change_password",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Modifica la password dell'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "olfPassword",
            "description": "<p>Password attuale che si vuole modificare.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>Nuova password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"token\":\"d4ddc53f3ce34a198203eb605c7199c3184f0f7a44464b97a21fb8a1c439f113\",\n    \"password\":\"xxx123##\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>Esito dell'operazione (0/1).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nModified",
            "description": "<p>Numero di righe modificate.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "n",
            "description": "<p>Numero di righe sulle quali si è tentano di effettuare l'update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"ok\":1,\n    \"nModified\":1,\n    \"n\":1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Password errata\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/authentication/change-phone",
    "title": "Cambia numero di telefono",
    "name": "change_phone",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Modifica il numero di telefono relativo all'account dell'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>Nuovo numero di telefono.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"phone\":\"3401234567\",\n    \"password\":\"xxx123##\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>Esito dell'operazione (0/1).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nModified",
            "description": "<p>Numero di righe modificate.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "n",
            "description": "<p>Numero di righe sulle quali si è tentano di effettuare l'update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"ok\":1,\n    \"nModified\":1,\n    \"n\":1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Password errata. Questo errore può essere causato dall'utente nel caso in cui esso inserisca una password errata.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>La risorsa richiesta non è stata trovata.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Password errata\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"message\":\"La risorsa richiesta non è stata trovata\",\n    \"statusCode\":404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/authentication/login",
    "title": "Autentica un utente",
    "name": "login",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente non autenticato"
      }
    ],
    "description": "<p>Autentica un utente verificando la corrispondenza di username e password.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nome dell'utente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"Simeone\",\n    \"password\": \"xxx123##\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token di autenticazione.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Indirizzo di redirect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Zjk1ZTM0MmRiOWQ1NTQwODliMDkzYyIsImV4cCI6MTQ1OTYxNTAxMCwiaXNzIjoiaHR0cHM6Ly9kaW9yYW1hLWRldi1zaW1lb25ldmlsYXJkby0xLmM5dXNlcnMuaW8iLCJ1c2VybmFtZSI6ImEiLCJtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTQ1OTUyODYxMH0.n_nvXxuKgANw0Yz22cGvWG7sVm4R-izc9r6buz3SRKU\",\n    \"url\": \"https://diorama-simeonevilardo.c9users.io\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>L'username e/o la password non corrispondono a nessun account registrato su database. Questo errore può essere causato dall'utente nel caso in cui esso inserisca una password o un username errato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente non deve essere autenticato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n    \"message\": \"Username o password errati\",\n    \"statusCode\": 403\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non deve essere autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication"
  },
  {
    "type": "post",
    "url": "/api/authentication/logout",
    "title": "Disconnette un utente",
    "name": "logout",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Disconnette un utente disabilitando il suo token di autenticazione.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Indirizzo di redirect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"url\": \"https://diorama-simeonevilardo.c9users.io\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/authentication/recover-username",
    "title": "Recupera username",
    "name": "recover_username",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente non autenticato"
      }
    ],
    "description": "<p>Invia un messaggio contenente l'username dell'utente. Il messaggio può essere una mail o un sms a seconda del tipo di comunicazione specificato dall'utente.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Indirizzo email o numero di telefono dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"login\":\"simeone.vilardo@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "validationInfo",
            "description": "<p>Informazioni sull'esito dell'invio del messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"validationInfo\":{\"status\":\"success\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente non deve essere autenticato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>La risorsa richiesta non è stata trovata.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non deve essere autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"message\":\"La risorsa richiesta non è stata trovata\",\n    \"statusCode\":404\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/authentication/request-reset-password",
    "title": "Richiesta reset password",
    "name": "request_reset_password",
    "group": "authentication",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>Richiede il reset della password. Invia un messaggio all'utente che ha richiesto il reset. Il messaggio può essere una mail o un sms a seconda del tipo di comunicazione specificato dall'utente.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Indirizzo email, numero di telefono o username dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"login\":\"Simeone\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "validationInfo",
            "description": "<p>Informazioni sull'esito del messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"validationInfo\":{\"status\":\"success\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/authentication/reset-password",
    "title": "Reset password",
    "name": "reset_password",
    "group": "authentication",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>Resetta la password dell'utente che ha cliccato sul pulsante di reset nella mail che ha ricevuto dopo aver fatto richiesta di reset password.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token di reset password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Nuova password dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"token\":\"d4ddc53f3ce34a198203eb605c7199c3184f0f7a44464b97a21fb8a1c439f113\",\n    \"password\":\"xxx123##\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>Esito dell'operazione (0/1).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nModified",
            "description": "<p>Numero di righe modificate.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "n",
            "description": "<p>Numero di righe sulle quali si è tentano di effettuare l'update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"ok\":1,\n    \"nModified\":1,\n    \"n\":1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/authentication/send-validation",
    "title": "Invia messaggio di convalida",
    "name": "send_validation",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente autenticato ma non convalidato"
      }
    ],
    "description": "<p>Aggiorna il token di convalida di un utente. Imposta la scadenza del nuovo token a 24 ore dal momento della chiamata. Invia un messaggio di convalida all'utente. Il messaggio può essere una mail o un sms a seconda del tipo di comunicazione specificato dall'utente.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "validationInfo",
            "description": "<p>Informazioni sull'esito dell'invio del messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"validationInfo\":{\"status\":\"success\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non deve essere convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/authentication/signup",
    "title": "Registra un utente",
    "name": "signup",
    "group": "authentication",
    "permission": [
      {
        "name": "Utente non autenticato"
      }
    ],
    "description": "<p>Registra un nuovo utente nel database.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nome dell'utente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password dell'utente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comunication",
            "description": "<p>Tipo di comunicazione scelta dall'utente. Può essere &quot;phone&quot; o &quot;mail&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mail",
            "description": "<p>Indirizzo email dell'utente.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "phone",
            "description": "<p>Numero di cellulare dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"username\":\"Simeone\",\n    \"password\":\"xxx123##\",\n    \"comunication\":\"mail\",\n    \"mail\":\"simeone.vilardo@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente creato.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Indirizzo di redirect.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio che è possibile mostrare in caso di esito positivo. Può variare a seconda del tipo di comunicazione scelto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "validationInfo",
            "description": "<p>Esito dell'invio del messaggio registrazione.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"username\":\"Simeone\",\n    \"url\":\"https://diorama-simeonevilardo.c9users.io\",\n    \"message\":\"Per convalidare il tuo account devi cliccare sul link di verifica che ti è stato inviato via mail.\",\n    \"validationInfo\":{\"status\":\"success\"}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Richiesta non valida. Questo errore può essere causato nel caso in cui non vi siano tutti i parametri obbligatori nella richiesta oppure nel caso in cui l'indirizzo email o il numero di telefono non siano validi.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Non è stato possibile eseguire l'operazione a causa di vincoli sul database. Questo errore può essere causato dall'utente nel caso in cui esso inserisca un username, un numero di telefono o un indirizzo email già registrato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"Indirizzo email non valido\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"Numero di telefono non valido\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n    \"message\":\"Si è verificato un errore: Un utente con lo stesso campo mail è già registrato nel database.\",\n    \"statusCode\":403\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non deve essere autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_authentication.js",
    "groupTitle": "authentication"
  },
  {
    "type": "all",
    "url": "/api/blockedusers/",
    "title": "Test API",
    "name": "_",
    "group": "blockedusers",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Blocked Users API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_blockedusers.js",
    "groupTitle": "blockedusers"
  },
  {
    "type": "put",
    "url": "/api/blockedusers/add-blocked-user",
    "title": "Blocca un utente",
    "name": "add_blocked_user",
    "group": "blockedusers",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Blocca un utente aggiungendolo alla lista degli utenti bloccati.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente che si vuole bloccare.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "override",
            "description": "<p>Flag di override. Se true allora rimuove l'utente da altre liste se presente e lo sposta in quella degli utenti bloccati. Se false e l'utente si trova in altre liste non effettua alcuna modifica.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"contactId\":\"570e8cc9704741d81675aaa1\",\n    \"override\":false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente che è stato bloccato.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente che è stato bloccato.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente è stato bloccato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n    \"userId\":\"570e8cc9704741d81675aaa1\",\n    \"username\":\"Simeone\",\n    \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_blockedusers.js",
    "groupTitle": "blockedusers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/blockedusers/get-blocked-users",
    "title": "Ottiene gli utenti bloccati",
    "name": "get_blocked_users",
    "group": "blockedusers",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Ottiene la lista di tutti gli utenti bloccati dell'utente autenticato.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente bloccato.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente bloccato.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato bloccato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {  \n        \"userId\":\"570e8cc9704766e65675aff6\",\n        \"username\":\"Admin\",\n        \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n    },\n    {\n        \"userId\":\"570e8cc9704741d81675aaa1\",\n        \"username\":\"Simeone\",\n        \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n    }    \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_blockedusers.js",
    "groupTitle": "blockedusers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/blockedusers/remove-blocked-user",
    "title": "Rimuove un utente bloccato",
    "name": "remove_blocked_user",
    "group": "blockedusers",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Rimuove un utente dalla lista degli utenti bloccati dell'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente bloccato che si vuole rimuovere.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"contactId\":\"570e8cc9704741d81675aaa1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente bloccato che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente bloccato che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato bloccato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n    \"userId\":\"570e8cc9704741d81675aaa1\",\n    \"username\":\"Simeone\",\n    \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_blockedusers.js",
    "groupTitle": "blockedusers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "all",
    "url": "/api/contacts/",
    "title": "Test API",
    "name": "_",
    "group": "contacts",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\":\"Diorama Contacts API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_contacts.js",
    "groupTitle": "contacts"
  },
  {
    "type": "put",
    "url": "/api/contacts/add-contact",
    "title": "Aggiunge un contatto",
    "name": "add_contact",
    "group": "contacts",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Aggiunge un utente alla lista dei contatti dell'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente che si vuole aggiungere.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "override",
            "description": "<p>Flag di override. Se true allora rimuove l'utente da altre liste se presente e lo sposta in quella dei contatti. Se false ed l'utente si trova in altre liste non effettua alcuna modifica.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"contactId\":\"570e8cc9704741d81675aaa1\",\n    \"override\":false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id del contatto che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username del contatto che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\":\"570e8cc9704741d81675aaa1\",\n    \"username\":\"Simeone\",\n    \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_contacts.js",
    "groupTitle": "contacts",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/contacts/get-contacts",
    "title": "Ottiene i contatti",
    "name": "get_contacts",
    "group": "contacts",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Ottiene la lista di tutti i contatti dell'utente autenticato.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id del contatto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username del contatto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {  \n        \"userId\":\"570e8cc9704766e65675aff6\",\n        \"username\":\"Admin\",\n        \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n    },\n    {\n        \"userId\":\"570e8cc9704741d81675aaa1\",\n        \"username\":\"Simeone\",\n        \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n    }    \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_contacts.js",
    "groupTitle": "contacts",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/contacts/remove-contact",
    "title": "Rimuove un contatto",
    "name": "remove_contact",
    "group": "contacts",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Rimuove un contatto dalla lista dei contatti dell'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente che si vuole rimuovere.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"contactId\":\"570e8cc9704741d81675aaa1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id del contatto che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username del contatto che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato rimosso.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\":\"570e8cc9704741d81675aaa1\",\n    \"username\":\"Simeone\",\n    \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_contacts.js",
    "groupTitle": "contacts",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "all",
    "url": "/api/groups/",
    "title": "Test API",
    "name": "_",
    "group": "groups",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Groups API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_groups.js",
    "groupTitle": "groups"
  },
  {
    "type": "put",
    "url": "/api/groups/add-user",
    "title": "Aggiungi utente",
    "name": "add_user",
    "group": "groups",
    "permission": [
      {
        "name": "Utente convalidato admin del gruppo"
      }
    ],
    "description": "<p>Aggiunge un nuovo utente ad un gruppo esistente.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Id del gruppo che si vuole modificare.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Utente che si vuole aggiungere.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"groupId\":\"570e8cc9704741d81675aaa1\",\n    \"user\":{\n           \"userId\":\"570e8cc9704741d81513bdf2\",\n           \"username\":\"Simeone\",\n           \"admin\":false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente che è stato aggiunto al gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente che è stato aggiunto al gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Flag che indica se l'utente che è stato aggiunto al gruppo ha i permessi di modificarlo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n    \"userId\":\"570e8cc9704741d81513bdf2\",\n    \"username\":\"Simeone\",\n    \"admin\":false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_groups.js",
    "groupTitle": "groups",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non dispone dei permessi per modificare il gruppo\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/groups/create-group",
    "title": "Crea un nuovo gruppo",
    "name": "create_group",
    "group": "groups",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Crea un nuovo gruppo nel database. Registra nel gruppo la lista di tutti gli utenti che ne fanno parte ed i loro permessi. Aggiunge alla lista dei gruppi di ogni utente il nuovo gruppo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>Nome del gruppo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "contacts",
            "description": "<p>Lista degli utenti che si vogliono aggiungere al gruppo. Non si deve inserire l'utente autenticato che sta creando il gruppo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"groupName\":\"Classe 5E\",\n    \"contacts\":[\n        {\n            \"userId\":\"570e8cc9704741d81675aaa1\",\n            \"username\":\"Admin\",\n            \"admin\":\"true\"\n        },\n        {\n            \"userId\":\"570e8ab1253783f81675acd3\",\n            \"username\":\"TestUser\",\n            \"admin\":\"false\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>Nome del gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "creator",
            "description": "<p>Dati dell'utente che ha creato il gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Lista degli utenti che fanno parte del gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data nella quale è stato creato il gruppo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id:\":\"570e8cc9704741d81513bdf2\",\n    \"groupName\":\"Classe 5E\",\n    \"creator\":{\n        \"userId\":\"570e8cc9704741d81675aaa1\",\n        \"username\":\"Simeone\"\n    },\n    \"users\":[\n        {\n            \"userId\":\"570e8cc9704741d81675aaa1\",\n            \"username\":\"Admin\",\n            \"admin\":\"true\"\n        },\n        {\n            \"userId\":\"570e8ab1253783f81675acd3\",\n            \"username\":\"TestUser\",\n            \"admin\":\"false\"\n        }\n    ],\n    \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_groups.js",
    "groupTitle": "groups",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/groups/get-groups",
    "title": "Ottiene i gruppi",
    "name": "get_groups",
    "group": "groups",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Ottiene la lista di tutti i gruppi dell'utente autenticato.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Id del gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groupName",
            "description": "<p>Nome del gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il gruppo è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {  \n        \"groupId\":\"570e8cc9704741d81513bdf2\",\n        \"groupName\":\"Classe 5E\",\n        \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n    },\n    {\n        \"groupId\":\"570e8cc9704741d81513bdf2\",\n        \"groupName\":\"GruppoBello\",\n        \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n    }    \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_groups.js",
    "groupTitle": "groups",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/groups/remove-user",
    "title": "Rimuovi utente",
    "name": "remove_user",
    "group": "groups",
    "permission": [
      {
        "name": "Utente convalidato admin del gruppo"
      }
    ],
    "description": "<p>Rimuove un nuovo utente da un gruppo esistente.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Id del gruppo che si vuole modificare.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Utente che si vuole modificare.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"groupId\":\"570e8cc9704741d81675aaa1\",\n    \"userId\":\"570e8cc9704741d81513bdf2\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente che è stato rimosso dal gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente che è stato rimosso dal gruppo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Flag che indica se l'utente che è stato rimosso dal gruppo aveva i permessi di modificarlo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n    \"userId\":\"570e8cc9704741d81513bdf2\",\n    \"username\":\"Simeone\",\n    \"admin\":false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_groups.js",
    "groupTitle": "groups",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non dispone dei permessi per modificare il gruppo\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "all",
    "url": "/api/messages/",
    "title": "Test API",
    "name": "_",
    "group": "messages",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Messages API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_messages.js",
    "groupTitle": "messages"
  },
  {
    "type": "get",
    "url": "/api/messages/get-conversation",
    "title": "Ottiene una conversazione",
    "name": "get_conversation",
    "group": "messages",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Ottiene la lista di messaggi inviati e ricevuti tra l'utente autenticato ed un altro utente o gruppo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente del quale si vuole ottenere la conversazione.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"contactId\":\"570e8cc9704766e65675aff6\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id del messaggio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id del mittente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>Username del mittente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id del destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipientName",
            "description": "<p>Username del destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Data dell'arrivo del messaggio su server.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "seen",
            "description": "<p>Flag che identifica se il messaggio è stato scaricato dal destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Testo del messaggio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "attachments",
            "description": "<p>Allegati al messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\":\"56f95f5e2db9d554089b0945\",\n        \"senderId\":\"570e8cc9704741d81675aaa1\",\n        \"senderName\":\"Simeone\",\n        \"recipientId\":\"570e8cc9704766e65675aff6\",\n        \"recipientName\":\"Admin\",\n        \"date\":\"2016-04-12T22:15:31.147Z\",\n        \"seen\":\"true\",\n        \"body\":\"Ciao, come stai?\",\n        \"attachments\":[\n            {\n                \"fileName\":\"570acd621edcda09165a71439ab7de37fe69476698dced94c18cf35d\",\n                \"originalFileName\":\"documento.txt\",\n                \"mime\":\"text/plain\"\n            },\n            {\n                \"fileName\":\"570acd621edcda09165a714387f65ae054814d43a3db43614aa2d8cd\",\n                \"originalFileName\":\"mare.jpg\",\n                \"mime\":\"image/jpeg\"\n            }\n        ]\n    },\n    {\n        \"_id\":\"56f95f5e2db9d554089b0946\",\n        \"senderId\":\"570e8cc9704741d81675aaa1\",\n        \"senderName\":\"Simeone\",\n        \"recipientId\":\"570e8cc9704766e65675aff6\",\n        \"recipientName\":\"Admin\",\n        \"date\":\"2016-04-12T22:16:11.147Z\",\n        \"seen\":\"false\",\n        \"body\":\"Prova di Diorama\",\n        \"attachments\":[]\n    },\n    {\n        \"_id\":\"56f95f5e2db9d554089b0947\",\n        \"senderId\":\"570e8cc9704766e65675aff6\",\n        \"senderName\":\"Admin\",\n        \"recipientId\":\"570e8cc9704741d81675aaa1\",\n        \"recipientName\":\"Simeone\",\n        \"date\":\"2016-04-12T22:18:23.147Z\",\n        \"seen\":\"false\",\n        \"body\":\"Ciao!\",\n        \"attachments\":[\n            {\n                \"fileName\":\"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c\",\n                \"originalFileName\":\"documento.pdf\",\n                \"mime\":\"application/pdf\"\n            }\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_messages.js",
    "groupTitle": "messages",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/messages/get-messages",
    "title": "Ottiene tutti i messaggi",
    "name": "get_messages",
    "group": "messages",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Ottiene la lista di tutti i messaggi inviati o ricevuti dell'utente autenticato.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id del messaggio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id del mittente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>Username del mittente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id del destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipientName",
            "description": "<p>Username del destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Data dell'arrivo del messaggio su server.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "seen",
            "description": "<p>Flag che identifica se il messaggio è stato scaricato dal destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Testo del messaggio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "attachments",
            "description": "<p>Allegati al messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\":\"56f95f5e2db9d554089b0945\",\n        \"senderId\":\"570e8cc9704741d81675aaa1\",\n        \"senderName\":\"Simeone\",\n        \"recipientId\":\"570e8cc9704766e65675aff6\",\n        \"recipientName\":\"Admin\",\n        \"date\":\"2016-04-12T22:15:31.147Z\",\n        \"seen\":\"true\",\n        \"body\":\"Ciao, come stai?\",\n        \"attachments\":[\n            {\n                \"fileName\":\"570acd621edcda09165a71439ab7de37fe69476698dced94c18cf35d\",\n                \"originalFileName\":\"documento.txt\",\n                \"mime\":\"text/plain\"\n            },\n            {\n                \"fileName\":\"570acd621edcda09165a714387f65ae054814d43a3db43614aa2d8cd\",\n                \"originalFileName\":\"mare.jpg\",\n                \"mime\":\"image/jpeg\"\n            }\n        ]\n    },\n    {\n        \"_id\":\"56f95f5e2db9d554089b0946\",\n        \"senderId\":\"570e8ab1253783f81675acd3\",\n        \"senderName\":\"TestUser\",\n        \"recipientId\":\"570e8cc9704766e65675aff6\",\n        \"recipientName\":\"Admin\",\n        \"date\":\"2016-04-12T22:16:11.147Z\",\n        \"seen\":\"false\",\n        \"body\":\"Prova di Diorama\",\n        \"attachments\":[]\n    },\n    {\n        \"_id\":\"56f95f5e2db9d554089b0947\",\n        \"senderId\":\"570e8cc9704766e65675aff6\",\n        \"senderName\":\"Admin\",\n        \"recipientId\":\"570e8cc9704741d81675aaa1\",\n        \"recipientName\":\"Simeone\",\n        \"date\":\"2016-04-12T22:18:23.147Z\",\n        \"seen\":\"false\",\n        \"body\":\"Ciao!\",\n        \"attachments\":[\n            {\n                \"fileName\":\"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c\",\n                \"originalFileName\":\"documento.pdf\",\n                \"mime\":\"application/pdf\"\n            }\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_messages.js",
    "groupTitle": "messages",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "all",
    "url": "/api/pendingusers/",
    "title": "Test API",
    "name": "_",
    "group": "pendingusers",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Pending Users API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_pendingusers.js",
    "groupTitle": "pendingusers"
  },
  {
    "type": "put",
    "url": "/api/pendingusers/add-pending-user",
    "title": "Aggiunge un utente in attesa",
    "name": "add_pending_user",
    "group": "pendingusers",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Aggiunge un utente alla lista degli utenti in attesa di accettazione.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente che si vuole aggiungere agli utenti in attesa.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "override",
            "description": "<p>Flag di override. Se true allora rimuove l'utente da altre liste se presente e lo sposta in quella degli utenti bloccati. Se false e l'utente si trova in altre liste non effettua alcuna modifica.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"contactId\":\"570e8cc9704741d81675aaa1\",\n    \"override\":false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente che è stato aggiunto alla lista degli utenti in attesa.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente che è stato aggiunto alla lista degli utenti in attesa.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente è stato aggiunto alla lista degli utenti in attesa.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n    \"userId\":\"570e8cc9704741d81675aaa1\",\n    \"username\":\"Simeone\",\n    \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_pendingusers.js",
    "groupTitle": "pendingusers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/pendingusers/delete-pending-user",
    "title": "Rimuove un utente in attesa",
    "name": "delete_pending_user",
    "group": "pendingusers",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Rimuove un utente alla lista degli utenti in attesa di accettazione.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<p>Id dell'utente in attesa che si vuole rimuovere.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"contactId\":\"570e8cc9704741d81675aaa1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente in attesa che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente in attesa che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente è stato aggiunto alla lista degli utenti in attesa.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n    \"userId\":\"570e8cc9704741d81675aaa1\",\n    \"username\":\"Simeone\",\n    \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_pendingusers.js",
    "groupTitle": "pendingusers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/pendingusers/get-pending-users",
    "title": "Ottiene gli utenti in attesa",
    "name": "get_pending_users",
    "group": "pendingusers",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Ottiene la lista di tutti gli utenti in attesa di accettazione dell'utente autenticato.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente in attesa.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente in attesa.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente in attesa è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {  \n        \"userId\":\"570e8cc9704766e65675aff6\",\n        \"username\":\"Admin\",\n        \"creationDate\":\"2016-04-13T23:14:42.256Z\"\n    },\n    {\n        \"userId\":\"570e8cc9704741d81675aaa1\",\n        \"username\":\"Simeone\",\n        \"creationDate\":\"2016-04-12T22:15:31.147Z\"\n    }    \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_pendingusers.js",
    "groupTitle": "pendingusers",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "all",
    "url": "/api/uploads/",
    "title": "Test API",
    "name": "_",
    "group": "uploads",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Uploads API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_uploads.js",
    "groupTitle": "uploads"
  },
  {
    "type": "put",
    "url": "/api/uploads/attachment",
    "title": "Carica allegato",
    "name": "attachment",
    "group": "uploads",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "description": "<p>Carica un allegato legato ad un messaggio.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picture",
            "description": "<p>Immagine che si vuole caricare.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>Id client del file.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"picture\":{File},\n    \"fileId\":\"60dcc1e6dc8c4f8cb3669dca9cf27f45\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>Nome assegnato dal server ed usato per la sua memorizzazione. E' una concatenazione di userId e UUID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "originalFileName",
            "description": "<p>Nome originale del file con cui esso è stato inviato dal client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fileId",
            "description": "<p>Id client del file.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mime",
            "description": "<p>Definizione del formato del file secondo lo standard Multipurpose Internet Mail Extensions.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"fileName\": \"5712bed620949b996096bb380a4216bbb92047b8b90942b3c669df90\",\n    \"originalFileName\": \"Documento.txt\",\n    \"fileId\":\"60dcc1e6dc8c4f8cb3669dca9cf27f45\",\n    \"mime\":\"text/plain\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_uploads.js",
    "groupTitle": "uploads",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente deve essere un admin del gruppo per poterlo modificare.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non dispone dei permessi per modificare il gruppo\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/uploads/group-image",
    "title": "Carica immagine gruppo",
    "name": "group_image",
    "group": "uploads",
    "permission": [
      {
        "name": "Utente convalidato admin del gruppo"
      }
    ],
    "description": "<p>Effettua l'upload di un immagine che sarà utilizzata come foto di profilo per il gruppo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picture",
            "description": "<p>Immagine che si vuole caricare.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Id del gruppo che si vuole modificare.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"picture\":{File},\n    \"groupId\":\"570e8cc9704741d81675aaa1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Indirizzo pubblico dell'immagine caricata.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"url\": \"images/uploads/users_pictures/570e8cc9704741d81675aaa1\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_uploads.js",
    "groupTitle": "uploads",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. L'utente deve essere un admin del gruppo per poterlo modificare.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"L'utente non dispone dei permessi per modificare il gruppo\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non convalidato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/uploads/user-image",
    "title": "Carica immagine utente",
    "name": "user_image",
    "group": "uploads",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Effettua l'upload di un immagine che sarà utilizzata come foto di profilo per l'utente autenticato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "picture",
            "description": "<p>Immagine che si vuole caricare.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \n    \"picture\":{File}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Indirizzo pubblico dell'immagine caricata.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"url\": \"images/uploads/users_pictures/5712bed620949b996096bb39\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_uploads.js",
    "groupTitle": "uploads",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "all",
    "url": "/api/users/",
    "title": "Test API",
    "name": "_",
    "group": "users",
    "permission": [
      {
        "name": "Nessuno"
      }
    ],
    "description": "<p>API di test. Verifica che il servizio sia in ascolto.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Diorama Users API OK\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_users.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/users/get-user-by-id",
    "title": "Ottiene un utente dato il suo id",
    "name": "get_user_by_id",
    "group": "users",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Ritorna le informazioni richieste dell'utente con l'id specificato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fields",
            "description": "<p>Campi dell'utente da estrarre dal database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"userId\": \"56ff0af75f7cfe74ab8518b6\",\n    \"fields\": \"username mail contacts\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Indirizzo email dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contacts",
            "description": "<p>Lista dei contatti dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"56ff0af75f7cfe74ab8518b6\",\n  \"username\": \"Simeone\",\n  \"mail\": \"simeone.vilardo@gmail.com\",\n  \"contacts\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_users.js",
    "groupTitle": "users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>La risorsa richiesta non è stata trovata.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"message\":\"La risorsa richiesta non è stata trovata\",\n    \"statusCode\":404\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/get-user-by-username",
    "title": "Ottiene un utente dato il suo username",
    "name": "get_user_by_username",
    "group": "users",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Ritorna le informazioni richieste dell'utente con l'username specificato.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fields",
            "description": "<p>Campi dell'utente da estrarre dal database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"Simeone\",\n    \"fields\": \"username mail contacts\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Indirizzo email dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contacts",
            "description": "<p>Lista dei contatti dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"56ff0af75f7cfe74ab8518b6\",\n  \"username\": \"Simeone\",\n  \"mail\": \"simeone.vilardo@gmail.com\",\n  \"contacts\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_users.js",
    "groupTitle": "users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>La risorsa richiesta non è stata trovata.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NotFound\n{\n    \"message\":\"La risorsa richiesta non è stata trovata\",\n    \"statusCode\":404\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/get-users-and-contacts-and-groups",
    "title": "Ottiene utenti contatti e gruppo",
    "name": "get_users_and_contacts_and_groups",
    "group": "users",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Ritorna le liste dei contatti, degli utenti in attesa, degli utenti bloccati e dei gruppi dell'utente autenticato.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "groups",
            "description": "<p>Gruppi nella lista dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pendingUsers",
            "description": "<p>Utenti in attesa nella lista dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "blockedUsers",
            "description": "<p>Utenti bloccati nella lista dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "contacts",
            "description": "<p>Contatti nella lista dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\":\"5712bed620949b996096bb38\",\n    \"groups\":[\n        {\n            \"groupId\":\"57135d09966f501b2e0490f1\",\n            \"groupName\":\"Classe 5E\",\n            \"admin\":true,\n            \"creationDate\":\"2016-04-17T09:53:13.567Z\"\n        },\n        {\n            \"groupId\":\"5715431edecc25ba2c0dece9\",\n            \"groupName\":\"GruppoBello\",\n            \"admin\":true,\n            \"creationDate\":\"2016-04-18T20:27:10.484Z\"\n        }\n    ],\n    \"pendingUsers\":[\n        {\n            \"userId\":\"5712bed620949b996096bb39\",\n            \"username\":\"Admin\",\n            \"creationDate\":\"2016-04-17T09:53:04.588Z\"\n        }\n    ],\n    \"blockedUsers\":[\n        {\n            \"userId\":\"5712bed620949b996096bb3a\",\n            \"username\":\"Simeone\",\n            \"creationDate\":\"2016-04-17T09:53:04.588Z\"\n        }\n    ],\n    \"contacts\":[\n        {\n            \"userId\":\"5712bed620949b996096bb3b\",\n            \"username\":\"TestUser\",\n            \"creationDate\":\"2016-04-17T09:53:04.588Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_users.js",
    "groupTitle": "users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/get-unknown-users-by-username",
    "title": "Ottiene gli utenti sconosciuti dato un username",
    "name": "get_users_by_username",
    "group": "users",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Ritorna le informazioni base di tutti gli utenti che non sono presenti nelle liste dell'utente autenticato ed il cui username comprende o corrisponde all'username fornito.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente o parte di esso.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"A\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {  \n        \"_id\": \"56ff0af75f7cfe74ab8518b6\",\n        \"username\": \"Annie\"\n    },\n    {\n        \"_id\": \"56ff0af75f7cfe74ab8518b7\",\n        \"username\": \"Admin\"\n    }    \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_users.js",
    "groupTitle": "users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/get-users-by-username",
    "title": "Ottiene gli utenti dato un username",
    "name": "get_users_by_username",
    "group": "users",
    "permission": [
      {
        "name": "Utente autenticato"
      }
    ],
    "description": "<p>Ritorna le informazioni richieste di tutti gli utenti il cui username comprende o corrisponde all'username fornito.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente o parte di esso.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fields",
            "description": "<p>Campi dell'utente da estrarre dal database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"A\",\n    \"fields\": \"username mail contacts\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Indirizzo email dell'utente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contacts",
            "description": "<p>Lista dei contatti dell'utente.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {  \n        \"_id\": \"56ff0af75f7cfe74ab8518b6\",\n        \"username\": \"Annie\",\n        \"mail\": \"annie.edison@gmail.com\",\n        \"contacts\": []\n    },\n    {\n        \"_id\": \"56ff0af75f7cfe74ab8518b7\",\n        \"username\": \"Admin\",\n        \"mail\": \"admin.admin@gmail.com\",\n        \"contacts\": []\n    }    \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_users.js",
    "groupTitle": "users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>L'utente non dispone dei permessi per effettuare l'operazione richiesta. Probabilmente non è stato fornito un token di autenticazione o il token non è valido. Questo errore può essere causato dall'utente nel caso in cui esso acceda a sezioni protette senza essersi preventivamente autenticato o convalidato.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>La richiesta non è valida. Probabilmente non sono stati forniti tutti i campi obbligatori o alcuni dei campi non sono validi.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\":\"Utente non autenticato\",\n    \"statusCode\":401\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BadRequest\n{\n    \"message\":\"La richiesta non ha fornito tutti i parametri obbligatori\",\n    \"statusCode\":400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "websocket in",
    "url": "'chat_message'",
    "title": "Invia un messaggio",
    "name": "chat_message_in",
    "group": "websocket",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id del destinatario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Testo del messaggio.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "attachments",
            "description": "<p>Allegati al messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"recipientId\":\"570e8cc9704741d81675aaa1\",\n    \"recipientName\":\"Simeone\",\n    \"body\":\"Ciao!\",\n    \"attachments\":[\n        {\n            \"fileName\":\"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c\",\n            \"originalFileName\":\"documento.pdf\",\n            \"mime\":\"application/pdf\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'chat_message'",
    "title": "Riceve un messaggio",
    "name": "chat_message_out",
    "group": "websocket",
    "permission": [
      {
        "name": "Utente convalidato"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id del messaggio.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id del mittente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>Username del mittente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id del destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipientName",
            "description": "<p>Username del destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Data dell'arrivo del messaggio su server.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "seen",
            "description": "<p>Flag che identifica se il messaggio è stato scaricato dal destinatario.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>Testo del messaggio.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "attachments",
            "description": "<p>Allegati al messaggio.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"_id\":\"56f95f5e2db9d554089b0947\",\n    \"senderId\":\"570e8cc9704766e65675aff6\",\n    \"senderName\":\"Admin\",\n    \"recipientId\":\"570e8cc9704741d81675aaa1\",\n    \"recipientName\":\"Simeone\",\n    \"date\":\"2016-04-12T22:18:23.147Z\",\n    \"seen\":\"false\",\n    \"body\":\"Ciao!\",\n    \"attachments\":[\n        {\n            \"fileName\":\"570acd621edcda09165a71431067a8862bb94e97858d4e464c8e6d5c\",\n            \"originalFileName\":\"documento.pdf\",\n            \"mime\":\"application/pdf\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'new_blocked_user'",
    "title": "Nuovo utente bloccato",
    "name": "new_blocked_user",
    "description": "<p>Un nuovo utente bloccato è stato appena aggiunto alla lista degli utenti bloccato dell'utente autenticato.</p>",
    "group": "websocket",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente bloccato che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente bloccato che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente bloccato è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"userId\": \"56f95f5e2db9d554089b0947\",\n    \"username\":\"Admin\",\n    \"creationDate\":\"2016-04-12T22:18:23.147Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'new_contact'",
    "title": "Nuovo contatto",
    "name": "new_contact",
    "description": "<p>Un nuovo contatto è stato appena aggiunto alla lista dei contatti dell'utente autenticato.</p>",
    "group": "websocket",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id del contatto che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username del contatto che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"userId\": \"56f95f5e2db9d554089b0947\",\n    \"username\":\"Admin\",\n    \"creationDate\":\"2016-04-12T22:18:23.147Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'new_pending_user'",
    "title": "Nuovo utente in attesa",
    "name": "new_pending_user",
    "description": "<p>Un nuovo utente in attesa è stato appena aggiunto alla lista degli utenti in attesa dell'utente autenticato.</p>",
    "group": "websocket",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente in attesa che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente in attesa che è stato aggiunto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente in attesa è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"userId\": \"56f95f5e2db9d554089b0947\",\n    \"username\":\"Admin\",\n    \"creationDate\":\"2016-04-12T22:18:23.147Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'removed_blocked_user'",
    "title": "Utente bloccato rimosso",
    "name": "removed_blocked_user",
    "description": "<p>Un utente bloccato è stato appena rimosso alla lista degli utenti bloccato dell'utente autenticato.</p>",
    "group": "websocket",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente bloccato che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente bloccato che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente bloccato è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"userId\": \"56f95f5e2db9d554089b0947\",\n    \"username\":\"Admin\",\n    \"creationDate\":\"2016-04-12T22:18:23.147Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'removed_contact'",
    "title": "Contatto rimosso",
    "name": "removed_contact",
    "description": "<p>Un contatto è stato appena rimosso alla lista dei contatti dell'utente autenticato.</p>",
    "group": "websocket",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id del contatto che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username del contatto che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui il contatto è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"userId\": \"56f95f5e2db9d554089b0947\",\n    \"username\":\"Admin\",\n    \"creationDate\":\"2016-04-12T22:18:23.147Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'removed_pending_user'",
    "title": "Utente in attesa rimosso",
    "name": "removed_pending_user",
    "description": "<p>Un utente in attesa è stato appena rimosso alla lista degli utenti in attesa dell'utente autenticato.</p>",
    "group": "websocket",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Id dell'utente in attesa che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username dell'utente in attesa che è stato rimosso.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>Data in cui l'utente in attesa è stato aggiunto.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \"userId\": \"56f95f5e2db9d554089b0947\",\n    \"username\":\"Admin\",\n    \"creationDate\":\"2016-04-12T22:18:23.147Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  },
  {
    "type": "websocket out",
    "url": "'socket_error'",
    "title": "Errore nella socket",
    "name": "socket_error",
    "description": "<p>Un errore si è verificato sul server mentre stava operando in un evento che gestisce la socket corrente</p>",
    "group": "websocket",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "{\n   \"message\": \"errore\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "docs/sources/doc_websocket.js",
    "groupTitle": "websocket"
  }
] });
