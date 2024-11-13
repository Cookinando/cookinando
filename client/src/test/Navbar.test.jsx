import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe } from 'vitest';
import { Navbar } from '../components/Navbar.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import '@testing-library/jest-dom';

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));


describe('Navbar component authenticated', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
    });

    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  test("Should render the web logo", () => {
    const logo = screen.getByAltText('logo');
    expect(logo).toHaveAttribute('alt', 'logo');
  });

  test('Should render "cerrar sesión" when user is authenticated', () => {
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
  });
});

describe('Navbar component not authenticated', () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });
    render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  test('Should not render "cerrar sesión" when user is not authenticated', () => {
    const cerrarSesionButton = screen.queryByText('Cerrar Sesión');
    expect(cerrarSesionButton).not.toBeInTheDocument();
  });

  test("Should not render the profile logo", () => {
    screen.debug();
    const logoProfile = screen.queryByAltText('Profile icon');
    expect(logoProfile).not.toBeInTheDocument();
  })

});
