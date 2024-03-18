// useLogin.ts
import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
import axios from "axios";

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage('Iniciando sesión ...');

    axios.post('/login', { user: username, password })
      .then(response => {
        setLoading(false);
        setMessage('');
        login(response.data.token);
        localStorage.setItem('tokenBodega', response.data.token);
      })
      .catch(err => {
        setMessage('');
        setLoading(false);
        if (err.message === 'Network Error') {
          setError('No se pudo conectar al servidor, consulte al administrador del sistema.');
          setTimeout(() => {
            setError('');
          }, 6000);
          return;
        }

        setError(err.response.data.message);
        setTimeout(() => {
          setError('');
        }, 3000);
      })
  }

  return { username, setUsername, password, setPassword, message, loading, error, handleSubmit };
}