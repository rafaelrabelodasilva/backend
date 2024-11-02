import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController{
  async handle(req: Request, res: Response){

    //Coleta o ID do usuário
    const user_id = req.user_id

    //Chama o serviço passando o ID do usuário e realiza o execute
    const detailUserService = new DetailUserService
    const user = await detailUserService.execute(user_id)

    return res.json(user)
  }
}

export { DetailUserController }