"use client";

import { useState, useSyncExternalStore, type SubmitEvent } from "react";

const STORAGE_KEY = "visitor-name";

// 稱呼存在瀏覽器裡，下次來不用再問；瀏覽器不給存時就只記在這次瀏覽
let memoryName: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getName(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryName;
  } catch {
    return memoryName;
  }
}

function setName(name: string | null) {
  memoryName = name;
  try {
    if (name === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, name);
  } catch {}
  listeners.forEach((listener) => listener());
}

// 伺服器上還不知道訪客是誰，先回傳 undefined，不顯示視窗
const getServerName = () => undefined;

export default function WelcomeGreeting() {
  const name = useSyncExternalStore(subscribe, getName, getServerName);
  const [input, setInput] = useState("");

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) setName(trimmed);
  }

  return (
    <>
      {name && (
        <p className="mb-4 font-sign text-xl font-bold tracking-widest text-retro-green">
          歡迎 <span className="text-retro-red">{name}</span> 來坐！
          <button
            type="button"
            onClick={() => {
              setInput(name);
              setName(null);
            }}
            className="ml-2 align-middle text-xs font-normal tracking-wider text-ink-soft underline hover:text-retro-red"
          >
            換稱呼
          </button>
        </p>
      )}

      {name === null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4">
          <form
            onSubmit={submit}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            className="relative w-full max-w-sm border-4 border-ink bg-paper px-6 pb-6 pt-10 text-center shadow-[8px_8px_0_var(--ink)]"
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border-2 border-ink bg-retro-yellow px-5 py-1 font-sign text-sm font-bold tracking-[0.4em]">
              歡迎光臨
            </span>
            <h2 id="welcome-title" className="font-sign text-2xl font-black tracking-widest">
              請問要按怎稱呼你？
            </h2>
            <p className="mt-2 text-ink-soft">老闆娘想記住你的名字</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={12}
              placeholder="例如：阿明、小美"
              aria-label="你的稱呼"
              autoFocus
              className="mt-5 w-full border-2 border-ink bg-white px-4 py-3 text-center text-lg outline-none focus:border-retro-red"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="mt-4 w-full rounded border-2 border-ink bg-retro-red px-6 py-3 font-sign text-lg font-bold tracking-widest text-paper shadow-[4px_4px_0_var(--ink)] transition-transform enabled:hover:-translate-y-1 disabled:opacity-60"
            >
              入來坐
            </button>
          </form>
        </div>
      )}
    </>
  );
}
