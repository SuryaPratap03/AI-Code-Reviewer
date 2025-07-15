import React from 'react';

const Left = ({ response, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#0e0e0e] text-white rounded-lg shadow-lg m-4">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-gray-400 text-sm font-mono">AI is reviewing your code...</p>
        </div>
      </div>
    );
  }

  const formatResponse = (text) => {
    const lines = text.split('\n').map((line, idx) => {
      const lower = line.toLowerCase();

      // === SECTION HEADINGS ===
      if (lower.includes('**strength') || lower.includes('strengths')) {
        return (
          <p key={idx} className="text-green-400 font-bold text-lg mt-6 mb-2 border-l-4 border-green-500 pl-3">
            ✅ Strengths
          </p>
        );
      }

      if (lower.includes('**improvement') || lower.includes('potential improvements')) {
        return (
          <p key={idx} className="text-yellow-300 font-bold text-lg mt-6 mb-2 border-l-4 border-yellow-400 pl-3">
            🛠️ Suggestions & Improvements
          </p>
        );
      }

      if (lower.includes('**error') || lower.includes('issues') || lower.includes('problem')) {
        return (
          <p key={idx} className="text-red-400 font-bold text-lg mt-6 mb-2 border-l-4 border-red-500 pl-3">
            ❌ Errors / Issues
          </p>
        );
      }

      if (lower.includes('**summary')) {
        return (
          <p key={idx} className="text-blue-400 font-bold text-lg mt-6 mb-2 border-l-4 border-blue-500 pl-3">
            📌 Summary
          </p>
        );
      }

      // === BULLETS ===
      if (line.trim().startsWith('*')) {
        const content = line.replace(/^\*\s*/, '');
        const colorClass = /error|issue|problem/i.test(content)
          ? 'text-red-300'
          : /improve|suggest/i.test(content)
          ? 'text-yellow-300'
          : /correct|good|works|clean/i.test(content)
          ? 'text-green-300'
          : 'text-cyan-300';

        return (
          <p key={idx} className={`ml-6 leading-relaxed font-medium ${colorClass}`}>
            • {content}
          </p>
        );
      }

      // === CODE BLOCKS ===
      if (line.trim().startsWith('function') || line.includes('console.') || line.includes('return')) {
        return (
          <pre
            key={idx}
            className="bg-gradient-to-br from-[#1e1e1e] to-[#2e2e2e] text-purple-300 text-sm font-mono p-3 rounded-lg my-3 ml-2 overflow-x-auto shadow-md border border-purple-500"
          >
            {line}
          </pre>
        );
      }

      // === REGULAR LINES — with colors ===
      let baseColor = 'text-gray-300';

      if (lower.includes('error') || lower.includes('warning')) baseColor = 'text-red-300';
      else if (lower.includes('suggest') || lower.includes('could')) baseColor = 'text-yellow-300';
      else if (lower.includes('good') || lower.includes('works') || lower.includes('correct')) baseColor = 'text-green-300';
      else if (lower.includes('note') || lower.includes('optional')) baseColor = 'text-blue-300';

      return (
        <p key={idx} className={`leading-relaxed mb-2 font-medium ${baseColor}`}>
          {line}
        </p>
      );
    });

    return lines;
  };

  return (
    <div className="flex flex-col h-full bg-[#0e0e0e] text-white rounded-lg shadow-lg m-4 overflow-hidden border border-[#333]">
      {/* Output Header */}
      <div className="px-4 py-2 bg-gradient-to-r from-[#2d2d2d] to-[#1c1c1c] border-b border-gray-700 text-sm font-semibold tracking-wide text-blue-300 shadow-inner">
        🤖 AI Code Review Output
      </div>

      {/* Output Body */}
      <div className="flex-grow px-6 py-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap break-words scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {response ? (
          <div className="space-y-1">{formatResponse(response)}</div>
        ) : (
          <p className="text-gray-500">Run the code review to see output here.</p>
        )}
      </div>
    </div>
  );
};

export default Left;
