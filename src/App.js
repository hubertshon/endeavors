import React, { useState } from 'react'
import './App.css';
import { Journey } from './Pages/JourneyPage/JourneyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PointsContext } from './Context/PointsContext';
import { Nav } from './Components/Nav/Nav';


function App() {
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
const [pointsList, setPointsList] = useState(samplePoints);
  return (
    <PointsContext.Provider value={{pointsList, setPointsList}}>
      <div className="App">
        <header className="App-header">
          <Nav navItems={["ABOUT", "JOURNEYS"]} />
          <h1 className="display-2 mx-5">ENDEAVORS</h1>
          <Nav navItems={["EDITS", "HELP"]}/>
        </header>
        <Journey />
      </div>
    </PointsContext.Provider>
  );
}

export default App;
