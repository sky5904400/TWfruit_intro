import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "果子專欄｜寶島果子店",
  description: "一種果子一篇故事：台灣在地水果的由來、產季、挑選與保存撇步。",
};

export default function BlogPage() {
  return (
    <main className="flex-1 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="FRUIT COLUMN" title="果子專欄" />
        <p className="mx-auto -mt-4 mb-12 max-w-xl text-center leading-8 text-ink-soft">
          一種果子，一篇故事。從產地、產季到阿嬤的挑選撇步，慢慢讀，慢慢吃。
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border-4 border-ink bg-paper shadow-[6px_6px_0_var(--ink)] transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b-4 border-ink">
                <Image
                  src={post.img}
                  alt={post.fruit}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className={`${post.color} absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-sign font-black`}>
                  {post.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm tracking-widest text-ink-soft">{post.date}</span>
                <h3 className="font-sign text-xl font-black leading-snug tracking-wider group-hover:text-retro-red">
                  {post.title}
                </h3>
                <p className="flex-1 leading-7 text-ink-soft">{post.excerpt}</p>
                <span className="mt-2 border-t-2 border-dashed border-ink/40 pt-3 font-sign font-bold tracking-widest text-retro-red">
                  繼續閱讀 ▸
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
