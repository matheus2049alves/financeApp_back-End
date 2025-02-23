const {Router} = require("express")
const UsersControllers = require("../controllers/UsersController")

const userRoutes = Router()
const usersController = new UsersControllers()

userRoutes.post("/", usersController.create)

 module.exports = userRoutes