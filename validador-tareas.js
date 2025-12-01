const Joi = require('joi');

// Esquema para la creación de una tarea (solo titulo es requerido)
const crearTareaSchema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': 'El título debe ser texto.',
            'string.empty': 'El título no puede estar vacío.',
            'string.min': 'El título debe tener al menos {#limit} caracteres.',
            'string.max': 'El título no puede tener más de {#limit} caracteres.',
            'any.required': 'El título es un campo requerido.'
        }),
    descripcion: Joi.string()
        .max(255)
        .optional()
        .allow('') // Permite que la descripción sea un string vacío
        .messages({
            'string.base': 'La descripción debe ser texto.',
            'string.max': 'La descripción no puede tener más de {#limit} caracteres.'
        })
});

// Esquema para la actualización completa (PUT), donde se espera el recurso completo
const actualizarTareaSchema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': 'El título debe ser texto.',
            'string.empty': 'El título no puede estar vacío.',
            'string.min': 'El título debe tener al menos {#limit} caracteres.',
            'any.required': 'El título es un campo requerido.'
        }),
    descripcion: Joi.string()
        .max(255)
        .optional()
        .allow(''),
    completada: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'El campo "completada" debe ser un valor booleano.',
            'any.required': 'El campo "completada" es requerido para una actualización completa (PUT).'
        })
});

// Esquema para la actualización parcial (PATCH), donde todos los campos son opcionales
const actualizacionParcialTareaSchema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
            'string.base': 'El título debe ser texto.',
            'string.min': 'El título debe tener al menos {#limit} caracteres.',
            'string.max': 'El título no puede tener más de {#limit} caracteres.'
        }),
    descripcion: Joi.string()
        .max(255)
        .optional()
        .allow('')
        .messages({
            'string.base': 'La descripción debe ser texto.',
            'string.max': 'La descripción no puede tener más de {#limit} caracteres.'
        }),
    completada: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'El campo "completada" debe ser un valor booleano.'
        })
});


// Función genérica que crea un middleware de validación
const validarConEsquema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false, // Recoger todos los errores de una vez
            allowUnknown: true // Ignorar propiedades no definidas en el esquema
        });

        if (error) {
            const errores = error.details.map(detalle => detalle.message);
            return res.status(400).json({
                error: 'Datos inválidos',
                detalles: errores
            });
        }

        next();
    };
};

// Exportamos un middleware específico para cada operación
module.exports = {
    validarCreacionTarea: validarConEsquema(crearTareaSchema),
    validarActualizacionTarea: validarConEsquema(actualizarTareaSchema),
    validarActualizacionParcialTarea: validarConEsquema(actualizacionParcialTareaSchema)
};