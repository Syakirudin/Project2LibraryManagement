const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBookDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: An amazing book
 *         author:
 *           type: string
 *           default: John Doe
 *       required:
 *         - title
 *         - author
 * 
 *     UpdateBookDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: An amazing book
 *         author:
 *           type: string
 *           default: John Doe
 *       required: []
 * 
 *     BookDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:              
 *           type: string
 *         author:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *       required: []
 */

const userModel = (db) => {
  return db.define("User", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false

    },
    isStaff:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }    
  },{
    hooks:{
        beforeSave: async (user) => {
    
            if (user.changed("password")) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(user.password, salt);
                user.password = hash;
            }
            }
         }  
  })
};

module.exports = { userModel };
