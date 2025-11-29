import React from 'react';
import { Pin } from 'lucide-react';

const MessageBubble = ({ message }) => {
  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%]`}>
        {!message.isOwn && (
          <p className="text-xs text-muted-foreground mb-1 px-3">
            {message.sender}
          </p>
        )}
        <div
          className={`p-3 rounded-lg ${
            message.isOwn
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          } ${message.pinned ? 'border-l-4 border-yellow-500' : ''}`}
        >
          {message.pinned && (
            <div className="flex items-center space-x-1 mb-2">
              <Pin className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-yellow-600 dark:text-yellow-400">Mensaje fijado</span>
            </div>
          )}
          <p className="text-sm">{message.content}</p>
          <p className={`text-xs mt-1 ${
            message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {message.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
