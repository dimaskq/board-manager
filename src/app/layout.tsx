import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contact Manager - Professional Network Management",
  description: "Manage your professional contacts and networking boards with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 min-h-screen`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-lg font-semibold text-white">Contact Manager</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Professional network management made simple and elegant
              </p>
              <div className="flex items-center justify-center space-x-6 text-xs text-white/50">
                <span>© 2025 Kravchenko Dmytro</span>
                <span>•</span>
                <span>Built with Next.js & TailwindCSS</span>
                <span>•</span>
                <span>Professional Networking</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
