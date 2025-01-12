import React from 'react';
import type { AnalysisResult } from '../../types/results';

interface ResultsProps {
    results: AnalysisResult[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results </h2>
            <div className="grid gap-6">
                {results.map((result) => (
                    <div 
                        key={result.rsid} 
                        className="rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
                    >
                        <div className="bg-white p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {result.traitName}
                                </h3>
                                <span 
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ 
                                        backgroundColor: '#e7ebfd',
                                        color: '#254bf1'
                                    }}
                                >
                                    {result.rsid}
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Your Genotype</p>
                                    <p className="mt-1 text-lg text-gray-900">{result.userGenotype}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Interpretation</p>
                                    <p className="mt-1 text-lg text-gray-900">{result.interpretation}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">Some Cool Research about this!</p>
                                <p className="mt-1 text-gray-600 whitespace-pre-line">
                                    {result.summary}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <a
                                    href={result.paper.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-brand-default hover:text-brand-dark"
                                >
                                    <span className="text-sm">Read Research Paper</span>
                                    <svg 
                                        className="ml-2 h-4 w-4" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
