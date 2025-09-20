import { Link } from '@inertiajs/react';

export default function Sidebar({ navigationItems }) {
    return (
        <div className="w-64 bg-white shadow-lg h-screen flex flex-col sticky top-0 overflow-y-auto">
            {/* Logo Section */}
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-blue-600">NexScholar</h1>
                <p className="text-xs text-gray-500 mt-1">Student Pathway Dashboard</p>
            </div>

            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search menu..."
                        className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h3>
                <nav className="space-y-0.5">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.id}
                            href="#"
                            className={`group flex items-center px-2 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
                                item.active
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <svg
                                className={`mr-2 h-4 w-4 ${
                                    item.active ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {item.name}
                            {item.active && (
                                <svg className="ml-auto h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                            {!item.active && (
                                <svg className="ml-auto h-3 w-3 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
