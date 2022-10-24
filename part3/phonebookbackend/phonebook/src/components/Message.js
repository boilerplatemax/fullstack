import React from 'react'

export default function Message({message, setMessage}) {
const hideMessage=()=>{
  setMessage(null)
}
if(message!==null){
  return (
    <div className={`message ${message.includes('ERROR')?'message-error':'message-success'}`}>
        <p>{message}</p>
        <button className='btn btn-remove' onClick={hideMessage}>&times;</button>
    </div>
  )
}
else{
    return null
}
}
