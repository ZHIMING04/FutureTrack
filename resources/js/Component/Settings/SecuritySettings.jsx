import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function SecuritySettings() {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const passwordForm = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const deleteForm = useForm({
        confirmation: ''
    });

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/settings/password', {
            onSuccess: () => {
                passwordForm.reset();
                setShowPasswordForm(false);
            }
        });
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        deleteForm.post('/settings/delete-account', {
            onSuccess: () => {
                deleteForm.reset();
                setShowDeleteForm(false);
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Change Password</h2>
                    <p className="text-gray-600">Update your password to keep your account secure.</p>
                </div>

                {!showPasswordForm ? (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Change Password
                    </button>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {passwordForm.errors.current_password && (
                                <p className="mt-1 text-sm text-red-600">{passwordForm.errors.current_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.new_password}
                                onChange={(e) => passwordForm.setData('new_password', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {passwordForm.errors.new_password && (
                                <p className="mt-1 text-sm text-red-600">{passwordForm.errors.new_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.new_password_confirmation}
                                onChange={(e) => passwordForm.setData('new_password_confirmation', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {passwordForm.errors.new_password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{passwordForm.errors.new_password_confirmation}</p>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {passwordForm.processing ? 'Updating...' : 'Update Password'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowPasswordForm(false);
                                    passwordForm.reset();
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Two-Factor Authentication</h2>
                    <p className="text-gray-600">Add an extra layer of security to your account.</p>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium text-gray-900">2FA Status</span>
                        <p className="text-sm text-gray-500">Not enabled</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        Enable 2FA
                    </button>
                </div>
            </div>

            {/* Account Deletion */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-red-900 mb-2">Delete Account</h2>
                    <p className="text-gray-600">Permanently delete your account and all associated data.</p>
                </div>

                {!showDeleteForm ? (
                    <button
                        onClick={() => setShowDeleteForm(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Delete Account
                    </button>
                ) : (
                    <form onSubmit={handleDeleteSubmit} className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Are you sure?</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>This action cannot be undone. This will permanently delete your account and remove all data from our servers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type "DELETE" to confirm
                            </label>
                            <input
                                type="text"
                                value={deleteForm.data.confirmation}
                                onChange={(e) => deleteForm.setData('confirmation', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="DELETE"
                                required
                            />
                            {deleteForm.errors.confirmation && (
                                <p className="mt-1 text-sm text-red-600">{deleteForm.errors.confirmation}</p>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                disabled={deleteForm.processing || deleteForm.data.confirmation !== 'DELETE'}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {deleteForm.processing ? 'Deleting...' : 'Delete Account'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowDeleteForm(false);
                                    deleteForm.reset();
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
