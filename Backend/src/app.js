const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require("cors");
const app = express()

const port = process.env.PORT || 5000

const server = http.createServer(app)

const io = socketio (server)

app.use(cors());

app.listen( port, () => {
    console.log(`app listening on port ${port}`)
})