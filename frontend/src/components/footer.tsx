import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { WeatherInfo, Weather } from "./Weather";


interface FooterProps extends ComponentProps<'footer'>{}


export function Footer(props: FooterProps){

    const [weather, setWeather] = useState<WeatherInfo>();


    return (
        <footer 
        {...props}
        className={
            twMerge(
                "h-40 bg-zinc-800 flex items-center justify-center",
                props.className
            )
        }
        >    
            <Weather setWeather={setWeather} weather={weather}/>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h2 className="text-lg mb-2 font-bold text-white">Created by</h2>
                <a className="text-[#fff5cb]" href="">Marcos Vyctor Fonseca Galupo</a>
                <a className="text-[#fff5cb]" href="">Otávio Augusto Souza Martins</a>
            </div>
        </footer>
    )
}