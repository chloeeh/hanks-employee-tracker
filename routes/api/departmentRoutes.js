const departmentRouter = require('express').Router();
const Department = require('../../models/Department');

departmentRouter.get('/', async (req, res) => {
  // Store the departmentData in a variable once the promise is resolved.
  try {
    const departmentData = await Department.findAll();

  // Return the departmentData promise inside of the JSON response
  return res.json(departmentData); }
  catch(err) {
    res.status(500).json(err);
  }
});

// Updates department based on its department_id
departmentRouter.put('/:department_id', async (req, res) => {
  //Calls the update method on the Department model
  const updatedDepartment = await Department.update(
    {
      // All the fields you can update and the data attached to the request body.
      name: req.body.name,
    },
    {
      // Gets a department based on the department_id given in the request parameters
      where: {
        department_id: req.params.department_id,
      },
    }
  );
  
  res.json(updatedDepartment);
});

// Delete route for a department with a matching department_id
departmentRouter.delete('/:department_id', async (req, res) => {
  // Looks for the department based on the department_id given in the request parameters
  const deletedDepartment = await Department.destroy({
    where: {
      department_id: req.params.department_id,
    },
  });
  
  res.json(deletedDepartment);
});

module.exports = departmentRouter;
