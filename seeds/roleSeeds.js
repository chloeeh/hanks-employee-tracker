const sequelize = require('../config/connection');

const Role = require('../models/Role');
// TODO: look into this...second database? idk
const Department = require('../models/Department');

const roleSeedData = require('./roleSeedData.json');
const departmentSeedData = require('./departmentSeedData.json');

// Add the `async` keyword to the function `seedDatabase` to make Asynchronous.
const roleSeedDatabase = async () => {

  // Add the `await` keyword infront of the expressions inside the `async` function.
  await sequelize.sync({ force: true });

  // Once JavaScript recogonizes the `await` keyword it waits for the promise to be fufilled before moving on.
  await Role.bulkCreate(roleSeedData);

  // TODO: look into this...
  await Department.bulkCreate(departmentSeedData);

  process.exit(0);
};

roleSeedDatabase();
