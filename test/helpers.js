
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

function request(app) {
  return chai.request(app);
}

function authHeader(token) {
  return { Authorization: 'Bearer ' + token };
}

module.exports = { request, authHeader };
