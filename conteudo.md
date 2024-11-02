yarn init -y

yarn add express@4.17.2
//Adiciona tipagens do express
yarn add @types/express@4.17.13 --dev
yarn add ts-node-dev@1.1.8 --dev
yarn add typescript@4.5.5 --dev

//Inicia o typescript e cria o arquivo tsconfig.json
yarn tsc --init

//Biblioteca que nos ajuda com os erros
yarn add express-async-errors

//Liberar para qualquer ip
yarn add cors
yarn add @types/cors -D

//Utilizado POSTGRESQL na versão 11.22
password: admin
port: 5432

baixado o postbird 0.8.4.exe que tem a interface mais simples do que o postgresql
https://github.com/Paxa/postbird/releases


//Adicionado prisma para interagir com o banco de dados
yarn add prisma

//Adicionado prisma client para termos algumas coisas como gerar migrations do banco de dados
yarn add @prisma/client

//Cria a configuração base do prisma
npx prisma init
//Irá criar a pastinha "prisma" e o .env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/pizzaria?schema=public"

yarn prisma migrate dev
create-table-users

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

