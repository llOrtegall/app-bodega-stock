export interface Auth {
  auth: boolean;
  token: string;
}

export interface User {
  apellidos: string;
  correo: string;
  empresa: string;
  id: string;
  nombres: string;
  proceso: string;
  rol: string;
  username: string;
}

export interface AuthContextData {
  user: User | null;
  login: (auth: Auth) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  isAllowed?: boolean;
}