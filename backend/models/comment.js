'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User)
    }
  };
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};