import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps extends ComponentProps<'header'>{}

export function Header(props: HeaderProps){
    return (
        <header 
        {...props} 
        className={
            twMerge("h-20 bg-zinc-800 flex items-center", props.className)
        }>
            <h1 className="ml-6 text-amber-300">Logo</h1>
        </header>
    )
}