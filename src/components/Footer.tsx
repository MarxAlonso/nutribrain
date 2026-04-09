import Link from "next/link";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020612] border-t border-[#1e293b] py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
             <Brain className="text-emerald-500" size={24} />
             <span className="font-bold text-xl text-slate-100">NutriBrain</span>
          </Link>
          <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
             Tu segundo cerebro nutricional. Un ecosistema orgánico de conocimiento científico, diseñado para empoderar tu salud a cualquier edad.
          </p>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} NutriBrain. Todos los derechos reservados.
          </p>
        </div>
        
        <div className="col-span-1">
          <h4 className="text-slate-100 font-semibold mb-4 text-sm tracking-widest uppercase">Plataforma</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Explorar Topicos</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Fuentes Clínicas</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Accesibilidad</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-slate-100 font-semibold mb-4 text-sm tracking-widest uppercase">Legal</h4>
          <ul className="space-y-2">
             <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Privacidad</a></li>
             <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Términos de Uso</a></li>
             <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Aviso Médico</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
