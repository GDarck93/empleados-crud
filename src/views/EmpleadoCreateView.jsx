import { useState } from "react";
import Input from "../components/Input";
import { createEmpleado } from "../services/empleadoService";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

//Objeto empleado
const EmpleadoCreateView = () => {
    const [empleado, setEmpleado] = useState({
        empleado_nombre: "",
        empleado_apellido: "",
        empleado_fnacimiento: "",
        empleado_gerencia: "",
        //empleado_avatar: null,
    });

    let navigate = useNavigate();

    //Enviar el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();//Evita que se recargue la pagina
        try {
            await createEmpleado(empleado);
            //alert("Empleado creado correctamente");
            Swal.fire({
                icon: 'success',
                title: 'Empleado registrado correctamente',
                showConfirmButton: false,
                timer: 1500,
                theme: 'white'
            });

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar el empleado',
                text: error.message,
                confirmButtonText: 'Cerrar',
                theme: 'dark'
            });
        }
        navigate("/");
    }

    //Inputs
    const handleInput = (event) => {
        console.log(event.target.value);
        setEmpleado({
            ...empleado,
            [event.target.name]: event.target.value,
        });
    }

    //Avatar
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(null);
        }
    };
    

    //Array de inputs
    const InputInfo = [
        { name: "empleado_nombre", label: "Nombres", type: "text" },
        { name: "empleado_apellido", label: "Apellidos", type: "text" },
        { name: "empleado_fnacimiento", label: "F.Nacimiento", type: "date" },
        { name: "empleado_gerencia", label: "Gerencia", type: "text" },
        { name: "empleado_avatar", label: "Avatar", type: "file" },
    ];

    return (
        <div>

            <div className="flex justify-between items-center mb-4 p-4 bg-base-200 rounded-lg shadow">
                <div className="flex items-center gap-4">
                    <Link to="/" className="btn btn-outline btn-sm flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Volver
                    </Link>
                    <h1 className="font-bold text-xl text-base-content">Crear Empleado</h1>
                </div>
            </div>


            <form onSubmit={handleSubmit} className="card bg-base-200 shadow max-w-md mx-auto p-6 space-y-4">
                {InputInfo.map((input, index) => (
                    <Input
                        key={index}
                        value={empleado}
                        name={input.name}
                        label={input.label}
                        type={input.type}
                        handleInput={input.name === "empleado_avatar" ? handleAvatarChange : handleInput}
                    />
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
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Guardar
                    </button>
                </div>
            </form>

        </div>
    )
}

export default EmpleadoCreateView;