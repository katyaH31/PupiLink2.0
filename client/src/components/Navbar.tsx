import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../server/Connection';
import logo from '../assets/PupiLinks_menu.png';
import DehazeIcon from '@mui/icons-material/Dehaze';

interface User {
  id: string;
  name: string;
  email: string;
  // Añade otros campos relevantes si es necesario
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUser(pb.authStore.model as User);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white opacity-2 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" /> {/* Aumentar tamaño del logo */}
        <span className="text-3xl font-barlow px-10">Publica tu propiedad</span>
      </div>
      <div className="flex items-center relative">
        {user ? (
          <>
            <span className="text-3xl font-barlow mr-4">Hola, {user.name}</span>
            <button onClick={toggleMenu} className="text-gray-600">
              <DehazeIcon style={{ color: 'gray' }} />
            </button>
            {menuOpen && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20" style={{ top: '2.5rem' }}>
                <Link to="/myrequests" className="font-barlowc text-xl block px-4 py-2 text-gray-800 hover:bg-gray-200">Tus solicitudes</Link>
                <Link to="/my-ads" className="font-barlowc text-xl block px-4 py-2 text-gray-800 hover:bg-gray-200">Tus anuncios</Link>
                <button onClick={handleLogout} className="font-barlowc text-xl w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200">Cerrar sesión</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" className="bg-custom-purple text-white px-4 py-2 rounded hover:bg-hover_colors">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




