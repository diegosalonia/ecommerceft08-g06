const { STRING, ENUM, BOOLEAN, BIGINT, DATE } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user',{
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
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt:{
            type: STRING,
            get() {
                return() => this.getDataValue('salt')
            }
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
            type: BIGINT
        },
        active:{
            type: ENUM("true","false"),
            defaultValue: "true"
        },
        user_role:{
            type: ENUM("admin", "user"),
            allowNull:false,
            defaultValue: "user"
        },
        shipping_address:{
            type:STRING
        },
        billing_address:{
            type:STRING
        },
        email_notification:{
            type:BOOLEAN
        },
        verifyCode:{
            type: BIGINT
        },
        verifyCodeExpireDate:{
            type: DATE
        }
    });
};
