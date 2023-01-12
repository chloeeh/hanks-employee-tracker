// const express = require('express');
// const routes = require('./routes');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const { viewDepartments, viewRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateRole } = require('./utils/dataOperations');

// These commented lines are not necessary since we are not using a localhost to run code.
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // turn on routes
// app.use(routes);

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });



/* ----------------------------------------- PROMPT THE USER ----------------------------------------- */

// begin user prompt by displaying a list of actions to the user
function startPrompt() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                "Update Employee's Role",
                'QUIT',
            ],
        })
        .then((answer) => {
            // based on the user's response, perform the resulting function created in dataOperations.js
            switch (answer.action) {
                case 'View All Departments':
                    viewDepartments(connection, startPrompt);
                    break;
                case 'View All Roles':
                    viewRoles(connection, startPrompt);
                    break;
                case 'View All Employees':
                    viewAllEmployees(connection, startPrompt);
                    break;
                case 'Add A Department':
                    addDepartment(connection, startPrompt);
                    break;
                case 'Add A Role':
                    addRole(connection, startPrompt);
                    break;
                case 'Add An Employee':
                    addEmployee(connection, startPrompt);
                    break;
                case "Update Employee's Role":
                    updateRole(connection, startPrompt);
                    break;
                case 'QUIT':
                    connection.end();
                    break;
                default:
                    break;
            }
        });
}

// Init application
connection.connect((err) => {
    if (err) throw err;
    startPrompt();
});