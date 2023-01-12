// import modules
const router = require('express').Router();
const apiRoutes = require('./api');

// use this route to access apis: departments, employees, roles
router.use('/api', apiRoutes);

// export this module so it can be used elsewhere
module.exports = router;
