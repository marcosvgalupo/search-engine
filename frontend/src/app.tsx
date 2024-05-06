import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {SearchList} from "./components/Table/SearchList.tsx";
import {fetchApi} from "./connection/api.ts"
import { useState } from "react";
import { SearchInput } from "./components/SearchInput.tsx";

export function App() {

  const [home, setHome] = useState(1);




  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="pt-20 flex-1 flex place-items-start justify-center">
          <SearchInput />
          {
          (home == 1) ? (<SearchList /> ) : ( <button/> ) 
          }     
        </div>
        <Footer />
      </div>
  )
}
