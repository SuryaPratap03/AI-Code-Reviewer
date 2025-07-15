import React, { useState } from 'react';
import Right from './components/Right';
import Left from './components/Left';

function App() {
  const [code, setCode] = useState('function helloWorld() {console.log("Hello, World!");}');
  const [response, setResponse] = useState(null);
  const [loading,setLoading] = useState(false);

  const callAI = async () => {
    try {
      if (code.trim() === '') {
        throw new Error("No code to review");
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ai/get-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: code }),
      });

      const data = await response.text();
      if (data){
         setResponse(data)
          setLoading(false)
        };
    } catch (error) {
      console.error("Error calling AI:", error);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <main className="flex h-full w-full">
        <div className="w-1/2 h-full overflow-hidden">
          <Right setCode={setCode} setResponse={setResponse} callAI={callAI} setLoading={setLoading}/>
        </div>
        <div className="w-1/2 h-full overflow-hidden">
          <Left response={response} loading={loading}/>
        </div>
      </main>
    </div>
  );
}

export default App;
