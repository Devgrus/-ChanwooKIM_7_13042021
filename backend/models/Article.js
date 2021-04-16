'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};