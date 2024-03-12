import { fireEvent, render } from "@testing-library/react";
import MapContaier from "../../components/MapContainer";

// Mock out the ArcGIS Maps SDK components
jest.mock("@arcgis/core/Map", () => {
    return jest.fn().mockImplementation(() => {
        
        return {
            add: jest.fn()
        };
    });
});

jest.mock("@arcgis/core/views/MapView", () => {
    return jest.fn().mockImplementation((map) => {
        return {
            map,
            when: (cb) => cb(),
            on: (event, callback) => {
                if (event == "click") {
                    callback();
                }
            },
            hitTest: () => Promise.resolve({results: [{}]})
        };
    });
});

jest.mock("@arcgis/core/layers/GraphicsLayer", () => {
    return jest.fn().mockImplementation(() => {
        return {
            graphcs: [],
            add: jest.fn().mockImplementation((graphic) => this.graphics.push(graphic)),
            removeAll: jest.fn().mockImplementation(() => this.graphics = [])
        }
    });
});

jest.mock("@arcgis/core/Graphic", () => {
    return jest.fn().mockImplementation(() => {
        return {};
    })
});

jest.mock("@arcgis/core/symbols/SimpleMarkerSymbol", () => {
    return jest.fn().mockImplementation(() => {
        return {};
    })
});

jest.mock("@arcgis/core/geometry/Point", () => {
    return jest.fn().mockImplementation(() => {
        return {};
    })
});

test("It calls onMapLoad", () => {
    const callback = jest.fn();

    const container = render(<MapContaier onMapLoad={callback} onMapClick={jest.fn()} loadedPoints={[]} />);

    expect(callback).toHaveBeenCalled();
});