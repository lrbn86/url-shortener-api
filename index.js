import express from 'express';
import { nanoid } from 'nanoid';
import crypto from 'node:crypto';

const app = express();
app.use(express.json());

const links = new Map();
const accessCount = new Map();

app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  let shortCode;
  do {
    shortCode = nanoid(5);
  } while (links.has(shortCode));
  const original = {
    id: crypto.randomUUID(),
    url,
    shortCode,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  accessCount.set(shortCode, 0);
  links.set(shortCode, original);
  return res.status(201).json(original);
});

app.get('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const original = links.get(shortCode);
  if (!original) {
    return res.status(404).json({ error: 'short URL not found' });
  }
  accessCount.set(shortCode, accessCount.get(shortCode) + 1);
  return res.status(200).json(original);
});

app.put('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;
  const original = links.get(shortCode);
  if (!original) {
    return res.status(404).json({ error: 'short URL not found' });
  }
  links.get(shortCode).url = url;
  const newLink = links.get(shortCode);
  return res.status(200).json(newLink);
});

app.delete('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  if (!links.get(shortCode)) {
    return res.status(404).json({ error: 'short URL not found' });
  }
  links.delete(shortCode);
  return res.sendStatus(204);
});

app.get('/shorten/:shortCode/stats', async (req, res) => {
  const { shortCode } = req.params;
  if (!links.get(shortCode)) {
    return res.status(404).json({ error: 'short URL not found' });
  }
  const original = { ...links.get(shortCode), accessCount: accessCount.get(shortCode) }
  return res.status(200).json(original);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
