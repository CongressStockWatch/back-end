'use strict';

const { request } = require('express');
const middleware = require('../src/auth/middleware/basic');
const { db, users } = require('../src/auth/models');
const base64 = require('base-64');

let testUsers = {
  admin: { username: 'admin', password: 'pass123', role: 'admin' },
};



beforeAll(async (done) => {
  await db.sync();
  await users.create(testUsers.admin);
  done();
});
afterAll(async (done) => {
  await db.close();
  done();
});

describe('basic auth middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {
      const basicAuthString = base64.encode('username:password');
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    it('logs in an admin user with the right credentials', () => {
      let basicAuthString = base64.encode(`${testUsers.admin.username}:${testUsers.admin.password}`);
      console.log('BASIC', basicAuthString);
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return middleware(req, res, next)
        .then(() => {
          console.log(req);
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});
