import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CV() {
  const [data, setData] = useState()
  const [wait, setWait] = useState(true)
  const [section, setSection] = useState()

  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails(){
    const response = await axios.get('/api/index')
    const data = await response.data
    setData(data)
    setWait(false)
    console.log(data)
    console.log(data[0].id)
  }
async function handleClick() {
  
  console.log("d : " + event.target.value)

  console.log("details : " + data[event.target.value]._details_)

  // return <div>
  //         <p>{data[d.target.value]._details_}</p><p>{data[d.target.value]._skills_}</p><p>{data[d.target.value].institution}</p>
  //         </div>
}
  return (
        <div>
          {wait ? "wait..."
          : data.map((d, i) => {
            return <ul><li value={`${d.id}`} onClick={handleClick}>{d.id}</li></ul>}).reverse()}
        </div>
 
  )  
}
