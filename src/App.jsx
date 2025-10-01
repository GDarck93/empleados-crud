import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpleadosView from "./views/EmpleadosView";
import EmpleadoCreateView from "./views/EmpleadoCreateView";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    //<div>
    //  App
    //  <EmpleadosView />
    //</div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmpleadosView />} />
        <Route path="/crear" element={<EmpleadoCreateView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App