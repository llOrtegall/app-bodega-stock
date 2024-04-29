export class UserNotFoundError extends Error {
  constructor() {
    super('Usuario no encontrado')
    this.name = 'UserNotFoundError'
  }
}

export class UserInactiveError extends Error {
  constructor() {
    super('Usuario Se Encuentra Inactivo')
    this.name = 'UserInactiveError'
  }
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super('Contraseña incorrecta')
    this.name = 'IncorrectPasswordError'
  }
}