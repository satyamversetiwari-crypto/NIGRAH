"use client";

import { useState } from "react";
import { patterns, scamFamilies, signals } from "../lib/intelligence";

const cards = [
  { id: "TS-01", title: "Guaranteed returns", quote: "Guaranteed 30% returns.", meaning: "A promised high return needs careful checking. Investments carry risk." },
  { id: "TS-06", title: "Pressure to hurry", quote: "Only 20 seats left. Join today.", meaning: "A rush to act can make it harder to verify first." },
  { id: "TS-10", title: "VIP group pressure", quote: "Join our VIP group. Members are earning.", meaning: "Group names and profit claims are not proof of real results." },
  { id: "TS-15", title: "Personal-account payment", quote: "Transfer the funds to my personal account.", meaning: "Pause and verify the official payment route before sending money." },
  { id: "TS-16", title: "Fee to withdraw", quote: "Pay a fee before withdrawal.", meaning: "A new payment demanded to release funds is a reason to stop and check." },
  { id: "TS-03", title: "Claimed official role", quote: "I am a SEBI-certified analyst.", meaning: "A message’s claim is not proof. Check the name with SEBI." },
];

export default function RedFlagGallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = cards.find(card => card.id === selected);
  const signal = signals.find(item => item.id === selected);
  const linkedPatterns = signal ? patterns.filter(pattern => pattern.signals.some(id => id === signal.id)) : [];
  const patternIds = new Set(linkedPatterns.map(item => item.id));
  const linkedFamilies = scamFamilies.filter(family => family.patterns.some(id => patternIds.has(id)));
  return <section className="flag-section" id="red-flags" aria-labelledby="flag-title">
    <div className="flag-heading"><p className="eyebrow">SIX CLUES TO RECOGNIZE</p><h2 id="flag-title">Notice the words.<br/><span>Then check the story.</span></h2><p>These phrases appear in NIGRAH’s pilot catalog. One clue alone does not establish fraud.</p></div>
    <div className="flag-grid">{cards.map((card, index) => { const item = signals.find(entry => entry.id === card.id); return <article className={`flag-card flag-${index + 1}`} key={card.id}>
      <div className="flag-icon" aria-hidden="true">{["↗", "◷", "◇", "₹", "↓", "✓"][index]}</div><span className="flag-id">{card.id} · WARNING SIGN</span><h3>{card.title}</h3><p className="flag-quote">“{card.quote}”</p><p className="flag-meaning"><b>Why pause:</b> {card.meaning}</p><button type="button" aria-expanded={selected === card.id} onClick={() => setSelected(selected === card.id ? null : card.id)}>{selected === card.id ? "Hide catalog links ↑" : "See where it connects →"}</button>
    </article>; })}</div>
    {active && signal && <div className="flag-detail" aria-live="polite"><button type="button" className="flag-detail-close" onClick={() => setSelected(null)} aria-label="Close catalog links">×</button><p className="eyebrow">CATALOG CONNECTIONS · {signal.id}</p><h3>{signal.name}: where it connects</h3><div className="connection-chain"><div><b>Warning sign</b><span>{signal.name}</span></div><i aria-hidden="true">→</i><div><b>Related tactics</b><span>{linkedPatterns.length ? linkedPatterns.map(item => item.name).join(" · ") : "No catalog mapping"}</span></div><i aria-hidden="true">→</i><div><b>Related scam types</b><span>{linkedFamilies.length ? linkedFamilies.map(item => item.name).join(" · ") : "No catalog mapping"}</span></div></div></div>}
  </section>;
}
