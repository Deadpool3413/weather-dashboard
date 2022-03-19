const API_KEY = "efce923fdeaa8b3017a1d2da22a5ca95"
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall';
const defaultCoords = { lat: 33.625274, lon: -112.218690 };

// $(document).ready(() => {
//     // Initial data fetch
//     fetchWeather();
// })

// easy way to reuse and build the url
/**
 * 
 * @param lat: latitude desired - default from defaultCoords
 * @param long: longitude desired - default from defaultCoords
 * @returns Promise<whatever the data is>
 */
const getUrl = (lat, lon) => {
    const urlLat = lat || defaultCoords.lat;
    const urlLon = lon || defaultCoords.lon
    return `${BASE_URL}?units=imperial&lat=${urlLat}&lon=${urlLon}&appid=${API_KEY}`;
}

const fetchWeather = async (lat, lon) => {
    return await fetch(getUrl())
        .then((res) => res.json())
        //.then((res) => $('.data-json').append(JSON.stringify(res, null, 2)))
        //.catch((err) => console.error('WEATHER ERR: ', err));
        .then((res) => $('.temp').append(res.current.temp))
        .catch((err) => state['error'] = err);
};