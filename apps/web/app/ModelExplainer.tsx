"use client";

import { useState } from "react";

const examples = [
  {
    id: "group-offer",
    title: "A high-return group offer",
    message: "Unsolicited investment message: join our WhatsApp group—members are earning! Guaranteed returns; double your money in 30 days. Act now, limited seats. Transfer funds to my personal account and pay a tax charge before withdrawal.",
    signals: ["Guaranteed returns", "Unrealistic returns", "VIP / group invitation", "Urgency and limited seats", "Personal payment request", "Fee before withdrawal"],
    patterns: ["Greed engineering", "Social validation", "Pressure engineering", "Financial entrapment"],
    families: ["WhatsApp tip scam", "Telegram signal fraud"],
    explanation: "Several persuasion tactics appear together. NIGRAH links those observable cues to recurring behavior structures, then shows which defined threat families share those structures.",
  },
  {
    id: "authority-app",
    title: "An authority and app claim",
    message: "Unsolicited investment message: I am your fake SEBI analyst. Use this unofficial trading app and join today.",
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
      <h2 id="learn-title">From one clue<br /><span>to a wider pattern.</span></h2>
      <p className="section-lead">A single message is only a starting point. Intelligence emerges when observable clues connect to behaviors documented across public evidence.</p>
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
        <h3>See the connections for yourself.</h3>
        <p>Choose an illustrative example. Follow the highlighted cues into patterns and candidate structures.</p>
        <div className="example-tabs" role="group" aria-label="Choose an example">
          {examples.map((item) => <button type="button" key={item.id} aria-pressed={activeId === item.id} onClick={() => setActiveId(item.id)}>{item.title}</button>)}
        </div>
      </div>
      <div className="example-content" key={example.id} aria-live="polite">
        <div className="example-message"><span>ILLUSTRATIVE MESSAGE</span><p>“{example.message}”</p><small>Teaching example only · not a real report or a verdict</small></div>
        <div className="example-flow">
          <article className="example-layer signal-layer"><span className="layer-label">OBSERVABLE SIGNALS</span><ul>{example.signals.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <div className="example-arrow" aria-hidden="true">→</div>
          <article className="example-layer pattern-layer"><span className="layer-label">BEHAVIOR PATTERNS</span><ul>{example.patterns.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <div className="example-arrow" aria-hidden="true">→</div>
          <article className="example-layer family-layer"><span className="layer-label">CANDIDATE THREAT FAMILIES</span><ul>{example.families.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
        <p className="example-explanation">{example.explanation}</p>
      </div>
    </div>
    <div className="score-guide">
      <div><p className="eyebrow">MAKING SCORES LEGIBLE</p><h3>A score is a summary of evidence links.</h3><p>It is not a probability that a message is a scam. NIGRAH shows which components are available and why others may be missing.</p></div>
      <dl>
        <div><dt>Threat Signal Score <abbr title="Threat Signal Score">TSS</abbr></dt><dd>The total weight of catalog signals matched by the deterministic phrase rules.</dd></div>
        <div><dt>Normalized Threat Signal Score <abbr title="Normalized Threat Signal Score">TSSN</abbr></dt><dd>The signal total rescaled to a 0–100 range for comparison within this MVP framework.</dd></div>
        <div><dt>Pattern Consistency</dt><dd>How strongly the matched signals support the connected behavior patterns.</dd></div>
        <div><dt>Evidence Quality and Confidence</dt><dd>Depend on reviewed public sources and stable family matches. They remain unavailable when those inputs are missing.</dd></div>
        <div><dt>Threat Index</dt><dd>A combined index is shown only when the scoring rules have the required evidence inputs. It is not a fraud verdict.</dd></div>
      </dl>
    </div>
  </section>;
}
