const sequelize = require('../config/connection');

const Department = require('../models/Department');


const departmentSeedData = require('./departmentSeedData.json');

// Add the `async` keyword to the function `seedDatabase` to make Asynchronous.
const departmentSeedDatabase = async () => {

  // Add the `await` keyword infront of the expressions inside the `async` function.
  await sequelize.sync({ force: true });

  // Once JavaScript recogonizes the `await` keyword it waits for the promise to be fufilled before moving on.
  await Department.bulkCreate(departmentSeedData);

  process.exit(0);
};

departmentSeedDatabase();
