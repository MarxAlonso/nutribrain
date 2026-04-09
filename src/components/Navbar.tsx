"use client";

import Link from "next/link";
import { Brain, Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#060e17]/80 backdrop-blur-md border-b border-[#1e293b]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500/10 p-1.5 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
            <Brain className="text-emerald-400" size={22} />
          </div>
          <span className="font-bold text-lg tracking-wide text-slate-100 group-hover:text-white transition-colors">
            NutriBrain
          </span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-300 hover:text-emerald-400 font-medium transition-colors">
            Explorar
          </Link>
          <a href="#" className="text-sm text-slate-300 hover:text-emerald-400 font-medium transition-colors">
            Artículos
          </a>
          <a href="#" className="text-sm text-slate-300 hover:text-emerald-400 font-medium transition-colors">
            Metodología
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button aria-label="Buscar" className="text-slate-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="md:hidden text-slate-400 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
