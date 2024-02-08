import bodyParser from 'body-parser'

import dotenv from 'dotenv'
import express from 'express'
import routes from './modules/routes.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

routes.forEach(({ path, route }) => {
  app.use(path, route)
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running on port number ${PORT}.`))
