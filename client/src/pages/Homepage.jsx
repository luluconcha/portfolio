import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div id="homepage">
     
      <div className="text-homepage">
      <p id="text-homepage">
        Hello! My name is Iris, and I finished a full stack web dev bootcamp in Dec '23.
        This portfolio is meant as a technical showcase; I want to share my love of trees, databases, and data visualization. 
        I had lots of fun making it, and hope you will too.
        <br /><br />
        Scroll down or choose a section from the menu, and enjoy!
        </p>
      </div>
      <div className="picture-homepage">
     <img src="./portfolio_header.png" alt="me driving model trains at 10" className="header-photo"></img>
      </div>
    </div>
  
   
  )
}
