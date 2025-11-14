import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import './CryptocurrencyPage.css'

const MAX_PUMPS = 150;
const MINI_CLICKS_REQUIRED = 3;

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatPrice(v) {
  if (v >= 0.05) {
    const nonsense = [
      "✨ VIBES ONLY ✨",
      "2.5 emotional damages",
      "0.0001 hope",
      "just vibes",
      "priced in copium"
    ];
    return randomFrom(nonsense);
  }
  if (v < 0.01) return "$" + v.toFixed(8);
  return "$" + v.toFixed(4);
}

function getStage(p) {
  if (p < 0.001) return "Mood: tiny baby coin";
  if (p < 0.01) return "Mood: starting to feel something";
  if (p < 0.1) return "Mood: main character energy";
  if (p < 1) return "Mood: absolutely cooked";
  return "Mood: reality has left the chat";
}

function getCardColor(p) {
  if (p < 0.001) return "#020617";
  if (p < 0.01) return "#022c22";
  if (p < 0.1) return "#064e3b";
  if (p < 1) return "#1e3a8a";
  return "#450a0a";
}

const messages = [
  "It's probably fine.",
  "What's the worst that could happen?",
  "Just one more click.",
  "You definitely know what you're doing.",
  "Trust the process. Whatever it is.",
  "If it shines, it's good.",
  "Numbers are going up-ish.",
];

const headlineMessages = [
  "BREAKING: YOU CLICKED THE BUTTON AGAIN",
  "NEWSFLASH: NOTHING HAS BEEN LEARNED",
  "ALERT: VIBES OFFICIALLY OVERTAKE LOGIC",
  "BREAKING: COIN STILL DOING WHATEVER IT WANTS",
  "UPDATE: YOU'RE IN TOO DEEP TO STOP NOW",
  "HEADLINE: THIS IS NOT A SERIOUS APP",
];

function generateFakeAdvice(question, state) {
  const { pumps, stageText } = state;

  const intros = [
    "Okay, here's some very questionable advice:",
    "Short version: you are absolutely not in control here.",
    "As your fake adviser, I can confidently say:",
    "Here's what my totally made-up model thinks:"
  ];

  const middles = [
    `You have clicked ${pumps} time(s) so far, which is the exact scientific threshold for "probably too many".`,
    `The coin vibe is currently: "${stageText}". This is neither good nor bad. It's just vibes.`,
    "Every click changes absolutely nothing in real life, but it feels important, so that counts for something.",
    "At this point, you are mainly investing in finger strength and emotional resilience."
  ];

  const endings = [
    "So my advice is: keep clicking if it makes you smile, stop clicking if it makes you deeply question your life choices.",
    "Therefore, the optimal strategy is to pretend this means something and carry on.",
    "In conclusion: you are doing amazing at pressing a button. Everything else is unclear.",
    "Best move: do exactly what you were already going to do anyway."
  ];

  const tldrs = [
    "TL;DR: CLICK IF FUN, STOP IF SAD.",
    "TL;DR: YOU ARE THE BUTTON BOSS.",
    "TL;DR: NOTHING MATTERS, BUT IN A CUTE WAY.",
    "TL;DR: ZERO ALPHA, MAX VIBES."
  ];

  return [
    randomFrom(intros),
    "",
    `You asked: "${question}"`,
    "",
    randomFrom(middles),
    "",
    randomFrom(endings),
    "",
    randomFrom(tldrs),
  ].join("\n");
}

const CryptocurrencyPage = () => {
  const [price, setPrice] = useState(0.00001);
  const [pumps, setPumps] = useState(0);
  const [maniaActive, setManiaActive] = useState(false);
  const [crashActive, setCrashActive] = useState(false);
  const [lastMessage, setLastMessage] = useState('Click "Pump the Coin" to send it.');
  const [tokenVersion, setTokenVersion] = useState(1);
  const [headline, setHeadline] = useState(null);

  const [miniGameActive, setMiniGameActive] = useState(false);
  const [miniGameClicks, setMiniGameClicks] = useState(0);

  // timing stats
  const [startTime] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  // fake AI adviser
  const [brokerQuestion, setBrokerQuestion] = useState("");
  const [brokerLoading, setBrokerLoading] = useState(false);
  const [brokerText, setBrokerText] = useState("");

  // handle body classes for mania / crash
  useEffect(() => {
    if (maniaActive && !crashActive) {
      document.body.classList.add("market-mania");
    } else {
      document.body.classList.remove("market-mania");
    }

    if (crashActive) {
      document.body.classList.add("market-crash");
    } else {
      document.body.classList.remove("market-crash");
    }

    return () => {
      document.body.classList.remove("market-mania");
      document.body.classList.remove("market-crash");
    };
  }, [maniaActive, crashActive]);

  // update current time for stats while the app is "alive"
  useEffect(() => {
    if (crashActive) return;
    const id = setInterval(() => {
      setNow(Date.now());
    }, 500);
    return () => clearInterval(id);
  }, [crashActive]);

  function triggerCrash() {
    setCrashActive(true);
    setManiaActive(false);
  }

  function triggerHeadline() {
    const msg = randomFrom(headlineMessages);
    setHeadline(msg);
    setTimeout(() => {
      setHeadline(null);
    }, 2600);
  }

  function handleMiniClick() {
    const next = miniGameClicks + 1;
    setMiniGameClicks(next);
    if (next >= MINI_CLICKS_REQUIRED) {
      setMiniGameActive(false);
      setMiniGameClicks(0);
      setLastMessage("You passed a completely unnecessary mini challenge. Impressive.");
      setHeadline("CHALLENGE CLEARED: COIN RESPECTS YOUR CLICKING DEDICATION");
    }
  }

  function askBroker() {
    const q = brokerQuestion.trim();
    if (!q) {
      setBrokerText('Type something like "should I keep clicking?" first.');
      return;
    }

    setBrokerLoading(true);
    setBrokerText("Thinking way too hard about this…");

    const stageText = getStage(price);

    setTimeout(() => {
      const advice = generateFakeAdvice(q, {
        pumps,
        stageText,
      });
      setBrokerText(advice);
      setBrokerLoading(false);
    }, 700);
  }

  function handlePump() {
    if (crashActive) return;

    if (miniGameActive) {
      setLastMessage("Mini challenge in progress. Finish it to keep pumping.");
      return;
    }

    const newPumps = pumps + 1;
    setPumps(newPumps);

    if (newPumps >= MAX_PUMPS) {
      triggerCrash();
      return;
    }

    const multiplier = 1.25 + Math.random() * 0.25;
    const newPrice = price * multiplier;
    setPrice(newPrice);
    setLastMessage(randomFrom(messages));

    if (!crashActive && Math.random() < 0.25) {
      triggerHeadline();
    }

    if (newPrice >= 0.05 && !maniaActive && !crashActive) {
      setManiaActive(true);
    }

    if (!crashActive && newPumps > 0 && newPumps % 10 === 0) {
      setMiniGameActive(true);
      setMiniGameClicks(0);
    }
  }

  const isMania = maniaActive && !crashActive;

  const auraScale = Math.min(1 + pumps * 0.015 + (isMania ? 0.4 : 0), 2.6);
  const auraShadow = crashActive
    ? "0 0 26px rgba(248,113,113,0.9)"
    : isMania
    ? "0 0 45px rgba(34,197,94,0.9)"
    : "0 0 26px rgba(59,130,246,0.7)";

  const elapsedSecondsRaw = Math.max(0, Math.floor((now - startTime) / 1000));
  const elapsedSeconds = elapsedSecondsRaw < 1 ? 1 : elapsedSecondsRaw;
  const clicksPerSecond = pumps === 0 ? "0.00" : (pumps / elapsedSeconds).toFixed(2);

  return (
    <div className="cryptocurrency-page">
      <style>{`
        .cryptocurrency-page {
          font-family: system-ui, sans-serif;
          background: #020617;
          color: #e5e7eb;
          min-height: 100vh;
          padding: 2rem;
        }

        .crypto-site-shell {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .crypto-card {
          background: #020617;
          border-radius: 14px;
          padding: 1rem 1.25rem 1.4rem;
          border: 1px solid #1e293b;
          color: #e5e7eb;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          position: relative;
          overflow: hidden;
        }

        .crypto-card h2 {
          margin-top: 0;
          font-size: 1.1rem;
        }

        .crypto-card .desc {
          font-size: 0.85rem;
          color: #9ca3af;
        }

        .tiny-note {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0.15rem 0;
        }

        .crypto-btn {
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: none;
          background: #4f46e5;
          color: white;
          font-size: 0.8rem;
          cursor: pointer;
          transition: transform 0.08s, background 0.2s, opacity 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .crypto-btn:active {
          transform: scale(0.96);
        }

        .crypto-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }

        body.market-mania {
          animation: hue-cycle 3s linear infinite;
        }

        @keyframes hue-cycle {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(360deg); }
        }

        .crypto-site-shell.market-mania {
          animation: market-wiggle 0.4s ease-in-out infinite alternate;
        }

        @keyframes market-wiggle {
          from { transform: rotate(-1deg) translateY(-2px); }
          to   { transform: rotate(1deg) translateY(2px); }
        }

        .crypto-card.market-mania-card {
          border-color: #22c55e;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
        }

        .ticker-strip {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 32px;
          background: #022c22;
          border-top: 1px solid #16a34a;
          color: #bbf7d0;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          overflow: hidden;
          z-index: 9998;
        }

        .ticker-content {
          white-space: nowrap;
          animation: ticker-scroll 12s linear infinite;
          padding-left: 100%;
        }

        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }

        .stonks-banner {
          position: fixed;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(22, 163, 74, 0.95);
          color: #022c22;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .stonks-banner span.emoji {
          font-size: 1.2rem;
        }

        body.market-crash {
          animation: crash-shake 0.18s infinite;
          filter: grayscale(1) contrast(1.2);
          background: #111827;
        }

        @keyframes crash-shake {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-4px); }
          50%  { transform: translateX(4px); }
          75%  { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        .market-crash-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #450a0a, #020617 70%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          color: #fee2e2;
          text-align: center;
        }

        .market-crash-overlay .big-bear {
          font-size: 120px;
          margin-bottom: 0.5rem;
        }

        .market-crash-overlay h1 {
          margin: 0.2rem 0;
          font-size: 1.7rem;
        }

        .market-crash-overlay p {
          max-width: 360px;
          font-size: 0.9rem;
          color: #fecaca;
          margin: 0.25rem 0;
        }

        .market-crash-overlay button {
          margin-top: 1rem;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: #f97316;
          color: #111827;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .headline-popup {
          position: fixed;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9500;
          background: radial-gradient(circle at center, rgba(252,211,77,0.22), rgba(0,0,0,0.85) 70%);
          animation: headline-fade 2.6s ease-out forwards;
        }

        .headline-box {
          background: rgba(15,23,42,0.98);
          border-radius: 24px;
          padding: 1rem 2.2rem;
          border: 1px solid #facc15;
          box-shadow: 0 0 45px rgba(250,204,21,0.9);
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fef9c3;
          text-align: center;
          max-width: 90%;
          line-height: 1.4;
        }

        @keyframes headline-fade {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          15% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 0;
            transform: scale(1.04);
          }
        }

        .mini-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, rgba(59,130,246,0.25), rgba(15,23,42,0.95) 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9700;
        }

        .mini-box {
          background: rgba(15,23,42,0.98);
          border-radius: 18px;
          padding: 1.2rem 1.6rem;
          border: 1px solid #38bdf8;
          box-shadow: 0 0 40px rgba(56,189,248,0.9);
          max-width: 320px;
          text-align: center;
        }

        .mini-box h2 {
          margin: 0 0 0.5rem;
          font-size: 1.05rem;
        }

        .mini-box p {
          font-size: 0.85rem;
          color: #e5e7eb;
          margin: 0.3rem 0;
        }

        .mini-btn {
          margin-top: 0.6rem;
        }

        .memecoin-orbit-container {
          margin-top: 0.7rem;
          margin-bottom: 0.4rem;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .memecoin-orbit {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 25%, #facc15, #f97316 55%, #7c2d12 90%);
          box-shadow: 0 0 26px rgba(59,130,246,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
          overflow: visible;
        }

        .memecoin-orbit-ring {
          position: absolute;
          inset: -10px;
          border-radius: 999px;
          border: 2px dashed rgba(148,163,184,0.6);
          box-sizing: border-box;
          animation: orbit-spin 9s linear infinite;
        }

        .memecoin-orbit-coin {
          font-size: 2rem;
          filter: drop-shadow(0 4px 6px rgba(15,23,42,0.8));
        }

        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .hero-coin-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.6rem;
        }

        .hero-coin {
          width: 140px;
          height: 140px;
          cursor: pointer;
        }

        .hero-coin-note {
          margin-top: 0.4rem;
          text-align: center;
        }
      `}</style>

      <div className="crypto-hero">
        <h1>₿ Cryptocurrency</h1>
        <p>Trade and invest in digital currencies</p>
      </div>

      <div className="container">
        <h1 style={{ textAlign: "center", marginTop: 0, color: '#e5e7eb' }}>Pointless Coin Clicker</h1>
        <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: "0.8rem", fontSize: "0.9rem" }}>
          Tap the big coin. That's literally it.
        </p>

        {/* Big central coin */}
        <div className="hero-coin-wrap">
          <div
            className="memecoin-orbit hero-coin"
            style={{
              transform: `scale(${auraScale})`,
              boxShadow: auraShadow,
            }}
            onClick={handlePump}
          >
            <div className="memecoin-orbit-ring" />
            <div className="memecoin-orbit-coin">🪙</div>
          </div>
          <p className="tiny-note hero-coin-note">
            Every tap makes it feel more important. It still does nothing.
          </p>
        </div>

        {headline && (
          <div className="headline-popup">
            <div className="headline-box">
              {headline}
            </div>
          </div>
        )}

        {miniGameActive && !crashActive && (
          <div className="mini-overlay">
            <div className="mini-box">
              <h2>Mini Challenge</h2>
              <p>Prove you really want this coin to feel special.</p>
              <p>Click the button {Math.max(MINI_CLICKS_REQUIRED - miniGameClicks, 0)} more time(s).</p>
              <button className="crypto-btn mini-btn" onClick={handleMiniClick}>
                I am committed
              </button>
              <p className="tiny-note">This unlocks nothing. It just slows you down.</p>
            </div>
          </div>
        )}

        {isMania && (
          <div className="stonks-banner">
            <span className="emoji">🚀</span>
            <span>MEMECOIN MANIA – fundamentals disabled, ponzinomics enabled</span>
          </div>
        )}

        {isMania && (
          <div className="ticker-strip">
            <div className="ticker-content">
              DOGE +420% &nbsp;|&nbsp; PEPE +6969% &nbsp;|&nbsp; BTC (But This Cat)
              +10,000% &nbsp;|&nbsp; Fundamentals -100% &nbsp;|&nbsp; YOLOCOIN: "We ball"
              &nbsp;|&nbsp; FED: "Good luck everyone" &nbsp;|&nbsp;
            </div>
          </div>
        )}

        {crashActive && (
          <div className="market-crash-overlay">
            <div className="big-bear">🐻‍❄️</div>
            <h1>CRYPTO WINTER -99.99%</h1>
            <p>
              After {pumps} consecutive pumps with zero risk management,
              <br />
              the devs vanished and the liquidity pool evaporated.
            </p>
            <p>
              Congratulations anon: you are now the proud owner of several worthless bags.
            </p>

            <div style={{ marginTop: "0.8rem", display: "flex", flexDirection: "column", gap: "0.4rem", maxWidth: 280 }}>
              <button
                className="crypto-btn"
                onClick={() => {
                  setTokenVersion((v) => v + 1);
                  setPrice(0.00000001);
                  setPumps(0);
                  setManiaActive(false);
                  setCrashActive(false);
                  setLastMessage("Welcome to V" + (tokenVersion + 1) + ". This time it's definitely different.");
                }}
              >
                Launch V2 Token 🔁
              </button>

              <button
                className="crypto-btn"
                onClick={() => {
                  setCrashActive(false);
                  setManiaActive(false);
                  setLastMessage("You posted a 27-part thread. Absolutely nothing changed.");
                  setHeadline("EXCLUSIVE: ANON PUBLISHES 27-PART THREAD, MARKET COMPLETELY IGNORES IT");
                }}
              >
                Write a Motivational Thread 🧵
              </button>

              <button className="crypto-btn" onClick={() => window.location.reload()}>
                Accept Reality & Refresh 😔
              </button>

              <p className="tiny-note" style={{ textAlign: "center" }}>
                Or just stare at your bags. That also works.
              </p>
            </div>
          </div>
        )}

        <div className={`crypto-site-shell ${isMania ? "market-mania" : ""}`}>
          {/* Pump card */}
          <div
            className={`crypto-card ${isMania ? "market-mania-card" : ""}`}
            style={{ backgroundColor: getCardColor(price) }}
          >
            <h2>
              <span style={{ fontSize: "40px", marginRight: "0.3rem" }}>🪙</span> Memecoin Pump Simulator{" "}
              <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>(V{tokenVersion})</span>
            </h2>
            <p className="desc">
              Every click makes the coin feel more important. It doesn't actually do anything.
            </p>

            <div style={{ fontFamily: '"SF Mono", Menlo, monospace', fontSize: "1.4rem", margin: "0.5rem 0" }}>
              {formatPrice(price)}
            </div>
            <p style={{ fontSize: "0.85rem", margin: "0.1rem 0" }}>{getStage(price)}</p>
            <p className="tiny-note">{lastMessage}</p>

            <button className="crypto-btn" onClick={handlePump} disabled={crashActive}>
              Pump the Coin 🚀
            </button>
            <p className="tiny-note">
              Pumps: {pumps} / {MAX_PUMPS}
            </p>
          </div>

          {/* Fake AI adviser card */}
          <div className={`crypto-card ${isMania ? "market-mania-card" : ""}`}>
            <h2>Questionable Advice Bot 🤖</h2>
            <p className="desc">Ask a fake adviser what to do next. It has no idea either.</p>
            <textarea
              value={brokerQuestion}
              onChange={(e) => setBrokerQuestion(e.target.value)}
              placeholder='e.g. "should I keep clicking?"'
              style={{
                width: "100%",
                minHeight: "70px",
                background: "#020617",
                borderRadius: "8px",
                border: "1px solid #334155",
                color: "#e5e7eb",
                fontSize: "0.85rem",
                padding: "0.4rem 0.5rem",
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button className="crypto-btn" onClick={askBroker} disabled={brokerLoading}>
                {brokerLoading ? "Thinking…" : "Ask the Bot"}
              </button>
              <span className="tiny-note">Warning: this is not smart. Just funny.</span>
            </div>
            {brokerText && (
              <div
                style={{
                  marginTop: "0.6rem",
                  padding: "0.6rem 0.7rem",
                  borderRadius: "8px",
                  border: "1px solid #1f2937",
                  background: "#020617",
                  fontSize: "0.8rem",
                  color: "#e5e7eb",
                  maxHeight: "180px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {brokerText}
              </div>
            )}
          </div>

          {/* Extra cards */}
          <div className={`crypto-card ${isMania ? "market-mania-card" : ""}`}>
            <h2>Friend Opinions</h2>
            <p className="desc">Completely unreliable reviews from imaginary people.</p>
            <ul style={{ fontSize: "0.8rem", color: "#9ca3af", paddingLeft: "1.1rem" }}>
              <li>Alex: "Looks fun, no idea what it means"</li>
              <li>Sam: "If it's shiny, it's probably good"</li>
              <li>Jamie: "I clicked because everyone else was clicking"</li>
            </ul>
            <p className="tiny-note">None of these opinions are helpful. At all.</p>
          </div>

          <div className={`crypto-card ${isMania ? "market-mania-card" : ""}`}>
            <h2>Totally Useless Stats</h2>
            <p className="desc">Numbers that look important but mean nothing.</p>
            <ul style={{ fontSize: "0.8rem", color: "#9ca3af", paddingLeft: "1.1rem" }}>
              <li>Overall vibe: {isMania ? "Chaotic" : "Confused"}</li>
              <li>Time spent clicking: {elapsedSeconds} seconds</li>
              <li>Average clicks per second: {clicksPerSecond}</li>
            </ul>
            <p className="tiny-note">Please do not try to make sense of this.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default CryptocurrencyPage
