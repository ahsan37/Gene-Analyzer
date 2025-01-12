import React, { useState } from 'react';
import FileUpload from './components/upload/FileUpload';
import Results from './components/results/Results';
import type { AnalysisResult } from './types/results';
import './index.css';

function App() {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const handleUploadSuccess = (uploadedResults: AnalysisResult[]) => {
    setResults(uploadedResults);
  };

  return (
    <div className="relative min-h-screen p-8" style={{
      color: 'rgb(0, 0, 0)',
      background: '#faf7ec'
    }}>
      <div className="absolute inset-0 -z-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_0px),linear-gradient(to_bottom,#80808012_1px,transparent_0px)] bg-[size:60px_60px]"></div>
          <div className="relative z-10 max-w-4xl mt-10 mx-auto space-y-6">
        <div>
          <h1 className="text-6xl">
            <span style={{ color: '#254bf1' }}>Exa</span>
            <span>Gene</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Upload your 23andme raw genome file for some cool insights & research!
          </p>
          <p className="mt-1 text-xs text-gray-400 italic">
            *This is an independent research tool and is not affiliated with or endorsed by Exa.ai
          </p>
        </div>

        <div className="bg-white p-8 rounded border border-gray-200">
          {results.length === 0 ? (
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          ) : (
            <Results results={results} />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
