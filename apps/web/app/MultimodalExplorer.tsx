"use client";

import { useMemo, useState } from "react";
import { patterns, scamFamilies, signals, type PatternMatch, type SignalEvidence } from "../lib/intelligence";
import { scoreAnalysis } from "../lib/scoring";

type CloudResult = { modality: string; transcript?: string; analysis: { summary: string; signals: { id: string; observed_text: string; rationale: string }[]; patterns: { id: string; rationale: string }[]; family_ids: string[]; uncertainty: string[] } };
const examples = ["Guaranteed 30% returns", "Only 20 seats left. Join today.", "Pay a fee before withdrawal."];

export default function MultimodalExplorer() {
  const [modality, setModality] = useState<"text" | "image" | "audio">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<CloudResult | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const accept = modality === "image" ? "image/jpeg,image/png,image/webp" : "audio/webm,audio/wav,audio/mpeg,audio/mp4,audio/ogg";
  const score = useMemo(() => {
    if (!result) return null;
    const ids = new Set(result.analysis.signals.map(item => item.id));
    const evidence: SignalEvidence[] = [...ids].map(id => {
      const signal = signals.find(item => item.id === id)!;
      const finding = result.analysis.signals.find(item => item.id === id)!;
      return { id, label: signal.name, weight: signal.weight, confidence: 0, matches: [finding.observed_text] };
    });
    const candidates: PatternMatch[] = patterns.flatMap(definition => {
      const matchedSignals = definition.signals.filter(id => ids.has(id));
      if (matchedSignals.length < Math.min(2, definition.signals.length)) return [];
      return [{ id: definition.id, label: definition.name, matchedSignals, totalSignals: definition.signals.length, strength: matchedSignals.length / definition.signals.length }];
    });
    return { score: scoreAnalysis(evidence, candidates, null), activePatterns: candidates };
  }, [result]);
  const scores = score?.score ?? null;
  const tone = !scores || scores.tss === 0 ? "low" : scores.tssn <= 20 ? "watch" : "high";
  const attention = tone === "low" ? "No catalog warning signs matched" : tone === "watch" ? "Some warning signs matched" : "Several warning signs matched";
  const analyze = async () => {
    setMessage(""); setResult(null);
    if (!consent) { setMessage("Select the one-time consent before sending this sample for analysis."); return; }
    if (modality === "text" && text.trim().length < 6) { setMessage("Paste at least a few words to analyze."); return; }
    if (modality !== "text" && !file) { setMessage("Choose an image or voice recording first."); return; }
    if (file && file.size > 3 * 1024 * 1024) { setMessage("Files must be 3 MB or smaller in this pilot."); return; }
    setBusy(true);
    try {
      const payload: { modality: string; text?: string; file?: string; consent: boolean } = { modality, consent: true };
      if (modality === "text") payload.text = text;
      else payload.file = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Could not read file.")); reader.onerror = () => reject(new Error("Could not read file.")); reader.readAsDataURL(file!); });
      const response = await fetch("/api/analyze", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis could not complete.");
      setResult(data);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Analysis could not complete."); }
    finally { setBusy(false); setConsent(false); }
  };

  return <section className="multimodal-section hero-explorer" id="analysis" aria-labelledby="multimodal-title">
    <div className="section-heading"><p className="eyebrow">AI-ASSISTED SAMPLE ANALYSIS</p><h2 id="multimodal-title">Read the signals in a message</h2><p className="section-lead">AI interprets the sample. NIGRAH maps its observations to a defined warning-sign catalog and applies the NIGRAH scoring rules.</p></div>
    <div className="multimodal-panel">
      <div className="modality-tabs" role="group" aria-label="Choose sample type">{(["text", "image", "audio"] as const).map(item => <button key={item} type="button" aria-pressed={item === modality} className={item === modality ? "selected" : ""} onClick={() => { setModality(item); setFile(null); setResult(null); setMessage(""); }}>{item === "audio" ? "Voice" : item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      {modality === "text" ? <><label className="analysis-field-label" htmlFor="analysis-sample">Message or offer</label><textarea id="analysis-sample" maxLength={12000} value={text} onChange={event => { setText(event.target.value); setResult(null); }} placeholder="Paste a WhatsApp, SMS, email, or investment offer…"/><div className="example-chips" aria-label="Try a sample message">{examples.map(example => <button type="button" key={example} onClick={() => { setText(example); setResult(null); setMessage(""); }}>{example}</button>)}</div></> : <label className="media-input">{modality === "image" ? "Choose an image" : "Choose a voice recording"}<small>{file ? `${file.name} · ${(file.size / 1024).toFixed(0)} KB` : "Maximum 3 MB"}<input type="file" accept={accept} onChange={event => { setFile(event.target.files?.[0] || null); setResult(null); }}/></small></label>}
      <label className="cloud-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)}/> Send this sample for AI-assisted analysis</label>
      <p className="analysis-consent-copy">Your sample is sent only when you choose Analyze. The results combine AI observations with NIGRAH’s own signal taxonomy and scoring rules.</p>
      <button className="primary-btn local-check-button" type="button" disabled={busy} onClick={analyze}>{busy ? "Analyzing sample…" : "Analyze sample"}<span aria-hidden="true">→</span></button>
      {message && <p className="model-message" role="status">{message}</p>}
      {result && scores && score && <div className={`model-result scored-result tone-${tone}`} aria-live="polite">
        <div className="analysis-result-head"><b>Analysis summary</b><span>{result.modality === "audio" ? "Voice" : result.modality} · NIGRAH scoring v1.2</span></div>
        <p>{result.analysis.summary}</p>{result.transcript && <p><b>Transcript:</b> {result.transcript}</p>}
        <section className="attention-card" aria-label={`Attention level: ${attention}`}><span className="attention-light" aria-hidden="true"/><div><small>ATTENTION LEVEL</small><b>{attention}</b><p>Color reflects matched catalog signals. It is a review cue, not a safety certification.</p></div><strong>{scores.tssn}<small>/100</small></strong></section>
        <div className="score-metrics"><div><small>TSS · Threat Signal Score</small><b>{scores.tss} weighted points</b></div><div><small>TSSN · Normalized Threat Signal Score</small><b>{scores.tssn} / 100</b></div><div><small>Pattern fit</small><b>{scores.ps} / 100</b></div></div>
        {score.activePatterns.length > 0 && <div className="family-results"><h3>Connected behaviors</h3>{score.activePatterns.map(item => <div key={item.id}><span>{item.label}</span><b>{Math.round(item.strength * 100)}% signal overlap</b></div>)}</div>}
        <h3 className="finding-heading">Observed warning signs <span>{result.analysis.signals.length}</span></h3>
        {result.analysis.signals.length ? <ul>{result.analysis.signals.map(item => { const signal = signals.find(entry => entry.id === item.id); return signal ? <li key={item.id}><b>{signal.name}</b><span>{item.observed_text} — {item.rationale}</span></li> : null; })}</ul> : <p>No warning signs from the current catalog were matched in this analysis.</p>}
        {scores.families.length > 0 && <div className="family-results"><h3>Closest scam-family matches</h3>{scores.families.map((family, index) => <div key={family.id}><span>{index + 1}. {family.name}</span><b>{family.similarity}% pattern overlap</b></div>)}</div>}
        {result.analysis.uncertainty.length > 0 && <p className="uncertainty-line"><b>Needs context:</b> {result.analysis.uncertainty.join(" · ")}</p>}
        <p className="score-availability">EQ (Evidence Quality), CS (Confidence Score), and TI (Threat Index) require reviewed public evidence linked to this sample. They are not calculated for a standalone upload.</p>
        <a className="model-detail-link" href="/model">Explore how NIGRAH analysis and scoring work <span aria-hidden="true">↗</span></a>
      </div>}
    </div>
  </section>;
}
