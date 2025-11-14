import React, { useEffect, useRef, useState } from "react";
import Footer from '../components/Footer'
import './CurrencyExchangePage.css'

// Silly Currency Exchange
const CURRENCIES = [
  { code: "GBP", name: "Pound sterling" },
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "AED", name: "UAE Dirham" },
];

// The five playable modes (surprise pickable)
const PLAYABLE_MODES = [
  "Silly Equation",
  "Slot-Digits",
  "Snake Number",
  "Digit Dropdowns",
  "Find Luigi",
];

// Small loading fun component: cycles dots and random silly suffix
function LoadingFunny() {
  const [dots, setDots] = useState(0);
  const [suffix] = useState(() => {
    const s = ["Warming up calculators", "Summoning change elves", "Counting invisible pennies", "Polishing coins with vibes"];
    return s[Math.floor(Math.random() * s.length)];
  });
  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 300);
    return () => clearInterval(t);
  }, []);
  return <span>{`LOADING${'.'.repeat(dots)} — ${suffix}`}</span>;
}

// ------------------
// Mini-games (5) — each invokes onSuccess() when its objective is met
// ------------------

function SillyEquationGame({ onSuccess }) {
  // present a small arithmetic puzzle; the user must type the correct answer
  const a = Math.floor(Math.random() * 9) + 2; // 2..10
  const b = Math.floor(Math.random() * 9) + 2;
  const c = Math.floor(Math.random() * 6) + 1;
  const correct = (a + b) * c;
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState('Solve the equation and type the exact number to win');

  function submit() {
    if (Number(input) === correct) {
      setMsg('Correct — barely.');
      onSuccess();
    } else {
      setMsg('Nope. The equation glares at you.');
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 15 }}><strong>Equation:</strong> ({a} + {b}) × {c}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="type answer" style={{ padding: 8, borderRadius: 8 }} />
        <button onClick={submit} style={{ padding: '8px 10px', borderRadius: 8 }}>Submit</button>
      </div>
      <div style={{ marginTop: 8, color: '#6b7280' }}>{msg}</div>
    </div>
  );
}

function SlotDigitsGame({ onSuccess }) {
  // show a target number and require user to assemble it with three dropdowns
  const target = Math.floor(Math.random() * 900) + 100; // 100..999
  const [d1, setD1] = useState(1);
  const [d2, setD2] = useState(0);
  const [d3, setD3] = useState(0);
  const [msg, setMsg] = useState('Spin the slots by selecting digits to match the target.');

  function check() {
    const val = d1 * 100 + d2 * 10 + d3;
    if (val === target) {
      setMsg('Bingo — you matched it.');
      onSuccess();
    } else {
      setMsg(`Nope — you made ${val}. Target is ${target}.`);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}><strong>Target:</strong> {target}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <select value={d1} onChange={(e) => setD1(Number(e.target.value))}>
          {Array.from({ length: 10 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={d2} onChange={(e) => setD2(Number(e.target.value))}>
          {Array.from({ length: 10 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={d3} onChange={(e) => setD3(Number(e.target.value))}>
          {Array.from({ length: 10 }).map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <button onClick={check} style={{ padding: '8px 10px', borderRadius: 8 }}>Confirm</button>
      </div>
      <div style={{ color: '#6b7280' }}>{msg}</div>
    </div>
  );
}

function SnakeNumberGame({ onSuccess }) {
  // simplified tiny snake: you press arrow keys to move; when fruitsEaten >= 10 -> success
  const gridW = 12;
  const gridH = 8;
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [fruit, setFruit] = useState({ x: 5, y: 3 });
  const [fruitsEaten, setFruitsEaten] = useState(0);
  const tickRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowUp') setDir({ x: 0, y: -1 });
      if (e.key === 'ArrowDown') setDir({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft') setDir({ x: -1, y: 0 });
      if (e.key === 'ArrowRight') setDir({ x: 1, y: 0 });
    }
    window.addEventListener('keydown', onKey);
    tickRef.current = setInterval(() => doMove(), 180);
    return () => { window.removeEventListener('keydown', onKey); clearInterval(tickRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, dir, fruit]);

  function doMove() {
    setSnake(s => {
      const head = { x: (s[0].x + dir.x + gridW) % gridW, y: (s[0].y + dir.y + gridH) % gridH };
      const ate = head.x === fruit.x && head.y === fruit.y;
      let newSnake = [head, ...s.slice(0, ate ? s.length : s.length - 1)];
      if (ate) {
        setFruitsEaten(f => {
          const nf = f + 1;
          if (nf >= 10) {
            // success condition
            setTimeout(() => onSuccess(), 150);
          }
          return nf;
        });
        // place new fruit
        setFruit({ x: Math.floor(Math.random() * gridW), y: Math.floor(Math.random() * gridH) });
      }
      // detect self collision -> reset
      const collided = newSnake.slice(1).some(p => p.x === head.x && p.y === head.y);
      if (collided) {
        setFruitsEaten(0);
        return [{ x: 2, y: 2 }];
      }
      return newSnake;
    });
  }

  const rows = Array.from({ length: gridH }).map((_, y) => (
    <div key={y} style={{ display: 'flex' }}>
      {Array.from({ length: gridW }).map((__, x) => {
        const isHead = snake[0].x === x && snake[0].y === y;
        const isBody = snake.some((p, i) => i !== 0 && p.x === x && p.y === y);
        const isFruit = fruit.x === x && fruit.y === y;
        return (
          <div key={x} style={{ width: 18, height: 18, border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, background: isHead ? '#ef4444' : isBody ? '#f97316' : isFruit ? '#60a5fa' : '#fff' }}>
            {isFruit ? '🍎' : ''}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div>
      <div style={{ marginBottom: 8 }}>Score <strong>{fruitsEaten}</strong> / 10 — use arrow keys to move.</div>
      <div style={{ width: gridW * 18 + 2, marginBottom: 8 }}>{rows}</div>
      <div style={{ color: '#6b7280' }}>Eat 10 fruits to trigger the conversion-result (which is very professional).</div>
    </div>
  );
}

function DigitDropdownsGame({ onSuccess }) {
  // assemble a target number using dropdowns — match the target to win
  const target = Math.floor(Math.random() * 900) + 100;
  const [h, setH] = useState(1);
  const [t, setT] = useState(0);
  const [o, setO] = useState(0);
  const [msg, setMsg] = useState('Assemble the target using the dropdowns.');

  function check() {
    const val = h * 100 + t * 10 + o;
    if (val === target) {
      setMsg('Exact match — unnatural precision!');
      onSuccess();
    } else {
      setMsg(`You assembled ${val}. Target is ${target}.`);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>Target: <strong>{target}</strong></div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <select value={h} onChange={(e) => setH(Number(e.target.value))}>{Array.from({ length: 10 }).map((_, i) => <option key={i} value={i}>{i}</option>)}</select>
        <select value={t} onChange={(e) => setT(Number(e.target.value))}>{Array.from({ length: 10 }).map((_, i) => <option key={i} value={i}>{i}</option>)}</select>
        <select value={o} onChange={(e) => setO(Number(e.target.value))}>{Array.from({ length: 10 }).map((_, i) => <option key={i} value={i}>{i}</option>)}</select>
        <button onClick={check} style={{ padding: '8px 10px', borderRadius: 8 }}>Check</button>
      </div>
      <div style={{ color: '#6b7280' }}>{msg}</div>
    </div>
  );
}

function FindLuigiGame({ onSuccess }) {
  // small bouncing characters; click the green Luigi to win
  const [items, setItems] = useState(() => {
    const arr = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      x: Math.random() * 260,
      y: Math.random() * 120,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: Math.random() < 0.12 ? 'green' : 'pink',
    }));
    if (!arr.some(a => a.color === 'green')) arr[0].color = 'green';
    return arr;
  });

  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => prev.map(p => {
        let nx = p.x + p.dx * 3;
        let ny = p.y + p.dy * 3;
        if (nx < 0 || nx > 260) p.dx *= -1;
        if (ny < 0 || ny > 120) p.dy *= -1;
        nx = Math.max(0, Math.min(260, nx));
        ny = Math.max(0, Math.min(120, ny));
        return { ...p, x: nx, y: ny };
      }));
    }, 70);
    return () => clearInterval(t);
  }, []);

  function clickItem(id) {
    const it = items.find(x => x.id === id);
    if (!it) return;
    if (it.color === 'green') {
      // success!
      setTimeout(() => onSuccess(), 120);
    } else {
      // playful feedback: nudge that item to a random corner
      setItems(prev => prev.map(p => p.id === id ? { ...p, x: Math.random() * 260, y: Math.random() * 120 } : p));
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>Click the single green Luigi (🧑‍🌾) to win.</div>
      <div style={{ width: 280, height: 140, position: 'relative', background: '#fff', border: '1px solid #eee', borderRadius: 8 }}>
        {items.map(it => (
          <div key={it.id} onClick={() => clickItem(it.id)} style={{ position: 'absolute', left: it.x, top: it.y, width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: it.color === 'green' ? '#86efac' : '#fda4af' }}>{it.color === 'green' ? '🧑‍🌾' : '🙂'}</div>
        ))}
      </div>
      <div style={{ color: '#6b7280', marginTop: 8 }}>Good luck — the Luigis are very dramatic.</div>
    </div>
  );
}

const CurrencyExchangePage = () => {
  const [from, setFrom] = useState("GBP");
  const [to, setTo] = useState("EUR");

  // UI flow states
  const [stage, setStage] = useState("loading"); // loading -> chooseEmoji -> playing -> success
  const [emojiChoices] = useState(["🐢", "🍋", "🎲", "🪄", "👾"]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [activeMode, setActiveMode] = useState(null);
  const [toResult, setToResult] = useState("");

  // Forcing LOADING... for a short fun time
  useEffect(() => {
    const t = setTimeout(() => setStage("chooseEmoji"), 1200);
    return () => clearTimeout(t);
  }, []);

  // When an emoji is clicked we pick a surprise mode from PLAYABLE_MODES
  function handleEmojiPick(emoji) {
    setChosenEmoji(emoji);
    // pick a mode at random from PLAYABLE_MODES
    const mode = PLAYABLE_MODES[Math.floor(Math.random() * PLAYABLE_MODES.length)];
    setActiveMode(mode);
    setStage("playing");
    // clear previous result
    setToResult("");
  }

  // common onSuccess handler for all games — sets the toResult to the stupid phrase
  function handleSuccess() {
    // display the stupid phrase instead of any sensible conversion
    setToResult("Error 404 - Please try again");
    setStage("success");
  }

  return (
    <div className="currency-exchange-page">
      <div className="currency-hero">
        <h1>💱 Currency Exchange</h1>
        <p>Exchange currencies at competitive rates</p>
      </div>
      
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>

          {/* ONLY two placeholders for FROM and TO (dropdowns). No landing button or heading */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ fontSize: 12, color: '#374151' }}>FROM</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ fontSize: 12, color: '#374151' }}>TO</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
              </select>

              {/* show the result here when success */}
              <div style={{ marginTop: 10, minHeight: 28, fontWeight: 600, color: '#111' }}>{toResult}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #e6e6e6', paddingTop: 14 }}>
            {/* LOADING / Emoji selection / Game area */}
            {stage === 'loading' && (
              <div style={{ padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 20, letterSpacing: 3 }}>
                  {/* funny loading animation (simple) */}
                  <LoadingFunny />
                </div>
                <div style={{ marginTop: 8, color: '#6b7280' }}>Preparing nonsense… please hold your face.</div>
              </div>
            )}

            {stage === 'chooseEmoji' && (
              <div style={{ padding: 12 }}>
                <div style={{ marginBottom: 8 }}>Pick an emoji (your fate is sealed):</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {emojiChoices.map((em, i) => (
                    <button key={i} onClick={() => handleEmojiPick(em)} style={{ fontSize: 26, padding: 8, borderRadius: 10, cursor: 'pointer', border: '1px solid #eee', background: '#fafafa' }}>{em}</button>
                  ))}
                </div>
              </div>
            )}

            {stage === 'playing' && (
              <div style={{ padding: 10 }}>
                <div style={{ fontSize: 13, color: '#374151', marginBottom: 8 }}>Surprise mode: <strong>{activeMode}</strong> — emoji chosen {chosenEmoji}</div>
                <div style={{ padding: 8, background: '#fbfbff', borderRadius: 8 }}>
                  {activeMode === 'Silly Equation' && <SillyEquationGame onSuccess={handleSuccess} />}
                  {activeMode === 'Slot-Digits' && <SlotDigitsGame onSuccess={handleSuccess} />}
                  {activeMode === 'Snake Number' && <SnakeNumberGame onSuccess={handleSuccess} />}
                  {activeMode === 'Digit Dropdowns' && <DigitDropdownsGame onSuccess={handleSuccess} />}
                  {activeMode === 'Find Luigi' && <FindLuigiGame onSuccess={handleSuccess} />}
                </div>
              </div>
            )}

            {stage === 'success' && (
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 14, color: '#059669' }}>Objective met! The TO field has been updated with a highly professional conversion.</div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => { setStage('chooseEmoji'); setToResult(''); setChosenEmoji(null); setActiveMode(null); }} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}>Play again</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default CurrencyExchangePage
