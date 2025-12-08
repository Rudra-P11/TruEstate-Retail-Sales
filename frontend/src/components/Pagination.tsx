import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiMoreFill } from 'react-icons/ri';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const MAX_PAGES_DISPLAYED = 5;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers: (number | '...')[] = [];
    
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    if (endPage - startPage + 1 < MAX_PAGES_DISPLAYED) {
        startPage = Math.max(1, endPage - MAX_PAGES_DISPLAYED + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    
    if (startPage > 1) {
        if (startPage > 2) pageNumbers.unshift('...');
        pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    const PageButton: React.FC<{ page: number | '...' }> = ({ page }) => {
        if (page === '...') {
            return (
                <span className="px-1.5 py-0.5 text-gray-500">
                    <RiMoreFill className="h-3.5 w-3.5" />
                </span>
            );
        }
        
        const isCurrent = page === currentPage;
        
        return (
            <button
                onClick={() => onPageChange(page)}
                disabled={isCurrent}
                className={`px-2 py-0.5 text-xs font-medium rounded-lg transition-colors ${
                    isCurrent 
                        ? 'bg-gray-800 text-white cursor-default' 
                        : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
                {page}
            </button>
        );
    };

    return (
        <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-600">
                Page {currentPage} of {totalPages}
            </div>

            <nav className="flex items-center space-x-0.5" aria-label="Pagination">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RiArrowLeftSLine className="h-4 w-4" />
                </button>

                {pageNumbers.map((page, index) => (
                    <PageButton key={index} page={page} />
                ))}
                
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RiArrowRightSLine className="h-4 w-4" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;