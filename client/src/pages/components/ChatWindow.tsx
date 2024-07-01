import React, { useState } from 'react';
import Chat from './Chat';
import ChatList from './ChatList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatWindow: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    const chats = [
        { id: 1, name: 'Vendedor 1', lastMessage: '¡Hola! ¿Cómo podemos ayudarte?', avatar: '/path-to-avatar.png', time: '16 sem' },
        { id: 2, name: 'Vendedor 2', lastMessage: '¿Cómo puedo ayudar?', avatar: '/path-to-avatar.png', time: '25 sem' },
        { id: 3, name: 'Vendedor 3', lastMessage: 'Que putas queres ', avatar: '/path-to-avatar.png', time: '31 sem' },
    ];

    const handleSelectChat = (id: number) => {
        setSelectedChatId(id);
        setIsChatOpen(true);
    };

    const handleBackToList = () => {
        setSelectedChatId(null);
    };

    return (
        <div>
            {!isChatOpen && (
                <button
                    className="fixed bottom-4 right-4 bg-custom-purple text-white p-3 rounded-full shadow-lg"
                    onClick={() => setIsChatOpen(true)}
                >
                    💬
                </button>
            )}
            {isChatOpen && (
                <div className="fixed bottom-4 right-4 bg-custom-purple text-white rounded-lg shadow-lg overflow-hidden w-80 h-96 flex flex-col">
                    <div className="flex justify-end p-2 bg-custom-purple">
                        <button
                            className="text-gray-500 hover:text-custom-purple"
                            onClick={() => setIsChatOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {selectedChatId === null ? (
                            <ChatList chats={chats} onSelectChat={handleSelectChat} />
                        ) : (
                            <Chat chatId={selectedChatId} onBackToList={handleBackToList} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;





