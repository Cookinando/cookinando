import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe } from 'vitest';
import { Login } from '../pages/Login.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import '@testing-library/jest-dom';

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: vi.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>,
  }));

describe('Login component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useAuth.mockReturnValue({
      login: vi.fn(),
    });

    render(
      
        <AuthProvider>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </AuthProvider>
      
    );
  });

  test('Should render the login form with email, password, and submit button', () => {
    const inputUsername = screen.getByLabelText('Correo electrónico');
    const inputPassword = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button', { name: 'Enviar' });

    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
