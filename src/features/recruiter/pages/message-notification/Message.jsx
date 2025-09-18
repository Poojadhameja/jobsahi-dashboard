import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  LuSearch,
  LuChevronLeft,
  LuPhone,
  LuEllipsis,
  LuPaperclip,
  LuSmile,
  LuSend,
} from "react-icons/lu";

const people = [
  {
    id: 1,
    name: "Yashu Mukhija",
    role: "Electrician Apprentice",
    last: "Hello",
    time: "Fri",
    initial: "Y",
    color: "bg-[#5B9821]",
  },
  {
    id: 2,
    name: "Pakhi Parekh",
    role: "Electrician Apprentice",
    last: "Hello",
    time: "1 Hour Ago",
    initial: "P",
    color: "bg-[#4D7C0F]",
  },
  { 
    id: 3,
    name: "Pakhi Parekh", 
    role: "Electrician Apprentice", 
    last: "Hello", 
    time: "1 Hour Ago", 
    initial: "P", 
    color: "bg-[#4D7C0F]" 
  },
  { 
    id: 4, 
    name: "Pakhi Parekh", 
    role: "Electrician Apprentice", 
    last: "Hello", 
    time: "1 Hour Ago", 
    initial: "P", 
    color: "bg-[#4D7C0F]" 
  },
  {
    id: 5, 
    name: "Pakhi Parekh", 
    role: "Electrician Apprentice", 
    last: "Hello", 
    time: "1 Hour Ago", 
    initial: "P", 
    color: "bg-[#4D7C0F]" 
  },
];

const demoThread = [
  { id: "m1", by: "them", text: "Good Morning!", at: "10:30 AM" },
  {
    id: "m2",
    by: "them",
    text: "Hello, I submitted my application for the Electrician Apprentice position",
    at: "10:30 AM",
  },
  { id: "m3", by: "me", text: "Good Morning!", at: "10:30 AM" },
  {
    id: "m4",
    by: "me",
    text: "Thank you for your application.\nWe will review it and get back to you soon.",
    at: "10:30 AM",
  },
  {
    id: "m5",
    by: "them",
    text: "Thank you for considering my application. I look forward to hearing from you.",
    at: "10:30 AM",
  },
];

function Avatar({ initial, className = "" }) {
  return (
    <div
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white ${className}`}
    >
      <span className="font-semibold">{initial}</span>
    </div>
  );
}

export default function MessagesCenter() {
  const [selectedId, setSelectedId] = useState(people[0].id);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState(demoThread);
  const scrollRef = useRef(null);

  const selected = useMemo(
    () => people.find((p) => p.id === selectedId) || people[0],
    [selectedId]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread, selectedId]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setThread((t) => [...t, { id: crypto.randomUUID(), by: "me", text, at: "now" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Main content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Conversation list */}
          <section className="lg:col-span-2 rounded-xl border border-[#2B6CB0] p-3">
            <div className="relative mb-3">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B9821]"
              />
            </div>

            <div className="divide-y">
              {people.map((p) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full text-left`}
                  >
                    <div
                      className={`flex items-start justify-between gap-3 px-3 py-4 ${
                        active ? "bg-gray-100 rounded-md" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <Avatar initial={p.initial} className={`${p.color}`} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p
                              className={`truncate font-semibold ${
                                active ? "text-[#5B9821]" : "text-slate-800"
                              }`}
                            >
                              {p.name}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">{p.role}</p>
                          <p className="text-sm text-gray-400 truncate">
                            {p.last}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 shrink-0">{p.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Right: Chat thread */}
          <section className="lg:col-span-3 rounded-xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <LuChevronLeft className="text-gray-600" />
                </button>
                <Avatar initial={selected.initial} className={selected.color} />
                <div>
                  <p className="font-semibold text-slate-800 leading-5">
                    {selected.name}
                  </p>
                  <p className="text-sm text-gray-500 -mt-0.5">
                    {selected.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <LuPhone />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <LuEllipsis />
                </button>

                {/* Templates pane */}
                <div className="ml-3 w-40 border rounded-md text-right">
                  <button className="w-full h-full px-3 py-2 text-gray-600">
                    Use Templates
                  </button>
                </div>
              </div>
            </div>

            {/* Day label */}
            <div className="py-2 text-center text-xs text-gray-400">Today</div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[46vh] overflow-y-auto px-4 pb-4 space-y-3">
              {thread.map((m) => {
                const mine = m.by === "me";
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"} items-end`}
                  >
                    {!mine && (
                      <Avatar
                        initial={selected.initial}
                        className={`mr-2 ${selected.color}`}
                      />
                    )}

                    <div className={`max-w-[70%]`}>
                      <div
                        className={`whitespace-pre-line rounded-2xl px-4 py-2 text-[15px] leading-relaxed shadow-sm
                        ${
                          mine
                            ? "bg-[#1F4961] text-white rounded-tr-md"
                            : "bg-gray-100 text-gray-800 rounded-tl-md"
                        }`}
                      >
                        {m.text}
                      </div>
                      <div
                        className={`mt-1 text-[11px] ${
                          mine ? "text-right text-gray-400" : "text-gray-400"
                        }`}
                      >
                        {m.at}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="border-t px-4 py-3">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md hover:bg-gray-100" title="Attach">
                  <LuPaperclip className="text-[#1F4961]" />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-100" title="Emoji">
                  <LuSmile className="text-[#1F4961]" />
                </button>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type something..."
                  className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5B9821]"
                />

                <button
                  onClick={send}
                  className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[#1F4961] text-white hover:opacity-95"
                  title="Send"
                >
                  <LuSend />
                </button>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}
