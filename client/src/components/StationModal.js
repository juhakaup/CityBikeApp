import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {  Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import stationService from '../services/stations'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#efefef',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StationList = ({ list, stations }) => {
  return (
    <Box>
      { list.map((station, index) => {
        const staInfo = stations.find(element => element.id == station.return_station_id);
        console.log(staInfo.station.name)
        // console.log(stations)
        return(
          <p key={index}>
            {staInfo.station.name}
            {station.count} Journeys
          </p>
        )
      }) }
    </Box>
  )
}

StationList.propTypes = {
  list: PropTypes.array,
  stations: PropTypes.array
}

const StationModal = ({ handleClose, open, selectedStation, stations}) => {
  const [topDestinations, setTopDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  if (stations.length == 0 || selectedStation == null || selectedStation.name == null) {
    return (null)
  }

  const station = stations.find(element => element.id == selectedStation.id);

   // fetch stats
   useEffect(() => {
    setLoading(true);
    stationService.getStats(station.id)
    .then(res => {
      setTopDestinations(res.topDestinations);
      // setTopOrigins(res.topOrigins);
      setLoading(false);
      console.log(res.topDestinations);
      topDestinations.map(dest => {
        console.log(dest.count);
      })
    })
  }, [])
  
  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedStation.name}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <div>
                <Typography color="textSecondary" variant="caption" display="block" sx={{ mt: 0, padding: 0 }}>
                  Address:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}>
                  {station.address.street} 
                  <br />
                  {station.address.city == ' ' ? "Helsinki" : station.address.city}
                </Typography>
              </div>
            </Grid>
            <Grid xs={6}>
              <div>
                <Typography color="textSecondary" variant="caption" display="block" sx={{ mt: 0, padding: 0 }}>
                  Operator:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}>
                  {station.operator} 
                </Typography>
                <Typography color="textSecondary" variant="caption" display="block" sx={{ mt: 0, padding: 0 }}>
                  Capacity:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}>
                  {station.capacity} 
                </Typography>
              </div>
            </Grid>
            <Grid xs={6}>
              Top destinations:
              {loading ? <p>Loading...</p> : <StationList list={topDestinations} stations={stations}/>}
            </Grid>
            <Grid xs={6}>
              Top origins
            </Grid>
          </Grid>
        </Box>
      </Box>    
    </Modal>
  )
}

StationModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  selectedStation: PropTypes.any,
  stations: PropTypes.array
}

export default StationModal