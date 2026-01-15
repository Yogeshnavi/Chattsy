"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import Message from "./Message";
import MessageInput from "./MessageInput";
import api from "@/lib/api";

interface ChatWindowProps {
  activeUser: any;
  currentUserId: string;
  onBack?: () => void;
}

export default function ChatWindow({ activeUser, currentUserId, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socket = getSocket();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  let typingTimeout: any;

  useEffect(() => {
    if (!activeUser) return;

    const fetchMessages = async () => {
      const res = await api.get(`/messages/${activeUser._id}`);
      setMessages(res.data);
    };
    fetchMessages();

    const token = localStorage.getItem("token");
    socket.emit("auth", token);

    socket.on("receive-message", (msg: any) => {
         if (msg.sender._id === currentUserId) return;
      setMessages(prev => (prev.some(m => m._id === msg._id) ? prev : [...prev, msg]));
    });

    socket.on("typing", ({ from }) => {
      if (from === activeUser._id) {
        setIsTyping(true);
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => setIsTyping(false), 1500);
      }
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
    };
  }, [activeUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!text.trim() || !activeUser) return;

    socket.emit("send-message", { to: activeUser._id, content: text.trim() });

    // Optimistic render
    setMessages(prev => [
      ...prev,
      {
        _id: Date.now().toString(),
        sender: { _id: currentUserId, name: "You" },
        receiver: activeUser,
        content: text.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);

    setText("");
  };

  const handleTyping = (value: string) => {
    setText(value);
    if (activeUser) socket.emit("typing", { to: activeUser._id });
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-300 bg-green-500 text-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 flex-1">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm font-semibold"
            >
              ← Back
            </button>
          )}
          <div>
            <h2 className="text-base md:text-xl font-bold">{activeUser?.name}</h2>
            <p className="text-xs md:text-sm text-green-100">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 md:p-4 bg-gray-50 flex flex-col gap-2 md:gap-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-center">
            <p className="text-sm md:text-base">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <Message key={idx} message={msg} currentUserId={currentUserId} />
          ))
        )}
        {isTyping && (
          <div className="text-xs md:text-sm text-gray-500 italic flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput value={text} onChange={handleTyping} onSend={sendMessage} />
    </div>
  );
}
