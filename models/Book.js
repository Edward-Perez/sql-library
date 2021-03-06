'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "Title is required"
      }
    }},
    author:{
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "Author is required"
      }
    }},
    genre: DataTypes.STRING,
    year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Year is required"
        },
        isInt: {
          msg: "Numeric values only please"
        }
      }
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};