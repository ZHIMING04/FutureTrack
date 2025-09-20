import { useState } from 'react';

export default function ActivitiesAwardsCard({ activitiesAndAwards, isEditing }) {
    const [activeTab, setActiveTab] = useState('activities');

    const tabs = [
        { id: 'activities', label: 'Activities', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
        { id: 'awards', label: 'Awards', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
        { id: 'skills', label: 'Skills', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'activities':
                return (
                    <div className="space-y-3">
                        {activitiesAndAwards?.activities && activitiesAndAwards.activities.length > 0 ? (
                            activitiesAndAwards.activities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">{activity}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No activities recorded</p>
                        )}
                        {isEditing && (
                            <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200">
                                + Add Activity
                            </button>
                        )}
                    </div>
                );

            case 'awards':
                return (
                    <div className="space-y-3">
                        {activitiesAndAwards?.awards && activitiesAndAwards.awards.length > 0 ? (
                            activitiesAndAwards.awards.map((award, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700">{award}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No awards recorded</p>
                        )}
                        {isEditing && (
                            <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200">
                                + Add Award
                            </button>
                        )}
                    </div>
                );

            case 'skills':
                return (
                    <div className="space-y-4">
                        {activitiesAndAwards?.skills && Object.keys(activitiesAndAwards.skills).length > 0 ? (
                            Object.entries(activitiesAndAwards.skills).map(([category, skills], index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 mb-2">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(skills) ? skills.map((skill, skillIndex) => (
                                            <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                {skill}
                                            </span>
                                        )) : (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                {skills}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No skills recorded</p>
                        )}
                        {isEditing && (
                            <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200">
                                + Add Skill
                            </button>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Activities & Awards</h2>
                {isEditing && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                        Add New
                    </button>
                )}
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                        </svg>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                {renderContent()}
            </div>
        </div>
    );
}
