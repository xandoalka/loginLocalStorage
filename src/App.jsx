import { Outlet } from "react-router-dom"
import Nav from "./component/Nav"



function App() {

  return (
    <main className="bg-gray-100 min-h-screen ">
      <Outlet></Outlet>
    </main>
  )
}

export default App
