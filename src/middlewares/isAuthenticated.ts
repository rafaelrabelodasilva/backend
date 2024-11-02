import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Receber o token
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  //Separado o prefixo do token para que seja coletado apenas o token
  const [, token] = authToken.split(" ")

  try {
    //Validar o token
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload
    //Retorna o id do usuário
    // console.log(sub)
    //Recupera o id do token e adiciona dentro da variável user_id dentro do req
    req.user_id = sub

    return next()
  } catch (error) {
    return res.status(401).end()
  }

}