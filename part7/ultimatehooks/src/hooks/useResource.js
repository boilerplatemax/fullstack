import { useState, useEffect } from "react"
import axios from "axios"
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
        .get(baseUrl)
        .then(response => {
            setResources(response.data)
        })
    }, [setResources, baseUrl])
    
    const create = async newObject => {
        const response = await axios.post(baseUrl, newObject)
        setResources(resources.concat(response.data))
      }
    
      const service = {
        create
      }

    return [
        resources, service
    ]
  }
  export default useResource