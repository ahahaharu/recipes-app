import styled from '@emotion/styled';
import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '../../hooks/useChat';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Container, SectionTitle } from '../../components/ui/Layout';

const ChatLayout = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 800px;
`;

const MessagesArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 1rem;
`;

const MessageBubble = styled.div<{ $isMe: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.4;
  position: relative;
  word-wrap: break-word;

  align-self: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};

  background-color: ${(props) =>
    props.$isMe ? props.theme.colors.primary : 'white'};

  color: ${(props) => (props.$isMe ? 'white' : props.theme.colors.text.main)};

  border: ${(props) =>
    props.$isMe ? 'none' : `1px solid ${props.theme.colors.border}`};
`;

const MessageTime = styled.span<{ $isMe: boolean }>`
  display: block;
  font-size: 0.7rem;
  margin-top: 4px;
  opacity: 0.8;
  text-align: right;
  color: inherit;
`;

const InputArea = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Input = styled.input`
  flex-grow: 2;
  padding: 12px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const SendButton = styled(Button)`
  flex-grow: 1;
`;

export const Route = createFileRoute('/chat/')({
  component: ChatPage,
});

function ChatPage() {
  const { messages, status, sendMessage } = useChat('wss://ws.ifelse.io');

  const [inputText, setInputText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText);
    setInputText('');
  };

  const isConnected = status === 'connected';

  return (
    <ChatLayout>
      <SectionTitle>
        <h2>WebSocket чат</h2>
      </SectionTitle>

      <MessagesArea>
        {messages.length === 0 && (
          <div
            style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}
          >
            Сообщений нет...
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <MessageBubble key={msg.id} $isMe={isMe}>
              {msg.text}
              <MessageTime $isMe={isMe}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </MessageTime>
            </MessageBubble>
          );
        })}

        <div ref={messagesEndRef} />

        <InputArea onSubmit={handleSend}>
          <Input
            placeholder="Введите сообщение..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!isConnected}
          />
          <SendButton>Отправить</SendButton>
        </InputArea>
      </MessagesArea>
    </ChatLayout>
  );
}
