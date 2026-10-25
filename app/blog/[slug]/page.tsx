import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title}｜寶島果子店`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.indexOf(post);
  const prev = posts[index - 1];
  const next = posts[index + 1];

  const tips = [
    { label: "挑", title: "怎麼挑", text: post.tips.pick, tone: "bg-retro-red text-paper" },
    { label: "存", title: "怎麼放", text: post.tips.keep, tone: "bg-retro-green text-paper" },
    { label: "食", title: "怎麼吃", text: post.tips.eat, tone: "bg-retro-yellow text-ink" },
  ];

  return (
    <main className="flex-1 px-4 py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="font-sign font-bold tracking-widest text-ink-soft hover:text-retro-red">
          ◂ 回果子專欄
        </Link>

        {/* 報紙式標頭 */}
        <header className="mt-6 border-b-4 border-double border-ink pb-6">
          <div className="flex items-center gap-3 text-sm tracking-widest text-ink-soft">
            <span className={`${post.color} rounded border-2 border-ink px-2 font-bold text-ink`}>{post.tag}季果子</span>
            <span>{post.date}</span>
          </div>
          <h1 className="mt-4 font-sign text-4xl font-black leading-tight tracking-wider sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-soft">{post.excerpt}</p>
        </header>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden border-4 border-ink shadow-[8px_8px_0_var(--ink)]">
          <Image src={post.img} alt={post.fruit} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 flex items-center gap-3 font-sign text-2xl font-black tracking-widest">
                <span className="h-6 w-2 bg-retro-red" aria-hidden />
                {section.heading}
              </h2>
              <p className="text-lg leading-9">{section.body}</p>
            </section>
          ))}
        </div>

        {/* 阿嬤撇步 */}
        <aside className="mt-14 border-4 border-ink bg-paper-deep p-6 shadow-[6px_6px_0_var(--ink)] sm:p-8">
          <h2 className="mb-6 font-sign text-2xl font-black tracking-[0.3em]">阿嬤的撇步</h2>
          <ul className="space-y-5">
            {tips.map((tip) => (
              <li key={tip.label} className="flex gap-4">
                <span className={`${tip.tone} flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink font-sign text-lg font-black`}>
                  {tip.label}
                </span>
                <div>
                  <h3 className="font-sign font-bold tracking-widest">{tip.title}</h3>
                  <p className="leading-8 text-ink-soft">{tip.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* 上一篇／下一篇 */}
        <nav className="mt-14 grid gap-4 border-t-2 border-dashed border-ink/40 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="border-2 border-ink bg-paper p-4 transition-transform hover:-translate-y-1">
              <span className="text-sm tracking-widest text-ink-soft">◂ 上一篇</span>
              <p className="font-sign font-bold tracking-wider">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="border-2 border-ink bg-paper p-4 text-right transition-transform hover:-translate-y-1">
              <span className="text-sm tracking-widest text-ink-soft">下一篇 ▸</span>
              <p className="font-sign font-bold tracking-wider">{next.title}</p>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
