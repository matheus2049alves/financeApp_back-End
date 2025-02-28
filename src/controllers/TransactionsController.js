const knex = require("../database/knex")
const appError = require("../utils/AppError")
const { format } = require("date-fns")
class TransactionsController {


  async create(request, response)  {
    const  {description, type, category, value, transaction_date, wallet_id} = request.body;
    const user_id = request.user.id;
    let transactionId;


    if (!type || !category || !value || !transaction_date) {
        throw new appError("insira os campos obrigatórios");
    }

 
    if (!wallet_id) {
        throw new appError("A carteira é obrigatória");
    }
    
    if (!["income", "expense"].includes(type)) {
        throw new appError("O tipo da transação deve ser 'income' ou 'expense'");
    }

    if (value <= 0) {
        throw new appError("O valor da transação deve ser maior que zero");
    }

    // Verificar se a carteira existe e pertence ao usuário
    const wallet = await knex("wallets").where({ id: wallet_id, user_id }).first();
    if (!wallet) {
        throw new appError("A carteira não existe ou não pertence ao usuário");
    }

  
    const formattedDate = new Date(transaction_date);
    if (isNaN(formattedDate.getTime())) {
        throw new appError("Data da transação inválida");
    }

    await knex.transaction(async (trx) => {
      // Inserir a transação
      const [id] = await trx("transactions").insert({
        user_id,
        wallet_id,
        description,
        type,
        category,
        value,
        transaction_date: formattedDate
      });
      transactionId = id;
      // Atualizar o saldo da carteira
      if (type === "income") {
        await trx("wallets").where({ id: wallet_id }).increment("balance", value);
      } else {
        await trx("wallets").where({ id: wallet_id }).decrement("balance", value);
      }
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

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const transaction = await knex("transactions")
      .where({ id, user_id })
      .first();

    if (!transaction) {
      throw new AppError("Transação não encontrada", 404);
    }

    await knex("transactions")
      .where({ id, user_id })
      .del();

    return response.status(204).send();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const transactions = await knex("transactions")
      .where({ user_id })
      .orderBy("transaction_date", "desc");

     // Formatando as datas para DD/MM/YYYY
     const formattedTransactions = transactions.map(transaction => ({
        ...transaction,
        transaction_date: format(new Date(transaction.transaction_date), "dd/MM/yyyy")
    }));

    // Calculando saldo total do usuário
    const income = await knex("transactions").where({ user_id, type: "income" }).sum("value as total");
    const expense = await knex("transactions").where({ user_id, type: "expense" }).sum("value as total");
    const balance = (income[0].total || 0) - (expense[0].total || 0);

    return response.status(200).json(
        { transactions: formattedTransactions, 
            
            balance,
            total_transactions: transactions.length,
            total_income: income[0].total || 0,
            total_expense: expense[0].total || 0
        }
    );
  }

}


module.exports = TransactionsController