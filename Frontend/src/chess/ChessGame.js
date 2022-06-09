import React, {useState, useRef, useEffect} from 'react'
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js'
import './ChessGame.css'

function ChessGame () {
    const [fen, setFen] = useState('start')
    
    let game = useRef(null)
    
    useEffect (() => {
        game.current = new Chess()
    },[])

    const onDrop = ({sourceSquare, targetSquare}) => {
        
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })
        
        if (move === null) return null;
        setFen(game.current.fen())
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