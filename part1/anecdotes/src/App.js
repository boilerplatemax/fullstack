import { useState } from 'react'

const Anecdote = ({text, points}) =>{
  return(
    <>
      <p>{text}</p>
      <p>{points}</p>
    </>
  )
}

const Winner = ({points,anecdotes})=>{
  const highestVote = Math.max(...points)
  const highestVoteIndex = points.indexOf(highestVote)
  return(
    <>
      <p>{anecdotes[highestVoteIndex]}</p>
      <p>Votes: {highestVote} </p>
    </>
  )
}
const Header = ({text}) =>{
  return(
    <h2>{text}</h2>
  )
}
const Button = ({onClick, text}) =>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] =useState(Array(anecdotes.length).fill(0))

  const randomAnecdoteHandler=()=>{
    const randomInt=Math.floor(Math.random()*anecdotes.length)

    if(randomInt===selected){
      console.log('duplicate joke')
      randomAnecdoteHandler()
      return
    }
  setSelected(randomInt)
  }
  const voteHandler=()=>{
    const newPoints = [...points]
    newPoints[selected]+=1
    setPoints(newPoints)
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>

      <Anecdote text={anecdotes[selected]} points={points[selected]}/>
      <Button onClick={randomAnecdoteHandler} text='Get Joke'/>
      <Button onClick={voteHandler} text='Vote'/>
      <Header text='Winner'/>

      <Winner points={points} anecdotes={anecdotes}/>
      
    </div>
  )
}

export default App