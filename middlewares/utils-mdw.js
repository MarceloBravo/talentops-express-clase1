const manejoErrores = (error, req, res, next) => {
    console.error('Error:', error);

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }

  res.status(500).json({
    error: 'Error interno del servidor',
    mensaje: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
}

const manejo404 = (req, res) => {
  res.status(404).json({
      error: 'Ruta no encontrada',
      metodo: req.method,
      ruta: req.url,
      sugerencias: [
        'GET / - Información de la API',
        'GET /tareas - Listar tareas',
        'POST /tareas - Crear tarea'
      ]
    });
}
  
module.exports = {
    manejoErrores,
    manejo404
};
    
