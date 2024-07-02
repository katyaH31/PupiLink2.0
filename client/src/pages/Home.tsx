import React from 'react';
import ChatWindow from './components/ChatWindow';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Página Principal</h1>
                <p>holi </p>
            </div>
            <ChatWindow />
        </div>
    );
};

export default Home;








