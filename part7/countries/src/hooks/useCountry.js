import axios from 'axios'
import React,{useState, useEffect} from 'react'
const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const link = 'https://restcountries.com/v3.1/all'
    useEffect(() => {
        axios.get(link)
        .then((response)=>{
            setCountry(response.data.filter(country=>country.name.common.toLowerCase().includes(name.toLowerCase())))
        })
    },[name])
  
    return country
  }
  export default useCountry