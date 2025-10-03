import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { readEmpleadosById, updateEmpleado } from "../services/empleadoService";
import Swal from "sweetalert2";
import formatFecha from "../services/formatFecha";

const EmpleadoEditView = () => {
    const [empleado, setEmpleado] = useState({
        empleado_nombre: "",
        empleado_apellido: "",
        empleado_fnacimiento: "",
        empleado_gerencia: "",
        //empleado_avatar: ""
    });

    const { id } = useParams();//hook para capturar el id de la URL

    const navigate = useNavigate();

    const handleImput = (event) => {
        setEmpleado({
            ...empleado,
            [event.target.name]: event.target.value
        });
    };

    //Enviar formulario
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await updateEmpleado(empleado);
            Swal.fire({
                icon: 'success',
                title: 'Datos del empleado actualizados correctamente',
                showConfirmButton: false,
                timer: 1500,
                theme: 'white'
            });
            navigate("/");
            //alert("Empleado actualizado correctamente");
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar detos del empleado',
                text: error.message,
                confirmButtonText: 'Cerrar',
                theme: 'dark'
            });
            //alert("Error al actualizar el empleado");
        }
    };

    const inputsInfo = [
        { name: "empleado_nombre", label: "Nombres", type: "text", placeholder: "Ingrese nombres" },
        { name: "empleado_apellido", label: "Apellidos", type: "text", placeholder: "Ingrese apellidos" },
        { name: "empleado_fnacimiento", label: "F.Nacimiento", type: "date", placeholder: "Ingrese fecha de nacimiento" },
        { name: "empleado_gerencia", label: "Gerencia", type: "text", placeholder: "Ingrese gerencia" },
        { name: "empleado_avatar", label: "Avatar", type: "file", placeholder: "Ingrese URL del avatar" },
    ];
    
    const [avatarPreview, setAvatarPreview] = useState("");

    useEffect(() => {
        const getEmpleado = async () => {
            try {
                const data = await readEmpleadosById(id);
                setEmpleado(data);
                setAvatarPreview(data.empleado_avatar); // Actualiza vista previa
            } catch (error) {
                console.log(error);
            }
        };
        getEmpleado();
    }, []);

    //Avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            setEmpleado({ ...empleado, empleado_avatar: file }); // Guarda el archivo, no la URL
        }
    };



    return (
        <div>
            <h1 className="font-bold text-xl bg-gray-200 p-4 text-center">Editar Empleado</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4 p-4 border border-gray-300 rounded">
                    {inputsInfo.map((item, index) => (
                        <div key={index}>
                            <label htmlFor={item.name} className="block mb-1 font-semibold text-gray-700">{item.label}:</label>
                            {item.name === "empleado_avatar" ? (
                                <input
                                    type="file"
                                    name={item.name}
                                    id={item.name}
                                    onChange={handleAvatarChange}
                                    className="file-input file-input-bordered w-full"
                                />
                            ) : (
                                <input
                                    type={item.type}
                                    name={item.name}
                                    id={item.name}
                                    placeholder={item.placeholder}
                                    value={empleado[item.name]}
                                    onChange={handleImput}
                                    className="input input-bordered w-full"
                                />
                            )}
                        </div>
                    ))}

                    {avatarPreview && (
                        <div className="mb-3 p-2 flex flex-col items-center">
                            <label className="block mb-1 font-semibold text-gray-700">Vista Previa:</label>
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg bg-white flex items-center justify-center overflow-hidden">
                                    <img src={avatarPreview} alt="Vista Previa" className="w-full h-full object-cover"/>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="card-actions justify-end mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-200">Actualizar</button>
                    </div>
                </form>
        </div>
    );
}

export default EmpleadoEditView