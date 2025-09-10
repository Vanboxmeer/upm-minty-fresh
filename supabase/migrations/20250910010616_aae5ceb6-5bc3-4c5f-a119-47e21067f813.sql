-- Fix corrupted category data by restoring proper categories based on content analysis
UPDATE blog_posts 
SET categories = CASE 
  WHEN category IS NOT NULL AND category != 'Marketing' AND category != 'General' THEN ARRAY[category]
  WHEN category = 'Web3' THEN ARRAY['Web3']
  WHEN category = 'Top 10 Crypto' THEN ARRAY['Crypto', 'Top 10']
  WHEN title ILIKE '%AI%' OR title ILIKE '%artificial intelligence%' THEN ARRAY['AI', 'Web3'] 
  WHEN title ILIKE '%RWA%' OR title ILIKE '%Real Estate%' OR title ILIKE '%tokenization%' THEN ARRAY['RWA', 'Real Estate']
  WHEN title ILIKE '%DeFi%' OR title ILIKE '%decentralized finance%' THEN ARRAY['DeFi', 'Crypto']
  WHEN title ILIKE '%EVM%' OR title ILIKE '%Chain%' OR title ILIKE '%Ethereum%' THEN ARRAY['Crypto', 'Web3', 'EVM']
  WHEN title ILIKE '%Staking%' OR title ILIKE '%liquid staking%' THEN ARRAY['Crypto', 'Web3', 'Staking']  
  WHEN title ILIKE '%KYC%' OR title ILIKE '%Verification%' OR title ILIKE '%Zero Knowledge%' THEN ARRAY['Security', 'Web3']
  WHEN title ILIKE '%Interoperability%' OR title ILIKE '%Multichain%' OR title ILIKE '%Omniverse%' THEN ARRAY['Web3', 'Infrastructure']
  WHEN title ILIKE '%Storage%' OR title ILIKE '%Data%' OR title ILIKE '%Decentralized Storage%' THEN ARRAY['Web3', 'Infrastructure']
  WHEN title ILIKE '%Marketing%' OR title ILIKE '%Press Release%' OR title ILIKE '%Media%' THEN ARRAY['Marketing', 'PR']
  WHEN title ILIKE '%NFT%' OR title ILIKE '%GameFi%' OR title ILIKE '%Metaverse%' THEN ARRAY['NFT', 'GameFi', 'Web3']
  ELSE ARRAY['General']
END
WHERE categories = ARRAY['Marketing'] OR categories IS NULL OR array_length(categories, 1) IS NULL;