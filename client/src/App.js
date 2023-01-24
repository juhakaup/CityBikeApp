import React from 'react';
import { DataGridForJourneys, DataGridForStations } from './components/DataGrid';
import './index.css'

function App() {
  return (
    <div className="App">
      <DataGridForJourneys />
      <DataGridForStations />
    </div>
  );
}

export default App;
