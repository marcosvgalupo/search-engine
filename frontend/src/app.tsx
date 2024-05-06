import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {SearchList} from "./components/Table/SearchList.tsx";
import {fetchApi} from "./connection/api.ts"

export function App() {

  function aa(){
    return fetchApi("\"randomized%20binary\"");
  }

  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="pt-20 flex-1 flex place-items-start justify-center">
          <SearchList />     
        </div>
        <Footer />
      </div>
  )
}
