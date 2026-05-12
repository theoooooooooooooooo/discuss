"use client";

import { useState } from "react";

export default function ChatInput({
  onMessageSent,
}: {
  onMessageSent: () => void;
}) {
  const [content, setContent] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!content.trim()) return;

    const request = await fetch(
      "/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      }
    );

    if (request.ok) {
      setContent("");

      /*
        Refresh immédiat
      */
      onMessageSent();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="chat-form"
    >
      <input
        type="text"
        placeholder="Envoyer un message..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="chat-input"
      />

      <button
        type="submit"
        className="send-button"
      >
        Envoyer
      </button>
    </form>
  );
}