import React from "react";
import Chat from "../models/Chat";
import ChatService from "../services/ChatService";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (id: string) => void;
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
            <img
              src={ChatService.getChatAvatar(chat)}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="font-bold">{chat.title}</div>
              <div className="text-sm text-gray-400">
                {ChatService.getChatTitle(chat)}
              </div>
            </div>
            <div className="text-xs text-gray-400 truncate">
              {ChatService.getChatLastTime(chat)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
