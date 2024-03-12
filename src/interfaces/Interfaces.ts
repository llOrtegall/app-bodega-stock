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
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (auth: string) => void;
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