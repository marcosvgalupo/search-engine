import {Header} from "./components/header.tsx";
import {Footer} from "./components/footer.tsx";
import {SearchList} from "./components/Table/search-list.tsx";
import {fetchApi} from "./connection/api.ts"
import { useState } from "react";
import { DataElement, SearchInput } from "./components/search-input.tsx";

export function App() {

  const [home, setHome] = useState(1);
  const [data, setData] = useState<DataElement[]>([]);



  return (
      <div className="flex flex-col min-h-screen">
        <Header className="sticky top-0"/>
        <div className="flex-1 flex place-items-start justify-center">
          <div className="pt-8 flex flex-col justify-start place-items-center gap-6" style={{height: "calc(100vh - 20em)", width: "calc(100% - 40em)"}}>
            <SearchInput setData={setData}/>
            {    (home == 1) ? (<SearchList data={data}/> ) : (<p></p>)     } 
          </div>    
        </div>
        <Footer/>
      </div>
  )
}
