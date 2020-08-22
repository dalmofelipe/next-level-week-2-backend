import express from 'express'
require('dotenv').config()

const app = express()

app.get('/hello', (request, response) => {
  return response.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Back-end ON em http://localhost:${process.env.PORT}`);
})