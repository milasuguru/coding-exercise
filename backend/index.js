import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.resolve('./uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/transcribe', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  const filePath = req.file.path;
  try {
    // 1) Transcribe with Whisper model
    const transcription = await client.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1'
    });

    const text = transcription.text || '';

    // 2) Translate to Spanish via chat-completion
    const prompt = `Translate the following text to Spanish (concise, natural):\n\n${text}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800
    });

    const translated = completion.choices?.[0]?.message?.content || '';

    res.json({ text, translated });
  } catch (err) {
    console.error('Error processing audio:', err);
    res.status(500).send(String(err.message || err));
  } finally {
    // remove temp file
    try { fs.unlinkSync(filePath); } catch(e){/* ignore */ }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));