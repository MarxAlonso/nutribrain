"use client";

import { motion } from "framer-motion";
import { TrendingUp, Activity, ShieldCheck } from "lucide-react";

export default function EvolutionChart3D() {
  // Simulación de datos de evolución nutritiva (Trayectoria de Vida)
  const data = [
    { age: "Infancia", healthy: 95, poor: 80, label: "Desarrollo Base" },
    { age: "Adultez", healthy: 90, poor: 60, label: "Riesgo Metabólico" },
    { age: "60+ Años", healthy: 85, poor: 30, label: "Fragilidad/Sarcopenia" },
  ];

  return (
    <div className="w-full bg-[#030812] rounded-3xl border border-slate-800/50 p-6 md:p-8 my-8 md:my-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12 gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-100 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" size={24} />
            Trayectoria de Salud
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Impacto de la nutrición clínica a largo plazo</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Óptima</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
             <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Déficit</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -z-10 hidden md:block"></div>
        
        {data.map((item, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">{item.age}</span>
            
            <div className="flex items-end gap-2 md:gap-3 h-32 md:h-48 w-full justify-center">
              {/* Barra Nutrición Sana (3D Effect) */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${item.healthy}%` }}
                className="w-10 md:w-12 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg relative shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                transition={{ delay: idx * 0.2, duration: 1 }}
              >
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-white/20 rounded-t-lg transform -skew-x-12 translate-y-[-50%]"></div>
                 <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-400">{item.healthy}%</span>
              </motion.div>

              {/* Barra Malnutrición (3D Effect) */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${item.poor}%` }}
                className="w-10 md:w-12 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg relative opacity-60"
                transition={{ delay: idx * 0.2 + 0.1, duration: 1 }}
              >
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-white/20 rounded-t-lg transform -skew-x-12 translate-y-[-50%]"></div>
                 <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-red-400">{item.poor}%</span>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm font-bold text-slate-200 block">{item.label}</span>
              <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider font-medium">Funcionalidad Física</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-slate-900/40 p-5 md:p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-4 md:gap-6">
         <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <ShieldCheck size={28} />
         </div>
         <div>
            <h4 className="text-slate-100 font-bold text-sm md:text-base">Resumen Clínico</h4>
            <p className="text-[11px] md:text-sm text-slate-400 leading-relaxed">
               La diversificación alimentaria desde la infancia protege la reserva muscular. El déficit crónico acelera la fragilidad funcional irreversible.
            </p>
         </div>
      </div>
    </div>
  );
}
