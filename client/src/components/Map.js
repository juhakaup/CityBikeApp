import React, { useState } from "react";
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const StationsOnMap = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  return (
    <MapContainer center={[60.209857, 24.938379]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />;

      {/* Markers for the stations */}
      {stations.map(station => (
        <Marker 
          key={station.id} 
          position={ station.location }
          eventHandlers={{ click: () => setSelectedStation(station) }}
        />
      ))};

      {/* Popup for the selected station */}
      {selectedStation && (
        <Popup 
          position={selectedStation.location}
          eventHandlers={{ remove: () => setSelectedStation(null) }}
        >
          <div>
            <h3>{selectedStation.station.name}</h3>
          </div>
          <div>
              Address: {selectedStation.address.street} <br/>
              Operator: {selectedStation.operator} <br/>
              Capacity: {selectedStation.capacity}
          </div>
        </Popup>
      )}
  </MapContainer>
  )
}

StationsOnMap.propTypes = {
  stations: PropTypes.array,
}

export default StationsOnMap