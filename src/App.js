import React, { useState } from 'react'
import './App.css';
import { MainPage } from './Pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PointsContext } from './Context/PointsContext';



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
        </header>
        <MainPage />
      </div>
    </PointsContext.Provider>
  );
}

export default App;
