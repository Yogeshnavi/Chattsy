"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import Message from "./Message";
import MessageInput from "./MessageInput";
import api from "@/lib/api";

interface ChatWindowProps {
  activeUser: any;
  currentUserId: string;
}

export default function ChatWindow({ activeUser, currentUserId }: ChatWindowProps) {
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
    <div className="flex flex-col flex-1">
      <div className="p-4 bg-gray-100 border-b font-semibold">{activeUser.name}</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(m => (
          <Message key={m._id} message={m} currentUserId={currentUserId} />
        ))}

        {isTyping && (
          <div className="text-sm text-gray-500 italic">{activeUser.name} is typing...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput value={text} onChange={handleTyping} onSend={sendMessage} />
    </div>
  );
}
