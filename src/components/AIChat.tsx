import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  User,
  Bot,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("chat.greeting"),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputError, setInputError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Enhanced validation for input
    const trimmedInput = input.trim();

    // Clear previous errors
    setInputError("");

    // Check for minimum length
    if (trimmedInput.length < 2) {
      setInputError("Message must be at least 2 characters long");
      return;
    }

    // Check for maximum length to prevent spam
    if (trimmedInput.length > 1000) {
      setInputError("Message is too long (maximum 1000 characters)");
      return;
    }

    // Check for potentially harmful content (basic filtering)
    const harmfulPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    if (harmfulPatterns.some((pattern) => pattern.test(trimmedInput))) {
      setInputError("Message contains potentially harmful content");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = generateBotResponse(trimmedInput);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      if (isSpeaking) {
        speakText(botResponse);
      }
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("price") ||
      lowerInput.includes("cost") ||
      lowerInput.includes("quote")
    ) {
      return "I'd be happy to help with pricing! Our services are customized based on your needs. Would you like to book a free consultation call, or get an instant quote via WhatsApp?";
    }

    if (lowerInput.includes("ai") || lowerInput.includes("automation")) {
      return "We specialize in AI-powered solutions including AI SEO optimization, voice assistants, chatbots, and workflow automation. Our AI systems have helped clients achieve 350% traffic growth. Would you like to learn more about a specific service?";
    }

    if (lowerInput.includes("seo")) {
      return "Our AI SEO service optimizes your website for both traditional Google search and modern LLM platforms like ChatGPT. We use structured data, conversational content, and advanced schema markup to ensure maximum visibility. Would you like a free SEO audit?";
    }

    if (
      lowerInput.includes("portfolio") ||
      lowerInput.includes("work") ||
      lowerInput.includes("projects")
    ) {
      return "We've delivered 15+ projects for clients globally, including AI-powered e-commerce platforms, enterprise automation suites, and healthcare apps. Check out our Portfolio page to see detailed case studies!";
    }

    if (
      lowerInput.includes("contact") ||
      lowerInput.includes("call") ||
      lowerInput.includes("meet")
    ) {
      return "Great! You can reach us at info@epicforgesoftware.com or book a free strategy call through our Contact page. We also offer instant WhatsApp consultations - just click the floating button on your screen!";
    }

    if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("hey")
    ) {
      return "Hello! Welcome to EpicForge Software. I'm here to help you with any questions about our AI solutions, web development, or automation services. What would you like to know?";
    }

    return "That's a great question! Our team specializes in AI-driven websites, IT solutions, and enterprise automation. Would you like to schedule a free consultation to discuss your specific needs, or would you prefer to explore our services first?";
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const toggleVoiceOutput = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking && messages.length > 0) {
      const lastBotMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "bot");
      if (lastBotMessage) {
        speakText(lastBotMessage.text);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // Clear error when user starts typing
    if (inputError) {
      setInputError("");
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 left-8 z-40 group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse" />
            <div className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-8 z-50 w-96 h-[600px] bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-purple-500/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{t("chat.title")}</h3>
                  <p className="text-purple-100 text-xs">
                    {t("chat.subtitle")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoiceOutput}
                  className={`p-2 rounded-lg transition-colors ${
                    isSpeaking ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  <Volume2
                    className={`w-5 h-5 ${
                      isSpeaking ? "text-white" : "text-white/70"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-teal-600 to-cyan-600"
                          : "bg-gradient-to-r from-purple-600 to-pink-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                          : "bg-slate-800 text-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/50 backdrop-blur-sm border-t border-purple-500/20">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={
                      isListening ? "Listening..." : t("chat.placeholder")
                    }
                    className={`w-full bg-slate-800 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 placeholder-gray-500 ${
                      inputError
                        ? "border-2 border-red-500 focus:ring-red-500"
                        : "focus:ring-purple-500"
                    }`}
                  />
                  {isListening && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"
                    />
                  )}
                </div>

                {/* Error Message */}
                {inputError && (
                  <div className="mt-2 text-red-400 text-sm flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    <span>{inputError}</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoiceInput}
                  className={`p-3 rounded-xl transition-all ${
                    isListening
                      ? "bg-red-500 text-white"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
