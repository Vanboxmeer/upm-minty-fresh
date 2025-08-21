export const generateStructuredData = (type: 'organization' | 'website' | 'article', data: any) => {
  const baseUrl = 'https://unitedpress.media';
  
  const schemas: Record<string, any> = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "United Press Media",
      "alternateName": "UPM",
      "url": baseUrl,
      "logo": `${baseUrl}/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png`,
      "description": "Professional digital marketing services including press release distribution, KOL collaborations, and tier-1 media placements for Web3 and crypto projects.",
      "sameAs": [
        "https://twitter.com/unitedpressmedia",
        "https://linkedin.com/company/united-press-media"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "areaServed": "Worldwide",
      "serviceType": [
        "Digital Marketing",
        "Press Release Distribution",
        "KOL Collaborations",
        "Content Marketing",
        "Web3 Marketing"
      ]
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "UPM - United Press Media",
      "url": baseUrl,
      "description": "Growth platform built for digital marketing with press release distribution, KOL collaborations, and tier-1 media placements.",
      "publisher": {
        "@type": "Organization",
        "name": "United Press Media"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.excerpt || data.seo_description,
      "image": data.featured_image ? `${baseUrl}${data.featured_image}` : `${baseUrl}/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png`,
      "datePublished": data.publish_date || data.created_at,
      "dateModified": data.updated_at,
      "author": {
        "@type": "Person",
        "name": data.author || "UPM Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "United Press Media",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${data.slug}`
      },
      "articleSection": data.category || "Marketing",
      "keywords": data.seo_keywords?.join(', ') || "web3 marketing, crypto marketing, digital marketing"
    }
  };
  
  return schemas[type];
};

export const updateMetaTags = (config: {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
}) => {
  // Update title
  if (config.title) {
    document.title = config.title;
  }
  
  // Helper function to update or create meta tags
  const updateMetaTag = (selector: string, content: string, property?: string) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      if (property) {
        tag.setAttribute(property, selector.replace(/\[|\]|"/g, '').split('=')[1]);
      } else {
        tag.setAttribute('name', selector.replace(/\[|\]|"/g, '').split('=')[1]);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };
  
  // Update meta tags
  if (config.description) {
    updateMetaTag('meta[name="description"]', config.description);
  }
  
  if (config.keywords) {
    updateMetaTag('meta[name="keywords"]', config.keywords);
  }
  
  // Update Open Graph tags
  if (config.ogTitle) {
    updateMetaTag('meta[property="og:title"]', config.ogTitle, 'property');
  }
  
  if (config.ogDescription) {
    updateMetaTag('meta[property="og:description"]', config.ogDescription, 'property');
  }
  
  if (config.ogImage) {
    updateMetaTag('meta[property="og:image"]', config.ogImage, 'property');
  }
  
  if (config.ogType) {
    updateMetaTag('meta[property="og:type"]', config.ogType, 'property');
  }
  
  if (config.ogUrl) {
    updateMetaTag('meta[property="og:url"]', config.ogUrl, 'property');
  }
  
  // Update Twitter Card tags
  if (config.twitterCard) {
    updateMetaTag('meta[name="twitter:card"]', config.twitterCard);
  }
  
  if (config.twitterTitle) {
    updateMetaTag('meta[name="twitter:title"]', config.twitterTitle);
  }
  
  if (config.twitterDescription) {
    updateMetaTag('meta[name="twitter:description"]', config.twitterDescription);
  }
  
  if (config.twitterImage) {
    updateMetaTag('meta[name="twitter:image"]', config.twitterImage);
  }
  
  // Update canonical link
  if (config.canonical) {
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', config.canonical);
  }
  
  // Add structured data
  if (config.structuredData) {
    // Remove existing structured data
    const existingScript = document.head.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(config.structuredData);
    document.head.appendChild(script);
  }
};