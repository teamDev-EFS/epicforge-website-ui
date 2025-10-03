import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlobalVoiceSearch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      const langMap: { [key: string]: string } = {
        en: 'en-US',
        es: 'es-ES',
        fr: 'fr-FR',
        ja: 'ja-JP',
        ko: 'ko-KR'
      };
      recognitionRef.current.lang = langMap[i18n.language] || 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setIsProcessing(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [i18n.language]);

  const handleVoiceCommand = (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();

    setTimeout(() => {
      if (lowerCommand.includes('home') || lowerCommand.includes('inicio') || lowerCommand.includes('accueil')) {
        navigate('/');
      } else if (lowerCommand.includes('portfolio') || lowerCommand.includes('work') || lowerCommand.includes('projects')) {
        navigate('/portfolio');
      } else if (lowerCommand.includes('about') || lowerCommand.includes('team') || lowerCommand.includes('acerca')) {
        navigate('/about');
      } else if (lowerCommand.includes('contact') || lowerCommand.includes('contacto')) {
        navigate('/contact');
      } else if (lowerCommand.includes('help') || lowerCommand.includes('support') || lowerCommand.includes('ayuda')) {
        navigate('/help');
      } else if (lowerCommand.includes('blog')) {
        navigate('/blog');
      } else if (lowerCommand.includes('price') || lowerCommand.includes('cost') || lowerCommand.includes('quote')) {
        navigate('/contact');
      }

      setIsProcessing(false);
      setTranscript('');
      setIsListening(false);
    }, 500);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setTranscript('');
    } else {
      if (recognitionRef.current) {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  return (
    <>
      {/* Voice Search Button - Fixed Top Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className="fixed top-24 right-8 z-40 group"
      >
        <div className={`absolute -inset-2 ${isListening ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-teal-500 to-cyan-600'} rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300 ${isListening ? 'animate-pulse' : ''}`} />
        <div className={`relative w-14 h-14 ${isListening ? 'bg-gradient-to-r from-red-600 to-rose-700' : 'bg-gradient-to-r from-teal-600 to-cyan-700'} rounded-full shadow-2xl flex items-center justify-center`}>
          {isListening ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </div>
      </motion.button>

      {/* Voice Search Overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-3xl shadow-2xl border border-teal-500/30 max-w-2xl w-full mx-4"
            >
              {/* Close Button */}
              <button
                onClick={toggleListening}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              {/* Animated Microphone */}
              <div className="flex flex-col items-center mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                >
                  <Mic className="w-16 h-16 text-white" />
                </motion.div>

                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex space-x-2 mb-6"
                >
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-3">
                  {isProcessing ? 'Processing...' : 'Listening...'}
                </h2>
                <p className="text-gray-400 text-center mb-6">
                  Try saying: "Go to portfolio", "Show me contact", "Open help center"
                </p>

                {/* Transcript Display */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl border border-teal-500/30 w-full"
                  >
                    <p className="text-white text-lg text-center">"{transcript}"</p>
                  </motion.div>
                )}
              </div>

              {/* Quick Commands */}
              <div className="bg-slate-700/30 backdrop-blur-sm p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-2 font-semibold">Quick Commands:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-teal-400">• "Home"</div>
                  <div className="text-teal-400">• "Portfolio"</div>
                  <div className="text-teal-400">• "Contact"</div>
                  <div className="text-teal-400">• "Help"</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalVoiceSearch;
