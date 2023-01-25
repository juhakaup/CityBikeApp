import React from 'react';
import { DataGridForJourneys, DataGridForStations } from './components/DataGrid';
import StationView from './components/StationView.js';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import './index.css';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Router>
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
          <Route path="/stations/:id" element={<StationView />} />
          <Route path="/stations" element={<DataGridForStations position="right"/>} />
          {/* <Route path="/maps" element={<DataGridForStations />} /> */}
          <Route path="/" element={<DataGridForJourneys />} />
        </Routes>
      </Box>
      
      <Box position="fixed" bottom="0" width="100%" justifyContent="center" display="flex" >
        <i>City Bike Journey app - Juha Kauppinen 2023</i>
      </Box>
    </Router>
  )
}

export default App;
