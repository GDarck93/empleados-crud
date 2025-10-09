import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { readEmpleadosById, updateEmpleado } from "../services/empleadoService";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
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
    const handleSubmit = async (event) => {
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


            <div className="flex justify-between items-center mb-4 p-4 bg-base-200 rounded-lg shadow h-20">
                <div className="flex items-center gap-4">
                    <Link to="/" className="btn btn-outline btn-sm flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Volver
                    </Link>

                    <h1 className="font-bold text-xl text-base-content">Editar Empleado</h1>
                </div>
            </div>


            <form onSubmit={handleSubmit} className="card bg-base-200 shadow-md max-w-md mx-auto p-6 space-y-4">
                {inputsInfo.map((item, index) => (
                    <div key={index} className="form-control">
                        <label htmlFor={item.name} className="label">
                            <span className="label-text font-semibold">{item.label}:</span>
                        </label>

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
                    <div className="form-control items-center">
                        <label className="label">
                            <span className="label-text font-semibold">Vista Previa:</span>
                        </label>
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={avatarPreview} alt="Vista Previa" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary">
                        Actualizar
                    </button>
                </div>
            </form>
        </div>

    );
}

export default EmpleadoEditView