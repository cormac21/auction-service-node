'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserPermission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPermission',
  });
  return UserPermission;
};