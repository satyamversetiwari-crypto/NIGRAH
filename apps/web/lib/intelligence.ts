/**
 * NIGRAH MVP catalog aligned to INTELLIGENCE_SPEC.md v1.0.
 * Text rules are illustrative candidates; they are not validated detectors.
 */
export const catalogVersion = "nigrah-intelligence-spec/1.0.0";

export type SignalDefinition = {
  id: string;
  name: string;
  category: string;
  weight: number;
  examples: string[];
  textRules: RegExp[];
  limitation?: string;
};

export type SignalEvidence = { id: string; label: string; matches: string[] };
export type PatternMatch = {
  id: string;
  label: string;
  matchedSignals: string[];
  totalSignals: number;
};

export const signals: SignalDefinition[] = [
  { id: "TS-01", name: "Guaranteed Return", category: "Authority", weight: 10, examples: ["Guaranteed 20% returns", "Fixed monthly income", "Risk-free profits"], textRules: [/\bguaranteed?\s+(?:\d+%\s+)?returns?\b/ig, /\bfixed\s+(?:daily|weekly|monthly)\s+(?:income|returns?)\b/ig, /\brisk[- ]free\s+(?:profits?|returns?)\b/ig] },
  { id: "TS-02", name: "Unrealistic Return", category: "Authority", weight: 9, examples: ["Double money in 30 days", "5x profit guaranteed"], textRules: [/\bdouble\s+(?:your\s+)?money\s+in\s+\d+\s+days?\b/ig, /\b\d+\s*x\s+(?:profit|returns?)\b/ig, /\b\d+\s*%\s*(?:daily|weekly|monthly)\s+returns?\b/ig] },
  { id: "TS-03", name: "Fake Authority", category: "Authority", weight: 9, examples: ["Fake SEBI analyst", "Fake investment advisor"], textRules: [/\b(?:fake|unofficial)\s+(?:SEBI\s+)?(?:analyst|investment advisor)\b/ig, /\bSEBI[- ](?:certified|approved)\s+analyst\b/ig] },
  { id: "TS-04", name: "Impersonation", category: "Authority", weight: 10, examples: ["Fake broker", "Fake regulator"], textRules: [/\b(?:fake|clone)\s+(?:broker|regulator|bank|SEBI)\b/ig, /\bpretend(?:ing)?\s+to\s+be\s+(?:a\s+)?(?:broker|regulator|bank|SEBI)\b/ig] },
  { id: "TS-05", name: "Unregistered Entity", category: "Authority", weight: 8, examples: ["Financial activity without visible registration"], textRules: [/\bunregistered\s+(?:entity|advisor|broker|investment firm)\b/ig, /\bnot\s+registered\s+with\s+SEBI\b/ig], limitation: "Text alone cannot establish registration status; verify through an authoritative registry." },
  { id: "TS-06", name: "Urgency", category: "Pressure", weight: 8, examples: ["Join today", "Offer expires tonight"], textRules: [/\bjoin\s+today\b/ig, /\boffer\s+expires?\s+(?:tonight|today)\b/ig, /\bact\s+now\b/ig, /\blast\s+chance\b/ig] },
  { id: "TS-07", name: "Scarcity", category: "Pressure", weight: 8, examples: ["Limited seats", "Last chance"], textRules: [/\blimited\s+(?:seats?|spots?|slots?)\b/ig, /\bonly\s+\d+\s+(?:seats?|spots?|slots?)\s+left\b/ig] },
  { id: "TS-08", name: "FOMO", category: "Pressure", weight: 7, examples: ["Everyone is joining", "Don't miss out"], textRules: [/\beveryone\s+is\s+joining\b/ig, /\bdon['’]?t\s+miss\s+out\b/ig, /\byou['’]?ll\s+miss\s+out\b/ig] },
  { id: "TS-09", name: "Social Proof", category: "Social", weight: 7, examples: ["Profit screenshots", "Success stories"], textRules: [/\bprofit\s+screenshots?\b/ig, /\bsuccess\s+stories\b/ig, /\bmembers\s+(?:are\s+)?earning\b/ig] },
  { id: "TS-10", name: "Community Pressure", category: "Social", weight: 6, examples: ["VIP group", "Exclusive investors club"], textRules: [/\bVIP\s+group\b/ig, /\bexclusive\s+investors?\s+club\b/ig, /\bjoin\s+(?:our|the)\s+(?:telegram|whatsapp)\s+group\b/ig] },
  { id: "TS-11", name: "Relationship Building", category: "Trust Harvesting", weight: 6, examples: ["Personal mentor", "Dedicated advisor"], textRules: [/\bpersonal\s+mentor\b/ig, /\bdedicated\s+advisor\b/ig, /\bi['’]?ll\s+guide\s+you\s+personally\b/ig] },
  { id: "TS-12", name: "Exclusivity", category: "Trust Harvesting", weight: 6, examples: ["Invite-only access", "Secret strategy"], textRules: [/\binvite[- ]only\s+(?:access|group|membership)\b/ig, /\bsecret\s+strategy\b/ig, /\bselected\s+investors?\s+only\b/ig] },
  { id: "TS-13", name: "Reciprocity", category: "Trust Harvesting", weight: 5, examples: ["Free signal", "Free training"], textRules: [/\bfree\s+(?:signal|training|investment\s+course)\b/ig, /\bcomplimentary\s+(?:signal|training|consultation)\b/ig] },
  { id: "TS-14", name: "Lifestyle Projection", category: "Trust Harvesting", weight: 5, examples: ["Luxury cars", "Wealth displays"], textRules: [/\bluxury\s+(?:cars?|lifestyle|villa|yacht)\b/ig, /\b(?:my|our)\s+(?:new\s+)?(?:supercar|private\s+jet)\b/ig] },
  { id: "TS-15", name: "Payment Diversion", category: "Financial Control", weight: 10, examples: ["Personal UPI payment", "Direct transfer requests"], textRules: [/\bpersonal\s+(?:bank\s+)?account\b/ig, /\bUPI\s+(?:ID|payment)\b/ig, /\btransfer\s+(?:the\s+)?funds?\s+to\s+(?:me|my|this)\b/ig] },
  { id: "TS-16", name: "Withdrawal Restriction", category: "Financial Control", weight: 10, examples: ["Pay fee before withdrawal", "Tax release charge"], textRules: [/\bfee\s+before\s+withdrawal\b/ig, /\btax\s+(?:release\s+)?charge\b/ig, /\bwithdrawal.{0,35}(?:fee|blocked|unlock)\b/ig] },
  { id: "TS-17", name: "Escalating Investment", category: "Financial Control", weight: 8, examples: ["Invest more to unlock profits"], textRules: [/\binvest\s+more\s+to\s+unlock\s+(?:profits?|returns?|funds?)\b/ig, /\badd\s+(?:more\s+)?funds?\s+to\s+release\s+(?:your\s+)?profits?\b/ig] },
  { id: "TS-18", name: "Borrow-To-Invest", category: "Financial Control", weight: 8, examples: ["Take a loan for investing"], textRules: [/\btake\s+(?:out\s+)?a\s+loan\s+to\s+invest\b/ig, /\bborrow\s+money\s+to\s+invest\b/ig, /\buse\s+your\s+credit\s+card\s+to\s+invest\b/ig] },
  { id: "TS-19", name: "Non-Transparent Claims", category: "Information", weight: 7, examples: ["No explanation of strategy"], textRules: [/\bstrategy\s+(?:is\s+)?(?:secret|confidential)\b/ig, /\bwe\s+(?:cannot|can't)\s+explain\s+(?:the\s+)?(?:method|strategy)\b/ig, /\bno\s+details\s+(?:will\s+be|are)\s+(?:shared|provided)\b/ig] },
  { id: "TS-20", name: "Complexity Shield", category: "Information", weight: 6, examples: ["Technical jargon hiding risk"], textRules: [/\bproprietary\s+algorithm\b/ig, /\bquantum\s+trading\s+system\b/ig, /\bcomplex\s+(?:strategy|formula)\s+(?:you\s+)?(?:won['’]?t|cannot)\s+understand\b/ig] },
  { id: "TS-21", name: "Insider Information", category: "Information", weight: 8, examples: ["Secret stock tip", "Confidential opportunity"], textRules: [/\binsider\s+(?:information|tip)\b/ig, /\bconfidential\s+(?:stock\s+)?(?:tip|opportunity)\b/ig, /\bsecret\s+stock\s+tip\b/ig] },
  { id: "TS-22", name: "Unsolicited Contact", category: "Information", weight: 7, examples: ["Random WhatsApp message", "Cold call"], textRules: [/\bunsolicited\s+(?:investment\s+)?(?:message|offer|call)\b/ig, /\bcold\s+call\s+(?:about|offering)\s+(?:an?\s+)?investment\b/ig], limitation: "Whether contact was unsolicited may require recipient context, not message text alone." },
  { id: "TS-23", name: "Deepfake Authority", category: "Emerging", weight: 10, examples: ["AI-generated expert"], textRules: [/\bdeepfake\s+(?:advisor|analyst|expert|official)\b/ig, /\bAI[- ]generated\s+(?:advisor|analyst|expert|official)\b/ig], limitation: "Text matches can only flag a claim about synthetic media; detection requires media and identity verification." },
  { id: "TS-24", name: "Fake Trading Application", category: "Emerging", weight: 10, examples: ["Clone broker apps"], textRules: [/\b(?:fake|clone)\s+(?:trading|broker|investment)\s+app(?:lication)?\b/ig, /\bunofficial\s+trading\s+app\b/ig] },
  { id: "TS-25", name: "Referral Pyramid", category: "Emerging", weight: 9, examples: ["Recruit to earn"], textRules: [/\brecruit\s+(?:people|members|friends)\s+to\s+earn\b/ig, /\binvite\s+\d+\s+friends\s+to\s+(?:earn|get\s+paid)\b/ig, /\breferral\s+pyramid\b/ig] },
];

export const patterns = [
  { id: "MP-01", name: "Authority Exploitation", signals: ["TS-03", "TS-04", "TS-05", "TS-23"] },
  { id: "MP-02", name: "Greed Engineering", signals: ["TS-01", "TS-02", "TS-08"] },
  { id: "MP-03", name: "Pressure Engineering", signals: ["TS-06", "TS-07"] },
  { id: "MP-04", name: "Social Validation", signals: ["TS-09", "TS-10"] },
  { id: "MP-05", name: "Trust Harvesting", signals: ["TS-11", "TS-12", "TS-13", "TS-14"] },
  { id: "MP-06", name: "Information Asymmetry", signals: ["TS-19", "TS-20", "TS-21"] },
  { id: "MP-07", name: "Financial Entrapment", signals: ["TS-15", "TS-16", "TS-17", "TS-18"] },
  { id: "MP-08", name: "Opportunistic Targeting", signals: ["TS-22"] },
  { id: "MP-09", name: "Identity Manipulation", signals: ["TS-04", "TS-23", "TS-24"] },
  { id: "MP-10", name: "Network Expansion", signals: ["TS-25"] },
] as const;

export const scamFamilies = [
  { id: "SF-01", name: "Fake Advisor Fraud", patterns: ["MP-01", "MP-05"] },
  { id: "SF-02", name: "Fake Research Analyst Fraud", patterns: ["MP-01", "MP-06"] },
  { id: "SF-03", name: "Telegram Signal Fraud", patterns: ["MP-02", "MP-03", "MP-04"] },
  { id: "SF-04", name: "WhatsApp Tip Scam", patterns: ["MP-02", "MP-03", "MP-08"] },
  { id: "SF-05", name: "Guaranteed Return Scheme", patterns: ["MP-02", "MP-05"] },
  { id: "SF-06", name: "Ponzi Scheme", patterns: ["MP-02", "MP-05", "MP-10"] },
  { id: "SF-07", name: "Pyramid Scheme", patterns: ["MP-10", "MP-05"] },
  { id: "SF-08", name: "Pump And Dump", patterns: ["MP-02", "MP-04", "MP-06"] },
  { id: "SF-09", name: "Fake Trading Application", patterns: ["MP-09", "MP-07"] },
  { id: "SF-10", name: "Clone Broker Platform", patterns: ["MP-09", "MP-01"] },
  { id: "SF-11", name: "Fake IPO Scam", patterns: ["MP-01", "MP-02"] },
  { id: "SF-12", name: "Recovery Scam", patterns: ["MP-05", "MP-07"] },
  { id: "SF-13", name: "Investment Coaching Scam", patterns: ["MP-05", "MP-02"] },
  { id: "SF-14", name: "Premium Membership Scam", patterns: ["MP-05", "MP-03"] },
  { id: "SF-15", name: "Referral Fraud", patterns: ["MP-10", "MP-02"] },
] as const;

export function analyzeText(input: string): { evidence: SignalEvidence[]; patterns: PatternMatch[] } {
  const evidence = signals.flatMap((signal) => {
    const matches = new Set<string>();
    for (const regex of signal.textRules) {
      regex.lastIndex = 0;
      for (const match of input.matchAll(regex)) matches.add(match[0]);
    }
    return matches.size ? [{ id: signal.id, label: signal.name, matches: [...matches] }] : [];
  });
  const found = new Set(evidence.map((item) => item.id));
  const matchedPatterns = patterns.flatMap((pattern) => {
    const matchedSignals = pattern.signals.filter((id) => found.has(id));
    return matchedSignals.length ? [{ id: pattern.id, label: pattern.name, matchedSignals, totalSignals: pattern.signals.length }] : [];
  });
  return { evidence, patterns: matchedPatterns };
}
