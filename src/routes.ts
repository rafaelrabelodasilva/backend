import { Router } from 'express'
import multer from 'multer'

import { CreateUserCrontroller } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/Product/CreateProductController'

import uploadConfig from './config/multer'
import { ListByCategoryController } from './controllers/Product/ListByCategoryController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'

const router = Router()

const upload = multer(uploadConfig.upload("./temp"))

//-- ROTAS USER
router.post('/users', new CreateUserCrontroller().handle)
router.post('/session', new AuthUserController().handle)
//Se passar pela validação de autenticação é chamado o controller
router.get('/me', isAuthenticated, new DetailUserController().handle)

//-- ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/categories', isAuthenticated, new ListCategoryController().handle)

//-- ROTAS PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//-- ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)
export { router }
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.post('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.post('/order/finish', isAuthenticated, new FinishOrderController().handle)
