import {useState, useEffect, useRef} from 'react'
import './VideoDisplay.css'

const VideoDisplay = () => {
    const [stream, setStream] = useState(null)

    const myVideo = useRef()

    const theirVideo = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((currentStream) => {
            setStream(currentStream)
            myVideo.current.srcObject=currentStream
            theirVideo.current.srcObject = currentStream
        })
    },[])
    
    return (
    <> 
     <div className ='stream-wrapper'> 

         <video 
            className='host-video' 
            playsInline ref={myVideo} 
            autoPlay
            width='300'>
        </video>   

        <video 
            className='host-video' 
            playsInline ref={theirVideo} 
            autoPlay
            width='300'>
        </video>    

      
      </div> 
    </>
    )

}

export default VideoDisplay