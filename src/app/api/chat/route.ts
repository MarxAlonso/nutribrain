import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/markdown';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ reply: "Por favor, escribe una pregunta válida." }, { status: 400 });
    }

    const query = message.toLowerCase();
    const articles = await getAllArticles();

    // Palabras clave extraídas de la pregunta del usuario (ignorando palabras comunes)
    const stopWords = ['el', 'la', 'los', 'las', 'un', 'una', 'qué', 'que', 'como', 'cómo', 'por', 'para', 'con', 'de', 'del', 'a', 'y', 'o', 'es', 'son', 'me', 'dime', 'sobre', 'al'];
    const keywords = query.split(/\s+/).filter(word => !stopWords.includes(word) && word.length > 2);

    let foundKnowledge = false;
    let reply = "He revisado mis neuronas de conocimiento, pero no encontré información exacta sobre eso. ¿Puedes intentar buscar con otras palabras o seleccionar alguna categoría?\n\n";
    let relatedLinks: { title: string; id: string }[] = [];
    
    // Algoritmo simple de coincidencia por artículo (Títulos, Tags, Contenido)
    const matches = articles.map(article => {
      let score = 0;
      let matchedExtract = "";

      const lowerTitle = article.title.toLowerCase();
      const lowerTags = article.tags.map(t => t.toLowerCase());
      
      keywords.forEach(kw => {
        if (lowerTitle.includes(kw)) score += 5; // Alta prioridad al título
        if (lowerTags.includes(kw)) score += 3; // Media prioridad a las etiquetas
      });

      // Buscar en el texto
      if (score === 0) {
        const sentences = article.content.split(/[.!?\n]/);
        for (let sentence of sentences) {
          const lowerSentence = sentence.toLowerCase();
          if (keywords.some(kw => lowerSentence.includes(kw))) {
             score += 1;
             matchedExtract = sentence.trim();
             break;
          }
        }
      }

      return { article, score, matchedExtract };
    });

    // Ordenar resultados de mayor a menor score
    const topMatches = matches.filter(m => m.score > 0).sort((a, b) => b.score - a.score);

    if (topMatches.length > 0) {
      foundKnowledge = true;
      const bestMatch = topMatches[0];
      
      reply = `He encontrado información sobre **${bestMatch.article.title}** que podría ayudarte.\n\n`;
      
      if (bestMatch.matchedExtract) {
        // Limpiamos los bold y links internos del texto solo para lectura de chat
        const cleanExtract = bestMatch.matchedExtract.replace(/\[\[(.*?)\]\]/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1');
        reply += `> "${cleanExtract}..."\n\n`;
      }
      
      reply += `Te recomiendo leer el artículo completo aquí.`;

      // Recopilar enlaces sugeridos adicionales
      relatedLinks = topMatches.slice(0, 3).map(m => ({
        title: m.article.title, 
        id: m.article.id 
      }));
    }

    // Retorno estructural para que el Frontend lo renderice bonito
    return NextResponse.json({
      reply,
      found: foundKnowledge,
      suggestions: relatedLinks
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ reply: "Lo siento, tuve un corto circuito en mis neuronas. Intenta de nuevo." }, { status: 500 });
  }
}
