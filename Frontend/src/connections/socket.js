import io from "socket.io-client"; 

const url = 'http://localhost:8080'

const socket = io(url)

var mySocketId

socket.on('createdNewGame', statusUpdate => {
    mySocketId = statusUpdate.mySocketId
})

export {
    socket,
    mySocketId
}


