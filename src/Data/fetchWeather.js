const API_URL = 'http://localhost:8081/api'

const fetchWeatherFromPlace = (place) => {
    const url = `${API_URL}/${place}`;
    return fetch(url).then(async (data) => {
        data = await data.json();
        if(data.cod === 200 ){
            localStorage.setItem("weather-place", place);
            return data;
        }else throw new Error()
    }).catch(err => {
        console.log("Err occured")
        return { cod: 400 }
    });
}

export {
    fetchWeatherFromPlace,
}