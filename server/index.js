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

app.get("/", (req, res) => {
    res.send("Server is live");
})

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://chess-multiplayer-pi.vercel.app", //https://chess-multiplayer-pi.vercel.app
        methods: ['GET', 'POST']
    }
})

const port = process.env.PORT
server.listen(port, '0.0.0.0', ()=> console.log("server is running"))

setupSocketEvents(io)