const express = require('express')
const app = express()

let notes = {
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
  res.send(`<h1>Notebook has info for ${notes.persons.length} people</h1>${new Date()}`)
})

const generateId = () => {
  const maxId = notes.persons.length > 0
    ? Math.max(...notes.persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if(!body.content.name||!body.content.number){
    return response.status(400).json({ 
        error: 'name or number missing' 
      })
  }
  const name = body.content.name

  if(notes.persons.filter(person=>person.name===body.content.name).length>0){
    return response.status(400).json({ error: 'name must be unique' })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes.persons = notes.persons.concat(note)

  response.json(note)
})

app.get('/api/persons', (req, res) => {
  res.json(notes)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes.persons = notes.persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.persons.find(person => person.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})