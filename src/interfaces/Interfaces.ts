export interface User {
  id: number
  name: string
}

export interface AuthContextData {
  user: User | null;
  login: (user: User) => void;
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