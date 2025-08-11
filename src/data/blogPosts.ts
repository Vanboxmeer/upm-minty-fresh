import kolImg from "@/assets/blog/what-is-kol-in-crypto.jpg";
import b2bImg from "@/assets/blog/b2b-social-media-agencies.jpg";
import strategiesImg from "@/assets/blog/crypto-marketing-strategies.jpg";
import nftImg from "@/assets/blog/nft-development-agencies.jpg";
import hireKolImg from "@/assets/blog/hire-crypto-kols.jpg";
import mediaImg from "@/assets/blog/business-media-placements.jpg";
import tokenImg from "@/assets/blog/crypto-token-marketing.jpg";
import icoImg from "@/assets/blog/ico-marketing-guide.jpg";
import idoImg from "@/assets/blog/what-is-ido.jpg";
import influencerImg from "@/assets/blog/influencer-promotion.jpg";
import brandingImg from "@/assets/blog/web3-branding-agencies.jpg";
import igoImg from "@/assets/blog/initial-game-offering.jpg";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string; // tailwind bg-* token class kept for label background
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  content: string[]; // paragraphs
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "what-is-kol-in-crypto",
    title: "What Is KOL in Crypto?",
    description:
      "A clear, human-first guide to Key Opinion Leaders in Web3 and how brands effectively partner with them.",
    category: "CRYPTO",
    color: "bg-emerald-500",
    date: "March 15, 2024",
    readTime: "7 min read",
    image: kolImg,
    imageAlt: "Illustration of Web3 KOL network over a blockchain grid",
    content: [
      "KOL stands for Key Opinion Leader — trusted voices who shape narratives and influence decisions within a community. In crypto and Web3, KOLs are often founders, researchers, traders, creators, and media personalities who’ve built credibility over time.",
      "Unlike traditional influencers who prioritize reach, KOLs in crypto often excel at depth: they can explain complex topics, evaluate token designs, and provide nuanced takes that help communities make sense of fast-moving markets.",
      "When brands collaborate with KOLs, the goal isn’t just visibility; it’s alignment. The best partnerships happen when a project’s mission genuinely resonates with the KOL’s audience and values.",
      "Successful KOL campaigns typically include: (1) clear messaging and disclosures, (2) educational content like threads or videos, (3) community touchpoints such as AMAs or Spaces, and (4) measurable KPIs such as qualified sign-ups, waitlist growth, or developer interest.",
      "Avoid common pitfalls: over-indexing on vanity metrics, forcing scripted talking points, or rushing timelines. Crypto audiences value authenticity and transparency — shortcuts damage trust.",
      "Measure what matters: track community growth, engagement quality, on-site activation, and retention after the campaign. These reveal whether a KOL genuinely moved your audience toward your product, not just your social profiles.",
    ],
  },
  {
    id: 2,
    slug: "b2b-social-media-agencies",
    title: "B2B Social Media Agencies: What Works in Fintech and Web3",
    description:
      "Practical playbooks for B2B social in technical markets — from positioning to pipeline impact.",
    category: "B2B",
    color: "bg-orange-500",
    date: "March 12, 2024",
    readTime: "8 min read",
    image: b2bImg,
    imageAlt: "Laptop showing analytics dashboard and a content calendar",
    content: [
      "B2B social media in fintech and Web3 isn’t about memes or generic inspiration posts — it’s about clarity, credibility, and consistent delivery of value.",
      "Start with positioning: Who is your economic buyer? What painful problem are you uniquely qualified to solve? Your social strategy should ladder up to that narrative, not the other way around.",
      "Winning content formats include educational carousels, short explainer videos, founder POV threads, and case studies that highlight outcomes and technical depth. Don’t be afraid to niche down; specificity builds trust.",
      "Operationally, a strong B2B agency will implement an editorial calendar, approval workflows, and content atomization so flagship pieces fuel multiple channels. This keeps cost per asset low while maintaining quality.",
      "Measure pipeline impact, not just impressions: track demo requests, qualified leads, and sales cycle velocity from social-attributed touchpoints.",
      "Expectations to set early: legal/compliance review cadence, product sensitivity, and market timing. These prevent slowdowns once momentum builds.",
    ],
  },
  {
    id: 3,
    slug: "crypto-marketing-strategies",
    title: "Crypto Marketing Strategies That Actually Work in 2025",
    description:
      "A modern, ethical framework for growing crypto projects from zero to sustainable traction.",
    category: "CRYPTO",
    color: "bg-blue-600",
    date: "March 10, 2024",
    readTime: "9 min read",
    image: strategiesImg,
    imageAlt: "Abstract funnel made of blockchain nodes and growth arrows",
    content: [
      "Good crypto marketing starts with real product-market fit: identify a sharp use case and the community who cares the most. Then remove friction to trying the product.",
      "Prioritize education: publish explainers, visual walkthroughs, and developer guides. Pair this with public roadmaps and transparent updates to build long-term confidence.",
      "Distribution playbook: combine search-optimized content, targeted communities (Discords, Telegrams, Reddit), ethical KOL partnerships, and event presence both virtual and IRL.",
      "Momentum mechanics: reward contributions (docs, tutorials, bug reports), run time-bound challenges, and showcase community-built artifacts. Social proof compounds.",
      "Measure activation and retention, not just traffic. Use cohort views to understand which sources bring users who stick around and create value.",
      "Long-game mindset: regulations evolve, cycles turn. The projects that win keep building, keep communicating, and keep serving real users.",
    ],
  },
  {
    id: 4,
    slug: "nft-development-agencies",
    title: "NFT Development Agencies: How to Choose the Right Partner",
    description:
      "From smart contract rigor to creative direction — a checklist for successful NFT launches.",
    category: "NFT",
    color: "bg-red-500",
    date: "March 8, 2024",
    readTime: "6 min read",
    image: nftImg,
    imageAlt: "Digital gallery of framed NFT artworks with neon lighting",
    content: [
      "NFT programs combine code, culture, and community — so the agency you choose should excel across all three.",
      "Technical due diligence: audit experience, upgradeability strategy, royalty logic, and on-chain storage decisions. Ask for code samples and prior audits.",
      "Creative excellence: ensure brand fit, narrative strength, and visual consistency across mint site, metadata, and post-mint experiences.",
      "Go-to-market: whitelist mechanics, allowlist fairness, anti-bot protection, and post-mint utility roadmap. Over-communicate timelines and risks.",
      "Post-mint operations matter: floor price isn’t the product — community trust is. Plan ongoing content, events, and collector rewards.",
    ],
  },
  {
    id: 5,
    slug: "hire-crypto-kols",
    title: "How to Find and Hire Crypto KOLs (Without Wasting Budget)",
    description:
      "A step-by-step process to source, vet, brief, and measure KOL collaborations in Web3.",
    category: "CRYPTO",
    color: "bg-cyan-500",
    date: "March 5, 2024",
    readTime: "7 min read",
    image: hireKolImg,
    imageAlt: "Influencers recording content with engagement metrics overlays",
    content: [
      "Build a longlist using social listening, niche communities, and prior campaign case studies. Prioritize KOLs who already talk about your category.",
      "Vet for authenticity, audience overlap, and disclosure history. Request data: average engagement quality, completion rates for CTAs, and prior conversion outcomes.",
      "Brief for outcomes, not scripts: share value prop, key truths, and non-negotiables (e.g., no price predictions). Encourage creators to teach, not hype.",
      "Structure packages with a mix of evergreen content (tutorials), timely posts (announcements), and community activations (AMAs).",
      "Track sign-ups, activation events, and retention from unique links. Pay for performance when possible; renegotiate on learnings.",
    ],
  },
  {
    id: 6,
    slug: "business-media-placements",
    title: "Business Media Placements: From Press Release to Coverage",
    description:
      "How to turn announcements into credible stories across tiered media and vertical outlets.",
    category: "MEDIA",
    color: "bg-purple-600",
    date: "March 3, 2024",
    readTime: "6 min read",
    image: mediaImg,
    imageAlt: "Press release draft on a laptop next to digital newspapers",
    content: [
      "Great PR starts with newsworthiness: launches, partnerships, research, or milestones that matter to readers — not just your roadmap.",
      "Craft a tight narrative: why now, why this, and why it’s credible. Include third-party proof where possible.",
      "Sequence distribution: wire release for discoverability, targeted pitches for depth, and owned channels for amplification.",
      "Respect journalists’ time: supply assets, quotes, and embargo details clearly. Follow up with value, not pressure.",
      "After coverage lands, amplify across social, newsletters, and your website. PR compounds when it’s integrated with the rest of your marketing mix.",
    ],
  },
  {
    id: 7,
    slug: "crypto-token-marketing",
    title: "Crypto Token Marketing: A Complete, Ethical Guide",
    description:
      "From launch readiness to community-led growth — principles for sustainable token ecosystems.",
    category: "CRYPTO",
    color: "bg-indigo-600",
    date: "March 1, 2024",
    readTime: "9 min read",
    image: tokenImg,
    imageAlt: "Stylized token launch graphic with community icons and chart",
    content: [
      "Token marketing is inseparable from token design. Clarify the utility, emission schedule, and governance model before thinking distribution.",
      "Educate relentlessly: explain how value accrues, how contributors are rewarded, and what the roadmap unlocks for holders.",
      "Mix channels intentionally: developer relations, community incentives, partnerships, and transparent treasury communications.",
      "Guardrails: never make price claims, respect jurisdictional marketing limits, and maintain robust disclosures across all content.",
      "Success metrics: contributor growth, governance participation, protocol usage, and long-term retention — not short-term spikes.",
    ],
  },
  {
    id: 8,
    slug: "ico-marketing-guide",
    title: "ICO Marketing Guide: Playbooks, Risks, and Readiness",
    description:
      "Everything founders should know about legal, messaging, and growth for compliant ICOs.",
    category: "ICO",
    color: "bg-gray-600",
    date: "February 28, 2024",
    readTime: "8 min read",
    image: icoImg,
    imageAlt: "Compliance checklist next to a marketing roadmap on a screen",
    content: [
      "First, align with counsel on jurisdiction, investor eligibility, and disclosures. Compliance is the foundation, not the obstacle.",
      "Prepare education-first materials: litepaper, tokenomics explainer, risk factors, and FAQs. Clarity reduces friction and builds trust.",
      "Attract qualified interest via waitlists, webinars, community AMAs, and thought leadership — not indiscriminate ad blasts.",
      "Harden your infrastructure: load-tested sites, secure KYC/AML flows, and clear support channels to handle peak demand.",
      "Post-ICO, keep communicating progress and governance. The raise is a milestone, not the mission.",
    ],
  },
  {
    id: 9,
    slug: "what-is-ido",
    title: "What Is an IDO? A Plain-Language Introduction",
    description:
      "Understand Initial DEX Offerings, liquidity mechanics, and risks without the jargon.",
    category: "DEFI",
    color: "bg-violet-600",
    date: "February 25, 2024",
    readTime: "6 min read",
    image: idoImg,
    imageAlt: "Decentralized exchange interface with token swap arrows",
    content: [
      "An IDO (Initial DEX Offering) is a token sale conducted on a decentralized exchange. It enables projects to raise capital and bootstrap liquidity quickly.",
      "Core components: a launchpad or DEX, liquidity pools, and a pricing mechanism (often bonding curves or auctions).",
      "Benefits include open access, faster execution, and immediate trading. Risks include volatility, rug pulls, and smart contract vulnerabilities.",
      "Do your homework: audit status, team credibility, vesting schedules, and treasury transparency. Healthy communities welcome questions.",
      "If you participate, size positions responsibly and never invest based on hype. Education beats FOMO.",
    ],
  },
  {
    id: 10,
    slug: "influencer-promotion",
    title: "Influencer Promotion: Best Practices for Measurable ROI",
    description:
      "From creative briefs to tracking frameworks — how to make influencer campaigns work.",
    category: "INFLUENCER",
    color: "bg-pink-600",
    date: "February 22, 2024",
    readTime: "7 min read",
    image: influencerImg,
    imageAlt: "Creator desk setup with camera and engagement icons",
    content: [
      "Start with one simple question: what action do we want qualified viewers to take? Let that guide formats, CTAs, and measurement.",
      "Creative that teaches wins: demos, walkthroughs, and comparisons build trust and drive meaningful activation.",
      "Set clean tracking: unique links, landing pages, and attribution windows. Compare not just clicks, but post-click engagement and retention.",
      "Treat creators like partners: share context, provide feedback loops, and celebrate wins publicly. Long-term collabs outperform one-offs.",
      "Close the loop with sales and product teams so learnings improve the entire funnel, not just the top.",
    ],
  },
  {
    id: 11,
    slug: "web3-branding-agencies",
    title: "Web3 Branding Agencies: Building Trust in a Noisy Market",
    description:
      "Positioning, identity, and narrative systems that compound across every touchpoint.",
    category: "WEB3",
    color: "bg-teal-600",
    date: "February 20, 2024",
    readTime: "8 min read",
    image: brandingImg,
    imageAlt: "Futuristic logo and brand guidelines booklet on a holographic surface",
    content: [
      "Brand is the promise you keep. In Web3, where skepticism is healthy, clear positioning and consistent identity create the trust to try.",
      "A strong agency partner helps you define audience, promise, and proof — then translates that into a visual + verbal system that scales.",
      "Deliverables to expect: messaging hierarchy, logo and typography, color system with accessibility in mind, and templates for product, community, and PR.",
      "Measure brand lift via direct traffic, search demand, type-in queries, and qualitative signals from community and candidates.",
      "Great branding is invisible glue: it makes every message more believable and every experience more coherent.",
    ],
  },
  {
    id: 12,
    slug: "initial-game-offering",
    title: "Initial Game Offerings (IGOs): How Gaming Meets Web3",
    description:
      "A practical overview of IGOs, from token design to player-first adoption strategies.",
    category: "GAMING",
    color: "bg-rose-500",
    date: "February 18, 2024",
    readTime: "7 min read",
    image: igoImg,
    imageAlt: "Game controller beside a web3 launchpad interface",
    content: [
      "IGOs help gaming projects raise funds and build early communities. Success hinges on fun-first design — tokens can’t fix a game that isn’t enjoyable.",
      "Design the economy thoughtfully: sinks and sources, anti-bot mechanics, and fair player progression. Over-financialization erodes trust.",
      "Marketing that works: behind-the-scenes dev logs, playable demos, creator partnerships, and community tournaments.",
      "Post-launch, prioritize balance patches, new content, and open communication. Player trust is your moat.",
      "Measure health with retention cohorts, community-created content, and spending patterns that reflect enjoyment, not compulsion.",
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
