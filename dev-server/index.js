import express from 'express'
import { registerRoutes } from './routes.js'
import { setEnviroment } from './config/env.js'
import { connectToDB } from './config/db'

const app = express()
const port = 3000

setEnviroment(app)
connectToDB()
registerRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Trivia Game listening at http://localhost:${port}`)
})

