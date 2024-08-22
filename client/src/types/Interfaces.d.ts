export interface User {
  id: string
  names: string
  lastnames: string
  username: string
  email: string
  company: string
  process: string
  sub_process: string
  app: 'bodegastock'
}

export interface UserLogin {
  message: string,
  usuario: User
}