import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AIChatInterface({ chatHistory, quickQuestions, features }) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        setIsLoading(true);
        
        // Send message to backend
        router.post('/mentors-guidance/send-message', {
            message: message
        }, {
            onSuccess: () => {
                setMessage('');
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleQuickQuestion = (question) => {
        setMessage(question);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-blue-50">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">AI Mentor</h3>
                                <p className="text-sm text-gray-600">Always available to help</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {chatHistory.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-900'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                    <p className="text-xs mt-1 opacity-75">{msg.timestamp}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                        <span className="text-sm">AI is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything about pathways, careers, or university applications..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!message.trim() || isLoading}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* AI Features */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">AI Mentor Features</h3>
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Questions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Questions</h3>
                    <div className="space-y-2">
                        {quickQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickQuestion(question)}
                                className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200 hover:border-blue-300 transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
