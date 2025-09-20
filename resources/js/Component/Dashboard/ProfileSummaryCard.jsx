export default function ProfileSummaryCard({ studentType, subjects }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile Summary</h3>
                <p className="text-sm text-gray-600 mt-1">{studentType}</p>
            </div>
            
            <div className="space-y-3">
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Academic Subjects</h4>
                    <div className="space-y-2">
                        {subjects && subjects.length > 0 ? (
                            subjects.slice(0, 4).map((subject, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{subject.name}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        subject.color === 'green' ? 'bg-green-100 text-green-800' :
                                        subject.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                                        subject.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {subject.grade}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No subjects available</p>
                        )}
                    </div>
                </div>
            </div>
            
            <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Update Profile
            </button>
        </div>
    );
}