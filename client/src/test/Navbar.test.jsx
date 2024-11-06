// Navbar.test.js
//vídeo de referencia: https://www.youtube.com/watch?v=sshsoHlNdyY
//Falta: 
//configurar los types
//npm install testing-library/react testing-library/jest-dom --save-dev
//npm install testing-library/user-event
//crear setupTests.js dentro de la carpeta test para configurar acciones globales
//importar afterEach
//importar cleanup para limpiar el DOM
//crear un archivo de test por cada componente que se quiera testear
//importar beforeEach
//importar render
//importar vi
//importar it
//importar test y expect de vitest
//importar componente que se va a testear

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import { Navbar } from  '../components/Navbar.jsx'
import { useContext } from '../context/AuthContext.jsx'

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({
      isAuthenticated: true,  // o false, según lo que quieras probar
      logout: vi.fn(),
    }),
  }));

describe('Navbar component', ()=> {
    beforeEach(()=>{
        render(<Navbar/>)
    })
    test("Should show the web logo", () => {
        const logo = screen.getByAltText('logo')
        expect(logo).toBeInTheDocument();
    })
})

