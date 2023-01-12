// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create a class for the Role data that extends from Model
class Role extends Model {}

Role.init(
  {
    // hard-define the role_id and set as primary key
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.STRING
    },
    department_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
  }
);
// export this module to be used elsewhere
module.exports = Role;