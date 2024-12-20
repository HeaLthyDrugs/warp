'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Brain,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  category?: 'standup' | 'learning' | 'general';
}

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your request...",
        type: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-26 font-semibold text-gray-500">Ask me anything</h2>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant="outline"
          className="bg-white hover:bg-[#f0e6ff] text-[#9f7aea]"
          onClick={() => setInput("Generate my daily standup summary")}
        >
          <Brain className="w-4 h-4 mr-2" />
          Daily Standup
        </Button>
        <Button 
          variant="outline"
          className="bg-white hover:bg-[#fff0e6] text-[#f6ad55]"
          onClick={() => setInput("Suggest learning resources for my skill level")}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Learning Resources
        </Button>
      </div>

      {/* Chat Container */}
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
                      {message.content}
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

      {/* Input Area */}
      <Card className="rounded-xl shadow-lg bg-white">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none focus:ring-0"
            />
            <Button 
              onClick={handleSend}
              className="bg-[#9f7aea] hover:bg-[#8b5cf6] text-white"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Floating Suggestion */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 text-center text-muted-foreground"
          >
            <Sparkles className="w-5 h-5 mx-auto mb-2 text-[#f6ad55]" />
            <p>Try asking for a daily standup summary or learning recommendations!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatPage;