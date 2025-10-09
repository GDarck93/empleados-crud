import formatFecha from "../services/formatFecha";
/**
 * 
 * @param {headers:array, data:array} 
 * @returns 
 */

const TableData = ({ headers, data, actions }) => {
    console.log("TableData", data);
    return (
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
                {data && data.length > 0 ? data.map((item) => (
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
                )) : (
                    <tr>
                        <td colSpan={headers.length + 1} className="text-center py-4">
                            No hay datos disponibles
                        </td>
                    </tr>
                )}
            </tbody>

        </table>
    )
};

export default TableData;