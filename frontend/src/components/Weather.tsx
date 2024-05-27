import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fetchWeatherApi } from "../connection/weather-api";


export interface WeatherInfo{
    main: string,
    temp: string,
    country: string,
    name: string
}


interface WeatherProps extends ComponentProps<'div'>{
    setWeather: React.Dispatch<React.SetStateAction<WeatherInfo | undefined>>,
    weather: WeatherInfo | undefined
}


export function Weather({weather, setWeather, ...props}: WeatherProps){

    useEffect(() => {
        const handleSearch = async () => {
          try {
            const weather = await fetchWeatherApi();
            setWeather(weather);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
        handleSearch();
      }, [setWeather]);


    return (
        <div 
        {...props}
        className={
            twMerge(
                "h-40 bg-zinc-800 flex items-center justify-center",
                props.className
            )
        }
        >   
                {weather ? (
                    <div className="text-white">
          <p>{`Clima: ${weather.main}`}</p>
          <p>{`Temperatura: ${weather.temp}`}</p>
          <p>{`Localização: ${weather.name}, ${weather.country}`}</p>
        </div>
      ) : (
        <p className="text-white">Carregando...</p>
      )}
        </div>
    )
}