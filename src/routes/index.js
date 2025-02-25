const {Router} = require("express")
const userRoutes = require("./user.routes")
const sessionRoutes = require("./session.routes")
const routes = Router()
routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

module.exports = routes