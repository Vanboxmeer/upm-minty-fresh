import { useEffect } from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const RSSFeed = () => {
  const { posts, fetchPublicPosts } = useBlogPosts();

  useEffect(() => {
    const generateRSSFeed = async () => {
      await fetchPublicPosts();
    };

    generateRSSFeed();
  }, [fetchPublicPosts]);

  useEffect(() => {
    if (posts.length > 0) {
      const rssXML = generateRSSXML(posts);
      
      // Set content type to RSS
      const blob = new Blob([rssXML], { type: 'application/rss+xml' });
      const url = URL.createObjectURL(blob);
      
      // Replace current page with RSS content
      window.location.replace(url);
    }
  }, [posts]);

  const generateRSSXML = (blogPosts: any[]) => {
    const siteUrl = window.location.origin;
    const now = new Date().toUTCString();
    
    const rssItems = blogPosts
      .slice(0, 20) // Limit to 20 most recent posts
      .map(post => {
        const postUrl = `${siteUrl}/blog/${post.slug}`;
        const pubDate = new Date(post.publish_date || post.created_at).toUTCString();
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.meta_description || post.excerpt || ''}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category || 'Digital Marketing'}]]></category>
      ${post.author ? `<author>${post.author}</author>` : ''}
    </item>`;
      })
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[UPM - Digital Marketing Blog]]></title>
    <description><![CDATA[Latest insights on digital marketing, press release distribution, and media collaborations from UPM]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>info@upm.com (UPM Team)</managingEditor>
    <webMaster>info@upm.com (UPM Team)</webMaster>
    <ttl>60</ttl>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>UPM Blog</title>
      <link>${siteUrl}</link>
    </image>${rssItems}
  </channel>
</rss>`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Generating RSS Feed...</h2>
        <p className="text-muted-foreground">Please wait while we generate your RSS feed.</p>
      </div>
    </div>
  );
};

export default RSSFeed;