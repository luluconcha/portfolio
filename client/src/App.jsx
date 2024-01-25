
import {Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { Link, Button, Events, Element, animateScroll as scroll, scrollSpy } from "react-scroll";
import NavBar from './components/NavBar'
import TreesPage from './pages/TreesPage'
import CV from './pages/CV'
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Projects from './components/Projects';


function App() {
  useEffect(() => {
    
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();
    console.log(scrollSpy)

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);


  return (
    <>
    <header id="navbar-appjsx">
    <NavBar/> 
      </header>
           
        <Element name="homepage" className="element"> <Homepage /> </Element>
          <Element name="projects" className="element"> <Projects /> </Element>
            {/* <Element name="demo" className="element"> <TreesPage /> </Element> */}
              <Element name="cv" className="element"><CV/></Element>
                <Element name="contact" className="element"><Contact/></Element>
  
  </>
  )
}

export default App
