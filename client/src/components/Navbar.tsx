import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../server/Connection';
import logo from '../assets/PupiLinks_menu.png';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Button, Typography } from "@mui/material";
import PupilinkRoutes from '../enums/PupilinkRoutes';
import AuthService from '../services/AuthService';

interface User {
  id: string;
  name: string;
  email: string;
  surname: string;
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
    navigate(PupilinkRoutes.LOGIN, { replace: true });
  };

  const handlePushishForm = () =>{
    navigate(AuthService.isLoggedIn() ? PupilinkRoutes.PUBLISH_FORM : PupilinkRoutes.LOGIN);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white opacity-2 p-1 flex justify-between items-center fixed top-0 left-0 w-full z-30">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
        <Button
          onClick={handlePushishForm}
          sx={{
            fontSize: "1.3rem",
            fontFamily: "Barlow Condensed",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft:"1rem",
            color: "#686D76",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "90%",
          }}>Publica tu propiedad</Button>
      </div>
      <div className="flex items-center relative">
        {user ? (
          <>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontFamily: "Barlow Condensed",
                fontWeight: "bold",
                textAlign: "left",
                marginRight:"1rem",
                color: "#865DFF",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "90%",
                '@media (max-width: 600px)': {
                  display: 'none',
                },
              }}>{`Hola, ${user.name} ${user.surname}`}</Typography>

            <button onClick={toggleMenu} className="text-gray-600 mr-4">
              <DehazeIcon style={{ color: 'gray' }} />
            </button>
            {menuOpen && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20" style={{ top: '2.5rem' }}>
                <Link to="/myrequests" className="font-barlowc text-lg font-bold block px-4 py-2 text-gray-500 hover:bg-gray-200">Tus solicitudes</Link>
                <Link to="/my-ads" className="font-barlowc text-lg font-bold block px-4 py-2 text-gray-500 hover:bg-gray-200">Tus anuncios</Link>
                <button onClick={handleLogout} className="font-barlowc text-lg font-bold w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-200">Cerrar sesión</button>
              </div>
            )}
          </>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="bg-custom-purple font-barlowc text-sm font-bold text-white px-4 py-2 rounded hover:bg-hover_colors">Iniciar Sesión</Link>
            <Link to="/register" className="bg-custom-purple font-barlowc text-sm font-bold text-white px-4 py-2 rounded hover:bg-hover_colors">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;





