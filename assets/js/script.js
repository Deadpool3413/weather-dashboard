const API_KEY = "efce923fdeaa8b3017a1d2da22a5ca95"
const BASE_URL = 'https://api.openweathermap.org';
const defaultCoords = { lat: 33.625274, lon: -112.218690 };
const defaultCity = "Peoria"

// $(".fa-search").click()
// $(document).ready(() => {
//     // Initial data fetch
//     fetchWeather();
// })

// easy way to reuse and build the url
/**
 * 
 * @param lat: latitude desired - default from defaultCoords
 * @param long: longitude desired - default from defaultCoords
 * @returns url api string with latitude and longitude appended 
 */
const getWeatherUrl = (lat, lon) => {
    const urlLat = lat || defaultCoords.lat;
    const urlLon = lon || defaultCoords.lon
    return `${BASE_URL}/data/2.5/onecall?units=imperial&lat=${urlLat}&lon=${urlLon}&appid=${API_KEY}`;
}

/**
 * 
 * @param city: city desired - default from defaultCity
 * @returns url api string with latitude and longitude appended 
 */
const getGeoCodeUrl = (city) => {
    const urlCity = city || defaultCity;
    return `${BASE_URL}/geo/1.0/direct?q=${urlCity}&appid=${API_KEY}`
}

const handleRequest = async (url) => {
    const request = await fetch(url)
        .catch((err) => console.log(err));
    return await request.json()
}

const fetchWeather = async (lat, lon) => {
    return await handleRequest(getWeatherUrl(lat, lon))
};
// add js docs later
const fetchLatitudeLongitude = async (city) => {
    return await handleRequest(getGeoCodeUrl(city)) 
}

const fetchCityWeather = async (city) => {
    const cityLatLon = (await fetchLatitudeLongitude(city))[0]
    const cityWeather = await fetchWeather(cityLatLon.lat, cityLatLon.lon)
    return { name: cityLatLon.name, ...cityWeather }
}

const setCityDetails = (cityData) => {
    $(".city").text(cityData.name)
    $(".date").text(cityData.date)
    $(".temp").text(cityData.temp + "°")
    $(".wind-speed").text(cityData.windSpeed + " mph")
    $(".uv").text(cityData.uv)
    $(".humidity").text(cityData.humidity + "%")
}

const getCurrentDate = () => {
    const date = new Date()
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return `${month + 1}/${day}/${year}`
}

const handleCitySearch = async () => {
    const city = $(".form-input").val()
    const cityWeather = await fetchCityWeather(city)
    console.log(cityWeather)
    console.log(city)
    setCityDetails({
        name: cityWeather.name,
        date: getCurrentDate(),
        temp: cityWeather.current.temp,
        windSpeed: cityWeather.current.wind_speed,
        uv: cityWeather.current.uvi,
        humidity: cityWeather.current.humidity
    })
}

// fetchCityWeather("Phoenix");
$(".fa-search").click(()=> handleCitySearch())
