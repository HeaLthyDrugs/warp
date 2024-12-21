export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { GitHubProvider } from '@/context/GitHubContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
});

export const metadata: Metadata = {
  title: "Warp",
  description: "Warp is a Productivity Dashboard for Developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${ibmPlexSerif.variable} dark`}>
        <AuthProvider initialState={{ isAuth: false, user: null }}>
          <GitHubProvider>
            <Providers>
              {children}
            </Providers>
          </GitHubProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
