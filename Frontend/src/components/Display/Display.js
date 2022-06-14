import React from 'react'
import ChessGame from '../chess/ChessGame'
import './Display.css'
import io from "socket.io-client"; 

const Display = () => {
    
    const socket = io('http://localhost:8000');
    
    return (
        <div className="wrapper"> 
            
            <div className="chess-wrapper">
                <ChessGame socket={socket}/>
            </div>
            
            <div className="chat-wrapper">
              
            </div>

        </div>
  
     
    )
}

export default Display