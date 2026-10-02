/**
 * NIGRAH deterministic text analysis, catalog v0.1.
 * Phrase rules are an exploratory preview, not a trained or calibrated model.
 */
export const catalogVersion = "nigrah-text-catalog/0.1.0";

type SignalRule = { id: string; label: string; patterns: RegExp[] };
export type SignalEvidence = { id: string; label: string; matches: string[] };
export type PatternMatch = { id: string; label: string; score: number; signals: string[] };

const signals: SignalRule[] = [
  { id: "TS-01", label: "Guaranteed or fixed returns", patterns: [/\bguaranteed returns?\b/ig, /\brisk[- ]free\b/ig, /\bassured returns?\b/ig, /\bfixed (?:daily|weekly|monthly) returns?\b/ig] },
  { id: "TS-02", label: "Unusually high returns", patterns: [/\b\d+\s*%\s*(?:daily|weekly|monthly)\b/ig, /\bdouble your money\b/ig, /\b\d+x returns?\b/ig] },
  { id: "TS-03", label: "Regulatory or official authority claim", patterns: [/\bSEBI[- ](?:registered|certified|approved)\b/ig, /\bgovernment[- ]approved\b/ig, /\blicensed (?:by|with) SEBI\b/ig] },
  { id: "TS-04", label: "Impersonated identity", patterns: [/\bofficial (?:SEBI|broker|bank) (?:account|support)\b/ig, /\b(?:we are|I'm) (?:from|with) SEBI\b/ig] },
  { id: "TS-05", label: "Expert or insider positioning", patterns: [/\binsider (?:information|expert|tip)\b/ig, /\bcertified analyst\b/ig, /\bmarket expert\b/ig] },
  { id: "TS-06", label: "Urgency", patterns: [/\bact now\b/ig, /\bjoin today\b/ig, /\blast chance\b/ig, /\bclosing soon\b/ig, /\bonly today\b/ig] },
  { id: "TS-07", label: "Scarcity or exclusivity", patterns: [/\bonly \d+ seats?\b/ig, /\blimited seats?\b/ig, /\binvite[- ]only\b/ig, /\bVIP slots?\b/ig] },
  { id: "TS-08", label: "Time-limited offer", patterns: [/\boffer expires? (?:today|in \d+ hours?)\b/ig, /\bsubscribe before midnight\b/ig] },
  { id: "TS-09", label: "Social proof or profit claims", patterns: [/\bprofit screenshots?\b/ig, /\beveryone is earning\b/ig, /\bsuccess stories\b/ig, /\b(?:members|users) earned \d+\b/ig] },
  { id: "TS-10", label: "Group or crowd pressure", patterns: [/\bjoin (?:our|the) (?:telegram|whatsapp) group\b/ig, /\bthousands have joined\b/ig] },
  { id: "TS-11", label: "Trust-building claim", patterns: [/\btrusted (?:by|for) (?:years|thousands)\b/ig, /\bpersonally guarantee\b/ig] },
  { id: "TS-12", label: "Exclusive access claim", patterns: [/\bexclusive access\b/ig, /\bprivate investor circle\b/ig, /\bselected investors only\b/ig] },
  { id: "TS-13", label: "Relationship or mentorship framing", patterns: [/\bI will guide you personally\b/ig, /\byour personal mentor\b/ig] },
  { id: "TS-14", label: "Testimonial or endorsement", patterns: [/\bcelebrity endorsed\b/ig, /\bendorsed by [A-Z][\w ]+\b/g, /\bclient testimonials?\b/ig] },
  { id: "TS-15", label: "Payment diversion", patterns: [/\bpersonal (?:bank )?account\b/ig, /\bpay (?:to|into)\b/ig, /\btransfer (?:the )?funds? now\b/ig, /\bUPI ID\b/ig] },
  { id: "TS-16", label: "Withdrawal restriction or advance fee", patterns: [/\bfee before withdrawal\b/ig, /\btax before withdrawal\b/ig, /\bwithdrawal.{0,35}(?:fee|blocked|unlock)\b/ig] },
  { id: "TS-17", label: "Compounding or bonus promise", patterns: [/\bbonus returns?\b/ig, /\bcompound(?:ed|ing)? daily\b/ig, /\bdouble your investment\b/ig] },
  { id: "TS-18", label: "Additional payment to release funds", patterns: [/\bpay (?:a )?(?:release|verification|processing) fee\b/ig, /\bpay to unlock (?:your )?funds\b/ig] },
  { id: "TS-19", label: "Claimed non-public information", patterns: [/\binsider information\b/ig, /\bnon-public (?:information|news)\b/ig, /\bconfidential market tip\b/ig] },
  { id: "TS-20", label: "Unverifiable source claim", patterns: [/\bsecret source\b/ig, /\bsource cannot be disclosed\b/ig, /\bconfidential source\b/ig] },
  { id: "TS-21", label: "Complexity used to justify returns", patterns: [/\bproprietary algorithm\b/ig, /\bquantum trading system\b/ig, /\bcomplex strategy\b/ig] },
  { id: "TS-22", label: "Targeted or opportunistic approach", patterns: [/\bwe selected you\b/ig, /\byou have been chosen\b/ig, /\btargeted offer\b/ig] },
  { id: "TS-23", label: "Misused official identity", patterns: [/\bSEBI (?:approval|certificate|logo)\b/ig, /\bofficial government seal\b/ig] },
  { id: "TS-24", label: "Digital identity or platform claim", patterns: [/\bofficial trading app\b/ig, /\bdownload our investment app\b/ig, /\bclone (?:website|app)\b/ig] },
  { id: "TS-25", label: "Referral or recruitment pressure", patterns: [/\binvite \d+ friends\b/ig, /\bearn (?:more|a bonus) for each referral\b/ig, /\brecruit (?:two|three|more) (?:people|members)\b/ig] },
];

const patternDefs = [
  { id: "MP-01", label: "Authority exploitation", weights: { "TS-03": .35, "TS-04": .35, "TS-05": .15, "TS-23": .15 } },
  { id: "MP-02", label: "Greed and exceptional-return appeal", weights: { "TS-01": .4, "TS-02": .4, "TS-17": .2 } },
  { id: "MP-03", label: "Pressure and urgency", weights: { "TS-06": .5, "TS-07": .3, "TS-08": .2 } },
  { id: "MP-04", label: "Social validation", weights: { "TS-09": .45, "TS-10": .3, "TS-14": .25 } },
  { id: "MP-05", label: "Trust harvesting", weights: { "TS-11": .4, "TS-12": .3, "TS-13": .3 } },
  { id: "MP-06", label: "Information asymmetry", weights: { "TS-19": .4, "TS-20": .35, "TS-21": .25 } },
  { id: "MP-07", label: "Financial entrapment", weights: { "TS-15": .3, "TS-16": .35, "TS-18": .35 } },
  { id: "MP-08", label: "Opportunistic targeting", weights: { "TS-22": 1 } },
  { id: "MP-09", label: "Digital identity manipulation", weights: { "TS-04": .35, "TS-23": .3, "TS-24": .35 } },
  { id: "MP-10", label: "Network expansion", weights: { "TS-25": .65, "TS-10": .35 } },
];

export function analyzeText(input: string): { evidence: SignalEvidence[]; patterns: PatternMatch[] } {
  const evidence = signals.flatMap((signal) => {
    const matches = new Set<string>();
    for (const regex of signal.patterns) {
      regex.lastIndex = 0;
      for (const match of input.matchAll(regex)) matches.add(match[0]);
    }
    return matches.size ? [{ id: signal.id, label: signal.label, matches: [...matches] }] : [];
  });
  const found = new Set(evidence.map((item) => item.id));
  const patterns = patternDefs.flatMap((pattern) => {
    const signals = Object.keys(pattern.weights).filter((id) => found.has(id));
    const score = Object.entries(pattern.weights).reduce((sum, [id, weight]) => sum + (found.has(id) ? weight : 0), 0);
    return score > 0 ? [{ id: pattern.id, label: pattern.label, score: Math.round(score * 100), signals }] : [];
  }).sort((a, b) => b.score - a.score);
  return { evidence, patterns };
}
