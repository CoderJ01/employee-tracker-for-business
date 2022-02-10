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
            if (choice === 'View All Roles') {
                prompt.roleView();
            }
            if (choice === 'View All Employees') {
                prompt.employeeView();
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

prompt.roleView = function () {

    return new Promise(function(resolve, reject) {

        var query_str = 'SELECT * FROM role';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            prompt.roleDisplay(rows);
        });
    });
}

prompt.roleDisplay = function (rows) {

    var role = [
        {
            title: rows[0].title,
            salary: rows[0].salary,
            department_id: rows[0].department_id
        },
        {
            title: rows[1].title,
            salary: rows[1].salary,
            department_id: rows[1].department_id
        },
        {
            title: rows[2].title,
            salary: rows[2].salary,
            department_id: rows[2].department_id
        },
        {
            title: rows[3].title,
            salary: rows[3].salary,
            department_id: rows[3].department_id
        },
        {
            title: rows[4].title,
            salary: rows[4].salary,
            department_id: rows[4].department_id
        },
    ];

    console.table(role);
}

prompt.employeeView = function () {

    return new Promise(function(resolve, reject) {

        var query_str = 'SELECT * FROM employee';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            prompt.displayEmploy(rows);
        });
    });
}

prompt.displayEmploy = function (rows) {

    var employee = [
        {
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            role_id: rows[0].role_id,
            manager_id: rows[0].manager_id
        },
        {
            first_name: rows[1].first_name,
            last_name: rows[1].last_name,
            role_id: rows[1].role_id,
            manager_id: rows[1].manager_id
        },
        {
            first_name: rows[2].first_name,
            last_name: rows[2].last_name,
            role_id: rows[2].role_id,
            manager_id: rows[2].manager_id
        },
        {
            first_name: rows[3].first_name,
            last_name: rows[3].last_name,
            role_id: rows[3].role_id,
            manager_id: rows[3].manager_id
        },
        {
            first_name: rows[4].first_name,
            last_name: rows[4].last_name,
            role_id: rows[4].role_id,
            manager_id: rows[4].manager_id
        },
    ];

    console.table(employee);
}
