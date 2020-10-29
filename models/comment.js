'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.article)


    // models.article.belongsTo(models.author)
    // Go ahead and associate your new comments model and the existing article model 
    // in a similar fashion. This is a one to many relationship. 
    // One article can have many comments,
    // but each comment belongs to a single article.
    }
  };
  comment.init({
    firstName: DataTypes.STRING,
    context: DataTypes.TEXT,
    article: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};