import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'
import anecdoteService from "../services/anecdotes";
export default function AnecdoteForm() {
    const dispatch = useDispatch()

    const addAnecdoteHandler = async (event) => {
      event.preventDefault();
      const anecdote = event.target.anecdote.value;
      event.target.anecdote.value = "";
      const newAnecdote = await anecdoteService.createNew(anecdote);
      dispatch(createAnecdote(newAnecdote));

    };
  return (
    <form onSubmit={event=>addAnecdoteHandler(event)}>
    <div><input name='anecdote'/></div>
    <button>create</button>
  </form>
  )
}
