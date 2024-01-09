import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CV() {
  const [details, setDetails] = useState()
  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails(){
    const response = await axios.get('/api/index')
    const data = await response.data
    setDetails(data)
    console.log(data)
    console.log(data[0].id)
  }

  return (
        <div>
          {details && details.map((d, i) => {
            return <ul><li>{d.id}<p>{d.details}</p><p>{d.institution}</p><p>{d.date}</p></li></ul>}).reverse()}
        </div>
 
  )  
}
