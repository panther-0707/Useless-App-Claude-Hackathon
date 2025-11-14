import { useState, useRef, useEffect } from 'react';
import './RagebaitChat.css';

export default function RagebaitChat() {
  const [messages, setMessages] = useState([]); // { role, content }
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input.trim() };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/ragebait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(h => [...h, { role: 'assistant', content: data.reply }]);
      } else if (data.error) {
        setMessages(h => [...h, { role: 'assistant', content: 'Backend error: ' + data.error }]);
      }
    } catch (e) {
      const details = (e && (e.stack || e.message)) ? `${e.name || 'Error'}: ${e.message}` : 'Unknown error';
      setMessages(h => [...h, { role: 'assistant', content: 'Network meltdown: ' + details }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="ragebait-container">
      <div className="ragebait-header">Premier Bank AI Assistant</div>
      <div className="ragebait-chat-window" ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`ragebait-message-row ${m.role}`}> 
            <div className={`ragebait-bubble ${m.role}`}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="ragebait-message-row assistant">
            <div className="ragebait-bubble assistant loading">
              <span className="ragebait-spinner" />
              Formulating low-effort hot take...
            </div>
          </div>
        )}
      </div>
      <div className="ragebait-composer">
        <textarea
          placeholder="Ask literally anything, Or dont."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="ragebait-submit-btn" disabled={loading} onClick={send}>Send🕊️</button>
      </div>
      <div className="ragebait-footer">TF u reading this for</div>
    </div>
  );
}
