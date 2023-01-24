import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const DataGridForJourneys = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/journeys')
    .then(res => {
      const data = res.data.content.map(journey => ({
        'id': journey.id,
        'departure': {'station': journey.departureStationName, 'time': journey.departure},
        'return': {'station': journey.returnStationName, 'time': journey.return},
        'distance': journey.distance,
        'duration': journey.duration,
      }))
      setJourneys(data)
    })
  }, [])

  const columns = [
    {field: "departure", headerName: "Departure", width: 250, 
    renderCell: (params) => (
      <div>
        <Typography variant="subtitle2">{params.value.station}</Typography>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>{params.value.time}</Typography>
      </div>
    )},
    {field: "return", headerName: "Return", width: 250, 
    renderCell: (params) => (
      <div>
        <Typography variant="subtitle2">{params.value.station}</Typography>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>{params.value.time}</Typography>
      </div>
    )},
    // {field: "return", headerName: "Return time", width: 200 },
    // {field: "departureStationName", headerName: "Departure station", width: 150 },
    // {field: "returnStationName", headerName: "Return station", width: 150 },
    {field: "distance", headerName: "Distance", width: 90 },
    {field: "duration", headerName: "Duration", width: 90 },
  ]
  
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={journeys}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10,25,50,100]}
          autoHeight 
        />
       </div>
    </div>
  )
}

const DataGridForStations = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/stations')
    .then(res => {
      const data = res.data.content.map(station => ({
        'id': station.id,
        'name': station.nameFin,
        'address': {'street': station.addressFin, 'city': station.cityFin},
        'operator': station.operator,
        'capacity': station.capacity,
        'location': [station.locationY, station.locationX],
      }))
      setStations(data)
    })
  }, [])

  const columns = [
    {field: "name", headerName: "Station", width: 140 },
    {field: "address", headerName: "Location", width: 250, 
    renderCell: (params) => (
      <div>
        <Typography variant="subtitle2">{params.value.street}</Typography>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>{params.value.city}</Typography>
      </div>
    )},
    {field: "operator", headerName: "Operator", width: 150 },
    {field: "capacity", headerName: "Capacity", width: 100 },
  ]
  
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={stations}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10,25,50,100]}
          autoHeight 
        />
       </div>
    </div>
  )
}

export { DataGridForJourneys, DataGridForStations };