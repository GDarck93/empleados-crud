import { useState, useEffect } from "react";
import { readEmpleados, deleteEmpleado } from "../services/empleadoService";
import TableData from "../components/TableData";
import { Link } from "react-router-dom";
import { UserRoundPen, UserRoundMinus, UserRoundPlus } from "lucide-react";
import formatFecha from "../services/formatFecha";
import Swal from "sweetalert2";

const EmpleadosView = () => {
  const [empleados, setEmpleados] = useState([]);

  const headers = [
    { name: "empleado_nombre", label: "Nombres" },
    { name: "empleado_apellido", label: "Apellidos" },
    { name: "empleado_fnacimiento", label: "F.Nacimiento" },
    { name: "empleado_gerencia", label: "Gerencia" },
    { name: "empleado_avatar", label: "Avatar" },
  ];


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de elmininar al empleado?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
        theme: 'white'
      });
      if (result.isConfirmed) {
        await deleteEmpleado(id);
        Swal.fire({
          icon: 'success',
          title: 'Empleado eliminado correctamente',
          showConfirmButton: false,
          timer: 1500,
          theme: 'white'
        });
        setEmpleados(empleados.filter(emp => emp.id !== id));//Actualizar la lista sin el empleado eliminado
      }

    }
    catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el empleado',
        text: error.message,
        confirmButtonText: 'Cerrar',
        theme: 'dark'
      });
    }
  }

  const actions = [
    {
      name: "Editar",
      content: (id) => (
        <Link to={`/editar/${id}`} className="btn btn-sm btn-outline btn-warning">
          <UserRoundPen />
        </Link>
      ),
    },
    {
      name: "Eliminar",
      content: (id) => (
        <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(id)}>
          <UserRoundMinus />
        </button>
      ),
    },
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

      <div className="flex justify-between items-center mb-4 p-4 bg-base-200 rounded-lg shadow">
        <h1 className="font-bold text-xl text-base-content">Empleados</h1>
        <input type="text" placeholder="Buscar" className="input input-bordered w-24 md:w-64" />
        <div className="tooltip" data-tip="Crear nuevo empleado">
          <Link to="/crear" className="btn btn-success text-white btn-sm">
            <UserRoundPlus />
          </Link>
        </div>
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

      <TableData data={empleados} headers={headers} actions={actions} />
    </div>
  );
};

export default EmpleadosView;
