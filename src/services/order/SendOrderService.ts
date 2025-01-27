import prismaClient from "../../prisma";

class SendOrderService{
  async execute({ order_id }){
    const order = await prismaClient.order.update({
      where:{
        id: order_id
      },
      data:{
        draft: false
      }
    })
    return order
  }
}

export { SendOrderService }