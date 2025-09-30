import formatFecha from "../services/formatFecha";
/**
 * 
 * @param {headers:array, data:array} 
 * @returns 
 */

const TableData = ({ headers, data }) => {
  console.log("TableData", data);
    return (
        <table className="border-collapse border-t-2 w-full">
            <thead>
                <tr>
                    {headers.map((item,index) => (
                        <th key={index} className="px-4 py-2 border border-slate-300 text-center bg-gray-200">
                            {item.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                        {headers.map((head,index) => (
                            <td key={index} className="border border-slate-300 text-center">
                                {head.name === "empleado_fnacimiento" ? formatFecha(item[head.name]) : item[head.name]}
                            </td>
                        ))}
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={headers.length} className="text-center py-4">No hay datos disponibles</td>
                    </tr>
                )}
            </tbody>
        </table>
)};

export default TableData;