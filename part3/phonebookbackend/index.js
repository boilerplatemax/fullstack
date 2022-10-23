const express = require('express')
const morgan =require('morgan')
const app = express()
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())

app.use(morgan('combined'))
let contacts = {
  persons: [
    {
      name: "Zlatan ibra",
      number: "46-643-463",
      id: 1
    },
    {
      name: "ToTorz",
      number: "56-443-63",
      id: 2
    },
    {
      name: "Jean Dujardin",
      number: "86-865-8656",
      id: 3
    },
    {
      name: "totoro",
      number: "64-635-8375",
      id: 4
    }
  ]
}

app.use(express.json())

app.get('/info', (req, res) => {
  res.send(`<h1>Notebook has info for ${contacts.persons.length} people</h1>${new Date()}`)
})

const generateId = () => {
  const maxId = contacts.persons.length > 0
    ? Math.max(...contacts.persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', morgan('combined'),(request, response) => {
  const body = request.body
  if(!body.name||!body.number){
    return response.status(400).json({ 
        error: 'name or number missing' 
      })
  }
  const name = body.name
  console.log(name)
  if(contacts.persons.filter(person=>person.name===name).length>0){
    return response.status(400).json({ error: 'name must be unique' })
  }
  const note = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  contacts.persons = contacts.persons.concat(note)

  response.json(note)
})
//put request
app.put('/api/persons/:id', morgan('combined'),(request, response) => {
  const id = Number(request.params.id)
  const body = request.body
  const changeIndex = contacts.persons.findIndex(item => item.id === id)
  const updatedNote = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  contacts.persons[changeIndex]=updatedNote
  response.json(contacts)
})

app.get('/api/persons', (req, res) => {
  res.json(contacts)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  contacts.persons = contacts.persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = contacts.persons.find(person => person.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})