import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'query-string'
import './HomePage-style.css'
import InviteButton from './InviteButton';

const HomePage = () => {
    const [name, setName] = useState('')
    const [gameID, setGameID] = useState('')
    
    const navigate = useNavigate()
    const location = useLocation()
    const { id: inviteID } = qs.parse(location.search)


    useEffect(() => {
        if (inviteID) return setGameID(inviteID)
        const id = Math.random().toString().replace('0.', '');
        setGameID(id)
    },[inviteID])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!(name && gameID)){
            return;
        }
        navigate(`/game?name=${name}&id=${gameID}`, { replace: true })
    };

    return (
        <div>
            <h2> Play Chess with your friends online</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="input"
                    value={name}
                    onChange={({target}) => setName(target.value)}
                    placeholder="Display Name">
                </input>
                <div className="gameId">Game ID: {gameID}</div>
                <hr/>
                <p className="invite">Invite Your Friends</p>
                <button type="submit">Submit  biitch</button>
            </form>
            <InviteButton/>

        </div>
    )
};

export default HomePage;


