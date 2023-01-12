const sequelize = require('../config/connection');

const Department = require('../models/Department');
const Role = require('../models/Role');
const Employee = require('../models/Employee');


const departmentSeedData = require('./departmentSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

// Add the `async` keyword to the function `seedDatabase` to make Asynchronous.
const myDatabaseSeeds = async () => {

  // Add the `await` keyword infront of the expressions inside the `async` function.
  await sequelize.sync({ force: true });

  // Once JavaScript recogonizes the `await` keyword it waits for the promise to be fufilled before moving on.
  await Department.bulkCreate(departmentSeedData);
  await Role.bulkCreate(roleSeedData);
  await Employee.bulkCreate(employeeSeedData);


  process.exit(0);
};

myDatabaseSeeds();
