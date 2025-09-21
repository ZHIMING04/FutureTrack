import { useState } from 'react';

export default function GradeSlider({ 
    label, 
    current, 
    target, 
    onChange, 
    min = 0, 
    max = 4, 
    step = 0.1,
    showGradeIndicator = true 
}) {
    // Ensure we have valid numbers
    const safeCurrent = typeof current === 'number' ? current : 0;
    const safeTarget = typeof target === 'number' ? target : 0;
    
    const [value, setValue] = useState(safeTarget || safeCurrent || 0);

    const handleChange = (newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

    const getGradeLetter = (grade) => {
        const numGrade = parseFloat(grade) || 0;
        if (numGrade >= 4.0) return 'A+';
        if (numGrade >= 3.7) return 'A';
        if (numGrade >= 3.3) return 'A-';
        if (numGrade >= 3.0) return 'B+';
        if (numGrade >= 2.7) return 'B';
        if (numGrade >= 2.3) return 'B-';
        if (numGrade >= 2.0) return 'C+';
        if (numGrade >= 1.7) return 'C';
        if (numGrade >= 1.3) return 'C-';
        if (numGrade >= 1.0) return 'D+';
        if (numGrade >= 0.7) return 'D';
        return 'F';
    };

    const getGradeColor = (grade) => {
        const numGrade = parseFloat(grade) || 0;
        if (numGrade >= 3.7) return 'bg-green-500';
        if (numGrade >= 3.0) return 'bg-blue-500';
        if (numGrade >= 2.0) return 'bg-yellow-500';
        if (numGrade >= 1.0) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getProgressColor = (grade) => {
        const numGrade = parseFloat(grade) || 0;
        if (numGrade >= 3.7) return 'bg-green-400';
        if (numGrade >= 3.0) return 'bg-blue-400';
        if (numGrade >= 2.0) return 'bg-yellow-400';
        if (numGrade >= 1.0) return 'bg-orange-400';
        return 'bg-red-400';
    };

    const percentage = ((parseFloat(value) - min) / (max - min)) * 100;

    return (
        <div className="space-y-3">
            {/* Label and Current Value */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
                    </div>
                    <p className="text-xs text-gray-500">Current: {safeCurrent.toFixed(1)}</p>
                </div>
                {showGradeIndicator && (
                    <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full ${getGradeColor(value)} flex items-center justify-center text-white text-xs font-bold`}>
                            {getGradeLetter(value)}
                        </div>
                    </div>
                )}
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Background Track */}
                <div className="w-full h-2 bg-gray-200 rounded-full">
                    {/* Progress Fill */}
                    <div 
                        className={`h-2 rounded-full transition-all duration-200 ${getProgressColor(value)}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* Slider Input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => handleChange(parseFloat(e.target.value))}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                />

                {/* Value Display */}
                <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">{min}</span>
                    <span className="text-sm font-medium text-gray-900">{value.toFixed(1)}</span>
                    <span className="text-xs text-gray-500">{max}</span>
                </div>
            </div>

            {/* Target Value Input (Optional) */}
            <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-600">Target:</label>
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>
    );
}
