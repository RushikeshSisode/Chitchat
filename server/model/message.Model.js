// ✅ Sequelize
import { DataTypes } from "sequelize"
import { sequelize } from "../dbconfig/db.config.js"
import User from "./user.Model.js"

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  text: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, { timestamps: true })

// Define relationships
Message.belongsTo(User, { as: "sender",   foreignKey: "senderId" })
Message.belongsTo(User, { as: "receiver", foreignKey: "receiverId" })

export default Message