import React, { useState, useRef, useEffect } from 'react';
import { FilterOption } from '../utils/filterOptions';
import { RiArrowDropDownLine, RiCheckLine } from 'react-icons/ri';

interface DropdownProps {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onSelect: (values: string[]) => void;
    type: 'filter' | 'sort' | 'range';
    placeholder?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    title,
    options,
    selectedValues,
    onSelect,
    type,
    sortBy,
    sortOrder,
    onSortChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
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
    
    const handleFilterClick = (value: string) => {
        if (selectedValues.includes(value)) {
            onSelect(selectedValues.filter(v => v !== value));
        } else {
            onSelect([...selectedValues, value]);
        }
    };
    
    const handleSortClick = (value: string, order: 'asc' | 'desc') => {
        if (onSortChange) {
            onSortChange(value, order);
        }
        setIsOpen(false);
    };

    const displayTitle = type === 'filter' 
        ? `${title}${selectedValues.length > 0 ? ` (${selectedValues.length})` : ''}`
        : title;
    
    const isSortActive = (value: string, order: 'asc' | 'desc') => sortBy === value && sortOrder === order;

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className={`inline-flex justify-center items-center rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    selectedValues.length > 0 || isSortActive(sortBy || '', sortOrder || 'desc')
                        ? 'border-gray-300 bg-gray-200 text-gray-800'
                        : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {displayTitle}
                <RiArrowDropDownLine className="-mr-1 ml-1 h-3.5 w-3.5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-60 rounded-lg shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto">
                    <div className="py-1">
                        
                        {type === 'filter' && options.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleFilterClick(option.value)}
                            >
                                <div className="w-4 h-4 mr-3 border border-gray-300 rounded flex items-center justify-center">
                                    {selectedValues.includes(option.value) && <RiCheckLine className="h-4 w-4 text-gray-800" />}
                                </div>
                                {option.label}
                            </div>
                        ))}

                        {type === 'sort' && options.map((option) => (
                            <div key={option.value}>
                                <div
                                    className={`flex justify-between items-center px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer ${isSortActive(option.value, 'asc') ? 'bg-gray-50 font-semibold text-gray-800' : 'text-gray-700'}`}
                                    onClick={() => handleSortClick(option.value, 'asc')}
                                >
                                    {option.label} (A-Z / Low-High)
                                    {isSortActive(option.value, 'asc') && <RiCheckLine className="h-4 w-4 text-gray-800" />}
                                </div>
                                <div
                                    className={`flex justify-between items-center px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer ${isSortActive(option.value, 'desc') ? 'bg-gray-50 font-semibold text-gray-800' : 'text-gray-700'}`}
                                    onClick={() => handleSortClick(option.value, 'desc')}
                                >
                                    {option.label} (Z-A / High-Low)
                                    {isSortActive(option.value, 'desc') && <RiCheckLine className="h-4 w-4 text-gray-800" />}
                                </div>
                            </div>
                        ))}
                        
                        {type === 'filter' && selectedValues.length > 0 && (
                            <button
                                className="w-full text-center text-xs text-red-600 font-medium py-1.5 hover:bg-red-50 border-t border-gray-200"
                                onClick={() => onSelect([])}
                            >
                                Clear Filter
                            </button>
                        )}
                        
                        {type === 'range' && <p className="px-4 py-2 text-sm text-gray-500">Range input coming soon...</p>}

                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;