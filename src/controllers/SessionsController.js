const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");


class SessionsController {
    async create(req, res) {  
        const { email, password } = req.body;
        if (!email) {
            throw new AppError("Email obrigatório");
        }
        if (!password) {
            throw new AppError("Senha obrigatória");
        }
        const user = await knex("Users").where({ email }).first();
        if (!user) {
            throw new AppError("Usuário ou senha incorreta", 401);
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Usuário ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn: "1d",
        });
        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
      

 
    }
}

module.exports = SessionsController;