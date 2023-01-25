import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/**
 * DataGrid for listing journeys
 * @returns DataGrid
 */
const DataGridForJourneys = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/journeys')
    .then(res => {
      const data = res.data.content.map(journey => ({
        'id': journey.id,
        'departure': {'station': journey.departureStationName, 'time': journey.departure, 'id': journey.departureStationId},
        'return': {'station': journey.returnStationName, 'time': journey.return, 'id': journey.departureStationId},
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
        <Typography variant="subtitle2">
          <Link href={`/stations/${params.value.id}`} underline="none" color="inherit">
            {params.value.station}
          </Link>
        </Typography>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>
          {params.value.time}
        </Typography>
      </div>
    )},
    {field: "return", headerName: "Return", width: 250, 
    renderCell: (params) => (
      <div>
        <Typography variant="subtitle2">
          <Link href={`/stations/${params.value.id}`} underline="none" color="inherit">
            {params.value.station}
          </Link>
        </Typography>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>{params.value.time}</Typography>
      </div>
    )},
    {field: "distance", headerName: "Distance", width: 90 },
    {field: "duration", headerName: "Duration", width: 90 },
  ]
  
  return (
    <div style={{ display: 'flex', width:'800px' }}>
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

/**
 * DataGrid for listing stations
 * @returns DataGrid
 */
const DataGridForStations = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/stations')
    .then(res => {
      const data = res.data.content.map(station => ({
        'id': station.id,
        'station': { 'name': station.nameFin, 'id': station.id },
        'address': { 'street': station.addressFin, 'city': station.cityFin },
        'operator': station.operator,
        'capacity': station.capacity,
        'location': [station.locationY, station.locationX],
      }))
      setStations(data)
    })
  }, [])

  const columns = [
    {field: "station", headerName: "Station", width: 140,
    renderCell: (params) => (
      <div>
        <Typography variant="subtitle2">
          <Link href={`/stations/${params.value.id}`} underline="none" color="inherit">
            {params.value.name}
          </Link>
        </Typography>
      </div>
    )},
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
    <div style={{ display: 'flex', width:'800px' }}>
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