import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import AssessmentProgress from '../Component/Assessment/AssessmentProgress';
import QuestionCard from '../Component/Assessment/QuestionCard';
import AssessmentResults from '../Component/Assessment/AssessmentResults';

export default function InterestAssessment({ 
    user, 
    currentQuestion, 
    totalQuestions, 
    progress, 
    questions, 
    overallProgress, 
    navigationItems, 
    success 
}) {
    const [currentStep, setCurrentStep] = useState(currentQuestion || 1);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (questionNumber, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionNumber]: answer
        }));
    };

    const handleNext = () => {
        if (currentStep < totalQuestions) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentQuestionData = questions?.find(q => q.question_number === currentStep);

    return (
        <MainLayout 
            title="Interest Assessment" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Interest Assessment - NexScholar" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Interest Assessment</h1>
                    <p className="text-gray-600">
                        Discover your interests and strengths to find the perfect career path for you.
                    </p>
                </div>

                {/* Progress Bar */}
                <AssessmentProgress 
                    currentStep={currentStep}
                    totalSteps={totalQuestions}
                    progress={progress}
                    overallProgress={overallProgress}
                />

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}

                {/* Question Card or Results */}
                {!showResults ? (
                    <QuestionCard
                        question={currentQuestionData}
                        currentStep={currentStep}
                        totalSteps={totalQuestions}
                        onAnswerSelect={handleAnswerSelect}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        answers={answers}
                    />
                ) : (
                    <AssessmentResults 
                        answers={answers}
                        questions={questions}
                        onRestart={() => {
                            setCurrentStep(1);
                            setAnswers({});
                            setShowResults(false);
                        }}
                    />
                )}
            </div>
        </MainLayout>
    );
}
