import prismaClient from "../../prisma";

class DetailUserService{
  async execute(user_id: string){

    //Coleta o ID do usuário e faz a busca no banco
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select:{
        id: true, 
        name: true,
        email: true
      }
    })

    //Se encontrado devolve os dados do usuário no response
    return user
  }
}

export { DetailUserService }