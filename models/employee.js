// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create a class for the Employee data that extends from Model
class Employee extends Model {}

Employee.init(
  {
    // hard-define the employee_id and set as primary key
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    role_id: {
      type: DataTypes.INTEGER
    },
    manager_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

// export this module to be used elsewhere
module.exports = Employee;