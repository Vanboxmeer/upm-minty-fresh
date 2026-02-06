import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Badge } from '@/components/ui/badge';

export interface SocialEmbed {
  platform: string;
  embed_code: string;
}

interface SocialEmbedsRendererProps {
  embeds: SocialEmbed[];
  className?: string;
}

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  x: 'X (Twitter)',
  youtube: 'YouTube',
  other: 'Social',
};

const platformColors: Record<string, string> = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  tiktok: 'bg-black text-white',
  x: 'bg-foreground text-background',
  youtube: 'bg-red-600 text-white',
  other: 'bg-muted text-muted-foreground',
};

export const SocialEmbedsRenderer = ({ embeds, className = '' }: SocialEmbedsRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || embeds.length === 0) return;

    // Load Instagram embed script
    const hasInstagram = embeds.some(e => e.platform === 'instagram');
    if (hasInstagram) {
      loadScript('https://www.instagram.com/embed.js', () => {
        (window as any).instgrm?.Embeds?.process();
      });
    }

    // Load TikTok embed script
    const hasTikTok = embeds.some(e => e.platform === 'tiktok');
    if (hasTikTok) {
      loadScript('https://www.tiktok.com/embed.js');
    }

    // Load Twitter/X embed script
    const hasX = embeds.some(e => e.platform === 'x');
    if (hasX) {
      loadScript('https://platform.twitter.com/widgets.js', () => {
        (window as any).twttr?.widgets?.load(containerRef.current);
      });
    }
  }, [embeds]);

  if (!embeds || embeds.length === 0) return null;

  return (
    <div ref={containerRef} className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold">📱 From Our Socials</h3>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {embeds.map((embed, index) => {
          const sanitized = DOMPurify.sanitize(embed.embed_code, {
            ADD_TAGS: ['iframe', 'blockquote', 'script'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'data-instgrm-permalink', 'data-instgrm-version', 'cite', 'data-video-id', 'data-embed-from'],
            ALLOW_UNKNOWN_PROTOCOLS: true,
          });

          return (
            <div key={index} className="rounded-lg border bg-card overflow-hidden">
              <div className="px-4 py-2 border-b flex items-center gap-2">
                <Badge className={platformColors[embed.platform] || platformColors.other}>
                  {platformLabels[embed.platform] || embed.platform}
                </Badge>
              </div>
              <div
                className="p-4 [&>blockquote]:mx-auto [&>iframe]:mx-auto [&>div]:mx-auto max-w-full overflow-hidden"
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

function loadScript(src: string, onLoad?: () => void) {
  // Check if script already exists
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    onLoad?.();
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  if (onLoad) {
    script.onload = onLoad;
  }
  document.body.appendChild(script);
}
