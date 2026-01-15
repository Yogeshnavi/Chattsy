"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import UserList from "@/components/UserList";
import ChatWindow from "@/components/ChatWindow";

export default function Chat() {
  const [users, setUsers] = useState<any[]>([]);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    // Fetch users
    api.get("/users").then(res => setUsers(res.data));

    // Get currentUserId from localStorage
    const id = localStorage.getItem("userId") || "";
    setCurrentUserId(id);
  }, []);

  if (!currentUserId) return <div>Loading...</div>; // optional

  return (
    <div className="flex h-screen bg-gray-200 font-sans">
      <UserList users={users} activeUser={activeUser} onSelect={setActiveUser} />
      {activeUser ? (
        <ChatWindow activeUser={activeUser} currentUserId={currentUserId} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a user to start chatting
        </div>
      )}
    </div>
  );
}
