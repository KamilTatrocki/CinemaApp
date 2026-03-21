import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginApi, register as registerApi } from '../api/authApi';
import { LoginRequest, RegisterRequest } from '../models/Auth';

export const useAuthViewModel = () => {
  const { login: setAuth, logout: removeAuth, user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (request: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginApi(request);
      setAuth(response.user, response.token);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (request: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerApi(request);
      setAuth(response.user, response.token);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    isLoading,
    error,
    logout: removeAuth,
    user,
    isAuthenticated,
  };
};
