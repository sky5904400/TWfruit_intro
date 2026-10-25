"use client";

import { useState } from "react";

const WIN_RATE = 0.1;

type Result = { win: boolean; code?: string };
type Status = "idle" | "drawing" | "done";

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `WANGLAI90-${suffix}`;
}

export default function LuckyDraw() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  function draw() {
    setStatus("drawing");
    setCopied(false);
    setTimeout(() => {
      const win = Math.random() < WIN_RATE;
      setResult({ win, code: win ? makeCode() : undefined });
      setStatus("done");
    }, 1200);
  }

  async function copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-center">
      {/* 籤筒 */}
      <div className="flex flex-col items-center justify-end">
        <div className={`relative flex flex-col items-center ${status === "drawing" ? "shake" : ""}`} aria-hidden>
          <div className="flex gap-1.5">
            {[-12, -4, 4, 12].map((deg, i) => (
              <span
                key={deg}
                className={`block h-16 w-3 rounded-t border-2 border-ink ${i === 1 ? "bg-retro-red" : "bg-[#d8b98a]"}`}
                style={{ transform: `rotate(${deg}deg) translateY(${i % 2 ? 6 : 12}px)` }}
              />
            ))}
          </div>
          <div className="relative z-10 flex h-36 w-28 items-center justify-center rounded-b-xl border-4 border-ink bg-retro-red shadow-[6px_6px_0_var(--ink)]">
            <span className="font-sign text-2xl font-black leading-tight tracking-widest text-retro-yellow [writing-mode:vertical-rl]">
              果子籤
            </span>
          </div>
        </div>
      </div>

      {/* 籤詩 */}
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4 border-4 border-ink bg-white p-6 text-center shadow-[6px_6px_0_var(--ink)]">
        <div aria-live="polite" className="flex min-h-36 flex-col items-center justify-center gap-2">
          {status === "idle" && (
            <>
              <p className="font-sign text-2xl font-black tracking-widest">今仔日手氣如何？</p>
              <p className="leading-7 text-ink-soft">十支裡有一支是上上籤，送你全館 9 折。</p>
            </>
          )}
          {status === "drawing" && <p className="font-sign text-2xl font-black tracking-widest">搖啊搖……</p>}
          {status === "done" && result?.win && (
            <>
              <span className="stamp rounded-full px-3 py-1 font-sign text-sm font-black text-retro-red">上上籤</span>
              <p className="font-sign text-2xl font-black tracking-widest text-retro-red">恭喜！抽中 9 折券</p>
              <button
                type="button"
                onClick={() => copy(result.code!)}
                className="mt-1 border-2 border-dashed border-retro-red bg-retro-yellow px-4 py-2 font-mono text-lg font-bold tracking-widest"
                title="點一下複製"
              >
                {result.code}
              </button>
              <span className="text-sm text-ink-soft">{copied ? "已複製！" : "點優惠碼即可複製，結帳時輸入"}</span>
            </>
          )}
          {status === "done" && result && !result.win && (
            <>
              <span className="stamp rounded-full px-3 py-1 font-sign text-sm font-black text-ink-soft">平安籤</span>
              <p className="font-sign text-2xl font-black tracking-widest">這次沒中，再試一擺</p>
              <p className="leading-7 text-ink-soft">吃果子拜樹頭，好運慢慢來。</p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={draw}
          disabled={status === "drawing"}
          className="w-full rounded border-2 border-ink bg-retro-red px-6 py-3 font-sign text-lg font-bold tracking-widest text-paper shadow-[4px_4px_0_var(--ink)] transition-transform enabled:hover:-translate-y-1 disabled:opacity-60"
        >
          {status === "idle" ? "搖籤試手氣" : status === "drawing" ? "搖籤中…" : "再抽一支"}
        </button>
      </div>
    </div>
  );
}
