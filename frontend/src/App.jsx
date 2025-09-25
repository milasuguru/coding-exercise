import React, { useState } from 'react';
import Recorder from './Recorder';

export default function App() {
  const [original, setOriginal] = useState('');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <h1>Vibe — Audio → STT → Spanish</h1>
      <p>Нажмите <strong>Record</strong>, скажите что-нибудь и нажмите <strong>Stop</strong>.</p>

      <Recorder
        onResult={(res) => {
          if (res?.text) setOriginal(res.text);
          if (res?.translated) setTranslated(res.translated);
        }}
        setLoading={setLoading}
      />

      {loading && <p>Обработка...</p>}

      <h3>Транскрипт (оригинал)</h3>
      <textarea readOnly value={original} />

      <h3>Перевод на испанский</h3>
      <textarea readOnly value={translated} />
    </div>
  );
}