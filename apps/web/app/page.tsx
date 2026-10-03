"use client";

import MultimodalExplorer from "./MultimodalExplorer";
import IntelligenceGraph from "./IntelligenceGraph";
import ModelExplainer from "./ModelExplainer";

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /></a>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#graph">Follow a red flag</a></nav>
      <a className="nav-cta" href="#analysis">Try an example <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> FINANCIAL THREAT INTELLIGENCE</p>
        <h1>Financial threats leave patterns. <span>We connect them.</span></h1>
        <p className="intro">NIGRAH connects public reports to show how familiar warning signs fit together—and how financial scams change over time. Try a short example, then follow the clues through the model.</p>
        <div className="hero-actions"><a className="primary-btn" href="#analysis">Try a message example <span aria-hidden="true">→</span></a><a className="secondary-link" href="#how-it-works">See how it works</a></div>
        <p className="micro-trust"><span aria-hidden="true">⌁</span> Public evidence · Clear reasoning · Warning signs, not verdicts</p>
      </div>
      <MultimodalExplorer />
    </section>

    <ModelExplainer />

    <section className="platform-section" id="platform">
      <div className="section-heading"><p className="eyebrow">THE INTELLIGENCE MODEL</p><h2>From public evidence<br /><span>to connected warning signs.</span></h2><p className="section-lead">The message demo is one small window into a larger system: NIGRAH organizes reports, connects repeated tactics, and studies how scam methods shift over time.</p></div>
      <div className="capability-grid">
        <article><span className="capability-number">01</span><h3>Keep the source attached</h3><p>Record where each public report came from, when it appeared, and what it actually says.</p><small>PUBLIC REPORTS · TRACEABLE FACTS</small></article>
        <article><span className="capability-number">02</span><h3>Connect repeated tactics</h3><p>Link warning signs to the ways people are pressured, persuaded, or impersonated—and to scam types that use them.</p><small>WARNING SIGNS · TRICKS · SCAM TYPES</small></article>
        <article><span className="capability-number">03</span><h3>Watch for changes</h3><p>Compare reports over time and show what may be changing, along with how strong the supporting evidence is.</p><small>CHANGE OVER TIME · EVIDENCE · LIMITS</small></article>
      </div>
      <div className="catalog-strip"><div><span className="eyebrow">CURRENT MVP FRAMEWORK</span><p><b>25</b> signals <i /> <b>10</b> behavior patterns <i /> <b>15</b> scam families</p></div><span className="catalog-note">Defined by the approved MVP specification; this is not a live intelligence corpus.</span></div>
    </section>

    <IntelligenceGraph />

    <section className="method-section" id="method">
      <div className="section-heading"><p className="eyebrow">HOW WE BUILD IT</p><h2>Evidence first.<br /><span>Limits made clear.</span></h2></div>
      <div className="method-copy"><p>Every connection should lead back to a source. We check what the evidence supports, show what is still uncertain, and measure the model before making stronger claims.</p><ol><li><span>01</span><div><b>Source</b><small>Save the original link, date, and relevant facts.</small></div></li><li><span>02</span><div><b>Connect</b><small>Link those facts to warning signs, tactics, and scam types.</small></div></li><li><span>03</span><div><b>Check</b><small>Compare model suggestions with reviewed cases before claiming prediction.</small></div></li></ol></div>
    </section>

    <footer id="privacy"><div className="footer-brand"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /><span>Financial threat intelligence research and technology.</span></div><p>Optional AI analysis sends a sample to the configured provider only after consent. NIGRAH does not persist the sample; provider data-handling terms apply.</p></footer>
  </main>;
}
