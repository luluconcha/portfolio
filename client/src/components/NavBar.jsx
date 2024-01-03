import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='headingNav'>
        <Link to="/trees" ><button type="button">arbre</button></Link>
        <Link to="/cv" ><button type="button">cv</button></Link>
        <Link to="/scrapingdemo" ><button type="button">scrap</button></Link>
    </div>
  )
}
