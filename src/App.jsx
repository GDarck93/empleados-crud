import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpleadosView from "./views/EmpleadosView";
import EmpleadoCreateView from "./views/EmpleadoCreateView";

const App = () => {
  return (
    //<div>
    //  App
    //  <EmpleadosView />
    //</div>
    <BrowserRouter>
      <h1 className="text-center text-2xl font-bold my-4">Empleados CRUD</h1>
      <Routes>
        <Route path="/" element={<EmpleadosView />} />
        <Route path="/crear" element={<EmpleadoCreateView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
