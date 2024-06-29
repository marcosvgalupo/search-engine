import {Header} from "./components/header.tsx";
import {Footer} from "./components/footer.tsx";
import {SearchList} from "./components/search-list.tsx";
import { useState } from "react";
import { DataElement, SearchInput } from "./components/search-input.tsx";
import { SearchProps, useSearch } from "./hooks/useSearch.ts";
import { usePagination } from "./hooks/usePagination.ts";


const emptyData: DataElement = {
  Hits: [],
  suggest: "",
  total: 0
};

export function App() {

  const [home, setHome] = useState(true);
  const { searchTerm, setSearchTerm, handleSearch, data, setData } = useSearch(emptyData);
  const paginationProps = usePagination(data.total, handleSearch);

  const searchProps: SearchProps = {
    searchTerm,
    setSearchTerm,
    data,
    setData,
    handleSearch,
  };

  return (
      <div className="flex flex-col min-h-screen bg-zinc-800">
        <Header className="sticky top-0"/>
        {
        (!home)

        }
        <div className="flex-1 flex flex-col items-center justify-start">
          <SearchInput search={searchProps} pagination={paginationProps} setHome={setHome}/>
          <div className="pt-8 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            {    
              (!home) ? 
              (<SearchList search={searchProps} pagination={paginationProps}/> ) : 
              (<p></p>)     
            } 
          </div>    
        </div>
        <Footer/>
      </div>
  )
}