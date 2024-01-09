
import {Route, Routes} from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";
import NavBar from './components/NavBar'
import TreesPage from './components/TreesPage'
import CV from './components/CV'
import ScrapingDemo from './components/ScrapingDemo';
import Homepage from './components/Homepage';
import Contact from './pages/Contact';
import './App.css'


function App() {
  

  return (
    <>
        <NavBar />
        <div id="homepage-wrapper">
          <Homepage title="homepage" subtitle="home to the page" dark={true} id="homepage"/>
            </div>
        <div id="tree-wrapper">
          <TreesPage title="trees" subtitle="my love of trees, et al." dark={false} id="trees"/>
          </div>
        <div id="cv-wrapper">
          <CV title="curriculum" subtitle="brutal experience" dark={false} id="curriculum"/>
            </div>
 
    <Routes> 
      <Route path="/" element={<Homepage />}/>
      <Route path="/trees" element={<TreesPage/>} />
      <Route path="/cv" element={<CV/>} />
      <Route path="/scrapingdemo" element={<ScrapingDemo/>} />
      <Route path="/contact" element={<Contact />} />
    </Routes> 
  </>
  )
}

export default App
