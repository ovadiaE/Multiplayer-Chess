import React, {useState, useRef, useEffect} from 'react'
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js'
import './ChessGame.css'
import io from "socket.io-client"; 
import { createCacheExpression } from '@vue/compiler-core';

const socket = io('http://localhost:8000');


function ChessGame () {
    const [fen, setFen] = useState('start')
    
    let game = useRef(null)
    
    useEffect (() => {
        game.current = new Chess()
    },[])

    useEffect(() => {
        socket.emit('join', { name: 'Frank', gameID: '20' }, ({ error, color }) => {
            console.log({ color });
        });
        socket.on('welcome', ({ message, opponent }) => {
            console.log({ message, opponent });
        });
        socket.on('opponentJoin', ({ message, opponent }) => {
            console.log({ message, opponent });
        });

        socket.on('opponentMove', ({ sourceSquare, targetSquare }) => {
            let move = game.current.move({
                from: sourceSquare,
                to: targetSquare
            })            
            setFen(game.current.fen())
            console.log(fen)
           });
           socket.on('message', ({ message }) => {
               console.log({ message });
           });
    }, [game])
        
    const makeMove = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })
        
        if (move === null) return null;
        
        setFen(game.current.fen())
        
        socket.emit('move', { gameID: '20', sourceSquare, targetSquare });
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
            
            <Chessboard position={fen} onDrop={makeMove}/>
        </>
     )

};

export default ChessGame