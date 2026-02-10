import { useEffect, useRef, useState } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'server';
  timestamp: number;
}

export const useChat = (url: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<
    'connecting' | 'connected' | 'error' | 'closed'
  >('connecting');

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WS Connected');
      setStatus('connected');
    };

    socket.onmessage = (event) => {
      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: event.data,
        sender: 'server',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newMessage]);
    };

    socket.onerror = (error) => {
      console.error('WS Error:', error);
      setStatus('error');
    };

    socket.onclose = () => {
      console.log('WS Closed');
      setStatus('closed');
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (text: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(text);

      const myMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text,
        sender: 'me',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, myMessage]);
    } else {
      console.warn('WebSocket is not open');
    }
  };

  return { messages, status, sendMessage };
};
