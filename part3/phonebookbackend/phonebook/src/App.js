import React,{ useState, useEffect, useRef } from 'react'
import personService from './services/PersonService'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Message from './components/Message'
import './App.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [searchFilters, setSearchFilters] = useState('')
  const [message, setMessage] = useState(null)
  const personInfo = useRef({name:'',number:''})

  useEffect(()=>{
    refreshContacts()
  },[])
  const sendMessage=(displayMessage, delay=10000)=>{
    setMessage(displayMessage)
    setTimeout(() => {
      setMessage(null)
    }, delay)
  }
  const refreshContacts=()=>{
    personService.getAll()
    .then(response=>{
      setPersons(response)
    })
  }
  const getNameFromId=(id)=>{
    const filteredPerson = persons.filter(person => person.id === id)
    return filteredPerson[0].name
  }
  const removeHandler=id=>{
    const personName = getNameFromId(id)
    personService.remove(id)
    .then(response=>{
      sendMessage(`${personName} was removed from contacts`)
    })
    .catch(err=>{
      sendMessage(`[ERROR] User not found`)
    })
    const filteredPersons=persons.filter(person=>person.id!==id)
    setPersons(filteredPersons)
  }
  const inputInfoHandler=newInfo=>{
    personInfo.current={...personInfo.current, ...newInfo}
  }
  const submitHandler=e=>{
    e.preventDefault()
    const name = personInfo.current.name
    const alreadyHasName = persons.filter(person=>person.name===name).length>0
    if(alreadyHasName){
      sendMessage(`[ERROR] ${name} is already added to phonebook`)
      return
    }
      personService.create(personInfo.current)
      .then(()=> {
        setPersons(persons.concat(personInfo.current))
        personInfo.current={name:'',number:''}
        sendMessage(`New contact: ${name} was successfully added`)
      })
      .catch(error => {
        sendMessage(`[ERROR] Could not create contact. Include more data`)
        console.log(error.response.data)
      })

    document.getElementById('myForm').reset()
  }
  const filterHandler = e =>{
    const filter = e.target.value
    setSearchFilters(filter)
  }
  const updateHandler = (id,newInfo) =>{
    personService.update(id,newInfo)
    .then((res)=>{
      const personName=getNameFromId(id)
      sendMessage(`${personName} was successfully updated to ${newInfo.name}`)
      setPersons(res)
    })
    .catch(()=>{
      const personName=getNameFromId(id)
      sendMessage(`[ERROR] Unable to update ${personName}`)
    })
    
  }

  const personsToShow = searchFilters===''?persons:persons.filter(person=>(person.name.toLowerCase()).includes(searchFilters.toLowerCase()))
  return (
    <div className='app'>
      <div className='phonebook'>
      <Message message={message}/>
      <h2>React Phonebook</h2>
      <PersonForm submitHandler={submitHandler} inputInfoHandler={inputInfoHandler}/>
      
      <Filter filterHandler={filterHandler}/>
      <Persons personsToShow={personsToShow} removeHandler={removeHandler} updateHandler={updateHandler} inputInfoHandler={inputInfoHandler}/>
      </div>
    </div>
  )

}

export default App

// {
//   "persons": [
//     {
//       "name": "Miles Morales",
//       "number": "212-531-7705",
//       "id": 1
//     },
//     {
//       "name": "Walter White",
//       "number": "505-193-2475",
//       "id": 2
//     },
//     {
//       "name": "Dwight Schrute",
//       "number": "1-800-644-6437",
//       "id": 3
//     },
//     {
//       "name": "Marge Simpson",
//       "number": "409-630-2403",
//       "id": 4
//     }
//   ]
// }