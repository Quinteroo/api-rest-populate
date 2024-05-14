const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("✅ Conectado a la BBDD");
  } catch (error) {
    console.error("❌ Error en la conexión a BBDD");
    console.log(error);
  }

}

module.exports = { connectDB }