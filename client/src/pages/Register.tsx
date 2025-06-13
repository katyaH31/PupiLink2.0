import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import { Box, Typography  } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/PupiLinks_menu.png";
import PupilinkRoutes from "../enums/PupilinkRoutes.ts";
import pb from "../server/Connection.ts";
import AuthService from "../services/AuthService.ts";

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error('Las contraseñas no coinciden', {
                ...toastOptions,
                style: { backgroundColor: 'red', color: 'white' },
                progressStyle: { backgroundColor: 'white' }
            });
            return;
        }

        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm,
                name,
                avatar: image
            });
            toast.success('Usuario registrado con éxito', {
                ...toastOptions,
                style: { backgroundColor: 'white', color: 'green' },
                progressStyle: { backgroundColor: 'green' }
            });

            await AuthService.login(email, password);
            navigate(PupilinkRoutes.ROOT);
        } catch (error) {
            toast.error('Error al registrar usuario', {
                ...toastOptions,
                style: { backgroundColor: 'white', color: 'red' },
                progressStyle: { backgroundColor: 'red' }
            });
            console.error(error);
        }
    };

    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            navigate(PupilinkRoutes.ROOT);
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-barlow">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <ToastContainer />

                        <Typography
                        variant="body2" // O el tamaño de tipografía que prefieras
                        sx={{
                            color: '#724DFF', // Color del texto
                            textAlign: 'center',
                            // Puedes ajustar la posición o tamaño del texto si es necesario
                            // Por ejemplo, para que no se superponga con la imagen si hay una preview pequeña
                            position: 'relative',
                            zIndex: 1, // Asegura que el texto esté sobre el logo por defecto si lo hay
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            visibility: imagePreview ? 'hidden' : 'visible', // Oculta el texto si hay una imagen previa
                            maxWidth: '80%', // Para que el texto no se desborde del círculo
                        }}
                    >
                        Suba su foto de perfil
                </Typography>
                <Box
                    {...getRootProps({ className: 'dropzone' })}
                    sx={{
                        height: '192px',
                        width: '192px',
                        border: '2px solid #724DFF',
                        borderRadius: '9999px',
                        marginInline: 'auto',
                        my: 3,
                        cursor: 'pointer',
                        
                    }}
                >

                    <Box component={"input"} {...getInputProps()} />
                    
                    <Box
                        component={"img"}
                        src={imagePreview ?? logo}
                        alt={"Preview Image"} 
                        sx={{width: '100%', height: '100%', borderRadius: '9999px', objectFit: imagePreview ? 'cover' : 'contain'}}
                        />
                </Box>

                <form onSubmit={handleRegister}>
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
                    <div className="mb-4 relative">
                        <label htmlFor="passwordConfirm" className="block text-gray-700 sr-only">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="w-full px-3 py-2 border border-custom-purple rounded-lg focus:outline-none focus:border-purple-600 pl-10"
                            placeholder="Confirmar Contraseña"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <KeyIcon className="text-gray-400" />
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="name" className="block text-gray-700 sr-only">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-custom-purple rounded-lg focus:outline-none focus:border-purple-600 pl-10"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full py-2 text-white text-xl font-bold bg-custom-purple rounded-full shadow-lg hover:bg-purple-700">
                        Registrarse
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-gray-700">¿Ya tienes cuenta? </span>
                    <Link to="/login" className="text-custom-purple hover:underline">Inicia Sesion Aqui</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;




