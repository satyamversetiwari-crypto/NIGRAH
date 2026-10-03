"use client";

import MultimodalExplorer from "./MultimodalExplorer";
import IntelligenceGraph from "./IntelligenceGraph";
import ModelExplainer from "./ModelExplainer";

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /></a>
      <nav aria-label="Main navigation"><a href="#platform">Intelligence model</a><a href="#how-it-works">How it works</a><a href="#analysis">Explore a sample</a></nav>
      <a className="nav-cta" href="#how-it-works">See the model in action <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> FINANCIAL THREAT INTELLIGENCE</p>
        <h1>Financial threats leave patterns. <span>We connect them.</span></h1>
        <p className="intro">NIGRAH turns scattered public reports into traceable signals, behaviors, and relationships—helping people understand how financial threats take shape and evolve.</p>
        <div className="hero-actions"><a className="primary-btn" href="#how-it-works">See how intelligence connects <span aria-hidden="true">→</span></a><a className="secondary-link" href="#platform">Explore the intelligence model</a></div>
        <p className="micro-trust"><span aria-hidden="true">⌁</span> Traceable sources · Connected behavior · Uncertainty made visible</p>
      </div>
      <div className="intelligence-visual" aria-label="Conceptual NIGRAH intelligence model">
        <div className="visual-topline"><span>INTELLIGENCE MODEL</span><span className="model-status"><i /> IN DEVELOPMENT</span></div>
        <div className="model-flow">
          <article className="model-node source-node"><span className="node-index">01 / INPUT</span><b>Public evidence</b><small>Sources · reports · events</small></article>
          <div className="flow-line"><i /></div>
          <article className="model-node pattern-node"><span className="node-index">02 / STRUCTURE</span><b>Signals &amp; patterns</b><small>Behavior · tactics · links</small></article>
          <div className="flow-line"><i /></div>
          <article className="model-node forecast-node"><span className="node-index">03 / INFERENCE</span><b>Emerging threats</b><small>Hypotheses with evidence</small></article>
        </div>
        <div className="visual-foot"><span>Source provenance</span><span>↔</span><span>Explainable relationships</span><span>↔</span><span>Measured uncertainty</span></div>
        <p className="visual-caption">A simplified view of the research process. NIGRAH is building toward evidence-linked intelligence, not a live threat feed.</p>
      </div>
    </section>

    <ModelExplainer />

    <section className="platform-section" id="platform">
      <div className="section-heading"><p className="eyebrow">THE INTELLIGENCE MODEL</p><h2>Build the picture<br /><span>one verified connection at a time.</span></h2><p className="section-lead">A message check is one way to explore the system. The core work is collecting trustworthy evidence, structuring behavior, and studying how patterns change.</p></div>
      <div className="capability-grid">
        <article><span className="capability-number">01</span><h3>Acquire with provenance</h3><p>Collect relevant public evidence with its source, date, geography, and quality intact.</p><small>PUBLIC SOURCES · TRACEABLE RECORDS</small></article>
        <article><span className="capability-number">02</span><h3>Structure behavior</h3><p>Normalize signals and manipulation patterns, then connect them to scam families and related entities.</p><small>SIGNALS · PATTERNS · KNOWLEDGE GRAPH</small></article>
        <article><span className="capability-number">03</span><h3>Study what may emerge</h3><p>Compare changes over time and surface evidence-backed threat hypotheses with uncertainty visible.</p><small>TEMPORAL CHANGE · SIMILARITY · UNCERTAINTY</small></article>
      </div>
      <div className="catalog-strip"><div><span className="eyebrow">CURRENT MVP FRAMEWORK</span><p><b>25</b> signals <i /> <b>10</b> behavior patterns <i /> <b>15</b> scam families</p></div><span className="catalog-note">Defined by the approved MVP specification; this is not a live intelligence corpus.</span></div>
    </section>

    <IntelligenceGraph />

    <section className="method-section" id="method">
      <div className="section-heading"><p className="eyebrow">HOW WE ARE BUILDING IT</p><h2>Evidence first.<br /><span>Inference with limits.</span></h2></div>
      <div className="method-copy"><p>Reliable prediction starts with a reliable evidence pipeline. Each record needs provenance and review; each analytical layer needs a clear definition; each prediction needs a measurable evaluation method.</p><ol><li><span>01</span><div><b>Source</b><small>Record where evidence came from and when it was observed.</small></div></li><li><span>02</span><div><b>Connect</b><small>Map evidence to signals, patterns, families, and relationships.</small></div></li><li><span>03</span><div><b>Evaluate</b><small>Measure performance against reviewed examples before making predictive claims.</small></div></li></ol></div>
    </section>

    <MultimodalExplorer />
    <footer id="privacy"><div className="footer-brand"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /><span>Financial threat intelligence research and technology.</span></div><p>Local text preview stays in your browser. Optional AI analysis sends a sample to the configured provider only after consent and does not save the submitted content.</p></footer>
  </main>;
}
