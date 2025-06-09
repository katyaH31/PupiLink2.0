import React, { useEffect, useRef, useState } from "react";
import { getBotResponse } from "../data/botRules";
import pupibotIcon from "../assets/pupibot.png";
import ClearIcon from "@mui/icons-material/Clear";

type ChatMessage = {
  sender: "user" | "bot" | "typing";
  text: string;
};

interface ChatBotModalProps {
  onClose: () => void;
}

const ChatBotModal: React.FC<ChatBotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "¡Hola! 👋 ¿Tenés dudas sobre PupiLink? Escribime y te ayudo. 😊",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage, { sender: "typing", text: "..." }]);
    const currentInput = input;
    setInput("");

    setTimeout(() => {
      const botReply = getBotResponse(currentInput);
      const botMessage: ChatMessage = botReply
        ? { sender: "bot", text: botReply }
        : { sender: "bot", text: "Lo siento, no entendí tu mensaje." };

      setMessages((prev) => [
        ...prev.filter((msg) => msg.sender !== "typing"),
        botMessage,
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Header completo con X incluida */}
      <div className="bg-custom-purple text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={pupibotIcon} alt="PupiBot" className="w-8 h-8 rounded-full" />
          <h2 className="text-base font-semibold">¡Hola! Soy PupiBot 👋</h2>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-300 text-xl font-bold">
          <ClearIcon />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-xl px-4 py-2 max-w-[75%] text-[15px] break-words ${
                msg.sender === "user"
                  ? "bg-custom-purple text-white text-right"
                  : msg.sender === "bot"
                  ? "bg-white text-black text-left"
                  : "bg-purple-300 text-white italic text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t border-purple-200 flex bg-custom-purple">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribí tu mensaje..."
          className="flex-1 px-4 py-3 rounded-l-xl text-black bg-white placeholder-gray-600 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-white text-custom-purple px-6 py-3 rounded-r-xl hover:bg-gray-200 font-bold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatBotModal;







