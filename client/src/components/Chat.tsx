import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ChatProps {
    chatId: number | null;
    onBackToList: () => void;
}

const Chat: React.FC<ChatProps> = ({ chatId, onBackToList }) => {
    const [messages, setMessages] = useState<{ sender: string; text: string; type: string }[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (chatId !== null) {
            const fetchedMessages = [
                { sender: 'Vendedor', text: '¡Hola! ¿Cómo podemos ayudarte?', type: 'received' },
                { sender: 'User', text: '¿Podria darme mas informacion del pupilaje ?', type: 'sent' },
                { sender: 'Vendedor', text: 'si claro con gusto', type: 'received' },
            ];
            setMessages(fetchedMessages);
        }
    }, [chatId]);

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            setMessages([...messages, { sender: 'User', text: input, type: 'sent' }]);
            setInput('');
        }
    };

    if (chatId === null) {
        return <div className="p-4 text-center">Seleccione un chat para empezar a chatear</div>;
    }

    return (
        <div className="flex flex-col h-full bg-gray-200 text-white">
            <div className="bg-custom-purple px-4 py-2 flex items-center justify-between">
                <button onClick={onBackToList} className="text-white">
                    ← Volver
                </button>
                <div className="flex items-center">
                    <div className="mr-3">
                        <p className="text-white font-bold">Vendedor</p>
                        <p className="text-green-400 text-sm">online</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <AccountCircleIcon className="text-gray-800 full" />
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-2 ${message.type === 'sent' ? 'justify-end' : ''}`}>
                        {message.type === 'received' && (
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                <AccountCircleIcon className="text-gray-400" />
                            </div>
                        )}
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                                message.type === 'sent' ? 'bg-custom-purple text-white' : 'bg-gray-800 text-gray-300'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-700 p-2 bg-gray-800">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white"
                        placeholder="Has una pregunta..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="bg-custom-purple text-white px-4 py-2 rounded-lg"
                        onClick={handleSendMessage}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;









