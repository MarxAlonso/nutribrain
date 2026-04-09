import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ChatBot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Usamos serif para la legibilidad de articulos (Medium style vibes)
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "NutriBrain - Conocimiento Nutricional Conectado",
  description: "Tu segundo cerebro nutricional basado en evidencia científica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200`}>
        <Navbar />
        {/* Contenedor principal con padding top para compensar el Navbar fijo */}
        <main className="flex-grow pt-16 flex flex-col w-full">
          <PageTransition>
             {children}
          </PageTransition>
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
