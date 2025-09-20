import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function PersonalDetailsCard({ personalDetails, studentProfile, isEditing, success }) {
    const [formData, setFormData] = useState({
        fullName: personalDetails?.fullName || '',
        icNumber: personalDetails?.icNumber || '',
        email: personalDetails?.email || '',
        phoneNumber: personalDetails?.phoneNumber || '',
        currentEducationLevel: personalDetails?.currentEducationLevel || '',
        school: personalDetails?.school || ''
    });

    const { put, processing } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/my-profile', {
            ...formData,
            name: formData.fullName,
            phone: formData.phoneNumber,
            ic_number: formData.icNumber,
            current_education_level: formData.currentEducationLevel
        });
    };

    // Show success message
    useEffect(() => {
        if (success) {
            // You can add a toast notification here if you have one
            console.log('Profile updated successfully');
        }
    }, [success]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
                {isEditing && (
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                )}
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{personalDetails?.fullName || 'Not provided'}</p>
                        )}
                    </div>

                    {/* IC Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            IC Number
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="icNumber"
                                value={formData.icNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{personalDetails?.icNumber || 'Not provided'}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{personalDetails?.email || 'Not provided'}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{personalDetails?.phoneNumber || 'Not provided'}</p>
                        )}
                    </div>

                    {/* Current Education Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Education Level
                        </label>
                        {isEditing ? (
                            <select
                                name="currentEducationLevel"
                                value={formData.currentEducationLevel}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Level</option>
                                <option value="SPM Student">SPM Student</option>
                                <option value="STPM Student">STPM Student</option>
                                <option value="Matriculation Student">Matriculation Student</option>
                                <option value="Foundation Student">Foundation Student</option>
                                <option value="Degree Student">Degree Student</option>
                            </select>
                        ) : (
                            <p className="text-gray-900 py-2">{personalDetails?.currentEducationLevel || 'Not specified'}</p>
                        )}
                    </div>

                    {/* School */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            School
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{personalDetails?.school || 'Not specified'}</p>
                        )}
                    </div>

                </div>
            </form>
        </div>
    );
}
