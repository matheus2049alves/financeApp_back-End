
const appError = require("../utils/AppError")

class UsersControllers {
  
  create(request, response)  {
    const  {name, email} = request.body;

    if(!name){
      throw new appError("nome obrigatorio")
    }
    if(!email){
      throw new appError("email obrigatorio")
    }
    response.status(201).json({name, email})
  }
}

module.exports = UsersControllers