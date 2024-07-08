import React, { useEffect, useState } from "react";
import Chat from "../models/Chat";
import ChatService from "../services/ChatService";
import ChatList from "./ChatList";
import ChatModal from "./ChatModal";
import { Box } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

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
    <Box  >
      {!isChatOpen && (
        <button
          className="fixed bottom-4 right-4 bg-custom-purple text-white p-4 rounded-full shadow-lg w-[48px] h-[48px] flex items-center justify-center"
          onClick={() => setIsChatOpen(true)}
        >
          💬
        </button>
      )}
      {isChatOpen && (
        <Box sx={{ zIndex: '9999' }} className="fixed bottom-4 right-4 bg-custom-purple text-white rounded-lg shadow-lg overflow-hidden w-[400px] h-[calc(52vh-64px)] flex flex-col">
          <div className="flex justify-end p-2 bg-custom-purple">
            <button
              className="hover:text-custom-purple"
              onClick={() => setIsChatOpen(false)}
            >
              <ClearIcon sx={{ color: "white" }} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {selectedChatId === null ? (
              <ChatList chats={chatList} onSelectChat={handleSelectChat} />
            ) : (
              <ChatModal chat={chatList.find((chat) => chat.id === selectedChatId)!} onBackToList={handleBackToList} />
            )}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
