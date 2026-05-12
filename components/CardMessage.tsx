"use client";

import Message from "@/types/Message";
import { FaTrash } from "react-icons/fa";

export default function CardMessage({
  m,
  userId,
}: {
  m: Message;
  userId: string | undefined;
}) {
  const isOwn = m.userId === userId;

  async function deleteMessage(_id: string, userId: string | undefined) {
    const request = await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, userId }),
    });

    if (!request.ok) {
      const data = await request.json();
      console.log(data);
    }
  }

  function handleClick() {
    deleteMessage(m._id, userId);
  }

  return (
    <div
      className={`flex w-full ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`message-bubble ${
          isOwn ? "own-message" : "other-message"
        }`}
      >
        {!isOwn && (
          <p className="message-user">
            {m.userName}
          </p>
        )}

        <p className="message-content">
          {m.content}
        </p>

        <div className="message-footer">
          <span className="message-time">
            {new Date(m.createdAt).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isOwn && (
            <button
              onClick={handleClick}
              className="delete-button"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}