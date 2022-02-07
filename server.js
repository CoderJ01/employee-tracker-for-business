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
            console.log(answer.tableChoice);

            if (answer.tableChoice === 'View All Departments') {

            }

            if (answer.tableChoice === 'View All Roles') {
                
            }

            if (answer.tableChoice === 'View All Employees') {
                
            }

            if (answer.tableChoice === 'Add Department') {
                
            }

            if (answer.tableChoice === 'Add Role') {
                
            }

            if (answer.tableChoice === 'Add Employee') {
                
            }

            if (answer.tableChoice === 'Update Employee Role') {
                
            }

            if (answer.tableChoice === 'Quit') {
                
            }
        }
    );
}

optionsList();