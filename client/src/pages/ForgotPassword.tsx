import React from "react";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


// No se usa Pero si lo borro da error asi que asi que quede ninguna vista lleva a aqui 
const ForgotPassword: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-barlow">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-regular text-center text-gray-500 mb-6">
                    Recuperar Contraseña
                </h2>
                
                <form>
                    <div className="mb-4 relative">
                        <label htmlFor="email" className="block text-gray-700 sr-only">Dirección de correo electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-3 py-2 border border-custom-purple rounded-lg focus:outline-none focus:border-purple-600 pl-10" 
                            placeholder="Dirección de correo electrónico"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <AlternateEmailIcon className="text-gray-400" />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 text-white text-xl font-bold bg-custom-purple rounded-full shadow-lg hover:bg-purple-700">
                        Enviar instrucciones
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a href="/login" className="text-custom-purple hover:underline">Volver al inicio de sesión</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
