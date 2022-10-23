//weather api is giving CORS issues so removed from App
import React,{ useState, useEffect } from 'react'
import axios from 'axios'
const CountryInfo = ({country}) =>{
return(
  <>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <p>Population: {country.population}</p>
    <img src={country.flags.png} alt={country.name.common}/> 
  </>
)
}
const Countries = ({countriesToShow, setSearchFilter}) =>{
  return(
    <>
    {
        countriesToShow.length<10?
        countriesToShow.map(country=>{
          const countryName=country.name.common
          return(
          <div key={countryName}>
            <h2>{countryName}</h2>
            {countriesToShow.length===1?
            <CountryInfo country={country}/>
            :
            <button onClick={()=>setSearchFilter(countryName)}>View Country</button>
            }
          </div>
        )})
        :
        <p>Please refine your search</p>
      }
    </>
  )
  }
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  const countryUrl ='https://restcountries.com/v3.1/all'

  useEffect(()=>{
    axios.get(countryUrl)
    .then(response=>{
      setCountries(response.data)
      console.log(response.data)
    })
  },[])
  useEffect(()=>{
  const filteredCountries=countries.filter(country=>country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
  setCountriesToShow(filteredCountries)
  console.log('filtered countries')
  },[searchFilter,countries])

const filterHandler = e=>{
  setSearchFilter(e.target.value)
}
  return (
    <div>
      <input onChange={e=>filterHandler(e)} placeholder='search a country'/>
      
      <Countries countriesToShow={countriesToShow} setSearchFilter={setSearchFilter}/>
    </div>
  )

}

export default App