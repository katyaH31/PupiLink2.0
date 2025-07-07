import React, { useState, useEffect, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chat from '../models/Chat';
import AuthService from '../services/AuthService';
import ChatService from '../services/ChatService';
import Message from '../models/Message';
import pb from '../server/Connection';
import Collections from '../enums/Collections';
import ClearIcon from "@mui/icons-material/Clear"; 

interface ChatProps {
    chat: Chat | null;
    onBackToList: () => void;
}

const ChatModal: React.FC<ChatProps> = ({ chat, onBackToList }) => {
    const [input, setInput] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null); // Añadir tipo HTMLDivElement para consistencia
    const userId = useRef(AuthService.getUserData().id)
    const [messages, setMessages] = useState<Message[]>([]);
    const [updateOn, setUpdateOn] = useState<number>(new Date().getTime());

    const fetchMessages = async () => {
        const fetchedMessages = await ChatService.getChatMessages(chat!);
        setMessages(fetchedMessages.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()));
    };

    useEffect(() => {
        
        if (chat) { 
            pb.collection(Collections.CHAT).subscribe(chat.id, () => setUpdateOn(new Date().getTime()));
        }
        return () => {
            if (chat) {
                pb.collection(Collections.CHAT).unsubscribe(chat.id);
            }
        };
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

    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };


    if (chat === null) {
        return <div className="p-4 text-center">Seleccione un chat para empezar a chatear</div>;
    }

    
    const otherParticipant = chat.expand?.participants?.find((participant) => participant.id !== userId.current!);


    return (
        <div className="flex flex-col h-full bg-white text-black"> 
           
            <div className="bg-custom-purple text-white px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2"> 
                   
                    <button onClick={onBackToList} className="text-white hover:text-gray-300 text-xl font-bold">
                        <ClearIcon style={{ transform: 'rotate(135deg)' }} /> 
                    </button>
                   
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2"> 
                             <img
                                src={ChatService.getChatAvatar(chat)}
                                alt="Chat Avatar"
                                className="w-10 h-10 rounded-full object-cover" // Ajustar tamaño y forma
                             />
                        </div>
                        
                        <h2 className="text-base font-semibold"> 
                            {otherParticipant ? otherParticipant.name : 'Cargando...'}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Área de Mensajes */}
            <div ref={chatContainerRef} id='pupilink-chat' className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-100"> {/* Fondo y padding de PupiBot */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                       
                        className={`flex ${message.expand?.receiver?.id! !== userId.current! ? 'justify-end' : 'justify-start'}`}
                    >
                        
                        {message.expand?.receiver?.id! === userId.current! && ( 
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2"> 
                                <AccountCircleIcon className="text-gray-500 w-full h-full" /> 
                            </div>
                        )}
                        <div
                            className={`rounded-xl px-4 py-2 max-w-[75%] text-[15px] break-words ${
                                message.expand?.receiver?.id! !== userId.current!
                                    ? 'bg-custom-purple text-white text-right' 
                                    : 'bg-white text-black text-left' 
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input y Botón de Enviar */}
            <div className="p-2 border-t border-purple-200 flex bg-custom-purple"> {/* Fondo y borde de PupiBot */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress} 
                    placeholder="Escribí tu mensaje..." 
                    className="flex-1 px-4 py-3 rounded-l-xl text-black bg-white placeholder-gray-600 focus:outline-none" // Estilo de input de PupiBot
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-white text-custom-purple px-6 py-3 rounded-r-xl hover:bg-gray-200 font-bold" // Estilo de botón de PupiBot
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatModal;