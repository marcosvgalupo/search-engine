import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {SearchList} from "./components/Table/SearchList.tsx";

export function App() {

  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <SearchList />          
        </div>
        <Footer />
      </div>
  )
}
