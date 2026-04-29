'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you with your property tax appeal today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to generate a reply right now.');
      }

      setMessages([...newMessages, { text: payload.reply, sender: 'bot' }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          text:
            error instanceof Error
              ? error.message
              : 'Unable to generate a reply right now.',
          sender: 'bot',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[rgba(255,251,245,0.95)] text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] shadow-[0_18px_45px_rgba(65,50,34,0.12)] hover:-translate-y-0.5"
        aria-label="Open assistant"
      >
        AI
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[rgba(255,252,247,0.97)] shadow-[0_30px_60px_rgba(65,50,34,0.16)]">
          <div className="border-b border-[var(--line)] bg-[rgba(250,244,235,0.95)] p-4 text-[var(--foreground)]">
            <h3 className="font-semibold">AI Assistant</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block max-w-xs rounded-2xl p-3 text-sm leading-6 ${
                    msg.sender === 'user'
                      ? 'bg-[var(--foreground)] text-[#fffdf8]'
                      : 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="mb-3">
                <div className="inline-block max-w-xs rounded-2xl bg-[var(--accent-soft)] p-3 text-sm leading-6 text-[var(--foreground)]">
                  Thinking...
                </div>
              </div>
            ) : null}
          </div>
          <div className="border-t border-[var(--line)] p-4">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="field rounded-r-none"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="rounded-r-2xl bg-[var(--foreground)] px-4 py-2 text-[#fffdf8] disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
