import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="FutureTrack - Your Technology Partner" />
            
            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Building the 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                {" "}Future
                            </span>
                            <br />
                            of Technology
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                            We craft innovative digital solutions that transform businesses and drive growth in the digital ag..
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Get Started
                            </button>
                            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide comprehensive technology solutions to help your business thrive in the digital landscape.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service Card 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Development</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Modern, responsive websites and web applications built with cutting-edge technologies and best practices.
                            </p>
                        </div>

                        {/* Service Card 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Apps</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.
                            </p>
                        </div>

                        {/* Service Card 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Analytics</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Transform your data into actionable insights with our advanced analytics and business intelligence solutions.
                            </p>
                        </div>

                        {/* Service Card 4 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Solutions</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Protect your digital assets with our comprehensive cybersecurity and data protection services.
                            </p>
                        </div>

                        {/* Service Card 5 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Migration</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Seamlessly migrate your infrastructure to the cloud for improved scalability and performance.
                            </p>
                        </div>

                        {/* Service Card 6 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI & Machine Learning</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Leverage artificial intelligence and machine learning to automate processes and gain competitive advantages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <div className="text-5xl font-bold mb-2">500+</div>
                            <div className="text-xl text-blue-100">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">200+</div>
                            <div className="text-xl text-blue-100">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">50+</div>
                            <div className="text-xl text-blue-100">Team Members</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">5+</div>
                            <div className="text-xl text-blue-100">Years Experience</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Let's discuss how our technology solutions can help you achieve your goals and drive innovation in your industry.
                    </p>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Start Your Project Today
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">FutureTrack</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Your trusted partner in digital transformation and technology innovation.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Web Development</li>
                                <li>Mobile Apps</li>
                                <li>Cloud Solutions</li>
                                <li>Data Analytics</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>About Us</li>
                                <li>Our Team</li>
                                <li>Careers</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>info@futuretrack.com</li>
                                <li>+1 (555) 123-4567</li>
                                <li>123 Tech Street</li>
                                <li>Digital City, DC 12345</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FutureTrack. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
