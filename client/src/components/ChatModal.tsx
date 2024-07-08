import React, { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chat from '../models/Chat';
import AuthService from '../services/AuthService';
import ChatService from '../services/ChatService';
import Message from '../models/Message';
import pb from '../server/Connection';
import Collections from '../enums/Collections';

interface ChatProps {
    chat: Chat | null;
    onBackToList: () => void;
}

const ChatModal: React.FC<ChatProps> = ({ chat, onBackToList }) => {
    const [input, setInput] = useState('');
    const chatContainerRef = useRef(null);
    const userId = useRef(AuthService.getUserData().id)
    const [messages, setMessages] = useState<Message[]>([]);
    const [updateOn, setUpdateOn] = useState<number>(new Date().getTime());

    const  fetchMessages = async () => {
        const fetchedMessages = await ChatService.getChatMessages(chat!);
        setMessages(fetchedMessages.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()));
    };

    useEffect(() => {
        pb.collection(Collections.CHAT).subscribe(chat!.id, () => setUpdateOn(new Date().getTime()));
    }, [chat]);

    useEffect(() => {
        fetchMessages();
    }, [updateOn, chat]);

    const handleSendMessage = async () => {
        if (input.trim() !== '') {
            ChatService.createMessage(chat!, input).then(() => setUpdateOn(new Date().getTime()));
            setInput('');
        }

        const element = document.getElementById("pupilink-chat")!;
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    if (chat === null) {
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
                        <p className="text-white font-bold">{chat.expand?.participants?.find((participant) => participant.id !== userId.current!)?.name}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <AccountCircleIcon className="text-gray-800 full" />
                    </div>
                </div>
            </div>
            <div ref={chatContainerRef} id='pupilink-chat' className=" flex-1 p-4 overflow-y-auto ">
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-2 ${message.expand?.receiver?.id! !== userId.current! ? 'justify-end' : ''}`}>
                        {message.expand?.receiver?.id! === userId.current! && (
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                <AccountCircleIcon className="text-gray-400" />
                            </div>
                        )}
                        <div
                            className={`ml-2 max-w-44 px-4 py-2 rounded-lg ${
                                message.expand?.receiver?.id! !== userId.current! ? 'bg-custom-purple text-white' : 'bg-gray-800 text-gray-300'
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-700 p-2 bg-gray-800">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white"
                        placeholder="Escribe tu mensaje"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="bg-custom-purple text-white px-3 py-2 rounded-lg mr-2"
                        onClick={handleSendMessage}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;









