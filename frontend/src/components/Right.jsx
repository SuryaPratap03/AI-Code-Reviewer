import React from 'react';

const Right = ({setCode,callAI,setLoading}) => {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white rounded-lg shadow-lg m-4 overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
        <div className="text-sm text-gray-300">index.js</div>
        <div className="space-x-1">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-grow flex font-mono text-sm overflow-auto">
        {/* Line Numbers */}
        <div className="bg-[#2d2d2d] px-2 py-1 text-gray-400 text-right select-none">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Editable Code Area */}
        <div
          className="w-full px-4 py-2 outline-none whitespace-pre overflow-auto"
          contentEditable
          spellCheck={false}
          style={{ minHeight: '100%', backgroundColor: '#1e1e1e' }}
          id="code-editor"
          onInput={(e) => setCode(e.currentTarget.innerText)} 
          
        >
          <div className="text-green-400">function helloWorld() {'{'}</div>
          <div className="pl-4 text-blue-400">console.log(<span className="text-yellow-300">"Hello, World!"</span>);</div>
          <div className="text-green-400">{'}'}</div>
        </div>
      </div>

      {/* Send Button */}
      <div className="p-4 border-t border-gray-700 bg-[#2d2d2d]">
        <button
          onClick={() => {
            const code = document.getElementById('code-editor').innerText;
            console.log('Code submitted:', code);
            setLoading(true)
            // You can send `code` to backend or another component here
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-black rounded-lg font-semibold"
          onClickCapture={()=>callAI()}
        >
          Send Code
        </button>
      </div>
    </div>
  );
};

export default Right;
