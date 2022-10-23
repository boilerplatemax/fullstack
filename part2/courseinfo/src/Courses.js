import React from 'react'
const Header = ({course}) =>{return<h1>{course}</h1>}

const Total = ({parts})=>{
  const total = parts.reduce((accumulator, value) => {
    return accumulator + value.exercises;
  }, 0);
  return(<p><b>Total of {total} exercises</b></p>)
}

const Course = ({course}) =>{
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Content = ({parts}) =>{
  return(
    <>
      {
        parts.map((part,index)=>{
          return(<div key={part.id}><Part part={parts[index].name} exercises={parts[index].exercises}/></div>)
        })
      }
    </>
  )

}
const Part = props =>{return(<p>{props.part} {props.exercises}</p>)}
export default function Courses({courses}) {
    return(
        <>
          {courses.map((course)=>{
            return(
              <Course key={course.id} course={course}/>
            )
          })}
        </>
      )
}
