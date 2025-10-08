import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  Brain,
  Zap,
  Loader2,
} from "lucide-react";
import AILearningEngine from "./AILearningEngine";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatContext {
  userPreferences: Record<string, any>;
  conversationHistory: Message[];
  userIndustry?: string;
  userGoals?: string[];
  lastInteraction?: Date;
}

const AdvancedAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant for EpicForge Software. I can help you with information about our AI-powered web development, blockchain solutions, automation tools, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext>({
    userPreferences: {},
    conversationHistory: [],
  });
  const [learningData, setLearningData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Advanced AI response generation with context awareness
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const lowerMessage = userMessage.toLowerCase();

    // Check for personalized response based on learning data
    if (learningData) {
      const personalizedResponse = generatePersonalizedResponse(userMessage);
      if (personalizedResponse) {
        return personalizedResponse;
      }
    }

    // Context-aware responses based on conversation history and user preferences
    const context = analyzeContext(userMessage);

    // Industry-specific responses
    if (context.industry) {
      return generateIndustryResponse(context.industry, userMessage);
    }

    // Service-specific responses
    if (
      lowerMessage.includes("website") ||
      lowerMessage.includes("web development")
    ) {
      return `Our AI-powered web development services include:
      
🚀 **Modern Tech Stack**: React, Next.js, TypeScript, Node.js
🤖 **AI Integration**: Smart chatbots, voice assistants, automation
📱 **Mobile-First**: 100% responsive design for all devices
⚡ **Performance**: Core Web Vitals optimization, 90+ PageSpeed score
🔒 **Security**: Enterprise-grade security and data protection

We've helped clients achieve 350% traffic growth. Would you like to discuss your specific project requirements?`;
    }

    if (lowerMessage.includes("ai seo") || lowerMessage.includes("seo")) {
      return `Our AI SEO service is revolutionary! Here's what we offer:

🎯 **LLM Optimization**: Rank on ChatGPT, Perplexity, Google AI
📈 **Results**: 200-350% traffic growth in 6 months
🗣️ **Voice Search**: Optimized for Alexa, Siri, Google Assistant
📊 **Analytics**: Real-time performance tracking
🔄 **Continuous Learning**: AI adapts to search algorithm changes

Our clients typically see results in 2-3 months. What's your current website's main challenge?`;
    }

    if (
      lowerMessage.includes("blockchain") ||
      lowerMessage.includes("crypto")
    ) {
      return `EpicForge specializes in blockchain solutions:

⛓️ **Smart Contracts**: Ethereum, Polygon, BSC development
🏦 **DeFi Platforms**: DEX, yield farming, staking protocols
🛡️ **Security Audits**: Comprehensive smart contract reviews
💼 **Enterprise Integration**: Blockchain for business processes
🌐 **Cross-Chain**: Multi-blockchain compatibility

We've built secure, scalable blockchain solutions for various industries. What type of blockchain project are you considering?`;
    }

    if (
      lowerMessage.includes("automation") ||
      lowerMessage.includes("workflow")
    ) {
      return `Our automation solutions transform businesses:

🤖 **AI Chatbots**: 24/7 customer support with voice capabilities
📋 **Workflow Automation**: Streamline business processes
📊 **Data Processing**: AI-powered data analysis and insights
🔄 **CRM Integration**: Automated lead management
📧 **Email Marketing**: Intelligent campaign automation

We've helped clients automate 85% of their workflows. What processes would you like to automate?`;
    }

    if (
      lowerMessage.includes("pricing") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("price")
    ) {
      return `Our pricing is tailored to your needs:

💻 **Website Development**: Starting at $5,000
🎯 **AI SEO Packages**: From $2,000/month
🤖 **Automation Solutions**: Custom pricing based on complexity
📈 **Enterprise Solutions**: Scalable pricing for large organizations

We offer flexible payment plans and milestone-based billing. Would you like a custom quote for your specific requirements?`;
    }

    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("call") ||
      lowerMessage.includes("meeting")
    ) {
      return `Great! Here are the best ways to reach us:

📞 **Free Consultation**: Book a 30-minute call
💬 **WhatsApp**: Instant messaging support
📧 **Email**: contact@epicforgesoftware.com
🌐 **Branches**: Indore, Bhopal, Hyderabad, Visakhapatnam

I can help you book a consultation call right now. Would you like me to schedule that for you?`;
    }

    if (
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("projects") ||
      lowerMessage.includes("case study")
    ) {
      return `Here are some of our recent success stories:

🏆 **E-Commerce Platform**: 350% traffic growth in 6 months
🏢 **SaaS Application**: 200% user engagement increase
🛒 **Online Marketplace**: 85% workflow automation
🏥 **Healthcare Platform**: AI-powered patient management
🎓 **EdTech Solution**: Voice-enabled learning platform

Would you like to see detailed case studies for any specific industry or project type?`;
    }

    // Default intelligent response
    return `I understand you're interested in learning more about EpicForge Software. 

Based on our conversation, I'd recommend focusing on:

🎯 **AI-Powered Solutions**: We specialize in cutting-edge AI technology
🚀 **Proven Results**: 350% traffic growth for our clients
🌐 **Multi-Platform**: Websites, mobile apps, blockchain, automation
📈 **Growth-Focused**: Every solution is designed for business growth

Could you tell me more about your specific business goals or challenges? I can provide more targeted recommendations.`;
  };

  // Context analysis for personalized responses
  const analyzeContext = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Industry detection
    const industries = {
      ecommerce: ["ecommerce", "online store", "shop", "retail", "selling"],
      healthcare: ["healthcare", "medical", "hospital", "clinic", "patient"],
      education: ["education", "school", "university", "learning", "student"],
      finance: ["finance", "banking", "fintech", "payment", "financial"],
      realestate: ["real estate", "property", "housing", "construction"],
    };

    for (const [industry, keywords] of Object.entries(industries)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return { industry };
      }
    }

    return {};
  };

  // Generate personalized responses based on learning data
  const generatePersonalizedResponse = (userMessage: string): string => {
    if (!learningData) return "";

    const lowerMessage = userMessage.toLowerCase();

    // Check if user has shown interest in specific areas
    if (
      learningData.userInterests?.includes("web-development") &&
      (lowerMessage.includes("website") || lowerMessage.includes("web"))
    ) {
      return `Based on your interest in web development, I'd recommend our AI-powered web development services. We use modern technologies like React, Next.js, and TypeScript to build high-performance websites that rank well on both Google and AI search engines.`;
    }

    if (
      learningData.userInterests?.includes("ai-seo") &&
      (lowerMessage.includes("seo") || lowerMessage.includes("ranking"))
    ) {
      return `Since you're interested in AI SEO, let me share that our clients typically see 200-350% traffic growth within 6 months. We specialize in optimizing content for ChatGPT, Perplexity, and other AI platforms.`;
    }

    // Check for common questions and provide more detailed answers
    const commonQuestion = Object.keys(learningData.commonQuestions || {}).find(
      (question) => lowerMessage.includes(question.toLowerCase())
    );

    if (commonQuestion) {
      return `I notice you've asked about ${commonQuestion} before. Let me provide a more detailed answer based on your previous interest...`;
    }

    return "";
  };

  // Generate industry-specific responses
  const generateIndustryResponse = (
    industry: string,
    message: string
  ): string => {
    const responses = {
      ecommerce: `Perfect! E-commerce is one of our specialties. We've helped online stores achieve:

🛒 **350% Traffic Growth**: Through AI SEO and optimization
🤖 **AI Chatbots**: 24/7 customer support and sales assistance
📱 **Mobile Optimization**: Seamless shopping experience
⚡ **Fast Loading**: Sub-2 second page load times
🔒 **Secure Payments**: Enterprise-grade security

Our recent e-commerce client saw a 200% increase in conversions. What's your current online store's biggest challenge?`,

      healthcare: `Healthcare technology is crucial! We specialize in:

🏥 **HIPAA Compliance**: Secure, compliant healthcare solutions
📊 **Patient Management**: AI-powered patient data systems
🤖 **Appointment Scheduling**: Automated booking and reminders
📱 **Telemedicine**: Video consultation platforms
🔒 **Data Security**: Medical-grade security protocols

We've built secure healthcare platforms for clinics and hospitals. What specific healthcare solution do you need?`,

      education: `EdTech is transforming learning! Our education solutions include:

🎓 **Learning Management Systems**: Comprehensive LMS platforms
🤖 **AI Tutors**: Personalized learning assistance
📱 **Mobile Learning**: Accessible education on any device
🎤 **Voice Learning**: Voice-enabled educational content
📊 **Analytics**: Student progress tracking and insights

We've helped educational institutions improve student engagement by 300%. What type of educational platform are you building?`,
    };

    return responses[industry as keyof typeof responses] || responses.ecommerce;
  };

  // Send message function
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Update context
    setChatContext((prev) => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, userMessage],
      lastInteraction: new Date(),
    }));

    try {
      const response = await generateAIResponse(inputText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing some technical difficulties. Please try again or contact our support team directly.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice input function
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* AI Learning Engine */}
      <AILearningEngine
        onLearningUpdate={setLearningData}
        conversationHistory={messages}
      />

      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Open AI Chat"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:shadow-purple-500/50 group-hover:scale-110">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-7 h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Notification badge */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
        >
          <Brain className="w-3 h-3 text-white" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-4 h-[70vh] max-h-[600px] sm:left-6 sm:right-auto sm:top-auto sm:bottom-24 sm:w-96 sm:h-[500px] z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-sm opacity-90 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {learningData?.userInterests?.length > 0
                        ? `Learning AI (${learningData.userInterests.length} interests)`
                        : "Self-Learning AI"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      {message.sender === "user" && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.text}
                        </p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about EpicForge Software..."
                    className="w-full p-3 pr-12 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={2}
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-2 top-2 p-2 rounded-lg transition-colors ${
                      isListening
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedAIChat;
