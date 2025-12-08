import React, { useState, useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface AgeRangeFilterProps {
    selectedRange?: [number, number];
    onSelect: (range: [number, number]) => void;
}

const AgeRangeFilter: React.FC<AgeRangeFilterProps> = ({ selectedRange, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [minAge, setMinAge] = useState<string>(selectedRange?.[0]?.toString() || '');
    const [maxAge, setMaxAge] = useState<string>(selectedRange?.[1]?.toString() || '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleApply = () => {
        const min = parseInt(minAge);
        const max = parseInt(maxAge);
        
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max >= min) {
            onSelect([min, max]);
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        setMinAge('');
        setMaxAge('');
        onSelect([0, 100]);
    };

    const displayLabel = selectedRange && (selectedRange[0] > 0 || selectedRange[1] < 100)
        ? `Age: ${selectedRange[0]} - ${selectedRange[1]}`
        : 'Age Range';

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className={`inline-flex justify-center items-center rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    selectedRange && (selectedRange[0] > 0 || selectedRange[1] < 100)
                        ? 'border-gray-300 bg-gray-200 text-gray-800'
                        : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {displayLabel}
                <RiArrowDropDownLine className="-mr-1 ml-1 h-3.5 w-3.5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Min Age</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Max Age</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
                                placeholder="100"
                            />
                        </div>
                        <div className="flex space-x-2 pt-2">
                            <button
                                onClick={handleApply}
                                className="flex-1 bg-gray-800 text-white text-xs font-medium py-1.5 rounded-lg hover:bg-gray-900 transition-colors"
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleClear}
                                className="flex-1 border border-gray-300 text-gray-700 text-xs font-medium py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgeRangeFilter;
