"use client";

import { authClient } from "@/lib/auth-client";
import { useCallback, useEffect, useState } from "react";

import CardMessage from "./CardMessage";
import Message from "@/types/Message";

const POLL_INTERVAL_MS = 4000;

export default function ChatMessages({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: session } =
    authClient.useSession();

  function normalizeMessages(
    data: Message[]
  ) {
    return data.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );
  }

  const fetchMessages = useCallback(
    async () => {
      try {
        const request = await fetch(
          "/api/messages"
        );

        if (!request.ok) return;

        const data = await request.json();

        setMessages(
          normalizeMessages(data)
        );
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  /*
    Chargement initial
  */
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /*
    Refresh après envoi
  */
  useEffect(() => {
    fetchMessages();
  }, [refreshKey, fetchMessages]);

  /*
    Polling automatique
  */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, POLL_INTERVAL_MS);

    return () =>
      clearInterval(interval);
  }, [fetchMessages]);

  /*
    Refetch quand retour onglet
  */
  useEffect(() => {
    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        "visible"
      ) {
        fetchMessages();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [fetchMessages]);

  if (messages.length === 0) {
    return (
      <div className="empty-state">
        Aucun message.
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.map((m) => (
        <CardMessage
          key={m._id}
          m={m}
          userId={session?.user.id}
        />
      ))}
    </div>
  );
}