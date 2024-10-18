export const Navbar = ({ isLoggedIn, onLogout }) => {
    return (
        <nav class= "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div>
          <img/> 
        </div>
        <ul className="flex space-x-6">
          <li>
            Sobre Nosotros
          </li>
          <li>
           Recetas
          </li>
          <li>
            Contacto
          </li>
          <li>
            Iniciar Sesión
          </li>
          <li>
           Registrarse
          </li>
        </ul>
      </nav>
    );
  };