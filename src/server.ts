import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import apiRoutes from './routes/router'

dotenv.config()

const server = express()

server.use(cors())

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({extended: true}))

server.use(apiRoutes)


server.use((req, res) => {
    res.status(404).send('Página não encontrada')
})

server.listen(process.env.PORT)