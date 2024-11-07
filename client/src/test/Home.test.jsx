import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import Home from  '../pages/Home.jsx'

describe('Home page', () =>{
    beforeEach(()=>{
        render(<Home/>)
    })
    test("Should show the subtitle", () => {
        const subtitle = screen.getByText('¡Explora el mundo a través de la gastronomía y disfruta cocinando con nosotros!')
        expect(subtitle).toBeDefined();
    })
    test("Should show the logo", () => {
        const logo = screen.getByAltText('logo')
        expect(logo).toBeDefined();
    })
})