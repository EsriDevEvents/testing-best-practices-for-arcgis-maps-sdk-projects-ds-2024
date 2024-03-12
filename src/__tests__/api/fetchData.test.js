import { loadObservations, sendObservation } from "../../api/fetchData";

describe("loadObservations", () => {
    // Start up jest-fetch-mock
    beforeEach(() => {
        fetchMock.doMock();
    });

    // Shutdown jest-fetch-mock
    afterEach(() => {
        fetchMock.dontMock();
    });

    test("it returns an array", (done) => {
        // Have fetch return a specific value
        fetch.mockResponse(JSON.stringify([]));

        loadObservations().then(obs => {
            expect(obs).toEqual([]);

            // Inspect what we called fetch with
            expect(fetch).toHaveBeenCalledWith("/load");
            done();
        }).catch(done);
    });

    test("it throws an exception", (done) => {
        // Force fetch to throw an error
        const theError = new Error("expected");
        fetch.mockReject(theError);

        loadObservations().then((obs) => {
            fail("No Exception thrown");
        }).catch(err => {
            // We need to check that the error we got was the expected one
            expect(err).toBe(theError);
            done();
        });
    });
});

describe("sendObservation", () => {
    const obs = { x: 1, y: 2, observation: "obs" };

    beforeEach(() => {
        fetchMock.doMock();
    });
    afterEach(() => {
        fetchMock.dontMock();
    });

    test("it sends the observations", (done) => {
        fetch.mockResponse("ok");

        sendObservation(obs).then(() => {
            // This test is similar to the one above, but we can dive into the 
            //  parameters to check all of them.
            expect(fetch).toHaveBeenCalledWith("/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obs)
            });

            done();
        }).catch(done);
    });

    test("it handles an error", (done) => {
        const theError = new Error("expected");
        fetch.mockReject(theError);

        sendObservation(obs).then(() => {
            fail("No exception thrown");
        }).catch(err => {
            expect(err).toEqual(theError);
            done();
        });
    });
});