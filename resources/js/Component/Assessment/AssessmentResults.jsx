import { router } from '@inertiajs/react';

export default function AssessmentResults({ answers, questions, onRestart }) {
    // Calculate results based on answers
    const calculateResults = () => {
        const categories = {
            'Activities': { strongly_agree: 0, agree: 0, neutral: 0, disagree: 0, strongly_disagree: 0 },
            'Interests': { strongly_agree: 0, agree: 0, neutral: 0, disagree: 0, strongly_disagree: 0 },
            'Values': { strongly_agree: 0, agree: 0, neutral: 0, disagree: 0, strongly_disagree: 0 }
        };

        // Count answers by category
        questions.forEach(question => {
            const answer = answers[question.question_number];
            if (answer && categories[question.category]) {
                categories[question.category][answer]++;
            }
        });

        // Calculate scores
        const scores = {};
        Object.keys(categories).forEach(category => {
            const cat = categories[category];
            const total = Object.values(cat).reduce((sum, count) => sum + count, 0);
            if (total > 0) {
                const positive = cat.strongly_agree * 2 + cat.agree;
                const negative = cat.strongly_disagree * 2 + cat.disagree;
                scores[category] = Math.round(((positive - negative) / (total * 2)) * 100);
            } else {
                scores[category] = 0;
            }
        });

        return scores;
    };

    const results = calculateResults();

    const getScoreColor = (score) => {
        if (score >= 70) return 'text-green-600 bg-green-100';
        if (score >= 40) return 'text-blue-600 bg-blue-100';
        if (score >= 10) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getScoreLabel = (score) => {
        if (score >= 70) return 'High Interest';
        if (score >= 40) return 'Moderate Interest';
        if (score >= 10) return 'Low Interest';
        return 'Very Low Interest';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
                <p className="text-gray-600">
                    Based on your answers, here are your interest areas and recommended next steps.
                </p>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {Object.entries(results).map(([category, score]) => (
                    <div key={category} className="text-center p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-3 ${getScoreColor(score)}`}>
                            {score}% - {getScoreLabel(score)}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    score >= 70 ? 'bg-green-500' : 
                                    score >= 40 ? 'bg-blue-500' : 
                                    score >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.max(score, 5)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
                <div className="space-y-3">
                    <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Explore Career Options</p>
                            <p className="text-gray-600 text-sm">Discover careers that match your interests and strengths</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Plan Your Pathway</p>
                            <p className="text-gray-600 text-sm">Create a personalized education roadmap</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Get Guidance</p>
                            <p className="text-gray-600 text-sm">Connect with mentors and career advisors</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => router.visit('/career-explorer')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Explore Careers
                </button>
                
                <button
                    onClick={() => router.visit('/pathway-planner')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Plan Pathway
                </button>
                
                <button
                    onClick={onRestart}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retake Assessment
                </button>
            </div>
        </div>
    );
}
