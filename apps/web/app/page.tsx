"use client";

import { useEffect, useState } from "react";
import { analyzeText, catalogVersion } from "../lib/intelligence";
import { scoreAnalysis } from "../lib/scoring";
import MultimodalExplorer from "./MultimodalExplorer";

export default function Home() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeText> | null>(null);
  const [score, setScore] = useState<ReturnType<typeof scoreAnalysis> | null>(null);
  useEffect(() => {
    setScore(analysis ? scoreAnalysis(analysis.evidence, analysis.patterns, null) : null);
  }, [analysis]);

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /></a>
      <nav aria-label="Main navigation"><a href="#platform">Platform</a><a href="#method">Method</a><a href="#analysis">Analysis preview</a></nav>
      <a className="nav-cta" href="#platform">Explore the model <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> FINANCIAL THREAT INTELLIGENCE</p>
        <h1>Understand how financial threats <span>take shape.</span></h1>
        <p className="intro">NIGRAH is an intelligence and predictive technology initiative. It connects public evidence, behavioral patterns, entities, and events to help reveal how financial threats evolve.</p>
        <div className="hero-actions"><a className="primary-btn" href="#platform">Explore the intelligence model <span aria-hidden="true">→</span></a><a className="secondary-link" href="#analysis">View text analysis preview</a></div>
        <p className="micro-trust"><span aria-hidden="true">⌁</span> Evidence-led research · Provenance by design · Predictive, not prescriptive</p>
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
        <p className="visual-caption">A conceptual view of the intended system architecture. This is not a live intelligence feed.</p>
      </div>
    </section>

    <section className="platform-section" id="platform">
      <div className="section-heading"><p className="eyebrow">THE TECHNOLOGY</p><h2>From scattered evidence<br /><span>to connected intelligence.</span></h2><p className="section-lead">The goal is to model threat behavior and its evolution—not simply label a message.</p></div>
      <div className="capability-grid">
        <article><span className="capability-number">01</span><h3>Acquire with provenance</h3><p>Collect relevant public evidence with its source, date, geography, and quality intact.</p><small>PUBLIC SOURCES · TRACEABLE RECORDS</small></article>
        <article><span className="capability-number">02</span><h3>Structure behavior</h3><p>Normalize signals and manipulation patterns, then connect them to scam families and related entities.</p><small>SIGNALS · PATTERNS · KNOWLEDGE GRAPH</small></article>
        <article><span className="capability-number">03</span><h3>Study what may emerge</h3><p>Compare changes over time and surface evidence-backed threat hypotheses with uncertainty visible.</p><small>TEMPORAL CHANGE · SIMILARITY · UNCERTAINTY</small></article>
      </div>
      <div className="catalog-strip"><div><span className="eyebrow">CURRENT MVP FRAMEWORK</span><p><b>25</b> signals <i /> <b>10</b> behavior patterns <i /> <b>15</b> scam families</p></div><span className="catalog-note">Defined by the approved MVP specification; this is not a live intelligence corpus.</span></div>
    </section>

    <section className="method-section" id="method">
      <div className="section-heading"><p className="eyebrow">HOW WE ARE BUILDING IT</p><h2>Evidence first.<br /><span>Inference with limits.</span></h2></div>
      <div className="method-copy"><p>Reliable prediction starts with a reliable evidence pipeline. Each record needs provenance and review; each analytical layer needs a clear definition; each prediction needs a measurable evaluation method.</p><ol><li><span>01</span><div><b>Source</b><small>Record where evidence came from and when it was observed.</small></div></li><li><span>02</span><div><b>Connect</b><small>Map evidence to signals, patterns, families, and relationships.</small></div></li><li><span>03</span><div><b>Evaluate</b><small>Measure performance against reviewed examples before making predictive claims.</small></div></li></ol></div>
    </section>

    <section className="analysis-section" id="analysis">
      <div className="analysis-intro"><p className="eyebrow">ONE EARLY CAPABILITY</p><h2>Text analysis preview</h2><p>This local prototype checks text against a small deterministic phrase catalog. It illustrates one possible interface for the intelligence system; it is not the product’s full scope or a validated risk prediction.</p><span className="prototype-label">PROTOTYPE · BROWSER ONLY · NOT CALIBRATED</span></div>
      <div className="scan-panel"><label htmlFor="message">Sample text</label><textarea id="message" value={text} onChange={(e) => { setText(e.target.value); setAnalysis(null); }} placeholder="Paste text you want to inspect…" maxLength={10000} /><div className="scan-controls"><span>{text.length.toLocaleString()} / 10,000</span><button className="primary-btn" onClick={() => setAnalysis(analyzeText(text))} disabled={!text.trim()}>Analyze text <span aria-hidden="true">→</span></button></div>
      {analysis && <div className="result" aria-live="polite"><div className="result-title"><div><p className="eyebrow">TEXT MATCHES</p><h3>{analysis.evidence.length ? `${analysis.evidence.length} signal${analysis.evidence.length === 1 ? "" : "s"} matched` : "No catalogued phrases matched"}</h3></div><span className="risk-pill">Prototype output</span></div><p className="result-disclaimer">Phrase rules found these text matches. Pattern coverage counts matched signals within each defined pattern; it is not a risk score or probability. Some signals require context, source checks, or media analysis. No calibrated Threat Index is available. Catalog {catalogVersion}.</p>{analysis.evidence.length > 0 && <ul className="finding-list">{analysis.evidence.map((f) => <li key={f.id}><span className="finding-icon">·</span><span><b>{f.label}</b><small>{f.id} · Matched {f.matches.map((match) => `“${match}”`).join(", ")}</small></span></li>)}</ul>}{analysis.patterns.length > 0 && <div className="pattern-list"><h4>Related behavior patterns</h4>{analysis.patterns.map((pattern) => <div className="pattern-row" key={pattern.id}><span><b>{pattern.label}</b><small>{pattern.id} · {pattern.matchedSignals.join(", ")}</small></span><span>{pattern.matchedSignals.length} / {pattern.totalSignals} signals</span></div>)}</div>}</div>}
      </div>
    </section>

      {score && <div className="score-output" aria-live="polite"><p className="eyebrow">{score.state === "no_intelligence" ? "NO INTELLIGENCE" : "SCORING v1.2 · PRELIMINARY ANALYSIS"}</p><h3>{score.state === "no_intelligence" ? "No Significant Threat Signals Detected" : "Threat Index unavailable"}</h3><p className="result-disclaimer">This browser-only message has no linked public source record. Evidence Quality, Confidence Score, and Threat Index are therefore N/A. This output is preliminary; phrase-rule confidence values are not calibrated.</p><div className="score-metrics"><div><small>TSS · normalized</small><b>{score.tss} · {score.tssn}</b></div><div><small>Pattern Score</small><b>{score.ps}</b></div><div><small>Signal Strength</small><b>{score.ss}</b></div><div><small>Confidence</small><b>{score.cs ?? "N/A"}</b></div><div><small>Threat Index</small><b>{score.ti ?? "N/A"}</b></div><div><small>Primary family similarity</small><b>{score.fss === null ? "N/A" : `${score.fss}%`}</b></div></div>{score.families.length > 0 && <div className="pattern-list"><h4>Top family matches · structural overlap</h4>{score.families.map((family, index) => <div className="pattern-row" key={family.id}><span><b>{index + 1}. {family.name}</b><small>{family.id} · Expert-assigned harm prior {family.harmScore}</small></span><span>{family.similarity}%</span></div>)}</div>}</div>}
    <MultimodalExplorer />
    <footer id="privacy"><div className="footer-brand"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /><span>Financial threat intelligence research and technology.</span></div><p>Local text preview stays in your browser. Optional AI analysis sends a sample to the configured provider only after consent and does not save the submitted content.</p></footer>
  </main>;
}
