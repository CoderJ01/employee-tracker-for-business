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

    var departArray = [rows[0].name, rows[1].name, rows[2].name, rows[3].name, rows[4].name]
    var roleArray = [rowsR[0].title, rowsR[1].title, rowsR[2].title, rowsR[3].title, rowsR[4].title];
    var employeeArray = ['None', rowsE[0].last_name, rowsE[1].last_name, rowsE[2].last_name, rowsE[3].last_name,
                         rowsE[4].last_name];
    optionsList(department, role, employee, departArray, roleArray, employeeArray);
}




//

// // main

//



var confirmContinue = (department, role, employee, departArray, roleArray, employeeArray) => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to continue?',
        }
    ]).then(
        answer => {
            if (answer.continue === true) {
                optionsList(department, role, employee, departArray, roleArray, employeeArray);
            }
        }
    );
}

var optionsList = (department, role, employee, departArray, roleArray, employeeArray) => {

    if (!department) {
       department = [];
    }
    if (!role) {
        role = [];
    }
    if (!employee) {
        employee = [];
    }
    if (!departArray) {
        departArray = [];
    }
    if (!roleArray) {
        roleArray = [];
    }
    if (!employeeArray) {
        employeeArray = [];
    }

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
                addDepartment(department, role, employee, departArray);
            }

            if (choice === 'Add Role') {
                addRole(department, role, employee, departArray, roleArray);
            }

            if (choice === 'Add Employee') {
                addEmployee(department, role, employee, roleArray, employeeArray)
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

var addDepartment = (department, role, employee, departArray) => {

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
                mySQLaddDepart(department, role, employee, departArray, departName);
            }
        }
    );

}

var mySQLaddDepart = (department, role, employee, departArray, departName) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addDepartSecCommand(department, role, employee, departArray, departName);
        });
    });    
}

var addDepartSecCommand = (department, role, employee, departArray, departName) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'INSERT INTO department (name)' + `VALUES ('${departName}');`;
        // var query_str = `DELETE FROM department WHERE name='undefined';`

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addDepartmentThird(department, role, employee, departArray, departName, rows);
        });
    });
}

var addDepartmentThird = (department, role, employee, departArray, departName, rows) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM department;`;

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            var depart = {
                id: rows[(department.length)].id,
                name: rows[(department.length)].name
            }
            var departA = rows[(department.length)].name;
            department.push(depart);
            departArray.push(departA);
            confirmContinue(department, role, employee, departArray);
        });
    });
}

// add a role to the mySQL database

var addRole = (department, role, employee, departArray, roleArray) => {

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
            choices: departArray
        }
    ]).then(
        answer => {
            var roleName = answer.roleName;
            var salary = answer.roleSalary;
            var roleD = answer.roleDepartment;
            var depart_id = [];
            for (var i = 0; i < departArray.length; i++) {
                depart_id[i] = (i + 1);
                if (roleD === departArray[i]) {
                    depart_id = (i + 1);
                }
            }
            if (roleName && salary && roleD) {
                mySQLaddRole(department, role, employee, departArray, roleArray, roleName, salary, roleD, depart_id);
            }
        }
    );

}

var mySQLaddRole = (department, role, employee, departArray, roleArray, roleName, salary, roleD, depart_id) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addRoleSecCommand(department, role, employee, departArray, roleArray, roleName, salary, roleD, depart_id);
        });
    });    
}

var addRoleSecCommand = (department, role, employee, departArray, roleArray, roleName, salary, roleD, depart_id) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'INSERT INTO role (title, salary)' + `VALUES ('${roleName}', '${salary}');`;

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addRoleThird(department, role, employee, departArray, roleArray, roleName, salary, roleD, depart_id);
        });
    });
}

var addRoleThird = (department, role, employee, departArray, roleArray, roleName, salary, roleD, depart_id) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM role;`;

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            var position = {
                title: roleName,
                salary: salary,
                department_id: depart_id
            }
            var positionRole = roleName;
            role.push(position);
            roleArray.push(positionRole);
            confirmContinue(department, role, employee, departArray, roleArray);
        });
    });
}


// add an employee to the mySQL database

var addEmployee = (department, role, employee, roleArray, employeeArray) => {

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
            choices: roleArray
        },
        {
            type: 'list',
            name: 'managerEmploy',
            message: 'Who is the manager of the employee?',
            choices: employeeArray
        }
    ]).then(
        answer => {
            var first = answer.first;
            var last = answer.last;
            var employeeR = answer.roleEmploy;
            var leader = answer.managerEmploy;
            var leader_id = [];
            for (var i = 1; i < employeeArray.length; i++) {
                leader_id[i] = (i + 2);
                if (leader === employeeArray[i]) {
                    leader_id = (i);
                }
            }
            if (leader === employeeArray[0]) {
                leader_id = 'NULL';
            }
            console.log(leader);
            console.log(leader_id);
            if (first && last && employeeR && leader) {

            }
        }
    );
}

var mySQLaddEmployee = (department, role, employee, roleArray, employeeArray) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addEmployeeSecCommand(department, role, employee, roleArray, employeeArray);
        });
    });    
}

var addEmployeeSecCommand = (department, role, employee, roleArray, employeeArray) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'INSERT INTO employee (first_name, last_name)' + `VALUES ('${roleName}', '${salary}');`;

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            addEmployeeThird(department, role, employee, roleArray, employeeArray);
        });
    });
}

var addEmployeeThird = (department, role, employee, roleArray, employeeArray) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM role;`;

        connection.query(query_str, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            // var position = {
            //     title: roleName,
            //     salary: salary,
            //     department_id: depart_id
            // }
            // var positionRole = roleName;
            // role.push(position);
            // roleArray.push(positionRole);
            confirmContinue(department, role, employee, roleArray, employeeArray);
        });
    });
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

