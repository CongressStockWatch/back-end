'use strict';

let base64 = require('base-64');

// what we want:  Basic asndfglabsdjldfvasdfj
// those characters specifically are our encoded username:password

let encodedAuthStr = `Basic ${base64.encode('HankHil12:bobby131')}`;

console.log('encodedAuthStr:', encodedAuthStr);
