import React, { useState } from 'react';
import axios from 'axios';

export default function Index() {
  const [task, setTask] = useState("text-generation");
  const [modelId, setModelId] = useState("gpt2");
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const runInference = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/run_model", {
        task,
        model_id: modelId,
        input_text: inputText
      });
      setOutput(res.data);
    } catch (err) {
      setOutput({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">🧠 NeuroPilot Inference Playground</h1>
      <div className="mb-4">
        <label>Task:</label>
        <select value={task} onChange={e => setTask(e.target.value)} className="ml-2 p-1 border">
          <option value="text-generation">Text Generation</option>
          <option value="automatic-speech-recognition">Speech Recognition</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Model ID:</label>
        <input value={modelId} onChange={e => setModelId(e.target.value)} className="ml-2 p-1 border w-full" />
        <p className="text-sm text-gray-500">Try: <code>gpt2</code>, <code>openai/whisper-base</code></p>
      </div>
      <textarea
        rows={4}
        className="w-full border p-2 mb-4"
        placeholder="Enter input text or transcript..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button
        onClick={runInference}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Running..." : "Run Inference"}
      </button>
      {output && (
        <pre className="mt-6 bg-gray-100 p-4 text-sm whitespace-pre-wrap">
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  );
}
