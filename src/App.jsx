import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpleadosView from "./views/EmpleadosView";
import EmpleadoCreateView from "./views/EmpleadoCreateView";
import Navbar from "./components/Navbar";
import EmpleadoEditView from "./views/EmpleadoEditView";

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
        <Route path="/editar/:id" element={<EmpleadoEditView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App