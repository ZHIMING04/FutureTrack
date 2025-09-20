export default function CourseTabs({ activeTab, onTabChange, enrolledCount }) {
    const tabs = [
        {
            id: 'recommended',
            name: 'Recommended',
            description: 'Courses tailored for you',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
            id: 'all-courses',
            name: 'All Courses',
            description: 'Browse all available courses',
            icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253'
        },
        {
            id: 'my-courses',
            name: 'My Courses',
            description: 'Your enrolled courses',
            icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            count: enrolledCount
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                            </svg>
                            {tab.name}
                            {tab.count !== undefined && tab.count > 0 && (
                                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                                    activeTab === tab.id
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="px-6 py-4">
                <p className="text-sm text-gray-600">
                    {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
            </div>
        </div>
    );
}
