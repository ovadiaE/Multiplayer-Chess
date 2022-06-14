import React from 'react'
import ChessGame from '../chess/ChessGame'
import './Display.css'

const Display = () => {
    
    return (
        <div className="wrapper"> 
            
            <div className="chess-wrapper">
                <ChessGame/>
            </div>
            
            <div className="chat-wrapper">
              
            </div>

        </div>
  
     
    )
}

export default Display