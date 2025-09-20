export default function AcademicRecordsCard({ academicRecords, isEditing }) {
    const getGradeColor = (grade) => {
        if (grade === 'A' || grade === 'A+') return 'bg-green-100 text-green-800';
        if (grade === 'A-') return 'bg-blue-100 text-blue-800';
        if (grade === 'B+' || grade === 'B') return 'bg-yellow-100 text-yellow-800';
        if (grade === 'C+' || grade === 'C') return 'bg-orange-100 text-orange-800';
        if (grade === 'D' || grade === 'E') return 'bg-red-100 text-red-800';
        if (grade === 'Band 4' || grade === 'Band 5' || grade === 'Band 6') return 'bg-green-100 text-green-800';
        if (grade === 'Band 3') return 'bg-yellow-100 text-yellow-800';
        if (grade === 'Band 1' || grade === 'Band 2') return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    const spmResults = academicRecords?.spmResults;
    const muetResults = academicRecords?.muetResults;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Academic Records</h2>
                {isEditing && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                        Add Subject
                    </button>
                )}
            </div>

            {/* SPM Results */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-md font-medium text-gray-800">SPM Results</h3>
                    {spmResults?.overallGPA && (
                        <div className="text-sm text-gray-600">
                            Overall GPA: <span className="font-semibold text-blue-600">{spmResults.overallGPA}</span>
                        </div>
                    )}
                </div>

                {spmResults?.subjects && spmResults.subjects.length > 0 ? (
                    <div className="space-y-2">
                        {spmResults.subjects.map((subject, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{subject.subjectName}</div>
                                    {subject.subjectCode && (
                                        <div className="text-xs text-gray-500">Code: {subject.subjectCode}</div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(subject.grade)}`}>
                                        {subject.grade}
                                    </span>
                                    {subject.gradePoints && (
                                        <span className="text-xs text-gray-500">
                                            {subject.gradePoints} pts
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No SPM results available</p>
                )}
            </div>

            {/* MUET Results */}
            {muetResults && (
                <div>
                    <h3 className="text-md font-medium text-gray-800 mb-3">MUET Results</h3>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{muetResults.subjectName}</div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(muetResults.grade)}`}>
                            {muetResults.grade}
                        </span>
                    </div>
                </div>
            )}

            {/* Add Subject Button for Editing */}
            {isEditing && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200">
                        + Add New Subject
                    </button>
                </div>
            )}
        </div>
    );
}
