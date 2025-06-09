import React, { useEffect, useState } from "react";
import Chat from "../models/Chat";
import ChatService from "../services/ChatService";
import ChatList from "./ChatList";
import ChatModal from "./ChatModal";
import ChatBotModal from "./ChatBotModal";
import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StreamRoundedIcon from '@mui/icons-material/StreamRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';




const ChatWindow: React.FC = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showBotBubble, setShowBotBubble] = useState(true);

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setIsChatOpen(true);
  };

  const handleBackToList = () => {
    setSelectedChatId(null);
  };

  useEffect(() => {
    ChatService.getChats().then(setChatList);

    // Oculta la burbuja flotante luego de 7 segundos (opcional)
    const timer = setTimeout(() => {
      setShowBotBubble(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* Botón de mensajería - IZQUIERDA */}
      {!isChatOpen && (
        <button
          className="fixed bottom-4 left-4 bg-custom-purple text-white p-4 rounded-full shadow-lg w-[60px] h-[60px] flex items-center justify-center"
          onClick={() => setIsChatOpen(true)}
        >
           <ChatBubbleRoundedIcon style={{ color: "white", fontSize: 40 }} />
        </button>
      )}

      {/* Burbujita flotante del bot */}
      {!isBotOpen && showBotBubble && (
        <div className="fixed bottom-6 right-20 flex items-center space-x-3 z-50">
          <div className="bg-white text-black text-sm px-4 py-2 rounded-xl shadow-md">
            ¡Hola! Soy PupiBot ✨
          </div>
        </div>
      )}

      {/* Botón de chatbot - DERECHA */}
      {!isBotOpen && (
  <button
    className="fixed bottom-4 right-4 bg-custom-purple p-4 rounded-full shadow-lg w-[60px] h-[60px] flex items-center justify-center"
    onClick={() => setIsBotOpen(true)}
  >
    <StreamRoundedIcon style={{ color: "white", fontSize: 40 }} />
  </button>
)}


      {/* Modal de mensajería (izquierda) */}
      {isChatOpen && (
        <Box
          sx={{ zIndex: 9999 }}
          className="fixed bottom-4 left-4 bg-custom-purple text-white rounded-lg shadow-lg overflow-hidden w-[400px] h-[calc(52vh-64px)] flex flex-col"
        >
          <div className="flex justify-end p-2 bg-custom-purple">
            <button onClick={() => setIsChatOpen(false)}>
              <ClearIcon sx={{ color: "white" }} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {selectedChatId === null ? (
              <ChatList chats={chatList} onSelectChat={handleSelectChat} />
            ) : (
              <ChatModal
                chat={chatList.find((chat) => chat.id === selectedChatId)!}
                onBackToList={handleBackToList}
              />
            )}
          </div>
        </Box>
      )}

      {/* Modal del chatbot (derecha) */}
      {isBotOpen && (
        <Box
          sx={{ zIndex: 9999 }}
          className="fixed bottom-4 right-4 bg-custom-purple text-white rounded-lg shadow-lg overflow-hidden w-[400px] h-[calc(52vh-64px)] flex flex-col"
        >
          <ChatBotModal onClose={() => setIsBotOpen(false)} />
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;

