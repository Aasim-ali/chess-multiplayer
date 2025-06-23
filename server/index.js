import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import setupSocketEvents from './socketWorking.js'
import dotenv from 'dotenv'

dotenv.config({
    path: "./.env"
})

const app = express()

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

const port = process.env.PORT
server.listen(port, '0.0.0.0', ()=> console.log("server is running"))

setupSocketEvents(io)