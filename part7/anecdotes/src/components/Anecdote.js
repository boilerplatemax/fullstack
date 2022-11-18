import React from 'react'
import { useParams } from 'react-router-dom'
export default function Anecdote({anecdotes}) {
    const id=useParams().id
  return (
    <div>
        {id&&anecdotes[id]?<h2>{anecdotes[id].content}</h2>:<p>Anecdote not found</p>}
        </div>
  )
}
