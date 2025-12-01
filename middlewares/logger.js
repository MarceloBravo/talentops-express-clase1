
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');

// Asegurarse de que el directorio de logs existe
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, 'app.log');

/**
 * Escribe un registro en el archivo de logs.
 * @param {object} logData - Objeto con la información a registrar.
 */
const log = (logData) => {
    const timestamp = new Date().toISOString();
    const logEntry = JSON.stringify({ timestamp, ...logData }) + '\n';

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de log:', err);
        }
    });
};

module.exports = log;
