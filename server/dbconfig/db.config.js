// ✅ Connection to PostgreSQL
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,           // required for cloud PostgreSQL
        rejectUnauthorized: false // required for Supabase/Neon
      }
    },
    logging: false               // disable SQL query logs
  }
)

export const db = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()       // creates tables automatically
    console.log("PostgreSQL connected")
  } catch(error) {
    console.log(error)
  }
}