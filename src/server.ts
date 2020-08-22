import express from 'express'
require('dotenv').config()

const app = express()

//  middlewares
app.use(express.json())

// Rotas e requisições
// Corpo (request.body) - Dados para criação ou atualização de registros
// Route Params - Identificar qual recurso eu quero atualizar ou deletar
// Query Params - Paginação, filtros, ordenação ...

app.post('/hello', (request, response) => {
  console.log('POST: ', request.body);
  return response.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Back-end ON em http://localhost:${process.env.PORT}`);
})