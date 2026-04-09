import { getArticleData, getBacklinks } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Tag, BookOpen, Clock, Fingerprint } from "lucide-react";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = await getArticleData(resolvedParams.id);
  
  if (!article) {
    notFound();
  }

  const backlinks = await getBacklinks(article.id);

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Article Header */}
      <header className="w-full pt-12 pb-16 px-6 relative border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 font-medium transition-colors mb-8">
            <ArrowLeft size={16} /> Volver a investigaciones
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-100 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
               <Fingerprint size={16} className="text-emerald-500" />
               <span className="font-medium text-slate-300">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
               <Clock size={16} className="text-emerald-500" />
               <span>{article.date}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Reading Area */}
      <article className="w-full max-w-3xl mx-auto px-6 py-12">
        <div 
          className="prose prose-lg md:prose-xl prose-invert prose-headings:font-serif prose-headings:text-slate-100 prose-p:text-slate-300 prose-li:text-slate-300 max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />

        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-2">
            <span className="text-sm text-slate-500 mr-2 flex items-center">Etiquetas:</span>
            {article.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Organic Backlinks Section ("Relacionados") */}
      {backlinks.length > 0 && (
        <section className="w-full bg-[#030812] border-t border-slate-800 py-16 px-6 mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-emerald-500" size={28} />
              <h3 className="text-2xl font-bold text-slate-100">Estudios Relacionados</h3>
            </div>
            <p className="text-slate-400 mb-8 max-w-2xl">
              Explora otros artículos clínicos y conceptos que se vinculan naturalmente con lo que acabas de leer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {backlinks.map((link, idx) => (
                <Link href={`/n/${link.sourceId}`} key={`${link.sourceId}-${idx}`} className="group">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all">
                    <h4 className="font-bold text-slate-200 text-lg group-hover:text-emerald-400 transition-colors mb-2">
                      {link.sourceTitle}
                    </h4>
                    <p className="text-sm text-slate-400 border-l-2 border-emerald-900/50 pl-3 leading-relaxed">
                      "...{link.extract}..."
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
