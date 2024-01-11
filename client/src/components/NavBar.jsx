import React from 'react'
import { Link, animateScroll as scroll } from "react-scroll";
import { useState } from 'react';
export default function NavBar() {
  const [isActive, setActive] = useState(false)
  const [header, setHeader] = useState("welcome")
  const scrollToTop = () => {
    scroll.scrollToTop({smooth: true})
  }

  const handleSetActive = (to) => {
    console.log(to);
    setActive(true)
    to === "homepage" ? setHeader(null) : setHeader(`${to}`.toUpperCase())
  };

  return (
    <nav>
     
    <div className="headingNav"> 
      <h1 className="page-header"> {header}</h1>
        <Link className="nav-item"
          activeClass="active"
          to="projects"
          spy={true}
          smooth={true}
          isDynamic={true}
          offset={-700}
          onSetActive={handleSetActive}
          duration={500}>
            <button type="button">projects</button>
        </Link>

        <Link className="nav-item"
          activeClass="active"
          to="cv"
          spy={true}
          smooth={true}
          isDynamic={true}
          offset={-700}
          onSetActive={handleSetActive}
          duration={500}>
            <button type="button">cv</button>
        </Link>

        <Link className="nav-item"
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          isDynamic={true}
          offset={-700}
          onSetActive={handleSetActive}
          duration={500}>
            <button type="button">contact</button>
        </Link>
        
        <Link className="nav-item"
          activeClass="active"
          to="homepage"
          spy={true}
          smooth={true}
          isDynamic={true}
          offset={-700}
          onSetActive={handleSetActive}
          duration={500}>
             <button type="button" onClick={scrollToTop}>top</button>
        </Link>
       
    </div>
    </nav>
  )
}
