import { useEffect, useRef } from "react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={ref} className={`chat-message ${isUser ? "user" : "assistant"}`}>
      <div className="message-avatar">
        {isUser ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        )}
      </div>
      <div className="message-content">
        <span className="message-label">{isUser ? "You" : "Tommy's AI"}</span>
        <p>{message.content}</p>
      </div>
    </div>
  );
}
