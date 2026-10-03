"use client";

import MultimodalExplorer from "./MultimodalExplorer";
import StoryExperience from "./StoryExperience";
import RedFlagGallery from "./RedFlagGallery";
import IntelligenceGraph from "./IntelligenceGraph";
import HonestNote from "./HonestNote";
import { patterns, scamFamilies, signals } from "../lib/intelligence";

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /></a>
      <nav aria-label="Main navigation"><a href="#story">See how it works</a><a href="#red-flags">Common warning signs</a><a href="#under-the-hood">Under the hood</a></nav>
      <a className="nav-cta" href="#analysis">Explore a sample <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> FINANCIAL THREAT INTELLIGENCE</p>
        <h1>Financial threats leave patterns. <span>We connect them.</span></h1>
        <p className="intro">NIGRAH organizes public evidence into connected warning signs and behaviors, helping people study how financial threats take shape and change.</p>
        <a className="hero-story-link" href="#story">See a 60-second practice story <span aria-hidden="true">↓</span></a>
        <p className="micro-trust"><span aria-hidden="true">⌁</span> Evidence first · Clear reasoning · Limits shown</p>
      </div>
      <MultimodalExplorer />
    </section>

    <StoryExperience />
    <RedFlagGallery />

    <section className="action-section" aria-labelledby="action-title">
      <p className="eyebrow">IF A MESSAGE FEELS WRONG</p><h2 id="action-title">Pause. Verify. Report.</h2>
      <div className="action-grid"><article><span>01</span><h3>Pause</h3><p>Do not rush to pay, share an OTP, or send documents.</p></article><article><span>02</span><h3>Verify</h3><p>Check the person or firm through an official source before acting.</p><a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes" target="_blank" rel="noreferrer">Search SEBI intermediaries ↗</a></article><article><span>03</span><h3>Report</h3><p>Lost money? Contact India’s cybercrime helpline. Suspect a fraud message or call? Report it to Chakshu.</p><div className="report-links"><a href="tel:1930">Call 1930</a><a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">Cybercrime portal ↗</a><a href="https://sancharsaathi.gov.in/sfc/" target="_blank" rel="noreferrer">Chakshu ↗</a></div></article></div>
    </section>

    <section className="trust-strip" aria-label="NIGRAH principles"><div><span aria-hidden="true">▤</span><p><b>Public sources</b><small>Evidence has a source to inspect.</small></p></div><div><span aria-hidden="true">⌕</span><p><b>Reasoning shown</b><small>See which phrases and links appeared.</small></p></div><div><span aria-hidden="true">◇</span><p><b>Limits stay visible</b><small>Warning signs are not verdicts.</small></p></div></section>

    <details className="under-hood" id="under-the-hood"><summary>Explore how NIGRAH is built</summary><div className="under-hood-content">
      <section className="platform-section" id="platform"><div className="section-heading"><p className="eyebrow">THE INTELLIGENCE MODEL</p><h2>From public evidence<br/><span>to connected warning signs.</span></h2><p className="section-lead">NIGRAH collects public reports, maps observed clues to recurring behaviors, and compares related scam structures. The pilot does not yet predict emerging threats.</p></div>
        <div className="capability-grid"><article><span className="capability-number">01</span><h3>Keep the source attached</h3><p>Record where a public report came from, when it appeared, and what it says.</p><small>PUBLIC REPORTS · TRACEABLE FACTS</small></article><article><span className="capability-number">02</span><h3>Connect repeated tactics</h3><p>Link warning signs to persuasion tactics and scam types that share them.</p><small>WARNING SIGNS · TACTICS · SCAM TYPES</small></article><article><span className="capability-number">03</span><h3>Check the limits</h3><p>Compare model suggestions with reviewed evidence before making stronger claims.</p><small>REVIEW · EVIDENCE · UNCERTAINTY</small></article></div>
        <div className="catalog-strip"><div><span className="eyebrow">PILOT FRAMEWORK</span><p><b>{signals.length}</b> warning signs <i/><b>{patterns.length}</b> tactics <i/><b>{scamFamilies.length}</b> scam types</p></div><span className="catalog-note">Catalog definitions, not counts of live or verified scam incidents.</span></div>
      </section>
      <IntelligenceGraph />
      <section className="method-section" id="method"><div className="section-heading"><p className="eyebrow">HOW WE BUILD IT</p><h2>Evidence first.<br/><span>Limits made clear.</span></h2></div><div className="method-copy"><p>Every connection should lead back to a source. We show what the evidence supports, keep uncertainty visible, and measure the model before making stronger claims.</p><ol><li><span>01</span><div><b>Source</b><small>Keep the original link, date, and relevant facts.</small></div></li><li><span>02</span><div><b>Connect</b><small>Link facts to warning signs, tactics, and scam types.</small></div></li><li><span>03</span><div><b>Check</b><small>Compare suggestions with reviewed examples.</small></div></li></ol></div></section>
      <section className="score-guide"><div><p className="eyebrow">FOR RESEARCHERS</p><h3>How the score terms work</h3><p>These are model components. A score is not the probability a message is fraudulent.</p></div><dl><div><dt>TSS · Threat Signal Score</dt><dd>Weighted total of matched catalog warning signs.</dd></div><div><dt>TSSN · Normalized Threat Signal Score</dt><dd>TSS shown on a 0–100 scale. It is not a probability.</dd></div><div><dt>Pattern fit</dt><dd>How strongly signals connect to a defined tactic.</dd></div><div><dt>EQ · Evidence Quality</dt><dd>Strength of reviewed public sources linked to an analysis.</dd></div><div><dt>CS · Confidence Score</dt><dd>Requires sufficient evidence and stable family matches.</dd></div><div><dt>TI · Threat Index</dt><dd>Combined score, unavailable when required evidence is missing.</dd></div></dl></section>
      <HonestNote>Framework totals describe catalog definitions. This is a research pilot, not a live threat feed or a validated prediction service.</HonestNote>
    </div></details>

    <footer id="privacy"><div className="footer-brand"><img src="/brand/nigrah-geometric.png" alt="NIGRAH"/><span>Financial threat intelligence research and technology.</span></div><p>Browser text checks stay on this device. Optional AI sends content to the configured external provider only after you choose to send it. Provider data-handling terms apply.</p></footer>
  </main>;
}
