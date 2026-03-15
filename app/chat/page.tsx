"use client";

import { useState } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggested = [
  "What are you most proud of?",
  "How do you approach prioritization?",
  "What is your AI experience?",
  "What are you looking for next?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.message }]);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-8 py-16">
        <div className="mb-12">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
            Back to portfolio
          </Link>
        </div>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Ask me anything</p>
          <h1 className="text-4xl font-bold tracking-tight">Chat with Cory</h1>
          <p className="text-gray-500 mt-3">Powered by Claude. Ask me about my work, approach, or what I am looking for next.</p>
        </div>

        {messages.length === 0 && (
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Suggested questions</p>
            <div className="flex flex-col gap-2">
              {suggested.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left px-4 py-3 border border-gray-200 text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 mb-8">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={m.role === "user"
                ? "bg-gray-900 text-white px-4 py-3 text-sm max-w-sm"
                : "bg-gray-50 text-gray-900 px-4 py-3 text-sm max-w-sm"
              }>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 text-gray-400 px-4 py-3 text-sm">Thinking...</div>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-gray-100 pt-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
