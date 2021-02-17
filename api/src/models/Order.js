const { INTEGER, ENUM } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('order', {
        status: {
            type: ENUM('approved', 'canceled', 'pending', 'cart', 'created'),
            defaultValue: 'cart',
            allowNull: false
        },
        shippingStatus: {
            type: ENUM('unitiated','processing','approved', 'cancelled'),
            defaultValue: 'unitiated',
            allowNull: false
        }
    });
};
