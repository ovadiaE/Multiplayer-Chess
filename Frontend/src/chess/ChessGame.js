import React, {useState, useRef, useEffect} from 'react'
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js'
import './ChessGame.css'
import io from "socket.io-client"; 

const socket = io('http://localhost:8000');


function ChessGame () {
    const [fen, setFen] = useState('start')
    
    let game = useRef(null)
    
    useEffect (() => {
        game.current = new Chess()
    },[])

    // useEffect(() => {
    //     socket.emit('join', () => {
    //        console.log('hello world')
    //     });
        // socket.on('welcome', ({ message, opponent }) => {
        //     console.log({ message, opponent });
        // });
        // socket.on('opponentJoin', ({ message, opponent }) => {
        //     console.log({ message, opponent });
        // });
    
        // socket.on('opponentMove', ({ from, to }) => {
        //      game.current.move({
        //         from: sourceSquare,
        //         to: targetSquare
        //     })
        // });
        // socket.on('message', ({ message }) => {
        //     console.log({ message });
        // });
    // }, []);

    const onDrop = ({sourceSquare, targetSquare}) => {
        
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })
        
        if (move === null) return null;
        setFen(game.current.fen())
        socket.emit("join", () => {
            console.log('joined from client')
        })
    }
    
    const reset = () => {
        game.current.clear();
        game.current.reset();
        
        setFen('start')
    }
     return ( 
         <>
         { game.current && game.current.game_over() ? 
            <div className="game-over">
                <h1> Game Over</h1>
                <button onClick={reset}>Play Again</button>
            </div> : null }
            
            <Chessboard position={fen} onDrop={onDrop}/>
        </>
     )

};

export default ChessGame