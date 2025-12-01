/**
 * Convierte un array de objetos de tarea a formato CSV.
 * @param {Array<object>} tareas - El array de tareas a convertir.
 * @returns {string} - Los datos en formato CSV.
 */
function exportarTareasCSV(tareas) {
    if (!tareas || tareas.length === 0) {
        return '';
    }

    const cabeceras = Object.keys(tareas[0]);
    // Filtrar 'fechaCreacion' y 'fechaActualizacion' si no se quieren en el CSV
    const cabecerasFiltradas = cabeceras.filter(c => c !== 'fechaCreacion' && c !== 'fechaActualizacion');
    
    const csvRows = [];
    csvRows.push(cabecerasFiltradas.join(','));

    for (const tarea of tareas) {
        const values = cabecerasFiltradas.map(header => {
            const escaped = ('' + (tarea[header] || '')).replace(/"/g, '""');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

module.exports = {
    exportarTareasCSV,
};

