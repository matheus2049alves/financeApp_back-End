const knex = require("../database/knex")
const appError = require("../utils/AppError")

class TransactionsController {


  async create(request, response)  {
    const  {description, type, category, value, transaction_date} = request.body;
    


    await knex("Transactions").insert({
      description,
      type,
      category,
      value,
      transaction_date
    });

    response.status(201).json({user_id, description, type, category, value, transaction_date})
  }

}