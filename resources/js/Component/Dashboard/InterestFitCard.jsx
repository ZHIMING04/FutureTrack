export default function InterestFitCard({ interestData }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Interest & Fit</h3>
                <p className="text-sm text-gray-600">Based on your assessment progress</p>
            </div>
            
            <div className="space-y-4">
                {interestData && interestData.length > 0 ? (
                    interestData.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">{item.category}</span>
                                <span className="text-gray-500">{item.percentage}%</span>
                            </div>
                            <div className="text-xs text-gray-600 mb-2">{item.description}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">Complete your interest assessment to see results</p>
                )}
            </div>
        </div>
    );
}