const { INTEGER, ENUM } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('order', {
        user_id: {
            type: INTEGER,
            allowNull: false
        },
        status: {
            type: ENUM('aprobado', 'cancelado', 'pendiente', 'carrito', 'creado'),
            allowNull: false
        }
    });
};
