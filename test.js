'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var should = require('chai').should();
require('dotenv').config();
var testharness = require('auth0-custom-db-testharness');


// Can be whatever you need for your scripts..
var configuration = {
  DATABASE_NAME: 'PET_STORE'
};

var params = {
  timeout: 5,
  ca: '',
  tenant: process.env.AUTH0_TENANT,
  url: process.env.SANDBOX_URL,
  token: process.env.WEBTASK_TOKEN
};


describe('auth0-custom-db-testharness', function () {


  it('should login user with email and password', function (done) {

    var loginScript = fs.readFileSync('./db-scripts/login.js', 'utf8');

    var user = {
      email: "richard.seldon@auth0.com",
      password: "pwd"
    };

    var callback = function (err, user) {
      console.log('user: ', user);
      should.not.exist(err);
      expect(user.user_id).to.equal(1);
      expect(user.nickname).to.equal('arcseldon');
      expect(user.email).to.equal('richard.seldon@auth0.com');
      user.user_metadata = user.user_metadata || {};
      expect(user.user_metadata.account_number).to.equal('12345');
      done();
    };

    testharness(params).loginByEmail(loginScript, configuration, user, callback);

  });


  it('should login user with username and password', function (done) {

    var loginScript = fs.readFileSync('./db-scripts/login.js', 'utf8');

    var user = {
      username: 'arcseldon',
      password: "pwd"
    };

    var callback = function (err, user) {
      console.log('user: ', user);
      should.not.exist(err);
      expect(user.user_id).to.equal(1);
      expect(user.nickname).to.equal('arcseldon');
      expect(user.email).to.equal('richard.seldon@auth0.com');
      user.user_metadata = user.user_metadata || {};
      expect(user.user_metadata.account_number).to.equal('12345');
      done();
    };

    testharness(params).loginByUsername(loginScript, configuration, user, callback);

  });


  it('should create user', function (done) {

    var createScript = fs.readFileSync('./db-scripts/create.js', 'utf8');

    var user = {
      "email": "arcseldon+test@gmail.com",
      "password": "pwd"
    };

    var callback = function (err, response) {
      should.not.exist(err);
      console.log('response: ', response);
      expect(response.email).to.equal(user.email);
      done();
    };

    testharness(params).create(createScript, configuration, user, callback);

  });


  it('should verify user email', function (done) {

    var verifyScript = fs.readFileSync('./db-scripts/verify.js', 'utf8');

    var user = {
      "email": "richard.seldon@auth0.com",
    };

    var callback = function (err, response) {
      should.not.exist(err);
      console.log('response: ', response);
      expect(response).to.be.true;
      done();
    };

    testharness(params).verify(verifyScript, configuration, user, callback);

  });


  it('should change password for user', function (done) {

    // example where we increase timeout threshold for testcase
    this.timeout(5000);

    var user = {
      "email": "richard.seldon@auth0.com",
      "password": "supersecret"
    };

    var changePasswordScript = fs.readFileSync('./db-scripts/changepassword.js', 'utf8');

    var callback = function (err, response) {
      console.log('response: ', response);
      should.not.exist(err);
      expect(response).to.be.true;
      done();
    };

    testharness(params).changePassword(changePasswordScript, configuration, user, callback);

  });


  it('should get user by email', function (done) {

    var getUserScript = fs.readFileSync('./db-scripts/getuser.js', 'utf8');

    var user = {
      "email": "richard.seldon@auth0.com"
    };

    var callback = function (err, user) {
      should.not.exist(err);
      console.log('user: ', user);
      expect(user.user_id).to.equal(1);
      expect(user.email).to.equal('richard.seldon@auth0.com');
      done();
    };

    testharness(params).getUser(getUserScript, configuration, user, callback);

  });


  it('should delete user by id', function (done) {

    var deleteScript = fs.readFileSync('./db-scripts/delete.js', 'utf8');

    var user = {
      "id": 1
    };

    var callback = function (err, response) {
      should.not.exist(err);
      console.log('response: ', response);
      expect(response).to.be.true;
      done();
    };

    testharness(params).deleteUser(deleteScript, configuration, user, callback);

  });


});