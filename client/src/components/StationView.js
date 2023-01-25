import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"

const StationView = () => {
  const id = useParams().id
  const [station, setStation] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/stations/${id}`)
    .then(res => setStation(res.data))
  }, [])

  console.log(station)

  return(
    <div>
      <h2>{ station.nameFin }</h2>
      <p>{ station.addressFin }, { station.cityFin }</p>
      <p>Operator: { station.operator }</p>
      <p>Capacity: { station.capacity }</p>
    </div>
  )
}

export default StationView;