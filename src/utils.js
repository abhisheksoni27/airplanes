const R = 6371; // earth radius in km
const radius = 10; // km

export const getCurrentLocation = (prevLocation) => {
    return new Promise((resolve, reject) => {
        let currentLocation;
        if ('geolocation' in navigator) {

            navigator.geolocation.getCurrentPosition(function (position) {
                currentLocation = prevLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                resolve({
                    currentLocation,
                    timestamp: position.timestamp
                })
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



export const getBoundingBox = (location, prevLocation, prevBoundingBox) => {
    let currentBoundingBox;

    if (prevLocation && location.latitude === prevLocation.latitude && location.longitude === prevLocation.longitude && prevBoundingBox) {
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

export const sendNotification = (totalPlanes) => {
    navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(`There are currently ${totalPlanes} planes flying around you.`);

    });
}