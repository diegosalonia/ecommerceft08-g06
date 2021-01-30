const { STRING, FLOAT, INTEGER, BOOLEAN, DECIMAL, ARRAY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    description: {
      type: STRING(10000),
      allowNull: false
    },
    discount: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    featured: {
      type: BOOLEAN,
      defaultValue: false
    },
    image: {
      type: ARRAY(STRING),
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
