import React from 'react';

export default function AIInsightCard({ summary }) {
    if (!summary) return null;

    const handleNextStep = (action) => {
        if (action.startsWith('open:')) {
            const path = action.substring(5);
            window.location.href = path;
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-6">
            <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {summary.headline || 'AI Insight'}
                    </h3>
                    {summary.summary && (
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {summary.summary}
                        </p>
                    )}
                </div>
            </div>

            {summary.bullets && summary.bullets.length > 0 && (
                <div className="mb-6">
                    <ul className="space-y-2">
                        {summary.bullets.map((bullet, index) => (
                            <li key={index} className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-gray-700">{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {summary.next_steps && summary.next_steps.length > 0 && (
                <div className="border-t border-blue-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Recommended Next Steps</h4>
                    <div className="flex flex-wrap gap-2">
                        {summary.next_steps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => handleNextStep(step.action)}
                                className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                {step.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
