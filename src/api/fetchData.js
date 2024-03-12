// API functions for calling the service

/**
 * Get all the observations from the server
 * 
 * @returns A JSON object from the server
 */
export async function loadObservations() {
    return fetch("/load").then(res => res.json()).then(resJson => { return resJson }).catch(err => { throw err });
}

/**
 * Save an observation to the database.
 * 
 * @param {Object} observation the observation to store
 * @returns if save successful
 * @throws if something went wrong saving
 */
export async function sendObservation(observation) {
    return fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(observation)
    }).then(() => {
        console.log("observation saved");
        return;
    }).catch(err => { throw err });
}