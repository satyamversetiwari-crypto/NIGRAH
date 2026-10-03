import MultimodalExplorer from "./MultimodalExplorer";
import StoryExperience from "./StoryExperience";
import RedFlagGallery from "./RedFlagGallery";

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="NIGRAH home"><img src="/brand/nigrah-geometric.png" alt="NIGRAH" /></a>
      <nav aria-label="Main navigation"><a href="#story">See the model in action</a><a href="#red-flags">Warning signs</a><a href="/model">How NIGRAH works</a></nav>
      <a className="nav-cta" href="#analysis">Explore a sample <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> FINANCIAL THREAT INTELLIGENCE</p>
        <h1>Financial threats leave patterns. <span>We connect them.</span></h1>
        <p className="intro">NIGRAH organizes public evidence into connected warning signs and behaviors, helping people study how financial threats take shape and change.</p>
        <a className="hero-story-link" href="#story">See a 60-second practice story <span aria-hidden="true">↓</span></a>
        <p className="micro-trust"><span aria-hidden="true">⌁</span> Public evidence · Connected patterns · Explainable scores</p>
      </div>
      <MultimodalExplorer />
    </section>

    <StoryExperience />
    <RedFlagGallery />

    <section className="action-section" aria-labelledby="action-title">
      <p className="eyebrow">IF A MESSAGE FEELS WRONG</p><h2 id="action-title">Pause. Verify. Report.</h2>
      <div className="action-grid"><article><span>01</span><h3>Pause</h3><p>Do not rush to pay, share an OTP, or send documents.</p></article><article><span>02</span><h3>Verify</h3><p>Check the person or firm through an official source before acting.</p><a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes" target="_blank" rel="noreferrer">Search SEBI intermediaries ↗</a></article><article><span>03</span><h3>Report</h3><p>Lost money? Contact India’s cybercrime helpline. Suspect a fraud message or call? Report it to Chakshu.</p><div className="report-links"><a href="tel:1930">Call 1930</a><a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">Cybercrime portal ↗</a><a href="https://sancharsaathi.gov.in/sfc/" target="_blank" rel="noreferrer">Chakshu ↗</a></div></article></div>
    </section>

    <section className="trust-strip" aria-label="NIGRAH principles"><div><span aria-hidden="true">▤</span><p><b>Public sources</b><small>Evidence has a source to inspect.</small></p></div><div><span aria-hidden="true">⌕</span><p><b>Reasoning shown</b><small>See which phrases and links appeared.</small></p></div><div><span aria-hidden="true">◇</span><p><b>Evidence-linked scores</b><small>Trace the connections behind a result.</small></p></div></section>

    <section className="model-invitation"><p className="eyebrow">THE NIGRAH MODEL</p><h2>See how evidence becomes a connected picture.</h2><p>Explore the signal taxonomy, behavior graph, family matching, and the scoring framework behind every result.</p><a className="primary-btn" href="/model">Explore the model <span aria-hidden="true">↗</span></a></section>
    <footer id="privacy"><div className="footer-top"><a className="footer-brand" href="/" aria-label="NIGRAH home"><img src="/brand/nigrah-geometric.png" alt="NIGRAH"/><span>Financial threat intelligence research and technology.</span></a><div className="footer-links"><a href="/model">The model</a><a href="#analysis">Analyze a sample</a><a href="#red-flags">Warning signs</a></div><div className="footer-links"><a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes" target="_blank" rel="noreferrer">SEBI intermediary search ↗</a><a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">Report on the cybercrime portal ↗</a><a href="https://sancharsaathi.gov.in/sfc/" target="_blank" rel="noreferrer">Chakshu ↗</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NIGRAH</span><span>Financial threat intelligence research and technology</span></div></footer>
  </main>;
}
