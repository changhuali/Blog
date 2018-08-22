// es6 shim
require('babel-polyfill');
// enable colorful console info
require('colors');
// enable es6 in server
require('babel-register');
// initial global var
global.__DEV__ = process.env.NODE_ENV !== 'production';
global.__SERVER__ = true;
// excute server.js
require('./src/server');
