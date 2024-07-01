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
        <div className="flex items-stretch space-x-0">
            <img src="src/icons/chevron-left.svg" className="inline-block" />
            <img src="src/icons/chevron-right.svg" className="inline-block" />
            <span className="text-amber-300 font-redditMono font-semibold text-lg">datahunter</span>
        </div>
            <Weather setWeather={setWeather} weather={weather}/>
        </header>
    )
}