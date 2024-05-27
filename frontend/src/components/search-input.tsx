// SearchInput.tsx
import React, { ComponentProps, useState } from "react";
import { fetchApi } from "../connection/api";
import { twMerge } from "tailwind-merge";



export interface DataElement{
    title: string;
    url: string;
    abs: string;
}


interface Props  extends ComponentProps<'input'>{
  setData?: React.Dispatch<React.SetStateAction<DataElement[]>>;
  setHome: React.Dispatch<React.SetStateAction<boolean>>;

}




export function SearchInput({setData, setHome, ...props}: Props) {

  const [searchTerm, setSearchTerm] = useState("");




  const handleSearch = async() => {
    const responseData = await fetchApi(searchTerm);
    if(setData)
      setData(responseData);
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchTerm("");
      setHome(false);
      handleSearch();
    }
  };


  
  return (
    <form
      style={{ width: "30em", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
      className="px-3 h-12 py-1.5 border border-white/10 rounded-full text-sm flex items-center gap-3 bg-zinc-800 outline-none shadow-slate-50"
    >
      <input
        id="search-input"
        {...props}
        className={
          twMerge(
            "input-autofill bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm text-white placeholder-[#fceaa1]",
            props.className
          ) 
        }
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="button" className="flex items-center" onClick={handleSearch}>
        <img src="src/icons/search-icon.svg" alt="Search Icon" />
      </button>
    </form>
  );
}
