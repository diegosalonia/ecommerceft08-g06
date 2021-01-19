const { STRING, FLOAT, INTEGER, BOOLEAN, DECIMAL, BLOB } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    description: {
      type: STRING,
      allowNull: false
    },
    discount: {
      type: INTEGER,
      defaultValue: 0
    },
    featured: {
      type: BOOLEAN,
      defaultValue: false
    },
    image: {
      type: BLOB,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: DECIMAL,
      allowNull: false
    },
    rating: {
      type: FLOAT,
    },
    stock: {
      type: INTEGER,
      allowNull: false
    },
  });
};