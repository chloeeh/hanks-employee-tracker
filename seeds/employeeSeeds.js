const sequelize = require('../config/connection');

const Employee = require('../models/Employee');
// TODO: look into this...second database? idk
const Role = require('../models/Role');

const employeeSeedData = require('./employeeSeedData.json');
const roleSeedData = require('./roleSeedData.json');

// Add the `async` keyword to the function `seedDatabase` to make Asynchronous.
const employeeSeedDatabase = async () => {

  // Add the `await` keyword infront of the expressions inside the `async` function.
  await sequelize.sync({ force: true });

  // Once JavaScript recogonizes the `await` keyword it waits for the promise to be fufilled before moving on.
  await Employee.bulkCreate(employeeSeedData);

  // TODO: look into this...
  await Role.bulkCreate(roleSeedData);

  process.exit(0);
};

employeeSeedDatabase();
