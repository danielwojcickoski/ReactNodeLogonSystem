const crypto = require('crypto');

module.exports = function generateAuthorization() {
  return crypto.randomBytes(6).toString('HEX');
}