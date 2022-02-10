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
    
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
      
    var john = {};
    john[0] = new Person("John", "Smith");
    john[1] = new Person("Jane", "Doe");
    john[2] = new Person("Emily", "Jones");

    
    console.table(john);
    
}

module.exports = prompt;