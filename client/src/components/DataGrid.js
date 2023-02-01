import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import PropTypes from 'prop-types';
import { convertDateToReadable, metersToReadable, minutesToReadable } from '../utils/Formatter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/system';
import StationModal from './StationModal';
import { Button } from '@mui/material';

/**
 * List for journeys
 * @returns DataGrid
 */
const DataGridForJourneys = ({ stations }) => {
  const [journeys, setJourneys] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const [sortBy, setSortBy] = useState({field: 'departure', sort: 'asc'});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/api/journeys?page=${page}&size=${pageSize}&field=${sortBy.field}&order=${sortBy.sort}`)
    .then(res => {
      const data = res.data.content.map(journey => ({
        'id': journey.id,
        'departure': {'station': journey.departureStationName, 'time': journey.departure, 'id': journey.departureStationId},
        'return': {'station': journey.returnStationName, 'time': journey.return, 'id': journey.returnStationId},
        'distance': journey.distance,
        'duration': journey.duration,
      }));
      setJourneys(data);
      setRowCount(res.data.rows);
      setLoading(false);
    })
  }, [pageSize, page, sortBy]);

  const columns = [
    // Departure
    {field: "departure", headerName: "Departure", width: 270, 
    renderCell: (params) => (
      <Box>
        <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0, underline: "none", color: "inherit" }}>{params.value.station}</Button>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>
          {convertDateToReadable(params.value.time)}
        </Typography>
      </Box>
    )},

    // Return
    {field: "return", headerName: "Return", width: 270, 
    renderCell: (params) => (
      <Box>
        <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0, underline: "none", color: "inherit" }}>{params.value.station}</Button>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom>
          {convertDateToReadable(params.value.time)}
        </Typography>
      </Box>
    )},
    {field: "distance", headerName: "Distance", width: 120,
      renderCell: (params) => (<Typography>{metersToReadable(params.value)}</Typography>)
    },
    {field: "duration", headerName: "Duration", width: 120,
      renderCell: (params) => (<Typography>{minutesToReadable(params.value)}</Typography>)
    },
  ]

  const handleSortModelChange = (e) => {
    setSortBy(e[0]);
  }

  const handleOnCellClick = (params) => {
    setSelectedStation({name: params.value.station ,id: params.value.id})
    setShowModal(true);
  };
  
  return (
    <div style={{ display: 'flex', width:'800px' }}>
      {selectedStation ? <StationModal handleClose={handleClose} open={showModal} selectedStation={selectedStation} stations={stations} /> : null }
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={journeys}
          columns={columns}
          rowsPerPageOptions={[15,25,50,100]}
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
          loading={loading}
          onCellClick={handleOnCellClick}
        />
       </div>
    </div>
  )
}

DataGridForJourneys.propTypes = {
  stations: PropTypes.array,
}

/**
 * DataGrid for listing stations
 * @returns DataGrid
 */
const DataGridForStations = ({ stations }) => {
  const columns = [
    {field: "station", headerName: "Station", width: 250,
      renderCell: (params) => (
        <div>
          <Typography variant="subtitle2">
            <Link href={`/stations/${params.value.id}`} underline="none" color="inherit">
              {params.value.name}
            </Link>
          </Typography>
        </div>
      ), sortComparator: (v1, v2) => v1.name.localeCompare(v2.name)
    },
    {field: "address", headerName: "Address", width: 250, 
      renderCell: (params) => (
        <div>
          <Typography variant="subtitle2">{params.value.street}</Typography>
          <Typography color="textSecondary" variant="caption" display="block" gutterBottom>{params.value.city}</Typography>
        </div>
      ), sortComparator: (v1, v2) => v1.street.localeCompare(v2.street)
    },
    {field: "operator", headerName: "Operator", width: 180 },
    {field: "capacity", headerName: "Capacity", width: 100 }
  ]
  
  return (
    <div style={{ display: 'flex', width:'800px' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={stations}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15,25,50,100]}
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