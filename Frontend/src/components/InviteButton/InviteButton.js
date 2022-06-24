import React, {useEffect, useState} from "react"
import './InviteButton.css'

const InviteButton = ({me, roomID}) => {
    const [isCopied, setIsCopied] = useState(false)

    async function copyToClipboard (roomID) {
        if ('clipboard' in navigator){
            setIsCopied(true)
            return await navigator.clipboard.writeText(`Let's play chess at http://localhost:3000/display?id=${roomID}`)
        } else {
            return document.execCommand('copy', true, `Let's play chess at http://localhost:3000/display?id=${roomID}`);
        }
    }

    useEffect(() => {
        if(isCopied){
            setTimeout( ()=> {
                setIsCopied(false)
            }, 1000)
        }
    },[isCopied])

    return (
            <button className="share" onClick={ () => {copyToClipboard(roomID)}}>
                <span>{isCopied ? 'Copied!' : 'Copy Invite'}</span>
            </button>
    )

}

export default InviteButton