const mockSetAuth = jest.fn();
const mockRemoveAuth = jest.fn();

jest.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockSetAuth,
    logout: mockRemoveAuth,
    user: null,
    isAuthenticated: false,
  }),
}));

jest.mock('../src/api/authApi', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

import { renderHook, act } from '@testing-library/react-native';
import { useAuthViewModel } from '../src/viewmodels/useAuthViewModel';
import { login as mockLoginApi, register as mockRegisterApi } from '../src/api/authApi';

const loginApi = mockLoginApi as jest.MockedFunction<typeof mockLoginApi>;
const registerApi = mockRegisterApi as jest.MockedFunction<typeof mockRegisterApi>;


const MOCK_USER = { id: 1, email: 'test@test.com', fullName: 'Test User' } as any;
const MOCK_RESPONSE = { token: 'abc123', tokenType: 'Bearer', user: MOCK_USER };


function renderAuth() {
  return renderHook(() => useAuthViewModel());
}



describe('validateRegister', () => {
  test('returns true and sets no errors for valid input', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });

    expect(isValid!).toBe(true);
    expect(result.current.validationErrors).toEqual({});
  });

  test('returns false and sets fullName error when fullName is empty', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: '',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.fullName).toBeTruthy();
  });

  test('returns false and sets fullName error when fullName is only whitespace', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: '   ',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.fullName).toBe('Full name is required');
  });

  test('returns false and sets email error when email is empty', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: 'Jan Kowalski',
        email: '',
        password: 'secret123',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.email).toBe('Email is required');
  });

  test('returns false and sets email format error for invalid email', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: 'Jan Kowalski',
        email: 'not-an-email',
        password: 'secret123',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.email).toBe('Invalid email format');
  });

  test('returns false and sets password error when password is empty', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: '',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.password).toBe('Password is required');
  });

  test('returns false and sets password error when password is shorter than 6 characters', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: '123',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.password).toBe('Password must be at least 6 characters');
  });

  test('collects multiple validation errors at once', () => {
    const { result } = renderAuth();

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateRegister({
        fullName: '',
        email: 'bad-email',
        password: '12',
      });
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationErrors.fullName).toBeTruthy();
    expect(result.current.validationErrors.email).toBeTruthy();
    expect(result.current.validationErrors.password).toBeTruthy();
  });
});


describe('handleLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls setAuth with user and token on success', async () => {
    loginApi.mockResolvedValueOnce(MOCK_RESPONSE);

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleLogin({ email: 'jan@example.com', password: 'secret123' });
    });

    expect(loginApi).toHaveBeenCalledWith({ email: 'jan@example.com', password: 'secret123' });
    expect(mockSetAuth).toHaveBeenCalledWith(MOCK_USER, 'abc123');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  test('sets error message when API throws', async () => {
    loginApi.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleLogin({ email: 'jan@example.com', password: 'wrong' });
    });

    expect(result.current.error).toBe('Invalid credentials');
    expect(mockSetAuth).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  test('sets generic error message when API throws without a message', async () => {
    loginApi.mockRejectedValueOnce({});

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleLogin({ email: 'jan@example.com', password: 'wrong' });
    });

    expect(result.current.error).toBe('Login failed');
  });

  test('isLoading is false after a successful login', async () => {
    loginApi.mockResolvedValueOnce(MOCK_RESPONSE);

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleLogin({ email: 'jan@example.com', password: 'secret123' });
    });

    expect(result.current.isLoading).toBe(false);
  });
});



describe('handleRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls setAuth with user and token on success', async () => {
    registerApi.mockResolvedValueOnce(MOCK_RESPONSE);

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });

    expect(registerApi).toHaveBeenCalledWith({
      fullName: 'Jan Kowalski',
      email: 'jan@example.com',
      password: 'secret123',
    });
    expect(mockSetAuth).toHaveBeenCalledWith(MOCK_USER, 'abc123');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  test('does NOT call API when validation fails', async () => {
    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleRegister({
        fullName: '',
        email: 'bad',
        password: '1',
      });
    });

    expect(registerApi).not.toHaveBeenCalled();
    expect(mockSetAuth).not.toHaveBeenCalled();
  });

  test('sets error message when API throws', async () => {
    registerApi.mockRejectedValueOnce(new Error('Email already in use'));

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });

    expect(result.current.error).toBe('Email already in use');
    expect(mockSetAuth).not.toHaveBeenCalled();
  });

  test('sets generic error when API throws without message', async () => {
    registerApi.mockRejectedValueOnce({});

    const { result } = renderAuth();

    await act(async () => {
      await result.current.handleRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });

    expect(result.current.error).toBe('Registration failed');
  });

  test('clears previous validation errors before re-validation', async () => {
    registerApi.mockResolvedValueOnce(MOCK_RESPONSE);

    const { result } = renderAuth();


    await act(async () => {
      await result.current.handleRegister({ fullName: '', email: '', password: '' });
    });
    expect(result.current.validationErrors.fullName).toBeTruthy();


    await act(async () => {
      await result.current.handleRegister({
        fullName: 'Jan Kowalski',
        email: 'jan@example.com',
        password: 'secret123',
      });
    });
    expect(result.current.validationErrors).toEqual({});
  });
});
