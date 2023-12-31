'use client';

import { Message } from '@prisma/client';
import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { curry, find } from 'lodash';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messagesHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
      axios.post(`/api/conversations/${conversationId}/seen`);
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messagesHandler);
    pusherClient.bind('messages:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messagesHandler);
      pusherClient.unbind('messages:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
