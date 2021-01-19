const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category', {
    parent_id: {
        type: DataTypes.INTEGER
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
      },      
  });
};
