export default function AssessmentProgress({ currentStep, totalSteps, progress, overallProgress }) {
    const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

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
                    <div className="text-2xl font-bold text-blue-600">{overallProgress?.completed || 0}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{overallProgress?.total || 0}</div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{overallProgress?.percentage || 0}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                </div>
            </div>
        </div>
    );
}
