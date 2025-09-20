import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function QuestionCard({ 
    question, 
    currentStep, 
    totalSteps, 
    onAnswerSelect, 
    onNext, 
    onPrevious, 
    answers 
}) {
    const [selectedAnswer, setSelectedAnswer] = useState(answers[question?.question_number] || '');
    const { post, processing } = useForm();

    useEffect(() => {
        setSelectedAnswer(answers[question?.question_number] || '');
    }, [question, answers]);

    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
        onAnswerSelect(question.question_number, answer);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            // Save answer to database
            post('/interest-assessment', {
                question_number: question.question_number,
                question: question.question,
                category: question.category,
                answer: selectedAnswer
            });
            
            onNext();
        }
    };

    const handlePrevious = () => {
        onPrevious();
    };

    if (!question) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-500">Loading question...</div>
            </div>
        );
    }

    const answerOptions = [
        { value: 'strongly_agree', label: 'Strongly Agree', color: 'bg-green-100 text-green-800' },
        { value: 'agree', label: 'Agree', color: 'bg-blue-100 text-blue-800' },
        { value: 'neutral', label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
        { value: 'disagree', label: 'Disagree', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'strongly_disagree', label: 'Strongly Disagree', color: 'bg-red-100 text-red-800' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            {/* Question Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        Question {currentStep} of {totalSteps}
                    </span>
                    <span className="text-sm text-gray-500">{question.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                    {question.question}
                </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
                {answerOptions.map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedAnswer === option.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="radio"
                            name={`question_${question.question_number}`}
                            value={option.value}
                            checked={selectedAnswer === option.value}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
                            selectedAnswer === option.value
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                        }`}>
                            {selectedAnswer === option.value && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    Previous
                </button>
                
                <button
                    onClick={handleNext}
                    disabled={!selectedAnswer || processing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                    {processing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : currentStep === totalSteps ? (
                        'Complete Assessment'
                    ) : (
                        'Next Question'
                    )}
                </button>
            </div>
        </div>
    );
}
