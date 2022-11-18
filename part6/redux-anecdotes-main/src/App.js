
import React,{useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch} from 'react-redux'
import anecdoteService from "./services/anecdotes";
import { setFilter } from "./reducers/filterReducer";
import { setAnecdotes} from "./reducers/anecdoteReducer";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);
  return (
    <div>
      <Notification/>
      <h2>Filter</h2><input onChange={e=>dispatch(setFilter(e.target.value))}></input>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <h2>create new</h2>
        <AnecdoteForm/>
    </div>
  )
}

export default App