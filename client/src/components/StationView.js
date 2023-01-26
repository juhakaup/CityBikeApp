import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

const StationView = ({ stations }) => {
  const id = useParams().id
  const [station, setStation] = useState(undefined);

  useEffect(() => {
    const element = stations.find(element => element.id == id);
    setStation(element)
  }, [stations])

  if (station) {
    return(
      <Paper elevation={3} sx={{ width:'500px', height:'200px' }}>
        <h2>{ station.station.name }</h2>
        <p>{ station.address.street }, { station.address.city }</p>
        <p>Operator: { station.operator }</p>
        <p>Capacity: { station.capacity }</p>
      </Paper>
    )
  } else {
    return (<div>loading...</div>)
  }
}

StationView.propTypes = {
  stations: PropTypes.array,
}

export default StationView;