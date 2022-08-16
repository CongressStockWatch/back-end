'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('invalid login'); }

  try {             
    console.log('REQ HEADERS HERE', req.headers.authorization);      // 'Basic sdhsgdjhsfgj'
    let basic = req.headers.authorization.split(' ').pop();
  
    let [username, password] = base64.decode(basic).split('.');

    req.user = await users.authenticateBasic(username, password);

    console.log('req users', req.users);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

