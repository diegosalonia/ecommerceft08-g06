const { INTEGER, ENUM } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('order', {
        status: {
            type: ENUM('approved', 'canceled', 'pending', 'cart', 'created'),
            defaultValue: 'cart',
            allowNull: false
        }
    });
};
