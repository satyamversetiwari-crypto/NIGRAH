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

  return <section className="multimodal-section" id="analysis" aria-labelledby="multimodal-title">
    <div className="section-heading"><p className="eyebrow">OPTIONAL MODEL ASSISTANCE</p><h2 id="multimodal-title">Explore text, image, or voice signals.</h2><p className="section-lead">This exploratory feature uses an external model only after you opt in. It does not produce a calibrated Threat Index or a fraud verdict.</p></div>
    <div className="multimodal-panel">
      <div className="modality-tabs" role="group" aria-label="Input type">{(["text", "image", "audio"] as const).map((item) => <button key={item} type="button" className={item === modality ? "selected" : ""} onClick={() => { setModality(item); setFile(null); setResult(null); setMessage(""); }}>{item === "audio" ? "Voice" : item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      {modality === "text" ? <textarea aria-label="Text sample" maxLength={12000} value={text} onChange={(event) => { setText(event.target.value); setResult(null); }} placeholder="Paste the message or content to explore…" /> : <label className="media-input">{modality === "image" ? "Choose an image" : "Choose an audio recording"}<small>{file ? `${file.name} · ${(file.size / 1024).toFixed(0)} KB` : "Maximum 3 MB. Your file is sent to the configured provider only after consent."}<input type="file" accept={accept} onChange={(event) => { setFile(event.target.files?.[0] || null); setResult(null); }} /></small></label>}
      <label className="cloud-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> Send this sample to the configured AI provider for analysis. NIGRAH does not save the submitted content.</label>
      <button className="primary-btn" type="button" disabled={busy} onClick={analyze}>{busy ? "Analyzing…" : "Explore signals →"}</button>
      {message && <p className="model-message" role="status">{message}</p>}
      {result && <div className="model-result" aria-live="polite">
        <p>{result.analysis.summary}</p>{result.transcript && <p><b>Transcript:</b> {result.transcript}</p>}
        <h3>Observed indicators</h3>{result.analysis.signals.length ? <ul>{result.analysis.signals.map((item) => { const signal = signals.find((entry) => entry.id === item.id); return signal ? <li key={item.id}><b>{item.id} · {signal.name}</b><span>{item.observed_text} — {item.rationale}</span></li> : null; })}</ul> : <p>No catalog signals were returned.</p>}
        {selectedNames(result.analysis.patterns.map((item) => item.id), patterns).length > 0 && <p><b>Model-suggested patterns:</b> {selectedNames(result.analysis.patterns.map((item) => item.id), patterns).map((item) => `${item.id} ${item.name}`).join(" · ")}</p>}
        {selectedNames(result.analysis.family_ids, scamFamilies).length > 0 && <p><b>Model-suggested families:</b> {selectedNames(result.analysis.family_ids, scamFamilies).map((item) => `${item.id} ${item.name}`).join(" · ")}</p>}
        {result.analysis.uncertainty.length > 0 && <p><b>Uncertainty:</b> {result.analysis.uncertainty.join(" · ")}</p>}
        {score && <section className="analysis-score" aria-labelledby="analysis-score-title">
          <div className="analysis-score-heading"><div><h3 id="analysis-score-title">Deterministic score components</h3><p>Calculated from catalog phrase matches, not the model's confidence. Unmatched model observations are shown above and excluded from this score.</p></div><span>SCORING v1.2</span></div>
          <div className="score-metrics">
            <div><small>Threat Signal Score (TSS)</small><b>{score.tss}</b><span className="score-metric-help">Sum of weights for matched signals.</span></div>
            <div><small>Normalized Threat Signal Score (TSSN)</small><b>{score.tssn}</b><span className="score-metric-help">TSS rescaled from 0 to 100.</span></div>
            <div><small>Pattern consistency</small><b>{score.ps}</b><span className="score-metric-help">How strongly detected signals connect to a defined behavior pattern.</span></div>
            <div><small>Phrase-match strength</small><b>{score.ss}{score.tss ? " · rule-based" : ""}</b><span className="score-metric-help">Strength assigned by deterministic catalog rules.</span></div>
            <div><small>Evidence Quality (EQ)</small><b>{score.eq ?? "N/A"}</b><span className="score-metric-help">Quality of linked, reviewed public sources.</span></div>
            <div><small>Confidence Score (CS)</small><b>{score.cs ?? "N/A"}</b><span className="score-metric-help">Requires source quality and stable family matches.</span></div>
            <div><small>Threat Index (TI)</small><b>{score.ti ?? "N/A"}</b><span className="score-metric-help">Combined index; unavailable when required evidence is missing.</span></div>
            <div><small>Risk band</small><b>{score.riskLevel ?? "N/A"}</b><span className="score-metric-help">Only shown when a Threat Index can be calculated.</span></div>
          </div>
          {score.families.length > 0 && <div className="analysis-score-families"><h4>Structural family matches · pattern overlap, not probability</h4>{score.families.map((family) => <div key={family.id}><span><b>{family.name}</b><small>{family.id} · expert-assigned harm prior {family.harmScore}</small></span><b>{family.similarity}%</b></div>)}</div>}
          <p className="model-limit">Threat Index and confidence stay unavailable until this analysis is linked to reviewed public evidence. Phrase-rule scores are preliminary and are not a fraud verdict.</p>
        </section>}
        <p className="model-limit">Model observations are exploratory. Verify them against original sources; they are not validated predictions.</p>
      </div>}
    </div>
  </section>;
}
