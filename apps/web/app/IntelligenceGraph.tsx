"use client";

import { useState } from "react";
import { patterns, scamFamilies, signals } from "../lib/intelligence";

const signalPositions = (count: number, height: number) => Array.from({ length: count }, (_, index) => height * (index + 1) / (count + 1));

export default function IntelligenceGraph() {
  const [signalId, setSignalId] = useState("TS-04");
  const signal = signals.find((item) => item.id === signalId) ?? signals[0];
  const linkedPatterns = patterns.filter((pattern) => pattern.signals.some((id) => id === signal.id));
  const linkedPatternIds = new Set(linkedPatterns.map((item) => item.id));
  const linkedFamilies = scamFamilies.filter((family) => family.patterns.some((id) => linkedPatternIds.has(id)));
  const height = Math.max(280, Math.max(linkedPatterns.length, linkedFamilies.length) * 76 + 70);
  const signalY = height / 2;
  const patternYs = signalPositions(linkedPatterns.length, height);
  const familyYs = signalPositions(linkedFamilies.length, height);

  return <section className="graph-section" id="graph" aria-labelledby="graph-title">
    <div className="section-heading graph-heading">
      <p className="eyebrow">FOLLOW A RED FLAG</p>
      <h2 id="graph-title">Pick a warning sign. See where it leads.</h2>
      <p className="section-lead">Warning signs can point to tricks scammers use; those tricks can appear in different scam types. Choose one clue to explore the catalog links.</p>
    </div>
    <div className="graph-panel">
      <div className="graph-controls">
        <label htmlFor="graph-signal">Choose a warning sign</label>
        <select id="graph-signal" value={signalId} onChange={(event) => setSignalId(event.target.value)}>
          {signals.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.name}</option>)}
        </select>
        <span>{linkedPatterns.length} related tricks · {linkedFamilies.length} scam types</span>
      </div>
      <div className="graph-scroll" role="img" aria-label={`${signal.id} ${signal.name} links to ${linkedPatterns.length} patterns and ${linkedFamilies.length} threat families`}>
        <svg viewBox={`0 0 980 ${height}`} width="980" height={height} aria-hidden="true">
          <text x="24" y="24" className="graph-column-label">WARNING SIGN</text>
          <text x="365" y="24" className="graph-column-label">TRICKS</text>
          <text x="710" y="24" className="graph-column-label">SCAM TYPES</text>
          {linkedPatterns.map((pattern, index) => {
            const py = patternYs[index];
            const patternFamilies = linkedFamilies.filter((family) => family.patterns.some((id) => id === pattern.id));
            return <g key={pattern.id}>
              <path className="graph-edge" d={`M 230 ${signalY} C 285 ${signalY}, 305 ${py}, 360 ${py}`} />
              <rect className="graph-node pattern" x="360" y={py - 25} width="250" height="50" rx="9" />
              <text className="graph-node-id" x="376" y={py - 4}>{pattern.id}</text>
              <text className="graph-node-label" x="376" y={py + 13}>{pattern.name}</text>
              {patternFamilies.map((family) => {
                const fi = linkedFamilies.findIndex((item) => item.id === family.id);
                const fy = familyYs[fi];
                return <path key={`${pattern.id}-${family.id}`} className="graph-edge family-edge" d={`M 610 ${py} C 654 ${py}, 665 ${fy}, 700 ${fy}`} />;
              })}
            </g>;
          })}
          <rect className="graph-node signal" x="20" y={signalY - 31} width="210" height="62" rx="10" />
          <text className="graph-node-id" x="38" y={signalY - 6}>{signal.id}</text>
          <text className="graph-node-label" x="38" y={signalY + 14}>{signal.name}</text>
          {linkedFamilies.map((family, index) => {
            const fy = familyYs[index];
            return <g key={family.id}>
              <rect className="graph-node family" x="700" y={fy - 25} width="255" height="50" rx="9" />
              <text className="graph-node-id" x="716" y={fy - 4}>{family.id}</text>
              <text className="graph-node-label" x="716" y={fy + 13}>{family.name}</text>
            </g>;
          })}
        </svg>
      </div>
      <p className="graph-note">These links come from the reviewed model catalog. They show possible relationships, not live reports or proof about a specific message.</p>
    </div>
  </section>;
}
