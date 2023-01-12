// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create a class for the Department data that extends from Model
class Department extends Model {}

Department.init(
  {
    // hard-define the department_id and set as primary key
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department'
  }
);

// export this module to be used elsewhere
module.exports = Department;