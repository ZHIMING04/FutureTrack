import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import CourseTabs from '../Component/Course/CourseTabs';
import CourseGrid from '../Component/Course/CourseGrid';
import MyCoursesList from '../Component/Course/MyCoursesList';
import CourseFilters from '../Component/Course/CourseFilters';

export default function Courses({ 
    user, 
    courses, 
    enrolledCourses, 
    activeTab, 
    navigationItems 
}) {
    const [selectedTab, setSelectedTab] = useState(activeTab || 'recommended');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses?.filter(course => {
        const matchesType = selectedType === 'all' || course.type === selectedType;
        const matchesDifficulty = selectedDifficulty === 'all' || course.difficultyLevel === selectedDifficulty;
        const matchesSearch = searchTerm === '' || 
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesType && matchesDifficulty && matchesSearch;
    }) || [];

    const handleEnroll = async (courseId) => {
        try {
            const response = await fetch('/courses/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    course_id: courseId
                })
            });

            if (response.ok) {
                // Refresh the page to show updated enrollments
                window.location.reload();
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to enroll in course');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('Error enrolling in course');
        }
    };

    const handleProgressUpdate = async (enrollmentId, progressPercentage) => {
        try {
            const response = await fetch('/courses/update-progress', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    enrollment_id: enrollmentId,
                    progress_percentage: progressPercentage
                })
            });

            if (response.ok) {
                // Refresh the page to show updated progress
                window.location.reload();
            } else {
                console.error('Failed to update progress');
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    return (
        <MainLayout 
            title="Courses" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Courses - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Courses</h1>
                    <p className="text-gray-600">
                        Enhance your skills with our comprehensive course offerings.
                    </p>
                </div>

                {/* Course Tabs */}
                <CourseTabs
                    activeTab={selectedTab}
                    onTabChange={setSelectedTab}
                    enrolledCount={enrolledCourses?.length || 0}
                />

                {/* Filters and Search */}
                {selectedTab !== 'my-courses' && (
                    <div className="mb-8">
                        <CourseFilters
                            selectedType={selectedType}
                            selectedDifficulty={selectedDifficulty}
                            searchTerm={searchTerm}
                            onTypeChange={setSelectedType}
                            onDifficultyChange={setSelectedDifficulty}
                            onSearchChange={setSearchTerm}
                        />
                    </div>
                )}

                {/* Course Content */}
                {selectedTab === 'my-courses' ? (
                    <MyCoursesList
                        enrolledCourses={enrolledCourses}
                        onProgressUpdate={handleProgressUpdate}
                    />
                ) : (
                    <CourseGrid
                        courses={filteredCourses}
                        onEnroll={handleEnroll}
                        enrolledCourseIds={enrolledCourses?.map(ec => ec.course.id) || []}
                    />
                )}
            </div>
        </MainLayout>
    );
}
