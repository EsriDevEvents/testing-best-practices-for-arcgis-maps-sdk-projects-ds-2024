import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock out components so we only check the App
jest.mock("../components/MapContainer", () => {
  return () => {
    return <div>Map Container</div>;
  };
});

jest.mock("../components/DataEntry", () => {
    return () => {
        return <div>Data Entry</div>
    }
});

jest.mock("@esri/calcite-components-react", () => {
  return {
    CalciteShell: ({ children }) => <div>{children}</div>,
    CalciteShellPanel: ({ children }) => <div>{children}</div>,
    CalcitePanel: ({ children }) => <div>{children}</div>,
  };
});

test("renders", () => {
  const { getByText } = render(<App />);

  expect(getByText("Map Container")).toBeInTheDocument();
  expect(getByText("Data Entry")).toBeInTheDocument();
});