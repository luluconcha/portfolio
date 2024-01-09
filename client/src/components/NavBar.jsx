import React from 'react'
// import { Link } from 'react-router-dom'
import { Link, animateScroll as scroll } from "react-scroll";

export default function NavBar() {
  return (
    <nav>
        <div className="headingNav">
        {/* <img src={logo} className="nav-logo" alt="Logo." onClick={this.scrollToTop} /> */}
        <Link className="nav-item" activeClass="active" to="tree-wrapper" spy={true} smooth={true} offset={-70} duration={500}><button type="button">arbre</button></Link>
        <Link className="nav-item" activeClass="active" to="cv-wrapper" spy={true}  smooth={true} offset={-70} duration={500}><button type="button">cv</button></Link>
        <Link className="nav-item" activeClass="active" to="homepage-wrapper" spy={true} smooth={true} offset={-70} duration={500}><button type="button">home</button></Link>
    </div>
    </nav>
  )
}
