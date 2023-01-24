import React from 'react';
import { DataGridForJourneys, DataGridForStations } from './components/DataGrid';
import StationView from './components/StationView';
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
        <Route path="/stations/:id" element={<StationView />} />
        <Route path="/stations" element={<DataGridForStations />} />
        {/* <Route path="/maps" element={<DataGridForStations />} /> */}
        <Route path="/" element={<DataGridForJourneys />} />
      </Routes>
      <div>
        <i>City Bike Journey app - Juha Kauppinen 2023</i>
      </div>
    </Router>
  )
}

export default App;
