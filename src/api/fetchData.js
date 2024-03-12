export async function loadObservations() {
    return fetch("/load").then(res => res.json()).then(resJson => { return resJson }).catch(err => { throw err });
}

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