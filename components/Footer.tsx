import Link from "next/link";
import { navLinks } from "./nav-links";

const seasonalTips = [
  { season: "春", fruits: "枇杷・鳳梨・桑椹" },
  { season: "夏", fruits: "芒果・荔枝・西瓜" },
  { season: "秋", fruits: "文旦・柿子・釋迦" },
  { season: "冬", fruits: "椪柑・蓮霧・草莓" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-ink text-paper">
      {/* 鐵窗花裝飾帶 */}
      <div className="tie-chuang h-12 border-b-4 border-ink" aria-hidden />

      <div className="bg-retro-green">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* 店家簡介 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="stamp flex h-12 w-12 items-center justify-center rounded-full bg-paper font-sign text-lg font-black text-retro-red">
                果
              </span>
              <span className="font-sign text-2xl font-black tracking-[0.3em]">寶島果子店</span>
            </div>
            <p className="leading-7 text-paper/85">
              照時節吃果子，是土地教我們的事。我們把台灣各地的當季好果子，從產地帶到你家。
            </p>
          </div>

          {/* 逛逛 */}
          <div>
            <h3 className="mb-4 inline-block border-b-2 border-retro-yellow pb-1 font-sign text-lg font-bold tracking-[0.3em] text-retro-yellow">
              逛逛
            </h3>
            <ul className="grid grid-cols-2 gap-2 tracking-widest sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-retro-yellow">
                    ▸ {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 當季提醒 */}
          <div>
            <h3 className="mb-4 inline-block border-b-2 border-retro-yellow pb-1 font-sign text-lg font-bold tracking-[0.3em] text-retro-yellow">
              當季提醒
            </h3>
            <ul className="space-y-2">
              {seasonalTips.map((tip) => (
                <li key={tip.season} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-retro-red font-sign font-black">
                    {tip.season}
                  </span>
                  <span className="tracking-wider text-paper/85">{tip.fruits}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 店頭資訊 */}
          <div>
            <h3 className="mb-4 inline-block border-b-2 border-retro-yellow pb-1 font-sign text-lg font-bold tracking-[0.3em] text-retro-yellow">
              店頭資訊
            </h3>
            <dl className="space-y-2 leading-7 text-paper/85">
              <div>
                <dt className="inline text-retro-yellow">營業｜</dt>
                <dd className="inline">透早六點到暗時九點</dd>
              </div>
              <div>
                <dt className="inline text-retro-yellow">公休｜</dt>
                <dd className="inline">颱風天（果子嘛愛歇睏）</dd>
              </div>
              <div>
                <dt className="inline text-retro-yellow">店址｜</dt>
                <dd className="inline">寶島台灣 果子路一號</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-paper/30">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm tracking-widest text-paper/70 sm:flex-row">
            <span>© 寶島果子店　版權所有</span>
            <span>吃果子拜樹頭・飲水思源</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
