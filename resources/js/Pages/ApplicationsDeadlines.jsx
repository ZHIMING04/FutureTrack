import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import ApplicationSummary from '../Component/Application/ApplicationSummary';
import ApplicationList from '../Component/Application/ApplicationList';
import DeadlineCalendar from '../Component/Application/DeadlineCalendar';
import ApplicationFilters from '../Component/Application/ApplicationFilters';

export default function ApplicationsDeadlines({ 
    user, 
    applications, 
    summaryStats, 
    navigationItems 
}) {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredApplications = applications?.filter(app => {
        const matchesFilter = selectedFilter === 'all' || 
            (selectedFilter === 'urgent' && app.deadline?.daysLeft <= 7) ||
            (selectedFilter === 'active' && ['In Progress', 'Under Review'].includes(app.status)) ||
            (selectedFilter === 'submitted' && app.status === 'Submitted');
        
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        const matchesSearch = searchTerm === '' || 
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.organization.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesFilter && matchesStatus && matchesSearch;
    }) || [];

    const handleStatusUpdate = async (applicationId, newStatus) => {
        try {
            const response = await fetch('/applications-deadlines/update-application', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    application_id: applicationId,
                    status: newStatus
                })
            });

            if (response.ok) {
                // Refresh the page to show updated status
                window.location.reload();
            } else {
                console.error('Failed to update application status');
            }
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    return (
        <MainLayout 
            title="Applications & Deadlines" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Applications & Deadlines - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications & Deadlines</h1>
                    <p className="text-gray-600">
                        Track your applications and stay on top of important deadlines.
                    </p>
                </div>

                {/* Summary Statistics */}
                <ApplicationSummary stats={summaryStats} />

                {/* Filters and Search */}
                <div className="mb-8">
                    <ApplicationFilters
                        selectedFilter={selectedFilter}
                        selectedStatus={selectedStatus}
                        searchTerm={searchTerm}
                        onFilterChange={setSelectedFilter}
                        onStatusChange={setSelectedStatus}
                        onSearchChange={setSearchTerm}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Applications List */}
                    <div className="lg:col-span-2">
                        <ApplicationList
                            applications={filteredApplications}
                            onStatusUpdate={handleStatusUpdate}
                        />
                    </div>

                    {/* Deadline Calendar */}
                    <div className="lg:col-span-1">
                        <DeadlineCalendar
                            applications={applications}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
