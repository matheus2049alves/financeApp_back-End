const {Router} = require("express")
const TransactionsController = require("../controllers/TransactionsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const transactionRoutes = Router()
const transactionsController = new TransactionsController()

transactionRoutes.use(ensureAuthenticated)
transactionRoutes.post("/", transactionsController.create)

module.exports = transactionRoutes