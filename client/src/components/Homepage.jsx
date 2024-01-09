import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div>
        <h1> hello </h1>
        my name is Iris<br/> <br/>
        I've just finished a Full-Stack bootcamp and absolutely loved it. <br />
        Made this page to mow your blind with my blind-mowing tech skills <br />
        click on a link or scroll down to go down the rabbit hole <br />
        <Link to="/cv" > experience </Link> <br />
        <Link to="/treespage"> trees </Link>
       {/* Link to contact page */}
        
    </div>
  
   
  )
}
