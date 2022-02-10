const mysql = require('mysql2');
var connection = require('./localhost/connection');

var prompt = {};

prompt.main = function (choice) {

    return new Promise(function(resolve, reject) {

        var query_str = 'USE company';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            if (choice === 'View All Departments') {
                prompt.departView();
            }
        });
    });

}

prompt.departView = function () {

    return new Promise(function(resolve, reject) {

        var query_str = 'SELECT * FROM department';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            console.log(rows);
            prompt.departDisplay(rows);
        });
    });

}

prompt.departDisplay = function (rows) {

    var department = [
        {
            id: rows[0].id,
            name: rows[0].name
        },
        {
            id: rows[1].id,
            name: rows[1].name
        },
        {
            id: rows[2].id,
            name: rows[2].name
        },
        {
            id: rows[3].id,
            name: rows[3].name
        },
        {
            id: rows[4].id,
            name: rows[4].name
        },
    ];

    console.table(department);
}

module.exports = prompt;