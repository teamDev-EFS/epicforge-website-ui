import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot, X, Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { saveLead, Lead } from '../lib/supabase';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatState {
  step: 'greeting' | 'name' | 'email' | 'budget' | 'project' | 'timeline' | 'qualified';
  userData: Partial<Lead>;
}

const AIChat: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    step: 'greeting',
    userData: { language: i18n.language }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { speak, cancel, speaking, supported: speechSupported } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setInputValue(result);
      handleSendMessage(result);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t('chat.greeting'));
    }
  }, [isOpen, t]);

  const addBotMessage = (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    
    if (speechSupported) {
      speak({ text, voice: getVoiceForLanguage(i18n.language) });
    }
  };

  const addUserMessage = (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const getVoiceForLanguage = (language: string) => {
    const voices = speechSynthesis.getVoices();
    const languageMap: { [key: string]: string } = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'ko': 'ko-KR'
    };
    
    return voices.find(voice => voice.lang.startsWith(languageMap[language] || 'en-US'));
  };

  const processUserInput = (input: string) => {
    const newUserData = { ...chatState.userData };
    let nextStep = chatState.step;
    let botResponse = '';

    switch (chatState.step) {
      case 'greeting':
        nextStep = 'name';
        botResponse = t('chat.askName');
        break;
      
      case 'name':
        newUserData.name = input;
        nextStep = 'email';
        botResponse = t('chat.askEmail', { name: input });
        break;
      
      case 'email':
        newUserData.email = input;
        nextStep = 'budget';
        botResponse = t('chat.askBudget');
        break;
      
      case 'budget':
        newUserData.budget = input;
        nextStep = 'project';
        botResponse = t('chat.askProject');
        break;
      
      case 'project':
        newUserData.project_type = input;
        nextStep = 'timeline';
        botResponse = t('chat.askTimeline');
        break;
      
      case 'timeline':
        newUserData.timeline = input;
        nextStep = 'qualified';
        botResponse = t('chat.qualified');
        
        // Save lead to Supabase
        const leadData: Omit<Lead, 'id' | 'created_at'> = {
          name: newUserData.name || '',
          email: newUserData.email || '',
          budget: newUserData.budget || '',
          project_type: newUserData.project_type || '',
          timeline: newUserData.timeline || '',
          problem: `${newUserData.project_type} - ${newUserData.timeline}`,
          language: i18n.language,
          source: 'ai_chat',
          qualified: true
        };
        
        saveLead(leadData).then(() => {
          // Trigger Calendly after a delay
          setTimeout(() => {
            addBotMessage(t('chat.calendlyTrigger'));
            setTimeout(() => {
              window.open('https://calendly.com/team-dev-epicforgesoftware/30min', '_blank');
            }, 1000);
          }, 2000);
        }).catch(console.error);
        break;
    }

    setChatState({ step: nextStep, userData: newUserData });
    return botResponse;
  };

  const handleSendMessage = (message?: string) => {
    const text = message || inputValue.trim();
    if (!text) return;

    addUserMessage(text);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = processUserInput(text);
      addBotMessage(botResponse);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (listening) {
      stop();
    } else {
      listen();
    }
  };

  const toggleSpeaking = () => {
    if (speaking) {
      cancel();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-40"
      >
        <Bot className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Online • Multilingual</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {speechSupported && (
                  <button
                    onClick={toggleSpeaking}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-4"
                >
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {speechSupported && (
                  <button
                    onClick={toggleListening}
                    className={`p-2 rounded-full transition-colors ${
                      listening
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;