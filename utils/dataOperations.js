/* -------------------------------------------------------------------------- */
/*                                dependencies                                */
/* -------------------------------------------------------------------------- */

import inquirer from 'inquirer';

/* -------------------------------------------------------------------------- */
/*                        view company data sql queries                       */
/* -------------------------------------------------------------------------- */


function viewDepartments(connection, startPrompt) {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function viewRoles(connection, startPrompt) {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function viewAllEmployees(connection, startPrompt) {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, role.salary, 
        department.name AS department, 
        e.first_name AS manager FROM employee LEFT 
        JOIN employee as e ON e.id = employee.manager_id 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

/* -------------------------------------------------------------------------- */
/*                           Create company sql queries                       */
/* -------------------------------------------------------------------------- */

function addDepartment(connection, startPrompt) {
    inquirer
        .prompt([
            {
                name: 'dept_name',
                type: 'input',
                // default: 'Engineering',
                message: 'Type the department you wish to create',
                validate(answer) {
                    if (answer.length < 1) {
                        return console.log('A valid department name is required.');
                    }
                    return true;
                },
            },
        ])
        .then((answer) => {
            connection.query('INSERT INTO department (name) VALUES (?)', answer.name, (err) => {
                if (err) throw err;
                console.log('Department successfully added.');
                startPrompt();
            });
        });
}


function addRole(connection, startPrompt) {
    const newRole = {};
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    // default: 'Engineer',
                    message: 'What is the role you would like to add?',
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('A valid role is required.');
                        }
                        return true;
                    },
                },
                {
                    name: 'salary',
                    type: 'input',
                    // default: '60000',
                    message: 'What is the salary of the role?',
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('A valid salary is required.');
                        }
                        return true;
                    },
                },
                {
                    name: 'name',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: 'Which department does the role belong to?',
                },
            ])
            .then((answer) => {
                newRole.title = answer.title;
                newRole.salary = answer.salary;

                // Translate manager_name to id
                connection.query(
                    'SELECT id FROM department WHERE name = ?',
                    answer.dept_name,
                    (err, departmentResults) => {
                        if (err) throw err;
                        newRole.department_id = departmentResults[0].id;
                        console.log('Adding new role: ', newRole);

                        connection.query('INSERT INTO role SET ?', newRole, (err) => {
                            if (err) throw err;
                            console.log('Role successfully added.');
                            startPrompt();
                        });
                    }
                );
            });
    });
}

function addEmployee(connection, startPrompt) {
    const newEmployee = {};
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    // Get the employees first name
                    name: 'first_name',
                    type: 'input',
                    // default: 'John',
                    message: `Employee's first name?`,
                    // Ensure an empty string is not entered
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('First name needs to be longer than one char');
                        }
                        return true;
                    },
                },
                {
                    // Get the employees last name
                    name: 'last_name',
                    type: 'input',
                    // default: 'Doe',
                    message: `Employee's last name`,
                    // Ensure an empty string is not entered
                    validate(answer) {
                        if (answer.length < 1) {
                            return console.log('First name needs to be longer than one char');
                        }
                        return true;
                    },
                },
                {
                    // Get the employees job title
                    name: 'employee_role',
                    type: 'list',
                    // Get the job titles from employee_role table
                    choices() {
                        const roleArray = [];
                        for (let i = 0; i < results.length; i++) {
                            roleArray.push(results[i].title);
                        }
                        return roleArray;
                    },
                    message: `What is the employee's role?`,
                },
            ])
            .then((answer) => {
                // Add inputs as data into newEmployee object
                newEmployee.first_name = answer.first_name;
                newEmployee.last_name = answer.last_name;

                // Get the job role id from db
                connection.query('SELECT * FROM role WHERE title = ?', answer.role, (err, jobRoleResults) => {
                    if (err) throw err;

                    newEmployee.role_id = jobRoleResults[0].id;
                });

                // Ask for manager
                connection.query('SELECT * FROM employee;', (err, managerResults) => {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: 'manager_name',
                                type: 'list',
                                choices() {
                                    const choiceArray = [];
                                    for (let i = 0; i < managerResults.length; i++) {
                                        choiceArray.push(
                                            `${managerResults[i].first_name} ${managerResults[i].last_name}`
                                        );
                                    }
                                    return choiceArray;
                                },
                                message: "Who is the employee's manager?",
                            },
                        ])
                        .then((managerAnswer) => {
                            // Translate manager_name to id
                            connection.query(
                                'SELECT id FROM employee WHERE first_name = ?',
                                managerAnswer.manager_name.split(' ')[0],
                                (err, managerIdResults) => {
                                    if (err) throw err;
                                    newEmployee.manager_id = managerIdResults[0].id;
                                    console.log('Adding new employee: ', newEmployee);

                                    connection.query('INSERT INTO employee SET ?', newEmployee, (err) => {
                                        if (err) throw err;
                                        console.log('Employee successfully added.');
                                        startPrompt();
                                    });
                                }
                            );
                        });
                });
            });
    });
}



/* -------------------------------------------------------------------------- */
/*                           Create company sql queries                       */
/* -------------------------------------------------------------------------- */




function updateRole(connection, startPrompt) {
    const employeeRoleObj = {};

    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, role.salary, 
        department.name AS department, 
        e.first_name AS manager FROM employee 
        LEFT JOIN employee AS e ON e.id = employee.manager_id 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employee.id`,
        (err, results) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'updateEmployee',
                        type: 'list',
                        choices() {
                            const choiceArray = [];
                            for (let i = 0; i < results.length; i++) {
                                choiceArray.push(`${results[i].first_name} ${results[i].last_name}`);
                            }
                            return choiceArray;
                        },
                        message: `Choose the employee who's role you'd like to update`,
                    },
                ])
                .then((answer) => {
                    employeeRoleObj.first_name = answer.updateEmployee.split(' ')[0];

                    connection.query('SELECT * FROM role', (err, roleResults) => {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    name: 'updateRole',
                                    type: 'list',
                                    choices() {
                                        const choiceArray = [];
                                        for (let i = 0; i < roleResults.length; i++) {
                                            choiceArray.push(roleResults[i].title);
                                        }
                                        return choiceArray;
                                    },
                                    message: `Please select the updated role`,
                                },
                            ])
                            .then((ans) => {
                                // Translate role to role_id
                                connection.query('SELECT * FROM role WHERE title = ?', ans.updateRole, (err, res) => {
                                    if (err) throw err;

                                    employeeRoleObj.role_id = res[0].id;

                                    connection.query(
                                        'UPDATE employee SET role_id = ? WHERE first_name = ?',
                                        [employeeRoleObj.role_id, employeeRoleObj.first_name],
                                        (err) => {
                                            if (err) throw err;
                                            console.log('Employee role successfully updated.');
                                            startPrompt();
                                        }
                                    );
                                });
                            });
                    });
                });
        }
    );
}

/* -------------------------------------------------------------------------- */
/*                            export view functions                           */
/* -------------------------------------------------------------------------- */

export { viewDepartments, viewRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateRole };
Footer