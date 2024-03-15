import { tz } from 'moment-timezone';

export function formatFecha(fecha: string): string {
  return tz(fecha, 'America/Bogota').format('YYYY-MM-DD - HH:mm');
}