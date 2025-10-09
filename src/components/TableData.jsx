import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import formatFecha from "../services/formatFecha";

/**
 * @param {headers: array, data: array, actions: array}
 * @returns Table with pagination
 */
const TableData = ({ headers, data, actions }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 8;

  const totalPaginas = Math.ceil(data.length / elementosPorPagina);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;
  const datosPaginados = data.slice(indiceInicio, indiceFin);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  const botonesPaginacion = [];
  for (let i = 1; i <= totalPaginas; i++) {
    botonesPaginacion.push(
      <button
        key={i}
        onClick={() => cambiarPagina(i)}
        className={`btn btn-sm mx-1 ${paginaActual === i ? 'btn-primary' : 'btn-outline'}`}
      >
        {i}
      </button>
    );
  }

  return (
    <div>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base-content font-bold">
          <tr>
            {headers.map((item, index) => (
              <th key={index} className="text-center">
                {item.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="text-center">Acciones</th>
            )}
          </tr>
        </thead>

        <tbody>
          {datosPaginados && datosPaginados.length > 0 ? (
            datosPaginados.map((item) => (
              <tr key={item.id}>
                {headers.map((head, index) => (
                  <td key={index} className="text-center">
                    {head.name === "empleado_fnacimiento"
                      ? formatFecha(item[head.name])
                      : head.name === "empleado_avatar" && item[head.name]
                      ? (
                          <div className="avatar">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                              <img src={item[head.name]} alt="Avatar" />
                            </div>
                          </div>
                        )
                      : item[head.name]
                    }
                  </td>
                ))}
                <td className="text-center space-x-2">
                  {actions.map((action, index) => (
                    <span key={index}>
                      {action.content(item.id)}
                    </span>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center py-4">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-4 flex-wrap gap-2">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            className="btn btn-sm btn-outline"
            disabled={paginaActual === 1}
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          {botonesPaginacion}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            className="btn btn-sm btn-outline"
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TableData;