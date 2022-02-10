const inquirer = require('inquirer')
// const prompt = require('./language-link');
const mysql = require('mysql2');
var connection = require('./localhost/connection');

var confirmContinue = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to continue?',
        }
    ]).then(
        answer => {
            if (answer.continue === true) {
                optionsList();
            }
        }
    );
}

var optionsList = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'tableChoice',
            message: 'What would you like to do?',
            choices: ['View All Departments','View All Roles','View All Employees','Add Department',
            'Add Role','Add Employee','Update Employee Role']
        }
    ])
    .then(
        answer => {
            var choice = answer.tableChoice;

            if (choice === 'View All Departments') {
                prompt.main(choice);
            }

            if (choice === 'View All Roles') {
                prompt.main(choice);
            }

            if (choice === 'View All Employees') {
                prompt.main(choice);
            }

            if (choice === 'Add Department') {
                prompt.main(choice);
            }

            if (choice === 'Add Role') {
                prompt.main(choice);
            }

            if (choice === 'Add Employee') {
                prompt.main(choice);
            }

            if (choice === 'Update Employee Role') {
                prompt.main(choice);
            }
        }
    )
}

optionsList();

var addDepartment = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then(
        answer => {
            if (answer.department) {
           
            }
        }
    );

}

var addRole = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does the role belong to?',
            choices: ['[insert array here somehow]']
        }
    ]).then(
        answer => {
            if (answer.roleName && answer.roleSalary && answer.roleDepartment) {
       
            }
        }
    );

}

var addEmployee = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            name: 'roleEmploy',
            message: 'What is the role of the employee?',
            choices: ['[insert array here somehow]']
        },
        {
            type: 'list',
            name: 'managerEmploy',
            message: 'Who is the manager of the employee?',
            choices: ['None', '[insert array here somehow]']
        }
    ]).then(
        answer => {
            if (answer.first && answer.last && answer.roleEmploy && answer.managerEmploy) {

            }
        }
    );

}

var updateRole = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'updateEmployee',
            message: 'Which employees role would you like to update?',
            choices: ['[array]']
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'Which role would you like to assign the employee?',
            choices: ['[array]']
        }
    ]).then(
        answer => {
            if (answer.updateEmployee && answer.updateRole) {
             
            }
        }
    );
}

//

// // links

// 

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
    confirmContinue();
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
    confirmContinue();
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
    confirmContinue();
}



