// SearchInput.tsx
import React, { ComponentProps, useState } from "react";
import { fetchApi } from "../connection/api";
import { twMerge } from "tailwind-merge";



export interface DataElement{
    Hits: Hits[]
    suggest: string
    total: number
}

export interface Hits{
  title: string;
  url: string;
  abs: string;
}


interface Props  extends ComponentProps<'input'>{
  setData?: React.Dispatch<React.SetStateAction<DataElement>>;
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setShowing: React.Dispatch<React.SetStateAction<number>>;
  page: number
}




export function SearchInput({setData, setHome, setPage, setShowing, page,...props}: Props) {

  const [searchTerm, setSearchTerm] = useState("");
  const emptySearch = /^[\s]*$/


  const handleSearch = async() => {
    const responseData = await fetchApi(searchTerm, page);
    if(responseData.length < 10){
      setShowing(responseData.length)
      console.log("entrou")
    }
    else{
      setShowing(10);
    }
    if(setData) setData(responseData);
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.type === "keydown" && event.key === "Enter" && !emptySearch.test(searchTerm) ) {
      event.preventDefault();
      setSearchTerm("");
      setHome(false);
      setPage(1);
      handleSearch();
    }
  };

  const handleClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(e.type == "click" &&  !emptySearch.test(searchTerm) ){
      e.preventDefault();
      setSearchTerm("");
      setHome(false);
      setPage(1);
      handleSearch();
    }
  }


  
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
      <button type="submit" className="flex items-center" onClick={handleClick}>
        <img src="src/icons/search-icon.svg" alt="Search Icon" />
      </button>
    </form>
  );
}