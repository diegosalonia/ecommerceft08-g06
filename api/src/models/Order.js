const { INTEGER, ENUM } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('order', {
        user_id: {
            type: INTEGER,
            allowNull: false
        },
        status: {
            type: ENUM('approved', 'cancelled', 'pending', 'cart', 'created'),
            allowNull: false
        }
    });
};
