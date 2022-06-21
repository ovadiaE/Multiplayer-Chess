const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { addPlayer, game, removePlayer } = require('./game');
const cors = require("cors");
const app = express()
const server = http.createServer(app)
app.use(cors());

const port = 8000

const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
  });

io.on('connection', (socket) => {
    
    socket.on('join', ({ name, gameID }, callback) => {
        const { error, player, opponent } = addPlayer({
            name,
            playerID: socket.id,
            gameID,
        });
        if (error) {
            return callback({ error });
        }
        
        socket.join(gameID);
        callback({ color: player.color });

        //send welcome message to player1, and also send the opponent player's data
        socket.emit('welcome', {
            message: `Hello ${player.name}, Welcome to the game`,
            opponent,
        });

        // Tell player2 that player1 has joined the game.
        socket.broadcast.to(player.gameID).emit('opponentJoin', {
            message: `${player.name} has joined the game. `,
            opponent: player,
        });

        if (game(gameID).length >= 2) {
            const white = game(gameID).find((player) => player.color === 'w');
            io.to(gameID).emit('message', {
                message: `Let's start the game. White (${white.name}) goes first`,
            });
        }
    });

    socket.on('move', ({ sourceSquare, targetSquare, gameID }) => {
        socket.broadcast.to(gameID).emit('opponentMove', { sourceSquare, targetSquare });
    });

    socket.on('disconnect', () => {
        const player = removePlayer(socket.id);

        if (player) {
            io.to(player.game).emit('message', {
                message: `${player.name} has left the game.`,
            });
            socket.broadcast.to(player.game).emit('opponentLeft');
        }
    });
    
    // socket logic for handling calls

    socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

});

app.get("/", (req, res) => {
    res.send("server is running")
})

server.listen(port, ()=>{
    console.log('Server started at port: ' + port);
});
