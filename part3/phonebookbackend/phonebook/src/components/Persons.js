//import edit state, when editstate ===true display inputs instead of name and number
//inputs have place holders
//pass input vals to update handler as an object
//in app.js updatehandler
import React from "react"
import Person from "./Person"

const Persons=({personsToShow, removeHandler, updateHandler})=>{
  
    return(
      <table className='persons-table'>
        <thead className='persons-header'>
          <tr>
          <td className='persons-name'>
            Name
          </td>
          <td className='persons-number'>
            Number
          </td>
          <td className='persons-number'>
            Actions
          </td>
          </tr>
        </thead>
        <tbody>
      {
        personsToShow.length>0?
        personsToShow.map((person)=>{return(
        <Person key={person.name} updateHandler={updateHandler} removeHandler={removeHandler} person={person}/>
        )
      }):null
      }
      </tbody>
    </table>
    )
  }

  export default Persons