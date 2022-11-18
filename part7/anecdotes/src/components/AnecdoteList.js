import React from 'react'
import {
Link
  } from "react-router-dom"
export default function AnecdoteList({anecdotes}) {


  return (
    <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote,i) => <Link to={`/anecdotes/${i}`}><li key={anecdote.id} >{anecdote.content}</li></Link>)}
    </ul>
  </div>
  )
}
