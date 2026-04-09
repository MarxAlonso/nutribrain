"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Explorar", href: "/" },
    { name: "Artículos", href: "#" },
    { name: "Metodología", href: "#" },
  ];

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
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-sm text-slate-300 hover:text-emerald-400 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button aria-label="Buscar" className="p-2 text-slate-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors z-50"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-[#060e17] border-b border-[#1e293b] py-6 px-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg text-slate-100 hover:text-emerald-400 font-semibold transition-colors py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-xl transition-all">
              Comenzar Ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
