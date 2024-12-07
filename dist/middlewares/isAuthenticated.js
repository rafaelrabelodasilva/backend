"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    //Separado o prefixo do token para que seja coletado apenas o token
    const [, token] = authToken.split(" ");
    try {
        //Validar o token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //Retorna o id do usuário
        // console.log(sub)
        //Recupera o id do token e adiciona dentro da variável user_id dentro do req
        req.user_id = sub;
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
