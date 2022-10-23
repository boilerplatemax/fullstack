import React from 'react'

export default function Filter({filterHandler}) {
  return (
    <div className='filter'>
      Look up contact: <input onChange={e=>filterHandler(e)} className='filter__input' placeholder='Search...'/>
    </div>
  )
}
