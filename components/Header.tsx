"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "./nav-links";

const marqueeItems = [
  "愛文芒果 甜過初戀",
  "關廟鳳梨 旺旺來",
  "麻豆文旦 中秋限定",
  "黑珍珠蓮霧 脆擱甜",
  "旗山香蕉 古早味",
  "台東釋迦 綿密香",
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 跑馬燈 */}
      <div className="overflow-hidden border-b-4 border-ink bg-ink py-2 text-retro-yellow">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-sign text-sm tracking-widest">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              {item}
              <span className="text-retro-red" aria-hidden>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* 招牌導覽列 */}
      <header className="sticky top-0 z-30 border-b-4 border-double border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="stamp flex h-12 w-12 items-center justify-center rounded-full font-sign text-lg font-black text-retro-red">
              果
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-sign text-xl font-black tracking-[0.25em] sm:text-2xl">寶島果子店</span>
              <span className="text-xs tracking-[0.3em] text-ink-soft">FORMOSA FRUIT SHOP</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-1 font-sign font-bold tracking-widest transition-colors hover:bg-retro-red hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#join"
              className="ml-2 rounded border-2 border-ink bg-retro-red px-4 py-1 font-sign font-bold tracking-widest text-paper shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              訂果子
            </Link>
          </nav>

          {/* 手機版選單按鈕 */}
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded border-2 border-ink bg-retro-yellow shadow-[3px_3px_0_var(--ink)] md:hidden"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" className="border-t-2 border-dashed border-ink/40 bg-paper md:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ink/20 py-3 font-sign text-lg font-bold tracking-widest"
                  >
                    {link.label}
                    <span className="text-retro-red" aria-hidden>▸</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
