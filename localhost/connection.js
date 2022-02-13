const mysql = require('mysql2');
const containPassword = require('../localhost/password.js');

const code = containPassword();
//const code = '';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: code,
    database: ''
});

module.exports = db;