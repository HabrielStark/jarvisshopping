import { useState, useCallback, useEffect } from 'react';

export interface ChatMessage {
  sender: 'seller' | 'jarvis' | 'user';
  text: string;
  timestamp: Date;
  price?: number;
}

const defaultChatFlow: Omit<ChatMessage, 'timestamp'>[] = [
  { sender: 'seller', text: 'Hi! Listed price €399 for the Sony WH-1000XM5.' },
  { sender: 'jarvis', text: 'Could you do €330? I see similar listings for less.' },
  { sender: 'seller', text: 'I can discount to €349, that\'s my best offer.' },
  { sender: 'jarvis', text: 'How about €319 if I add free shipping?' },
  { sender: 'seller', text: 'Deal! €319 with free shipping included.' },
];

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const startChat = useCallback((productName: string, startPrice: number, targetPrice: number) => {
    setMessages([]);
    setCurrentIndex(0);
    setIsActive(true);
    setIsCompleted(false);
    setFinalPrice(null);
    
    // Customize chat flow based on product
    const customFlow = defaultChatFlow.map(msg => ({
      ...msg,
      text: msg.text.replace('€399', `€${startPrice}`).replace('€319', `€${targetPrice}`)
    }));
    
    // Start the conversation
    setMessages([{
      sender: customFlow[0].sender,
      text: customFlow[0].text,
      timestamp: new Date()
    }]);
    
    setCurrentIndex(1);
  }, []);

  const stopChat = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setCurrentIndex(0);
    setIsActive(false);
    setIsCompleted(false);
    setFinalPrice(null);
  }, []);

  // Auto-progress chat messages
  useEffect(() => {
    if (!isActive || currentIndex >= defaultChatFlow.length) {
      if (currentIndex >= defaultChatFlow.length && isActive) {
        setIsActive(false);
        setIsCompleted(true);
        // Extract final price from last message
        const lastMessage = defaultChatFlow[defaultChatFlow.length - 1];
        const priceMatch = lastMessage.text.match(/€(\d+)/);
        if (priceMatch) {
          setFinalPrice(parseInt(priceMatch[1]));
        }
      }
      return;
    }

    const timer = setTimeout(() => {
      const nextMessage = defaultChatFlow[currentIndex];
      setMessages(prev => [...prev, {
        ...nextMessage,
        timestamp: new Date()
      }]);
      setCurrentIndex(prev => prev + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentIndex, isActive]);

  const addMessage = useCallback((message: Omit<ChatMessage, 'timestamp'>) => {
    setMessages(prev => [...prev, {
      ...message,
      timestamp: new Date()
    }]);
  }, []);

  return {
    messages,
    isActive,
    isCompleted,
    finalPrice,
    startChat,
    stopChat,
    resetChat,
    addMessage
  };
}; 