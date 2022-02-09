const inquirer = require('inquirer');

var optionsList = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'tableChoice',
            message: 'What would you like to do?',
            choices: ['View All Departments','View All Roles','View All Employees','Add Department',
            'Add Role','Add Employee','Update Employee Role', 'Quit']
        }
    ])
    .then(
        answer => {
            var choice = answer.tableChoice;

            if (choice === 'View All Departments') {
              
            }

            if (choice === 'View All Roles') {
             
            }

            if (choice === 'View All Employees') {
               
            }

            if (choice === 'Add Department') {
        
            }

            if (choice === 'Add Role') {
           
            }

            if (choice === 'Add Employee') {
           
            }

            if (choice === 'Update Employee Role') {
           
            }

            if (choice === 'Quit') {
                
            }
        }
    );
}

optionsList();

var viewAllDapartments = () => {

}

var viewAllRoles = () => {

}

var viewAllEmployees = () => {

}

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
