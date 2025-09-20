import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function PreferencesSettings({ preferences }) {
    const { data, setData, put, processing, errors } = useForm({
        preferences: {
            notifications: preferences?.notifications ?? true,
            theme: preferences?.theme ?? 'light',
            language: preferences?.language ?? 'en',
            emailUpdates: preferences?.emailUpdates ?? true,
            smsUpdates: preferences?.smsUpdates ?? false
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/settings/preferences');
    };

    const handlePreferenceChange = (key, value) => {
        setData('preferences', {
            ...data.preferences,
            [key]: value
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Preferences</h2>
                <p className="text-gray-600">Customize your application experience and behavior.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Notifications */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">General Notifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Enable Notifications</label>
                                <p className="text-sm text-gray-500">Receive notifications for important updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.preferences.notifications}
                                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Theme */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                                    data.preferences.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}>
                                    <input
                                        type="radio"
                                        name="theme"
                                        value="light"
                                        checked={data.preferences.theme === 'light'}
                                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                                        <span className="text-sm font-medium">Light</span>
                                    </div>
                                </label>
                                <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                                    data.preferences.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}>
                                    <input
                                        type="radio"
                                        name="theme"
                                        value="dark"
                                        checked={data.preferences.theme === 'dark'}
                                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-gray-800 rounded-full mr-3"></div>
                                        <span className="text-sm font-medium">Dark</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Language & Region</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <select
                                value={data.preferences.language}
                                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="en">English</option>
                                <option value="ms">Bahasa Malaysia</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Communication Preferences */}
                <div className="pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Communication</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Email Updates</label>
                                <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.preferences.emailUpdates}
                                    onChange={(e) => handlePreferenceChange('emailUpdates', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">SMS Updates</label>
                                <p className="text-sm text-gray-500">Receive updates via SMS</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.preferences.smsUpdates}
                                    onChange={(e) => handlePreferenceChange('smsUpdates', e.target.checked)}
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
                        {processing ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>
            </form>
        </div>
    );
}
