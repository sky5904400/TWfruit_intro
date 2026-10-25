import type { Metadata } from "next";
import { Noto_Serif_TC, LXGW_WenKai_TC } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// 招牌字：粗明體，像老店門口的手寫招牌
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-sign",
  weight: ["500", "700", "900"],
  preload: false,
});

// 內文字：霞鶩文楷，帶點手寫的溫度
const wenKaiTC = LXGW_WenKai_TC({
  variable: "--font-hand",
  weight: ["400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "寶島果子店｜正港台灣水果",
  description: "四季都有好果子。帶你認識台灣在地水果、產地與產季，吃一口阿嬤年代的甜。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerifTC.variable} ${wenKaiTC.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full flex flex-col text-ink">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
