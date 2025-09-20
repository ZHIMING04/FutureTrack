import MainLayout from '../Layout/MainLayout';
import ProgressCard from '../Component/Dashboard/ProgressCard';
import StatCard from '../Component/Dashboard/StatCard';
import ProfileSummaryCard from '../Component/Dashboard/ProfileSummaryCard';
import InterestFitCard from '../Component/Dashboard/InterestFitCard';
import DeadlineCard from '../Component/Dashboard/DeadlineCard';
import QuickActionCard from '../Component/Dashboard/QuickActionCard';
export default function Dashboard({ navigationItems, user, assessment, careerGoal, pathwayPlan, simulations, interestFit, upcomingDeadlines, progressStats }) {
    // Quick actions data - can be moved to database later
    const quickActions = [
        {
            id: 1,
            title: 'Complete Assessment',
            description: 'Discover your interests and strengths',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
            color: 'blue'
        },
        {
            id: 2,
            title: 'Explore Careers',
            description: 'Find careers that match your interests',
            icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6',
            color: 'purple'
        },
        {
            id: 3,
            title: 'Run Simulation',
            description: 'Test different pathway scenarios',
            icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
            color: 'green'
        },
        {
            id: 4,
            title: 'Get Guidance',
            description: 'Chat with mentors and AI advisor',
            icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
            color: 'orange'
        }
    ];
    return (
        <MainLayout 
            title="Dashboard" 
            navigationItems={navigationItems} 
            studentProfile={user}
        >
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Student'}!</h2>
                <p className="text-blue-100 mb-6">
                    Continue your journey to discover your ideal career path and plan your education roadmap.
                </p>
                <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center">
                    Complete Interest Assessment
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* First Row of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <ProgressCard
                    title="Interest Assessment"
                    progress={assessment?.progress || 0}
                    completed={assessment?.completed || 0}
                    total={assessment?.total || 40}
                    actionText="Continue Assessment"
                    icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
                
                <StatCard
                    title="Career Goal"
                    value={careerGoal?.title || 'Data Engineer'}
                    description={careerGoal ? `${careerGoal.matchPercentage}% Match` : 'Primary Goal'}
                    actionText="Explore Careers"
                    icon="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    color="purple"
                />
                
                <StatCard
                    title="Pathway Plan"
                    value={pathwayPlan?.route || 'Main Route'}
                    description={pathwayPlan?.path || 'STPM → Computer Science'}
                    actionText="View Pathways"
                    icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    color="green"
                />
                
                <StatCard
                    title="Simulations"
                    value={simulations?.count || 3}
                    description={simulations?.description || 'Scenarios Created'}
                    actionText="Run Simulation"
                    icon="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    color="orange"
                />
            </div>

            {/* Second Row of Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <ProfileSummaryCard
                    studentType={user?.studentType || 'SPM Student'}
                    subjects={user?.academicSubjects || []}
                />
                
                <InterestFitCard interestData={interestFit || []} />
                
                <DeadlineCard deadlines={upcomingDeadlines || []} />
            </div>

            {/* Quick Actions Section */}
            <div className="mb-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                    <p className="text-gray-600">Get started with key features to plan your pathway</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action) => (
                        <QuickActionCard
                            key={action.id}
                            title={action.title}
                            description={action.description}
                            icon={action.icon}
                            color={action.color}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>
        </MainLayout>
    );
}
