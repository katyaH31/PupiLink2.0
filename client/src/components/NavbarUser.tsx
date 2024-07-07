import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/PupiLinks_menu.png';

const NavbarUser: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
      const [name, setName] = useState('');

  useEffect(() => {
    // Obtener el email del usuario de localStorage
    const userName = localStorage.getItem('name');
    if (userName) {
      setName(userName);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setName('');
    localStorage.removeItem('userName'); // Elimina el email del usuario de localStorage
    // Lógica adicional para cerrar sesión (por ejemplo, eliminar tokens)
  };

  return (
    <nav className="bg-navbar_colors opacity-2 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="text-custom-l text-xl font-bold px-10">Publica tu propiedad</span>
      </div>
      <div className="flex items-center">
        {!isAuthenticated ? (
          <>
            <span className="text-custom-l mr-4">BIENVENIDO {name}</span> {/* Mostrar el email del usuario */}
            <Link to="/login" className="bg-custom-purple text-white px-4 py-2 rounded hover:bg-hover_colors">Cerrar Sesión</Link>
          </>
        ) : (
          <div className="relative inline-block text-left">
            <button className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Opciones
            </button>
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarUser;



