# Anotações do conteúdo do curso

Quando batemos na rota localhost:3333/users.
Chamamos o user controller que inicializa um serviço.
Este serviço fica responsável pela manipulação dos dados.

## Inicializar projeto node com yarn

Irá criar o arquivo `package.json`

Comando:
`yarn init -y`

## Adicionar o express

Comando para adicionar o express ao projeto:
`yarn add express@4.17.2`

Adicionar tipagens do express:
`yarn add @types/express@4.17.13 --dev`

## Adicionar a lib ts-node-dev para dar live reload

Para conseguirmos rodar com o typescript (como temos o import {} from ''  que não é suportado pelo nodeJS por padrão) utilizado uma biblioteca chamada ts-node-dev. 

Ele tem o live reload ajuda muito no desenvolvimento para nao ter que parar a aplicação

Comandos: 
`yarn add ts-node-dev@1.1.8 --dev`
`yarn add typescript@4.5.5 --dev`

```package.json
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
```

## Adicionar Type Script

Iniciar o typescript e cria o arquivo `tsconfig.json`

`yarn tsc --init`


## Adicionar lib express-async-errors para tratar erros da API

Biblioteca que nos ajuda com os erros

Ela SEMPRE tem que ser o segundo import do arquivo `.ts`, isso é orientação da equipe do express

`yarn add express-async-errors`


## Adicionar lib cors para liberar a aplicação para qualquer IR

Liberar para qualquer ip

`yarn add cors`
`yarn add @types/cors -D`

## Criar banco de dados

Utilizado POSTGRESQL na versão 11.22
password: admin
port: 5432

Criado banco de dados chamado `pizzaria`

## Adicionar o Prisma para interagir com o banco de dados

Adicionado prisma para interagir com o banco de dados, ORM.

`yarn add prisma`

Adicionado prisma client para termos algumas coisas como gerar migrations do banco de dados.

`yarn add @prisma/client`

Criar a configuração base do prisma

`npx prisma init`


Irá criar a pasta `prisma` e o arquivo `.env`

Alterado a configuração do .env para a que criamos
USERNAME  do postgres é postgres por padrão sempre

```.env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/pizzaria?schema=public"
```

Criado nova pasta dentro de src:

```src/prisma/index.ts
import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

export default prismaClient
```

Com ele conseguimos ter todo o acesso ao banco de dados, como deletar, inserir, atualizar, etc


## Criar schema e migration com o Prisma

Criado dentro do arquivo `prisma/schema.prisma`

Link documentação:
https://www.prisma.io/docs/orm/prisma-schema/overview

Rodar o comando abaixo para criar o migration:
`yarn prisma migrate dev`

Dado um nome ao migration, nom eu caso coloquei:
`create-table-users`

## Criptografar as senhas do usuário com a biblioteca bcryptjs

Instalar biblioteca para criptografar as senhas dos usuários:
`yarn add bcryptjs`
`yarn add @types/bcryptjs -D`

No service `CreateUserService` foi importado o bcrypt

Antes de salvar no banco foi criado uma constante `passwordHas`
Passando a senha que será criptografada e o salto (número da criptografia).
Ao submeter o post será salvo no banco criptografada

```CreateUserService.ts
import { hash } from "bcryptjs"
const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: passwordHash 
      }, 
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true
      }
    })
```

## Adicionar a lib jsonwebtoken e dotnet para gerar o token da sessão

Gerar um token JWT e devolver os dados do usuário como id, name, email
Quando precisamos autenticar usuário em aplicações rest (trafegadas em JSON). JSON WEB TOKEN (JWT) ajuda na parte de segurança para trafegar essas informações, para garatir que a pessoa utilizando a aplicação realmente é ela.

Quando batermos na rota `/session` com os dados para login o JWT devolve um token de acesso.

Ele vai ser importante porque temos requisições privadas que somente um determinado usuário poderá ver as informações.

Instalar a biblioteca:
`yarn add jsonwebtoken`
`yarn add @types/jsonwebtoken -D`


No service adicionado o método `sign()`, que espera um payload (o que queremos que tenha dentro do token) e uma secretKey (não pode ser passada a ninguém) e como não é interessante deixar hardcoded usamos ela em hash e adicionamos nas variáveis de ambiente (.env).

No site abaixo informamos a senha projeto-meu-produto-app e foi convertido para MD5 Hash.

Link: https://www.md5hashgenerator.com/

`af55b42e1a01dab7a697d3bd7c577a05`

Mesmo que já venha com o Prisma é interessante adicionar a biblioteca `.env` para acessarmos as variáveis de ambiente que estão dentro do arquivo `.env`

Comando:
`yarn add dotenv`

```AuthUserService.ts
import { sign } from "jsonwebtoken"

    const token = sign(
      {
        firstName: user.first_name,
        lastName: user.last_name
      },
      process.env.JWT_SECRET, //Foi ajustado o tsconfig para parar de dar erro de que essa variável pode ser undefined
      {
        subject: user.id, //ID do usuário
        expiresIn: '30d' //Quando vai expirar o token
      })

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      token: token
    }

```

```tsconfig.json
"strict": false,                                      /* Enable all strict type-checking 
```

```.env
JWT_SECRET="af55b42e1a01dab7a697d3bd7c577a05"
```

Ao acessar a url `https://jwt.io/` e informarmos o token do response podemos ver todos os dados do header, payload e verify signature.


## Adicionar middleware para validar o token durante a troca de rotas privadas

O middleware criado `src/middlewares/isAuthenticated.ts` serve para todas as rotas que o usuário só pode acessar se estiver autenticado, e estando autenticado o usuário pode ter acesso a criar registros, ver informações sensíveis, etc. Como dentro do `Request` temos acesso ao body, headers também "injetamos" dentro dele o ID do usuário.

```isAuthenticated.ts
  try {
    //Validar o token
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload

    console.log(sub)
    req.user_id = sub //variável injetada dentro do Request

    return next()
  }
```

Quando adicionamos apresentou erro pois o type Script não espera receber essa variável dentro do Request:
```
Property 'user_id' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'
```

Então criamos uma pasta chamada `@types` com a tipagem da variável `req.user_id` utilizada no arquivo `src/middlewares/isAuthenticated.ts` porque queremos passar no request o user_id que consequentemente estará dentro do token. 

```src/@types/express/index.ts
declare namespace Express{
  export interface Request{
    user_id: string
  }
}
```

Também no arquivo tsconfig foi descomentado a linha 34 e adicionado o caminho da criação da nova variável

Como estava:
```tsconfig.json
// "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
```

Como ficou:
```tsconfig.json
"typeRoots": [
  "./src/@types"                                     /* Specify multiple folders that act like './node_modules/@types'. */
], 
```

//Multer 
Biblioteca para trabalhar com imagens no projeto pois não salvamos ela de fato no banco, apenas o nome dela

yarn add multer
yarn add @types/multer -D


## Storage para upload de imagens (cloudinary)

Utilizado cloudinary porque é grátis

https://cloudinary.com/
https://cloudinary.com/documentation/image_upload_api_reference

![alt text](image.png)

![alt text](image-2.png)

Adicionado as configurações no arquivo .env

```
# Cloudnary
CLOUDINARY_NAME=dx6c59t...Z
CLOUDINARY_KEY=556558661966...Z
CLOUDINARY_SECRET=c8ge2dFeYtdMdpRT7mh5thHJ...Z
```

Instalado a lib cloudinary

`npm install cloudinary`

Adicionado lib auxiliar para realizar upload

`npm i express-fileupload`
`npm install --save-dev @types/express-fileupload`

https://www.npmjs.com/package/express-fileupload

Configuração dentro do projeto backend

```server.ts
import fileUpload from 'express-fileupload'

[...]
app.use(router)
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024} //Recebe no máx 50mb
}))

```

Removido a função do multer de upload do arquivo

```routes.ts
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.post('/product', isAuthenticated, new CreateProductController().handle)
```

```CreateProductController.ts
[...]
import { UploadedFile } from "express-fileupload";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController {
[...]
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
```

![alt text](image-1.png)

## Deploy da api

Foi feito pelo vercel

Comando "build" vai gerar os arquivos ts em javascript.
Comando "start" vai iniciar a aplicação após o build

```package.json
  "scripts": {
    "dev": "ts-node-dev src/server.ts",
    "build": "tsc --build",
    "start": "node dist/server.js"
  },
```
Informado aonde será gerado o build do projeto
```tsconfig.json
    "outDir": "./dist", 
```

Para gerar os arquivos estáticos (pasta dist). Terá toda a estrutura do projeto porém em js
`npm run buld`

Para iniciar o servidor:
`npm run start`

Preparar para fazer deploy

Adicionado variável de ambiente:
```.env
# Porta do servidor
PORT=3333
```

Criado configuração do versel

```versel.json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@versel/node",
      "config": { "includeFiles": ["dist/**"] }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

Adicionado 2 scritps: versel-build e prisma:generate
```package.json
  "scripts": {
    "dev": "ts-node-dev src/server.ts",
    "build": "tsc --build",
    "start": "node dist/server.js",
    "versel-build": "prisma generate && prisma migrate deploy",
    "prisma:generate": "prisma generate"
  },

```

# FRONT

Rodado o comando abaixo para inicializar o projeto:

`npx create-next-app@14.2.4`

```terminal
Need to install the following packages:
Ok to proceed? (y) y

√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... No
√ Would you like to use Tailwind CSS? ... No
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for next dev? ... No
√ Would you like to customize the import alias (@/* by default)? ... Yes
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in C:\Cursos\Udemy\pizzaria\frontend\frontend.
```