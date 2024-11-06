//vídeo de referencia: https://www.youtube.com/watch?v=sshsoHlNdyY

import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import { Navbar } from  '../components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({
      isAuthenticated: true,  // o false, según lo que quieras probar
      logout: vi.fn(),
    }),
  }));

describe('Navbar component', ()=> {
    beforeEach(()=>{
        render(
        <BrowserRouter>
        <Navbar />
        </BrowserRouter>
    );
    });
    test("Should render the web logo", () => {
        const logo = screen.getByAltText('logo')
        expect(logo).toHaveAttribute('alt', 'logo');
    })
    test("Should render the hamburger button on mobile",() =>{
    })
})

