"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface EvolutionPoint {
  stage: string;
  [key: string]: string | number;
}

export default function ArticleEvolutionDisplay({ data }: { data: EvolutionPoint[] }) {
  if (!data || data.length === 0) return null;

  // Find the numeric key that isn't 'stage'
  const numericKey = Object.keys(data[0]).find(k => k !== 'stage') || '';

  return (
    <div className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-3xl p-8 my-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
           <TrendingUp size={20} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-100 uppercase tracking-tight">Proyección de Evolución Biológica</h4>
          <p className="text-xs text-slate-400 px-0.5">Dinámica de impacto según etapa vital</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {data.map((item, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {/* Value Label */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="text-2xl font-black text-emerald-400 mb-2 font-mono"
            >
              {item[numericKey]}%
            </motion.div>
            
            {/* Bar/Progress Indicator */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${item[numericKey]}%` }}
                 transition={{ duration: 1, delay: idx * 0.2 }}
                 className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
               />
            </div>

            <div className="text-center">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-widest block mb-1">{item.stage}</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase">{numericKey.replace(/([A-Z])/g, ' $1')}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-500 italic text-center uppercase tracking-[0.1em]">
         Basado en modelos heurísticos de NutriBrain Research
      </div>
    </div>
  );
}
