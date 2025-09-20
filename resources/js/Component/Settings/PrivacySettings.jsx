import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function PrivacySettings({ privacy }) {
    const { data, setData, put, processing, errors } = useForm({
        privacy: {
            profileVisibility: privacy?.profileVisibility ?? 'public',
            showAcademicRecords: privacy?.showAcademicRecords ?? true,
            showActivities: privacy?.showActivities ?? true,
            allowMentorContact: privacy?.allowMentorContact ?? true
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/settings/privacy');
    };

    const handlePrivacyChange = (key, value) => {
        setData('privacy', {
            ...data.privacy,
            [key]: value
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy Settings</h2>
                <p className="text-gray-600">Control who can see your information and how it's shared.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Visibility */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="profileVisibility"
                                        value="public"
                                        checked={data.privacy.profileVisibility === 'public'}
                                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Public</span>
                                        <p className="text-sm text-gray-500">Anyone can see your profile</p>
                                    </div>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="profileVisibility"
                                        value="friends"
                                        checked={data.privacy.profileVisibility === 'friends'}
                                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Friends Only</span>
                                        <p className="text-sm text-gray-500">Only your connections can see your profile</p>
                                    </div>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="profileVisibility"
                                        value="private"
                                        checked={data.privacy.profileVisibility === 'private'}
                                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Private</span>
                                        <p className="text-sm text-gray-500">Only you can see your profile</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Sharing */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Information Sharing</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Show Academic Records</label>
                                <p className="text-sm text-gray-500">Allow others to see your academic achievements</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.privacy.showAcademicRecords}
                                    onChange={(e) => handlePrivacyChange('showAcademicRecords', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Show Activities & Awards</label>
                                <p className="text-sm text-gray-500">Display your extracurricular activities and achievements</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.privacy.showActivities}
                                    onChange={(e) => handlePrivacyChange('showActivities', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Mentor Contact */}
                <div className="pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Mentor Access</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Allow Mentor Contact</label>
                                <p className="text-sm text-gray-500">Let mentors reach out to you for guidance</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.privacy.allowMentorContact}
                                    onChange={(e) => handlePrivacyChange('allowMentorContact', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {processing ? 'Saving...' : 'Save Privacy Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
