const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



/* ----------------------------------------- PROMPT THE USER ----------------------------------------- */

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
            switch (answer.action) {
                case 'View All Departments':
                    viewDepartments(connection, startPrompt);
                    break;
                case 'View All Roles':
                    createDepartment(connection, startPrompt);
                    break;
                case 'View All Employees':
                    viewRoles(connection, startPrompt);
                    break;
                case 'Add A Department':
                    createRole(connection, startPrompt);
                    break;
                case 'Add A Role':
                    updateRole(connection, startPrompt);
                    break;
                case 'Add An Employee':
                    viewAllEmployees(connection, startPrompt);
                    break;
                case "Update Employee's Role":
                    viewEmployeeDepartment(connection, startPrompt);
                    break;
                case 'QUIT':
                    connection.end();
                    break;
                default:
                    break;
            }
        });
}

// Start application
connection.connect((err) => {
    if (err) throw err;
    startPrompt();
});