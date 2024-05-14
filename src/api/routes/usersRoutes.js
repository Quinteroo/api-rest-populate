const { isAuth } = require("../../middleware/isAuth.js")
const { getUsers, getUserById, register, login, updateUser } = require("../controllers/userController.js")
const userRoutes = require("express").Router()

userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUserById)
userRoutes.post("/register", register)
userRoutes.post("/login", login)
userRoutes.put("/:id", [isAuth], updateUser)

module.exports = userRoutes