import { useState } from 'react';

export default function DeadlineCalendar({ applications }) {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const getDeadlinesForMonth = (month, year) => {
        if (!applications) return [];
        
        return applications
            .filter(app => app.deadline)
            .map(app => {
                const deadlineDate = new Date(app.deadline.dueDate);
                return {
                    ...app,
                    deadline: {
                        ...app.deadline,
                        date: deadlineDate.getDate(),
                        month: deadlineDate.getMonth(),
                        year: deadlineDate.getFullYear()
                    }
                };
            })
            .filter(app => 
                app.deadline.month === month && 
                app.deadline.year === year
            );
    };

    const getUrgencyColor = (daysLeft) => {
        if (daysLeft <= 7) return 'bg-red-100 text-red-800 border-red-200';
        if (daysLeft <= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const deadlines = getDeadlinesForMonth(selectedMonth, selectedYear);
        
        const days = [];
        
        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8"></div>);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDeadlines = deadlines.filter(d => d.deadline.date === day);
            const isToday = day === new Date().getDate() && 
                           selectedMonth === new Date().getMonth() && 
                           selectedYear === new Date().getFullYear();
            
            days.push(
                <div 
                    key={day} 
                    className={`h-8 flex items-center justify-center text-sm relative ${
                        isToday ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'
                    }`}
                >
                    {day}
                    {dayDeadlines.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                </div>
            );
        }
        
        return days;
    };

    const upcomingDeadlines = applications
        ?.filter(app => app.deadline && app.deadline.daysLeft <= 30)
        ?.sort((a, b) => a.deadline.daysLeft - b.deadline.daysLeft)
        ?.slice(0, 5) || [];

    return (
        <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Deadline Calendar</h3>
                    <div className="flex items-center space-x-2">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index}>{month}</option>
                            ))}
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                            {[2024, 2025, 2026].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                    {renderCalendar()}
                </div>

                <div className="text-xs text-gray-500 text-center">
                    Red dots indicate deadlines
                </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                
                {upcomingDeadlines.length > 0 ? (
                    <div className="space-y-3">
                        {upcomingDeadlines.map((application, index) => (
                            <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-sm font-medium text-gray-900">{application.name}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(application.deadline.daysLeft)}`}>
                                        {application.deadline.daysLeft} days
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{application.organization}</p>
                                <p className="text-xs text-gray-500">{application.deadline.dueDate}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <div className="text-sm text-gray-500">No upcoming deadlines</div>
                    </div>
                )}
            </div>
        </div>
    );
}
