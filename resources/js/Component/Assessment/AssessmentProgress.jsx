export default function AssessmentProgress({ currentStep, totalSteps, progress, overallProgress }) {
    // Calculate progress based on current question position
    // Q1=20%, Q2=40%, Q3=60%, Q4=80%, Q5=100%
    const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
    
    // Debug logging
    console.log('Progress Debug:', { currentStep, totalSteps, progressPercentage });

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Assessment Progress</h2>
                <span className="text-sm text-gray-600">
                    Question {currentStep} of {totalSteps}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentStep}</div>
                    <div className="text-sm text-gray-600">Current Question</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{totalSteps}</div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                </div>
            </div>
        </div>
    );
}
