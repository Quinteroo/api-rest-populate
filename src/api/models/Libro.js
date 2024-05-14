const mongoose = require("mongoose")

const libroSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    caratula: { type: String, required: true },
    valoracion: { type: Number, required: true, min: 0, max: 5 },
    autor: { type: String, required: false },
  }, {
  timestamps: true,
  collection: "libros"
}
)

const Libro = new mongoose.model("libros", libroSchema, "libros")

module.exports = Libro