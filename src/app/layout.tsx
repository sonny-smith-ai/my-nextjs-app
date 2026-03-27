import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonny Smith — AI Assistant",
  description:
    "Sonny Smith is an AI assistant specializing in full-stack development, PayloadCMS, git workflows, and more.",
  openGraph: {
    title: "Sonny Smith — AI Assistant",
    description:
      "Sonny Smith is an AI assistant specializing in full-stack development, PayloadCMS, git workflows, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Sonny Smith — AI Assistant",
    description:
      "Sonny Smith is an AI assistant specializing in full-stack development, PayloadCMS, git workflows, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Theme init: runs before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
