enum Empresa {
  'Multired y Servired' = 0,
  'Multired' = 1,
  'Servired' = 2
}

enum Proceso {
  'Técnología' = 1,
  'Contabilidad' = 2,
  'Comercial' = 3,
  'Administración' = 4,
  'Gestión Humana' = 5,
  'Gerencia' = 6,
  'Tesoreria' = 7,
  'Auditoria' = 8,
  'Cumplimiento' = 9
}

enum Estado {
  'Inactivo' = 0,
  'Activo' = 1
}

export interface UserNew {
  nombres: string
  apellidos: string
  documento: number
  telefono: number
  correo: string
  empresa: Empresa
  proceso: Proceso
  rol: string
}

export interface UserCreated {
  _id: string
  nombres: string
  apellidos: string
  documento: number
  telefono: number
  correo: string
  username: string
  password: string
  password2?: string
  estado: Estado
  empresa: Empresa
  proceso: Proceso
  rol?: string
  fecha_creacion?: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}