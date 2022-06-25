import React from 'react'
import ChessGame from '../chess/ChessGame'
import './Display.css'
import io from "socket.io-client"; 
import Call from '../VideoChat/Call'

const Display = () => {
    
    const socket = io('https://multiplayer-chess-beta.herokuapp.com/');
    
    return (
        <div className="wrapper"> 
            
            <div className="chess-wrapper">
                <ChessGame socket={socket}/>
            </div>
            
            <Call socket={socket}/>
        
        </div>
  
     
    )
}

export default Display