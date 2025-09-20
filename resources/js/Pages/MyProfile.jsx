import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import ProfileHeader from '../Component/Profile/ProfileHeader';
import PersonalDetailsCard from '../Component/Profile/PersonalDetailsCard';
import AcademicRecordsCard from '../Component/Profile/AcademicRecordsCard';
import ActivitiesAwardsCard from '../Component/Profile/ActivitiesAwardsCard';

export default function MyProfile({ user, personalDetails, academicRecords, activitiesAndAwards, navigationItems, success, studentProfile }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <MainLayout 
            title="My Profile" 
            navigationItems={navigationItems} 
            studentProfile={user}
        >
            <Head title="My Profile" />
            
            {/* Profile Header */}
            <ProfileHeader 
                user={user}
                isEditing={isEditing}
                onEditToggle={() => setIsEditing(!isEditing)}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Details Card */}
                <PersonalDetailsCard 
                    personalDetails={personalDetails}
                    studentProfile={studentProfile}
                    isEditing={isEditing}
                    success={success}
                />

                {/* Academic Records Card */}
                <AcademicRecordsCard 
                    academicRecords={academicRecords}
                    isEditing={isEditing}
                />

                {/* Activities & Awards Card - Full Width */}
                <div className="lg:col-span-2">
                    <ActivitiesAwardsCard 
                        activitiesAndAwards={activitiesAndAwards}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </MainLayout>
    );
}
