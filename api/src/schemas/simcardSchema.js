import z from 'zod';

export const SimcardSchema = z.object({
    id: z.string().optional(),
    numero: z.string({
        invalid_type_error: 'El número debe ser un texto',
        required_error: 'El número es requerido'
    }).min(10, { message: 'El número debe tener al menos 10 caracteres' }),

    estado: z.enum(['Activa', 'Inactiva', 'DeBaja', 'Reposición'], {
        invalid_type_error: 'El estado debe ser uno de los valores permitidos',
        required_error: 'El estado es requerido'
    }).refine((val) => ['Activa', 'Inactiva', 'DeBaja', 'Reposición'].includes(val), {
        message: 'El estado debe ser: Activa, Inactiva, DeBaja o Reposición'
    }),

    apn: z.string({
        invalid_type_error: 'El APN debe ser un texto',
        required_error: 'El APN es requerido'
    }).min(3, { message: 'El APN debe tener al menos 3 caracteres' }),

    user: z.string({
        invalid_type_error: 'El usuario debe ser un texto',
        required_error: 'El usuario es requerido'
    }).min(3, { message: 'El usuario debe tener al menos 3 caracteres' }),

    pass: z.string({
        invalid_type_error: 'La contraseña debe ser un texto',
        required_error: 'La contraseña es requerida'
    }).min(3, { message: 'La contraseña debe tener al menos 3 caracteres' }),

    serial: z.string({
        invalid_type_error: 'El serial debe ser un texto',
        required_error: 'El serial es requerido'
    }).min(5, { message: 'El serial debe tener al menos 5 caracteres' }),

    operador: z.string({
        invalid_type_error: 'El operador debe ser un texto',
        required_error: 'El operador es requerido'
    }).min(3, { message: 'El operador debe tener al menos 3 caracteres' })
});