import React from 'react';
import { DataGridForJourneys, DataGridForStations } from './components/DataGrid';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import './index.css';

function App() {
  return (
    <Router>
      <h1>City Bike Journeys</h1>
      <div>
        <Link to="/">Journeys</Link>
        <Link to="/stations">Stations</Link>
        {/* <Link to="/maps">Maps</Link> */}
      </div>

      <Routes>
        <Route path="/" element={<DataGridForJourneys />} />
        <Route path="/stations" element={<DataGridForStations />} />
        {/* <Route path="/maps" element={<DataGridForStations />} /> */}
      </Routes>
      <div>
        <i>Note app, Department of Computer Science 2022</i>
      </div>
    </Router>
  )
}

export default App;
