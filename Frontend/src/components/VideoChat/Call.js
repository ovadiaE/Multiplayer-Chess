import { FaPhone, FaPhoneSlash } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react'
import {useLocation} from 'react-router-dom'
import qs from 'query-string';
import Peer from "simple-peer"
import './Call.css'
import InviteButton from '../InviteButton/InviteButton';


const Call = ({socket}) => {
	const [roomID, setRoomID] = useState('')
	const [ me, setMe ] = useState("")
	const [friendId, setFriendId] = useState('')
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
	const gameID = useRef()
	const myId = useRef()


	const location = useLocation()

	useEffect(() => {
		const {id} = qs.parse(location.search)
		setRoomID(id)
		gameID.current = id
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
	})
		socket.on("me", (id) => {
			setMe(id)
			myId.current = id
			socket.emit('shareId', { id: myId.current, gameID: gameID.current });

		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
		socket.on('displayId', ({id})=> {
			console.log(id)
			setFriendId(id)
	})
	}, []) //eslint-disable-line

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "250px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "250px"}} />:
					null}
				</div>
			</div>
			<div className='input-container'>
				<input
					className='input-call'
					type='text'
					id='user-name'
					placeholder="User Name"
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className='input-call'
					type='text'
					id='ID-to-call'
					placeholder="Paste Your guest's ID"
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className='call-button'>
					{ callAccepted && !callEnded ? 
						<FaPhoneSlash variant="contained" color="red" onClick={leaveCall}/>
						: 
					 	<FaPhone color="blue" aria-label="call" onClick={() => callUser(idToCall)}/>
					}
				</div>
			</div>
			<div className='recieving-call'>
				{receivingCall && !callAccepted  ? (
						<div className="caller">
						<p style={{fontSize: '20px', color: 'rgb(237, 63, 138)'}}>{name} is calling...</p>
						<button className = 'answer' onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>  
			 <div className='invites'>
				{roomID && me ? <InviteButton roomID={roomID} me={me}/> : null}
				{ me && friendId ? <div className='my-id'>Guest ID: {friendId ? friendId : null}</div> : null}
			</div>
		</div>
		</>
	)
}

export default Call