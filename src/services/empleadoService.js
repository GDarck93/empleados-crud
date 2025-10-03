//Datos de Mockapi
import axios from "axios";

const readEmpleados = async() => {
    try {
        const result = await axios.get("https://68b75bdc73b3ec66cec47b86.mockapi.io/empleados");
        //console.log(result);
        if(result.status === 200){
            return result.data;
        }else{
            throw new Error("Error en la llamada a la API");
        }
    }catch(error){
        //console.log(error)
        throw error;
    }
}

const readEmpleadosById = async(id) => {
    try {
        const result = await axios.get(`https://68b75bdc73b3ec66cec47b86.mockapi.io/empleados/${id}`);
        //console.log(result);
        if(result.status === 200){
            return result.data;
        }else{
            throw new Error("Error en la llamada a la API");
        }
    }catch(error){
        //console.log(error)
        throw error;
    }
}


const createEmpleado = async(newEmpleado) => {
    try {
        const result = await axios.post("https://68b75bdc73b3ec66cec47b86.mockapi.io/empleados", newEmpleado);
        //console.log(result);
        if(result.status === 201){
            return result.data;
        }else{
            throw new Error("Error en la llamada a la API");
        }
    }catch(error){
        //console.log(error)
        throw error;
    }
}

const updateEmpleado = async(updatedEmpleado) => {
    try {
        const result = await axios.put(`https://68b75bdc73b3ec66cec47b86.mockapi.io/empleados/${updatedEmpleado.id}`, updatedEmpleado);
        //console.log(result);
        if(result.status === 200){
            return result.data;
        }else{
            throw new Error("Error en la llamada a la API");
        }
    }catch(error){
        //console.log(error)
        throw error;
    }
}

const deleteEmpleado = async(id) => {
    try {
        const result = await axios.delete(`https://68b75bdc73b3ec66cec47b86.mockapi.io/empleados/${id}`);
        //console.log(result);
        if(result.status === 200){
            return true;
        }else{
            throw new Error("Error en la llamada a la API");
        }
    }catch(error){
        //console.log(error)
        throw error;
    }
}

export{
    readEmpleados,
    createEmpleado,
    readEmpleadosById,
    updateEmpleado,
    deleteEmpleado
}