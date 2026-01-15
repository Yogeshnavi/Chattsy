"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import UserList from "@/components/UserList";
import ChatWindow from "@/components/ChatWindow";

export default function Chat() {
  const [users, setUsers] = useState<any[]>([]);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Fetch users
    api.get("/users").then(res => setUsers(res.data));

    // Get currentUserId from localStorage
    const id = localStorage.getItem("userId") || "";
    setCurrentUserId(id);
  }, []);

  const handleUserSelect = (user: any) => {
    setActiveUser(user);
    setShowChat(true);
  };

  const handleBackToUsers = () => {
    setShowChat(false);
    setActiveUser(null);
  };

  if (!currentUserId) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile: Show either UserList or ChatWindow */}
      <div className="md:hidden w-full">
        {!showChat ? (
          <UserList users={users} activeUser={activeUser} onSelect={handleUserSelect} />
        ) : (
          <ChatWindow 
            activeUser={activeUser} 
            currentUserId={currentUserId}
            onBack={handleBackToUsers}
          />
        )}
      </div>

      {/* Desktop: Show both UserList and ChatWindow side by side */}
      <div className="hidden md:flex w-full">
        <UserList users={users} activeUser={activeUser} onSelect={handleUserSelect} />
        {activeUser ? (
          <ChatWindow 
            activeUser={activeUser} 
            currentUserId={currentUserId}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-white">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
