"use client";

import { useMemo, useState } from "react";
import { analyzeText, patterns, scamFamilies, signals } from "../lib/intelligence";
import { scoreAnalysis } from "../lib/scoring";
import HonestNote from "./HonestNote";

type CloudResult = { modality: string; transcript?: string; analysis: { summary: string; signals: { id: string; observed_text: string; rationale: string }[]; patterns: { id: string; rationale: string }[]; family_ids: string[]; uncertainty: string[] } };

const examples = ["Guaranteed 30% returns", "Only 20 seats left. Join today.", "Pay a fee before withdrawal."];

export default function MultimodalExplorer() {
  const [modality, setModality] = useState<"text" | "image" | "audio">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [localResult, setLocalResult] = useState<ReturnType<typeof analyzeText> | null>(null);
  const [cloudResult, setCloudResult] = useState<CloudResult | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const accept = modality === "image" ? "image/jpeg,image/png,image/webp" : "audio/webm,audio/wav,audio/mpeg,audio/mp4,audio/ogg";

  const score = useMemo(() => {
    if (localResult) return scoreAnalysis(localResult.evidence, localResult.patterns, null);
    if (!cloudResult) return null;
    const scoreText = cloudResult.modality === "text" ? text : cloudResult.modality === "audio" ? cloudResult.transcript || "" : cloudResult.analysis.signals.map(item => item.observed_text).join(" ");
    const matched = analyzeText(scoreText);
    return scoreAnalysis(matched.evidence, matched.patterns, null);
  }, [localResult, cloudResult, text]);

  function analyzeLocally() {
    setMessage(""); setCloudResult(null);
    if (modality !== "text") { setMessage("The browser-only check works with text. Image and voice need optional AI assistance in this pilot."); return; }
    if (text.trim().length < 6) { setMessage("Paste at least a few words to check."); return; }
    setLocalResult(analyzeText(text));
  }

  async function sendOnceToAI() {
    setMessage(""); setLocalResult(null); setCloudResult(null);
    if (!consent) { setMessage("Please select the one-time consent before sending this sample to the external provider."); return; }
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
      if (!response.ok) throw new Error(data.error || "AI analysis could not complete.");
      setCloudResult(data);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "AI analysis could not complete."); }
    finally { setBusy(false); setConsent(false); }
  }

  const getNames = (ids: string[], catalog: readonly { id: string; name: string }[]) => ids.map(id => catalog.find(entry => entry.id === id)).filter((entry): entry is { id: string; name: string } => Boolean(entry));
  const localSignals = localResult?.evidence.map(item => signals.find(signal => signal.id === item.id)).filter((item): item is (typeof signals)[number] => Boolean(item)) ?? [];
  const localPatterns = localResult?.patterns.map(item => patterns.find(pattern => pattern.id === item.id)).filter((item): item is (typeof patterns)[number] => Boolean(item)) ?? [];
  const cloudSignals = cloudResult?.analysis.signals ?? [];

  return <section className="multimodal-section hero-explorer" id="analysis" aria-labelledby="multimodal-title">
    <div className="section-heading"><p className="eyebrow">EXPLORE A SAMPLE</p><h2 id="multimodal-title">See how clues connect</h2><p className="section-lead">Start with a private, browser-only text check. Optional AI help for text, images, or voice is a separate one-time choice.</p></div>
    <div className="multimodal-panel">
      <div className="modality-tabs" role="group" aria-label="Choose sample type">{(["text", "image", "audio"] as const).map(item => <button key={item} type="button" aria-pressed={item === modality} className={item === modality ? "selected" : ""} onClick={() => { setModality(item); setFile(null); setLocalResult(null); setCloudResult(null); setMessage(""); }}>{item === "audio" ? "Voice" : item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      {modality === "text" ? <><textarea aria-label="Message text to check in this browser" maxLength={12000} value={text} onChange={event => { setText(event.target.value); setLocalResult(null); setCloudResult(null); }} placeholder="Paste a WhatsApp, SMS, email, or investment offer…"/><div className="example-chips" aria-label="Try a sample message">{examples.map(example => <button type="button" key={example} onClick={() => { setText(example); setLocalResult(null); setCloudResult(null); setMessage(""); }}>{example}</button>)}</div><button className="primary-btn local-check-button" type="button" onClick={analyzeLocally}>Find warning signs <span aria-hidden="true">→</span></button><p className="local-privacy">Text stays in this browser for this check. Nothing is sent.</p></> : <label className="media-input">{modality === "image" ? "Choose an image" : "Choose a voice recording"}<small>{file ? `${file.name} · ${(file.size / 1024).toFixed(0)} KB` : "Maximum 3 MB · optional AI is required to read this file"}<input type="file" accept={accept} onChange={event => { setFile(event.target.files?.[0] || null); setCloudResult(null); }}/></small></label>}
      <details className="ai-assist"><summary>Read deeper with AI (optional)</summary><p>When you choose “Send once,” this sample goes to the configured external model provider to return observations. The provider’s data-handling terms apply.</p><label className="cloud-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)}/> I agree to send this sample to the external AI provider once.</label><button className="ai-send-button" type="button" disabled={busy} onClick={sendOnceToAI}>{busy ? "Sending once…" : "Send once for AI analysis"}</button></details>
      {message && <p className="model-message" role="status">{message}</p>}
      {localResult && <div className="model-result" aria-live="polite"><div className="analysis-result-head"><b>Browser-only check</b><span>Exact phrase rules · no AI</span></div>{localSignals.length ? <><p>{localSignals.length} catalog warning {localSignals.length === 1 ? "sign" : "signs"} found in the text. Review each phrase below.</p><ul>{localResult.evidence.map(item => { const signal = signals.find(entry => entry.id === item.id); return signal ? <li key={item.id}><b>{item.id} · {signal.name}</b><span>Matched phrase: {item.matches.join(", ")}{signal.limitation ? ` · Note: ${signal.limitation}` : ""}</span></li> : null; })}</ul>{localPatterns.length > 0 && <p><b>Related tactics in the catalog:</b> {localPatterns.map(item => item.name).join(" · ")}</p>}<p><b>Related scam types to review:</b> {score?.families.length ? score.families.map(item => item.name).join(" · ") : "No family relationship activated by these rules."}</p></> : <p>No exact phrase from the small English pilot catalog matched. That does not mean the message is safe.</p>}
        {score && <details className="score-method"><summary>About these scores and terms</summary><p><b>Warning-sign total (TSS, Threat Signal Score):</b> weighted total of matched catalog phrases ({score.tss}). <b>Warning-sign level (TSSN, Normalized Threat Signal Score):</b> TSS shown on a 0–100 scale ({score.tssn}). <b>Pattern fit:</b> how detected signs connect to a defined behavior ({score.ps}/100). <b>EQ (Evidence Quality), CS (Confidence Score), and TI (Threat Index)</b> need reviewed public evidence linked to this specific sample, so they are unavailable here. These are rule outputs, not a probability or verdict.</p></details>}<HonestNote>The browser checks a limited English phrase catalog. A match is a clue to verify; no match does not establish safety.</HonestNote></div>}
      {cloudResult && <div className="model-result" aria-live="polite"><div className="analysis-result-head"><b>AI-assisted observations</b><span>{cloudResult.modality} · review the source</span></div><p>{cloudResult.analysis.summary}</p>{cloudResult.transcript && <p><b>Transcript:</b> {cloudResult.transcript}</p>}{cloudSignals.length ? <ul>{cloudSignals.map(item => { const signal = signals.find(entry => entry.id === item.id); return signal ? <li key={item.id}><b>{item.id} · {signal.name}</b><span>{item.observed_text} — {item.rationale}</span></li> : null; })}</ul> : <p>No catalog warning signs were returned.</p>}{getNames(cloudResult.analysis.patterns.map(item => item.id), patterns).length > 0 && <p><b>Related tactics:</b> {getNames(cloudResult.analysis.patterns.map(item => item.id), patterns).map(item => item.name).join(" · ")}</p>}{getNames(cloudResult.analysis.family_ids, scamFamilies).length > 0 && <p><b>Related scam types:</b> {getNames(cloudResult.analysis.family_ids, scamFamilies).map(item => item.name).join(" · ")}</p>}{cloudResult.analysis.uncertainty.length > 0 && <p><b>What is uncertain:</b> {cloudResult.analysis.uncertainty.join(" · ")}</p>}<HonestNote>AI suggestions may be wrong. They are not a fraud verdict or a validated prediction.</HonestNote></div>}
    </div>
  </section>;
}
