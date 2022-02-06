const inquirer = require('inquirer');

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
            console.log(answer.tableChoice);
        }
    );
}

optionsList();