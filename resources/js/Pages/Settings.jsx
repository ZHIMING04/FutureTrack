import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layout/MainLayout';
import ProfileSettings from '../Component/Settings/ProfileSettings';
import PreferencesSettings from '../Component/Settings/PreferencesSettings';
import PrivacySettings from '../Component/Settings/PrivacySettings';
import NotificationSettings from '../Component/Settings/NotificationSettings';
import SecuritySettings from '../Component/Settings/SecuritySettings';

export default function Settings({ 
    user, 
    profile, 
    preferences, 
    privacy, 
    notifications, 
    navigationItems 
}) {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'preferences', name: 'Preferences', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { id: 'privacy', name: 'Privacy', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L16 7H4.828zM4.828 17l2.586-2.586a2 2 0 012.828 0L16 17H4.828z' },
        { id: 'security', name: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings profile={profile} />;
            case 'preferences':
                return <PreferencesSettings preferences={preferences} />;
            case 'privacy':
                return <PrivacySettings privacy={privacy} />;
            case 'notifications':
                return <NotificationSettings notifications={notifications} />;
            case 'security':
                return <SecuritySettings />;
            default:
                return <ProfileSettings profile={profile} />;
        }
    };

    return (
        <MainLayout 
            title="Settings" 
            navigationItems={navigationItems}
            studentProfile={user}
        >
            <Head title="Settings - NexScholar" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">
                        Manage your account settings and preferences.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Settings Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                            activeTab === tab.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                        </svg>
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="lg:col-span-3">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
