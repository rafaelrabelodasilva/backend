import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile } from "express-fileupload";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, description, category_id } = request.body
    const createProductService = new CreateProductService()

    console.log(request.files)

    //Verifica se o usuário enviou uma imagem
    //O request.files sempre retorna um array arquivos mesmo sendo apenas 1 arquivo
    if (!request.files || Object.keys(request.files).length === 0) {
      throw new Error("Error upload file image")
    } else {
      //Em caso positivo envia para a API do cloudinary
      const file: UploadedFile = request.files['file']

      const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function (error, result) {
          if(error) {
            reject(error)
            return
          }
          resolve(result)
        }).end(file.data)
      })

      console.log(resultFile)


      const product = await createProductService.execute({
        name,
        price,
        description,
        banner: resultFile.url,
        category_id
      })
      return response.json(product)
    }
  }
}

// class CreateProductController {
//   async handle(req: Request, res: Response) {
//     const { name, price, description, category_id } = req.body
//     const createProductService = new CreateProductService()

//     if (!req.file) {
//       throw new Error("Error upload file")
//     } else {
//       const { originalname, filename: banner } = req.file

//       const product = await createProductService.execute({
//         name,
//         price,
//         description,
//         banner,
//         category_id
//       })
//       return res.json(product)
//     }
//   }
// }

export { CreateProductController }