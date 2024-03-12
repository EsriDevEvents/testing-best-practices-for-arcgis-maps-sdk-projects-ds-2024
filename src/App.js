import React, { useEffect, useState } from "react";
import './App.css';
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalciteShell, CalciteShellPanel, CalcitePanel } from "@esri/calcite-components-react";
import MapContainer from './components/MapContainer';
import DataEntry from "./components/DataEntry";

import {loadObservations, sendObservation} from "./api/fetchData";

/**
 * Main component of the application
 */
function App() {

  // Application state
  const [currentPoint, setCurrentPoint] = useState(null);
  const [loadedPoints, setLoadedPoints] = useState([]);
  const [currentObservation, setCurrentObservation] = useState(null);

  // Save the observation created by DataEntry component
  useEffect(() => {
    if (currentObservation !== null) {
      sendObservation(currentObservation).then(() => {
        loadObservations().then(obs => setLoadedPoints(obs));
      }).catch(console.error)
    }
  }, [currentObservation])
  
  // Load all of the current observations to the map
  useEffect(() => {
    loadObservations().then((obs) => setLoadedPoints(obs));
  }, []);
  
  return (
    <CalciteShell contentBehind>
      <CalciteShellPanel slot="panel-start" position="start">
        <CalcitePanel heading="Data Entry">
          <DataEntry location={currentPoint} onSubmit={(value) => setCurrentObservation(value)}></DataEntry>
        </CalcitePanel>
      </CalciteShellPanel>
      <MapContainer onMapLoad={() => {console.log("Loaded")}} onMapClick={(mapPoint) => setCurrentPoint(mapPoint)} loadedPoints={loadedPoints}></MapContainer>
    </CalciteShell>
  );
}

export default App;
