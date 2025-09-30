import { useState } from "react";

//Objeto empleado
const EmpleadoCreateView = () => {
    const [empleado, setEmpleado] = useState({
        empleado_nombre: "",
        empleado_apellido: "",
        empleado_fnacimiento: "",
        empleado_gerencia: "",
        empleado_avatar: null,
    });

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

    return (
        <div>
            <h1 className="font-bold text-xl bg-gray-200 p-4 text-center">Crear Empleado</h1>
            <form action="" className="flex flex-col gap-4 my-4 bg-white p-4 border border-slate-300 max-w-md mx-auto">
                <input type="text" placeholder="Nombres" value={empleado.empleado_nombre} onChange={handleInput} name="empleado_nombre" className="border border-slate-300 p-2 rounded" />
                <input type="text" placeholder="Apellidos" value={empleado.empleado_apellido} onChange={handleInput} name="empleado_apellido" className="border border-slate-300 p-2 rounded" />
                <input type="date" placeholder="F.Nacimiento" value={empleado.empleado_fnacimiento} onChange={handleInput} name="empleado_fnacimiento" className="border border-slate-300 p-2 rounded" />
                <input type="text" placeholder="Gerencia" value={empleado.empleado_gerencia} onChange={handleInput} name="empleado_gerencia" className="border border-slate-300 p-2 rounded" />
                <label htmlFor="avatar" className="cursor-pointer bg-gray-100 border border-slate-300 p-2 rounded text-center hover:bg-gray-200 transition" value={empleado.empleado_avatar} onChange={handleInput}>
                    {avatar ? avatar.name : "Selecciona una imagen de avatar"}
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </label>
                {avatarPreview && (
                    <img src={avatarPreview} alt="Avatar preview" className="mx-auto my-2 rounded-full w-24 h-24 object-cover border" />
                )}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear</button>
                
            </form>
        </div>
    )
}

export default EmpleadoCreateView;