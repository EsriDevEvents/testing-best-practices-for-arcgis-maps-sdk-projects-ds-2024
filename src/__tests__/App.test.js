import { act, render, screen } from "@testing-library/react";
import {loadObservations, sendObservation} from "../api/fetchData"
import ReactDOM from "react-dom/client";
import App from "../App";

// Mock out components so we only check the App
jest.mock("../components/MapContainer", () => {
  return () => {
    return <div className="mapContainer">Map Container</div>;
  };
});

jest.mock("../components/DataEntry", () => {
    return () => {
        return <div className="dataEntry">Data Entry</div>
    }
});

jest.mock("@esri/calcite-components-react", () => {
  return {
    CalciteShell: ({ children }) => <div>{children}</div>,
    CalciteShellPanel: ({ children }) => <div>{children}</div>,
    CalcitePanel: ({ children }) => <div>{children}</div>,
  };
});

// Mock our API so we can control responses
jest.mock("../api/fetchData");

test("renders", async () => {
  loadObservations.mockResolvedValue([]);

  await act(async () => {
    render(<App/>);
  });

  expect(loadObservations).toHaveBeenCalled();
});