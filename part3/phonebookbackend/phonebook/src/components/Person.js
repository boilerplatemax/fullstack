import React,{useState, useRef} from 'react'
import ButtonGroup from './ButtonGroup'

export default function Person({updateHandler,removeHandler,person}) {

const [editing, setEditing]=useState(false)
const personInfo = useRef({name:person.name, number:person.number})
  const editHandler = person =>{
    
    if(editing)updateHandler(person.id, personInfo.current)
    
    setEditing(prev=>!prev)
  }
  const inputInfoHandler=newObj=>{
    personInfo.current={...personInfo.current,...newObj}
  }

  return (
    <tr className='persons-row'>
        {!editing?<><td className='persons-name'>
            {person.name}
        </td>
        <td className='persons-number'>
            {person.number}
        </td></>
        :
        <>
        <td className='persons-name'>
          <input
          placeholder={person.name}
          onChange={e=>inputInfoHandler({name:e.target.value})}
          className='person-input'
          defaultValue={person.name}
          />
          </td>
        <td className='persons-number'>
          <input placeholder={person.number}
          onChange={e=>inputInfoHandler({number:e.target.value})}
          className='person-input'
          defaultValue={person.number}
          />
          </td>
        </>
        }

        <ButtonGroup text={editing?'Confirm':'Edit'} removeHandler={removeHandler} editHandler={editHandler} person={person} editing={editing}/>
      </tr>
  )
}
