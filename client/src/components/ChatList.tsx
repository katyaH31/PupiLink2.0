import React from "react";
import Chat from "../models/Chat";
import ChatService from "../services/ChatService";
import ClearIcon from "@mui/icons-material/Clear"; // Para el ícono de cerrar

interface ChatListProps {
    chats: Chat[];
    onSelectChat: (id: string) => void;
    onClose: () => void; // Añadir prop para cerrar el modal
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, onClose }) => {
    return (
        <div className="flex flex-col h-full bg-white text-black rounded-lg shadow-lg overflow-hidden">
            {/* Encabezado del modal */}
            <div className="bg-custom-purple text-white px-4 py-2 flex items-center justify-between rounded-t-lg">
                <h2 className="text-base font-semibold">Mis Chats</h2>
                
            </div>

            {/* Lista de Chats */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-100">
                {chats.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No hay chats disponibles.</p>
                ) : (
                    <ul>
                        {chats.map((chat) => (
                            <li
                                key={chat.id}
                                className="flex items-center gap-3 cursor-pointer p-3 bg-white hover:bg-gray-50 rounded-lg shadow-sm" style={{ backgroundColor: ' #c1baf5' }}
                                onClick={() => onSelectChat(chat.id)}
                            >
                                {/* Avatar del chat */}
                                <img
                                    src={ChatService.getChatAvatar(chat)}
                                    alt="Chat Avatar"
                                    className="w-10 h-10 rounded-full object-cover" // Ajustar tamaño y forma
                                />
                                <div className="flex-1 overflow-hidden">
                                    {/* Título del chat */}
                                    <div className="font-semibold text-sm text-black truncate">
                                        {chat.title}
                                    </div>
                                    {/* Último mensaje o descripción */}
                                    <div className="text-xs text-gray-500 truncate">
                                        {/* Podrías mostrar el último mensaje aquí si lo tienes en el objeto chat,
                                            o usar getChatTitle si es una descripción corta */}
                                        {ChatService.getChatTitle(chat)} {/* Asumiendo que esto es el "hola" o un texto descriptivo */}
                                    </div>
                                </div>
                                {/* Hora del último mensaje */}
                                <div className="text-xs text-gray-400">
                                    {ChatService.getChatLastTime(chat)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ChatList;
