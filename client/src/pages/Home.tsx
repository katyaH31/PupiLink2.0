import React from 'react';
import ChatWindow from './components/ChatWindow';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Bienvenido a la Página Principal</h1>
                <p>Contenido de la página principal...</p>
            </div>

            {/* Chat Window */}
            <ChatWindow />
        </div>
    );
};

export default Home;








