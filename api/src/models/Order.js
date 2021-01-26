const { INTEGER, ENUM } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('order', {
        status: {
            type: ENUM('approved', 'cancelled', 'pending', 'cart', 'created'),
            allowNull: false
        }
    });
};
