'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Send,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Calendar,
  Copy,
  Check,
  Bot,
  User,
  Star,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  ChevronDown,
  Sparkle,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { ChatMessage } from '@/lib/chatEngine';

export const HealthcareChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `Hello! 👋 Welcome to **${CLINIC_INFO.name}** in Kalyan Nagar, Bengaluru.\n\nI am **Aria**, your AI Healthcare Concierge. How can I assist your health journey today?\n\n• Browse **Dental, Skin & Hair** treatments\n• Check **clinic timings & location**\n• Inquire about our **specialists & consultation fees**\n• Or **book an appointment** in under 60 seconds!`,
    timestamp: 'Just now',
    quickReplies: [
      '🕒 Timings & Location',
      '👨‍⚕️ Doctors & Fees',
      '💇 Hair Transplant & GFC',
      '✨ HydraFacial & Skin Care',
      '🦷 Dental Implants & Braces',
      '📅 Book an Appointment',
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);



  const scrollToBottom = useCallback((delay = 60) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, delay);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(50);
      setShowWelcomeBubble(false);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom(50);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, scrollToBottom]);

  // Auto-dismiss floating teaser after 14s if unclicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeBubble(false);
    }, 14000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyMessage = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const cleanText = text.replace(/\*\*/g, '');
      navigator.clipboard.writeText(cleanText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

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

  // Helper to format bold markdown, bullet points and linebreaks
  const renderFormattedText = (text: string, isUserMessage = false) => {
    return text.split('\n').map((line, lineIdx) => {
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
      const lineContent = isBullet ? trimmed.replace(/^[•-]\s*/, '') : line;

      const parts = lineContent.split(/(\*\*.*?\*\*)/g);
      const parsedSpans = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className={isUserMessage ? 'font-bold text-white' : 'font-semibold text-brand-text'}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 mt-1.5 first:mt-0">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isUserMessage ? 'bg-teal-200' : 'bg-brand-secondary'}`} />
            <span className={`flex-1 leading-relaxed ${isUserMessage ? 'text-white' : 'text-brand-text/90'}`}>{parsedSpans}</span>
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <span key={lineIdx} className={`block leading-relaxed ${isUserMessage ? 'text-white font-medium' : 'text-brand-text/90'}`}>
          {parsedSpans}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end pointer-events-none">
      {/* FLOATING TEASER / WELCOME CALLOUT (Desktop & Tablet only to avoid obstructing phone screens) */}
      {showWelcomeBubble && !isOpen && (
        <div className="hidden sm:block pointer-events-auto mb-3 max-w-[320px] bg-brand-surface/95 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] text-xs text-brand-text animate-in fade-in slide-in-from-bottom-3 duration-300 relative group">
          <button
            onClick={() => setShowWelcomeBubble(false)}
            aria-label="Close welcome bubble"
            className="absolute top-2.5 right-2.5 text-brand-muted hover:text-brand-text p-1 rounded-full hover:bg-brand-surface-container transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-teal-400 text-white flex items-center justify-center shadow-md p-0.5">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-brand-surface rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-brand-surface rounded-full" />
            </div>
            <div className="flex-1 pr-3">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-brand-primary text-xs tracking-tight">Need Help? Ask Aria</p>
                <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold rounded-full">
                  24/7 AI
                </span>
              </div>
              <p className="text-brand-muted mt-1 leading-snug text-[11px]">
                Instant answers on doctor consultation fees, hair & skin packages, or book visits in 60s!
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="mt-2 text-brand-secondary font-bold text-xs hover:text-brand-primary inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Chat with Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT WINDOW MODAL */}
      {isOpen && (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[410px] h-[min(540px,calc(100dvh-7.5rem))] max-h-[calc(100dvh-7.5rem)] bg-brand-surface/95 backdrop-blur-2xl border border-brand-border/80 rounded-3xl sm:rounded-[2rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden mb-2 sm:mb-3 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-brand-primary via-[#0f2b48] to-brand-secondary text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0 shadow-sm overflow-hidden">
            {/* Subtle ambient light glow on header */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/10 p-0.5 backdrop-blur-md shadow-md border border-white/20 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/favicon.jpg"
                    alt="PRALASH"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Active pulse aura */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-brand-primary rounded-full animate-ping" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-brand-primary rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight text-white leading-tight">Aria Concierge</h3>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <p className="text-[11px] text-slate-200 font-medium tracking-wide">
                    Online &bull; <span>PRALASH Clinic Bengaluru</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-background/60">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              const isCopied = copiedId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1 group`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {isBot && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary text-white flex items-center justify-center shrink-0 mb-1 text-xs font-bold shadow-xs">
                        <Sparkle className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`relative p-3.5 rounded-2xl text-xs sm:text-[13px] shadow-sm transition-all ${isBot
                          ? 'bg-brand-surface border border-brand-border text-brand-text rounded-bl-xs'
                          : 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-br-xs shadow-brand-primary/20'
                        }`}
                    >
                      {/* Message Content */}
                      <div>{renderFormattedText(msg.text, !isBot)}</div>

                      {/* Doctor Highlight Card if matched */}
                      {msg.doctorCard && (
                        <div className="mt-3 p-3 bg-brand-surface-low border border-brand-border rounded-2xl flex items-center gap-3 shadow-xs hover:border-brand-secondary/50 transition-colors">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 border-brand-secondary/40">
                            <Image
                              src={msg.doctorCard.image}
                              alt={msg.doctorCard.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <h4 className="font-bold text-xs text-brand-text truncate">
                                {msg.doctorCard.name}
                              </h4>
                              <span className="text-[10px] text-amber-500 flex items-center">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="ml-0.5 font-bold">4.9</span>
                              </span>
                            </div>
                            <p className="text-[11px] text-brand-muted truncate">
                              {msg.doctorCard.title}
                            </p>
                            <div className="flex items-center justify-between mt-1 pt-1 border-t border-brand-border/60">
                              <span className="text-[10px] font-semibold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full">
                                Consultation: ₹{msg.doctorCard.fee.toLocaleString('en-IN')}
                              </span>
                              <Link
                                href="/booking"
                                onClick={() => setIsOpen(false)}
                                className="text-[10px] font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-0.5 underline"
                              >
                                Book now &rarr;
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action CTA Button */}
                      {msg.actionLink && (
                        <div className="mt-3 pt-2.5 border-t border-brand-border/60">
                          <Link
                            href={msg.actionLink.url}
                            onClick={() => setIsOpen(false)}
                            className="group/cta inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-brand-secondary to-teal-600 text-white font-bold text-xs hover:shadow-md transition-all shadow-xs"
                          >
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{msg.actionLink.label}</span>
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Bottom Metadata */}
                  <div className="flex items-center gap-2 px-1 text-[10px] text-brand-muted">
                    <span>{msg.timestamp}</span>
                    {isBot && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        title="Copy message"
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-brand-text flex items-center gap-0.5"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500 text-[9px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[9px]">Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Dynamic Quick Reply Pills */}
                  {isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5 pl-9 max-w-[95%]">
                      {msg.quickReplies.map((qr, qrIdx) => (
                        <button
                          key={qrIdx}
                          onClick={() => handleSend(qr)}
                          className="px-3 py-1 rounded-full bg-brand-surface border border-brand-border hover:border-brand-secondary hover:text-brand-secondary hover:bg-brand-secondary/5 text-[11px] font-medium text-brand-text transition-all duration-150 shadow-xs hover:-translate-y-0.5 cursor-pointer active:scale-95"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Futuristic Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 max-w-[80%] animate-in fade-in duration-200">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary text-white flex items-center justify-center shrink-0 mb-1 text-xs font-bold">
                  <Sparkle className="w-3.5 h-3.5" />
                </div>
                <div className="bg-brand-surface border border-brand-border px-3.5 py-2.5 rounded-2xl rounded-bl-xs text-xs flex items-center gap-2 text-brand-muted shadow-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <span className="text-[11px] text-brand-muted tracking-tight font-medium">
                    Aria is reviewing clinic catalog...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts Bar (when conversation has only initial greeting) */}
          {messages.length === 1 && (
            <div className="px-3.5 py-2 border-t border-brand-border/60 bg-brand-surface/80 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
              <span className="text-brand-muted shrink-0 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Quick:
              </span>
              <button
                onClick={() => handleSend('Clinic timings and location')}
                className="px-2.5 py-1 rounded-full bg-brand-surface-low border border-brand-border text-brand-text hover:border-brand-secondary hover:text-brand-secondary shrink-0 transition-all font-medium text-[11px]"
              >
                🕒 Timings
              </button>
              <button
                onClick={() => handleSend('How much is HydraFacial?')}
                className="px-2.5 py-1 rounded-full bg-brand-surface-low border border-brand-border text-brand-text hover:border-brand-secondary hover:text-brand-secondary shrink-0 transition-all font-medium text-[11px]"
              >
                ✨ HydraFacial
              </button>
              <button
                onClick={() => handleSend('Tell me about Hair Transplant and GFC')}
                className="px-2.5 py-1 rounded-full bg-brand-surface-low border border-brand-border text-brand-text hover:border-brand-secondary hover:text-brand-secondary shrink-0 transition-all font-medium text-[11px]"
              >
                💇 Hair GFC
              </button>
              <button
                onClick={() => handleSend('Dental implants and aligners')}
                className="px-2.5 py-1 rounded-full bg-brand-surface-low border border-brand-border text-brand-text hover:border-brand-secondary hover:text-brand-secondary shrink-0 transition-all font-medium text-[11px]"
              >
                🦷 Dental
              </button>
              <button
                onClick={() => handleSend('Who are your doctors and what are the fees?')}
                className="px-2.5 py-1 rounded-full bg-brand-surface-low border border-brand-border text-brand-text hover:border-brand-secondary hover:text-brand-secondary shrink-0 transition-all font-medium text-[11px]"
              >
                👨‍⚕️ Doctors
              </button>
            </div>
          )}

          {/* Frosted Input & Send Dock */}
          <div className="p-3 bg-brand-surface border-t border-brand-border shrink-0">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Aria about doctors, fees, treatments..."
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-brand-background border border-brand-border/80 text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary placeholder:text-brand-muted/70 transition-all shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send message"
                className="absolute right-1.5 w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-primary to-brand-secondary text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-brand-muted mt-2 px-1">
              <span className="flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>PRALASH AI Clinical Concierge</span>
              </span>
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="text-brand-secondary font-bold hover:underline inline-flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Instant Booking</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING LAUNCHER BUTTON WITH GLOWING AMBIENT AURA */}
      <div className="pointer-events-auto relative flex items-center group">
        {/* Pulsing Ambient Glow Halo */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-500/30 via-sky-500/30 to-emerald-500/30 blur-lg animate-pulse pointer-events-none group-hover:scale-115 transition-transform duration-500" />

        {/* Hover Tooltip (visible when closed) */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-3.5 py-2 rounded-2xl bg-brand-primary/95 text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0 border border-white/10 hidden sm:flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Chat with Aria AI Assistant</span>
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-brand-primary/95" />
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close chat assistant' : 'Open AI Healthcare Chatbot'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 hover:scale-108 active:scale-95 border-2 border-white/25 focus:outline-none focus:ring-4 focus:ring-brand-secondary/40 cursor-pointer overflow-hidden ${isOpen
              ? 'bg-gradient-to-br from-brand-primary to-slate-900 rotate-90'
              : 'bg-gradient-to-br from-brand-primary via-[#0f2b48] to-brand-secondary hover:shadow-[0_15px_45px_rgba(13,148,136,0.4)]'
            }`}
        >
          {/* Glass shine reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform duration-300 -rotate-90 relative z-10" />
          ) : (
            <div className="relative flex items-center justify-center z-10">
              <Bot className="w-7 h-7 text-white transition-transform group-hover:scale-110 drop-shadow-sm" />
              {/* Online beacon indicator ring */}
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-brand-primary animate-ping" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-brand-primary shadow-xs" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
