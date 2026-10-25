"use client";

import { useEffect, useRef, useState } from "react";

const GAME_SECONDS = 15;
const W = 600;
const H = 450;
const BASKET_W = 96;
const BASKET_H = 34;
const BASKET_Y = H - 56;
const FRUIT_R = 22;
const FRUIT_IMAGES = ["mango", "pineapple", "lychee", "wax-apple", "pomelo", "guava", "sugar-apple", "banana"];

type Phase = "ready" | "playing" | "over";
type Fruit = { x: number; y: number; speed: number; img: number; spin: number };
type Pop = { x: number; y: number; life: number };

// 圖片只載一次，之後重玩直接用
let images: HTMLImageElement[] | null = null;
function loadImages() {
  images ??= FRUIT_IMAGES.map((name) => {
    const img = new Image();
    img.src = `/fruits/${name}.jpg`;
    return img;
  });
  return images;
}

function rating(score: number) {
  if (score >= 30) return "果子王！阿嬤都誇你手腳俐落";
  if (score >= 20) return "身手不錯，可以來店裡幫忙了";
  if (score >= 10) return "有練過喔，再接再厲";
  return "果子太滑了，再試一擺";
}

export default function FruitCatch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const imgs = loadImages();
    // 招牌字是 next/font 載入的，字型名稱要從 CSS 變數讀
    const font = `bold 22px ${getComputedStyle(canvas).getPropertyValue("--font-sign") || "serif"}`;

    // 依螢幕像素密度放大畫布，畫面才不會糊
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let basketX = W / 2;
    let points = 0;
    let fruits: Fruit[] = [];
    let pops: Pop[] = [];
    let spawnTimer = 0;
    const keys = { left: false, right: false };
    const start = performance.now();
    let last = start;
    let frame = 0;

    // 滑鼠、手指：籃子跟著游標走
    function onPointer(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      basketX = ((e.clientX - rect.left) / rect.width) * W;
    }
    // 鍵盤：左右方向鍵或 A／D
    function onKey(e: KeyboardEvent) {
      const down = e.type === "keydown";
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = down;
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = down;
      else return;
      e.preventDefault();
    }
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    function drawBasket() {
      const x = basketX - BASKET_W / 2;
      ctx.fillStyle = "#c8262e";
      ctx.strokeStyle = "#2b1e16";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, BASKET_Y);
      ctx.lineTo(x + BASKET_W, BASKET_Y);
      ctx.lineTo(x + BASKET_W - 10, BASKET_Y + BASKET_H);
      ctx.lineTo(x + 10, BASKET_Y + BASKET_H);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // 竹編紋路
      ctx.strokeStyle = "#f2c14e";
      ctx.lineWidth = 2;
      for (let i = 1; i < 3; i++) {
        const y = BASKET_Y + (BASKET_H / 3) * i;
        ctx.beginPath();
        ctx.moveTo(x + 4 + i * 2, y);
        ctx.lineTo(x + BASKET_W - 4 - i * 2, y);
        ctx.stroke();
      }
    }

    function drawFruit(f: Fruit) {
      const img = imgs[f.img];
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.spin);
      ctx.beginPath();
      ctx.arc(0, 0, FRUIT_R, 0, Math.PI * 2);
      ctx.fillStyle = "#f4ead5";
      ctx.fill();
      if (img.complete && img.naturalWidth) {
        ctx.save();
        ctx.clip();
        // 裁成正方形再放進圓裡
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        ctx.drawImage(
          img,
          (img.naturalWidth - side) / 2,
          (img.naturalHeight - side) / 2,
          side,
          side,
          -FRUIT_R,
          -FRUIT_R,
          FRUIT_R * 2,
          FRUIT_R * 2,
        );
        ctx.restore();
      }
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#2b1e16";
      ctx.stroke();
      ctx.restore();
    }

    function drawHud(timeLeft: number) {
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#2b1e16";
      ctx.textAlign = "left";
      ctx.fillText(`接到 ${points} 顆`, 16, 14);
      ctx.textAlign = "right";
      ctx.fillStyle = timeLeft <= 5 ? "#c8262e" : "#2b1e16";
      ctx.fillText(`剩 ${Math.ceil(timeLeft)} 秒`, W - 16, 14);
      // 時間條
      ctx.fillStyle = "rgba(43,30,22,0.15)";
      ctx.fillRect(16, 46, W - 32, 6);
      ctx.fillStyle = timeLeft <= 5 ? "#c8262e" : "#1f5e3b";
      ctx.fillRect(16, 46, (W - 32) * (timeLeft / GAME_SECONDS), 6);
    }

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const elapsed = (now - start) / 1000;
      const timeLeft = Math.max(GAME_SECONDS - elapsed, 0);
      // 越接近結束，果子掉得越快、越密
      const progress = elapsed / GAME_SECONDS;

      if (keys.left) basketX -= 480 * dt;
      if (keys.right) basketX += 480 * dt;
      basketX = Math.min(Math.max(basketX, BASKET_W / 2), W - BASKET_W / 2);

      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        fruits.push({
          x: FRUIT_R + Math.random() * (W - FRUIT_R * 2),
          y: -FRUIT_R,
          speed: 150 + progress * 170 + Math.random() * 60,
          img: Math.floor(Math.random() * imgs.length),
          spin: Math.random() * Math.PI,
        });
        spawnTimer = 0.7 - progress * 0.35;
      }

      fruits = fruits.filter((f) => {
        f.y += f.speed * dt;
        f.spin += dt * 2;
        const caught =
          f.y + FRUIT_R >= BASKET_Y &&
          f.y - FRUIT_R <= BASKET_Y + BASKET_H / 2 &&
          Math.abs(f.x - basketX) <= BASKET_W / 2;
        if (caught) {
          points++;
          pops.push({ x: f.x, y: BASKET_Y - 10, life: 1 });
          return false;
        }
        return f.y - FRUIT_R < H;
      });

      pops = pops.filter((p) => {
        p.y -= 40 * dt;
        p.life -= dt * 1.5;
        return p.life > 0;
      });

      ctx.clearRect(0, 0, W, H);
      fruits.forEach(drawFruit);
      drawBasket();
      ctx.font = font;
      ctx.textAlign = "center";
      pops.forEach((p) => {
        ctx.fillStyle = `rgba(200,38,46,${p.life})`;
        ctx.fillText("+1", p.x, p.y);
      });
      drawHud(timeLeft);

      if (timeLeft <= 0) {
        setScore(points);
        setBest((b) => Math.max(b, points));
        setPhase("over");
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [phase]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative overflow-hidden border-4 border-ink bg-[#fbf3e1] shadow-[8px_8px_0_var(--ink)]">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block aspect-[4/3] w-full touch-none"
          aria-label="接果子遊戲畫面"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-paper/90 p-6 text-center">
            {phase === "ready" ? (
              <>
                <p className="font-sign text-3xl font-black tracking-widest">接果子</p>
                <p className="max-w-sm leading-8 text-ink-soft">
                  {GAME_SECONDS} 秒內，用竹籃接住從樹上掉下來的果子，接越多越厲害！
                </p>
                <p className="text-sm tracking-wider text-ink-soft">電腦：移動滑鼠或按 ← →｜手機：手指在畫面上左右滑</p>
              </>
            ) : (
              <>
                <span className="stamp rounded-full px-3 py-1 font-sign text-sm font-black text-retro-red">時間到</span>
                <p className="font-sign text-4xl font-black tracking-widest">
                  接到 <span className="text-retro-red">{score}</span> 顆
                </p>
                <p className="leading-8 text-ink-soft">{rating(score)}</p>
                <p className="text-sm tracking-widest text-ink-soft">本次最佳：{best} 顆</p>
              </>
            )}
            <button
              type="button"
              onClick={() => setPhase("playing")}
              className="mt-2 rounded border-2 border-ink bg-retro-red px-8 py-3 font-sign text-lg font-bold tracking-widest text-paper shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1"
            >
              {phase === "ready" ? "開始遊戲" : "再玩一次"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
