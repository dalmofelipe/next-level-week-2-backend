import express from 'express'
import routes from './routes'
import cors  from 'cors'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

//  middlewares
app.use(cors)
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Back-end ON em http://localhost:${PORT}`);
})