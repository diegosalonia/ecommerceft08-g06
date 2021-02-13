const { STRING, ENUM, BOOLEAN, BIGINT } = require('sequelize');

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
        address_line1:{
            type:STRING
        },
        address_line2:{
            type:STRING
        },
        city:{
            type:STRING
        },
        state:{
            type:STRING
        },
        postal_code:{
            type:INTEGER
        },
        country:{
            type:STRING
        },
        billing_addres:{
            type:INTEGER
        },
        email_notification:{
            type:BOOLEAN
        }
    });
};
