"use client";

import { useState } from "react";

import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import LogoutButton from "@/components/LogoutButton";

export default function ChatPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <div>
          <h1 className="logo">Discuss</h1>
          <p className="beta-text">
            Community Beta
          </p>
        </div>

        <div className="sidebar-footer">
          <LogoutButton />
        </div>
      </aside>

      <main className="chat-container">
        <header className="chat-header">
          <span># fil-public</span>
        </header>

        <section className="messages-container">
          <ChatMessages refreshKey={refreshKey} />
        </section>

        <footer className="chat-input-container">
          <ChatInput
            onMessageSent={() =>
              setRefreshKey((prev) => prev + 1)
            }
          />
        </footer>
      </main>
    </div>
  );
}