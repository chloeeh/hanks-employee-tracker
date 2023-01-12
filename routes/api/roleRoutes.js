const roleRouter = require('express').Router();
const Role = require('../../models/Role');

// to get the role data for this router, use async/await to set const roleData with all
// available data in the role table from company_db
roleRouter.get('/', async (req, res) => {
  // Store the roleData in a variable once the promise is resolved.
  try {
    const roleData = await Role.findAll();

  // Return the roleData promise inside of the JSON response
  return res.json(roleData); }
  catch(err) {
    res.status(500).json(err);
  }
});

// Updates role based on its role_id
roleRouter.put('/:role_id', async (req, res) => {
  //Calls the update method on the Role model
  const updatedRole = await Role.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      salary: req.body.salary,
      department_id: req.body.department_id,
    },
    {
      // Gets a role based on the role_id given in the request parameters
      where: {
        role_id: req.params.role_id,
      },
    }
  );
  
  res.json(updatedRole);
});

// Delete route for a role with a matching role_id
roleRouter.delete('/:role_id', async (req, res) => {
  // Looks for the role based on the role_id given in the request parameters
  const deletedRole = await Role.destroy({
    where: {
      role_id: req.params.role_id,
    },
  });
  
  res.json(deletedRole);
});

module.exports = roleRouter;
