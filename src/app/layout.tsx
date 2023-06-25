import "tailwindcss/tailwind.css";

import type { Metadata } from "next";
import { WagmiConfigClient } from "src/utils/wagmi/WagmiConfigClient";

import { Sidebar } from "./sidebar/sidebar";

export const metadata: Metadata = {
  title: "Social Network 3 | unchain",
  description: "unchain STAR試験のサンプルアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className="bg-violet-1 text-violet-12">
        <WagmiConfigClient>
          <div className="">
            <div className="fixed w-[360px] border-r border-violet-6 top-0">
              <Sidebar />
            </div>
            <div className="ml-[360px]">{children}</div>
          </div>
        </WagmiConfigClient>
      </body>
    </html>
  );
}
