import { ComponentProps, useEffect} from "react";
import { twMerge } from "tailwind-merge";
import { fetchWeatherApi } from "../connection/weather-api";


export interface WeatherInfo{
    main: string,
    temp: string,
    country: string,
    name: string,
    icon: string,
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
        { weather ? (
                <div className="text-white justify-center items-center">
                  <div className="flex justify-center place-items-center">
                    <img src={"https://openweathermap.org/img/wn/"+ weather.icon + ".png"} alt="weather-icon" />
                    <p className="text-lg font-rubik font-medium">{weather.temp}</p>
                    <div className="flex flex-col ml-2">
                       <p className="text-xs font-rubik font-semibold">{weather.main}</p>
                       <p className="text-xs font-redditMono">{weather.name} | {weather.country}</p>
                    </div>
                  </div>
                </div>
          ) : (
        <p className="text-white">Loading...</p>
      )}
        </div>
    )
}