const { isAuth } = require("../../middleware/isAuth.js")
const { getLibro, getLibroById, postLibro, putLibro, deleteLibro } = require("../controllers/librosCrontroller.js")
const librosRouter = require("express").Router()

librosRouter.get("/:id", getLibroById)
librosRouter.get("/", getLibro)
librosRouter.post("/", [isAuth], postLibro)
librosRouter.put("/:id", [isAuth], putLibro)
librosRouter.delete("/:id", [isAuth], deleteLibro)

module.exports = librosRouter