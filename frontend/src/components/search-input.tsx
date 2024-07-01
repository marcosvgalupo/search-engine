// SearchInput.tsx
import React, { ComponentProps } from "react";
import { fetchApi } from "../connection/api";
import { twMerge } from "tailwind-merge";
import { SearchProps } from "../hooks/useSearch";
import { PaginationProps } from "../hooks/usePagination";



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
  search: SearchProps;
  pagination: PaginationProps
  setHome: React.Dispatch<React.SetStateAction<boolean>>
}




export function SearchInput({search, pagination, setHome,...props}: Props) {

  const emptySearch = /^[\s]*$/


  const handleSearch = async() => {
    const responseData = await fetchApi(search.searchTerm, pagination.page);
    if(responseData.Hits.length < 10){  
      pagination.setShowing(responseData.Hits.length)
    }
    else{
      pagination.setShowing(10);
    }
    search.setData(responseData);
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.type === "keydown" && event.key === "Enter" && !emptySearch.test(search.searchTerm) ) {
      event.preventDefault();
      setHome(false);
      pagination.setPage(1);
      handleSearch();
    }
  };

  const handleClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(e.type == "click" &&  !emptySearch.test(search.searchTerm) ){
      e.preventDefault();
      setHome(false);
      pagination.setPage(1);
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
        value={search.searchTerm}
        onChange={(e) => search.setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="submit" className="flex items-center" onClick={handleClick}>
        <img src="src/icons/search-icon.svg" alt="Search Icon" />
      </button>
    </form>
  );
}