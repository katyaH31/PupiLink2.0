import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ChatListProps {
    chats: { id: number; name: string, lastMessage: string, avatar: string, time: string }[];
    onSelectChat: (id: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
    return (
        <div className="p-4 bg-gray- h-full text-white">
            <h2 className="text-xl font-bold mb-4">Mis Chats</h2>
            <ul>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className="flex items-center mb-4 cursor-pointer p-2 bg-gray-700 hover:bg-gray-600 rounded"
                        onClick={() => onSelectChat(chat.id)}
                    >   
                        
                        <img src={chat.avatar} className="w-12 h-12 rounded-full mr-3" />
                        <div className="flex-1">
                            <div className="font-bold">{chat.name}</div>
                            <div className="text-sm text-gray-400">{chat.lastMessage}</div>
                        </div>
                        <div className="text-xs text-gray-400">{chat.time}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
