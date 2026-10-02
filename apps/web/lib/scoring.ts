/** Deterministic NIGRAH MVP scoring rules from SCORING_AMENDMENT_v1.2. */
import { familyHarmPriorMetadata, patterns, scamFamilies, signals, type PatternMatch, type SignalEvidence } from "./intelligence";

export type AnalysisState = "full_intelligence" | "partial_intelligence" | "no_intelligence";
export type ScoredFamily = { id: string; name: string; similarity: number; harmScore: number };
export type ScoringResult = {
  state: AnalysisState;
  tss: number;
  tssn: number;
  ps: number;
  pc: number;
  fhs: number | null;
  fss: number | null;
  fs: number | null;
  eq: number | null;
  ss: number;
  cs: number | null;
  ti: number | null;
  riskLevel: "LOW" | "MODERATE" | "ELEVATED" | "HIGH" | "CRITICAL" | null;
  families: ScoredFamily[];
  familyHarmPrior: typeof familyHarmPriorMetadata;
  unavailableReasons: string[];
};

export const scoringVersion = "nigrah-scoring/1.2.0";
const round = (value: number) => Math.round(value * 100) / 100;
const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * `evidenceQuality` must come from linked public evidence sources. Pass null
 * for a user-submitted message without corroborating public intelligence.
 */
export function scoreAnalysis(evidence: SignalEvidence[], activePatterns: PatternMatch[], evidenceQuality: number | null): ScoringResult {
  const uniqueEvidence = [...new Map(evidence.map((item) => [item.id, item])).values()];
  const uniqueSignalIds = uniqueEvidence.map((item) => item.id);
  const signalById = new Map(signals.map((signal) => [signal.id, signal]));
  const tss = uniqueSignalIds.reduce((total, id) => total + (signalById.get(id)?.weight ?? 0), 0);
  const tssn = round(clamp((tss / 197) * 100));
  const signalStrength = uniqueEvidence.length
    ? round(uniqueEvidence.reduce((sum, item) => sum + item.confidence, 0) / uniqueEvidence.length)
    : 0;
  const consistency = activePatterns.length
    ? round(activePatterns.reduce((sum, item) => sum + item.strength * 100, 0) / activePatterns.length)
    : 0;

  const activePatternIds = new Set(activePatterns.map((item) => item.id));
  const rankedFamilies = scamFamilies
    .map((family) => ({
      id: family.id,
      name: family.name,
      similarity: round((family.patterns.filter((id) => activePatternIds.has(id)).length / family.patterns.length) * 100),
      harmScore: family.harmScore,
    }))
    .filter((family) => family.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity || b.harmScore - a.harmScore || a.id.localeCompare(b.id));
  const families = rankedFamilies.slice(0, 3);
  const primaryFamily = families[0];
  const familyStability = !primaryFamily ? null : families.length === 1
    ? 100
    : round(primaryFamily.similarity - families[1].similarity);
  const eq = evidenceQuality === null ? null : round(clamp(evidenceQuality));
  const confidence = eq === null || familyStability === null
    ? null
    : round(clamp(0.4 * eq + 0.3 * signalStrength + 0.2 * consistency + 0.1 * familyStability));

  const unavailableReasons: string[] = [];
  if (uniqueSignalIds.length === 0) unavailableReasons.push("No threat signals were detected.");
  if (activePatterns.length === 0) unavailableReasons.push("No manipulation patterns were activated.");
  if (families.length === 0) unavailableReasons.push("No scam family matched the activated patterns.");
  if (eq === null) unavailableReasons.push("Evidence Quality is unavailable because no public intelligence source is linked to this browser-only analysis.");
  if (familyStability === null) unavailableReasons.push("Family Stability is unavailable because no family matched.");

  const requirementsMet = uniqueSignalIds.length > 0 && activePatterns.length > 0 && families.length > 0;
  const ti = requirementsMet && confidence !== null && primaryFamily
    ? round(clamp(0.3 * tssn + 0.2 * consistency + 0.2 * primaryFamily.harmScore + 0.15 * primaryFamily.similarity + 0.15 * confidence))
    : null;
  const riskLevel = ti === null ? null
    : ti <= 20 ? "LOW"
      : ti <= 40 ? "MODERATE"
        : ti <= 60 ? "ELEVATED"
          : ti <= 80 ? "HIGH" : "CRITICAL";

  return {
    state: uniqueSignalIds.length === 0 ? "no_intelligence" : ti === null ? "partial_intelligence" : "full_intelligence",
    tss,
    tssn,
    ps: consistency,
    pc: consistency,
    fhs: primaryFamily?.harmScore ?? null,
    fss: primaryFamily?.similarity ?? null,
    fs: familyStability,
    eq,
    ss: signalStrength,
    cs: confidence,
    ti,
    riskLevel,
    families,
    familyHarmPrior: familyHarmPriorMetadata,
    unavailableReasons,
  };
}

// Retain the canonical pattern catalog import in this module to make it easy
// for callers to inspect the same versioned mapping used by the scorer.
export const scoringPatternCatalog = patterns;

export function calculateEvidenceQuality(sourceReliabilities: number[]): number | null {
  if (sourceReliabilities.length === 0) return null;
  return round(sourceReliabilities.reduce((sum, score) => sum + clamp(score), 0) / sourceReliabilities.length);
}
