import React,{ useState, useEffect, useRef } from 'react'
import personService from './services/PersonService'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Message from './components/Message'
import './CSS/App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchFilters, setSearchFilters] = useState('')
  const [message, setMessage] = useState(null)
  const personInfo = useRef({name:'',number:''})

  useEffect(()=>{
    refreshContacts()
  },[])
  const sendMessage=(displayMessage, delay=100000)=>{
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
      const filteredPersons=persons.filter(person=>person.id!==id)
      setPersons(filteredPersons)
    })
    .catch(error=>{
      sendMessage(`[ERROR] User not found`)
    })
  }
  const inputInfoHandler=newInfo=>{
    personInfo.current={...personInfo.current, ...newInfo}
  }
  const alreadyHasName=(name)=>{
    if(persons.filter(person=>person.name===name).length>0)return true
  }
  const submitHandler=e=>{
    e.preventDefault()
    if(alreadyHasName(personInfo.current.name)){
      sendMessage(`[ERROR] ${personInfo.current.name} is already added to phonebook`)
      return
    }
      personService.create(personInfo.current)
      .then(response=> {
        setPersons(persons.concat(personInfo.current))
        personInfo.current={name:'',number:''}
        sendMessage(`New contact: ${response.name} was added successfully`)
      })
      .catch(error => {
        sendMessage(`[ERROR] ${error.response.data.error}`)
        console.log(error.response.data)
      })

    document.getElementById('myForm').reset()
  }
  const filterHandler = e =>{
    const filter = e.target.value
    setSearchFilters(filter)
  }
  const updateHandler = (id,newInfo) =>{
    const personName=getNameFromId(id)
    personService.update(id,newInfo)
    .then(response=>{
      sendMessage(`${personName} was successfully updated`)
      setPersons(response)
    })
    .catch(error=>{
      console.log(error)
      const personName=getNameFromId(id)
      if(alreadyHasName(personName)){
        sendMessage(`[ERROR] ${newInfo.name} is already in your contacts`)
        return
      }
      sendMessage(`[ERROR] ${error.response.data.error}`)
    })
    
  }
  const personsToShow = searchFilters===''?persons:persons.filter(person=>(person.name.toLowerCase()).includes(searchFilters.toLowerCase()))
  return (
    <div className='app'>
      <div className='phonebook'>
      <Message message={message} setMessage={setMessage}/>
      <div className='phonebook__header'>
        <h1 className='title'>React Phonebook</h1>
        <PersonForm submitHandler={submitHandler} inputInfoHandler={inputInfoHandler}/>
        <Filter filterHandler={filterHandler}/>
      </div>
      <Persons personsToShow={personsToShow} removeHandler={removeHandler} updateHandler={updateHandler} inputInfoHandler={inputInfoHandler}/>
      </div>
    </div>
  )

}

export default App