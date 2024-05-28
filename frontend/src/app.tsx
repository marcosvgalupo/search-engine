import {Header} from "./components/header.tsx";
import {Footer} from "./components/footer.tsx";
import {SearchList} from "./components/search-list.tsx";
import { useState } from "react";
import { DataElement, SearchInput } from "./components/search-input.tsx";

export function App() {

  const [home, setHome] = useState(true);
  const [data, setData] = useState<DataElement[]>([]);
  const [page, setPage] = useState(1);
  const [showing, setShowing] = useState(10)



  return (
      <div className="flex flex-col min-h-screen bg-zinc-800">
        <Header className="sticky top-0"/>
        <div className="flex-1 flex flex-col items-center justify-start">
          <SearchInput setData={setData} setHome={setHome} setPage={setPage} setShowing={setShowing}/>
          <div className="pt-8 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            {    
              (!home) ? 
              (<SearchList data={data} page={page} setPage={setPage} showing={showing} setShowing={setShowing}/> ) : 
              (<p></p>)     
            } 
          </div>    
        </div>
        <Footer/>
      </div>
  )
}
