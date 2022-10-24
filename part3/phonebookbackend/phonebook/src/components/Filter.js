import React from 'react'

export default function Filter({filterHandler}) {
  return (
    <div className='filter'>
      <div className='filter__row-text-holder'><p>Search: </p></div><div className='filter__row-input-holder'><input onChange={e=>filterHandler(e)} className='filter__input' placeholder='Search...'/></div>
    </div>
  )
}
