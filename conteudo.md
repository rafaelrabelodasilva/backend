# Anotações do conteúdo do curso

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

criado script dentro de `package.json`:
```
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

Como ficou:
```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/pizzaria?schema=public"
```

Criado nova pasta dentro de src
`src/prisma/index.ts` dentro dela adicionei:

```
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

//Arquitetura

Quando batemos na rota localhost:3333/users
Chamamos o user controller que inicializa um serviço
Este serviço fica responsável pela manipulação dos dados

//Criptografa senhas

yarn add bcryptjs
yarn add @types/bcryptjs -D

//JWT (json web token)
Para quando logar retornar um token
https://www.md5hashgenerator.com/
MD5 Hash
https://jwt.io/

yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D


//.env para poder acessar as variáveis de ambiente mesmo que já venha no prisma
yarn add dotenv

//Multer 
Biblioteca para trabalhar com imagens no projeto pois não salvamos ela de fato no banco, apenas o nome dela

yarn add multer
yarn add @types/multer -D

//Front
$ npx create-next-app@latest frontend
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

