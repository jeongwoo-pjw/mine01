import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HANDY — 나만의 손글씨 폰트 만들기",
  description: "AI를 활용하여 나만의 손글씨를 폰트로 변환하세요. QR 코드로 간편하게 스캔하고 나만의 필기체를 제작합니다.",
  keywords: ["손글씨 폰트", "AI 폰트", "필기체", "커스텀 폰트", "한글 폰트"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/mine01/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Dancing+Script:wght@400;600;700&family=East+Sea+Dokdo&family=Grandiflora+One&family=Klee+One:wght@400;600&family=Nanum+Brush+Script&family=Nanum+Pen+Script&family=Pacifico&family=Pinyon+Script&family=Playwrite+NZ+Basic+Guides:wght@400&family=Poor+Story&family=Sacramento&family=Satisfy&family=Shadows+Into+Light&family=Single+Day&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://hangeul.naver.com/hangeul_static/css/clova-fonts.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
