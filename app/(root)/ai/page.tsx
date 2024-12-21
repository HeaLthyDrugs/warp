'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Brain,
  Sparkles,
  BookOpen,
  Code,
  Search,
  Loader2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { getGeminiResponse } from '@/app/services/ai';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  category?: 'standup' | 'learning' | 'general';
  loading?: boolean;
}

const QUICK_PROMPTS = [
  {
    icon: <Brain className="w-4 h-4 mr-2" />,
    label: "Daily Standup",
    prompt: "Generate my daily standup summary",
    className: "bg-white hover:bg-[#f0e6ff] text-[#9f7aea]"
  },
  {
    icon: <BookOpen className="w-4 h-4 mr-2" />,
    label: "Learning Path",
    prompt: "Suggest a learning path for becoming a better developer",
    className: "bg-white hover:bg-[#fff0e6] text-[#f6ad55]"
  },
  {
    icon: <Code className="w-4 h-4 mr-2" />,
    label: "Code Review",
    prompt: "Help me review my code and suggest improvements",
    className: "bg-white hover:bg-[#e6fff0] text-[#48bb78]"
  },
  {
    icon: <Search className="w-4 h-4 mr-2" />,
    label: "Debug Help",
    prompt: "Help me debug an issue I'm facing with my code",
    className: "bg-white hover:bg-[#ffe6e6] text-[#f56565]"
  }
];

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user'
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Thinking...",
      type: 'ai',
      loading: true
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input);
      
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessage.id 
          ? {
              ...msg,
              content: response,
              loading: false
            }
          : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessage.id 
          ? {
              ...msg,
              content: "Sorry, I encountered an error. Please try again.",
              loading: false
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      {/* Updated Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Image 
            src="/icons/google-gemini-icon.svg" 
            alt="Gemini AI" 
            width={32} 
            height={32}
            className="rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-500">Chat with Gemini AI</h2>
        </div>
        <p className="text-gray-500">
          Powered by Google's most capable AI model. Ask anything about coding, development, or general questions!
        </p>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Prompts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_PROMPTS.map((prompt, index) => (
            <Button 
              key={index}
              variant="outline"
              className={cn("w-full justify-start", prompt.className)}
              onClick={() => setInput(prompt.prompt)}
            >
              {prompt.icon}
              {prompt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Container - update the empty state */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 text-center"
          >
            <div className="max-w-md mx-auto">
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-[#9f7aea]" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Start a Conversation with Gemini
              </h3>
              <p className="text-gray-500 mb-4">
                Ask about code reviews, debugging help, learning resources, or anything else!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing chat messages container */}
      <Card className="mb-4 rounded-xl shadow-lg bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4 min-h-[60vh] max-h-[60vh] overflow-y-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "mb-4 flex",
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  "flex items-start gap-3 max-w-[80%] rounded-2xl p-4",
                  message.type === 'user' 
                    ? 'bg-[#9f7aea] text-white ml-auto' 
                    : 'bg-white shadow-md'
                )}>
                  {message.type === 'ai' && (
                    <div className="bg-white p-1 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/icons/S.png"
                        alt="AI Assistant"
                        width={28}
                        height={28}
                        className="object-contain rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm",
                      message.type === 'user' ? 'text-white' : 'text-gray-800'
                    )}>
                      {message.loading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-pulse">Thinking</span>
                          <span className="animate-bounce">...</span>
                        </span>
                      ) : (
                        message.content
                      )}
                    </p>
                    {message.category && (
                      <div className="mt-2">
                        <Badge className={cn(
                          "text-xs",
                          message.category === 'standup' 
                            ? 'bg-[#f0e6ff] text-[#9f7aea]'
                            : 'bg-[#fff0e6] text-[#f6ad55]'
                        )}>
                          {message.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                  {message.type === 'user' && (
                    <div className="bg-white/20 p-2 rounded-full">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Enhanced Input Area */}
      <Card className="rounded-xl shadow-lg bg-white">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Gemini anything about coding, development, or general questions..."
              className="flex-1 bg-transparent border-none focus:ring-0"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend}
              className="bg-[#9f7aea] hover:bg-[#8b5cf6] text-white"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Powered by Google's Gemini AI
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatPage;