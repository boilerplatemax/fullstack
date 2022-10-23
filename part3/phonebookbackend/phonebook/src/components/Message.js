import React from 'react'

export default function Message({message}) {
if(message!==null){
  return (
    <div className={`message ${message.includes('ERROR')?'message-error':'message-success'}`}>
        <p>{message}</p>
    </div>
  )
}
else{
    return null
}
}
