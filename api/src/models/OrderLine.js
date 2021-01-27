const { INTEGER, FLOAT, STRING } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define('order_line', {
        quantity: {
            type: INTEGER,
            allowNull: false
        },
        price:{
            type: FLOAT,
            allowNull: false
        }
    });
};
