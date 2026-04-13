import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginApi, register as registerApi } from '../api/authApi';
import { LoginRequest, RegisterRequest } from '../models/Auth';

export type ValidationErrors = Partial<Record<keyof RegisterRequest, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useAuthViewModel = () => {
  const { login: setAuth, logout: removeAuth, user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const clearValidationErrors = () => setValidationErrors({});


  const validateRegister = (request: RegisterRequest): boolean => {
    const errors: ValidationErrors = {};

    if (!request.fullName || request.fullName.trim().length === 0) {
      errors.fullName = 'Full name is required';
    }

    if (!request.email || request.email.trim().length === 0) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(request.email)) {
      errors.email = 'Invalid email format';
    }

    if (!request.password || request.password.length === 0) {
      errors.password = 'Password is required';
    } else if (request.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    setError(null);
    clearValidationErrors();

    if (!validateRegister(request)) {
      return;
    }

    setIsLoading(true);
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
    validateRegister,
    clearValidationErrors,
    validationErrors,
    isLoading,
    error,
    logout: removeAuth,
    user,
    isAuthenticated,
  };
};

