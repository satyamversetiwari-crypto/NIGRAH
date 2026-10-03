"use client";

import { useState } from "react";

const examples = [
  {
    id: "group-offer",
    title: "A high-return group offer",
    message: "Join our WhatsApp group—members are earning! Guaranteed returns; double your money in 30 days. Act now, limited seats. Transfer funds to my personal account and pay a tax charge before withdrawal.",
    signals: ["Guaranteed returns", "Unrealistic returns", "VIP / group invitation", "Urgency and limited seats", "Personal payment request", "Fee before withdrawal"],
    patterns: ["Greed engineering", "Social validation", "Pressure engineering", "Financial entrapment"],
    families: ["WhatsApp tip scam", "Telegram signal fraud"],
    explanation: "Several persuasion tactics appear together. NIGRAH links those observable cues to recurring behavior structures, then shows which defined threat families share those structures.",
  },
  {
    id: "authority-app",
    title: "An authority and app claim",
    message: "I am a SEBI registered analyst. Download this app and join today.",
    signals: ["Unsolicited contact", "False SEBI authority claim", "Impersonation cue", "Unofficial trading app"],
    patterns: ["Authority exploitation", "Identity manipulation"],
    families: ["Clone broker platform"],
    explanation: "The authority claim, identity cue, and app reference connect across more than one pattern. That overlap makes a clone-platform structure a candidate for investigation, not a finding of fraud.",
  },
];

export default function ModelExplainer() {
  const [activeId, setActiveId] = useState(examples[0].id);
  const example = examples.find((item) => item.id === activeId) ?? examples[0];

  return <section className="learn-section" id="how-it-works" aria-labelledby="learn-title">
    <div className="section-heading learn-heading">
      <p className="eyebrow">HOW NIGRAH THINKS</p>
      <h2 id="learn-title">One clue is not enough.<br /><span>Many clues tell a story.</span></h2>
      <p className="section-lead">A message can look harmless on its own. When several clues match tricks described in public reports, they can reveal a pattern worth checking.</p>
    </div>
    <div className="intelligence-steps" aria-label="NIGRAH intelligence workflow">
      <article className="intelligence-step"><span>01 · SOURCE</span><div className="step-icon source-icon" aria-hidden="true"><i /><i /><i /></div><h3>Collect evidence</h3><p>Preserve where a report came from, when it was published, and what it actually says.</p></article>
      <span className="step-connector" aria-hidden="true">→</span>
      <article className="intelligence-step"><span>02 · SIGNAL</span><div className="step-icon signal-icon" aria-hidden="true"><i /><i /><i /></div><h3>Spot observable cues</h3><p>Identify things that can be pointed to: a promised return, an impersonated authority, or a payment request.</p></article>
      <span className="step-connector" aria-hidden="true">→</span>
      <article className="intelligence-step"><span>03 · BEHAVIOR</span><div className="step-icon behavior-icon" aria-hidden="true"><i /><i /><i /></div><h3>Connect tactics</h3><p>Group related signals into patterns such as urgency, trust building, or financial pressure.</p></article>
      <span className="step-connector" aria-hidden="true">→</span>
      <article className="intelligence-step"><span>04 · STRUCTURE</span><div className="step-icon structure-icon" aria-hidden="true"><i /><i /><i /></div><h3>Study threat families</h3><p>Compare the pattern combination with known scam structures and watch how they change.</p></article>
    </div>

    <div className="example-shell">
      <div className="example-intro">
        <p className="eyebrow">A WALK-THROUGH</p>
        <h3>Watch clues connect to familiar scam tactics.</h3>
        <p>Choose a practice example. Follow each warning sign to the behavior it may point to, then to related scam types.</p>
        <div className="example-tabs" role="group" aria-label="Choose an example">
          {examples.map((item) => <button type="button" key={item.id} aria-pressed={activeId === item.id} onClick={() => setActiveId(item.id)}>{item.title}</button>)}
        </div>
      </div>
      <div className="example-content" key={example.id} aria-live="polite">
        <div className="example-message"><span>UNKNOWN SENDER · PRACTICE EXAMPLE</span><p>“{example.message}”</p><small>Made for learning · not a real report or a verdict</small></div>
        <div className="example-flow">
          <article className="example-layer signal-layer"><span className="layer-label">WARNING SIGNS</span><ul>{example.signals.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <div className="example-arrow" aria-hidden="true">→</div>
          <article className="example-layer pattern-layer"><span className="layer-label">TRICKS BEING USED</span><ul>{example.patterns.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <div className="example-arrow" aria-hidden="true">→</div>
          <article className="example-layer family-layer"><span className="layer-label">SCAM TYPES IT MAY MATCH</span><ul>{example.families.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
        <p className="example-explanation">{example.explanation}</p>
      </div>
    </div>
    <div className="score-guide">
      <div><p className="eyebrow">HOW WE SHOW RISK</p><h3>We count warning signs. We do not guess.</h3><p>A high number means more known clues appeared. It does not mean “definitely a scam.”</p></div>
      <dl>
        <div><dt>Warning-sign total <abbr title="Threat Signal Score">TSS</abbr></dt><dd>The weighted count of known warning signs found in the sample.</dd></div>
        <div><dt>Warning-sign level <abbr title="Normalized Threat Signal Score">TSSN</abbr></dt><dd>The warning-sign total shown on a 0–100 scale.</dd></div>
        <div><dt>How clues fit together</dt><dd>How well the observed signs connect to a known behavior pattern.</dd></div>
        <div><dt>Source quality and confidence</dt><dd>How strong the linked sources are and how much support exists for a match.</dd></div>
        <div><dt>Overall threat level</dt><dd>Shown only when enough reviewed evidence is available. It is not a fraud verdict.</dd></div>
      </dl>
    </div>
  </section>;
}
