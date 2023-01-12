// import modules, including the routers inside the api folder
const router = require('express').Router();
const departments = require('./departmentRoutes');
const roles = require('./roleRoutes');
const employees = require('./employeeRoutes');

// use these routes
router.use('/departments', departments);
router.use('/roles', roles);
router.use('/employees', employees);

// export this module so it can be used elsewhere
module.exports = router;