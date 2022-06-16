// import { createContext } from "react"
// import {createContext, useState, useRef, useEFfect} from 'react'
// import {io} from 'socket.io-client'
// import Peer from 'simple-peer'

// const SocketContext = createContext()

// const socket = io('http://localhost:500')

// const ContextProvider = ({children}) => {
//     const [stream, setStream] = useState(null)
//     const [me, setMe] = useState('')

//     const myVideo = useRef()

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({video: true, audio: true})
//             .then((currentStream) => {
//                 setStream(currentStream)
//                 myVideo.current.srcObject = currentStream
//             })
//     })
//     const answerCall = () => {

//     }
//     const calUser = () => {

//     }
//     const leaveCall = () => {

//     }
// }
