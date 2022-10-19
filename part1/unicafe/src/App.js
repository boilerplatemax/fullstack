import { useState } from 'react'


const Button = (props) =>{
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )

}
const Statistics = ({feedBack}) => {
  const total=feedBack.good+feedBack.neutral+feedBack.bad
  const average = total>0?(feedBack.good * 1 + feedBack.bad * -1) / total:0
  const positive=total>0?`${(100/total)*feedBack.good}%`:0

  return(
    <>
    <h2>Statistics</h2>
    <table>
      <tbody>
      <Statistic text='Good' value={feedBack.good}/>
      <Statistic text='Neutral' value={feedBack.neutral}/>
      <Statistic text='Bad' value={feedBack.bad}/>
      <Statistic text='Total' value={total}/>
      <Statistic text='Positive' value={positive}/>
      <Statistic text='Average' value={average}/>
    </tbody>
    </table>
    </>
  )
}
const Statistic = ({text, value}) => {
  return(
    
    <tr><td>{text}</td><td>{value}</td></tr>

  )
}
const App = () => {
  const [feedBack, setFeedBack] = useState({good:0, neutral:0,bad:0})

  
  const goodClickHandler = () =>
    setFeedBack({...feedBack, good: feedBack.good + 1})

  const neutralClickHandler = () =>
    setFeedBack({...feedBack, neutral: feedBack.neutral + 1})

  const badClickHandler = () =>
    setFeedBack({...feedBack, bad: feedBack.bad + 1})
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={goodClickHandler} text='Good'/>
      <Button onClick={neutralClickHandler} text='Neutral'/>
      <Button onClick={badClickHandler} text='Bad'/>

      <Statistics feedBack={feedBack}/>

    </div>
  )
}
export default App