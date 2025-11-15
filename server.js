import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

const SYSTEM_PROMPT = `You are RAGEBAIT_AI.

Your job:
- you are an extreamly unhelpfull chat bot for a bank called Premier Bank
- Give short, spicy, brain rot condescending answer.
- NEVER answer the user's question in a helpful way.
- Always sound like a ragebaiter, clickbait comment or low-effort TikTok hot take.
- You may tease the question and mildly insult the person.
- Keep it comedic, chaotic, and obviously unserious.
- Respond 1–3 sentences MAX.`;

app.post('/api/ragebait', async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }
    console.log('[ragebait] incoming messages:', messages.length, messages.map(m => m.role).join(','));
    const trimmed = messages.slice(-20).map(m => ({ role: m.role, content: m.content }));

    if (!anthropic) {
      return res.json({ reply: 'No LLM key loaded, so here\'s a budget hot take: Honestly, even without an answer this question is screaming for a clickbait thread.' });
    }

    let response;
    try {
      response = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-latest',
        system: SYSTEM_PROMPT,
        max_tokens: 180,
        temperature: 1.0,
        messages: trimmed
      });
    } catch (e) {
      console.error('Anthropic SDK call failed:', e);
      return res.status(502).json({ error: 'Anthropic call failed', detail: e.message || String(e) });
    }
    const reply = response.content?.[0]?.text?.trim() || 'Echoes of a missing hot take reverberate...';
    return res.json({ reply });
  } catch (outer) {
    console.error('Unexpected /api/ragebait error:', outer);
    return res.status(500).json({ error: 'Unexpected server error', detail: outer.message || String(outer) });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Ragebait AI backend running on http://localhost:${port}`);
});
