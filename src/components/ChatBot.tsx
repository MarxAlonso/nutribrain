"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  suggestions?: { title: string; id: string }[];
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    sender: 'bot',
    text: '¡Hola! Soy **NutriBot**, tu asistente heurístico. Pregúntame sobre cualquier tema o padecimiento y buscaré entre mis neuronas.'
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply,
        suggestions: data.suggestions
      };
      
      // Simulate slight delay for "thinking" effect
      setTimeout(() => {
         setMessages(prev => [...prev, botMessage]);
         setIsTyping(false);
      }, 600);

    } catch (error) {
      setMessages(prev => [...prev, { id: 'error', sender: 'bot', text: 'Error al conectar con la base de datos neurológica.' }]);
      setIsTyping(false);
    }
  };

  const ExampleQueries = ["¿Qué genera la presión alta?", "Beneficios del ayuno", "Microbiota intestinal", "Omega 3"];

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 md:bottom-6 right-4 md:right-6 w-12 md:w-14 h-12 md:h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] z-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={26} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100%-2rem)] md:w-[400px] h-[500px] md:h-[550px] max-h-[80vh] bg-[#060e17] border border-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#091522] border-b border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/20 p-1.5 rounded-md text-emerald-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">NutriBot</h3>
                  <span className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> En Línea</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-sm' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'
                  }`}>
                    {/* Convert markdown to simple elements */}
                    <div className="prose prose-sm prose-invert prose-p:leading-snug prose-a:text-emerald-300">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    
                    {/* Suggestions Chip */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-slate-700 pt-2">
                        <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Lecturas Sugeridas:</span>
                        {msg.suggestions.map((sug, idx) => (
                           <Link href={`/n/${sug.id}`} key={idx} onClick={() => setIsOpen(false)} className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-900 px-2 py-1.5 rounded-lg transition-colors">
                              <LinkIcon size={12} /> {sug.title}
                           </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-bl-sm text-sm border border-slate-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions before typing */}
            {messages.length === 1 && (
               <div className="px-4 pb-2 flex gap-2 overflow-x-auto snap-x no-scrollbar">
                  {ExampleQueries.map((q, i) => (
                     <button key={i} onClick={() => handleSend(q)} className="snap-start shrink-0 text-xs text-emerald-400 border border-emerald-800 bg-emerald-950/30 px-3 py-1.5 rounded-full hover:bg-emerald-900/50 transition-colors">
                        {q}
                     </button>
                  ))}
               </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-[#091522] border-t border-slate-800">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregunta algo al cerebro..."
                  className="flex-1 bg-slate-800 border-none outline-none focus:ring-1 focus:ring-emerald-500 text-slate-200 text-sm rounded-full px-4 py-2.5"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 bg-emerald-500 text-slate-900 rounded-full hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
