import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  title: "TranslucentTB AI Configurator",
  description:
    "Create, preview, and save dynamic JSON configurations for TranslucentTB. Features a manual builder with presets and an AI-powered generator.",
  keywords: ["TranslucentTB", "Windows", "taskbar", "customization", "AI", "configurator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#0f172a",
        },
      }}
    >
      <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-gray-950 font-sans text-gray-100">
          <Navbar />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
