import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import CVElement from '../components/CVElement';

export default function CV() {
  const [data, setData] = useState()
  const [wait, setWait] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  
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

  // turn this into a d3 tree later for use of styling 
  // with nodes show title 
  // make it more square
  // onclick make it grow 
  // grow function into d3 thing whatever (create component)
  // pass data to component after mapping it 
  
async function growBranches(e) {
  try {
    
  } catch(err) {
    console.log("msg" + err)
  }
}

function handleClick() {
  // not passing the id actually
  // make the button a link?
  // const details = document.getElementById("details-section")
  // details.style.display === "none" ? details.style.display = "block" : details.style.display = "none" 
  // 
  showDetails ? setShowDetails(false) : setShowDetails(true)
  // console.log("details : " + data[e.target.value]._details_)

  // return <div>
  //         <p>{data[d.target.value]._details_}</p><p>{data[d.target.value]._skills_}</p><p>{data[d.target.value].institution}</p>
  //         </div>
}
  return (
        <div>
          {wait ? "wait..."
          : data.map((d, i) => {
            return (<div key={d.id}>
                {d.title}
                  <br />
                    <button onClick={handleClick}> show details </button>
                    <div> {showDetails ? <p>{d._details_}</p> : null }</div>
                      </div>)}).reverse()}
             {/* <div id="details-section"> {data && data.institution} <br /> {data && data.details}</div> */}
        </div>
        
 
  )  
}
