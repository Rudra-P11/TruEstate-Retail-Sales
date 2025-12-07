import Dropdown from './Dropdown';
import AgeRangeFilter from './AgeRangeFilter';
import DateRangeFilter from './DateRangeFilter';
import { useSales } from '../hooks/useSalesData';
import { staticFilterOptions } from '../utils/filterOptions';
import { RiRefreshLine } from 'react-icons/ri'; 

const SORT_OPTIONS = [
    { label: 'Date', value: 'date' },
    { label: 'Quantity', value: 'quantity' },
    { label: 'Customer Name', value: 'customerName' },
];

const ControlsPanel = () => {
    const { query, handleFilterChange, handleSort, refetch } = useSales();

    const createFilterHandler = (key: 'regions' | 'genders' | 'categories' | 'tags' | 'paymentMethods') => (values: string[]) => {
        handleFilterChange(key, values);
    };
    
    const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        handleSort(sortBy as 'date' | 'quantity' | 'customerName', sortOrder);
    };
    
    const handleAgeRangeChange = (range: [number, number]) => {
        handleFilterChange('ageRange', range);
    };

    const handleDateRangeChange = (range: [string, string]) => {
        handleFilterChange('dateRange', range);
    };
    
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center gap-2">
                
                <div className="flex space-x-2 items-center">
                    <button 
                        onClick={refetch}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        title="Refresh data"
                    >
                        <RiRefreshLine className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <Dropdown 
                        title="Customer Region" 
                        options={staticFilterOptions.regions} 
                        selectedValues={query.regions} 
                        onSelect={createFilterHandler('regions')} 
                        type="filter" 
                    />
                    <Dropdown 
                        title="Gender" 
                        options={staticFilterOptions.genders} 
                        selectedValues={query.genders} 
                        onSelect={createFilterHandler('genders')} 
                        type="filter" 
                    />
                    
                    <AgeRangeFilter 
                        selectedRange={query.ageRange} 
                        onSelect={handleAgeRangeChange} 
                    />
                    
                    <Dropdown 
                        title="Product Category" 
                        options={staticFilterOptions.categories} 
                        selectedValues={query.categories} 
                        onSelect={createFilterHandler('categories')} 
                        type="filter" 
                    />
                    <Dropdown 
                        title="Tags" 
                        options={staticFilterOptions.tags} 
                        selectedValues={query.tags} 
                        onSelect={createFilterHandler('tags')} 
                        type="filter" 
                    />
                    <Dropdown 
                        title="Payment Method" 
                        options={staticFilterOptions.paymentMethods} 
                        selectedValues={query.paymentMethods} 
                        onSelect={createFilterHandler('paymentMethods')} 
                        type="filter" 
                    />
                    
                    <DateRangeFilter 
                        selectedRange={query.dateRange} 
                        onSelect={handleDateRangeChange} 
                    />
                    
                </div>

                <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-600 whitespace-nowrap">Sort by:</span>
                    <Dropdown 
                        title={SORT_OPTIONS.find(o => o.value === query.sortBy)?.label || 'Sort'}
                        options={SORT_OPTIONS}
                        selectedValues={[]} 
                        onSelect={() => {}} 
                        type="sort"
                        sortBy={query.sortBy}
                        sortOrder={query.sortOrder}
                        onSortChange={handleSortChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlsPanel;