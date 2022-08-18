'use strict';

const SECRET = process.env.SECRET || 'congress';
const middleware = require('../src/auth/middleware/bearer');
const { db, users } = require('../src/auth/models');
const jwt = require('jsonwebtoken');

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

describe('bearer auth middleware', () => {

  const req = {};
  const res = {};
  const next = jest.fn();
  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', async () => {
      req.headers = {
        authorization: `Bearer thisIsABadToken`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalled();
        });

    });

    it('logs in a user with a proper token', async () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, SECRET);
      console.log(SECRET);
      req.headers = {
        authorization: `Bearer ${token}`,
      };
      console.log(token);

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});
