'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ExternalLink,
  RotateCcw,
  ShieldAlert,
  ChevronDown,
  Calendar,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { ChatMessage } from '@/lib/chatEngine';

export const HealthcareChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);

  const initialGreeting: ChatMessage = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `Hello! 👋 Welcome to **${CLINIC_INFO.name}** in Kalyan Nagar, Bengaluru.\n\nI am your AI Healthcare Concierge. How can I assist you today?\n\n• Browse our **Dental, Skin & Hair** treatments\n• Check **clinic timings & location**\n• Learn about our **doctors & fees**\n• Or **book an appointment** in under 2 minutes!`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickReplies: [
      'Clinic Timings & Location',
      'Our Doctors & Fees',
      'Hair Transplant & GFC',
      'HydraFacial & Skin Care',
      'Dental Implants & Aligners',
      'Book an Appointment',
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowWelcomeBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages]);

  // Hide welcome bubble after 12 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    setInputMessage('');

    // Append User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const botReply: ChatMessage = await response.json();

      setTimeout(() => {
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 450);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'bot',
            text: 'I am experiencing a slight delay in processing. For immediate assistance, please call our clinic desk at **+91 99005 17699** or launch our online booking engine.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionLink: {
              label: 'Book Online Appointment',
              url: '/booking',
            },
          },
        ]);
        setIsTyping(false);
      }, 400);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to format bold markdown and linebreaks
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lineIdx} className="block leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-brand-text">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
      {/* Welcome Callout Bubble (Visible before first click) */}
      {showWelcomeBubble && !isOpen && (
        <div className="pointer-events-auto mb-3 max-w-xs bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-2xl text-xs text-brand-text animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowWelcomeBubble(false)}
            aria-label="Close welcome bubble"
            className="absolute top-2 right-2 text-brand-muted hover:text-brand-text p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
              P
            </div>
            <div>
              <p className="font-bold text-brand-primary">Need help? Ask Aria!</p>
              <p className="text-brand-muted mt-0.5">
                Our AI Care Assistant can answer questions about doctor fees, hair & dental treatments, and clinic timings.
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="mt-2 text-brand-secondary font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Start conversation</span> &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT WINDOW MODAL */}
      {isOpen && (
        <div className="pointer-events-auto w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-brand-surface border border-brand-border rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-brand-primary text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-brand-secondary text-white flex items-center justify-center font-bold text-base shadow-inner">
                  P
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-brand-primary rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight text-white">PRALASH Care Assistant</h3>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span>AI Clinical Concierge</span> &bull; <span className="text-emerald-300">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Strict Medical Disclaimer Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/60 dark:border-amber-800/40 px-3.5 py-1.5 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-200 shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="leading-snug truncate">
              Informational only &bull; Non-diagnostic &bull; Not for acute emergencies
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-background/50">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1.5`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {isBot && (
                      <div className="w-7 h-7 rounded-xl bg-brand-secondary text-white flex items-center justify-center shrink-0 mb-1 text-xs font-bold shadow-xs">
                        P
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-[13px] shadow-xs ${
                        isBot
                          ? 'bg-brand-surface border border-brand-border text-brand-text rounded-bl-xs'
                          : 'bg-brand-primary text-white rounded-br-xs'
                      }`}
                    >
                      {renderFormattedText(msg.text)}

                      {/* Doctor Highlight Card if matched */}
                      {msg.doctorCard && (
                        <div className="mt-3 p-3 bg-brand-surface-low border border-brand-border rounded-xl flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-brand-border">
                            <Image
                              src={msg.doctorCard.image}
                              alt={msg.doctorCard.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-brand-text truncate">
                              {msg.doctorCard.name}
                            </h4>
                            <p className="text-[11px] text-brand-muted truncate">
                              {msg.doctorCard.title}
                            </p>
                            <p className="text-[11px] font-semibold text-brand-secondary mt-0.5">
                              Fee: ₹{msg.doctorCard.fee.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Action CTA Button */}
                      {msg.actionLink && (
                        <div className="mt-3 pt-2 border-t border-brand-border/60">
                          <Link
                            href={msg.actionLink.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-xl bg-brand-secondary text-white font-bold text-xs hover:bg-brand-secondary/90 transition-colors shadow-xs"
                          >
                            <span>{msg.actionLink.label}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-brand-muted px-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick Reply Suggestions */}
                  {isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-9 max-w-[95%]">
                      {msg.quickReplies.map((qr, qrIdx) => (
                        <button
                          key={qrIdx}
                          onClick={() => handleSend(qr)}
                          className="px-2.5 py-1 rounded-full bg-brand-surface border border-brand-border hover:border-brand-secondary hover:text-brand-secondary text-[11px] font-medium text-brand-text transition-all duration-150 shadow-xs hover:scale-102"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="w-7 h-7 rounded-xl bg-brand-secondary text-white flex items-center justify-center shrink-0 mb-1 text-xs font-bold">
                  P
                </div>
                <div className="bg-brand-surface border border-brand-border p-3 rounded-2xl rounded-bl-xs text-xs flex items-center gap-1.5 text-brand-muted shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-brand-secondary/60 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-brand-secondary/60 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-brand-secondary/60 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Reviewing clinical catalog...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts Bar (Visible if only welcome message exists) */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-brand-border/60 bg-brand-surface flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
              <span className="text-brand-muted shrink-0 text-[10px] uppercase font-bold tracking-wider">Suggested:</span>
              <button
                onClick={() => handleSend('Clinic timings and location')}
                className="px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border text-brand-text hover:bg-brand-surface-card shrink-0 transition-colors"
              >
                🕒 Timings
              </button>
              <button
                onClick={() => handleSend('How much is HydraFacial?')}
                className="px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border text-brand-text hover:bg-brand-surface-card shrink-0 transition-colors"
              >
                ✨ HydraFacial
              </button>
              <button
                onClick={() => handleSend('Tell me about Hair Transplant and GFC')}
                className="px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border text-brand-text hover:bg-brand-surface-card shrink-0 transition-colors"
              >
                💇 Hair GFC
              </button>
              <button
                onClick={() => handleSend('Dental implants and aligners')}
                className="px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border text-brand-text hover:bg-brand-surface-card shrink-0 transition-colors"
              >
                🦷 Dental
              </button>
            </div>
          )}

          {/* Input & Send Bar */}
          <div className="p-3 bg-brand-surface border-t border-brand-border shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about treatments, doctors, fees..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-brand-background border border-brand-border text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent placeholder:text-brand-muted"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send message"
                className="w-10 h-10 rounded-2xl bg-brand-primary text-white flex items-center justify-center disabled:opacity-40 hover:bg-brand-secondary transition-all shrink-0 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-brand-muted mt-2 px-1">
              <span>Powered by PRALASH Clinical Knowledge</span>
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="text-brand-secondary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Direct</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ROUNDED / CIRCULAR LAUNCHER BUTTON */}
      <div className="pointer-events-auto relative flex items-center group">
        {/* Hover Tooltip (visible when closed) */}
        {!isOpen && (
          <div className="absolute right-full mr-3.5 px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0 border border-white/10 hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Chat with PRALASH Care Assistant</span>
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-brand-primary" />
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close chat assistant' : 'Open AI Healthcare Chatbot'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-[0_10px_35px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/25 focus:outline-none focus:ring-4 focus:ring-brand-secondary/40 ${
            isOpen
              ? 'bg-brand-primary hover:bg-brand-secondary rotate-90'
              : 'bg-brand-primary hover:bg-brand-secondary hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform duration-300 -rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-white transition-transform group-hover:scale-110" />
              {/* Pulsing online status indicator ring */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-brand-primary animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-brand-primary" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
