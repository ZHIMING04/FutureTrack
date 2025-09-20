export default function ProfileHeader({ user, isEditing, onEditToggle }) {
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Profile Picture */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {getInitials(user?.name)}
                    </div>
                    
                    {/* User Info */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Student'}</h1>
                        <p className="text-gray-600">{user?.current_education_level || 'Student'}</p>
                        <p className="text-sm text-gray-500">{user?.school || 'School not specified'}</p>
                    </div>
                </div>

                {/* Edit Button */}
                <button
                    onClick={onEditToggle}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        isEditing 
                            ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
        </div>
    );
}
