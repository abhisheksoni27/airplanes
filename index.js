const log = console.log;
const R = 6371; // earth radius in km
const radius = 100; // km

let lastAcquiredAt;
let prevLocation;
let prevBoundingBox;
let API_URL = "https://opensky-network.org/api/states/all?";
let notificationPermission;

navigator.serviceWorker.register('sw.js');
Notification.requestPermission(function (result) {
    if (result === 'granted') {
        notificationPermission = true;
    }
});

Notification.requestPermission()

    .then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            notificationPermission = true;
        }
    })

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        let currentLocation;
        if ('geolocation' in navigator) {

            navigator.geolocation.getCurrentPosition(function (position) {
                currentLocation = prevLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                lastAcquiredAt = position.timestamp;

                resolve(currentLocation)
            })

        } else {
            reject(new Error("Geolocation not available!"))
            // TODO
        }
    })
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

const getBoundingBox = (location, prevLocation) => {
    let currentBoundingBox;

    if (location.latitude === prevLocation.latitude && location.longitude === prevLocation.longitude && prevBoundingBox) {
        return prevBoundingBox;
    } else {
        const latitude = location.latitude;
        const longitude = location.longitude;


        const lamin = latitude - toDegrees(radius / R);
        const lamax = latitude + toDegrees(radius / R);
        const lomin = longitude - toDegrees(radius / R / Math.cos(toRadians(latitude)));
        const lomax = longitude + toDegrees(radius / R / Math.cos(toRadians(latitude)));

        currentBoundingBox = prevBoundingBox = {
            lamin,
            lamax,
            lomin,
            lomax
        };

        return currentBoundingBox;
    }

}


const updateUI = (totalPlanes) => {
    document.querySelector("#noOfPlanes").innerText = totalPlanes;
}

const sendNotification = (totalPlanes) => {
    if (notificationPermission) {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(`There are currently ${totalPlanes} planes flying around you.`);

        });
    }
}


function run() {

    getCurrentLocation()
        .catch(err => {
            updateUI(err.message)
        })
        .then(location => {
            const boundingBox = getBoundingBox(location, prevLocation);

            let query = Object.keys(boundingBox)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(boundingBox[k]))
                .join('&');

            const endpoint = API_URL + query;
            return fetch(endpoint);
        })
        .then(res => res.json())
        .then(resJson => {
            if (resJson.states && resJson.states.length > 0) {
                updateUI(resJson.states.length);
                sendNotification(resJson.states.length);
            }
        })
}

run();