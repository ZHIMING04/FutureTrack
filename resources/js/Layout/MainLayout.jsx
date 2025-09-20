import { Head } from '@inertiajs/react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({ 
    children, 
    title = "Dashboard", 
    navigationItems, 
    studentProfile 
}) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <Sidebar navigationItems={navigationItems} />
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Header */}
                    <Header studentProfile={studentProfile} />
                    
                    {/* Page Content */}
                    <main className="flex-1 p-6 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
