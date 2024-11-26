import React, { useState } from 'react';

const AudioRecorder = ({ onSave }) => {
  const [recorder, setRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const startRecording = async () => {

 // Check if browser supports navigator.mediaDevices.getUserMedia
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Audio recording is not supported in your browser.');
    return;
  }


    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      onSave(blob);
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecorder(null);
    }
  };

  return (
    <div>
      {recorder ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  );
};

export default AudioRecorder;
