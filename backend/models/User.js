'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: true,
        defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};