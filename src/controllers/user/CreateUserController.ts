//Recebe diretamente a requisição. Com ele pegamos os parâmetros da requisição e vamos chamar os serviços repassando os dados necessários

import { Request, response, Response } from "express"
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserCrontroller{
  async handle(req: Request, res: Response) {
    //Coleta os dados do body
    const { name, email, password } = req.body
    
    //Inicializa o serviço
    const createUserService = new CreateUserService()

    //Executa o serviço (cadastrar no banco, etc)
    const user = await createUserService.execute({
      name, email, password
    })

    //Retorna o valor recebido na variável user
    return res.json(user)
  }
}

export { CreateUserCrontroller }