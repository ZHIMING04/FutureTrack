import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function NotificationSettings({ notifications }) {
    const { data, setData, put, processing, errors } = useForm({
        notifications: {
            deadlineReminders: notifications?.deadlineReminders ?? true,
            applicationUpdates: notifications?.applicationUpdates ?? true,
            courseReminders: notifications?.courseReminders ?? true,
            mentorMessages: notifications?.mentorMessages ?? true,
            systemUpdates: notifications?.systemUpdates ?? false
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/settings/notifications');
    };

    const handleNotificationChange = (key, value) => {
        setData('notifications', {
            ...data.notifications,
            [key]: value
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Settings</h2>
                <p className="text-gray-600">Choose what notifications you want to receive and how.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Application & Deadlines */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Applications & Deadlines</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Deadline Reminders</label>
                                <p className="text-sm text-gray-500">Get notified about upcoming application deadlines</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.notifications.deadlineReminders}
                                    onChange={(e) => handleNotificationChange('deadlineReminders', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Application Updates</label>
                                <p className="text-sm text-gray-500">Receive updates on your application status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.notifications.applicationUpdates}
                                    onChange={(e) => handleNotificationChange('applicationUpdates', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Learning & Courses */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Learning & Courses</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Course Reminders</label>
                                <p className="text-sm text-gray-500">Get reminded about course deadlines and assignments</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.notifications.courseReminders}
                                    onChange={(e) => handleNotificationChange('courseReminders', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Communication */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Communication</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">Mentor Messages</label>
                                <p className="text-sm text-gray-500">Receive messages from your assigned mentors</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.notifications.mentorMessages}
                                    onChange={(e) => handleNotificationChange('mentorMessages', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* System */}
                <div className="pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-gray-900">System Updates</label>
                                <p className="text-sm text-gray-500">Receive notifications about system maintenance and updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.notifications.systemUpdates}
                                    onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
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
                        {processing ? 'Saving...' : 'Save Notification Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
