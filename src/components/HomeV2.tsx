import { useEffect } from "react";

const FONTS = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap";

const HomeV2 = () => {
  useEffect(() => {
    if (document.querySelector('link[data-home-fonts]')) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONTS;
    l.setAttribute("data-home-fonts", "1");
    document.head.appendChild(l);
  }, []);

  return (
    <div style={{ "--accent": "#1F4BFF", "--ink": "#0E1726", "--muted": "#4A5568", "--line": "#DAD7CF", "--paper": "#F6F5F1", width: "100%", background: "#F6F5F1", color: "#0E1726", fontFamily: "'Inter', system-ui, sans-serif", fontSize: "16px", lineHeight: 1.55 } as React.CSSProperties}>

  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 72px", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center"}}>
    <div style={{flex: "1 1 480px", minWidth: "0"}}>
      <p style={{margin: "0 0 16px", fontSize: "14px", fontWeight: "600", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent)"}}>Media partner for crypto, Web3 and gaming</p>
      <h1 style={{margin: "0 0 24px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "56px", lineHeight: "1.05", letterSpacing: "-.02em"}}>Get your project in front of people who actually care.</h1>
      <p style={{margin: "0 0 32px", fontSize: "19px", color: "var(--muted)", maxWidth: "560px"}}>Creator campaigns, press releases and media features for projects that need real attention, run through one shared tracker so you always see what is moving.</p>
      <div style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
        <a href="https://unitedpress.media/contact" style={{background: "var(--accent)", color: "#fff", padding: "16px 28px", borderRadius: "8px", fontWeight: "600"}}>Start a campaign</a>
        <a href="https://unitedpress.media/services" style={{border: "1.5px solid var(--ink)", padding: "14px 26px", borderRadius: "8px", fontWeight: "600"}}>See services</a>
      </div>
      <p style={{margin: "20px 0 0", fontSize: "14px", color: "var(--muted)"}}>No minimum budget. Campaigns from around $5k a month are welcome.</p>
    </div>
    <div style={{flex: "1 1 380px", minWidth: "0", background: "var(--ink)", color: "#fff", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "20px"}}>
      <p style={{margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: ".08em", textTransform: "uppercase", color: "#A9BBFF"}}>How a campaign runs</p>
      <div style={{display: "flex", gap: "16px", alignItems: "flex-start"}}><span style={{fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", color: "#A9BBFF", minWidth: "28px"}}>1</span><div><strong style={{fontWeight: "600"}}>Brief</strong><div style={{color: "#C9D1E0", fontSize: "15px"}}>You tell us the project, the audience and the budget.</div></div></div>
      <div style={{display: "flex", gap: "16px", alignItems: "flex-start"}}><span style={{fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", color: "#A9BBFF", minWidth: "28px"}}>2</span><div><strong style={{fontWeight: "600"}}>Shortlist</strong><div style={{color: "#C9D1E0", fontSize: "15px"}}>We suggest creators and outlets in your campaign sheet.</div></div></div>
      <div style={{display: "flex", gap: "16px", alignItems: "flex-start"}}><span style={{fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", color: "#A9BBFF", minWidth: "28px"}}>3</span><div><strong style={{fontWeight: "600"}}>You approve</strong><div style={{color: "#C9D1E0", fontSize: "15px"}}>Nothing is booked or paid without your approval.</div></div></div>
      <div style={{display: "flex", gap: "16px", alignItems: "flex-start"}}><span style={{fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", color: "#A9BBFF", minWidth: "28px"}}>4</span><div><strong style={{fontWeight: "600"}}>Track</strong><div style={{color: "#C9D1E0", fontSize: "15px"}}>Follow the status of every placement in the same sheet.</div></div></div>
    </div>
  </section>
  <section style={{background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)"}}>
    <div style={{maxWidth: "1200px", margin: "0 auto", padding: "72px 24px"}}>
      <h2 style={{margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "38px", letterSpacing: "-.01em"}}>What we do</h2>
      <p style={{margin: "0 0 40px", color: "var(--muted)", fontSize: "18px", maxWidth: "640px"}}>Packages are always custom. Pick from our deck or ask for something outside it; we are not tied to any set network.</p>
      <div style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
        <div style={{flex: "1 1 250px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "28px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <h3 style={{margin: "0", fontFamily: "'Space Grotesk',sans-serif", fontSize: "21px"}}>Creator and KOL campaigns</h3>
          <p style={{margin: "0", color: "var(--muted)"}}>Influencers and key voices with a direct line to your audience, found and approached for you.</p>
        </div>
        <div style={{flex: "1 1 250px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "28px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <h3 style={{margin: "0", fontFamily: "'Space Grotesk',sans-serif", fontSize: "21px"}}>Press releases</h3>
          <p style={{margin: "0", color: "var(--muted)"}}>Milestones and announcements distributed to keep investors and your community informed.</p>
        </div>
        <div style={{flex: "1 1 250px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "28px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <h3 style={{margin: "0", fontFamily: "'Space Grotesk',sans-serif", fontSize: "21px"}}>Features, interviews, Spaces</h3>
          <p style={{margin: "0", color: "var(--muted)"}}>Media features, podcast and show guest spots, and community events with your team on stage.</p>
        </div>
        <div style={{flex: "1 1 250px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "28px", display: "flex", flexDirection: "column", gap: "10px"}}>
          <h3 style={{margin: "0", fontFamily: "'Space Grotesk',sans-serif", fontSize: "21px"}}>Apps and AI automations</h3>
          <p style={{margin: "0", color: "var(--muted)"}}>Agentic development that builds apps, internal tools and automations faster and for less.</p>
        </div>
      </div>
    </div>
  </section>
  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "72px 24px", display: "flex", flexWrap: "wrap", gap: "48px"}}>
    <div style={{flex: "1 1 360px", minWidth: "0"}}>
      <h2 style={{margin: "0 0 16px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "38px", letterSpacing: "-.01em"}}>An agency you can audit</h2>
      <p style={{margin: "0", color: "var(--muted)", fontSize: "18px"}}>Most agencies hide how they earn. We tell you, and we show you the work as it happens.</p>
    </div>
    <div style={{flex: "2 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px"}}>
      <div style={{borderBottom: "1px solid var(--line)", paddingBottom: "24px"}}><strong style={{fontSize: "18px", fontWeight: "600"}}>Rates on your side</strong><p style={{margin: "6px 0 0", color: "var(--muted)"}}>On Silver and Gold, the plan fee is the whole fee. We never mark up a creator's quote.</p></div>
      <div style={{borderBottom: "1px solid var(--line)", paddingBottom: "24px"}}><strong style={{fontSize: "18px", fontWeight: "600"}}>Free and paid, worked together</strong><p style={{margin: "6px 0 0", color: "var(--muted)"}}>Every shortlist is asked both ways. Free coverage is an attempt, not a promise, so you may get none; paid placements are agreed in advance.</p></div>
      <div><strong style={{fontSize: "18px", fontWeight: "600"}}>Every conversation visible</strong><p style={{margin: "6px 0 0", color: "var(--muted)"}}>Outreach, replies, quotes and next steps sit in your campaign tracker, including the ones that have gone quiet.</p></div>
    </div>
  </section>
  <section style={{background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)"}}>
    <div style={{maxWidth: "1200px", margin: "0 auto", padding: "72px 24px"}}>
      <h2 style={{margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "38px", letterSpacing: "-.01em"}}>Two plans</h2>
      <p style={{margin: "0 0 40px", color: "var(--muted)", fontSize: "18px"}}>Campaign spend, coverage costs and fees are drawn from a funding wallet in USDC or USDT.</p>
      <div style={{display: "flex", flexWrap: "wrap", gap: "24px"}}>
        <div style={{flex: "1 1 320px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "32px"}}>
          <h3 style={{margin: "0 0 4px", fontFamily: "'Space Grotesk',sans-serif", fontSize: "24px"}}>Silver</h3>
          <p style={{margin: "0 0 20px", fontSize: "28px", fontWeight: "600"}}>$250 <span style={{fontSize: "16px", fontWeight: "400", color: "var(--muted)"}}>per month + 3.45% of campaign spend</span></p>
          <p style={{margin: "0", color: "var(--muted)"}}>Campaign tracker, shortlists and outreach. Includes 15 free-coverage requests a month.</p>
        </div>
        <div style={{flex: "1 1 320px", minWidth: "0", border: "2px solid var(--accent)", borderRadius: "12px", padding: "32px"}}>
          <h3 style={{margin: "0 0 4px", fontFamily: "'Space Grotesk',sans-serif", fontSize: "24px"}}>Gold</h3>
          <p style={{margin: "0 0 20px", fontSize: "28px", fontWeight: "600"}}>$995 <span style={{fontSize: "16px", fontWeight: "400", color: "var(--muted)"}}>per month + 1% of campaign spend</span></p>
          <p style={{margin: "0", color: "var(--muted)"}}>Everything in Silver with a lower share of spend. Includes 50 free-coverage requests a month.</p>
        </div>
      </div>
      <p style={{margin: "24px 0 0", color: "var(--muted)", fontSize: "15px"}}>Extra free-coverage requests are $20 each. Paid-placement outreach is never capped.</p>
    </div>
  </section>
  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "72px 24px"}}>
    <h2 style={{margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "38px", letterSpacing: "-.01em"}}>The tools behind it</h2>
    <p style={{margin: "0 0 40px", color: "var(--muted)", fontSize: "18px", maxWidth: "640px"}}>The same software we use is built into one app.</p>
    <div style={{display: "flex", flexWrap: "wrap", gap: "24px"}}>
      <div style={{flex: "1 1 360px", minWidth: "0", background: "var(--ink)", color: "#fff", borderRadius: "16px", padding: "36px"}}>
        <h3 style={{margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", fontSize: "26px"}}>Fullmedia Alchemist</h3>
        <p style={{margin: "0 0 20px", color: "#C9D1E0"}}>Turns one idea into posts for each platform, with real generated images, ready for your approval.</p>
        <a href="https://www.fullmediaalchemist.com/" style={{color: "#A9BBFF", fontWeight: "600", textDecoration: "underline"}}>Visit Alchemist</a>
      </div>
      <div style={{flex: "1 1 360px", minWidth: "0", background: "var(--ink)", color: "#fff", borderRadius: "16px", padding: "36px"}}>
        <h3 style={{margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", fontSize: "26px"}}>Alchemist Reach</h3>
        <p style={{margin: "0 0 20px", color: "#C9D1E0"}}>Outreach workbench for creators and outlets: research, drafts, follow-ups and a record of every reply and rate.</p>
        <a href="https://unitedpress.media/alchemist-reach" style={{color: "#A9BBFF", fontWeight: "600", textDecoration: "underline"}}>See Alchemist Reach</a>
      </div>
    </div>
  </section>
  <section style={{background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)"}}>
    <div style={{maxWidth: "1200px", margin: "0 auto", padding: "56px 24px", textAlign: "center"}}>
      <p style={{margin: "0 0 24px", fontSize: "14px", fontWeight: "600", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)"}}>Projects we have worked with</p>
      <div style={{display: "flex", flexWrap: "wrap", gap: "16px 48px", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "22px"}}>
        <span>Unicrypt</span><span>Bittensor</span><span>eMoney</span><span>Doge Dash</span><span>Umbrella</span><span>MetalCore</span>
      </div>
    </div>
  </section>
  <section style={{maxWidth: "1200px", margin: "0 auto", padding: "72px 24px"}}>
    <div style={{display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px"}}>
      <h2 style={{margin: "0", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "38px", letterSpacing: "-.01em"}}>From the blog</h2>
      <a href="https://unitedpress.media/blog" className="lnk" style={{fontWeight: "600"}}>All posts</a>
    </div>
    <div style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
      <a href="https://unitedpress.media/blog/how-to-brief-a-crypto-kol-without-sounding-like-an-ad" style={{flex: "1 1 260px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "24px", background: "#fff"}}><div style={{fontSize: "13px", fontWeight: "600", color: "var(--accent)"}}>MARKETING</div><div style={{marginTop: "8px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.25"}}>How to brief a crypto KOL so the post does not read like an ad</div></a>
      <a href="https://unitedpress.media/blog/free-coverage-vs-paid-placement-crypto-project-expectations" style={{flex: "1 1 260px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "24px", background: "#fff"}}><div style={{fontSize: "13px", fontWeight: "600", color: "var(--accent)"}}>MARKETING</div><div style={{marginTop: "8px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.25"}}>Free coverage or paid placement? What a crypto project should expect</div></a>
      <a href="https://unitedpress.media/blog/what-to-send-gaming-creators-before-they-say-yes" style={{flex: "1 1 260px", minWidth: "0", border: "1px solid var(--line)", borderRadius: "12px", padding: "24px", background: "#fff"}}><div style={{fontSize: "13px", fontWeight: "600", color: "var(--accent)"}}>GAMING</div><div style={{marginTop: "8px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.25"}}>What to send gaming creators before they say yes</div></a>
    </div>
  </section>
  <section style={{background: "var(--ink)", color: "#fff"}}>
    <div style={{maxWidth: "1200px", margin: "0 auto", padding: "72px 24px", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between"}}>
      <div style={{flex: "1 1 420px", minWidth: "0"}}>
        <h2 style={{margin: "0 0 12px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: "700", fontSize: "38px", letterSpacing: "-.01em"}}>Tell us what you are launching</h2>
        <p style={{margin: "0", color: "#C9D1E0", fontSize: "18px"}}>A twenty-minute conversation, not a proposal. We will say plainly whether we fit.</p>
      </div>
      <div style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
        <a href="https://unitedpress.media/contact" style={{background: "#fff", color: "var(--ink)", padding: "16px 28px", borderRadius: "8px", fontWeight: "600"}}>Contact us</a>
        <a href="https://t.me/unitedpressmedia" style={{border: "1.5px solid #fff", padding: "14px 26px", borderRadius: "8px", fontWeight: "600"}}>Telegram</a>
      </div>
    </div>
  </section>
  
    </div>
  );
};

export default HomeV2;
