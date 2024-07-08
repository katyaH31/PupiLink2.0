import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/PupiLinks_menu.png';

const NavbarUser: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [name, setName] = useState('');

  useEffect(() => {
    // Obtener el nombre del usuario de localStorage
    const userName = localStorage.getItem('name');
    if (userName) {
      setName(userName);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setName('');
    localStorage.removeItem('name'); // Elimina el nombre del usuario de localStorage
    // Lógica adicional para cerrar sesión (por ejemplo, eliminar tokens)
  };

  return (
    <nav className="bg-navbar_colors opacity-2 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="text-custom-l text-xl font-bold px-10">Publica tu propiedad</span>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <span className="text-custom-l mr-4">BIENVENIDO {name}</span> {/* Mostrar el nombre del usuario */}
            <button onClick={handleLogout} className="bg-custom-purple text-white px-4 py-2 rounded hover:bg-hover_colors">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className="bg-custom-purple text-white px-4 py-2 rounded hover:bg-hover_colors">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarUser;




