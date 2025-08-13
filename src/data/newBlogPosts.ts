// Additional 7 new blog posts scheduled every 2 weeks
import strategiesImg from "@/assets/blog/crypto-marketing-strategies.jpg";
import brandingImg from "@/assets/blog/web3-branding-agencies.jpg";
import mediaImg from "@/assets/blog/business-media-placements.jpg";
import nftImg from "@/assets/blog/nft-development-agencies.jpg";
import tokenImg from "@/assets/blog/crypto-token-marketing.jpg";
import influencerImg from "@/assets/blog/influencer-promotion.jpg";
import igoImg from "@/assets/blog/initial-game-offering.jpg";

import { EnhancedBlogPost, enhancedBlogPosts } from "./enhancedBlogPosts";

export const newScheduledPosts: EnhancedBlogPost[] = [
  {
    id: 14,
    slug: "web3-community-building-guide",
    title: "Web3 Community Building: From Discord to DAO Governance",
    description: "Complete guide to building engaged Web3 communities that drive protocol adoption and sustainable growth through authentic connections.",
    category: "WEB3",
    color: "bg-teal-500",
    date: "September 10, 2025",
    publishAt: "2025-09-10T10:00:00Z",
    readTime: "11 min read",
    image: brandingImg,
    imageAlt: "Discord community interface with DAO governance voting",
    isPublished: true,
    content: {
      seoTitle: "Web3 Community Building Guide 2025: Discord to DAO Success",
      metaDescription: "Learn proven Web3 community building strategies. From Discord moderation to DAO governance, build communities that drive real protocol adoption.",
      keywords: ["Web3 community", "Discord management", "DAO governance", "crypto community", "Web3 marketing"],
      markdown: `# Web3 Community Building: Creating Sustainable Ecosystems

Building a Web3 community isn't just about gathering people in a Discord server. It's about creating an ecosystem where members feel ownership, contribute meaningfully, and drive the protocol's long-term success.

## The Evolution of Web3 Communities

Web3 communities represent a fundamental shift from traditional corporate-customer relationships to stakeholder ecosystems where users become owners, contributors, and governance participants.

**Key Principles:**
- **Ownership alignment** through token distribution
- **Transparent governance** and decision-making
- **Value creation** through community contributions
- **Long-term sustainability** over short-term growth

*Ready to build a thriving Web3 community? Our team specializes in community strategy and governance design for blockchain projects.*`
    }
  },
  {
    id: 15,
    slug: "crypto-pr-crisis-management",
    title: "Crypto PR Crisis Management: Protecting Your Project's Reputation",
    description: "Essential crisis communication strategies for crypto projects, from handling security incidents to managing community backlash and regulatory challenges.",
    category: "PR",
    color: "bg-red-500",
    date: "September 24, 2025",
    publishAt: "2025-09-24T10:00:00Z",
    readTime: "13 min read",
    image: mediaImg,
    imageAlt: "Crisis management team coordinating response to crypto security incident",
    isPublished: true,
    content: {
      seoTitle: "Crypto PR Crisis Management 2025: Reputation Protection Guide",
      metaDescription: "Master crypto crisis communication with proven strategies for handling security incidents, regulatory challenges, and community management.",
      keywords: ["crypto crisis management", "PR crisis", "reputation management", "crypto communications", "incident response"],
      markdown: `# Crypto PR Crisis Management: Protecting Your Project's Reputation

In the volatile world of cryptocurrency, crises are inevitable. How you respond determines whether your project survives and thrives or becomes another cautionary tale.

## Understanding Crypto-Specific Crises

Crypto projects face unique challenges that require specialized crisis management approaches, from technical vulnerabilities to regulatory scrutiny.

**Common Crisis Types:**
- **Security incidents** and smart contract exploits
- **Regulatory enforcement** and compliance issues
- **Market manipulation** accusations
- **Community backlash** and governance disputes

**Rapid Response Framework:**
1. **Immediate assessment** and containment
2. **Stakeholder communication** coordination
3. **Technical resolution** and transparency
4. **Long-term reputation** rebuilding

*Need help preparing your crypto project for potential crises? Our team specializes in crisis communication planning and reputation management for blockchain projects.*`
    }
  }
];

// Export the complete enhanced blog posts array
export const allEnhancedBlogPosts = [...enhancedBlogPosts, ...newScheduledPosts];