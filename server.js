const inquirer = require('inquirer')
// const prompt = require('./language-link');
const mysql = require('mysql2');
var connection = require('./localhost/connection');

// 

// // seed 

//

var tableSeeds = () => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            seedsDepart();
        });
    });    
}

tableSeeds();

var seedsDepart = () => {
    return new Promise(function(resolve, reject) {

        var query_str = 'SELECT * FROM department';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            seedsDisplayD(rows);
        });
    });
}

var seedsDisplayD = (rows) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company';

        connection.query(query_str, function (err, rowsR, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsR);
            seedsRole(rows);
        });
    });    
} 

var seedsRole = (rows) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'SELECT * FROM role';

        connection.query(query_str, function (err, rowsR, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsR);
            seedsDisplayR(rows, rowsR);
        });
    });
}

var seedsDisplayR = (rows, rowsR) => {

    return new Promise(function(resolve, reject) {

        var query_str = 'USE company';

        connection.query(query_str, function (err, rowsD, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsD);
            employRole(rows, rowsR);
        });
    });    
}

var employRole = (rows, rowsR) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'SELECT * FROM employee';

        connection.query(query_str, function (err, rowsE, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsE);
            displayAllThree(rows, rowsR, rowsE);
        });
    });
}

var displayAllThree = (rows, rowsR, rowsE) => {

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

    var role = [
        {
            title: rowsR[0].title,
            salary: rowsR[0].salary,
            department_id: rowsR[0].department_id
        },
        {
            title: rowsR[1].title,
            salary: rowsR[1].salary,
            department_id: rowsR[1].department_id
        },
        {
            title: rowsR[2].title,
            salary: rowsR[2].salary,
            department_id: rowsR[2].department_id
        },
        {
            title: rowsR[3].title,
            salary: rowsR[3].salary,
            department_id: rowsR[3].department_id
        },
        {
            title: rowsR[4].title,
            salary: rowsR[4].salary,
            department_id: rowsR[4].department_id
        },
    ];

    var employee = [
        {
            first_name: rowsE[0].first_name,
            last_name: rowsE[0].last_name,
            role_id: rowsE[0].role_id,
            manager_id: rowsE[0].manager_id
        },
        {
            first_name: rowsE[1].first_name,
            last_name: rowsE[1].last_name,
            role_id: rowsE[1].role_id,
            manager_id: rowsE[1].manager_id
        },
        {
            first_name: rowsE[2].first_name,
            last_name: rowsE[2].last_name,
            role_id: rowsE[2].role_id,
            manager_id: rowsE[2].manager_id
        },
        {
            first_name: rowsE[3].first_name,
            last_name: rowsE[3].last_name,
            role_id: rowsE[3].role_id,
            manager_id: rowsE[3].manager_id
        },
        {
            first_name: rowsE[4].first_name,
            last_name: rowsE[4].last_name,
            role_id: rowsE[4].role_id,
            manager_id: rowsE[4].manager_id
        },
    ];

    optionsList(department, role, employee);
}




//

// // main

//



var confirmContinue = (department, role, employee) => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to continue?',
        }
    ]).then(
        answer => {
            if (answer.continue === true) {
                optionsList(department, role, employee);
            }
        }
    );
}

var optionsList = (department, role, employee) => {

    if (!department) {
       department = [];
    }
    if (!role) {
        role = [];
    }
    if (!employee) {
        employee = [];
    }

    // console.log(department);

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
                displayDepartments(department, role, employee);
            }

            if (choice === 'View All Roles') {
                displayRoles(department, role, employee)
            }

            if (choice === 'View All Employees') {
                displayEmployees(department, role, employee);
            }

            if (choice === 'Add Department') {
                addDepartment(department, role, employee);
            }

            if (choice === 'Add Role') {
                addRole(department, role, employee);
            }

            if (choice === 'Add Employee') {
                addEmployee(department, role, employee)
            }

            if (choice === 'Update Employee Role') {
                updateRole(department, role, employee);
            }
        }
    )
}

// display all departments in the mySQL database
var displayDepartments = (department, role, employee) => {
    console.table(department);
    confirmContinue(department, role, employee);
}

// display all roles in the mySQL database
var displayRoles = (department, role, employee) => {
    console.table(role);
    confirmContinue(department, role, employee);
}

// display all employees in the mySQL database
var displayEmployees = (department, role, employee) => {
    console.table(employee);
    confirmContinue(department, role, employee);
}

// add a department to the mySQL database

var addDepartment = (department, role, employee) => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then(
        answer => {
            var departName = answer.department;
            if (departName) {
                mySQLaddDepart(department, role, employee, departName);
            }
        }
    );

}

var mySQLaddDepart = (department, role, employee, departName) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addDepartSecCommand(department, role, employee, departName);
        });
    });    
}

var addDepartSecCommand = (department, role, employee, departName) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'INSERT INTO department (name)' + `VALUES ('${departName}');`;
        // var query_str = `DELETE FROM department WHERE name='undefined';`

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addDepartmentThird(department, role, employee, departName, rows);
        });
    });
}

var addDepartmentThird = (department, role, employee, departName, rows) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM department;`;

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            let depart = {
                id: rows[(department.length)].id,
                name: rows[(department.length)].name
            }
            console.log(department);
            console.log(depart);
            department.push(depart);
            confirmContinue(department, role, employee);
        });
    });
}

// add a role to the mySQL database

var addRole = (department, role, employee) => {

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

// add an employee to the mySQL database

var addEmployee = (department, role, employee) => {

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

// update a role in the mySQL database

var updateRole = (department, role, employee) => {

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

