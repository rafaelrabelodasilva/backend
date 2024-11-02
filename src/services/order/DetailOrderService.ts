import prismaClient from "../../prisma";

class DetailOrderService{
  async execute({ order_id }){
    const orders = await prismaClient.item.findMany({
      where:{
        order_id: order_id
      },
      include:{
        produt: true,
        order: true
      }
    })
    return orders
  }
}

export { DetailOrderService }