import React, {useState} from 'react'

const InviteButton = ({id}) => {
    const [isCopied, setIsCopied] = useState(false)

    async function copyToClipboard (id) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(`http://localhost:3000/game?id=${id}`)
        } 
        else {
            return document.execCommand('copy', true, id)
        }
    }

    const handleCopyClick = async () => {
        try {
            let copy = await copyToClipboard(id)
            if(copy) {
                window.alert("Copied Ivite")
                setIsCopied(true)
            }
            setTimeout(() => {
                setIsCopied(false)
            }, 1500)
        } catch (error){
            console.log(error)
        }
    }
    return (
            <button onClick={handleCopyClick}>
                Copy            
            </button>
        
    )
}

export default InviteButton