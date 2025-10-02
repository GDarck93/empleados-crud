import { useState, useEffect } from "react";
import { readEmpleados } from "../services/empleadoService";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import formatFecha from "../services/formatFecha";

const EmpleadosView = () => {
  const [empleados, setEmpleados] = useState([]);

  const headers = [
    { name: "empleado_nombre", label: "Nombres" },
    { name: "empleado_apellido", label: "Apellidos" },
    { name: "empleado_fnacimiento", label: "F.Nacimiento" },
    { name: "empleado_gerencia", label: "Gerencia" },
    { name: "empleado_avatar", label: "Avatar" },
  ];

  useEffect(() => {
    const getEmpleados = async () => {
      try {
        const empleadosObtained = await readEmpleados();
        console.log(empleadosObtained);
        setEmpleados(empleadosObtained);
      } catch (error) {
        console.log(error);
      }
    };
    getEmpleados();
  }, []);

  //Renderizado de listas con map
  return (
    <div>
      <div className="flex justify-between items-center mb-4 bg-gray-200">
        <h1 className="text-xl p-4">Empleados</h1>
        <input type="text" placeholder="Buscar" class="input input-bordered w-24 md:w-100" />
        {<Link to="/crear" class="btn btn-success text-white">Agregar</Link>}
      </div>


      {/*empleados && empleados.length > 0 ? (
        empleados.map((emp) => (
          <div key={emp.id}>
            <p>
              <img
                src={emp.empleado_avatar}
                alt={emp.empleado_nombre}
                width="100"
              />
            </p>
            <h3>
              {emp.empleado_nombre} {emp.empleado_apellido}
            </h3>
            <p>F.Nacimiento: {formatFecha(emp.empleado_fnacimiento)}</p>
            <p>Gerencia: {emp.empleado_gerencia}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No hay empleados registrados</p>
      )*/}
      <TableData data={empleados} headers={headers} />
    </div>
  );
};

export default EmpleadosView;
