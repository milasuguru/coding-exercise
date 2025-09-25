Below are the prompts (in English) used to generate parts of the app/code during development.

1) Frontend recorder component (React + Vite)
```
Write a React component called Recorder that:
- Uses navigator.mediaDevices.getUserMedia to record audio from microphone
- Uses MediaRecorder API to capture audio chunks and produce a single audio Blob
- Sends that Blob as 'file' (multipart/form-data) to POST /api/transcribe
- Shows simple UI: record / stop buttons and displays returned translation
- Keep code modern (hooks) and portable
```

2) Backend transcription + translation (Node.js + Express)
```
Write an Express endpoint POST /api/transcribe that:
- Accepts multipart/form-data (field name 'file')
- Saves the uploaded file temporarily
- Uses the OpenAI Node client to call the audio transcription (whisper) endpoint
- Then sends the transcribed text to an LLM (chat completion) to translate to Spanish
- Returns JSON: { text: "...", translated: "..." }
- Use process.env.OPENAI_API_KEY for the API key
- Add error handling and remove temp files after processing
```

3) README + run instructions
```
Create a README in Russian explaining how to run the frontend and backend locally, how to set OPENAI_API_KEY, and how to push the repo to GitHub. Mention that secrets should not be committed.
```

Note: these prompts are included so reviewers can see the exact instructions used while authoring the example code.