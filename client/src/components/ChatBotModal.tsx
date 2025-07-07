import React, { useEffect, useRef, useState } from "react";
import { getBotResponse } from "../data/botRules"; 
import pupibotIcon from "../assets/pupibot.png";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios"; 
import pupiLinkInfo from "../data/pupilink_context.txt";

type ChatMessage = {
  sender: "user" | "bot" | "typing";
  text: string;
};

interface ChatBotModalProps {
  onClose: () => void;
}
const LOCAL_STORAGE_KEY = "pupibot_chat_history";
// Límite de mensajes
const MAX_HISTORY_MESSAGES = 20;

const ChatBotModal: React.FC<ChatBotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  const OLLAMA_API_BASE_URL = "http://localhost:11434/api/chat"; 
  const OLLAMA_MODEL = "phi3"; //model Ollama

  
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
      let parsedMessages: ChatMessage[] = [];

      if (storedMessages) {
        parsedMessages = JSON.parse(storedMessages);
        
        setMessages([
          {
            sender: "bot",
            text: "¡Hola! 👋 ¿Tenés dudas sobre PupiLink? Escribime y te ayudo. 😊",
          },
        ]);
      } else {
       
        setMessages(parsedMessages.filter(msg => msg.sender !== "typing"));
      }
    } catch (error) {
      console.error("Error al cargar el historial desde localStorage:", error);
      // En caso de error, inicializa con el mensaje de bienvenida
      setMessages([
        {
          sender: "bot",
          text: "¡Hola! 👋 ¿Tenés dudas sobre PupiLink? Escribime y te ayudo. 😊",
        },
      ]);
    }
  }, []); 

  //  Guardar historial cada vez que 'messages' cambia ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const messagesToSave = messages
                                .filter(msg => msg.sender !== "typing")
                                .slice(Math.max(0, messages.length - MAX_HISTORY_MESSAGES)); // Limita la cantidad de mensajes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messagesToSave));
  }, [messages]); 

  const handleSend = async () => {
 
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


    const ruleBasedResponse = getBotResponse(currentInput); // <-- getBotResponse AQUÍ

    if (ruleBasedResponse) {
      // Si se encontró una respuesta basada en reglas, úsala
      botReply = ruleBasedResponse;
    } else {
   
      try {
        // System Prompt para Ollama
        const systemPromptContent =
           `Eres PupiBot, un asistente virtual experto y conciso en el área de pupilajes y el uso de la plataforma PupiLink. Responde de forma breve y directa a las preguntas, centrándote solo en el tema de los pupilajes y PupiLink. Si la pregunta no está relacionada, di amablemente que solo puedes ayudar con temas de PupiLink.

          A continuación, se te proporciona información detallada sobre la plataforma PupiLink para ayudarte a responder con precisión:
          ${pupiLinkInfo}

          Considera esta información para generar tus respuestas, pero mantenlas concisas y enfocadas.`;

        // Inicia el historial de la conversación con el System Prompt
        const conversationHistory = [
          {
            role: "system",
            content: systemPromptContent,
          },
        ];


         const HISTORY_LIMIT_FOR_OLLAMA = 5; // Por ejemplo, los últimos 5 intercambios (usuario+bot)

      // Filtra mensajes de "typing" y toma los últimos N mensajes reales
      const recentMessages = messages
        .filter((msg) => msg.sender !== "typing")
        .slice(Math.max(0, messages.length - HISTORY_LIMIT_FOR_OLLAMA));

      recentMessages.forEach((msg) => {
        conversationHistory.push({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        });
      });

        
        conversationHistory.push({ role: "user", content: currentInput });

        // Llama a la API de Ollama
        const response = await axios.post(OLLAMA_API_BASE_URL, {
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
      {}
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