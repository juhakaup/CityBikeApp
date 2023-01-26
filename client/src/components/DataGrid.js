import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import PropTypes from 'prop-types';

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
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const [sortBy, setSortBy] = useState({field: 'departure', sort: 'asc'});

  useEffect(() => {
    axios.get(`http://localhost:3001/api/journeys?page=${page}&size=${pageSize}&field=${sortBy.field}&order=${sortBy.sort}`)
    .then(res => {
      const data = res.data.content.map(journey => ({
        'id': journey.id,
        'departure': {'station': journey.departureStationName, 'time': journey.departure, 'id': journey.departureStationId},
        'return': {'station': journey.returnStationName, 'time': journey.return, 'id': journey.returnStationId},
        'distance': journey.distance,
        'duration': journey.duration,
      }))
      setJourneys(data)
      setRowCount(res.data.rows)
    })
  }, [pageSize, page, sortBy])

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
    {field: "distance", headerName: "Distance", width: 120 },
    {field: "duration", headerName: "Duration", width: 120 },
  ]

  const handleSortModelChange = (e) => {
    setSortBy(e[0]);
    console.log(sortBy)
  } 
  
  return (
    <div style={{ display: 'flex', width:'800px' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={journeys}
          columns={columns}
          rowsPerPageOptions={[10,20,50,100]}
          autoHeight 
          pagination
          paginationMode="server"
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          rowCount={rowCount}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
        />
       </div>
    </div>
  )
}

/**
 * DataGrid for listing stations
 * @returns DataGrid
 */
const DataGridForStations = ({ stations }) => {
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

DataGridForStations.propTypes = {
  stations: PropTypes.array,
}

export { DataGridForJourneys, DataGridForStations };