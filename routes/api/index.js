const router = require('express').Router();
const departments = require('./departmentRoutes');
const roles = require('./roleRoutes');
const employees = require('./employeeRoutes');

router.use('/departments', departments);
router.use('/roles', roles);
router.use('/employees', employees);

module.exports = router;