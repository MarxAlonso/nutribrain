import { getAllArticles } from "@/lib/markdown";
import Link from "next/link";
import { ArrowRight, Activity, Leaf } from "lucide-react";

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 md:py-32 text-center flex flex-col items-center justify-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-emerald-400 text-sm font-medium mb-8">
           <Activity size={16} /> Base de evidencia científica actualizada
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Inteligencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Nutricional</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
          Explora nuestra biblioteca clínica. Cada lectura te guiará orgánicamente hacia otros conceptos relevantes para mejorar tu calidad de vida.
        </p>
      </section>

      {/* Grid de Artículos */}
      <section className="w-full bg-[#030812]/50 border-t border-slate-800/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-10 text-slate-200">
            <Leaf className="text-emerald-500" size={24} />
            <h2 className="text-3xl font-bold">Investigaciones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link href={`/n/${article.id}`} key={article.id} className="group block h-full">
                <article className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all duration-300 h-full flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold tracking-wider uppercase bg-emerald-950/50 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-900/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                      {article.title}
                    </h3>
                  </div>
                  <div className="mt-8 flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">Lectura de 3 min</span>
                    <div className="h-8 w-8 rounded-full bg-slate-800 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
