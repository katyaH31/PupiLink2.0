import React, { useEffect, useRef, useState } from "react";
import { getBotResponse } from "../data/botRules"; // <-- Asegúrate de que esta línea exista y sea correcta
import pupibotIcon from "../assets/pupibot.png";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios"; // <-- Asegúrate de que esta línea exista


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

  
  const OLLAMA_API_BASE_URL = "http://localhost:11434/api/chat"; 
  const OLLAMA_MODEL = "phi3"; //model Ollama

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

  const handleSend = async () => {
    // <--- Asegúrate de que sea async
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [
      ...prev,
      userMessage,
      { sender: "typing", text: "..." },
    ]);
    const currentInput = input;
    setInput("");

    let botReply: string | null = null; // Variable para almacenar la respuesta del bot

    // --- PASO 1: INTENTAR RESPONDER CON LAS REGLAS PREDEFINIDAS ---
    const ruleBasedResponse = getBotResponse(currentInput); // <-- USO DE getBotResponse AQUÍ

    if (ruleBasedResponse) {
      // Si se encontró una respuesta basada en reglas, úsala
      botReply = ruleBasedResponse;
    } else {
      // --- PASO 2: SI NO HAY REGLAS, IR A OLLAMA (IA GENERATIVA) ---
      try {
        // 1. Prepara el System Prompt para Ollama
        const systemPromptContent =
          "Eres PupiBot, un asistente virtual experto y conciso en el área de pupilajes y el uso de la plataforma PupiLink. Responde de forma breve y directa a las preguntas, centrándote solo en el tema de los pupilajes y PupiLink. Si la pregunta no está relacionada, di amablemente que solo puedes ayudar con temas de PupiLink.";

        // Inicia el historial de la conversación con el System Prompt
        const conversationHistory = [
          {
            role: "system",
            content: systemPromptContent,
          },
        ];

        // 2. Añade los mensajes existentes de la conversación (filtrando el "typing")
        messages
          .filter((msg) => msg.sender !== "typing")
          .forEach((msg) => {
            conversationHistory.push({
              role: msg.sender === "user" ? "user" : "assistant", // Mapea 'bot' a 'assistant'
              content: msg.text,
            });
          });

        // 3. Añade el mensaje actual del usuario
        conversationHistory.push({ role: "user", content: currentInput });

        // Llama a la API de Ollama
        const response = await axios.post(OLLAMA_API_BASE_URL, {
          // <-- USO DE OLLAMA_API_BASE_URL y OLLAMA_MODEL AQUÍ
          model: OLLAMA_MODEL,
          messages: conversationHistory,
          stream: false,
        });

        botReply = response.data.message.content; // Obtiene la respuesta de Ollama
      } catch (error) {
        console.error("Error al comunicarse con Ollama:", error);
        botReply =
          "Lo siento, no pude obtener una respuesta en este momento. Por favor, asegúrate de que Ollama esté funcionando o intenta con otra pregunta.";
      }
    }

    // --- PASO 3: ACTUALIZAR LOS MENSAJES EN LA UI ---
    const finalBotMessage: ChatMessage = botReply
      ? { sender: "bot", text: botReply }
      : {
          sender: "bot",
          text: "Lo siento, no entendí tu mensaje ni pude obtener una respuesta de la IA.",
        };

    setMessages((prev) => [
      ...prev.filter((msg) => msg.sender !== "typing"),
      finalBotMessage,
    ]);
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
          <img
            src={pupibotIcon}
            alt="PupiBot"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="text-base font-semibold">¡Hola! Soy PupiBot 👋</h2>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-xl font-bold"
        >
          <ClearIcon />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
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








