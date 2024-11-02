import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes'

const app = express()
app.use(express.json())
app.use(cors())//Biblioteca que libera a app para qualquer ip

app.use(router)

//MiddleWare
//http://localhost:3333/files/18f6b22f1d5e108e22ca7472a117f84b-frangocatupiry.jpeg
app.use(
  '/files',
  express.static(path.resolve(__dirname, '../', 'temp'))
)

//MiddleWare
app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    //Se for uma instância do tipo error
    return res.status(400).json({
      error: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
})

app.listen(3333, () => console.log('Servidor online!'))