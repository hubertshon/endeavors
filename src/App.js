import React, { useState } from 'react'
import './App.css';
import { Journey } from './Pages/JourneyPage/JourneyPage';
import { JourneyList } from './Pages/JourneyList/JourneyList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PointsContext } from './Context/PointsContext';
import { Nav } from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';


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
      path: "/journeys"
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
const [pointsList, setPointsList] = useState(samplePoints);
  return (
    <PointsContext.Provider value={{pointsList, setPointsList}}>
      <div className="App">
        <header className="App-header">
          <Nav navItems={navLinks1} />
          <h1 className="display-2 mx-5">ENDEAVORS</h1>
          <Nav navItems={navLinks2}/>
        </header>
        <Routes>
          <Route path="/" element={<Journey />}/>
          <Route path="/journeys" element={<JourneyList journeys={sampleJourneys} />} />
        </Routes>
      </div>
    </PointsContext.Provider>
  );
}

export default App;
