import Dropdown from './Dropdown';
import AgeRangeFilter from './AgeRangeFilter';
import DateRangeFilter from './DateRangeFilter';
import { useSales } from '../hooks/useSalesData';
import { staticFilterOptions } from '../utils/filterOptions';
import { RiSettingsLine } from 'react-icons/ri'; 

const SORT_OPTIONS = [
    { label: 'Date', value: 'date' },
    { label: 'Quantity', value: 'quantity' },
    { label: 'Customer Name', value: 'customerName' },
];

const ControlsPanel = () => {
    const { query, handleFilterChange, handleSort } = useSales();

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
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center">
                
                <div className="flex space-x-3 items-center">
                    <RiSettingsLine className="h-5 w-5 text-gray-500" /> 
                    
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

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 mr-2">Sort by:</span>
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