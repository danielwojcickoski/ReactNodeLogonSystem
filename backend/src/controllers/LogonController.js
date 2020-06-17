const database = require('../database/data.json');

const email = require('../utils/sendEmail');
const validateEmail = require('../utils/validateEmail');
const generateAuthorization = require('../utils/generateAuthorization');

module.exports = {
  async login(request, response) {
    const { user, password } = request.body;

    if (user === '' || password === '') return response.status(400).json({ error: 'MISSINGDATA' });
    else if (password.length < 8) return response.status(400).json({ error: 'WRONGPASSWORD' });

    for (databaseUser of database.accounts) {
      if (databaseUser.user === user) {
        if (databaseUser.password === password) {
          const index = database.accounts.indexOf(databaseUser);
          const userEmail = database.accounts[index].email;

          const preAuthorization = generateAuthorization();
          database.accounts[index].preAuthorization = preAuthorization;

          const confirmation = generateAuthorization();
          database.accounts[index].confirmation = confirmation;

          console.log(`User ${user} received a preAuthorization and an email confirmation`);
          await email.sendCode(userEmail, 'NoNameBet Confirmation Code', confirmation);
          return response.status(200).json({ preAuthorization: preAuthorization });
        }
        return response.status(400).json({ error: 'WRONGPASSWORD' });
      }
    }
    return response.status(400).json({ error: 'USERNOTFOUND' });
  },

  async register(request, response) {
    const { user, email, password } = request.body;

    if (user === '' || email === '' || password === '') return response.status(400).json({ error: 'MISSINGDATA' });
    else if (password.length < 8) return response.status(400).json({ error: 'SHORTPASSWORD' });
    else if (validateEmail.validateEmail(email) === false) return response.status(400).json({ error: 'INVALIDEMAIL' });

    for (databaseUser of database.accounts) {
      if (databaseUser.user === user) {
        return response.status(400).json({ error: 'USERALREADYUSED' });
      }
      if (databaseUser.email === email) {
        return response.status(400).json({ error: 'EMAILALREADYUSED' });
      }
    }

    database.accounts.push({
      user,
      password,
      email,
      preAuthorization: '',
      authorization: '',
      confirmation: ''
    });

    console.log(`New Account: ${user}`);
    return response.status(204).send();
  },

  async confirm(request, response) {
    const { user, preAuthorization, confirmation } = request.body;

    if (user === '' || confirmation === '') return response.status(400).json({ error: 'MISSINGDATA' });

    for (databaseUser of database.accounts) {
      if (databaseUser.user === user) {
        if (databaseUser.preAuthorization === preAuthorization) {
          if (databaseUser.confirmation === confirmation) {
            const index = database.accounts.indexOf(databaseUser);

            const authorization = generateAuthorization();
            database.accounts[index].authorization = authorization;

            console.log(`User ${user} made an email confirmation and received an authorization`);
            return response.status(200).json({ authorization: authorization });
          }
          return response.status(400).json({ error: 'WRONGCODE' });
        }
        return response.status(400).json({ error: 'NOTAUTHORIZED' });
      }
    }

    return response.status(400).json({ error: 'USERNOTFOUND' });
  },

  async resend(request, response) {
    const { user, preAuthorization } = request.body;

    if (user === '' || confirmation === '') return response.status(400).json({ error: 'MISSINGDATA' });

    for (databaseUser of database.accounts) {
      if (databaseUser.user === user) {
        if (databaseUser.preAuthorization === preAuthorization) {
          const index = database.accounts.indexOf(databaseUser);
          const userEmail = database.accounts[index].email;
          var confirmation;

          if (databaseUser.confirmation !== '') {
            confirmation = database.accounts[index].confirmation;
          }
          else {
            confirmation = generateAuthorization();
            database.accounts[index].confirmation = confirmation;
          }

          console.log(`Resend to user ${user} an email confirmation`);
          await email.sendCode(userEmail, 'NoNameBet Confirmation Code', confirmation);
          return response.status(200);
        }
        return response.status(400).json({ error: 'NOTAUTHORIZED' });
      }
    }
    return response.status(400).json({ error: 'USERNOTFOUND' });
  },

  async verify(request, response) {
    const { user, authorization } = request.body;
    if (user === '' || authorization === '') return response.status(400);

    for (databaseUser of database.accounts) {
      if (databaseUser.user === user) {
        if (databaseUser.authorization === authorization) {
          return response.status(200);
        }
        return response.status(400);
      }
    }
    return response.status(400);
  }
}