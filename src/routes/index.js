const {Router} = require("express")
const userRoutes = require("./user.routes")
const sessionRoutes = require("./session.routes")
const transactionRoutes = require("./transaction.routes")
const walletRoutes = require("./wallet.routes")
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/transactions", transactionRoutes)
routes.use("/wallets", walletRoutes)

module.exports = routes