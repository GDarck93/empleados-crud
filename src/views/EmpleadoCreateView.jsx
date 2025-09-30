import { useState } from "react";
import Input from "../components/Input";
import { createEmpleado } from "../services/empleadoService";

//Objeto empleado
const EmpleadoCreateView = () => {
    const [empleado, setEmpleado] = useState({
        empleado_nombre: "",
        empleado_apellido: "",
        empleado_fnacimiento: "",
        empleado_gerencia: "",
        //empleado_avatar: null,
    });

    //Enviar el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();//Evita que se recargue la pagina
        try {
            await createEmpleado(empleado);
            alert("Empleado creado correctamente");
        } catch (error) {
            console.log(error);
            alert("Error al crear el empleado");
        }
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
            <h1 className="font-bold text-xl bg-gray-200 p-4 text-center">Crear Empleado</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4 p-4 border border-gray-300 rounded">
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
                    <div className="mb-3 p-2 flex flex-col items-center">
                        <label className="block mb-1 font-semibold text-gray-700">Vista Previa:</label>
                        <div className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src={avatarPreview}
                                alt="Vista Previa"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-200"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmpleadoCreateView;