// Función para formatear fecha a dd/mm/yyyy
const formatFecha = (fechaStr) => {
  if (!fechaStr) return "";
  const fechaNum = Number(fechaStr);
  let fecha;
  if (!isNaN(fechaNum)) {
    // Si el número tiene más de 10 dígitos, es milisegundos
    fecha = fechaStr.length > 10 ? new Date(fechaNum) : new Date(fechaNum * 1000);
  } else {
    fecha = new Date(fechaStr);
  }
  if (isNaN(fecha.getTime())) return fechaStr;
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export default formatFecha;