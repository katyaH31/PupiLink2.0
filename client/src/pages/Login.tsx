import React, { useState } from 'react';
import logo from '../assets/PupiLinks_menu.png';
import { Link, useNavigate } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import pb from '../server/Connection.ts';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            toast.success('Inicio de sesión exitoso', {
                ...toastOptions,
                style: { backgroundColor: 'white', color: 'green' },
                progressStyle: { backgroundColor: 'green' }
            });
            console.log(authData);
            // Retraso de 2 segundos antes de redirigir
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error('Error al iniciar sesión', {
                ...toastOptions,
                style: { backgroundColor: 'white', color: 'red' },
                progressStyle: { backgroundColor: 'red' }
            });
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-barlow">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <ToastContainer />
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="h-32" />
                </div>
                <h2 className="text-xl font-regular text-center text-gray-500 mb-6">
                    Inicia sesión y empieza tu nueva experiencia
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4 relative">
                        <label htmlFor="email" className="block text-gray-700 sr-only">Dirección de correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-custom-purple rounded-lg focus:outline-none focus:border-purple-600 pl-10"
                            placeholder="Dirección de correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <AlternateEmailIcon className="text-gray-400" />
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 sr-only">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-custom-purple rounded-lg focus:outline-none focus:border-purple-600 pl-10"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <KeyIcon className="text-gray-400" />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 text-white text-xl font-bold bg-custom-purple rounded-full shadow-lg hover:bg-purple-700">
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-gray-700">¿No tienes una cuenta? </span>
                    <Link to="/register" className="text-custom-purple hover:underline">Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;



