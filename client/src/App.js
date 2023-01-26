import React, { useEffect, useState } from 'react';
import './index.css';
import { DataGridForJourneys, DataGridForStations } from './components/DataGrid';
import StationView from './components/StationView.js';
import StationsOnMap from './components/Map'
import stationService from './services/stations';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';

function App() {
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const indexToPath = {
    0: "/",
    1: "/stations",
    2: "/map"
  }

  const pathToIndex = {
    "/": 0,
    "/stations": 1,
    "/map": 2
  }

  const [selectedTab, setSelectedTab] = useState(pathToIndex[location.pathname] ? pathToIndex[location.pathname] : false);

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
  },[]);

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
    navigate(indexToPath[newValue]);
  };

  return (
    <>
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

      <Tabs centered value={selectedTab} onChange={handleTabChange}>
        <Tab label="Journeys"/>
        <Tab label="Stations"/>
        <Tab label="Map"/>
      </Tabs>

      <Box 
        display="flex"
        justifyContent="center"
      >
        <Routes>
          <Route path="/stations/:id" element={<StationView stations={stations}/>} />
          <Route path="/stations" element={<DataGridForStations stations={stations} />} />
          <Route path="/map" element={<StationsOnMap/> } />
          <Route path="/" element={<DataGridForJourneys />} />
        </Routes>
      </Box>
      
      <Box bottom="0" width="100%" justifyContent="center" display="flex" >
        <i>City Bike Journey app - Juha Kauppinen 2023</i>
      </Box>
      </>
  )
}

export default App;
