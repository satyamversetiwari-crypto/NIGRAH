"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { patterns, scamFamilies } from "../lib/intelligence";

type CharacterId = "ramesh" | "sunita";
type Mood = "relaxed" | "curious" | "excited" | "hopeful" | "uneasy" | "shocked" | "alert";
type ChatMessage = { from: "them" | "you"; text?: string; time: string; flag?: string; attachment?: "profit" | "voice"; pinned?: boolean };
type StoryStep = { id: number; mood: Mood; header: { title: string; sub: string }; chat: ChatMessage[]; headline: string; thought: string; wants: string; notices: { label: string; id: string }[]; meter: number };

const steps: StoryStep[] = [
  { id: 1, mood: "curious", header: { title: "+91 98xxx xxxxx", sub: "not in your contacts" }, chat: [
    { from: "them", text: "I am a SEBI-certified analyst. Here is a free signal. Join today.", time: "9:41 pm", flag: "SEBI-certified analyst" },
    { from: "you", text: "Okay, what is this about?", time: "9:42 pm" },
  ], headline: "A stranger says they’re an expert.", thought: "An expert? A free signal? Hmm, interesting.", wants: "You to trust a title before you check it.", notices: [{ label: "Official title", id: "TS-03" }, { label: "Free offer", id: "TS-13" }, { label: "Hurry", id: "TS-06" }], meter: 3 },
  { id: 2, mood: "excited", header: { title: "VIP Profit Club", sub: "212 members · group" }, chat: [
    { from: "them", text: "Members are earning. Only 20 seats left. Join our VIP group.", time: "9:43 pm", flag: "Members are earning", pinned: true },
    { from: "them", attachment: "profit", time: "9:43 pm" },
    { from: "you", text: "Are these results verified?", time: "9:44 pm" },
  ], headline: "Suddenly, everyone is winning.", thought: "There are so many people here. Maybe I’m missing out.", wants: "You to feel the crowd is winning and time is short.", notices: [{ label: "Crowd proof", id: "TS-09" }, { label: "VIP group", id: "TS-10" }, { label: "Few seats", id: "TS-07" }], meter: 6 },
  { id: 3, mood: "hopeful", header: { title: "Trading app support", sub: "business account" }, chat: [
    { from: "them", text: "Use our unofficial trading app to see your private portfolio.", time: "9:46 pm", flag: "unofficial trading app" },
    { from: "them", attachment: "voice", time: "9:46 pm" },
    { from: "you", text: "Is this the official app?", time: "9:47 pm" },
  ], headline: "Now they want you on their app.", thought: "A private portfolio could make this easier.", wants: "You inside their app, away from familiar channels.", notices: [{ label: "Unofficial app", id: "TS-24" }], meter: 7 },
  { id: 4, mood: "uneasy", header: { title: "Trading app support", sub: "business account" }, chat: [
    { from: "them", text: "Add more to unlock your profits. Transfer the funds to my personal account.", time: "9:51 pm", flag: "personal account" },
    { from: "you", text: "Why to a personal account?", time: "9:52 pm" },
  ], headline: "Put in more to unlock more.", thought: "That payment detail doesn’t feel right.", wants: "More money, sent to a personal account.", notices: [{ label: "Add money to unlock", id: "TS-17" }, { label: "Personal account", id: "TS-15" }], meter: 9 },
  { id: 5, mood: "shocked", header: { title: "Trading app support", sub: "business account" }, chat: [
    { from: "them", text: "A tax release fee is due before withdrawal.", time: "9:54 pm", flag: "fee before withdrawal" },
    { from: "you", text: "Why is there a fee to withdraw?", time: "9:55 pm" },
  ], headline: "Wait, a fee to withdraw?", thought: "I need to stop and check before sending more.", wants: "One more payment before you can leave.", notices: [{ label: "Fee before withdrawal", id: "TS-16" }], meter: 10 },
];

const signalNames: Record<string, string> = { "TS-03": "Official title", "TS-06": "Hurry", "TS-07": "Few seats", "TS-09": "Crowd proof", "TS-10": "VIP group", "TS-13": "Free offer", "TS-15": "Personal account", "TS-16": "Fee before withdrawal", "TS-17": "Add money to unlock", "TS-24": "Unofficial app" };
const moods: Mood[] = ["relaxed", "curious", "excited", "hopeful", "uneasy", "shocked", "alert"];
const moodWords: Record<Mood, string> = { relaxed: "relaxed", curious: "curious", excited: "excited", hopeful: "hopeful", uneasy: "uneasy", shocked: "shocked", alert: "alert and ready to pause" };
const hindiStory: Record<number, { headline: string; thought: string; wants: string; chat: Record<number, string>; notices?: string[] }> = {
  1: { headline: "Ek anjaan shakhs khud ko expert batata hai.", thought: "Expert? Free signal? Hmm, dekhte hain.", wants: "Bina jaanch kiye title par bharosa karwana.", chat: { 0: "Main SEBI-certified analyst hoon. Ek free signal hai. Aaj hi join karein.", 1: "Theek hai, yeh kis baare mein hai?" }, notices: ["Official title", "Free offer", "Jaldi ka pressure"] },
  2: { headline: "Achanak sab log kama rahe hain.", thought: "Group mein bahut log hain. Kahin main mauka na kho doon.", wants: "Dikhana ki sab kama rahe hain aur waqt kam hai.", chat: { 0: "Members kama rahe hain. Sirf 20 seats baaki. VIP group join karein.", 2: "Kya in results ki jaanch hui hai?" }, notices: ["Logon ki kamyabi", "VIP group", "Kam jagah"] },
  3: { headline: "Ab woh apna app download karne ko kehte hain.", thought: "Private portfolio se shayad sab aasaan ho.", wants: "Aapko unke app par le jaana, jahan usual checks kam hon.", chat: { 0: "Apna unofficial trading app use karein. Aapka private portfolio dikhega.", 2: "Kya yeh official app hai?" }, notices: ["Unofficial app"] },
  4: { headline: "Aur paise daalo, tabhi profit unlock hoga.", thought: "Personal account mein payment? Yeh theek nahi lagta.", wants: "Aur paise, woh bhi personal account mein.", chat: { 0: "Profit unlock karne ke liye aur paise jodiye. Funds mere personal account mein bhejiye.", 1: "Personal account mein kyun?" }, notices: ["Paise daal kar unlock", "Personal account"] },
  5: { headline: "Rukiye, paise nikaalne ke liye fee?", thought: "Aur paise bhejne se pehle ruk kar jaanchna hoga.", wants: "Nikalne se pehle ek aur payment lena.", chat: { 0: "Withdrawal se pehle tax release fee deni hogi.", 1: "Paise nikaalne ke liye fee kyun?" }, notices: ["Paise nikaalne se pehle fee"] },
};

function Person({ character, mood }: { character: CharacterId; mood: Mood }) {
  const name = character === "sunita" ? "Sunita" : "Ramesh";
  const src = character === "sunita" ? "/images/story/sunita-profile.png" : "/images/story/ramesh-profile.png";
  return <Image className={`person-illustration person-avatar person-${character} mood-${mood}`} src={src} width={256} height={256} alt={`${name} profile portrait`} />;
}

export default function StoryExperience() {
  const [character, setCharacter] = useState<CharacterId>("ramesh");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chainOpen, setChainOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const characterName = character === "ramesh" ? "Ramesh" : "Sunita";
  const final = step === 6;
  const current = steps[Math.max(0, Math.min(step - 1, steps.length - 1))];
  const mood = final ? "alert" : step === 0 ? "relaxed" : current.mood;
  const allNotices = useMemo(() => steps.slice(0, Math.min(step, steps.length)).flatMap(item => item.notices), [step]);
  const allSignalIds = [...new Set(allNotices.map(item => item.id))];
  const relatedPatterns = patterns.filter(pattern => pattern.signals.some(id => allSignalIds.includes(id)));
  const relatedPatternIds = new Set(relatedPatterns.map(pattern => pattern.id));
  const relatedFamilies = scamFamilies.filter(family => family.patterns.some(id => relatedPatternIds.has(id)));
  const messages = steps.slice(0, Math.min(step, steps.length)).flatMap(item => item.chat.map((message, chatIndex) => ({ ...message, step: item.id, chatIndex })));
  const visibleMessages = final ? messages.filter(item => item.step === 1) : messages.filter(item => !typing || item.step !== step);
  const currentCopy = language === "hi" ? hindiStory[step] : undefined;
  const standingPortrait = character === "ramesh" ? "/images/story/ramesh-standing.png" : "/images/story/sunita-standing.png";
  const incomingText = current.chat.find(message => message.from === "them")?.text || "A new message arrived.";

  useEffect(() => {
    if (step === 0 || step === 6) { setTyping(false); return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setTyping(false); return; }
    setTyping(true);
    const timer = window.setTimeout(() => setTyping(false), 800);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages.length, typing, step]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(query.matches);
    updateMotionPreference();
    query.addEventListener("change", updateMotionPreference);
    return () => query.removeEventListener("change", updateMotionPreference);
  }, []);

  function advance(next: number) {
    setDrawerOpen(false);
    setChainOpen(false);
    setStep(Math.max(0, Math.min(6, next)));
  }

  useEffect(() => {
    if (!autoPlay || reducedMotion || typing || step < 1 || step > 5) return;
    const timer = window.setTimeout(() => advance(step + 1), 9000);
    return () => window.clearTimeout(timer);
  }, [autoPlay, reducedMotion, step, typing]);

  function ChatBubble({ item, index }: { item: (typeof messages)[number]; index: number }) {
    const flagged = item.flag;
    const showLatest = item.step === step && !typing;
    return <div className={`chat-line ${item.from === "you" ? "chat-you" : "chat-them"} ${item.step === step ? "chat-new" : ""} ${final && item.step === 1 && flagged ? "rewind-target" : ""}`} key={`${item.step}-${index}`}>
      {item.from === "them" && item.step === 2 && (index === 0 || messages[index - 1].step !== item.step || messages[index - 1].from !== "them") && <small className="chat-sender">VIP Profit Club</small>}
      {item.pinned && <span className="pinned-label">PINNED MESSAGE</span>}
      {item.text && <p>{(() => { const text = language === "hi" ? hindiStory[item.step]?.chat[item.chatIndex] || item.text : item.text; return flagged && showLatest && language === "en" ? <>{text.split(flagged)[0]}<mark>{flagged}</mark>{text.split(flagged).slice(1).join(flagged)}</> : text; })()}</p>}
      {item.attachment === "profit" && <div className="profit-attachment"><div className="profit-topline"><span>ACCOUNT SUMMARY</span><span>•••</span></div><strong>+₹18,450</strong><div className="profit-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div><small>Shared by a group member</small></div>}
      {item.attachment === "voice" && <div className="voice-attachment"><span aria-hidden="true">▶</span><i>{Array.from({ length: 22 }, (_, i) => <b key={i} style={{ height: `${6 + ((i * 13) % 17)}px` }}/>)}</i><small>0:08</small></div>}
      <span className="chat-meta">{item.time}{item.from === "you" && <b aria-label="Delivered"> ✓✓</b>}</span>
      {final && item.step === 1 && flagged && <span className="pause-stamp">PAUSE</span>}
    </div>;
  }

  return <section className="story-section" id="story" aria-labelledby="story-title">
    <div className="story-heading"><div className="story-heading-row"><div><p className="eyebrow">A 60-SECOND STORY</p><h2 id="story-title">How scammers think.<br/><span>How NIGRAH helps.</span></h2><p>Same chat, two views. What you see, and what NIGRAH sees.</p><p className="story-intro-note">A clue is a reason to pause and check. It is not proof on its own.</p></div><div className="story-language" role="group" aria-label="Story chat language"><button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button><button type="button" aria-pressed={language === "hi"} onClick={() => setLanguage("hi")}>हिंदी / Hinglish</button></div></div></div>
    {step === 0 ? <div className="story-intro-card"><div className="story-intro-copy"><span className="story-time">9:40 PM · YOUR PHONE BUZZES</span><h3>You’ve saved ₹40,000.<br/>You’d like it to grow.</h3><p>A message arrives with an investment opportunity. What happens next?</p></div><div className="character-choices" aria-label="Choose who you will follow"><button type="button" onClick={() => { setCharacter("ramesh"); advance(1); }}><Person character="ramesh" mood="relaxed"/><b>Ramesh</b><span>Runs a neighborhood shop</span><i>Follow his story →</i></button><button type="button" onClick={() => { setCharacter("sunita"); advance(1); }}><Person character="sunita" mood="relaxed"/><b>Sunita</b><span>Teaches at a local school</span><i>Follow her story →</i></button></div><button className="just-watch" type="button" onClick={() => advance(1)}>Just watch <span aria-hidden="true">→</span></button></div> : <>
      <div className="story-layout story-live">
        <div className="story-phone" aria-label="Fictional chat example">
          <div className="phone-top"><span className="phone-back">‹</span><span className="phone-avatar" aria-hidden="true">{step === 1 ? "?" : step === 2 ? "V" : "↗"}</span><div><b>{final ? "+91 98xxx xxxxx" : current.header.title}</b><small>{final ? "not in your contacts" : language === "hi" && step === 1 ? "aapke contacts mein nahi" : current.header.sub}</small></div><span className="phone-menu">•••</span></div>
          <div className="story-progress" aria-label={`Story step ${step} of 6`}>{Array.from({ length: 6 }, (_, index) => <span key={index} className={index < step ? "filled" : ""}/>)}</div>
          <div className="chat-log" ref={chatRef} aria-live="polite" aria-label="Chat messages">
            {!messages.length && <div className="chat-day">TODAY</div>}
            {visibleMessages.map((item, index) => <ChatBubble key={`${item.step}-${index}`} item={item} index={index}/>)}
            {typing && <div className="typing-bubble" aria-label="Contact is typing"><i/><i/><i/></div>}
          </div>
          <div className="phone-compose"><span>Message</span><b>＋</b></div>
        </div>
        <div className={`story-character-stage ${typing ? "character-waiting" : ""}`} aria-live="polite" aria-label={`${characterName} following the story`}>
          <div className="character-thought"><small>{characterName} is thinking</small><span>{final ? "I can pause and check before sending money." : currentCopy?.thought || current.thought}</span><i aria-hidden="true"/></div>
          <div className={`character-standing-wrap mood-${mood}`} key={`${character}-${step}`}>
            <Image className="character-standing" src={standingPortrait} width={1024} height={1536} alt={`${characterName}, the story character`} priority={step === 1} />
            <div className="character-phone-pop" aria-hidden="true">
              <div className="character-phone-top"><i/>{characterName}&apos;s phone</div>
              {typing ? <div className="character-phone-typing"><i/><i/><i/></div> : <><span className="character-phone-label">NEW MESSAGE</span><p>{final ? "The warning sign was here." : language === "hi" ? hindiStory[step]?.chat[0] || incomingText : incomingText}</p></>}
            </div>
          </div>
          <div className="character-caption"><b>{characterName}</b><span>{characterName} feels {moodWords[mood]}</span></div>
        </div>
        <div className="story-insight-column" aria-live="polite">
          <button className="analysis-mobile-toggle" type="button" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(!drawerOpen)}><span className={`mini-mood mood-${mood}`}><Person character={character} mood={mood}/></span><span><b>{final ? "The signs were there from the first message." : currentCopy?.headline || current.headline}</b><small>{currentCopy?.wants || current.wants}</small></span><i>{drawerOpen ? "Close" : "See analysis"}</i></button>
          <div className={`story-panel ${drawerOpen ? "drawer-open" : ""} ${typing ? "is-typing" : ""}`}>
            <div className="story-step-label">{final ? "THE REWIND" : `STEP ${step} OF 6`}</div>
            <h3>{final ? "The signs were there from the first message." : currentCopy?.headline || current.headline}</h3>
            {final ? (
              <>
                <p className="story-wants"><b>What the scammer wants</b>Every step needed you not to stop.</p>
                <div className="story-signals">{allNotices.slice(0, 3).map(item => <span key={item.id}>{item.label}</span>)}</div>
                <button type="button" className="see-chain" onClick={() => setChainOpen(true)}>See the full chain <span aria-hidden="true">→</span></button>
                <p className="story-note"><b>A note</b>NIGRAH reads the sample you share; it does not follow people across private chats. This can happen to anyone.</p>
                <div className="story-ending-actions">
                  <a className="story-check-link" href="#analysis">Check a message you got <span aria-hidden="true">↗</span></a>
                  <button type="button" onClick={() => advance(0)}>Replay</button>
                  <a className="story-share-link" href={`https://wa.me/?text=${encodeURIComponent("A scam can build one step at a time. Pause, verify, and check the signs. Explore NIGRAH: https://nigrah.vercel.app")}`} target="_blank" rel="noreferrer">Share on WhatsApp ↗</a>
                </div>
              </>
            ) : (
              <>
                <p className="story-wants"><b>What the scammer wants</b>{currentCopy?.wants || current.wants}</p>
                <div className="notices-heading"><b>What NIGRAH notices</b><span>{current.meter} signs so far</span></div>
                <div className="story-signals">{(currentCopy?.notices || current.notices.map(item => item.label)).map((label, index) => <span key={index}>{label}</span>)}</div>
                <div className="story-meter" aria-label={`Warning meter ${current.meter} of 10`}><span style={{ width: `${current.meter * 10}%` }}/></div>
                <details className="story-ids"><summary>Show taxonomy IDs</summary><div>{current.notices.map(item => <span key={item.id}>{item.id} · {signalNames[item.id]}</span>)}</div></details>
                <div className="story-controls">
                  <button type="button" onClick={() => advance(step - 1)}>← Back</button>
                  <button type="button" className="story-autoplay" aria-pressed={autoPlay} onClick={() => setAutoPlay(!autoPlay)}>{autoPlay ? "Pause story" : "Auto-play"}</button>
                  <button type="button" className="story-next" disabled={typing} onClick={() => advance(step + 1)}>{step === 5 ? "Rewind the story →" : "Next →"}</button>
                </div>
                <div className={`story-autoplay-track ${autoPlay && !reducedMotion ? "is-running" : ""}`} aria-label={reducedMotion ? "Auto-play paused for reduced motion" : autoPlay ? "Automatically moves to the next story step in nine seconds" : "Auto-play paused"}><span key={`${step}-${autoPlay}-${typing}`} /></div>
                <p className="story-autoplay-caption" aria-live="polite">{reducedMotion ? "Motion is reduced on your device · use Next to continue" : autoPlay ? "Next step in about 9 seconds · pause anytime" : "Auto-play paused · continue when you’re ready"}</p>
              </>
            )}
          </div>
        </div>
      </div>
      {chainOpen && final && <div className="story-drawer-backdrop" onClick={() => setChainOpen(false)}><aside className="story-drawer" role="dialog" aria-modal="true" aria-labelledby="story-drawer-title" onClick={event => event.stopPropagation()}><button type="button" className="drawer-close" onClick={() => setChainOpen(false)} aria-label="Close full chain">×</button><p className="eyebrow">THE FULL SIGNAL CHAIN</p><h3 id="story-drawer-title">Ten clues, one changing story.</h3><ol>{allNotices.map((item, index) => <li key={`${item.id}-${index}`}><span>{index + 1}</span><b>{item.label}</b><small>{item.id}</small></li>)}</ol><div className="drawer-taxonomy"><b>Connected behavior patterns</b><p>{relatedPatterns.map(item => item.name).join(" · ")}</p><b>Related scam families</b><p>{relatedFamilies.slice(0, 6).map(item => item.name).join(" · ")}</p></div><p className="story-note">These are catalog relationships shown to explain the model’s structure. A match is a clue to check, not proof by itself.</p></aside></div>}
    </>}
  </section>;
}
