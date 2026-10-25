import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import FruitCatch from "@/components/FruitCatch";

export const metadata: Metadata = {
  title: "接果子小遊戲｜寶島果子店",
  description: "15 秒內用竹籃接住掉下來的台灣果子，看你能接幾顆！",
};

export default function GamePage() {
  return (
    <main className="flex-1 px-4 py-16">
      <SectionTitle kicker="MINI GAME" title="接果子" />
      <p className="mx-auto -mt-4 mb-10 max-w-xl text-center leading-8 text-ink-soft">
        樹頂的果子熟了，一顆一顆掉下來！拿好竹籃，看你 15 秒能接幾顆。純粹好玩，不計獎品。
      </p>
      <FruitCatch />
    </main>
  );
}
