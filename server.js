const inquirer = require('inquirer')
var connection = require('./localhost/connection');

// //  

// // LARGE CODE CHUNK (1st): Establish tables for seed values

// // 

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
            role_id: rowsE[0].role_id,
            department: rows[0].name,
            salary: rowsR[0].salary,  
        },
        {
            title: rowsR[1].title,
            role_id: rowsE[1].role_id,
            department: rows[1].name,
            salary: rowsR[1].salary,  
        },
        {
            title: rowsR[2].title,
            role_id: rowsE[2].role_id,
            department: rows[2].name,
            salary: rowsR[2].salary,  
        },
        {
            title: rowsR[3].title,
            role_id: rowsE[3].role_id,
            department: rows[3].name,
            salary: rowsR[3].salary,  
        },
        {
            title: rowsR[4].title,
            role_id: rowsE[4].role_id,
            department: rows[4].name,
            salary: rowsR[4].salary,  
        },
    ];

    var employee = [];

    employee = [
        {
            employee_id: rowsE[0].id,
            first_name: rowsE[0].first_name,
            last_name: rowsE[0].last_name,
            title: rowsR[0].title, 
            department: rows[0].name,
            salary: rowsR[0].salary,
            manager: null 
        },
        {
            employee_id: rowsE[1].id,
            first_name: rowsE[1].first_name,
            last_name: rowsE[1].last_name,
            title: rowsR[1].title, 
            department: rows[1].name,
            salary: rowsR[1].salary,
            manager: null 
        },
        {
            employee_id: rowsE[2].id,
            first_name: rowsE[2].first_name,
            last_name: rowsE[2].last_name,
            title: rowsR[2].title, 
            department: rows[2].name,
            salary: rowsR[2].salary,
            manager: null 
        },
        {
            employee_id: rowsE[3].id,
            first_name: rowsE[3].first_name,
            last_name: rowsE[3].last_name,
            title: rowsR[3].title, 
            department: rows[3].name,
            salary: rowsR[3].salary,
            manager: null 
        }, 
        {
            employee_id: rowsE[4].id,
            first_name: rowsE[4].first_name,
            last_name: rowsE[4].last_name,
            title: rowsR[4].title, 
            department: rows[4].name,
            salary: rowsR[4].salary,
            manager: null 
        }
    ];

    var departArray = [rows[0].name, rows[1].name, rows[2].name, rows[3].name, rows[4].name]
    var roleArray = [rowsR[0].title, rowsR[1].title, rowsR[2].title, rowsR[3].title, rowsR[4].title];
    var employeeArray = ['None', rowsE[0].last_name, rowsE[1].last_name, rowsE[2].last_name, rowsE[3].last_name,
                         rowsE[4].last_name];
    optionsList(department, role, employee, departArray, roleArray, employeeArray);
}





// //  

// // LARGE CODE CHUNK (2nd): Prompt the business owner to view tables, add info, or update info

// // 

var optionsList = (department, role, employee, departArray, roleArray, employeeArray) => {

    // allow values to be pushed into the following arrays
    
    // Set 1: Table arrays
    if (!department) {
       department = []; // holds the names of the department within the business
    }
    if (!role) {
        role = [];      // holds the job titles and associated salaries within the business
    }
    if (!employee) {
        employee = [];  // holds the first and last names of the employees, as well as the employee ID of the manager               //
    }                   // if employee has no manager, then value will be displayed as null

    // Set 2: Inquirer choice arrays
    if (!departArray) {
        departArray = [];  // stores choices for 'What department does the role belong to?'
    }
    if (!roleArray) {
        roleArray = [];    // stores choices for 'What is the role of the employee?'
    }
    if (!employeeArray) {
        employeeArray = []; // stores choices for 'What is the role of the employee?'
    }

    // prompt manager for input
    inquirer.prompt([
        {
            type: 'list',
            name: 'tableChoice',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'Add Department','View All Roles', 'Add Role', 'View All Employees', 
                      'Add Employee','Update Employee Role']
        }
    ])
    .then(
        answer => {
            var choice = answer.tableChoice;

            if (choice === 'View All Departments') {
                displayDepartments(department, role, employee, departArray, roleArray, employeeArray);
            }

            if (choice === 'View All Roles') {
                displayRoles(department, role, employee, departArray, roleArray, employeeArray)
            }

            if (choice === 'View All Employees') {
                displayEmployees(department, role, employee, departArray, roleArray, employeeArray);
            }

            if (choice === 'Add Department') {
                addDepartment(department, role, employee, departArray, roleArray, employeeArray);
            }

            if (choice === 'Add Role') {
                addRole(department, role, employee, departArray, roleArray, employeeArray);
            }

            if (choice === 'Add Employee') {
                addEmployee(department, role, employee, departArray, roleArray, employeeArray)
            }

            if (choice === 'Update Employee Role') {
                updateRole(department, role, employee, departArray, roleArray, employeeArray);
            }
        }
    )
}

// display all departments from the mySQL database
var displayDepartments = (department, role, employee, departArray, roleArray, employeeArray) => {
    console.table(department);
    confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
}

// display all roles from the mySQL database
var displayRoles = (department, role, employee, departArray, roleArray, employeeArray) => {
    console.table(role);
    confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
}

// display all employees from the mySQL database
var displayEmployees = (department, role, employee, departArray, roleArray, employeeArray) => {
    console.table(employee);
    confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
}

//
// add a department to the mySQL database

var addDepartment = (department, role, employee, departArray, roleArray, employeeArray) => {

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
                mySQLaddDepart(department, role, employee, departArray, roleArray, employeeArray, departName);
            }
        }
    );

}

var mySQLaddDepart = (department, role, employee, departArray, roleArray, employeeArray, departName) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rowsP, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsP);
            addDepartSecCommand(department, role, employee, departArray, roleArray, employeeArray, departName, rowsP);
        });
    });    
}

var addDepartSecCommand = (department, role, employee, departArray, roleArray, employeeArray, departName, rowsP) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'INSERT INTO department (name)' + `VALUES ('${departName}');`;

        connection.query(query_str, function (err, rowsP, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsP);
            addDepartmentThird(department, role, employee, departArray, roleArray, employeeArray, departName, rowsP);
        });
    });
}

var addDepartmentThird = (department, role, employee, departArray, roleArray, employeeArray, departName, rowsP) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM department;`;

        connection.query(query_str, function (err, rowsP, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsP);

            // set object to contain department id and name for mySQL database
            var depart = {
                id: rowsP[(rowsP.length - 1)].id,
                name: rowsP[(rowsP.length - 1)].name
            }
            // push to department (add to table)
            department.push(depart); 

            // set parameter to contain  employee name
            var departA = rowsP[(rowsP.length - 1)].name;
            
            // push to departArray (add to array for inquirer choices)
            departArray.push(departA);

            confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
        });
    });
}

//
// add a role to the mySQL database

var addRole = (department, role, employee, departArray, roleArray, employeeArray) => {

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

            if (roleName && salary && roleD) {
                mySQLaddRole(department, role, employee, departArray, roleArray, employeeArray, roleName, salary, roleD);
            }
        }
    );

}

var mySQLaddRole = (department, role, employee, departArray, roleArray, employeeArray, roleName, salary, roleD) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rowsO, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsO);
            addRoleSecCommand(department, role, employee, departArray, roleArray, employeeArray, roleName, salary, roleD);
        });
    });    
}

var addRoleSecCommand = (department, role, employee, departArray, roleArray, employeeArray, roleName, salary, roleD) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'INSERT INTO role (title, salary)' + `VALUES ('${roleName}', '${salary}');`;

        connection.query(query_str, function (err, rowsO, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsO);
            addRoleThird(department, role, employee, departArray, roleArray, employeeArray, roleName, salary, roleD);
        });
    });
}

var addRoleThird = (department, role, employee, departArray, roleArray, employeeArray, roleName, salary, roleD) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM role;`;

        connection.query(query_str, function (err, rowsO, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsO);

            // set object to contanin values from mySQL database
            var position = {
                title: rowsO[rowsO.length - 1].title,
                role_id: rowsO[rowsO.length - 1].id,
                department: roleD,
                salary: rowsO[rowsO.length - 1].salary,
            }

            // push values to role (table addition)
            role.push(position);
      
            // set parameter to store job title
            var positionRole = roleName;
           
            // push value to roleArray (addition for inquirer choices)
            roleArray.push(positionRole);

            confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
        });
    });
}

//
// add an employee to the mySQL database

var addEmployee = (department, role, employee, departArray, roleArray, employeeArray) => {

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

            // set up department id to ensue it corresponds to the specific department selected
            var depart_id = [];
            for (var i = 0; i < roleArray.length; i++) {

                if (employeeR === roleArray[i]) {
                    depart_id = (i + 1);
                }
            }

            if (first && last && employeeR && leader) {
                mySQLaddEmployee(department, role, employee, departArray, roleArray, employeeArray, first, last, employeeR, leader, depart_id);
            }
        }
    );
}

var mySQLaddEmployee = (department, role, employee, departArray, roleArray, employeeArray, first, last, employeeR, leader, depart_id) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rowsM, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsM);
            addEmployeeSecCommand(department, role, employee, departArray, roleArray, employeeArray, first, last, employeeR, leader, depart_id);
        });
    });    
}

var addEmployeeSecCommand = (department, role, employee, departArray, roleArray, employeeArray, first, last, employeeR, leader, depart_id) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'INSERT INTO employee (first_name, last_name)' + `VALUES ('${first}', '${last}');`;

        connection.query(query_str, function (err, rowsM, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsM);
            addEmployeeThird(department, role, employee, departArray, roleArray, employeeArray, first, last, employeeR, leader, depart_id, rowsM);
        });
    });
}

var addEmployeeThird = (department, role, employee, departArray, roleArray, employeeArray, first, last, employeeR, leader, depart_id, rowsM) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM employee;`;

        connection.query(query_str, function (err, rowsM, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsM);

            // create new parameter with a more appropiate name
            var role_id = depart_id;

            // retrive department based on job ID
            // NOTE: code is feasible provided that someone switches jobs within the SAME department
            var retrieveDepart;
            for (var i = 0; i < departArray.length; i++) {
                if (role_id === i) {
                    retrieveDepart = departArray[i - 1];
                }
            }

            // link salary to job title
            var money;
            for (var i = 0; i < roleArray.length; i++) {

                if (employeeR === employee[i].title) {
                    money = employee[i].salary;
                }
            }

            // set up object to contain employess name from mySQL database
            var job = {
                employee_id: rowsM[rowsM.length - 1].id,
                first_name: rowsM[rowsM.length - 1].first_name,
                last_name: rowsM[rowsM.length - 1].last_name,
                title: employeeR,
                department: retrieveDepart,
                salary: money,
                manager: leader
            }

            // push values to employee (table addtion)
            employee.push(job);

            // set parameter to contain employee's last name
            var lastName = rowsM[rowsM.length - 1].last_name;
           
            // push value to employeeArray (inquirer prompt)
            employeeArray.push(lastName);

            confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
        });
    });
}

//
// update a role in the mySQL database

var updateRole = (department, role, employee, departArray, roleArray, employeeArray) => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'updateEmployee',
            message: 'Which employees role would you like to update?',
            choices: employeeArray
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'Which role would you like to assign the employee?',
            choices: roleArray
        }
    ]).then(
        answer => {
            var upEmploy = answer.updateEmployee;
            var upRole = answer.updateRole;

            // set up department id to ensue it corresponds to the specific department selected
            var depart_id = [];
            for (var i = 0; i < roleArray.length; i++) {

                if (upRole === roleArray[i]) {
                    depart_id = (i + 1);
                }
            }

            if (upEmploy && upRole) {
                mySQLupdateRole (department, role, employee, departArray, roleArray, employeeArray, upEmploy, upRole, depart_id)
            }
        }
    );
}


var mySQLupdateRole = (department, role, employee, departArray, roleArray, employeeArray, upEmploy, upRole, depart_id) => {
    return new Promise(function(resolve, reject) {

        var query_str = 'USE company;';

        connection.query(query_str, function (err, rowsU, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsU);
            updateSecCommand(department, role, employee, departArray, roleArray, employeeArray, upEmploy, upRole, depart_id);
        });
    });    
}

var updateSecCommand = (department, role, employee, departArray, roleArray, employeeArray, upEmploy, upRole, depart_id) => {
    return new Promise(function(resolve, reject) {
        var query_str = 'UPDATE role ' + `SET title = '${upRole}' ` + `WHERE department_id = ${depart_id};`;

        connection.query(query_str, function (err, rowsU, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsU);
            updateThird(department, role, employee, departArray, roleArray, employeeArray, upEmploy, upRole, depart_id);
        });
    });
}

var updateThird = (department, role, employee, departArray, roleArray, employeeArray, upEmploy, upRole, depart_id) => {
    return new Promise(function(resolve, reject) {

        var query_str = `SELECT * FROM employee;`;

        connection.query(query_str, function (err, rowsU, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rowsU);

            // replace job title in table
            // use loop, since console.log(rowsU) does not display job title 
            for (var i = 0; i < employee.length; i++) {

                if (upEmploy === employee[i].last_name) {
                    employee[i].title = upRole;
                }
            }
    
            confirmContinue(department, role, employee, departArray, roleArray, employeeArray);
        });
    });
}

//
// confirm wheter or not user want to continue the questionnaire 

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