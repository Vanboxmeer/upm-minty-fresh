import { useMemo } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const headings = useMemo<Heading[]>(() => {
    const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
    const results: Heading[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[2].replace(/<[^>]+>/g, '').trim();
      if (text) {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        results.push({ id, text, level: parseInt(match[1]) });
      }
    }
    return results;
  }, [content]);

  if (headings.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="space-y-1">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Contents</h4>
      {headings.map((h) => (
        <button
          key={h.id}
          onClick={() => scrollTo(h.id)}
          className={`block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors truncate ${
            h.level === 3 ? 'pl-4' : ''
          }`}
        >
          {h.text}
        </button>
      ))}
    </nav>
  );
};

export default TableOfContents;
