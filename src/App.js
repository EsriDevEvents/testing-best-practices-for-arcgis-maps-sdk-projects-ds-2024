import React, { useEffect, useState } from "react";
import './App.css';
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalciteShell, CalciteShellPanel, CalcitePanel } from "@esri/calcite-components-react";
import MapContainer from './components/MapContainer';
import DataEntry from "./components/DataEntry";

import {loadObservations, sendObservation} from "./api/fetchData";


function App() {
  const [currentPoint, setCurrentPoint] = useState(null);
  const [loadedPoints, setLoadedPoints] = useState([]);
  const [currentObservation, setCurrentObservation] = useState(null);

  useEffect(() => {
    if (currentObservation !== null) {
      sendObservation(currentObservation).then(() => {
        loadObservations().then(obs => setLoadedPoints(obs));
      }).catch(console.error)
    }
  }, [currentObservation])
  

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
