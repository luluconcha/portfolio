
import {Route, Routes, Link} from 'react-router-dom';
import NavBar from './components/NavBar'
import TreesPage from './components/TreesPage'
import CV from './components/CV'
import ScrapingDemo from './components/ScrapingDemo';
import Homepage from './components/Homepage';
import './App.css'


function App() {
  

  return (
    <>
    <header>
        <NavBar />
        </header>
    
    <h1>
    This is my page about
      </h1>
    <Routes> 
      <Route path="/" element={<Homepage />}/>
      <Route path="/trees" element={<TreesPage/>} />
      <Route path="/cv" element={<CV/>} />
      <Route path="/scrapingdemo" element={<ScrapingDemo/>} />
    </Routes>

   
     


    </>
  )
}

export default App
