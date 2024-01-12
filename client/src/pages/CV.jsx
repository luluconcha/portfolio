import { useState, useEffect } from 'react';
import axios from 'axios';
import CVElement from '../components/CVElement';
import Skills from '../components/Skills';

export default function CV() {
  const [data, setData] = useState()
  const [wait, setWait] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState()
  const [highlightID, setHighlightID] = useState()
  const [detailsId, setDetailsId] = useState()

  useEffect(() => {
    getDetails()
  }, [highlightID])

  async function getDetails(){
    setWait(true)

    const response = await axios.get('/api/index')
    
    const data = await response.data.map((d) => {
      return {
        id: d.id,
        title: d.title,
        date: d.date,
        details: d._details_.map((e, i) => {return {id: i, detail: e, parentID: d.id}}),
        skills: d._skills_.map((e, i) => {return {id: i, skill: e, parentID: d.id}})
      }})

    setData(data)
    setWait(false)
    console.log(data)
    console.log(data[0].id)
  }

function handleClick(e) {
  setDetails(data[e.target.value].details)
  setShowDetails(!showDetails)
}

function hide() {
  setShowDetails(false)
}

function setHighlight(id) {
  setHighlightID(id)
  console.log(id)
}
  return (
    <div>
      <header> <h2> my path to web dev</h2>
      <p id="instructions"> I did not come directly into coding: it's been quite the journey. See below.</p></header>
      <br /> <br /> 
        <div className="cv-grid">
         
            {wait ? "wait..." 
              : data && data.map((d, i) => {
                return (<div className="cv-grid-page">
                          <div className="cv-date-column" key={d.id}>
                            {d.date}
                          </div>
                          <div className="cv-title-column" key={d.id * 0.7} onMouseOver={() => setHighlight(d.id)}>
                                  {/* <CVElement data={data} id={d.id} setHighlight={setHighlight}/> */}
                                  
                                  {d.title}<br />
                                    <button id="show-details-button" value={i} onClick={(e) => handleClick(e)}>
                                      {showDetails ? "hide" : "know more"}
                                    </button>

                                    {showDetails ? d.details.map((e) => {
                                      return (<div key={e.id}>
                                            <p className="cv-details"> {e.detail}</p>
                                    </div>)}) : ""} 
                          </div>
                          <div className="cv-skills-column">
                             {d.skills && d.skills.map((s) => {
                              return (<div key={s.id} id="instructions">
                       
                               {s.skill}
                            
                               
                         
                              </div>)})}
                          </div>
                        </div>
                )}).reverse()}
                <div className="cv-details">
                  
                </div>
         
{/*      
                <div className="cv-skills-colum">
                <Skills data={data} id={highlightID}/>
                </div> */}
            
               

            
        </div>
      </div>
        
 
  )  
}
