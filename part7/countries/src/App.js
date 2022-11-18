import { useState} from 'react'
import axios from 'axios'
import useCountry from './hooks/useCountry'
import useField from './hooks/useField'

const Country = ({ country }) => {
  if (!country||country.length<1) {
    return <div>not found...</div>
  }

  return (
    <div>
      {console.log(country)}
      <h3>{country[0].name.common}</h3>
      <div>population {country[0].population}</div> 
      <div>capital {country[0].capital}</div>
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country}/>
    </div>
  )
}

export default App