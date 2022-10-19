import React, { useEffect, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';

import { Journey } from './Pages/JourneyPage/JourneyPage';
import { JourneyList } from './Pages/JourneyList/JourneyList';
import { About } from './Pages/About/About';
import { Dev } from './Pages/Dev/Dev';
import { Photos } from './Pages/Photos/Photos';


import { MapsContext, PointsContext } from './Context/PointsContext';
import { Nav } from './Components/Nav/Nav';
import { NavMobile } from './Components/NavMobile/NavMobile';
import { sampleData } from './sampledata';


function App() {

  const navLinks1 = [
    {
      name: "About", 
      path: "/", 
    },
    {
      name: "Journeys",
      path: "/journey"
    }
  ];

  const navLinks2 = [
    {
      name: "Photos", 
      path: "/photos", 
    },
    {
      name: "Dev.Log",
      path: "/dev"
    }
  ]

  const mobileNavList = [
    {
      name: "Journeys",
      path: "/journey"
    },
    {
      name: "Photos", 
      path: "/photos", 
    },
    {
      name: "About", 
      path: "/", 
    },
    {
      name: "Dev.Log",
      path: "/dev"
    }
  ]

const defaultMapState = () => {
  return {pointSelecting: false, mapHover: false
  }
}

const [journeysList, setJourneysList] = useState(sampleData);
const [mapState, setMapState] = useState(defaultMapState);

useEffect(() => {
}, [mapState])

  return (
    <PointsContext.Provider value={{journeysList, setJourneysList, mapState, setMapState}}>
      <MapsContext.Provider value={{mapState, setMapState}}>
      <div className="App">
        <header className="App-header mb-4">
          <Nav navItems={navLinks1} />
          <Link className="home-btn" to="/"><h2 className="display-2">ENDEAVORS</h2></Link>
          <Nav navItems={navLinks2}/>
          <NavMobile navItems={mobileNavList} />
        </header>
        <Routes>
          <Route path="/journey/:journeyId" element={<Journey />} />
          <Route path="/journey" element={<JourneyList />} />
          <Route path="/" element={<About />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </div>
      </MapsContext.Provider>
    </PointsContext.Provider>
  );
}

export default App;
