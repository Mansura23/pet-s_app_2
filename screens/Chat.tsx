
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getVetAdvice } from '../services/geminiService';

interface ChatProps {
  history: ChatMessage[];
  setHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ history, setHistory, onBack }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botResponse = await getVetAdvice(history, input);
    
    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: botResponse,
      timestamp: Date.now()
    };

    setHistory(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#F0FDF4]">
      {/* Header */}
      <div className="bg-white p-6 pb-8 rounded-b-[3rem] shadow-sm flex items-center gap-4 z-20 border-b border-emerald-50">
        <button onClick={onBack} className="bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-500">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-[#10B981] border-2 border-white shadow-sm">
            <i className="fa-solid fa-user-md text-xl"></i>
          </div>
          <div>
            <h2 className="font-bold text-[#064E3B]">AI Vet Assistant</h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-wider">Secure Channel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar pb-32"
      >
        {history.length === 0 && (
          <div className="text-center py-10 px-6">
            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mx-auto mb-4 text-[#10B981] border border-emerald-50">
              <i className="fa-solid fa-stethoscope text-3xl"></i>
            </div>
            <h3 className="font-bold text-[#064E3B] mb-2">Hello! I'm PawsGuard</h3>
            <p className="text-sm text-emerald-800/40 leading-relaxed px-4">
              I can help with health advice, feeding tips, or identifying symptoms. How is your pet feeling?
            </p>
          </div>
        )}

        {history.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-[#10B981] text-white rounded-br-none' 
                : 'bg-white text-[#064E3B] rounded-bl-none border border-emerald-50'
              }`}
            >
                {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('-') ? 'ml-2 mb-1 flex items-start gap-2' : 'mb-2'}>
                      {line.startsWith('-') && <span className="text-[#10B981]">•</span>}
                      {line.startsWith('-') ? line.substring(1) : line}
                    </p>
                ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl rounded-bl-none border border-emerald-50 shadow-sm flex gap-1.5">
              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-24 left-0 w-full px-6">
        <div className="bg-white p-2 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 flex items-center gap-2 border border-emerald-50">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-4 bg-transparent text-black outline-none text-sm font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              input.trim() ? 'bg-[#10B981] text-white shadow-lg' : 'bg-emerald-50 text-emerald-200'
            }`}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
