const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const { generateJwt } = require("../../util/jwt.js")


const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("favoritos")

    return res.status(200).json(users)
  } catch (error) {
    return res.status(401).json("❌ No se encontró ningún usuario")
  }
}


const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate("favoritos")
    return res.status(200).json(user)
  } catch (error) {
    return res.status(401).json("❌ No se encontró ningún usuario por ese ID")
  }
}


const register = async (req, res, next) => {
  try {

    const duplicatedUser = await User.findOne({ nombre: req.body.nombre })
    if (duplicatedUser) {
      return res.status(400).json("❌ Nombre de usuario no disponible")
    }

    const newUser = new User(req.body)
    newUser.rol = "user"
    const userSaved = await newUser.save()
    return res.status(200).json(userSaved)

  } catch (error) {
    return res.status(401).json("❌ Error en el registro")
  }
}


const login = async (req, res, next) => {
  try {

    const user = await User.findOne({ nombre: req.body.nombre })
    if (!user) {
      return res.status(400).json("❌ Usuario no existe")
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateJwt(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json("❌ Contraseña errónea")
    }

  } catch (error) {
    console.error(error)
    return res.status(401).json("❌ Error en login")
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.user._id.toString() !== id) {
      return res.status(403).json("❌ No puede modificar a otro usuario")
    }

    const oldUser = await User.findById(id)
    const newUser = new User(req.body)
    newUser._id = id
    newUser.favoritos = [...oldUser.favoritos, ...newUser.favoritos]
    const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error);
    return res.status(401).json("❌ Error en actualización de usuario")
  }
}


module.exports = { getUsers, getUserById, register, login, updateUser }