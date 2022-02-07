const inquirer = require('inquirer');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const employeeRoutes = require('./routes/apiRoutes/employeeRoutes');

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
                addDepartment();
            }

            if (choice === 'Add Role') {
                addRole();
            }

            if (choice === 'Add Employee') {
                addEmployee();
            }

            if (choice === 'Update Employee Role') {
                updateRole();
            }

            if (choice === 'Quit') {
                
            }
        }
    );
}

optionsList();

var addDepartment = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]);

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
            name: 'roleSalary',
            message: 'What department does the role belong to?',
            choices: ['[insert array here somehow]']
        }
    ]);

}

var addEmployee = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'fisrt',
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
    ]);

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
    ]);

}