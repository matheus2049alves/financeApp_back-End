const knex = require("../database/knex")
const appError = require("../utils/AppError")

class WalletsController {


  async create(request, response)  {
    const  {name, balance} = request.body;
    const user_id = request.user.id;

    if(!name){
      throw new appError("nome obrigatorio")
    }
   

    const walletExists = await knex("Wallets").where({ name }).first()
    
    if (walletExists) {
      throw new appError("Carteira já cadastrada")
      
    }
    
    await knex("Wallets").insert({
      name,
      balance,
      user_id
    });

    response.status(201).json({ name, balance });
  }

  async index(request, response) {
    const user_id = request.user.id;

    const wallets = await knex("Wallets").where({ user_id });

    response.json(wallets);
  }
  
  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const wallet = await knex("Wallets").where({ id, user_id }).first();

    if (!wallet) {
      throw new appError("Carteira não encontrada");
    }

    await knex("Wallets").where({ id }).delete();

    response.status(204).send();
  }
  async update(request, response) {
    const { id } = request.params;
    const { name, balance } = request.body;
    const user_id = request.user.id;

    const wallet = await knex("Wallets").where({ id, user_id }).first();

    if (!wallet) {
      throw new appError("Carteira não encontrada");
    }

    await knex("Wallets").where({ id }).update({ name, balance });

    response.send();
  }
}


module.exports = WalletsController;