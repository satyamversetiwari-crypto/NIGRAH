"use client";

import { useState } from "react";

type Finding = { id: string; label: string; phrase: string; weight: number };
const rules: Array<{ id: string; label: string; re: RegExp; weight: number }> = [
  { id: "TS-01", label: "Guaranteed returns", re: /guaranteed|assured|risk[- ]free|fixed (weekly|monthly|daily) return/i, weight: 10 },
  { id: "TS-02", label: "Unusually high returns", re: /\d+\s*%\s*(weekly|daily|monthly)|double your money|\d+x return/i, weight: 10 },
  { id: "TS-03", label: "Authority claim", re: /SEBI[- ]certified|SEBI approved|certified analyst|insider expert/i, weight: 9 },
  { id: "TS-06", label: "Urgency", re: /join today|last chance|only today|act now|closing soon/i, weight: 8 },
  { id: "TS-07", label: "Scarcity or exclusivity", re: /only \d+ seats|limited seats|VIP slots|invite only/i, weight: 7 },
  { id: "TS-09", label: "Social proof", re: /profit screenshots|testimonials|everyone is earning|success stories/i, weight: 8 },
  { id: "TS-15", label: "Payment diversion", re: /pay (to|into)|personal account|UPI ID|transfer now/i, weight: 10 },
  { id: "TS-16", label: "Withdrawal restriction", re: /fee before withdrawal|tax before withdrawal|withdrawal.*(fee|blocked)/i, weight: 10 },
];

export default function Home() {
  const [text, setText] = useState("");
  const [findings, setFindings] = useState<Finding[] | null>(null);
  function analyze() {
    const found = rules.flatMap((rule) => {
      const match = text.match(rule.re);
      return match ? [{ id: rule.id, label: rule.label, phrase: match[0], weight: rule.weight }] : [];
    });
    setFindings(found);
  }

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><span className="logo-wrap"><img src="/brand/nigrah-logo.png" alt="NIGRAH" /></span></a>
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
      <div className="scan-panel"><label htmlFor="message">Message or offer</label><textarea id="message" value={text} onChange={(e) => { setText(e.target.value); setFindings(null); }} placeholder="Paste a message, offer, or link here…" maxLength={10000} /><div className="scan-controls"><span>{text.length.toLocaleString()} / 10,000</span><button className="primary-btn" onClick={analyze} disabled={!text.trim()}>Check message <span aria-hidden="true">→</span></button></div>
      {findings && <div className="result" aria-live="polite"><div className="result-title"><div><p className="eyebrow">PREVIEW ANALYSIS</p><h3>{findings.length ? `${findings.length} signal${findings.length === 1 ? "" : "s"} to review` : "No listed signals found"}</h3></div><span className={findings.length > 1 ? "risk-pill caution" : "risk-pill"}>{findings.length > 1 ? "Review carefully" : "Limited evidence"}</span></div><p className="result-disclaimer">This preview uses simple phrase matching. It is not a validated Threat Index, does not confirm fraud, and may miss signals.</p>{findings.length > 0 && <ul className="finding-list">{findings.map((f) => <li key={f.id}><span className="finding-icon">!</span><span><b>{f.label}</b><small>{f.id} · Matched “{f.phrase}”</small></span></li>)}</ul>}<p className="next-action"><b>Before you act</b><br />Verify the person or company through an official source. Don’t transfer money based on a message alone.</p></div>}
      </div>
    </section>

    <footer id="privacy"><div><b>NIGRAH</b><span>Financial threat intelligence for investor resilience.</span></div><p>This early preview runs in your browser. Your text is not sent to a server or saved.</p></footer>
  </main>;
}
