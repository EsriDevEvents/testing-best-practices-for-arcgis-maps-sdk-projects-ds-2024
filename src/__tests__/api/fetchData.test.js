import { loadObservations, sendObservation } from "../../api/fetchData";

describe("loadObservations", () => {
    beforeEach(() => {
        fetchMock.doMock();
    });

    afterEach(() => {
        fetchMock.dontMock();
    });

    test("it returns an array", (done) => {
        fetch.mockResponse(JSON.stringify([]));

        loadObservations().then(obs => {
            expect(obs).toEqual([]);
            expect(fetch).toHaveBeenCalledWith("/load");
            done();
        }).catch(done);
    });

    test("it throws an exception", (done) => {
        const theError = new Error("expected");
        fetch.mockReject(theError);

        loadObservations().then((obs) => {
            fail("No Exception thrown");
        }).catch(err => {
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