"use client";

import { useState } from "react";
import { analyzeText, catalogVersion } from "../lib/intelligence";

export default function Home() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeText> | null>(null);
  function analyze() {
    setAnalysis(analyzeText(text));
  }

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><span className="wordmark">NIGR<span>A<span className="wordmark-cut" /></span>H</span></a>
      <nav aria-label="Main navigation"><a href="#how">How it works</a><a href="#privacy">Privacy</a></nav>
      <a className="nav-cta" href="#scan">Check something <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> FINANCIAL THREAT INTELLIGENCE</p>
        <h1>Something suspicious?<br /><span>Check it before you pay.</span></h1>
        <p className="intro">Understand the signals, see why they matter, and know what to verify before money moves.</p>
        <a className="primary-btn" href="#scan">Check something <span aria-hidden="true">→</span></a>
        <p className="micro-trust"><span aria-hidden="true">⌁</span> Public intelligence · Privacy by design · You stay in control</p>
      </div>
      <div className="signal-card" aria-label="Example suspicious message">
        <div className="message-head"><span className="telegram-mark">↗</span><span><b>Market Alpha VIP</b><small>Investment group · Public example</small></span><span className="live-dot" /></div>
        <p className="message-copy">Guaranteed <strong>15% weekly returns</strong>. SEBI certified analyst. Only 5 seats left.</p>
        <div className="message-cta">JOIN VIP GROUP <span>→</span></div>
        <div className="signal-note"><span className="note-line" /><span><b>Signals worth checking</b><small>Return promise · Authority claim · Urgency</small></span></div>
      </div>
    </section>

    <section className="how" id="how">
      <div className="section-heading"><p className="eyebrow">A CLEARER WAY TO CHECK</p><h2>Understand first.<br /><span>Then decide.</span></h2></div>
      <div className="steps"><article><span>01</span><h3>Scan</h3><p>Share the message or offer you want to understand.</p></article><article><span>02</span><h3>Explain</h3><p>See the specific claims and patterns that stood out.</p></article><article><span>03</span><h3>Verify</h3><p>Check identities and sources before you act.</p></article></div>
    </section>

    <section className="scan-section" id="scan">
      <div className="scan-intro"><p className="eyebrow">START WITH A MESSAGE</p><h2>What do you want to check?</h2><p>Paste a suspicious message or investment offer. This first preview checks a small set of known wording patterns.</p></div>
      <div className="scan-panel"><label htmlFor="message">Message or offer</label><textarea id="message" value={text} onChange={(e) => { setText(e.target.value); setAnalysis(null); }} placeholder="Paste a message, offer, or link here…" maxLength={10000} /><div className="scan-controls"><span>{text.length.toLocaleString()} / 10,000</span><button className="primary-btn" onClick={analyze} disabled={!text.trim()}>Check message <span aria-hidden="true">→</span></button></div>
      {analysis && <div className="result" aria-live="polite"><div className="result-title"><div><p className="eyebrow">PREVIEW ANALYSIS</p><h3>{analysis.evidence.length ? `${analysis.evidence.length} signal${analysis.evidence.length === 1 ? "" : "s"} to review` : "No listed signals found"}</h3></div><span className="risk-pill">Evidence preview</span></div><p className="result-disclaimer">Phrase rules found these text matches. Pattern values show weighted rule coverage, not probability or fraud risk. No calibrated Threat Index is available in this preview. Catalog {catalogVersion}.</p>{analysis.evidence.length > 0 && <ul className="finding-list">{analysis.evidence.map((f) => <li key={f.id}><span className="finding-icon">!</span><span><b>{f.label}</b><small>{f.id} · Matched {f.matches.map((match) => `“${match}”`).join(", ")}</small></span></li>)}</ul>}{analysis.patterns.length > 0 && <div className="pattern-list"><h4>Related manipulation patterns</h4>{analysis.patterns.map((pattern) => <div className="pattern-row" key={pattern.id}><span><b>{pattern.label}</b><small>{pattern.id} · {pattern.signals.join(", ")}</small></span><span>{pattern.score}%</span></div>)}</div>}<p className="next-action"><b>Before you act</b><br />Verify the person or company through an official source. Don’t transfer money based on a message alone.</p></div>}
      </div>
    </section>

    <footer id="privacy"><div><b>NIGRAH</b><span>Financial threat intelligence for investor resilience.</span></div><p>This early preview runs in your browser. Your text is not sent to a server or saved.</p></footer>
  </main>;
}
