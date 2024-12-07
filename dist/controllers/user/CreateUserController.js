"use strict";
//Recebe diretamente a requisição. Com ele pegamos os parâmetros da requisição e vamos chamar os serviços repassando os dados necessários
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCrontroller = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserCrontroller {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Coleta os dados do body
            const { name, email, password } = req.body;
            //Inicializa o serviço
            const createUserService = new CreateUserService_1.CreateUserService();
            //Executa o serviço (cadastrar no banco, etc)
            const user = yield createUserService.execute({
                name, email, password
            });
            //Retorna o valor recebido na variável user
            return res.json(user);
        });
    }
}
exports.CreateUserCrontroller = CreateUserCrontroller;
