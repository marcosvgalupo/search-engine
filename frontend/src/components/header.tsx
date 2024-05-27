import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Weather, WeatherInfo } from "./Weather";

interface HeaderProps extends ComponentProps<'header'>{}


export function Header(props: HeaderProps){


    const [weather, setWeather] = useState<WeatherInfo>();


    return (
        <header 
        {...props} 
        className={
            twMerge("h-20 flex items-center justify-between ml-4 mr-7 bg-zinc-800", props.className)
        }>
            <h1 className="ml-6 text-amber-300">Logo</h1>
            <Weather setWeather={setWeather} weather={weather}/>
        </header>
    )
}