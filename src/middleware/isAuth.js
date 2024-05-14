const { verifyJwt } = require("../util/jwt.js")
const User = require("../api/models/User.js")

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace("Bearer ", "")
    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next()
  } catch (error) {
    console.error(error);
    return res.status(400).json("❌ No autorizado")
  }
}

module.exports = { isAuth }