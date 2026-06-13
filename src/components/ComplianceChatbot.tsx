import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Shield, Sparkles, Check, RefreshCw, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ComplianceChatbotProps {
  language: string;
}

export default function ComplianceChatbot({ language }: ComplianceChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: language === 'si'
        ? 'ආයුබෝවන්! මම ඊ-ටෙක් AI අනුකූලතා සහායකයා. ශ්‍රී ලංකා දත්ත ආරක්ෂණ පනත (PDPA) හෝ CMMC 2.0 (NIST SP 800-171) සම්බන්ධයෙන් ඔබට ඇති ගැටලු ඇසීමට මට හැක.'
        : 'Hello! I am E-Tech AI Compliance Officer. Ask me any questions about Sri Lanka PDPA (No. 9 of 2022) or CMMC 2.0 (NIST SP 800-171) compliance frameworks.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = language === 'si'
    ? [
        { label: 'ශ්‍රී ලංකා PDPA යනු කුමක්ද?', text: 'Explain the key provisions of Sri Lanka Personal Data Protection Act (PDPA), No. 9 of 2022 and how E-Tech helps companies align with it.' },
        { label: 'CMMC Level 2 යනු කුමක්ද?', text: 'Explain CMMC 2.0 Level 2 Advanced compliance requirements and NIST SP 800-171 controls map.' },
        { label: 'pfSense ෆයර්වෝල් සහ අනුකූලතාව', text: 'How do pfSense enterprise firewalls help with NIST security families like Access Control and System Protection?' },
        { label: 'ඊ-ටෙක් විගණන සේවා මොනවාද?', text: 'What specific compliance auditing, data mapping, and evidence documentation services does E-Tech Solutions provide?' }
      ]
    : [
        { label: 'What is Sri Lanka PDPA?', text: 'Explain the key provisions of Sri Lanka Personal Data Protection Act (PDPA), No. 9 of 2022 and how E-Tech helps companies align with it.' },
        { label: 'What is CMMC Level 2?', text: 'Explain CMMC 2.0 Level 2 Advanced compliance requirements and NIST SP 800-171 controls map.' },
        { label: 'pfSense Firewall & Compliance', text: 'How do pfSense enterprise firewalls help with NIST security families like Access Control and System Protection?' },
        { label: 'E-Tech Auditing Services', text: 'What specific compliance auditing, data mapping, and evidence documentation services does E-Tech Solutions provide?' }
      ];

  // Auto scroll to chat bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Collect payload history (last 10 messages to protect token limits and maintain fast responses)
      const messageHistory = messages
        .concat(userMsg)
        .slice(-10)
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const response = await fetch('/api/compliance-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: messageHistory })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server error communicating with AI agent');
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          role: 'assistant',
          content: data.text,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setError(language === 'si' 
        ? 'සම්බන්ධතා දෝෂයකි. කරුණාකර නැවත උත්සාහ කරන්න.' 
        : 'Failed to fetch response. Please ensure backend dev server or API key is active.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  // Safe and clean HTML rendering for Markdown formatting returned by Gemini
  const renderMessageContent = (content: string) => {
    // Process lists and bold markdown strings
    const lines = content.split('\n');
    return lines.map((line, i) => {
      let trimmed = line.trim();
      
      // Determine list item
      const isListItem = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
      if (isListItem) {
        trimmed = trimmed.substring(2);
      }

      // Formatting bold parts (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(trimmed)) !== null) {
        if (match.index > lastIndex) {
          parts.push(trimmed.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-extrabold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < trimmed.length) {
        parts.push(trimmed.substring(lastIndex));
      }

      const renderedLine = parts.length > 0 ? parts : trimmed;

      if (isListItem) {
        return (
          <li key={i} className="ml-4 list-disc text-zinc-300 pl-1 my-1 leading-normal">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={i} className={`my-1 text-zinc-200 leading-normal ${trimmed === '' ? 'h-2' : ''}`}>
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button with Glowing Pulsing Ring */}
      <div className="fixed bottom-6 right-[88px] z-40">
        <motion.button
          id="compliance-chatbot-trigger"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-brand-red text-white p-4 rounded-full shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] cursor-pointer flex items-center justify-center transition-all border border-red-500"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          <span className="absolute -top-1 -right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-[#09090c] animate-pulse" />
          
          {/* Tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-zinc-950 border border-zinc-800 text-stone-200 text-[10px] font-mono tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl uppercase">
            {language === 'si' ? 'අනුකූලතා AI සහායක' : 'Compliance AI Advisor'}
          </span>
        </motion.button>
      </div>

      {/* Expanded Chat Dialog Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="compliance-chat-widget"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[360px] sm:w-[400px] h-[520px] bg-gradient-to-b from-[#111217] to-[#08080b] border border-zinc-800 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-50 flex flex-col overflow-hidden font-sans"
          >
            {/* Custom Aesthetic Grid Corner Lines */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-brand-red/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-brand-red/30 pointer-events-none" />

            {/* Chatbot Header */}
            <div className="bg-[#181920] border-b border-zinc-800 p-4 shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/35 flex items-center justify-center text-brand-red">
                  <Shield size={18} className="animate-pulse" />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-2.5 h-2.5 rounded-full border border-[#181920]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-white tracking-tight uppercase flex items-center gap-1.5">
                    ETECH <span className="text-brand-red">AI ADVOCATE</span>
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
                      Active Compliance Patrol
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-md hover:bg-white/5 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Compliance Banner */}
            <div className="bg-brand-red/5 border-b border-brand-red/15 py-1.5 px-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 select-none">
              <span className="flex items-center gap-1 text-brand-red font-bold">
                <Sparkles size={11} /> SL PDPA No. 9 READY
              </span>
              <span>AES-256 SESSION LOCK</span>
            </div>

            {/* Chat Area Scroll Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0b0e] custom-scrollbar scroll-smooth">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-md leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-brand-red/90 text-white rounded-tr-none border border-red-500/35'
                        : 'bg-[#14151b] text-zinc-200 rounded-tl-none border border-zinc-800'
                    }`}
                  >
                    {m.role === 'assistant' ? (
                      <div className="space-y-1">
                        {renderMessageContent(m.content)}
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                    <span className="block text-[8px] opacity-45 text-right mt-1.5 font-mono">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Chatbot Loading / Typing State */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#14151b] border border-zinc-800 max-w-[85%] rounded-2xl rounded-tl-none p-3 shadow-md flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      Compliance Audit Reasoning...
                    </span>
                  </div>
                </div>
              )}

              {/* Error Status Indicator */}
              {error && (
                <div className="flex justify-center p-2.5">
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-2.5 text-[11px] flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Interactive Preset FAQ Suggestions */}
            <div className="bg-[#0b0c10] border-t border-zinc-800/60 p-3 shrink-0">
              <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 px-1">
                {language === 'si' ? 'නිතර අසන ප්‍රශ්න තෝරන්න:' : 'Quick Questions:'}
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto custom-scrollbar">
                {suggestions.map((chip, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(chip.text)}
                    disabled={isLoading}
                    className="text-[10px] font-sans font-medium bg-zinc-900 hover:bg-brand-red/10 border border-zinc-800 hover:border-brand-red/40 text-stone-300 hover:text-white px-2.5 py-1 rounded-md transition-all cursor-pointer text-left whitespace-nowrap disabled:opacity-50"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Dock */}
            <div className="bg-[#121319] border-t border-zinc-800 p-3 shrink-0 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  language === 'si'
                    ? 'අනුකූලතා ගැටලු මෙහි ලියන්න...'
                    : 'Ask about CMMC, PDPA, security plans...'
                }
                disabled={isLoading}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-red/60 transition-all font-sans"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim()}
                className="bg-brand-red hover:bg-red-700 text-white p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-lg hover:shadow-red-900/30 disabled:opacity-40 disabled:hover:bg-brand-red"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
