"use client";

import { useMemo, useState } from "react";
import { analyzeText, patterns, scamFamilies, signals } from "../lib/intelligence";
import { scoreAnalysis } from "../lib/scoring";

type Result = { modality: string; transcript?: string; analysis: { summary: string; signals: { id: string; observed_text: string; rationale: string }[]; patterns: { id: string; rationale: string }[]; family_ids: string[]; uncertainty: string[] } };

export default function MultimodalExplorer() {
  const [modality, setModality] = useState<"text" | "image" | "audio">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const examples = ["Guaranteed 30% monthly returns", "I am a SEBI-certified analyst. Download this unofficial trading app and join today.", "Pay a fee before withdrawal"];
  const accept = modality === "image" ? "image/jpeg,image/png,image/webp" : "audio/webm,audio/wav,audio/mpeg,audio/mp4,audio/ogg";

  const score = useMemo(() => {
    if (!result) return null;
    // Score only deterministic phrase matches. For image input, use only the model's quoted text.
    const scoreText = result.modality === "text"
      ? text
      : result.modality === "audio"
        ? result.transcript || ""
        : result.analysis.signals.map((item) => item.observed_text).join(" ");
    const matched = analyzeText(scoreText);
    return scoreAnalysis(matched.evidence, matched.patterns, null);
  }, [result, text]);

  async function analyze() {
    setMessage(""); setResult(null);
    if (!consent) { setMessage("Choose the cloud-processing consent box before sending this sample."); return; }
    if (modality === "text" && text.trim().length < 6) { setMessage("Enter at least six characters."); return; }
    if (modality !== "text" && !file) { setMessage("Choose an image or audio file first."); return; }
    if (file && file.size > 3 * 1024 * 1024) { setMessage("Files must be 3 MB or smaller in this pilot."); return; }
    setBusy(true);
    try {
      const payload: { modality: string; text?: string; file?: string; consent: boolean } = { modality, consent };
      if (modality === "text") payload.text = text;
      else payload.file = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Could not read file."));
        reader.onerror = () => reject(new Error("Could not read file.")); reader.readAsDataURL(file!);
      });
      const response = await fetch("/api/analyze", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis could not complete.");
      setResult(data);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Analysis could not complete."); }
    finally { setBusy(false); }
  }

  const selectedNames = (ids: string[], catalog: readonly { id: string; name: string }[]) => ids.map((id) => catalog.find((entry) => entry.id === id)).filter((entry): entry is { id: string; name: string } => Boolean(entry));

  return <section className="multimodal-section hero-explorer" id="analysis" aria-labelledby="multimodal-title">
    <div className="section-heading"><p className="eyebrow">TRY THE EARLY DEMO</p><h2 id="multimodal-title">Explore a message</h2><p className="section-lead">See possible warning signs and how they connect. This is a research preview, not a safe/scam verdict.</p></div>
    <div className="multimodal-panel">
      <div className="modality-tabs" role="group" aria-label="Input type">{(["text", "image", "audio"] as const).map((item) => <button key={item} type="button" className={item === modality ? "selected" : ""} onClick={() => { setModality(item); setFile(null); setResult(null); setMessage(""); }}>{item === "audio" ? "Voice" : item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      {modality === "text" ? <><textarea aria-label="Text sample" maxLength={12000} value={text} onChange={(event) => { setText(event.target.value); setResult(null); }} placeholder="Paste a WhatsApp, SMS, email, or investment offer…" /><div className="example-chips" aria-label="Try a sample message">{examples.map((example) => <button type="button" key={example} onClick={() => { setModality("text"); setText(example); setResult(null); setMessage(""); }}>{example}</button>)}</div></> : <label className="media-input">{modality === "image" ? "Choose an image" : "Choose an audio recording"}<small>{file ? `${file.name} · ${(file.size / 1024).toFixed(0)} KB` : "Maximum 3 MB. Your file is sent to the configured provider only after consent."}<input type="file" accept={accept} onChange={(event) => { setFile(event.target.files?.[0] || null); setResult(null); }} /></small></label>}
      <label className="cloud-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> Send this sample to the external AI provider only after you opt in. NIGRAH does not persist the sample; the provider’s data-handling terms apply.</label>
      <button className="primary-btn" type="button" disabled={busy} onClick={analyze}>{busy ? "Analyzing…" : "Explore signals →"}</button>
      {message && <p className="model-message" role="status">{message}</p>}
      {result && <div className="model-result" aria-live="polite">
        <p>{result.analysis.summary}</p>{result.transcript && <p><b>Transcript:</b> {result.transcript}</p>}
        <h3>Observed indicators</h3>{result.analysis.signals.length ? <ul>{result.analysis.signals.map((item) => { const signal = signals.find((entry) => entry.id === item.id); return signal ? <li key={item.id}><b>{item.id} · {signal.name}</b><span>{item.observed_text} — {item.rationale}</span></li> : null; })}</ul> : <p>No catalog signals were returned.</p>}
        {selectedNames(result.analysis.patterns.map((item) => item.id), patterns).length > 0 && <p><b>Model-suggested patterns:</b> {selectedNames(result.analysis.patterns.map((item) => item.id), patterns).map((item) => `${item.id} ${item.name}`).join(" · ")}</p>}
        {selectedNames(result.analysis.family_ids, scamFamilies).length > 0 && <p><b>Model-suggested families:</b> {selectedNames(result.analysis.family_ids, scamFamilies).map((item) => `${item.id} ${item.name}`).join(" · ")}</p>}
        {result.analysis.uncertainty.length > 0 && <p><b>Uncertainty:</b> {result.analysis.uncertainty.join(" · ")}</p>}
        {score && <section className="analysis-score" aria-labelledby="analysis-score-title">
          <div className="analysis-score-heading"><div><h3 id="analysis-score-title">Warning-sign score</h3><p>This number counts catalog clues found by fixed phrase rules. It is not the chance that a message is fraudulent.</p></div><span>RESEARCH PREVIEW</span></div>
          <div className="score-metrics">
            <div><small>Warning-sign total <abbr title="Threat Signal Score">TSS</abbr></small><b>{score.tss}</b><span className="score-metric-help">Sum of weights for matched signals.</span></div>
            <div><small>Warning-sign level (0–100) <abbr title="Normalized Threat Signal Score">TSSN</abbr></small><b>{score.tssn}</b><span className="score-metric-help">TSS rescaled from 0 to 100.</span></div>
            <div><small>How clues fit together</small><b>{score.ps}</b><span className="score-metric-help">How strongly detected signals connect to a defined behavior pattern.</span></div>
            <div><small>Phrase match strength</small><b>{score.ss}{score.tss ? " · rule-based" : ""}</b><span className="score-metric-help">Strength assigned by deterministic catalog rules.</span></div>
            <div><small>Source quality <abbr title="Evidence Quality">EQ</abbr></small><b>{score.eq ?? "N/A"}</b><span className="score-metric-help">Quality of linked, reviewed public sources.</span></div>
            <div><small>Confidence <abbr title="Confidence Score">CS</abbr></small><b>{score.cs ?? "N/A"}</b><span className="score-metric-help">Requires source quality and stable family matches.</span></div>
            <div><small>Overall threat level <abbr title="Threat Index">TI</abbr></small><b>{score.ti ?? "N/A"}</b><span className="score-metric-help">Combined index; unavailable when required evidence is missing.</span></div>
            <div><small>Risk range</small><b>{score.riskLevel ?? "N/A"}</b><span className="score-metric-help">Only shown when a Threat Index can be calculated.</span></div>
          </div>
          {score.families.length > 0 && <div className="analysis-score-families"><h4>Structural family matches · pattern overlap, not probability</h4>{score.families.map((family) => <div key={family.id}><span><b>{family.name}</b><small>{family.id} · expert-assigned harm prior {family.harmScore}</small></span><b>{family.similarity}%</b></div>)}</div>}
          <details className="score-method"><summary>What do the score terms mean?</summary><p><b>TSS</b> is the weighted total of matching warning signs. <b>TSSN</b> puts that total on a 0–100 scale. <b>Pattern consistency</b> describes how well the clues connect to a known behavior. <b>Evidence Quality</b> reflects the reviewed sources linked to a case; <b>Confidence</b> and the <b>Threat Index</b> need evidence inputs that this sample check does not have, so they may show as unavailable.</p></details><p className="model-limit">A high number is not proof. A low number does not mean safe. Check the original source and verify before acting.</p>
        </section>}
        <p className="model-limit">AI observations can be mistaken. Treat them as clues to review, not a final answer.</p>
      </div>}
    </div>
  </section>;
}
