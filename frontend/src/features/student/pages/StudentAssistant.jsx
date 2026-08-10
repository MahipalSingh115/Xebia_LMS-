import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Trash2,
  MoreVertical,
  BrainCircuit,
  User,
  Paperclip,
  Mic,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function StudentAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      name: "Lumina AI",
      time: "10:42 AM",
      text: "Welcome back! You were just looking at the **Introduction to Neural Networks** module. How would you like to proceed?",
      chips: [
        { label: "Ask anything", action: "ask_anything" },
        { label: "Summarize lesson", action: "summarize_lesson" },
        { label: "Quiz me", action: "quiz_me" },
        { label: "Generate notes", action: "generate_notes" },
      ],
    },
    {
      id: 2,
      sender: "user",
      name: "You",
      time: "10:45 AM",
      text: "Can you explain how a basic perceptron works in Python? I'm struggling with the activation function part.",
    },
    {
      id: 3,
      sender: "assistant",
      name: "Lumina AI",
      time: "10:46 AM",
      text: "Absolutely. A perceptron takes an input, multiplies it by a weight, adds a bias, and passes it through an activation function to determine the output. Here is a simple implementation using a step function as the activation function.",
      codeBlock: {
        language: "python",
        code: `import numpy as np

class Perceptron:
    def __init__(self, input_size, learning_rate=0.01):
        self.weights = np.zeros(input_size + 1)
        self.learning_rate = learning_rate

    def activation_fn(self, x):
        # Step activation function
        return 1 if x >= 0 else 0

    def predict(self, x):
        x = np.insert(x, 0, 1) # Insert bias unit
        weighted_sum = self.weights.T.dot(x)
        return self.activation_fn(weighted_sum)`,
      },
      textAfter: "The `activation_fn` here is a simple threshold. If the weighted sum is greater than or equal to 0, it fires (returns 1), otherwise it doesn't (returns 0). Does this clear things up?",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const newMsg = {
      id: messages.length + 1,
      sender: "user",
      name: "You",
      time: userTime,
      text: inputVal,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate AI typing response
    setTimeout(() => {
      const aiTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const responses = [
        {
          id: messages.length + 2,
          sender: "assistant",
          name: "Lumina AI",
          time: aiTime,
          text: "I am analyzing your question. That's a great observation! Let's break down the logic step by step. Would you like a code snippet or a conceptual explanation?",
        },
        {
          id: messages.length + 2,
          sender: "assistant",
          name: "Lumina AI",
          time: aiTime,
          text: "Based on your course materials in Module 3, we covered these structures. Here is a summary of the key takeaways to help with your studies.",
        },
      ];

      const chosen = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, chosen]);
    }, 1000);
  };

  const handleChipClick = (label) => {
    setInputVal(`I want to ${label.toLowerCase()}`);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: "assistant",
        name: "Lumina AI",
        time: "Now",
        text: "Chat cleared. Ask me any question related to your courses, neural networks, or programming assignments!",
      },
    ]);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-6 animate-fadeIn">
      {/* ── Page Header ── */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">AI Learning Companion</h2>
        <p className="text-[13px] text-slate-400 mt-1">
          Chat with your Lumina AI companion to ask questions, summarize lessons, or generate study notes.
        </p>
      </div>

      {/* ── Chat Card Container ── */}
      <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Header inside Card */}
        <header className="h-14 px-5 flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6C1D5F]/5 border border-[#6C1D5F]/15 flex items-center justify-center text-[#6C1D5F] shadow-sm">
              <BrainCircuit size={16} />
            </div>
            <div>
              <h2 className="font-bold text-[13px] text-slate-850">Lumina AI</h2>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Online • Context: Data Science 101</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
              title="Clear Chat"
            >
              <RotateCcw size={14} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent">
              <MoreVertical size={14} />
            </button>
          </div>
        </header>

        {/* Messages inside Card */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/20 hide-scrollbar"
        >
          {messages.map((msg) => {
            const isAI = msg.sender === "assistant";

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 items-start ${!isAI ? "justify-end" : ""}`}
              >
                {/* AI Logo Icon */}
                {isAI && (
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#6C1D5F] flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Sparkles size={12} />
                  </div>
                )}

                <div className={`flex flex-col gap-1 max-w-[85%] ${!isAI ? "items-end" : ""}`}>
                  <span className="text-[9.5px] font-bold text-slate-400 tracking-wide">
                    {msg.name} • {msg.time}
                  </span>

                  <div
                    className={`p-4 rounded-2xl shadow-sm text-[12.5px] leading-relaxed break-words ${
                      isAI
                        ? "bg-white border border-slate-200/80 text-slate-700 rounded-tl-sm"
                        : "bg-[#6C1D5F] text-white rounded-tr-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Render Code Block */}
                    {isAI && msg.codeBlock && (
                      <div className="rounded-xl overflow-hidden border border-slate-200/80 my-3 shadow-sm bg-slate-900">
                        <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-slate-800 bg-slate-955/80">
                          <span className="text-[9.5px] font-mono font-bold text-slate-450">
                            {msg.codeBlock.language}
                          </span>
                          <button
                            onClick={() => handleCopyCode(msg.codeBlock.code)}
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none text-[9.5px] font-bold"
                          >
                            {isCopied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                            {isCopied ? "Copied" : "Copy Code"}
                          </button>
                        </div>
                        <div className="p-3.5 overflow-x-auto text-[12px] font-mono text-slate-300">
                          <pre><code>{msg.codeBlock.code}</code></pre>
                        </div>
                      </div>
                    )}

                    {isAI && msg.textAfter && <p className="mt-3">{msg.textAfter}</p>}
                  </div>

                  {/* Quick Action Chips */}
                  {isAI && msg.chips && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {msg.chips.map((chip, i) => (
                        <button
                          key={i}
                          onClick={() => handleChipClick(chip.label)}
                          className="flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-600 transition-all cursor-pointer shadow-sm"
                        >
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Feedback actions */}
                  {isAI && !msg.chips && (
                    <div className="flex items-center gap-1 mt-0.5 text-slate-350">
                      <button className="p-1 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer bg-transparent border-none outline-none">
                        <ThumbsUp size={11} />
                      </button>
                      <button className="p-1 hover:text-rose-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer bg-transparent border-none outline-none">
                        <ThumbsDown size={11} />
                      </button>
                    </div>
                  )}
                </div>

                {/* User avatar placeholder */}
                {!isAI && (
                  <div className="w-7 h-7 rounded-lg bg-[#6C1D5F]/10 border border-[#6C1D5F]/15 text-[#6C1D5F] flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User size={12} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Input inside Card bottom */}
      <div className="p-4 bg-white border-t border-slate-200/50 shrink-0 rounded-b-3xl">
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 focus-within:ring-2 focus-within:ring-[#6C1D5F]/15 focus-within:border-[#6C1D5F]/40 transition-all flex items-end p-1.5 min-h-[44px]">
            {/* Left Attachment Button */}
            <button className="p-2 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-xl transition-colors shrink-0 cursor-pointer border-none bg-transparent">
              <Paperclip size={14} />
            </button>

            {/* Main Textarea */}
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything, request a summary, or quiz me..."
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-20 min-h-[30px] py-1.5 px-2 text-[12px] text-slate-700 placeholder:text-slate-400 focus:ring-0 outline-none"
            />

            {/* Voice & Send Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button className="p-2 text-slate-400 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border-none bg-transparent">
                <Mic size={14} />
              </button>
              <button
                onClick={handleSend}
                className="p-2 bg-[#6C1D5F] hover:bg-[#521347] text-white rounded-xl transition-colors shadow-sm flex items-center justify-center cursor-pointer border-none outline-none"
              >
                <Send size={12} />
              </button>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 font-bold">
            Lumina AI can make mistakes. Consider verifying important educational information.
          </p>
        </div>
      </div>
    </div>
  );
}
