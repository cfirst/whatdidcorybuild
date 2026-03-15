"use client";

import { useState, useRef, useEffect } from "react";
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
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    setFocused(false);
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
    <main className="min-h-screen bg-[#2c2a24]">
      <nav className="flex justify-between items-center px-8 md:px-20 py-6 border-b border-[#3e3b33]">
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#c4b89a]">Cory Firstenberg</span>
        <Link href="/" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">
          Back to portfolio
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-16">
        <div className="mb-10">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#8a7d60] mb-3">Ask me anything</p>
          <h1 className="font-display text-[42px] font-bold text-[#e8dcc8] leading-none mb-3">Chat with Cory</h1>
          <p className="text-[14px] text-[#6b6455] leading-relaxed">Powered by Claude. Ask me about my work, approach, or what I am looking for next.</p>
        </div>

        <div className="relative mb-10">
          <div className="flex items-center bg-[#3a3830] rounded-full px-6">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask me about my career..."
              className="flex-1 py-4 bg-transparent border-none text-[15px] text-[#e8dcc8] placeholder-[#6b6455] focus:outline-none"
            />
          </div>

          {focused && messages.length === 0 && (
            <div ref={dropdownRef} className="mt-2 bg-[#3a3830] rounded-3xl py-2 overflow-hidden">
              <p className="text-[10px] tracking-[0.14em] uppercase text-[#6b6455] px-6 pt-2 pb-1">Suggested</p>
              {suggested.map((q) => (
                <button
                  key={q}
                  onMouseDown={() => sendMessage(q)}
                  className="w-full text-left px-6 py-3 text-[13px] text-[#c4b89a] hover:bg-[#444038] hover:text-[#e8dcc8] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={m.role === "user"
                ? "bg-[#8fba9a] text-[#1a2e1e] px-4 py-3 text-[13px] max-w-sm rounded-[18px] rounded-br-[2px]"
                : "bg-[#3a3830] text-[#c4b89a] px-4 py-3 text-[13px] max-w-sm rounded-[18px] rounded-bl-[2px] leading-relaxed"
              }>
                {m.content.split("\n").map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#3a3830] text-[#6b6455] px-4 py-3 text-[13px] rounded-[18px] rounded-bl-[2px]">Thinking...</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
