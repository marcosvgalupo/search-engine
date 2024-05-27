const WEATHER_API_KEY = "9a16033c7d3a305c13344bf42ea65a44";

import axios, { AxiosResponse } from 'axios';

const apiURL: string = 'https://api.openweathermap.org/data/2.5/weather?';


function getCurrentLoc(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }



async function fetchWeatherApi(): Promise<any> {
    try {
        const loc: [number, number] = await getCurrentLoc();
        const myLat = "lat=" + loc[0] + "&";
        const myLon = "lon=" + loc[1] + "&";
        const myApiKey = "appid=" + WEATHER_API_KEY;
        console.log("lat:" + myLat + "long:" + myLon)

        const response: AxiosResponse = await axios.get(apiURL + myLat + myLon + myApiKey);
        console.log(response);
        return {
            temp: Math.floor(response.data.main.temp - 273) + " °C",
            main: response.data.weather[0].main,
            country: response.data.sys.country,
            name: response.data.name,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { fetchWeatherApi };
