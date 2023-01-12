const employeeRouter = require('express').Router();
const Employee = require('../../models/Employee');

router.get('/', async (req, res) => {
  // Store the employeeData in a variable once the promise is resolved.
  try {
    const employeeData = await Employee.findAll();

  // Return the employeeData promise inside of the JSON response
  return res.json(employeeData); }
  catch(err) {
    res.status(500).json(err);
  }
});

// Updates employee based on its employeeid
router.put('/:employee_id', async (req, res) => {
  //Calls the update method on the Employee model
  const updatedEmployee = await Employee.update(
    {
      // All the fields you can update and the data attached to the request body.
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role_id: req.body.role_id,
      manager_id: req.body.manager_id,
    },
    {
      // Gets a employee based on the employee_id given in the request parameters
      where: {
        employee_id: req.params.employee_id,
      },
    }
  );
  
  res.json(updatedEmployee);
});

// Delete route for a employee with a matching employee_id
router.delete('/:employee_id', async (req, res) => {
  // Looks for the employee based on the employee_id given in the request parameters
  const deletedEmployee = await Employee.destroy({
    where: {
      employee_id: req.params.employee_id,
    },
  });
  
  res.json(deletedEmployee);
});

module.exports = employeeRouter;
