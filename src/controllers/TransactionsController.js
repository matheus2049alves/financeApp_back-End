const knex = require("../database/knex")
const appError = require("../utils/AppError")

class TransactionsController {


  async create(request, response)  {
    const  {description, type, category, value, transaction_date} = request.body;
    const user_id = request.user.id;
    


    if (!description || !type || !category || !value || !transaction_date) {
        throw new appError("Todos os campos são obrigatórios");
    }

 
    if (!["income", "expense"].includes(type)) {
        throw new appError("O tipo da transação deve ser 'income' ou 'expense'");
    }

    if (value <= 0) {
        throw new appError("O valor da transação deve ser maior que zero");
    }

  
    const formattedDate = new Date(transaction_date);
    if (isNaN(formattedDate.getTime())) {
        throw new appError("Data da transação inválida");
    }

    const [transactionId] = await knex("transactions").insert({
        user_id,
        description,
        type,
        category,
        value,
        transaction_date: formattedDate
    });

    return response.status(201).json({ 
        id: transactionId,
        user_id, 
        description, 
        type, 
        category, 
        value, 
        transaction_date: formattedDate 
    });
  }

}

module.exports = TransactionsController;