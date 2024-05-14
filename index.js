const express = require('express')
const mongoose = require("mongoose")
const { connectDB } = require("./src/config/connectDB.js")
const librosRouter = require("./src/api/routes/librosRoutes.js")
const userRouter = require("./src/api/routes/usersRoutes.js")
const cors = require("cors")


const app = express()
app.use(express.json())

app.use(cors())

connectDB()

app.use("/api/v1/libros", librosRouter)
app.use("/api/v1/users", userRouter)

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found 🥵")
})

app.listen(4000, () => {
  console.log("✅ Servidor levantado en puerto 4000");
})