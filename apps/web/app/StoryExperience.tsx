"use client";

import { useState } from "react";
import { patterns, scamFamilies } from "../lib/intelligence";

const story = [
  { sender: "Unknown number", message: "I am a SEBI-certified analyst. Here is a free signal. Join today.", highlight: "SEBI-certified analyst", clue: "A message claims a regulated role.", signals: ["TS-03", "TS-13", "TS-06"] },
  { sender: "VIP Profit Club", message: "Members are earning. Only 20 seats left. Join our VIP group.", highlight: "Members are earning", clue: "Group claims and limited places can add social proof and urgency.", signals: ["TS-09", "TS-10", "TS-07"] },
  { sender: "Unknown number", message: "Download our unofficial trading app for bigger gains.", highlight: "unofficial trading app", clue: "The offer moves from a message to an app outside verified channels.", signals: ["TS-24"] },
  { sender: "Trading app message", message: "Invest more to unlock profits. Transfer funds to my personal account.", highlight: "personal account", clue: "A request to add money and pay a person directly deserves a pause.", signals: ["TS-17", "TS-15"] },
  { sender: "Trading app message", message: "Pay a tax charge before withdrawal.", highlight: "tax charge before withdrawal", clue: "A new payment is demanded when the person tries to withdraw.", signals: ["TS-16"] },
];

const signalNames: Record<string, string> = {
  "TS-03": "Authority claim", "TS-06": "Urgency", "TS-07": "Scarcity", "TS-09": "Social proof",
  "TS-10": "VIP group invitation", "TS-13": "Free offer", "TS-15": "Personal payment request",
  "TS-16": "Fee before withdrawal", "TS-17": "Add money to unlock funds", "TS-24": "Unofficial trading app",
};

function highlightMessage(message: string, highlight: string) {
  const index = message.indexOf(highlight);
  if (index < 0) return message;
  return <>{message.slice(0, index)}<mark>{highlight}</mark>{message.slice(index + highlight.length)}</>;
}

export default function StoryExperience() {
  const [step, setStep] = useState(0);
  const final = step === story.length;
  const current = story[Math.min(step, story.length - 1)];
  const seenSignals = new Set(story.slice(0, Math.min(step + 1, story.length)).flatMap(item => item.signals));
  const relatedPatterns = patterns.filter(pattern => pattern.signals.some(id => seenSignals.has(id)));
  const relatedPatternIds = new Set(relatedPatterns.map(pattern => pattern.id));
  const relatedFamilies = scamFamilies.filter(family => family.patterns.some(id => relatedPatternIds.has(id)));
  return <section className="story-section" id="story" aria-labelledby="story-title">
    <div className="story-heading"><p className="eyebrow">A PRACTICE STORY · ABOUT 60 SECONDS</p><h2 id="story-title">How a few small clues<br/><span>can become a bigger picture.</span></h2><p>Follow a fictional investment pitch as it changes. Each step shows a phrase that matches a warning sign in NIGRAH’s current catalog.</p></div>
    <div className="story-layout">
      <div className="story-phone" aria-label="Practice chat example">
        <div className="phone-top"><span className="phone-camera"/><b>Investment tips</b><small>Practice chat</small></div>
        <div className="story-progress" aria-label={`Story step ${Math.min(step + 1, 6)} of 6`}>{story.map((item, index) => <span key={item.sender + index} className={index <= step ? "filled" : ""}/>) }<span className={final ? "filled" : ""}/></div>
        <div className="chat-log" aria-live="polite">
          {story.slice(0, Math.min(step + 1, story.length)).map((item, index) => <div className={`chat-line ${index === step && !final ? "current" : ""}`} key={index}><small>{item.sender}</small><p>{highlightMessage(item.message, item.highlight)}</p></div>)}
          {final && <div className="chat-payoff"><b>Pause before paying.</b><span>Take time to verify the person, app, and payment route.</span></div>}
        </div>
        <div className="phone-home" aria-hidden="true"/>
      </div>
      <div className="story-panel" aria-live="polite">
        <div className="story-step-label">{final ? "THE CONNECTION" : `STEP ${step + 1} OF 6`}</div>
        <h3>{final ? "The story is a chain, not a verdict." : current.clue}</h3>
        <p>{final ? "The phrases above are teaching examples. NIGRAH can match a submitted text sample to catalog warning signs and show how signs relate to defined tactics and scam types. It does not follow a person across real chats or verify who sent a message." : "The highlighted phrase is a clue to inspect, not proof by itself."}</p>
        <div className="story-signals" aria-label="Catalog warning signs shown in this step">{(final ? story.flatMap(item => item.signals) : current.signals).filter((id, index, all) => all.indexOf(id) === index).map(id => <span key={id}><b>{id}</b> {signalNames[id] || id}</span>)}</div>
        {final && <div className="story-taxonomy"><b>Catalog links to inspect</b><p><span>Behaviors:</span> {relatedPatterns.map(pattern => pattern.name).join(" · ") || "No linked behavior"}</p><p><span>Scam types:</span> {relatedFamilies.slice(0, 4).map(family => family.name).join(" · ") || "No linked type"}{relatedFamilies.length > 4 ? ` · +${relatedFamilies.length - 4} more` : ""}</p></div>}
        <div className="story-controls"><button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Back</button><span>{final ? "Take the lesson with you" : "Move at your own pace"}</span><button type="button" className="story-next" onClick={() => setStep(step === story.length ? 0 : step + 1)}>{final ? "Replay story" : step === story.length - 1 ? "See the connection →" : "Next →"}</button></div>
        {final && <a className="story-try-link" href="#analysis">Try your own text sample ↑</a>}
      </div>
    </div>
  </section>;
}
