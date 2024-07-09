const express = require('express');
const socketio = require("socket.io")
const http = require('http')
const path = require("path")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))


io.on("connection", (socket) => {
    socket.on("send-location", (data)=> {
        io.emit("recieve-location", {id: socket.id, ...data})
    })
    console.log("Socket connected")
})

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server is running");
})