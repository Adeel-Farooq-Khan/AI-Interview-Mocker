import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../components/ui/sonner"
import { Inter } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Interview Mocker",
  description: "Prepare for your interviews with AI-powered mock sessions",
}
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Toaster />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
