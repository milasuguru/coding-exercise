import React, { useRef, useState } from 'react';

export default function Recorder({ onResult = ()=>{}, setLoading = ()=>{} }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);

  async function start() {
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.start();
      setRecording(true);
    } catch (err) {
      console.error('Microphone access denied or error', err);
      alert('Не удалось получить доступ к микрофону: ' + err.message);
    }
  }

  async function stop() {
    const mr = mediaRecorderRef.current;
    if (!mr) return;
    return new Promise((resolve) => {
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        // send to server
        const fd = new FormData();
        fd.append('file', blob, 'recording.webm');
        try {
          setLoading(true);
          const resp = await fetch('/api/transcribe', { method: 'POST', body: fd });
          if (!resp.ok) {
            const txt = await resp.text();
            throw new Error(txt || 'Server error');
          }
          const data = await resp.json();
          onResult(data);
        } catch (err) {
          console.error(err);
          alert('Ошибка при отправке/обработке: ' + err.message);
        } finally {
          setLoading(false);
          resolve();
        }
      };
      mr.stop();
      setRecording(false);
    });
  }

  return (
    <div className="controls">
      {!recording ? (
        <button className="record" onClick={start}>Record</button>
      ) : (
        <button className="stop" onClick={stop}>Stop</button>
      )}
    </div>
  );
}