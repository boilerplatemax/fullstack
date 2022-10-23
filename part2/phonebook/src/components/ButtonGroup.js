import React from 'react'

export default function ButtonGroup({text, editHandler, removeHandler, person, editing}) {
  return (
    <td className='button-group'>
        <button onClick={()=>editHandler(person)} className={`btn ${!editing?'btn-edit':'btn-primary'}`}>{text}</button>
        <button onClick={()=>removeHandler(person.id)} className='btn btn-remove'>&times;</button>
    </td>
  )
}
