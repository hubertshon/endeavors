import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';

import { Journey } from './Pages/JourneyPage/JourneyPage';
import { JourneyList } from './Pages/JourneyList/JourneyList';
import { About } from './Pages/About/About';
import { Dev } from './Pages/Dev/Dev'

import { PointsContext } from './Context/PointsContext';
import { Nav } from './Components/Nav/Nav';
import { sampleData } from './sampledata';


function App() {

  const navLinks1 = [
    {
      name: "About", 
      path: "/about", 
    },
    {
      name: "Journeys",
      path: "/journey"
    }
  ];

  const navLinks2 = [
    {
      name: "Profile", 
      path: "/edits", 
    },
    {
      name: "Dev.Log",
      path: "/dev"
    }
  ]

const [journeysList, setJourneysList] = useState(sampleData);

  return (
    <PointsContext.Provider value={{journeysList, setJourneysList}}>
      <div className="App">
        <header className="App-header mb-4">
          <Nav navItems={navLinks1} />
          <Link className="home-btn" to="/about"><h1 className="display-2 mx-5">ENDEAVORS</h1></Link>
          <Nav navItems={navLinks2}/>
        </header>
        <Routes>
          <Route path="/journey/:journeyId" element={<Journey />} />
          <Route path="/journey" element={<JourneyList />} />
          <Route path="/about" element={<About />} />
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </div>
    </PointsContext.Provider>
  );
}

export default App;
