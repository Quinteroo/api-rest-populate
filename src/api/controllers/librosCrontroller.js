const Libro = require("../models/Libro.js")

const getLibro = async (req, res, next) => {
  try {
    const libros = await Libro.find()
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(401).json("❌ No se encontró ningún libro")
  }
}

const getLibroById = async (req, res, next) => {
  try {
    const { id } = req.params
    const libros = await Libro.findById(id)
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(401).json("❌ No se ha encontrado ningún libro por ese ID")
  }
}

const postLibro = async (req, res, next) => {
  try {
    const newLibro = new Libro(req.body)
    const libroSaved = await newLibro.save()
    return res.status(200).json(libroSaved)
  } catch (error) {
    console.error(error);
    return res.status(401).json("❌ No se ha podido guardar un nuevo libro")
  }
}

const deleteLibro = async (req, res, next) => {
  try {
    const { id } = req.params
    const libroDeleted = await Libro.findByIdAndDelete(id)
    return res.status(200).json(libroDeleted)
  } catch (error) {
    return res.status(401).json("❌ No se ha eliminado el libro")
  }
}

const putLibro = async (req, res, next) => {
  try {
    const { id } = req.params
    const newLibro = new Libro(req.body)
    newLibro._id = id
    const libroUpdated = await Libro.findByIdAndUpdate(id, newLibro, { new: true })
    return res.status(200).json(libroUpdated)
  } catch (error) {
    return res.status(401).json("❌ No se pudo actualizar el libro")
  }
}


module.exports = { getLibro, getLibroById, postLibro, putLibro, deleteLibro }