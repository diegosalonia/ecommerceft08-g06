const { INTEGER, FLOAT } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define('order_line', {
        quantity: {
            type: INTEGER,
            allowNull: false
        }
    });
};
