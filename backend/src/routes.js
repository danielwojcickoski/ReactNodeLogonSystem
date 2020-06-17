const express = require('express');

const LogonController = require('./controllers/LogonController');

const routes = express.Router();

//Logon
routes.post('/logon', LogonController.login);
routes.post('/logon/register', LogonController.register);
routes.post('/logon/confirmation', LogonController.confirm);
routes.post('/logon/verifyauth', LogonController.verify);
routes.post('/logon/resendcode', LogonController.resend);

module.exports = routes;