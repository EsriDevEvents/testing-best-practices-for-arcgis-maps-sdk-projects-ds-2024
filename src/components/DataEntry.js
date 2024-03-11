import { CalciteBlock, CalciteBlockSection, CalciteButton, CalciteInput, CalciteInputNumber, CalciteLabel, CalciteNotice } from "@esri/calcite-components-react";
import { useState } from "react";

/**
 * 
 * @param {Object} param0 React parameters passed to the object
 */
function DataEntry({ location, onSubmit }) {
    const [observation, setObservation] = useState("");

    return (
        <CalciteBlock open heading="Selected Location">
            {
                !location &&
                <CalciteBlockSection open>
                    <CalciteNotice open>
                        <div id="clickMessage" slot="message">Click the map to start</div>
                    </CalciteNotice>
                </CalciteBlockSection>
            }
            {
                location &&
                <CalciteBlockSection open>
                    <div><CalciteLabel>Latitude <CalciteInputNumber readOnly>{location && location.latitude}</CalciteInputNumber></CalciteLabel></div>
                    <div><CalciteLabel>Longitude <CalciteInputNumber readOnly>{location && location.longitude}</CalciteInputNumber></CalciteLabel></div>
                    <div><CalciteLabel>Observation <CalciteInput id="textInput" onCalciteInputChange={(e) => setObservation(e.target.value)}></CalciteInput></CalciteLabel></div>
                    <div><CalciteButton id="submitText" onClick={() => onSubmit({latitude: location.latitude, longitude: location.longitude, observation})}>Submit</CalciteButton></div>
                </CalciteBlockSection>
            }
        </CalciteBlock>
    )
}

export default DataEntry;