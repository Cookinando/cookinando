//vídeo de referencia: https://www.youtube.com/watch?v=sshsoHlNdyY

import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import { Navbar } from  '../components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx'
import '@testing-library/jest-dom';

vi.mock('../context/AuthContext.jsx', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      isAuthenticated: true,  // true o false según lo que quieras probar
      logout: vi.fn(),
    }),
  };
});

  // const mockUser = { 
  //   id: 1, 
  //   name: 'Laura', 
  //   email: 'laura@gmail.com', 
  //   isAuthenticated: true 
  // };

describe('Navbar component', ()=> {
    beforeEach(()=>{
        render(
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </AuthProvider>
    );
    });
    test("Should render the web logo", () => {
        const logo = screen.getByAltText('logo')
        expect(logo).toHaveAttribute('alt', 'logo');
    });

    test('Should render "cerrar sesión" when user is authenticated', () => {

      expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
    
    }); 
})

