import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import CVElement from '../components/CVElement';

export default function CV() {
  const [data, setData] = useState()
  const [wait, setWait] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState()
  const [skills, setSkills] = useState()

  useEffect(() => {
    getDetails()
  }, [])

  async function getDetails(){
    setWait(true)

    const response = await axios.get('/api/index')
    
    const data = await response.data.map((d) => {
      return {
        id: d.id,
        title: d.title,
        details: d._details_.map((e, i) => {return {id: i, skill: e, parentId: d.id}}),
        skills: d._skills_.map((e, i) => {return {id: i, skill: e, parentId: d.id}})
      }})

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

function handleClick(e) {
  // not passing the id actually
  // make the button a link?
  // const details = document.getElementById("details-section")
  // details.style.display === "none" ? details.style.display = "block" : details.style.display = "none" 
  setDetails(data[e.target.value].details)
  setShowDetails(!showDetails)
  console.log(data[e.target.value].details)
  // console.log("details : " + data[e.target.value].details)
  console.log(e)
  // return <CVElement data={{el: data[e.id]}}/>
}

function hide() {
  setShowDetails(false)
}
  return (
        <div>
          {wait ? "wait..." 
            : data && data.map((d, i) => {
              return (<div className="cv-title" key={d.id}>{d.title}<br />
                <button id="show-details-button" value={i} onClick={(e) => handleClick(e)}>
                  view details
                  </button>
              </div>)
            })}
          <div>
          <div>
                  {showDetails ? details.map((e) => {
                    return e.skill 
                  }) : ""}
                  {showDetails ? <button onClick={hide}> x </button> : ""}
                  {/* {details && details} */}
                </div>
            </div>
        </div>
        
 
  )  
}
