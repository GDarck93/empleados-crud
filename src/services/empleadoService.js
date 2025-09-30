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

export{
    readEmpleados
}