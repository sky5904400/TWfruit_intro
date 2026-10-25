import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import LuckyDraw from "@/components/LuckyDraw";
import WelcomeGreeting from "@/components/WelcomeGreeting";

const fruits = [
  {
    img: "/fruits/mango.jpg",
    name: "愛文芒果",
    taigi: "suāinn-á",
    origin: "台南玉井・屏東枋山",
    season: "5–8 月",
    desc: "夏天的代名詞。果肉橙紅、香氣濃郁，切成花朵狀淋上煉乳，就是記憶中的芒果冰。",
    color: "bg-retro-yellow",
  },
  {
    img: "/fruits/pineapple.jpg",
    name: "金鑽鳳梨",
    taigi: "ông-lâi",
    origin: "屏東・台南關廟・嘉義",
    season: "3–7 月",
    desc: "台語唸作「旺來」，拜拜、開店都少不了。酸甜多汁，鳳梨酥的靈魂。",
    color: "bg-retro-yellow",
  },
  {
    img: "/fruits/lychee.jpg",
    name: "玉荷包荔枝",
    taigi: "nāi-tsi",
    origin: "高雄大樹・台中太平",
    season: "5–7 月",
    desc: "籽小肉厚、汁多不黏手。一年只有短短幾週，錯過就要再等一年。",
    color: "bg-retro-pink",
  },
  {
    img: "/fruits/wax-apple.jpg",
    name: "黑珍珠蓮霧",
    taigi: "lián-bū",
    origin: "屏東林邊・南州",
    season: "12–4 月",
    desc: "長在海風吹拂的土地上，顏色深紅發亮，咬下去清脆爽口。",
    color: "bg-retro-pink",
  },
  {
    img: "/fruits/pomelo.jpg",
    name: "麻豆文旦",
    taigi: "bûn-tàn",
    origin: "台南麻豆",
    season: "8–9 月",
    desc: "中秋節烤肉配月餅，桌上一定要有一顆。柚皮還能戴在頭上當帽子。",
    color: "bg-retro-green",
  },
  {
    img: "/fruits/guava.jpg",
    name: "燕巢芭樂",
    taigi: "pa̍t-á",
    origin: "高雄燕巢",
    season: "全年",
    desc: "沾一點酸梅粉，是放學路上最好的零嘴。一年四季都吃得到的老朋友。",
    color: "bg-retro-green",
  },
  {
    img: "/fruits/sugar-apple.jpg",
    name: "台東釋迦",
    taigi: "sik-khia",
    origin: "台東卑南・太麻里",
    season: "8–2 月",
    desc: "長得像佛頭，又叫「佛頭果」。果肉綿密像冰淇淋，熟透時輕輕一剝就開。",
    color: "bg-retro-blue",
  },
  {
    img: "/fruits/banana.jpg",
    name: "旗山香蕉",
    taigi: "kin-tsio",
    origin: "高雄旗山",
    season: "全年",
    desc: "曾經讓台灣贏得「香蕉王國」的美名。香氣濃、口感Q，阿公最愛的早餐。",
    color: "bg-retro-yellow",
  },
];

const seasons = [
  { name: "春", months: "三月 — 五月", fruits: ["枇杷", "鳳梨", "桑椹", "楊桃"], tone: "bg-retro-pink" },
  { name: "夏", months: "六月 — 八月", fruits: ["芒果", "荔枝", "龍眼", "西瓜"], tone: "bg-retro-yellow" },
  { name: "秋", months: "九月 — 十一月", fruits: ["文旦", "柿子", "釋迦", "百香果"], tone: "bg-retro-green" },
  { name: "冬", months: "十二月 — 二月", fruits: ["椪柑", "蓮霧", "棗子", "草莓"], tone: "bg-retro-blue" },
];

const tickets = [
  { from: "台北", to: "玉井", train: "芒果號", fruit: "愛文芒果", when: "6–8月", no: "0517" },
  { from: "台北", to: "林邊", train: "蓮霧號", fruit: "黑珍珠蓮霧", when: "1–3月", no: "0128" },
  { from: "台北", to: "麻豆", train: "文旦號", fruit: "麻豆文旦", when: "8–9月", no: "0815" },
  { from: "台北", to: "旗山", train: "香蕉號", fruit: "旗山香蕉", when: "全年", no: "1001" },
  { from: "台北", to: "大樹", train: "荔枝號", fruit: "玉荷包", when: "5–6月", no: "0606" },
  { from: "台北", to: "台東", train: "釋迦號", fruit: "鳳梨釋迦", when: "11–2月", no: "1225" },
];

const priceTags = [
  { text: "愛文 一斤五十", rotate: "-rotate-6", pos: "left-[4%] top-[18%]" },
  { text: "文旦 大顆的", rotate: "rotate-3", pos: "right-[5%] top-[12%]" },
  { text: "芭樂 免費試吃", rotate: "rotate-6", pos: "left-[8%] bottom-[14%]" },
  { text: "今仔日現採", rotate: "-rotate-3", pos: "right-[7%] bottom-[18%]" },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* 大花布主視覺 */}
      <section className="hua-bu relative overflow-hidden border-b-4 border-ink">
        {priceTags.map((tag) => (
          <span
            key={tag.text}
            className={`absolute hidden ${tag.pos} ${tag.rotate} border-2 border-ink bg-[#d8b98a] px-3 py-2 font-hand text-lg font-bold text-ink shadow-[4px_4px_0_rgba(43,30,22,0.6)] lg:block`}
          >
            {tag.text}
          </span>
        ))}

        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 sm:py-28">
          <div className="relative w-full max-w-2xl border-4 border-ink bg-paper px-6 py-10 text-center shadow-[10px_10px_0_var(--ink)] sm:px-12">
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border-2 border-ink bg-retro-yellow px-5 py-1 font-sign text-sm font-bold tracking-[0.4em]">
              真正港台灣味
            </span>
            <WelcomeGreeting />
            <p className="mb-4 text-lg tracking-[0.3em] text-ink-soft">
              民國風味・產地直送
            </p>
            <h1 className="font-sign text-5xl font-black leading-tight tracking-[0.15em] text-retro-red sm:text-7xl">
              寶島果子
              <br />
              <span className="text-ink">四季攏甜</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-ink-soft">
              從南部的芒果園到東部的釋迦田，
              <br className="hidden sm:block" />
              每一口都是太陽與土地的味道。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#fruits"
                className="rounded border-2 border-ink bg-retro-red px-6 py-3 font-sign text-lg font-bold tracking-widest text-paper shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1"
              >
                逛果子圖鑑
              </a>
              <a
                href="#seasons"
                className="rounded border-2 border-ink bg-retro-yellow px-6 py-3 font-sign text-lg font-bold tracking-widest text-ink shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1"
              >
                看當季水果
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 數字看板 */}
      <section className="border-b-4 border-ink bg-retro-green text-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-paper/30 px-4 sm:grid-cols-4 sm:divide-x">
          {[
            { num: "30+", label: "種在地水果" },
            { num: "365", label: "天都有當季" },
            { num: "22", label: "個縣市產地" },
            { num: "百年", label: "果農的手藝" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-6">
              <span className="font-sign text-4xl font-black text-retro-yellow">{stat.num}</span>
              <span className="mt-1 tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 抽果子籤 */}
      <section id="lucky" className="scroll-mt-20 border-b-4 border-ink bg-paper-deep px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="LUCKY DRAW" title="抽果子籤" />
          <LuckyDraw />
        </div>
      </section>

      {/* 接果子小遊戲入口 */}
      <section className="border-b-4 border-ink bg-retro-blue px-4 py-10 text-paper">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-sign text-3xl font-black tracking-widest">來玩接果子！</p>
            <p className="mt-2 leading-7 text-paper/85">15 秒內用竹籃接住掉下來的果子，看你能接幾顆。</p>
          </div>
          <Link
            href="/game"
            className="shrink-0 rounded border-2 border-ink bg-retro-yellow px-8 py-3 font-sign text-lg font-bold tracking-widest text-ink shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1"
          >
            開始遊戲 ▸
          </Link>
        </div>
      </section>

      {/* 果子圖鑑 */}
      <section id="fruits" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="FRUITS OF FORMOSA" title="果子圖鑑" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fruits.map((fruit) => (
              <article
                key={fruit.name}
                className="group flex flex-col border-4 border-ink bg-paper shadow-[6px_6px_0_var(--ink)] transition-transform hover:-translate-y-1"
              >
                <div className={`${fruit.color} relative flex h-36 items-center justify-center border-b-4 border-ink`}>
                  <span className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-ink bg-paper transition-transform group-hover:rotate-12">
                    <Image src={fruit.img} alt={fruit.name} fill sizes="112px" className="object-cover" />
                  </span>
                  <span className="absolute right-2 top-2 rounded border-2 border-ink bg-paper px-2 text-xs font-bold tracking-widest">
                    {fruit.season}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-sign text-2xl font-black tracking-widest">{fruit.name}</h3>
                  <p className="text-sm text-retro-red">台語：{fruit.taigi}</p>
                  <p className="flex-1 leading-7 text-ink-soft">{fruit.desc}</p>
                  <p className="mt-2 border-t-2 border-dashed border-ink/40 pt-2 text-sm tracking-wider">
                    產地｜{fruit.origin}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 四季月曆：撕頁日曆 */}
      <section id="seasons" className="scroll-mt-20 border-y-4 border-ink bg-paper-deep px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="SEASONAL CALENDAR" title="四季果子月曆" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((season) => (
              <div key={season.name} className="relative pt-4">
                {/* 日曆頂端的釘子與裝訂條 */}
                <span className="absolute left-1/2 top-0 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-ink bg-retro-yellow" aria-hidden />
                <div className="border-4 border-ink bg-white shadow-[6px_6px_0_var(--ink)]">
                  <div className="h-4 border-b-4 border-ink bg-retro-red" />
                  <div className="flex flex-col items-center px-4 pb-6 pt-4">
                    <span className="text-sm tracking-[0.3em] text-ink-soft">{season.months}</span>
                    <span className="font-sign text-8xl font-black leading-none text-retro-red">
                      {season.name}
                    </span>
                    <div className="mt-4 grid w-full grid-cols-2 gap-2">
                      {season.fruits.map((f) => (
                        <span
                          key={f}
                          className={`${season.tone} border-2 border-ink py-1 text-center font-bold tracking-widest ${season.tone === "bg-retro-green" || season.tone === "bg-retro-blue" ? "text-paper" : "text-ink"}`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 text-xs tracking-widest text-ink-soft">宜：吃水果　忌：挑食</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 產地車票：台鐵名片式硬票 */}
      <section id="tickets" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle kicker="FRUIT EXPRESS" title="搭火車去產地" />
          <p className="mx-auto -mt-4 mb-10 max-w-xl text-center leading-8 text-ink-soft">
            一張硬紙車票，一趟慢車旅行。到產地親手摘一顆，才知道什麼叫做「現採」。
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((t) => (
              <div
                key={t.no}
                className="ticket-edge relative bg-[#e9c9a0] px-8 py-5 shadow-[0_4px_0_rgba(43,30,22,0.25)] transition-transform hover:-rotate-1"
              >
                <div className="flex items-center justify-between border-b-2 border-ink/40 pb-2 text-xs tracking-[0.3em]">
                  <span>寶島果子鐵道</span>
                  <span>No. {t.no}</span>
                </div>
                <div className="flex items-center justify-between py-3 font-sign">
                  <span className="text-2xl font-black tracking-widest">{t.from}</span>
                  <span className="text-retro-red" aria-hidden>━━▶</span>
                  <span className="text-3xl font-black tracking-widest text-retro-red">{t.to}</span>
                </div>
                <div className="flex items-end justify-between text-sm">
                  <div className="flex flex-col gap-0.5">
                    <span>車種：<b>{t.train}</b></span>
                    <span>名產：{t.fruit}</span>
                  </div>
                  <span className="stamp rounded-full px-2 py-1 text-xs font-bold text-retro-red">
                    {t.when}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 阿嬤講古：舊報紙直排 */}
      <section id="story" className="mo-shi-zi scroll-mt-20 border-y-4 border-ink px-4 py-20">
        <div className="mx-auto max-w-5xl border-4 border-ink bg-[#efe4cc] p-6 shadow-[10px_10px_0_var(--ink)] sm:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b-4 border-double border-ink pb-3">
            <h2 className="font-sign text-3xl font-black tracking-[0.3em] sm:text-4xl">果子日報</h2>
            <span className="text-sm tracking-widest text-ink-soft">本報訊・阿嬤講古專欄</span>
          </div>
          <div className="flex flex-col gap-8 md:flex-row-reverse">
            <h3 className="font-sign text-3xl font-black tracking-[0.3em] text-retro-red md:h-80 md:[writing-mode:vertical-rl]">
              阿嬤的水果攤
            </h3>
            <div className="space-y-4 text-lg leading-9 md:h-80 md:space-y-0 md:[writing-mode:vertical-rl]">
              <p className="md:ml-6">
                以前庄頭的廟口，總有一台三輪車改成的水果攤。阿嬤用紅色塑膠袋裝芭樂，順手撒一包酸梅粉；夏天切好的西瓜泡在鐵盆冰水裡，一片一塊錢。
              </p>
              <p className="md:ml-6">
                她常說：「果子是天公伯賞的，愛照時節吃。」什麼月份吃什麼果子，是土地教我們的事，也是寶島果子店想繼續說下去的故事。
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 border-4 border-ink bg-paper p-6 md:w-56">
              <span className="font-sign text-6xl font-black text-retro-red">甜</span>
              <span className="text-center text-sm leading-6 tracking-widest">
                照時節吃
                <br />
                才是正港的甜
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 果友會：明信片 */}
      <section id="join" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle kicker="JOIN US" title="加入果友會" />
          <div className="relative grid border-4 border-ink bg-white shadow-[8px_8px_0_var(--ink)] md:grid-cols-2">
            {/* 航空信封的紅藍斜紋邊 */}
            <div
              className="absolute inset-x-0 top-0 h-3"
              style={{
                background:
                  "repeating-linear-gradient(-45deg, var(--retro-red) 0 14px, #fff 14px 22px, var(--retro-blue) 22px 36px, #fff 36px 44px)",
              }}
              aria-hidden
            />
            <div className="flex flex-col justify-center gap-4 border-ink p-8 pt-10 md:border-r-2 md:border-dashed">
              <p className="font-sign text-2xl font-black leading-relaxed tracking-widest">
                寄一箱台灣的甜，
                <br />
                給遠方的人。
              </p>
              <p className="leading-8 text-ink-soft">
                每月一封果子信：當季產地消息、果農的故事，還有阿嬤的古早味吃法。
              </p>
            </div>
            <div className="relative flex flex-col gap-5 p-8 pt-10">
              <div className="absolute right-6 top-8 flex h-20 w-16 flex-col items-center justify-center border-2 border-dashed border-retro-red bg-retro-yellow font-sign text-2xl font-black text-retro-red" aria-hidden>
                旺
                <span className="text-[10px] tracking-widest">中華郵政</span>
              </div>
              <div className="space-y-1 pr-20">
                <span className="text-sm tracking-widest text-ink-soft">收件人</span>
                <div className="border-b-2 border-ink/50 pb-1 font-sign text-lg font-bold">愛吃果子的你</div>
              </div>
              <div className="space-y-1">
                <span className="text-sm tracking-widest text-ink-soft">地址</span>
                <div className="border-b-2 border-ink/50 pb-1 font-sign text-lg font-bold">寶島台灣・四季如春</div>
              </div>
              <a
                href="#fruits"
                className="mt-2 rounded border-2 border-ink bg-retro-red px-6 py-3 text-center font-sign text-lg font-bold tracking-widest text-paper shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-1"
              >
                先來挑果子
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
