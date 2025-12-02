### Ejercicio: Extiende la API agregando: 
- endpoints para estadísticas (conteo de tareas por estado, búsquedas más avanzadas), 
- validación más robusta usando una librería como Joi, y 
- logging de todas las operaciones en un archivo. 
- Implementa también un endpoint para exportar datos en formato CSV.


## Puesta en marcha de la aplicación

A continuación se detallan las instrucciones para poner en marcha la aplicación en un entorno de desarrollo local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema.

### Instalación

1.  Clona el repositorio o descarga el código fuente.
2.  Abre una terminal en el directorio raíz del proyecto.
3.  Instala las dependencias del proyecto ejecutando el siguiente comando:

    ```bash
    npm install
    ```

### Ejecución

La aplicación se puede ejecutar en dos modos:

#### Modo de Desarrollo

Este modo utiliza `nodemon` para reiniciar automáticamente el servidor cada vez que se detecta un cambio en el código fuente.

```bash
npm run dev
```

#### Modo de Producción

Este modo inicia el servidor de forma estándar.

```bash
npm start
```

Una vez que el servidor esté en funcionamiento, puedes acceder a la API en la siguiente URL:

[http://localhost:3000](http://localhost:3000)