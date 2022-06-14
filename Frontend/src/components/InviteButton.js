import React, {useEffect, useState} from "react"
import './InviteButton.css'

const InviteButton = ({id}) => {
    const [isCopied, setIsCopied] = useState(false)

    async function copyToClipboard (id) {
        if('clipboard' in navigator){
            setIsCopied(true)
            return await navigator.clipboard.writeText(`http://localhost:3000/display?id=${id}`)
        } else {
            return document.execCommand('copy', true, `http://localhost:3000/display?id=${id}`);
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
            <button className="share" onClick={ () => {copyToClipboard(id)}}>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
       
    )

}

export default InviteButton