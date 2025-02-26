const {Router} = require("express")
const TransactionsController = require("../controllers/TransactionsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const transactionRoutes = Router()
const transactionsController = new TransactionsController()

transactionRoutes.use(ensureAuthenticated)
transactionRoutes.post("/", transactionsController.create)
transactionRoutes.delete("/:id", transactionsController.delete)
transactionRoutes.get("/", transactionsController.index)

module.exports = transactionRoutes