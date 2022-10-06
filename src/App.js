import React, { useState } from 'react'
import './App.css';
import { Journey } from './Pages/JourneyPage/JourneyPage';
import { JourneyList } from './Pages/JourneyList/JourneyList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PointsContext } from './Context/PointsContext';
import { Nav } from './Components/Nav/Nav';
import { Routes, Route, Link } from 'react-router-dom';
import { sampleData } from './sampledata';


function App() {
  const sampleJourneys = [
    {
      name: "First Journey",
      location: "Location One",
      description: "The first step out"
    },
    {
      name: "Second Journey",
      location: "Location Two",
      description: "Something I never tried before"
    },
  ]
  
  const samplePoints = [
    {
        name: "Point One",
        location: "Location One"
    },
    {
        name: "Point One",
        location: "Location One"
    },
    {
        name: "Point Three",
        location: "Location Three"
    },
  ];

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
      name: "Edits", 
      path: "/edits", 
    },
    {
      name: "Help",
      path: "/help"
    }
  ]

// const [pointsList, setPointsList] = useState(samplePoints);
const [journeysList, setJourneysList] = useState(sampleData);

  return (
    <PointsContext.Provider value={{journeysList, setJourneysList}}>
      <div className="App">
        <header className="App-header mb-4">
          <Nav navItems={navLinks1} />
          <Link className="home-btn" to="journey/1"><h1 className="display-2 mx-5">ENDEAVORS</h1></Link>
          <Nav navItems={navLinks2}/>
        </header>
        <Routes>
          <Route path="/journey/:journeyId" element={<Journey />} />
          <Route path="/journey" element={<JourneyList />} />
        </Routes>
      </div>
    </PointsContext.Provider>
  );
}

export default App;
