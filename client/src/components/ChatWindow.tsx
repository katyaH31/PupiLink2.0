import React, { useEffect, useState } from "react";
import Chat from "../models/Chat";
import ChatService from "../services/ChatService";
import ChatList from "./ChatList";
import ChatModal from "./ChatModal";
import { Box } from "@mui/material";

const ChatWindow: React.FC = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setIsChatOpen(true);
  };

  const handleBackToList = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {
    ChatService.getChats().then(setChatList);
  }, []);

  return (
    <Box sx={{zIndex: '1000'}} >
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
              <ChatList chats={chatList} onSelectChat={handleSelectChat} />
            ) : (
              <ChatModal chat={chatList.find((chat) => chat.id === selectedChatId)!} onBackToList={handleBackToList} />
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

export default ChatWindow;
