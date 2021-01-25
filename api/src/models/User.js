const { STRING, INTEGER, ENUM, BOOLEAN, BIGINT } = require('sequelize');

module.exports = (sequlize) => {
    sequlize.define('user',{
        email:{
            type: STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password:{
            type: STRING,
            allowNull: false
        },
        first_name:{
            type: STRING,
            allowNull: false
        },
        last_name:{
            type:STRING,
            allowNull: false   
        },
        phone_number:{
            type: BIGINT,
            allowNull:false
        },
        user_role:{
            type: ENUM("admin", "user"),
            allowNull:false,
            defaultValue: "user"
        },
        shipping_address:{
            type:INTEGER
        },
        billing_addres:{
            type:INTEGER
        },
        email_notification:{
            type:BOOLEAN
        }
    });
};
