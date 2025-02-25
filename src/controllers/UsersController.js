const knex = require("../database/knex")
const appError = require("../utils/AppError")
const {hash} = require("bcryptjs")
class UsersControllers {
  
  async create(request, response)  {
    const  {name, email, password} = request.body;

    if(!name){
      throw new appError("nome obrigatorio")
    }
    if(!email){
      throw new appError("email obrigatorio")
    }
    if(!password){
      throw new appError("password obrigatorio")
    }

    const hashPassword = await hash(password, 8)
    const userExists = await knex("Users").where({email}).first()
    
    if(userExists){
      throw new appError("Email já cadastrado")
      
    }
    
    await knex("Users").insert({
      username: name,
      email,
      password: hashPassword
    });

    response.status(201).json({name, email})
  }
}

module.exports = UsersControllers