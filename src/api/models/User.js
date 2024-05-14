const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, required: true, enam: ["user", "admin"] },
    favoritos: [{ type: mongoose.Types.ObjectId, required: false, ref: "libros" }],
  }, {
  timestamps: true,
  collection: "users"
}
)

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = new mongoose.model("users", userSchema, "users")
module.exports = User