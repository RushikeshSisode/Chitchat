// ✅ Sequelize
import { DataTypes } from "sequelize"
import { sequelize } from "../dbconfig/db.config.js"

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ""
  }
}, {
  timestamps: true  // adds createdAt and updatedAt automatically
})

export default User