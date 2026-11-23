import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { storageService } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Send, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

export const Messages: React.FC = () => {
  const { user, teenProfile } = useAuth();
  const { showToast } = useToast();
  const [conversations] = useState(storageService.getConversations());
  const [selectedConvId, setSelectedConvId] = useState('conv-1');
  const [messages, setMessages] = useState(storageService.getMessages('conv-1'));
  const [text, setText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = storageService.sendMessage(selectedConvId, {
      conversationId: selectedConvId,
      senderId: user?.id || 'user-teen-1',
      senderName: teenProfile?.displayName || user?.fullName || 'Aarav Sharma',
      senderRole: 'teen',
      text,
    });

    setMessages((prev) => [...prev, newMsg]);
    setText('');
    showToast('Message sent', 'info');
  };

  return (
    <div className="h-[78vh] flex flex-col md:flex-row gap-6">
      {/* Conversations list sidebar */}
      <Card className="w-full md:w-80 p-4 border-slate-200 flex flex-col overflow-y-auto flex-shrink-0">
        <h3 className="text-base font-bold text-slate-900 mb-3">Project Chats</h3>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setSelectedConvId(conv.id);
                setMessages(storageService.getMessages(conv.id));
              }}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedConvId === conv.id
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <img
                  src={conv.participantB.avatar}
                  alt={conv.participantB.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-xs font-bold truncate">{conv.participantB.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{conv.projectTitle}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Thread */}
      <Card className="flex-1 p-6 border-slate-200 flex flex-col justify-between">
        {/* Child Safety Banner */}
        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            <strong>Safety Notice:</strong> All messages are monitored. Never share bank passwords, personal contact numbers, or agree to off-platform payments.
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
          {messages.map((msg) => {
            const isMe = msg.senderRole === 'teen';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  <span className="text-[10px] block opacity-75 font-semibold mb-1">
                    {msg.senderName}
                  </span>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <Input
            placeholder="Type your message to the company..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" icon={<Send className="w-4 h-4" />}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};
