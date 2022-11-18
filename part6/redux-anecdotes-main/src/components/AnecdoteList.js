import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification,hideNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
const dispatch = useDispatch()
const filter = useSelector(state=>state.filter)
const anecdotes = useSelector(state => state.anecdotes)

const anecdotesToShow =
filter===(''||null)?
anecdotes:
anecdotes.map(anecdote=>anecdote.content.toLowerCase().includes(filter!==null?filter.toLowerCase():'')&&anecdote)


const voteAnecdote = (id) => {
      dispatch(addVote(id))
      dispatch(showNotification(`You voted for ${anecdotes.filter(anecdote=>anecdote.id===id)[0].content}`))
      console.log(anecdotes)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
const greatestToLeast = (a,b)=>{
    return b.votes-a.votes
  }
  return (
    <div>
        {anecdotesToShow&&anecdotesToShow.sort(greatestToLeast).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          {anecdote.content&&<div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>
              vote
            </button>
          </div>}
        </div>
      )}
    </div>
  )
}
