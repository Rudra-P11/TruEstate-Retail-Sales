import React, { useState, useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface DateRangeFilterProps {
    selectedRange?: [string, string];
    onSelect: (range: [string, string]) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ selectedRange, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState<string>(selectedRange?.[0] || '');
    const [endDate, setEndDate] = useState<string>(selectedRange?.[1] || '');
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
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            if (start <= end) {
                onSelect([startDate, endDate]);
                setIsOpen(false);
            }
        }
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        onSelect(['', '']);
    };

    const formatDateForDisplay = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN');
    };

    const displayLabel = selectedRange && selectedRange[0] && selectedRange[1]
        ? `${formatDateForDisplay(selectedRange[0])} - ${formatDateForDisplay(selectedRange[1])}`
        : 'Date Range';

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className={`inline-flex justify-center items-center rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    selectedRange && selectedRange[0] && selectedRange[1]
                        ? 'border-gray-800 bg-gray-800 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
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

export default DateRangeFilter;
