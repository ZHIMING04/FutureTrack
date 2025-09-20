import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import UniversityCourseModal from './UniversityCourseModal';

export default function CareerCard({ career, isPrimaryGoal, universityCourses = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const { post, processing } = useForm();

    const handleSetPrimaryGoal = (e) => {
        e.stopPropagation();
        post('/career-explorer/set-primary-goal', {
            career_id: career.id
        });
    };

    const getMatchColor = (percentage) => {
        if (percentage >= 70) return 'text-green-600 bg-green-100';
        if (percentage >= 40) return 'text-blue-600 bg-blue-100';
        return 'text-yellow-600 bg-yellow-100';
    };

    const getDemandColor = (level) => {
        switch (level) {
            case 'High': return 'text-red-600 bg-red-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            case 'Low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div 
            className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer ${
                isPrimaryGoal ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Header */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{career.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{career.domain}</p>
                    </div>
                    {isPrimaryGoal && (
                        <div className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            Primary Goal
                        </div>
                    )}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{career.description}</p>

                {/* Stats */}
                <div className="flex items-center space-x-4 mb-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(career.matchPercentage)}`}>
                        {career.matchPercentage}% Match
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(career.demandLevel)}`}>
                        {career.demandLevel} Demand
                    </div>
                    {career.isAiRecommended && (
                        <div className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                            AI Recommended
                        </div>
                    )}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-medium">Salary:</span> {career.salaryRange}
                    </div>
                    <div>
                        <span className="font-medium">Study:</span> {career.studyDuration}
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200">
                    {/* Key Skills */}
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills Required</h4>
                        <div className="flex flex-wrap gap-2">
                            {career.keySkills?.slice(0, 6).map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                            {career.keySkills?.length > 6 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                                    +{career.keySkills.length - 6} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Degree Programs */}
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended Programs</h4>
                        <div className="space-y-1">
                            {career.degreePrograms?.slice(0, 3).map((program, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                    • {program}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex space-x-3">
                        <button
                            onClick={handleSetPrimaryGoal}
                            disabled={isPrimaryGoal || processing}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                isPrimaryGoal
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {processing ? 'Setting...' : isPrimaryGoal ? 'Primary Goal' : 'Set as Primary Goal'}
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowCourseModal(true);
                            }}
                            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            )}

            {/* Expand/Collapse Indicator */}
            <div className="px-6 pb-4 flex justify-center">
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* University Course Modal */}
            <UniversityCourseModal
                isOpen={showCourseModal}
                onClose={() => setShowCourseModal(false)}
                careerTitle={career.title}
                courses={universityCourses}
            />
        </div>
    );
}
