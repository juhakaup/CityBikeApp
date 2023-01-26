import React, { useEffect, useState } from 'react';
import './index.css';
import { DataGridForJourneys, DataGridForStations } from './components/DataGrid';
import StationView from './components/StationView.js';
import stationService from './services/stations';
// import getAll from './services/stations'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    stationService.getAll()
    .then(res => {
      const data = res.content.map(station => ({
        'id': station.id,
        'station': { 'name': station.nameFin, 'id': station.id },
        'address': { 'street': station.addressFin, 'city': station.cityFin },
        'operator': station.operator,
        'capacity': station.capacity,
        'location': [station.locationY, station.locationX],
      }))
      setStations(data);
    })      
  },[])

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
              City Bike Journeys
            </Typography>
            </Toolbar>
        </AppBar>
      </Box>
         
      <div>
        <Link to="/">Journeys</Link>
        <Link to="/stations">Stations</Link>
        {/* <Link to="/maps">Maps</Link> */}
      </div>

      <Box 
        display="flex"
        justifyContent="center"
      >
        <Routes>
          <Route path="/stations/:id" element={<StationView stations={stations}/>} />
          <Route path="/stations" element={<DataGridForStations stations={stations} position="right"/>} />
          {/* <Route path="/maps" element={<DataGridForStations />} /> */}
          <Route path="/" element={<DataGridForJourneys />} />
        </Routes>
      </Box>
      
      <Box bottom="0" width="100%" justifyContent="center" display="flex" >
        <i>City Bike Journey app - Juha Kauppinen 2023</i>
      </Box>
    </BrowserRouter>
  )
}

export default App;
