import React, { useEffect, useState } from "react";
import './App.css';
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalciteShell, CalciteShellPanel, CalcitePanel } from "@esri/calcite-components-react";
import MapContainer from './components/MapContainer';
import DataEntry from "./components/DataEntry";


function App() {
  const [currentPoint, setCurrentPoint] = useState(null);
  const [loadedPoints, setLoadedPoints] = useState([]);

  async function loadObservations() {
    await fetch("/load").then(res => res.json()).then(setLoadedPoints).catch(console.error);
  }

  async function sendObservation(observation) {
    await fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(observation)
    }).then(() => {
      console.log("observation saved");
      loadObservations();
    }).catch(console.error);
  }

  useEffect(() => {
    loadObservations();
  }, []);
  
  return (
    <CalciteShell contentBehind>
      <CalciteShellPanel slot="panel-start" position="start">
        <CalcitePanel heading="Data Entry">
          <DataEntry location={currentPoint} onSubmit={(value) => sendObservation(value)}></DataEntry>
        </CalcitePanel>
      </CalciteShellPanel>
      <MapContainer onMapLoad={() => {console.log("Loaded")}} onMapClick={(mapPoint) => setCurrentPoint(mapPoint)} loadedPoints={loadedPoints}></MapContainer>
    </CalciteShell>
  );
}

export default App;
