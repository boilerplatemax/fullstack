import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state=>state.notificationReducer)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null) {
    return null
  }

  return (
    
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification