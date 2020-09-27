import express, { Request, Response } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()


// Rotas e requisições
// Corpo (request.body) - Dados para criação ou atualização de registros
// Route Params - Identificar qual recurso eu quero atualizar ou deletar
// Query Params - Paginação, filtros, ordenação ...

routes.get('/', (req: Request, res: Response) => res.send('Os testes testam!'))

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes