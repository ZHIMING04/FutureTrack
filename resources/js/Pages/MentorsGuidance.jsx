import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import AIChatInterface from '../Component/Mentor/AIChatInterface';
import HumanMentorsList from '../Component/Mentor/HumanMentorsList';
import UserSessions from '../Component/Mentor/UserSessions';
import MentorTabs from '../Component/Mentor/MentorTabs';

export default function MentorsGuidance({ 
    user, 
    activeTab, 
    aiMentorChat, 
    humanMentors, 
    userSessions, 
    aiMentorFeatures, 
    quickQuestions,
    navigationItems 
}) {
    const [currentTab, setCurrentTab] = useState(activeTab);

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <MainLayout 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Mentors & Guidance" />
            
            <div className="p-0">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentors & Guidance</h1>
                    <p className="text-gray-600">Get personalized guidance from AI mentors and human experts</p>
                </div>

                {/* Tabs */}
                <MentorTabs
                    activeTab={currentTab}
                    onTabChange={handleTabChange}
                />

                {/* Tab Content */}
                <div className="mt-2">
                    {currentTab === 'ai-mentor' && (
                        <AIChatInterface 
                            chatHistory={aiMentorChat}
                            quickQuestions={quickQuestions}
                            features={aiMentorFeatures}
                        />
                    )}
                    
                    {currentTab === 'human-mentors' && (
                        <HumanMentorsList 
                            mentors={humanMentors}
                        />
                    )}
                    
                    {currentTab === 'my-sessions' && (
                        <UserSessions 
                            sessions={userSessions}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
