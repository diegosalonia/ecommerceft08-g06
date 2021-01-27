const { INTEGER, ENUM } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('order', {
        status: {
            type: ENUM('aprobado', 'cancelado', 'pendiente', 'carrito', 'creado'),
            allowNull: false
        }
    });
};
