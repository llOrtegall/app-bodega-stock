import { tz } from 'moment-timezone'

export const formatFecha = (fecha: string): string => tz(fecha, 'America/Bogota').format('YYYY-MM-DD - HH:mm')
