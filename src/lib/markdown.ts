import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ArticleMetadata {
  id: string; // The filename without .md
  title: string;
  date: string;
  author: string;
  tags: string[];
  model3d?: string;
  evolutionData?: any[];
}

export interface Article extends ArticleMetadata {
  content: string;
  htmlContent: string;
}

export interface Backlink {
  sourceId: string;
  sourceTitle: string;
  extract: string; // A small snippet of text mentioning the link
}

/**
 * Normalizes a string to serve as an ID (slug)
 * Examples: "Hipertensión Arterial" -> "hipertension-arterial"
 */
export function normalizeId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/[^a-z0-9\-]/g, ''); // keep alphanumeric and dashes
}

export function getAllArticleIds(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getArticleData(id: string): Promise<Article | null> {
  // Since user might search by pure ID or we use normalized IDs, let's find the exact file
  const fullPath = path.join(contentDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Convert [[Link]] to <a href="/article/link" class="internal-link">Link</a>
  // We do a custom regex replace before remark
  let content = matterResult.content;
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;
  
  content = content.replace(wikiLinkRegex, (match, linkText) => {
    const targetId = normalizeId(linkText);
    return `<a href="/n/${targetId}" class="internal-link" data-target="${targetId}">${linkText}</a>`;
  });

  const processedContent = await remark()
    .use(html, { sanitize: false }) // enable raw HTML for our custom links
    .process(content);

  const htmlContent = processedContent.toString();

  return {
    id,
    title: matterResult.data.title || id,
    date: matterResult.data.date || '',
    author: matterResult.data.author || '',
    tags: matterResult.data.tags || [],
    model3d: matterResult.data.model3d || null,
    evolutionData: matterResult.data.evolutionData || null,
    content: matterResult.content,
    htmlContent,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const ids = getAllArticleIds();
  const articles: Article[] = [];
  for (const id of ids) {
    const article = await getArticleData(id);
    if (article) articles.push(article);
  }
  return articles;
}

export async function getBacklinks(targetId: string): Promise<Backlink[]> {
  const allArticles = await getAllArticles();
  const backlinks: Backlink[] = [];

  // The targetId is normalized. We want to find references in other files' contents.
  for (const article of allArticles) {
    if (article.id === targetId) continue;

    // Check if original content mentions [[TargetTitle]]
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    let match;
    
    // We split into lines to capture extract
    const lines = article.content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let hasMatch = false;
      
      const iterRegex = new RegExp('\\[\\[(.*?)\\]\\]', 'g');
      let localMatch;
      while ((localMatch = iterRegex.exec(line)) !== null) {
        const linkText = localMatch[1];
        if (normalizeId(linkText) === targetId) {
          hasMatch = true;
          break;
        }
      }

      if (hasMatch) {
         // Create a small snippet
         const extract = line.replace(/\[\[(.*?)\]\]/g, '$1'); // simplify display
         backlinks.push({
           sourceId: article.id,
           sourceTitle: article.title,
           extract: extract.trim()
         });
         break; // one backlink extraction per article is usually enough
      }
    }
  }

  return backlinks;
}

export interface GraphData {
  nodes: { id: string; name: string; val: number }[];
  links: { source: string; target: string }[];
}

export async function getGraphData(): Promise<GraphData> {
  const allArticles = await getAllArticles();
  const nodes = allArticles.map(article => ({
    id: article.id,
    name: article.title,
    val: 1 + (article.tags.length * 0.5) // size based on complexity/tags
  }));

  const links: { source: string; target: string }[] = [];
  
  // Map titles to IDs for easier wiki-linking
  const titleToIdMap: Record<string, string> = {};
  allArticles.forEach(a => {
    titleToIdMap[a.title.toLowerCase()] = a.id;
    titleToIdMap[normalizeId(a.title)] = a.id;
  });

  for (const article of allArticles) {
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    let match;
    while ((match = wikiLinkRegex.exec(article.content)) !== null) {
      const linkText = match[1];
      const normalizedLink = normalizeId(linkText);
      const targetId = titleToIdMap[linkText.toLowerCase()] || titleToIdMap[normalizedLink] || normalizedLink;
      
      // Only link if the target exists in our node list
      if (nodes.some(n => n.id === targetId)) {
        links.push({
          source: article.id,
          target: targetId
        });
      }
    }
  }

  return { nodes, links };
}
