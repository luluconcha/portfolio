
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CVElement({data, id, setHighlight}) {
  // const [details, setDetails] = useState({});
  // const id = detailsId.detailsId
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState()
  useEffect(() => {
    getDetails();
  }, []);

  function handleClick(e) {
    setDetails(data[e.target.value].details)
    showDetails ? "" : setShowDetails(!showDetails)
  }

  async function getDetails() {
    // const response = await axios.get(`/api/index/${id}`) 
    // const data = await response.data.data
    setDetails(data[id]);
    console.log(data)
  }
  function hide() {
    setShowDetails(false)
  }

  return (
      <div> 
            
                                
                                  
                                  {data && data.map((e) => e.title)}<br />
                                    {/* <button id="show-details-button" value={i} onClick={(e) => handleClick(e)}>
                                      {showDetails ? "hide" : "know more"}
                                    </button>

                                    {showDetails ? d.details.map((e) => {
                                      return (<div key={e.id}>
                                            <p className="cv-details"> {e.detail}</p>
                                    </div>)}) : ""} 
                     */}

                {/* <div className="section-skills-by-id" key={data[id].id} onMouseOver={() => setHighlight(d.id)}>
                       <br /> {data[id].title}
                          <button id="show-details-button" value={data[id].id} onClick={(e) => handleClick(e)}>
                            {showDetails ? "hide" : "know more"}
                          </button> */}
                {/* </div> */}
         {/* {data[id].map((d, i) => {
                return (<div className="section-skills-by-id" key={d.id} onMouseOver={() => setHighlight(d.id)}>
                       <br />
                          <button id="show-details-button" value={i} onClick={(e) => handleClick(e)}>
                            {showDetails ? "hide" : "know more"}
                          </button>
                </div>)}).reverse()} */}
              
              {showDetails ? details.map((e) => {
                  return (<div>
                      <p>
                        {e.detail}
                          </p> 
                          </div>)}) : ""}
                  {showDetails ? <button onClick={hide}> x </button> : ""}

      </div>
  )
}
